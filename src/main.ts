import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from './app.module';
import { JwtGuard } from './application/auth/guard/jwt.guard';
import { ContextInterceptor } from './common/context/context.interceptor';
import { ExceptionFilter } from './common/providers/exception.filter';
import { SerializeInterceptor } from './common/providers/serialize.interceptor';
import { ValidationPipe } from './common/providers/validation.pipe';
import { Swagger } from './common/swagger/swagger';
import { ConfigKey } from './constant/enums';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const reflector = app.get(Reflector);
  const configService = app.get(ConfigService);
  const origin = new RegExp(configService.get(ConfigKey.CorsOrigin));
  const port = configService.get(ConfigKey.Port);
  const host = configService.get(ConfigKey.Host);

  new Swagger(app).setDocument().setCustomOptions().setup();

  app.enableShutdownHooks();
  app.enableCors({ origin });
  app.useGlobalGuards(app.get(JwtGuard));
  app.useGlobalInterceptors(new SerializeInterceptor(reflector), app.get(ContextInterceptor));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ExceptionFilter());

  await app.listen(port, host);
};

bootstrap();

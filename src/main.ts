import { NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from './app.module';
import { AppService } from './application';
import { Swagger, SwaggerDocumentOptions } from './common/swagger';
import { isLocal } from './constant';
import { ExceptionFilter } from './presentation/filters';
import { SerializeInterceptor } from './presentation/interceptors';
import { ValidationPipe } from './presentation/pipes';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const appService = app.get(AppService);

  if (isLocal()) {
    const packageProfile = appService.packageProfile;

    const swaggerOptions: SwaggerDocumentOptions = {
      title: packageProfile.name,
      version: packageProfile.version,
    };

    Swagger.setup(app, swaggerOptions);
  }

  const corsOptions = appService.corsOptions;
  const { port, host } = appService.listenOptions;

  app.enableShutdownHooks();
  app.enableCors(corsOptions);
  app.useGlobalInterceptors(new SerializeInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ExceptionFilter());

  await app.listen(port, host);
};

bootstrap();

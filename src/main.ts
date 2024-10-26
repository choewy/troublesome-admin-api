import { NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from './app.module';
import { RootGuard } from './application/admin';
import { AuthService, JwtGuard } from './application/auth';
import { AdminRootConfigFactory, AppConfigFactory, isLocal } from './common';
import { ContextInterceptor } from './core';

import { ExceptionFilter, SerializeInterceptor, Swagger, SwaggerDocumentOptions, ValidationPipe } from '@/bootstrap';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const appConfigFactory = app.get(AppConfigFactory);
  const packageProfile = appConfigFactory.packageProfile;

  if (isLocal()) {
    const adminRootConfigFactory = app.get(AdminRootConfigFactory);
    const adminRoot = adminRootConfigFactory.value;
    const authService = app.get(AuthService);

    const swaggerOptions: SwaggerDocumentOptions = {
      title: packageProfile.name,
      version: packageProfile.version,
      authOption: {
        accessToken: authService.issueAccessToken(adminRoot),
        refreshToken: authService.issueAccessToken(adminRoot),
      },
    };

    Swagger.setup(app, swaggerOptions);
  }

  const corsOptions = appConfigFactory.corsOptions;
  const { port, host } = appConfigFactory.listenOptions;

  app.enableShutdownHooks();
  app.enableCors(corsOptions);
  app.useGlobalInterceptors(new SerializeInterceptor(app.get(Reflector)), app.get(ContextInterceptor));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new ExceptionFilter());
  app.useGlobalGuards(app.get(JwtGuard), app.get(RootGuard));

  await app.listen(port, host);
};

bootstrap();

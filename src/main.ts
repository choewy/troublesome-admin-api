import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { AppConfigFactory, isLocal } from './common';

import { Swagger, SwaggerDocumentOptions } from '@/bootstrap';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);
  const appConfigFactory = app.get(AppConfigFactory);
  const packageProfile = appConfigFactory.packageProfile;

  if (isLocal()) {
    const swaggerOptions: SwaggerDocumentOptions = {
      title: packageProfile.name,
      version: packageProfile.version,
    };

    Swagger.setup(app, swaggerOptions);
  }

  const corsOptions = appConfigFactory.corsOptions;
  const { port, host } = appConfigFactory.listenOptions;

  app.enableShutdownHooks();
  app.enableCors(corsOptions);
  app.useGlobalInterceptors();
  app.useGlobalPipes();
  app.useGlobalFilters();
  app.useGlobalGuards();

  await app.listen(port, host);
};

bootstrap();

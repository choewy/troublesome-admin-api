import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';

import { ConfigKey, RequestHeader } from '@/constant/enums';

export class Swagger {
  private readonly documentBuilder: DocumentBuilder;
  private readonly customOptions: SwaggerCustomOptions;

  constructor(private readonly app: INestApplication) {
    this.documentBuilder = new DocumentBuilder();
    this.customOptions = { swaggerOptions: { docExpansion: 'none', authAction: {} } };
  }

  setDocument() {
    const configService = this.app.get(ConfigService);

    this.documentBuilder
      .setTitle(configService.get(ConfigKey.NpmPackageName))
      .setVersion(configService.get(ConfigKey.NpmPackageVersion))
      .addBearerAuth({ name: RequestHeader.AccessToken, type: 'http', in: 'header', scheme: 'bearer' }, RequestHeader.AccessToken)
      .addApiKey({ name: RequestHeader.RefreshToken, type: 'apiKey', in: 'header' }, RequestHeader.RefreshToken);

    return this;
  }

  setCustomOptions(accessToken?: string, refreshToken?: string) {
    if (accessToken) {
      this.customOptions.swaggerOptions.authAction[RequestHeader.AccessToken] = {
        schema: {
          type: 'http',
          in: 'header',
          schema: 'bearer',
        },
        value: accessToken,
      };
    }

    if (refreshToken) {
      this.customOptions.swaggerOptions.authAction[RequestHeader.RefreshToken] = {
        schema: {
          type: 'apiKey',
          in: 'header',
        },
        value: refreshToken,
      };
    }

    return this;
  }

  setup(path: string = 'api-docs') {
    SwaggerModule.setup(path, this.app, SwaggerModule.createDocument(this.app, this.documentBuilder.build()), this.customOptions);
  }
}

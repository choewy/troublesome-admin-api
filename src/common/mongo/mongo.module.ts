import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ConfigKey } from '@/constant/enums';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        const protocol = configService.getOrThrow(ConfigKey.MongoProtocol);
        const host = configService.getOrThrow(ConfigKey.MongoHost);
        const port = configService.getOrThrow(ConfigKey.MongoPort);
        const username = configService.getOrThrow(ConfigKey.MongoUsername);
        const password = configService.getOrThrow(ConfigKey.MongoPassword);
        const uri = `${protocol}://${username}:${password}@${host}${port ? `:${port}` : ''}`;

        return { uri };
      },
    }),
  ],
})
export class MongoModule {}

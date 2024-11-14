export enum NodeEnv {
  Local = 'local',
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export enum ConfigKey {
  NpmPackageName = 'npm_package_name',
  NpmPackageVersion = 'npm_package_version',
  Host = 'HOST',
  Port = 'PORT',
  Domain = 'DOMAIN',
  CorsOrigin = 'CORS_ORIGIN',
  JwtAccessTokenSecret = 'JWT_ACCESS_TOKEN_SECRET',
  JwtRefreshTokenSecret = 'JWT_REFRESH_TOKEN_SECRET',
  DatabaseHost = 'DB_HOST',
  DatabasePort = 'DB_PORT',
  DatabaseUsername = 'DB_USERNAME',
  DatabasePassword = 'DB_PASSWORD',
  DatabaseDatabase = 'DB_DATABASE',
  DatabaseSynchronize = 'DB_SYNCHRONIZE',
  DatabaseLogging = 'DB_LOGGING',
  RedisHost = 'REDIS_HOST',
  RedisPort = 'REDIS_PORT',
  RedisDatabase = 'REDIS_DB',
  MongoProtocol = 'MONGO_PROTOCOL',
  MongoHost = 'MONGO_HOST',
  MongoPort = 'MONGO_PORT',
  MongoUsername = 'MONGO_USERNAME',
  MongoPassword = 'MONGO_PASSWORD',
}

export enum RequestHeader {
  RequestId = 'x-request-id',
  AccessToken = 'authorization',
  RefreshToken = 'refresh-token',
}

export enum ResponseHeader {
  RequestId = 'X-REQUEST-ID',
  AccessToken = 'X-ACCESS-TOKEN',
  RefreshToken = 'X-REFRESH-TOKEN',
}

export enum MetadataKey {
  IsPublic = 'is-public',
  Permission = 'permission',
}

import {
  TypeOrmModuleOptions,
  TypeOrmModuleAsyncOptions,
} from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const typeOrmConfig = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  logging: true,
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
  cli: { migrationsDir: __dirname + '/migrations' },
  extra: { charset: 'utf8mb4_unicode_ci' },
};

export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: parseInt(configService.get('DB_PORT')),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      // entities: ['dist/**/*.entity.js'],
      synchronize: true,
      logging: true,
      migrations: [__dirname + '/migrations/*{.ts,.js}'],
      // cli: { migrationsDir: __dirname + '/migrations' },
      extra: { charset: 'utf8mb4_unicode_ci' },
    };
  },
  inject: [ConfigService],
};

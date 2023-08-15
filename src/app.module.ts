import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MonsterModule } from './monster/monster.module';
import { dataSourceOptions } from 'db/config/sqlite.config';
import { BaseTypeModule } from './base_type/base_type.module';
import { MonsterTypeModule } from './monster_type/monster_type.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { typeOrmAsyncConfig } from 'db/config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MonsterModule,
    // TypeOrmModule.forRoot(dataSourceOptions), // for sqlite connection
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    BaseTypeModule,
    MonsterTypeModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MonsterModule } from './monster/monster.module';
import { dataSourceOptions } from 'db/data-source';
import { BaseTypeModule } from './base_type/base_type.module';

@Module({
  imports: [
    MonsterModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    BaseTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

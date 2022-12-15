import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseType } from 'src/entities/base-type.entity';
import { Monster } from '../entities/monster.entity';
import { MonsterController } from './monster.controller';
import { MonsterService } from './monster.service';

@Module({
  imports: [TypeOrmModule.forFeature([Monster, BaseType])],
  controllers: [MonsterController],
  providers: [MonsterService],
})
export class MonsterModule {}

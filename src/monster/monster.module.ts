import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseType } from 'src/entities/base_type.entity';
import { MonsterType } from 'src/entities/monster_type.entity';
import { Stat } from 'src/entities/stat.entity';
import { Monster } from '../entities/monster.entity';
import { MonsterController } from './monster.controller';
import { MonsterService } from './monster.service';

@Module({
  imports: [TypeOrmModule.forFeature([Monster, BaseType, MonsterType, Stat])],
  controllers: [MonsterController],
  providers: [MonsterService],
})
export class MonsterModule {}

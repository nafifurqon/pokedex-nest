import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseType } from 'src/entities/base_type.entity';
import { CatchedMonster } from 'src/entities/catched_monster.entity';
import { MonsterType } from 'src/entities/monster_type.entity';
import { Stat } from 'src/entities/stat.entity';
import { UserModule } from 'src/user/user.module';
import { Monster } from '../entities/monster.entity';
import { MonsterController } from './monster.controller';
import { MonsterService } from './monster.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Monster,
      BaseType,
      MonsterType,
      Stat,
      CatchedMonster,
    ]),
    UserModule,
  ],
  controllers: [MonsterController],
  providers: [MonsterService],
})
export class MonsterModule {}

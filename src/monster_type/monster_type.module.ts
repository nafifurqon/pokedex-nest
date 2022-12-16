import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonsterTypeService } from './monster_type.service';
import { MonsterTypeController } from './monster_type.controller';
import { MonsterType } from 'src/entities/monster_type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MonsterType])],
  controllers: [MonsterTypeController],
  providers: [MonsterTypeService],
})
export class MonsterTypeModule {}

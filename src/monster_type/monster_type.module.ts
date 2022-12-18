import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MonsterTypeService } from './monster_type.service';
import { MonsterTypeController } from './monster_type.controller';
import { MonsterType } from 'src/entities/monster_type.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([MonsterType]), UserModule],
  controllers: [MonsterTypeController],
  providers: [MonsterTypeService],
})
export class MonsterTypeModule {}

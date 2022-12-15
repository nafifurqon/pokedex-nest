import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseTypeService } from './base_type.service';
import { BaseTypeController } from './base_type.controller';
import { BaseType } from 'src/entities/base-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BaseType])],
  controllers: [BaseTypeController],
  providers: [BaseTypeService],
})
export class BaseTypeModule {}

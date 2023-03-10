import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseTypeService } from './base_type.service';
import { BaseTypeController } from './base_type.controller';
import { BaseType } from 'src/entities/base_type.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([BaseType]), UserModule],
  controllers: [BaseTypeController],
  providers: [BaseTypeService],
})
export class BaseTypeModule {}

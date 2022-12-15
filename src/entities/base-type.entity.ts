import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Monster } from './monster.entity';

@Entity()
export class BaseType {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @OneToOne(() => Monster, (monsterId) => monsterId.baseType)
  monsterId: Monster;
}

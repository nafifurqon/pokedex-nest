import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Monster } from './monster.entity';

@Entity()
export class Type {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @ManyToOne(() => Monster, (monster) => monster.types, {
    onDelete: 'SET NULL',
  })
  monster: Monster;
}

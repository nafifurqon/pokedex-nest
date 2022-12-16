import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { IsInt, Max } from 'class-validator';
import { Monster } from './monster.entity';

@Entity()
export class Stat {
  // @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  @IsInt()
  @Max(500)
  hp: number;

  @ApiProperty()
  @Column()
  @IsInt()
  @Max(500)
  attack: number;

  @ApiProperty()
  @Column()
  @IsInt()
  @Max(500)
  def: number;

  @ApiProperty()
  @Column()
  @IsInt()
  @Max(500)
  speed: number;

  @OneToOne(() => Monster, (monster) => monster.stat)
  monster: Monster;
}

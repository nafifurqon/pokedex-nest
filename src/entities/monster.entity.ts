import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { BaseType } from './base_type.entity';
import { MonsterType } from './monster_type.entity';

@Entity()
export class Monster {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty({ required: false })
  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @ApiProperty({ type: () => BaseType })
  @ManyToOne(() => BaseType, (baseType) => baseType.monsters, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  baseType: BaseType;

  @ApiProperty({ type: () => [MonsterType] })
  @ManyToMany(() => MonsterType, (monsterTypes) => monsterTypes.monsters)
  @JoinTable({
    joinColumn: {
      name: 'monsterId',
    },
    inverseJoinColumn: {
      name: 'monsterTypeId',
    },
  })
  monsterTypes: MonsterType[];

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

  @ApiProperty({ nullable: true })
  catched: boolean;
}

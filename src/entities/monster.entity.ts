import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { BaseType } from './base-type.entity';
import { Type } from './type.entity';

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
  @OneToOne(() => BaseType, (baseType) => baseType.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  baseType: BaseType;

  @ApiProperty()
  @OneToMany(() => Type, (types) => types.monster)
  types: Type[];
}

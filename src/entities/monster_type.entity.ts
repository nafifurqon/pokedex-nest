import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Monster } from './monster.entity';

@Entity()
export class MonsterType {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ unique: true })
  name: string;

  @ApiProperty({ type: () => [Monster] })
  @ManyToMany(() => Monster, (monster) => monster.monsterTypes, {
    cascade: true,
  })
  // @JoinTable()
  monsters: Monster[];
}

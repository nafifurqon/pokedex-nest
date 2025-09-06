import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Monster } from './monster.entity';

@Entity()
export class MonsterType {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: '47f4528f-72fd-4eec-a2de-5f514edb66e9',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ type: 'string', example: 'Fire' })
  @Column({ unique: true })
  name: string;

  // @ApiProperty({ type: () => [Monster] })
  @ManyToMany(() => Monster, (monster) => monster.monsterTypes, {
    cascade: true,
  })
  // @JoinTable()
  monsters: Monster[];
}

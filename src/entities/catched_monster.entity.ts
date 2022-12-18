import { ApiProperty } from '@nestjs/swagger';
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Monster } from './monster.entity';
import { User } from './user.entity';

@Entity()
export class CatchedMonster {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Monster)
  @JoinColumn()
  monster: Monster;

  monsterId: string;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;

  userId: string;
}

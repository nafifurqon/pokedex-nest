import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsUUID, IsInt, Max } from 'class-validator';

export class CreateMonsterDto {
  @ApiProperty()
  @MaxLength(100)
  name: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  @IsUUID()
  baseType: string;

  @ApiProperty()
  @IsUUID('all', { each: true })
  monsterTypes: string[];

  @ApiProperty()
  @IsInt()
  @Max(500)
  hp: number;

  @ApiProperty()
  @IsInt()
  @Max(500)
  attack: number;

  @ApiProperty()
  @IsInt()
  @Max(500)
  def: number;

  @ApiProperty()
  @IsInt()
  @Max(500)
  speed: number;
}

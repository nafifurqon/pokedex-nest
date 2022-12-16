import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsUUID } from 'class-validator';

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
}

import { ApiProperty } from '@nestjs/swagger';
import { MaxLength, IsUUID } from 'class-validator';

export class CreateMonsterTypeDto {
  @ApiProperty()
  @MaxLength(100)
  name: string;

  // @ApiProperty()
  // @IsUUID('all', { each: true })
  // monsters: string[];
}

import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class CreateMonsterTypeDto {
  @ApiProperty()
  @MaxLength(100)
  name: string;
}

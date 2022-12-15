import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class CreateBaseTypeDto {
  @ApiProperty()
  @MaxLength(100)
  name: string;
}

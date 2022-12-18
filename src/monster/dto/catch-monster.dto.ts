import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class CatchMonsterDto {
  @ApiProperty()
  @IsUUID()
  monster: string;
}

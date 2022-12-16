import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Max, Min } from 'class-validator';

export class CreateStatDto {
  @ApiProperty({ type: Number, minimum: 0, maximum: 500 })
  @IsInt()
  @Min(0)
  @Max(500)
  hp: number;

  @ApiProperty({ type: Number, minimum: 0, maximum: 500 })
  @IsInt()
  @Min(0)
  @Max(500)
  attack: number;

  @ApiProperty({ type: Number, minimum: 0, maximum: 500 })
  @IsInt()
  @Min(0)
  @Max(500)
  def: number;

  @ApiProperty({ type: Number, minimum: 0, maximum: 500 })
  @IsInt()
  @Min(0)
  @Max(500)
  speed: number;
}

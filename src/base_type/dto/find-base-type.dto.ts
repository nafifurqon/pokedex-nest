import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { BaseType } from '../../entities/base_type.entity';

export class FindAllBaseTypeQueryDto {
  @ApiProperty({ name: 'search', required: false })
  @Transform(({ value }) => {
    if (!value) return '';
    return value;
  })
  search?: string;

  @ApiProperty({ name: 'page', required: true })
  @Transform(({ value }) => {
    if (!value) return 1;
    return +value;
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  page: number;

  @ApiProperty({ name: 'limit', required: true })
  @Transform(({ value }) => {
    if (!value) return 1;
    return +value;
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  limit: number;
}

export class FindAllBaseTypeResponseDto {
  @ApiProperty({ type: () => [BaseType] })
  data: BaseType[];

  @ApiProperty()
  total_data: number;
}

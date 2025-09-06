import { ApiProperty } from '@nestjs/swagger';
import { MonsterSortOption, OrderOption } from '../enums';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { Monster } from '../../entities/monster.entity';

export class FindAllMonsterQueryDto {
  @ApiProperty({ name: 'search', required: false })
  @Transform(({ value }) => {
    if (!value) return '';
    return value;
  })
  search?: string;

  @ApiProperty({ name: 'types', required: false })
  @Transform(({ value }) => {
    if (!value) {
      return [];
    }

    return value.split(',');
  })
  types?: string;

  @ApiProperty({ name: 'sort', required: false, enum: MonsterSortOption })
  sort?: MonsterSortOption;

  @ApiProperty({ name: 'order', required: false, enum: OrderOption })
  @Transform(({ value }) => {
    if (!value) return OrderOption.ASC;
    return value;
  })
  order?: OrderOption;

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

export class FindAllMonsterResponseDto {
  @ApiProperty({ type: () => [Monster] })
  data: Monster[];

  @ApiProperty()
  total_data: number;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

const categoryOrders = [
  'id',
  'slug',
  'name',
  'description',
  'active',
  'createDate',
  '-id',
  '-slug',
  '-name',
  '-description',
  '-active',
  '-createDate',
];

export class SortRequestDto {
  @Transform(({ value }) => {
    if (categoryOrders.includes(value)) {
      return value;
    }

    return '-createDate';
  })
  @ApiProperty({
    required: false,
    description: 'Sort',
    example: '-createDate',
  })
  @IsOptional()
  public readonly sort: string = '-createDate';
}

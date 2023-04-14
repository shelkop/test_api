import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class PaginationRequestDto {
  @ApiProperty({
    required: false,
    description: 'Pagination pageSize',
    example: 2,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(9)
  @IsOptional()
  public readonly pageSize: number = 2;

  @ApiProperty({
    required: false,
    description: 'Pagination page',
    example: 1,
  })
  @Type(() => Number)
  @Transform(({ value }) => {
    if (value === 0) {
      return 1;
    }
    return value;
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  public readonly page: number = 1;
}

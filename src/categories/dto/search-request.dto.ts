import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class SearchRequestDto {
  @Transform(({ value }) => value?.toLowerCase().trim())
  @ApiProperty({
    required: false,
    description: 'Category search',
    example: 'test',
  })
  @IsString()
  @IsOptional()
  search?: string;

  @Transform(({ obj, value }) => {
    if (!obj.search) {
      return value.trim();
    }
  })
  @ApiProperty({
    required: false,
    description: 'Category name',
    example: 'test',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @Transform(({ obj, value }) => {
    if (!obj.search) {
      return value.trim();
    }
  })
  @ApiProperty({
    required: false,
    description: 'Category description',
    example: 'test',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    required: false,
    description: 'Category status',
    example: true,
  })
  @Transform(({ value }) => {
    if (value === 'false' || value === '0') {
      return false;
    }
    if (value === 'true' || value === '1') {
      return true;
    }
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}

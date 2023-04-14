import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Category slug',
    example: 'test',
  })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({
    description: 'Category name',
    example: 'test',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Category description',
    example: 'test',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    description: 'Category status',
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  active: boolean;
}

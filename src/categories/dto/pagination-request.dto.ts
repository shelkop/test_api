import {ApiProperty, PartialType} from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import {IsBoolean, IsNotEmpty, IsOptional, IsString} from "class-validator";
import {Type} from "class-transformer";

export class SearchCategoryDto {
  @ApiProperty({
    description: "Category search",
    example: "test",
  })
  @IsString()
  @IsOptional()
  search: string;

  @ApiProperty({
    description: "Category name",
    example: "test",
  })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({
    description: "Category description",
    example: "test",
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({
    description: "Category status",
    example: true,
  })
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  active: boolean;
}

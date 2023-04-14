import {ApiProperty, PartialType} from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import {IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min} from "class-validator";
import {Transform, Type} from "class-transformer";

export class PaginationRequestDto {
  @ApiProperty({
    description: "Pagination pageSize",
    example: 2,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(9)
  @IsOptional()
  public readonly pageSize: number = 2;

  @ApiProperty({
    description: "Pagination page",
    example: 1,
  })
  @Type(() => Number)
  @Transform(({value}) => {
        if (value === 0) {
          return 1;
        }
        return value;
      }
  )
  @IsInt()
  @Min(0)
  @IsOptional()
  public readonly page: number;
}


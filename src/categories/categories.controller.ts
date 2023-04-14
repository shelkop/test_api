import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { SearchRequestDto } from './dto/search-request.dto';
import { PaginationRequestDto } from './dto/pagination-request.dto';
import { SortRequestDto } from './dto/sort-request.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoriesService.remove(id);
  }

  @Get(':unique')
  findBy(@Param('unique') unique: string) {
    return this.categoriesService.findByUnique(unique);
  }

  @Get()
  search(
    @Query() order: SortRequestDto,
    @Query() pagination: PaginationRequestDto,
    @Query() criteria: SearchRequestDto,
  ) {
    return this.categoriesService.search(criteria, pagination, order);
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validate as uuidValidate } from 'uuid';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Repository } from 'typeorm';
import CategoryEntity from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchRequestDto } from './dto/search-request.dto';
import { PaginationRequestDto } from './dto/pagination-request.dto';
import { SortRequestDto } from './dto/sort-request.dto';
@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
  ) {}
  create(data: CreateCategoryDto) {
    const category = this.categoryRepository.create(data);
    return this.categoryRepository.save(category);
  }

  search(
    criteria: SearchRequestDto,
    pagination: PaginationRequestDto,
    { sort }: SortRequestDto,
  ) {
    const take = pagination.pageSize;
    const skip = (pagination.page - 1) * pagination.pageSize;
    const orderName = sort.startsWith('-') ? 'DESC' : 'ASC';
    const orderField = orderName === 'DESC' ? sort.substring(1) : sort;

    const q = this.categoryRepository.createQueryBuilder();

    if (criteria.active !== undefined && criteria.search) {
      q.where('active = :active', criteria);
    }

    if (criteria.search) {
      q.andWhere('unaccent(lower(name)) = :search', criteria);
      q.orWhere('unaccent(lower(description)) = :search', criteria);
    }

    if (criteria.name) {
      q.andWhere('unaccent(lower(name)) = :name', criteria);
    }

    if (criteria.description) {
      q.andWhere('unaccent(lower(description)) = :description', criteria);
    }

    if (criteria.active !== undefined) {
      q.andWhere('active = :active', criteria);
    }

    return q
      .take(take)
      .skip(skip)
      .orderBy(`"${orderField}"`, orderName)
      .getMany();
  }

  async findById(id: string) {
    if (uuidValidate(id)) {
      throw new HttpException('id is invalid', HttpStatus.CONFLICT);
    }

    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new HttpException('category not found', HttpStatus.NOT_FOUND);
    }
    return category;
  }

  async findByUnique(unique: string) {
    const category = await this.categoryRepository.findOneBy(
      uuidValidate(unique) ? { id: unique } : { slug: unique },
    );

    if (!category) {
      throw new HttpException('category not found', HttpStatus.NOT_FOUND);
    }
    return category;
  }

  async update(id: string, data: UpdateCategoryDto) {
    const category = await this.findById(id);
    return this.categoryRepository.save(Object.assign(category, data));
  }

  async remove(id: string) {
    const category = await this.findById(id);
    return this.categoryRepository.remove(category);
  }
}

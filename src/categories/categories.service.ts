import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';
import { ObjectIdDto } from 'src/common/dto/object-id.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private readonly categorySchema: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categorySchema.create(createCategoryDto);
  }

  async findAll() {
    return await this.categorySchema.find().exec();
  }

  async findOne(id: string) {
    return await this.categorySchema.findById(id).exec();
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return await this.categorySchema.findByIdAndUpdate(id, updateCategoryDto);
  }

  async remove(id: string) {
    return await this.categorySchema.findByIdAndDelete(id);
  }
}

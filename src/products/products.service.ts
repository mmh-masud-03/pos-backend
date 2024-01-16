import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    return await this.productModel.create(createProductDto);
  }

  async findAll(productQuery: ProductQuery) {
    let query = this.productModel.find();

    // Apply pagination
    if (productQuery.page && productQuery.limit) {
      query = query
        .skip((productQuery.page - 1) * productQuery.limit)
        .limit(productQuery.limit);
    }

    // Apply population
    if (productQuery.populate) {
      query.populate(productQuery.populate);
    }

    const products = await query.exec();
    return products;
  }

  async findOne(id: string) {
    return await this.productModel.findById(id).exec();
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.productModel.findByIdAndUpdate(id, updateProductDto);
  }

  async remove(id: string) {
    return await this.productModel.findByIdAndDelete(id);
  }
}

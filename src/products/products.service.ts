import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const products = await this.productModel
      .find({
        name: createProductDto.name,
      })
      .exec();

    if (products.length > 0) {
      throw new BadRequestException('Product already exists !');
    }

    const product = await this.productModel.create(createProductDto);

    if (!product) {
      throw new NotFoundException('Cannot create product !');
    }

    return product;
  }

  async findAll(productQuery: ProductQuery) {
    let query = this.productModel.find();

    // Apply pagination
    if (productQuery.page && productQuery.limit) {
      query = query
        .skip((productQuery.page - 1) * productQuery.limit)
        .limit(productQuery.limit);
    }

    const products = await query.exec();

    if (products.length === 0) {
      throw new NotFoundException('Products not found !');
    }

    return products;
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).exec();

    if (!product) {
      throw new NotFoundException('Product not found !');
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      id,
      updateProductDto,
      { new: true },
    );

    if (!updatedProduct) {
      throw new BadRequestException('Product is not updated !');
    }

    return updatedProduct;
  }

  async remove(id: string) {
    const deletedProduct = await this.productModel.findByIdAndDelete(id);

    if (!deletedProduct) {
      throw new BadRequestException('Product is not deleted !');
    }

    return deletedProduct;
  }
}

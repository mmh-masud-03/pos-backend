import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { SerializeInterceptor } from 'src/common/interceptors/serialize.interceptor';
import { CreateProductDto, UpdateProductDto, ProductSerializeDto } from './dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseInterceptors(new SerializeInterceptor(ProductSerializeDto))
  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productsService.create(createProductDto);
  }

  @UseInterceptors(new SerializeInterceptor(ProductSerializeDto))
  @Get()
  async findAll(@Query() productQuery: ProductQuery) {
    return await this.productsService.findAll(productQuery);
  }

  @UseInterceptors(new SerializeInterceptor(ProductSerializeDto))
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productsService.findOne(id);
  }

  @UseInterceptors(new SerializeInterceptor(ProductSerializeDto))
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return await this.productsService.update(id, updateProductDto);
  }

  @UseInterceptors(new SerializeInterceptor(ProductSerializeDto))
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.productsService.remove(id);
  }
}

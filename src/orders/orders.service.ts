import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './entities/order.entity';
import { Model } from 'mongoose';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    return await this.orderModel.create(createOrderDto);
  }

  async findAll(orderQuery: OrderQuery) {
    let query = this.orderModel.find();

    // Apply pagination
    if (orderQuery.page && orderQuery.limit) {
      query = query
        .skip((orderQuery.page - 1) * orderQuery.limit)
        .limit(orderQuery.limit);
    }

    // Apply population
    if (orderQuery.populate && Array.isArray(orderQuery.populate)) {
      orderQuery.populate.forEach((field) => {
        query.populate(field);
      });
    }

    const orders = await query.exec();
    return orders;
  }

  async findOne(id: string) {
    return await this.orderModel.findById(id);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return await this.orderModel.findByIdAndUpdate(id, updateOrderDto);
  }

  async remove(id: string) {
    return await this.orderModel.findByIdAndDelete(id);
  }
}

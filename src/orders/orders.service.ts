import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/order/create-order.dto';
import { UpdateOrderDto } from './dto/order/update-order.dto';
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
    const order = await this.orderModel.create(createOrderDto);

    if (!order) {
      throw new BadRequestException('Order could not be created !');
    }

    return order;
  }

  async findAll(orderQuery: OrderQuery) {
    let query = this.orderModel.find();

    // Apply pagination
    if (orderQuery.page && orderQuery.limit) {
      query = query
        .skip((orderQuery.page - 1) * orderQuery.limit)
        .limit(orderQuery.limit);
    }

    const orders = await query.exec();

    if (orders.length === 0) {
      throw new NotFoundException('Orders not found !');
    }

    return orders;
  }

  async findOne(id: string) {
    const order = await this.orderModel.findById(id);

    if (!order) {
      throw new NotFoundException('Order not found !');
    }

    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const updatedOrder = await this.orderModel.findByIdAndUpdate(
      id,
      updateOrderDto,
      { new: true },
    );

    if (!updatedOrder) {
      throw new NotFoundException('Order is not updated !');
    }

    return updatedOrder;
  }

  async remove(id: string) {
    const deletedOrder = await this.orderModel.findByIdAndDelete(id);

    if (!deletedOrder) {
      throw new BadRequestException('Order is not deleted !');
    }

    return deletedOrder;
  }
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

class Product {
  _id: string;
  name: string;
  unitPrice: number;
  quantity: number;
}

@Schema({ timestamps: true })
export class Order extends Document {
  @Prop({ required: true, default: [] })
  products: Product[];

  @Prop({ required: true, default: 0 })
  totalBill: number;

  @Prop({ required: true, default: 'in progress' })
  status: string;

  @Prop({ required: true, default: 0 })
  discount: number;

  @Prop({ required: true })
  issuedBy: string;

  @Prop({ required: true })
  issuedPhone: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

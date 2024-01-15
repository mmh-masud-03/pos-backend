import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Product } from '../../products/entities/product.entity';

@Schema({
  timestamps: true,
})
export class Order extends mongoose.Document {
  @Prop([
    { required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  ])
  products: [Product];

  @Prop({
    required: true,
    type: Number,
  })
  totalBill: number;

  @Prop({ required: true, type: String })
  status: string;

  @Prop({ required: false, default: 0, type: Number })
  discount: number;
}
export const OrderSchema = SchemaFactory.createForClass(Order);

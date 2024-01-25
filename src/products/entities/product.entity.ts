import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Product extends mongoose.Document {
  @Prop({ required: true, type: String })
  imageUrl: string;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: Number })
  unitPrice: number;

  @Prop({ required: true, type: String })
  category: string;

  @Prop({ required: true, type: Number, default: 0 })
  stock: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

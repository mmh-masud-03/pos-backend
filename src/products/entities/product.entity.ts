import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Category } from '../../categories/entities/category.entity';

@Schema({ timestamps: true })
export class Product extends mongoose.Document {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  })
  category: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

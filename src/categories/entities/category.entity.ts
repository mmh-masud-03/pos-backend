import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class Category extends mongoose.Document {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: false, default: '', type: String })
  description: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

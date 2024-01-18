import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({
  timestamps: true,
})
export class User extends mongoose.Document {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  email: string;

  @Prop({ required: true, type: String, unique: true })
  phone: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: true, type: String })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

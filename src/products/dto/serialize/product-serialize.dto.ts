import { Expose, Transform } from 'class-transformer';
import { ObjectId } from 'mongoose';

export class ProductSerializeDto {
  @Expose()
  @Transform((params) => params.obj._id.toString())
  readonly _id: ObjectId;

  @Expose()
  readonly imageUrl: string;

  @Expose()
  readonly name: string;

  @Expose()
  readonly unitPrice: number;

  @Expose()
  readonly category: string;

  @Expose()
  readonly stock: number;
}

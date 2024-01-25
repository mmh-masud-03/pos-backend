import { Expose, Transform, Type } from 'class-transformer';
import { ObjectId } from 'mongoose';

class ProductDto {
  @Expose()
  @Transform((params) => params.obj._id.toString())
  readonly _id: ObjectId;

  @Expose()
  readonly name: string;

  @Expose()
  readonly unitPrice: number;

  @Expose()
  readonly quantity: number;
}

export class OrderSerializeDto {
  @Expose()
  @Transform((params) => params.obj._id.toString())
  readonly _id: ObjectId;

  @Expose()
  @Type(() => ProductDto)
  readonly products: ProductDto[];

  @Expose()
  readonly totalBill: number;

  @Expose()
  readonly status: string;

  @Expose()
  readonly discount: number;
}

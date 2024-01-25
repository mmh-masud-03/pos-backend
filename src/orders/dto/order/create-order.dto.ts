import {
  IsArray,
  IsNumber,
  IsPositive,
  IsString,
  ValidateNested,
  ArrayMinSize,
  ArrayNotEmpty,
  IsNotEmpty,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

class ProductDto {
  @IsString()
  @IsNotEmpty()
  readonly _id: string;

  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly unitPrice: number;

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly quantity: number;
}

export class CreateOrderDto {
  @IsArray()
  @ArrayMinSize(1, { message: 'At least one product is required' })
  @ArrayNotEmpty({ message: 'Products array cannot be empty' })
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  readonly products: ProductDto[];

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly totalBill: number;

  @IsString()
  @IsNotEmpty()
  readonly status: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  readonly discount: number;
}

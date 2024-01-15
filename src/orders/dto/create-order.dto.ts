import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  @IsNotEmpty()
  readonly products: string[];

  @IsNumber()
  @IsNotEmpty()
  readonly totalBill: number;

  @IsString()
  @IsNotEmpty()
  readonly status: string;

  @IsNumber()
  @IsOptional()
  readonly discount: number;
}

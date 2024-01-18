import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateOrderDto {
  @IsArray()
  @IsNotEmpty()
  readonly products: string[];

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly totalBill: number;

  @IsString()
  @IsNotEmpty()
  readonly status: string;

  @IsNumber()
  @IsOptional()
  readonly discount: number;
}

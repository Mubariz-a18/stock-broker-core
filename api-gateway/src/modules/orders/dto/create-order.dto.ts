import { IsEnum, IsInt, IsPositive, IsString } from 'class-validator';
import type { OrderSide } from '../models/order.model';

export class CreateOrderDto {
  @IsString()
  userId: string;

  @IsString()
  symbol: string;

  @IsEnum(['BUY', 'SELL'])
  side: OrderSide;

  @IsInt()
  @IsPositive()
  quantity: number;
}

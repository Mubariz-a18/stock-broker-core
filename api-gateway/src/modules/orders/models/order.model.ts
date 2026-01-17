export type OrderSide = 'BUY' | 'SELL';

export interface Order {
  id: string;
  userId: string;
  symbol: string;
  side: OrderSide;
  quantity: number;
  price: number; // execution price
  timestamp: string;
}

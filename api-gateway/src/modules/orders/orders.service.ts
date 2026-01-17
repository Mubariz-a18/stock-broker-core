import { Injectable, BadRequestException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { MarketService } from '../market/market.service';
import { Order } from './models/order.model';

@Injectable()
export class OrdersService {
  // in-memory storage
  private orders: Order[] = [];

  // simple virtual cash per user
  private cashBalance: Record<string, number> = {
    demo: 1_000_000, // ₹10L virtual cash
  };

  constructor(private readonly marketService: MarketService) {}

  placeOrder(
    userId: string,
    symbol: string,
    side: 'BUY' | 'SELL',
    quantity: number,
  ): Order {
    const priceData = this.marketService.getPrice(symbol);

    if (!priceData) {
      throw new BadRequestException('Invalid stock symbol');
    }

    const executionPrice = priceData.price;
    const orderValue = executionPrice * quantity;

    if (side === 'BUY') {
      if ((this.cashBalance[userId] ?? 0) < orderValue) {
        throw new BadRequestException('Insufficient balance');
      }
      this.cashBalance[userId] -= orderValue;
    }

    if (side === 'SELL') {
      // Holdings validation will come in Step 6 (Portfolio)
      // For now, allow sell (paper simplification)
    }

    const order: Order = {
      id: randomUUID(),
      userId,
      symbol,
      side,
      quantity,
      price: executionPrice,
      timestamp: new Date().toISOString(),
    };

    this.orders.push(order);
    return order;
  }

  getOrders(userId: string): Order[] {
    return this.orders.filter((o) => o.userId === userId);
  }

  getCashBalance(userId: string): number {
    return this.cashBalance[userId] ?? 0;
  }
}

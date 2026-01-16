import { Injectable } from '@nestjs/common';

import { Stock } from './models/stock.model';
import { MarketPrice } from './models/price.model';

@Injectable()
export class MarketService {
  private stocks: Stock[] = [
    { symbol: 'TCS', name: 'Tata Consultancy Services', exchange: 'NSE' },
    { symbol: 'INFY', name: 'Infosys', exchange: 'NSE' },
    { symbol: 'RELIANCE', name: 'Reliance Industries', exchange: 'NSE' },
  ];

  private prices: Record<string, MarketPrice> = {
    TCS: { symbol: 'TCS', price: 3800, timestamp: new Date().toISOString() },
    INFY: { symbol: 'INFY', price: 1500, timestamp: new Date().toISOString() },
    RELIANCE: { symbol: 'RELIANCE', price: 2900, timestamp: new Date().toISOString() },
  };

  getAllStocks(): Stock[] {
    return this.stocks;
  }

  getPrice(symbol: string): MarketPrice | null {
    return this.prices[symbol] || null;
  }
}

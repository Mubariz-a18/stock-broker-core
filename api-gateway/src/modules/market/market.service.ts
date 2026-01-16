import {
  Injectable,
  Logger,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { Stock } from './models/stock.model';
import { MarketPrice } from './models/price.model';

@Injectable()
export class MarketService
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(MarketService.name);

  /* -------------------- STOCK MASTER -------------------- */

  private readonly stocks: Stock[] = [
    { symbol: 'TCS', name: 'Tata Consultancy Services', exchange: 'NSE' },
    { symbol: 'INFY', name: 'Infosys', exchange: 'NSE' },
    { symbol: 'RELIANCE', name: 'Reliance Industries', exchange: 'NSE' },
  ];

  /* -------------------- PRICE STATE -------------------- */

  private prices: Record<string, MarketPrice> = {
    TCS: { symbol: 'TCS', price: 3800, timestamp: new Date().toISOString() },
    INFY: { symbol: 'INFY', price: 1500, timestamp: new Date().toISOString() },
    RELIANCE: {
      symbol: 'RELIANCE',
      price: 2900,
      timestamp: new Date().toISOString(),
    },
  };

  private tickIntervalMs: number;

  constructor(
    private readonly config: ConfigService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {
    this.tickIntervalMs =
      this.config.get<number>('market.tickInterval') ?? 5000;
  }

  /* -------------------- LIFECYCLE -------------------- */

  onModuleInit() {
    this.logger.log(
      `Market simulator starting (tick=${this.tickIntervalMs}ms)`,
    );

    const interval = setInterval(
      () => this.simulateMarketTick(),
      this.tickIntervalMs,
    );

    this.schedulerRegistry.addInterval('market-tick', interval);
  }

  onModuleDestroy() {
    this.schedulerRegistry.deleteInterval('market-tick');
    this.logger.log('Market simulator stopped');
  }

  /* -------------------- PUBLIC APIs -------------------- */

  getAllStocks(): Stock[] {
    return this.stocks;
  }

  getPrice(symbol: string): MarketPrice | null {
    return this.prices[symbol] ?? null;
  }

  getAllPrices(): MarketPrice[] {
    return Object.values(this.prices);
  }

  /* -------------------- MARKET SIMULATOR -------------------- */

  private simulateMarketTick(): void {
    for (const symbol of Object.keys(this.prices)) {
      const current = this.prices[symbol];

      /**
       * Percentage-based random walk
       * Range: -0.5% to +0.5%
       */
      const deltaPercent = (Math.random() - 0.5) * 0.01;
      const delta = current.price * deltaPercent;

      const newPrice = Math.max(
        1,
        Number((current.price + delta).toFixed(2)),
      );

      this.prices[symbol] = {
        symbol,
        price: newPrice,
        timestamp: new Date().toISOString(),
      };
    }

    // keep logs low-noise
    if (Math.random() < 0.1) {
      this.logger.debug('Market prices updated');
    }
  }
}

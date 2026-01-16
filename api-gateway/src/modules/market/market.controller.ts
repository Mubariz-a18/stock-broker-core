import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { MarketService } from './market.service';

@Controller('market')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Get('stocks')
  getStocks() {
    return this.marketService.getAllStocks();
  }

  @Get('price/:symbol')
  getPrice(@Param('symbol') symbol: string) {
    const price = this.marketService.getPrice(symbol.toUpperCase());

    if (!price) {
      throw new NotFoundException('Stock not found');
    }

    return price;
  }
}

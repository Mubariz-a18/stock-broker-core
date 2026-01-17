import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { MarketModule } from '../market/market.module';

@Module({
  imports: [MarketModule],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {
  
}

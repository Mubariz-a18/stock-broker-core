import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { MarketModule } from './modules/market/market.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { WatchlistModule } from './modules/watchlist/watchlist.module';
import { AlertsModule } from './modules/alerts/alerts.module';
import { ConfigModule } from '@nestjs/config';
import appConfig from './shared/config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    UsersModule,
    AuthModule,
    MarketModule,
    OrdersModule,
    PortfolioModule,
    WatchlistModule,
    AlertsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

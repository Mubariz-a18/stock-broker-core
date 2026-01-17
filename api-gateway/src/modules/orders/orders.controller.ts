import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  placeOrder(@Body() dto: CreateOrderDto) {
    return this.ordersService.placeOrder(
      dto.userId,
      dto.symbol.toUpperCase(),
      dto.side,
      dto.quantity,
    );
  }

  @Get()
  getOrders(@Query('userId') userId: string) {
    return this.ordersService.getOrders(userId);
  }

  @Get('balance')
  getBalance(@Query('userId') userId: string) {
    return {
      balance: this.ordersService.getCashBalance(userId),
    };
  }
}

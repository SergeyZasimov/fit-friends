import { Module } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';

@Module({
  providers: [OrderRepository, OrderService],
  controllers: [OrderController],
})
export class OrderModule {}

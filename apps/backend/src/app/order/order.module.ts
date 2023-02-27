import { Module } from '@nestjs/common';
import { WorkoutModule } from '../workout/workout.module';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';

@Module({
  imports: [WorkoutModule],
  providers: [OrderRepository, OrderService],
  controllers: [OrderController],
})
export class OrderModule {}

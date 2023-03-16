import { Module } from '@nestjs/common';
import { SportGymModule } from '../sport-gym/sport-gym.module';
import { WorkoutModule } from '../workout/workout.module';
import { OrderController } from './order.controller';
import { OrderRepository } from './order.repository';
import { OrderService } from './order.service';

@Module({
  imports: [WorkoutModule, SportGymModule],
  providers: [OrderRepository, OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}

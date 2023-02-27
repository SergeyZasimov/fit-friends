import { Order, OrderTypes } from '@fit-friends/shared';
import { Injectable } from '@nestjs/common';
import { WorkoutService } from '../workout/workout.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderEntity } from './order.entity';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly workoutService: WorkoutService
  ) {}

  async create(dto: CreateOrderDto, userId: number): Promise<Order> {
    const { purchaseId, ...orderData } = dto;
    let orderEntity: OrderEntity;
    if (dto.orderType === OrderTypes.Workout) {
      const workoutId = purchaseId;
      await this.workoutService.checkWorkoutExist(workoutId);
      orderEntity = new OrderEntity({ ...orderData, workoutId, userId });
    } else {
      const sportGymId = purchaseId;
      orderEntity = new OrderEntity({ ...orderData, sportGymId, userId });
    }
    return this.orderRepository.create(orderEntity);
  }

  async getOrdersForTrainer(userId: number) {
    const summary = await this.orderRepository.findOrdersForTrainer(userId);
    const ordersSummary = [];
    for (const item of summary) {
      const workout = await this.workoutService.getOne(item.workoutId);
      ordersSummary.push({
        workout,
        count: item._count.id,
        totalPrice: item._sum.totalCost,
      });
    }
    return ordersSummary;
  }
}

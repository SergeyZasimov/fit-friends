import { Order, OrderType } from '@fit-friends/shared';
import { Injectable } from '@nestjs/common';
import { WorkoutService } from '../workout/workout.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { QueryTrainerOrders } from './dto/query-trainer-orders.dto';
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
    if (dto.orderType === OrderType.Workout) {
      const workoutId = purchaseId;
      const workout = await this.workoutService.checkWorkoutExist(workoutId);
      orderEntity = new OrderEntity({
        ...orderData,
        workoutId,
        price: workout.price,
        userId,
      });
    } else {
      const sportGymId = purchaseId;
      orderEntity = new OrderEntity({ ...orderData, sportGymId, userId, price: undefined });
    }
    return this.orderRepository.create(orderEntity);
  }

  async getOrdersForTrainer(query: QueryTrainerOrders, userId: number) {
    const summary = await this.orderRepository.findOrdersForTrainer(
      query,
      userId
    );
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

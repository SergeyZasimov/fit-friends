import { Order, OrderType } from '@fit-friends/shared';
import { Injectable } from '@nestjs/common';
import { SportGymService } from '../sport-gym/sport-gym.service';
import { WorkoutService } from '../workout/workout.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { QueryTrainerOrders } from './dto/query-trainer-orders.dto';
import { OrderEntity } from './order.entity';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly workoutService: WorkoutService,
    private readonly sportGymService: SportGymService
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
      const sportGym = await this.sportGymService.getOne(sportGymId);
      orderEntity = new OrderEntity({
        ...orderData,
        sportGymId,
        userId,
        price: sportGym.oneWorkoutPrice,
      });
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

  async getOrdersForCustomer(userId: number) {
    const summary = await this.orderRepository.findOrdersForCustomer(userId);
    const result = {};
    for (const item of summary) {
      switch (item.orderType) {
        case OrderType.SportGym:
          result['sportGym'] = item._count.id;
          break;
        case OrderType.Workout:
          result['workout'] = item._count.id;
          break;
      }
    }
    return result;
  }
}

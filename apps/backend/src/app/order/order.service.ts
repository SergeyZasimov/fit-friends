import { Order, OrderTypes } from '@fit-friends/shared';
import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderEntity } from './order.entity';
import { OrderRepository } from './order.repository';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async create(dto: CreateOrderDto, userId: number): Promise<Order> {
    const { purchaseId, ...orderData } = dto;
    let orderEntity: OrderEntity;
    if (dto.orderType === OrderTypes.Workout) {
      const workoutId = purchaseId;
      orderEntity = new OrderEntity({ ...orderData, workoutId, userId });
    } else {
      const sportGymId = purchaseId;
      orderEntity = new OrderEntity({ ...orderData, sportGymId, userId });
    }
    return this.orderRepository.create(orderEntity);
  }
}

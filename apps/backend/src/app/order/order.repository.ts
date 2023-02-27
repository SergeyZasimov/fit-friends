import { Order } from '@fit-friends/shared';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(entity: OrderEntity): Promise<Order> {
    const { workoutId, sportGymId, userId, ...orderData } = entity;
    return this.prisma.order.create({
      data: {
        ...orderData,
        user: {
          connect: {
            id: userId,
          },
        },
        workout: workoutId
          ? {
              connect: {
                id: workoutId,
              },
            }
          : undefined,
        sportGym: sportGymId
          ? {
              connect: {
                id: sportGymId,
              },
            }
          : undefined,
      },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
        workout: {
          include: {
            trainer: {
              include: {
                profile: true,
              },
            },
          },
        },
      },
    });
  }
}

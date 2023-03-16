import { Order, SortOption, SortType } from '@fit-friends/shared';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QueryTrainerOrders } from './dto/query-trainer-orders.dto';
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

  async findOrdersForTrainer(query: QueryTrainerOrders, userId: number) {
    const { sortOption, limit, page, sortType } = query;
    const sortOrder = sortType === SortType.Desc ? 'desc' : 'asc';
    return this.prisma.order.groupBy({
      by: ['workoutId'],
      where: {
        workout: {
          trainerId: userId,
        },
      },
      _count: {
        id: true,
      },
      _sum: {
        totalCost: true,
      },
      orderBy: [
        sortOption === SortOption.Price
          ? {
              _sum: {
                totalCost: sortOrder,
              },
            }
          : undefined,
        sortOption === SortOption.Count
          ? {
              _count: {
                id: sortOrder,
              },
            }
          : undefined,
      ],
      skip: limit * (page - 1) || undefined,
      take: limit,
    });
  }

  async findOrdersForCustomer(userId: number) {
    return this.prisma.order.groupBy({
      by: ['orderType'],
      where: {
        userId,
      },
      _count: {
        id: true,
      },
    });
  }
}

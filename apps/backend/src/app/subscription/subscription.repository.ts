import { Subscription } from '@fit-friends/shared';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SubscriptionEntity } from './subscription.entity';

@Injectable()
export class SubscriptionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(userId: number, trainerId: number): Promise<Subscription> {
    return this.prisma.subscription.findUnique({
      where: {
        userId_trainerId: {
          userId,
          trainerId,
        },
      },
    });
  }

  async create(entity: SubscriptionEntity): Promise<Subscription> {
    const { userId, ...data } = entity;
    return this.prisma.subscription.create({
      data: {
        ...data,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async update(id: number, lastNotify: Date): Promise<Subscription> {
    return this.prisma.subscription.update({
      where: {
        id,
      },
      data: {
        lastNotify,
      },
    });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.subscription.delete({
      where: {
        id,
      },
    });
  }
}

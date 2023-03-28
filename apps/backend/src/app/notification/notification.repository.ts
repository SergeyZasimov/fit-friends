import { Notification } from '@fit-friends/shared';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { NotificationEntity } from './notification.entity';

@Injectable()
export class NotificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(entity: NotificationEntity): Promise<Notification> {
    const { userId, ...data } = entity;
    return this.prisma.notification.create({
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

  async findMany(userId: number): Promise<Notification[]> {
    return this.prisma.notification.findMany({
      where: { userId },
    });
  }

  async findOne(id: number): Promise<Notification> {
    return this.prisma.notification.findUnique({
      where: { id },
    });
  }

  async delete(id: number): Promise<Notification> {
    return this.prisma.notification.delete({
      where: { id },
    });
  }
}

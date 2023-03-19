import { Notification } from '@fit-friends/shared';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BasicQueryDto } from '../query/basic-query.dto';
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

  async findMany(
    userId: number,
    query: BasicQueryDto
  ): Promise<Notification[]> {
    const { sortOption, sortType, limit, page } = query;
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: {
        [sortOption]: sortType,
      },
      skip: limit * (page - 1) || undefined,
      take: limit,
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

import { FoodDiary } from '@fit-friends/shared';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FoodDiaryEntity } from './food-diary.entity';

@Injectable()
export class FoodDiaryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(entity: FoodDiaryEntity): Promise<FoodDiary> {
    const { userId, ...data } = entity;

    return this.prisma.foodDiary.create({
      data: {
        ...data,
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<FoodDiary> {
    return this.prisma.foodDiary.findUnique({
      where: { id },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
    });
  }

  async findMany(userId: number): Promise<FoodDiary[]> {
    return this.prisma.foodDiary.findMany({
      where: { userId },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
    });
  }

  async update(id: number, entity: FoodDiaryEntity): Promise<FoodDiary> {
    const { userId, ...data } = entity;
    return this.prisma.foodDiary.update({
      where: { id },
      data: {
        ...data,
        user: {
          connect: {
            id: userId,
          },
        },
      },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
    });
  }

  async delete(id: number): Promise<FoodDiary> {
    return this.prisma.foodDiary.delete({ where: { id } });
  }
}

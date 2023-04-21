import { FoodDiary } from '@fit-friends/shared';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QueryFoodDiaryDto } from './dto/query-food-diary.dto';
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

  async findOneByDateType(
    dateOfMeal: Date,
    typeOfMeal: string,
    userId: number
  ) {
    return this.prisma.foodDiary.findUnique({
      where: {
        dateOfMeal_typeOfMeal_userId: {
          dateOfMeal,
          typeOfMeal,
          userId,
        },
      },
    });
  }

  async findMany(
    userId: number,
    query: QueryFoodDiaryDto
  ): Promise<FoodDiary[]> {
    const { weekBegin, weekEnd } = query;
    return this.prisma.foodDiary.findMany({
      where: {
        userId: userId,
        AND: [
          {
            dateOfMeal: { lte: weekEnd },
          },
          {
            dateOfMeal: { gte: weekBegin },
          },
        ],
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

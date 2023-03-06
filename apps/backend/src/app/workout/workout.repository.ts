import { Workout } from '@fit-friends/shared';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QueryWorkoutDto } from './dto/query-workout.dto';
import { WorkoutEntity } from './workout.entity';

@Injectable()
export class WorkoutRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(id: number): Promise<Workout> {
    return this.prisma.workout.findUnique({
      where: { id },
      include: {
        trainer: {
          include: {
            profile: true,
          },
        },
      },
    });
  }

  async findMany(query: QueryWorkoutDto, userId: number): Promise<Workout[]> {
    const {
      caloriesRange,
      priceRange,
      rating,
      trainingTime,
      limit,
      page,
      sortOption,
      sortType,
    } = query;

    return this.prisma.workout.findMany({
      where: {
        trainerId: userId,
        rating,
        trainingTime: { in: trainingTime },
        AND: [
          {
            price: {
              lte: priceRange ? priceRange[1] : undefined,
            },
          },
          {
            price: {
              gte: priceRange ? priceRange[0] : undefined,
            },
          },
          {
            caloriesAmountToLose: {
              lte: caloriesRange ? caloriesRange[1] : undefined,
            },
          },
          {
            caloriesAmountToLose: {
              gte: caloriesRange ? caloriesRange[0] : undefined,
            },
          },
        ],
      },
      include: {
        trainer: {
          include: {
            profile: true,
          },
        },
      },
      orderBy: {
        [sortOption]: sortType,
      },
      skip: limit * (page - 1) || undefined,
      take: limit,
    });
  }

  async create(entity: WorkoutEntity): Promise<Workout> {
    return this.prisma.workout.create({
      data: {
        ...entity,
        trainer: {
          connect: {
            id: entity.trainer,
          },
        },
      },
      include: {
        trainer: {
          include: {
            profile: true,
          },
        },
      },
    });
  }

  async update(id: number, entity: WorkoutEntity): Promise<Workout> {
    return this.prisma.workout.update({
      where: { id },
      data: {
        ...entity,
        trainer: {
          connect: {
            id: entity.trainer,
          },
        },
      },
      include: {
        trainer: {
          include: {
            profile: true,
          },
        },
      },
    });
  }
}

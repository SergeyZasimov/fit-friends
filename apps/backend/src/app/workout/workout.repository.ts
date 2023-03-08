import { Workout } from '@fit-friends/shared';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QueryWorkoutDto } from './dto/query-workout.dto';
import { WorkoutEntity } from './workout.entity';

const LOWER_LIMIT_INDEX = 0;
const UPPER_LIMIT_INDEX = 1;

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
              lte: priceRange ? priceRange[UPPER_LIMIT_INDEX] : undefined,
            },
          },
          {
            price: {
              gte: priceRange ? priceRange[LOWER_LIMIT_INDEX] : undefined,
            },
          },
          {
            caloriesAmountToLose: {
              lte: caloriesRange ? caloriesRange[UPPER_LIMIT_INDEX] : undefined,
            },
          },
          {
            caloriesAmountToLose: {
              gte: caloriesRange ? caloriesRange[LOWER_LIMIT_INDEX] : undefined,
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

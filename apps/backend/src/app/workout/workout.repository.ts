import { Workout } from '@fit-friends/shared';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QueryWorkoutDto } from './dto/query-workout.dto';
import { WorkoutEntity } from './workout.entity';

const LIMIT_INDEX = {
  LOWER: 0,
  UPPER: 1,
};

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
      ratingRange,
      trainingTime,
      limit,
      page,
      sortOption,
      sortType,
      trainingType,
      isSpecial,
    } = query;

    return this.prisma.workout.findMany({
      where: {
        trainerId: userId,
        trainingTime: { in: trainingTime },
        trainingType: { in: trainingType },
        isSpecial: isSpecial,
        AND: [
          {
            price: {
              lte: priceRange ? priceRange[LIMIT_INDEX.UPPER] : undefined,
            },
          },
          {
            price: {
              gte: priceRange ? priceRange[LIMIT_INDEX.LOWER] : undefined,
            },
          },
          {
            caloriesAmountToLose: {
              lte: caloriesRange ? caloriesRange[LIMIT_INDEX.UPPER] : undefined,
            },
          },
          {
            caloriesAmountToLose: {
              gte: caloriesRange ? caloriesRange[LIMIT_INDEX.LOWER] : undefined,
            },
          },
          {
            rating: {
              lte: ratingRange ? ratingRange[LIMIT_INDEX.UPPER] : undefined,
            },
          },
          {
            rating: {
              gte: ratingRange ? ratingRange[LIMIT_INDEX.LOWER] : undefined,
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

  async findManyForSubscription(
    trainerId: number,
    lastNotify: Date
  ): Promise<Workout[]> {
    return this.prisma.workout.findMany({
      where: {
        trainerId,
        createdAt: {
          gt: lastNotify ?? undefined,
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

  async findManyByTrainer(trainerId: number): Promise<Workout[]> {
    return this.prisma.workout.findMany({ where: { trainerId } });
  }

  async create(entity: WorkoutEntity): Promise<Workout> {
    return this.prisma.workout.create({
      data: {
        ...entity,
        video: entity.video as string,
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
        video: entity.video as string,
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

  async updateRating(workoutId: number, rating: number): Promise<Workout> {
    return this.prisma.workout.update({
      where: {
        id: workoutId,
      },
      data: {
        rating,
      },
    });
  }

  async findWorkoutsInfo(trainerId: number | undefined) {
    return this.prisma.workout.aggregate({
      where: { trainerId },
      _min: {
        price: true,
        caloriesAmountToLose: true,
      },
      _max: {
        price: true,
        caloriesAmountToLose: true,
      },
    });
  }
}

import { Workout } from '@fit-friends/shared';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WorkoutEntity } from './workout.entity';

@Injectable()
export class WorkoutRepository {
  constructor(private readonly prisma: PrismaService) {}

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
}

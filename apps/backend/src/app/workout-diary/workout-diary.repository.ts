import { WorkoutDiary } from '@fit-friends/shared';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { WorkoutDiaryEntity } from './workout-diary.entity';

@Injectable()
export class WorkoutDiaryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(entity: WorkoutDiaryEntity): Promise<WorkoutDiary> {
    const { userId, workoutId, ...data } = entity;
    return this.prisma.workoutDiary.create({
      data: {
        ...data,
        user: {
          connect: {
            id: userId,
          },
        },
        workout: {
          connect: {
            id: workoutId,
          },
        },
      },
    });
  }

  async findMany(userId: number): Promise<WorkoutDiary[]> {
    return this.prisma.workoutDiary.findMany({ where: { userId } });
  }
}

import { WorkoutDiary } from '@fit-friends/shared';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QueryDiaryDto } from '../query/diary-query.dto';
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

  async findMany(
    userId: number,
    query: QueryDiaryDto
  ): Promise<WorkoutDiary[]> {
    const { weekBegin, weekEnd } = query;
    return this.prisma.workoutDiary.findMany({
      where: {
        userId: userId,
        AND: [
          {
            workoutDate: {
              gte: weekBegin,
            },
          },
          {
            workoutDate: {
              lte: weekEnd,
            },
          },
        ],
      },
    });
  }
}

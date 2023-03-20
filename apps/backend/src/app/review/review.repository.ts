import { Review } from '@fit-friends/shared';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReviewEntity } from './review.entity';

@Injectable()
export class ReviewRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(entity: ReviewEntity): Promise<Review> {
    const { userId, workoutId, ...data } = entity;
    return this.prisma.review.create({
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

  async findMany(workoutId: number): Promise<Review[]> {
    return this.prisma.review.findMany({
      where: { workoutId },
      include: {
        user: {
          include: {
            profile: true,
          },
        },
      },
    });
  }

  async findOne(id: number): Promise<Review> {
    return this.prisma.review.findUnique({
      where: { id },
      include: {
        workout: true,
        user: {
          include: {
            profile: true,
          },
        },
      },
    });
  }

  async getRating(workoutId: number): Promise<number> {
    const {
      _avg: { rating },
    } = await this.prisma.review.aggregate({
      where: { workoutId },
      _avg: {
        rating: true,
      },
    });

    return Math.round(rating);
  }
}

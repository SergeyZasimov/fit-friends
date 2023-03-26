import { SportGym } from '@fit-friends/shared';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QuerySportGymDto } from './dto/query-sport-gym.dto';
import { SportGymEntity } from './sport-gym.entity';

const LIMIT_INDEX = {
  LOWER: 0,
  UPPER: 1,
};

@Injectable()
export class SportGymRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(entity: SportGymEntity): Promise<SportGym> {
    return this.prisma.sportGym.create({ data: { ...entity } });
  }

  async findOne(id: number): Promise<SportGym> {
    return this.prisma.sportGym.findUnique({ where: { id } });
  }

  async findMany(query: QuerySportGymDto): Promise<SportGym[]> {
    const {
      limit,
      page,
      sortOption,
      sortType,
      location,
      parameters,
      priceRange,
      status,
    } = query;

    return this.prisma.sportGym.findMany({
      where: {
        location: { in: location },
        parameters: parameters ? { hasSome: parameters } : undefined,
        isVerified: status,
        AND: [
          {
            oneWorkoutPrice: {
              lte: priceRange ? priceRange[LIMIT_INDEX.UPPER] : undefined,
            },
          },
          {
            oneWorkoutPrice: {
              gte: priceRange ? priceRange[LIMIT_INDEX.LOWER] : undefined,
            },
          },
        ],
      },
      orderBy: {
        [sortOption]: sortType,
      },
      skip: limit * (page - 1) || undefined,
      take: limit,
    });
  }
}

import { FavoriteAction } from '@fit-friends/shared';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ProfileQueryDto } from '../profile/dto/profile-query.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(protected readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        profile: true,
      },
    });
  }

  async find(query: ProfileQueryDto): Promise<User[]> {
    const { limit, page, sortType, sortOption, isReadyToTraining } = query;
    return this.prisma.user.findMany({
      where: {
        profile: {
          isReadyToTraining,
        },
      },
      include: {
        profile: true,
      },
      orderBy: {
        [sortOption]: sortType,
      },
      skip: limit * (page - 1) || undefined,
      take: limit,
    });
  }

  async create(user: UserEntity): Promise<User> {
    return this.prisma.user.create({ data: user });
  }

  async update(id: number, user: UserEntity): Promise<User> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: { ...user },
    });
  }

  async addFriend(userId: number, friendId: number): Promise<User> {
    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        friends: {
          connect: {
            id: friendId,
          },
        },
      },
    });
  }

  async findFriends(id: number, query: ProfileQueryDto) {
    const { limit, page, sortType, sortOption } = query;
    const result = await this.prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        friends: {
          include: {
            profile: true,
          },
          orderBy: {
            [sortOption]: sortType,
          },
          skip: limit * (page - 1) || undefined,
          take: limit,
        },
      },
    });
    return result ? result.friends : [];
  }

  async findFavoriteGyms(userId: number) {
    const result = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        sportGyms: true,
      },
    });
    return result ? result.sportGyms : [];
  }

  async updateSportGymToFavorite(
    userId: number,
    gymId: number,
    favoriteAction: keyof typeof FavoriteAction
  ) {
    const action =
      favoriteAction === FavoriteAction.Add
        ? {
            connect: {
              id: gymId,
            },
          }
        : {
            disconnect: {
              id: gymId,
            },
          };

    return this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        sportGyms: action,
      },
    });
  }
}

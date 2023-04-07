import { Profile } from '@fit-friends/shared';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProfileEntity } from './profile.entity';

@Injectable()
export class ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(profile: ProfileEntity): Promise<Profile> {
    return this.prisma.profile.create({
      data: {
        ...profile,
        avatar: profile.avatar as string,
        certificate: profile.certificate as string,
        user: {
          connect: {
            id: profile.user,
          },
        },
      },
    });
  }

  async update(userId: number, profile: ProfileEntity): Promise<Profile> {
    return this.prisma.profile.update({
      where: {
        userId,
      },
      data: {
        ...profile,
        avatar: profile.avatar as string,
        certificate: profile.certificate as string,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
}

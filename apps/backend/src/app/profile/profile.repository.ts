import { Profile } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { ProfileEntity } from './profile.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(profile: ProfileEntity): Promise<Profile> {
    return this.prisma.profile.create({
      data: {
        ...profile,
        user: {
          connect: {
            id: profile.user,
          },
        },
      },
    });
  }
}

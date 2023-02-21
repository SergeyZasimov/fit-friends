import { User } from '@fit-friends/shared';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        profile: true,
      },
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
}

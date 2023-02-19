import { User } from '@fit-friends/shared';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: UserEntity): Promise<User> {
    return this.prisma.user.create({ data: user });
  }

  async findByEmail(email: string): Promise<User> {
    return this.prisma.user.findFirst({ where: { email } });
  }
}

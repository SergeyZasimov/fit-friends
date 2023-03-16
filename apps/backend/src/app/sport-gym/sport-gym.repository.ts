import { SportGym } from '@fit-friends/shared';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SportGymEntity } from './sport-gym.entity';

@Injectable()
export class SportGymRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(entity: SportGymEntity): Promise<SportGym> {
    return this.prisma.sportGym.create({ data: { ...entity } });
  }

  async findOne(id: number): Promise<SportGym> {
    return this.prisma.sportGym.findFirst({ where: { id } });
  }
}

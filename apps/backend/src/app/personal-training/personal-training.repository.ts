import { PersonalTraining } from '@fit-friends/shared';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PersonalTrainingEntity } from './personal-training.entity';

@Injectable()
export class PersonalTrainingRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(entity: PersonalTrainingEntity): Promise<PersonalTraining> {
    const { requesterId, conductorId, ...data } = entity;
    return this.prisma.personalTraining.create({
      data: {
        ...data,
        conductor: {
          connect: {
            id: conductorId,
          },
        },
        requester: {
          connect: {
            id: requesterId,
          },
        },
      },
      include: {
        requester: {
          include: {
            profile: true,
          },
        },
      },
    });
  }

  async updateStatus(id: number, status: string): Promise<PersonalTraining> {
    return this.prisma.personalTraining.update({
      where: { id },
      data: {
        status,
      },
    });
  }

  async findOne(id: number): Promise<PersonalTraining> {
    return this.prisma.personalTraining.findUnique({
      where: { id },
    });
  }

  async findRequestsToConductor(userId: number): Promise<PersonalTraining[]> {
    return this.prisma.personalTraining.findMany({
      where: { conductorId: userId },
    });
  }

  async findUserRequests(userId: number): Promise<PersonalTraining[]> {
    return this.prisma.personalTraining.findMany({
      where: { requesterId: userId },
    });
  }
}

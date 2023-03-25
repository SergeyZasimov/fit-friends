import { PersonalTraining, TrainingStatus } from '@fit-friends/shared';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { createPersonalTrainingNotification } from '../notification/notification.constant';
import { NotificationService } from '../notification/notification.service';
import { CreatePersonalTrainingDto } from './dto/create-personal-training.dto';
import { UpdatePersonalTrainingDto } from './dto/update-personal-training.dto';
import { PersonalTrainingExceptionMessage } from './personal-training.constant';
import { PersonalTrainingEntity } from './personal-training.entity';
import { PersonalTrainingRepository } from './personal-training.repository';

@Injectable()
export class PersonalTrainingService {
  constructor(
    private readonly personalTrainingRepository: PersonalTrainingRepository,
    private readonly notificationService: NotificationService
  ) {}
  
  async create(
    data: CreatePersonalTrainingDto,
    userId: number
  ): Promise<PersonalTraining> {
    if (data.conductorId === userId) {
      throw new BadRequestException(
        PersonalTrainingExceptionMessage.ConductorError
      );
    }

    const entity = new PersonalTrainingEntity({
      ...data,
      requesterId: userId,
      status: TrainingStatus.UnderConsideration,
    });

    const newPersonalTraining = await this.personalTrainingRepository.create(
      entity
    );

    await this.notificationService.create({
      userId: newPersonalTraining.conductorId,
      text: createPersonalTrainingNotification(
        newPersonalTraining.requester.profile.name
      ),
    });

    return newPersonalTraining;
  }

  async update(
    data: UpdatePersonalTrainingDto,
    userId: number
  ): Promise<PersonalTraining> {
    const { id, status } = data;
    const existPersonalTraining = await this.personalTrainingRepository.findOne(
      id
    );

    if (!existPersonalTraining) {
      throw new NotFoundException(PersonalTrainingExceptionMessage.NotFound);
    }

    if (existPersonalTraining.requesterId === userId) {
      throw new ForbiddenException(
        PersonalTrainingExceptionMessage.OwnPersonalTraining
      );
    }

    if (existPersonalTraining.conductorId !== userId) {
      throw new ForbiddenException(
        PersonalTrainingExceptionMessage.ForeignPersonalTraining
      );
    }

    if (existPersonalTraining.status === status) {
      throw new ConflictException(PersonalTrainingExceptionMessage.Conflict);
    }

    return this.personalTrainingRepository.updateStatus(id, status);
  }
}

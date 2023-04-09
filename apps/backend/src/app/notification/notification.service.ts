import { CreateNotification, Notification } from '@fit-friends/shared';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { NotificationExceptionMessage } from './notification.constant';
import { NotificationEntity } from './notification.entity';
import { NotificationRepository } from './notification.repository';

@Injectable()
export class NotificationService {
  constructor(
    private readonly notificationRepository: NotificationRepository
  ) {}

  async create(data: CreateNotification): Promise<Notification> {
    const notificationEntity = new NotificationEntity(data);
    return this.notificationRepository.create(notificationEntity);
  }

  async getMany(userId: number): Promise<Notification[]> {
    return this.notificationRepository.findMany(userId);
  }

  async delete(id: number, userId: number): Promise<Notification[]> {
    const existNotification = await this.notificationRepository.findOne(id);

    if (!existNotification) {
      throw new NotFoundException(NotificationExceptionMessage.NotFound);
    }

    if (existNotification.userId !== userId) {
      throw new ForbiddenException(
        NotificationExceptionMessage.ForeignNotification
      );
    }

    await this.notificationRepository.delete(id);
    return this.getMany(userId);
  }
}

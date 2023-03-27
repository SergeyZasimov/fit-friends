import { Subscription, User, Workout } from '@fit-friends/shared';
import { MailerService } from '@nestjs-modules/mailer';
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProfileService } from '../profile/profile.service';
import { fillObject } from '../utils/helpers';
import { WorkoutRdo } from '../workout/rdo/workout.rdo';
import { WorkoutService } from '../workout/workout.service';
import { SubscriptionExceptionMessage } from './subscription.constant';
import { SubscriptionEntity } from './subscription.entity';
import { SubscriptionRepository } from './subscription.repository';

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: SubscriptionRepository,
    private readonly workoutService: WorkoutService,
    private readonly profileService: ProfileService,
    private readonly mailerService: MailerService
  ) {}

  async addSubscribe(userId: number, trainerId: number): Promise<Subscription> {
    const existTrainer = await this.profileService.getOne(trainerId);
    if (!existTrainer) {
      throw new NotFoundException(SubscriptionExceptionMessage.TrainerNotFound);
    }

    const existSubscription = await this.subscriptionRepository.findOne(
      userId,
      trainerId
    );

    if (existSubscription) {
      throw new ConflictException(
        SubscriptionExceptionMessage.SubscriptionConflict
      );
    }

    const subscriptionEntity = new SubscriptionEntity({ userId, trainerId });
    return this.subscriptionRepository.create(subscriptionEntity);
  }

  async getNotify(
    userId: number,
    trainerId: number,
    userEmail: string
  ): Promise<void> {
    const { id, lastNotify } = await this.checkExist(userId, trainerId);
    const result = await this.workoutService.getFotSubscriptionNotify(
      trainerId,
      lastNotify
    );
    await this.subscriptionRepository.update(id, new Date());
    await this.sendNotify(result, userEmail);
  }

  async deleteSubscription(userId: number, trainerId: number): Promise<void> {
    const { id } = await this.checkExist(userId, trainerId);
    await this.subscriptionRepository.delete(id);
  }

  async sendNotify(workouts: Workout[], userEmail: string): Promise<void> {
    const data = workouts.map((item: Workout) =>
      fillObject(WorkoutRdo, item, (item.trainer as User).role)
    );

    await this.mailerService.sendMail({
      to: userEmail,
      subject: 'Notify new workouts',
      template: './workouts-notify.hbs',
      context: {
        workouts: data,
      },
    });
  }

  private async checkExist(
    userId: number,
    trainerId: number
  ): Promise<Subscription> {
    const existSubscription = await this.subscriptionRepository.findOne(
      userId,
      trainerId
    );
    if (!existSubscription) {
      throw new NotFoundException(
        SubscriptionExceptionMessage.SubscriptionNotFound
      );
    }

    return existSubscription;
  }
}

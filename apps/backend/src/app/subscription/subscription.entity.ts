import { Subscription } from '@fit-friends/shared';

export class SubscriptionEntity implements Subscription {
  userId: number;
  lastNotify?: Date;
  trainerId: number;

  constructor(entity: Subscription) {
    this.userId = entity.userId;
    this.lastNotify = entity.lastNotify;
    this.trainerId = entity.trainerId;
  }
}

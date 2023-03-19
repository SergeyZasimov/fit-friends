import { Notification } from '@fit-friends/shared';

export class NotificationEntity implements Notification {
  userId?: number;
  text: string;

  constructor(entity: Notification) {
    this.userId = entity.userId;
    this.text = entity.text;
  }
}

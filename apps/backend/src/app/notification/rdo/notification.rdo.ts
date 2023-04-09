import { Notification } from '@fit-friends/shared';
import { Expose } from 'class-transformer';

export class NotificationRdo implements Notification {
  @Expose()
  id: number;

  @Expose()
  text: string;

  @Expose()
  createdAt: Date;
}

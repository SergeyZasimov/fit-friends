import { User } from './user.types';

export type Notification = {
  id?: number;
  userId?: number;
  user?: User;
  text: string;
  createdAt?: Date;
};

export type CreateNotification = Pick<Notification, 'userId' | 'text'>;

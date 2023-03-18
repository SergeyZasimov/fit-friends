import { User } from './user.types';

export type Subscription = {
  id?: number;
  userId?: number;
  user?: User;
  lastNotify?: Date;
  trainerId: number;
};

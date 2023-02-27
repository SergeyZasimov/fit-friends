import { SportGym } from './types';
import { User } from './user.types';
import { Workout } from './workout.type';

export type Order = {
  id?: number;
  userId?: number;
  user?: User;
  orderType: string;
  workoutId?: number;
  workout?: Workout;
  sportGymId?: number;
  sportGym?: SportGym;
  price: number;
  amount: number;
  totalCost?: number;
  paymentMethod: string;
  createdAt?: Date;
};

export type CreateOrder = Pick<
  Order,
  'orderType' | 'price' | 'amount' | 'paymentMethod'
> & { purchaseId: number };

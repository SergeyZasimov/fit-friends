import { User } from './user.types';
import { Workout } from './workout.type';

export type Review = {
  id?: number;
  userId?: number;
  user?: User;
  workoutId?: number;
  workout?: Workout;
  rating: number;
  text: string;
  createdAt?: Date;
};

export type CreateReview = Pick<Review, 'workoutId' | 'rating' | 'text'>;

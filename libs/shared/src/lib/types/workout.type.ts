import { BasicQuery } from './basic-query.type';
import { User } from './user.types';

export type Workout = {
  id?: number;
  title: string;
  backgroundImage: string;
  customerLevel?: string;
  trainingType: string;
  trainingTime: string;
  price: number;
  caloriesAmountToLose: number;
  description: string;
  favorGender: string;
  video?: File | string;
  rating?: number;
  trainer?: number | User;
  trainerId?: number;
  isSpecial: boolean;
};

export type CreateWorkout = Omit<
  Workout,
  'id' | 'trainer' | 'backgroundImage' | 'rating'
>;

export type WorkoutQuery = BasicQuery & {
  priceRange?: number[];
  caloriesRange?: number[];
  ratingRange?: number[];
  trainingTime?: string[];
  trainingType?: string[];
  isSpecial?: boolean;
};

export type WorkoutsInfo = {
  _min: {
    price: number;
    caloriesAmountToLose: number;
  };
  _max: {
    price: number;
    caloriesAmountToLose: number;
  };
};

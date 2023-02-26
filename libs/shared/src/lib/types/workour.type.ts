import { User } from './user.types';

export type Workout = {
  id?: number;
  title: string;
  backgroundImage: string;
  customerLevel: string;
  trainingType: string;
  trainingTime: string;
  price: number;
  caloriesAmountToLose: number;
  description: string;
  favorGender: string;
  video: string;
  rating?: number;
  trainer: number | User;
  isSpecial: boolean;
};

export type CreateWorkout = Omit<
  Workout,
  'id' | 'trainer' | 'backgroundImage' | 'rating' | 'video'
>;

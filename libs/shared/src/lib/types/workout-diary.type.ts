import { User } from './user.types';
import { Workout } from './workout.type';

export type WorkoutDiary = {
  id?: number;
  userId?: number;
  user?: User;
  workoutId?: number;
  workout?: Workout;
  lostCaloriesAmount: number;
  lostTrainingTime: string;
  workoutDate?: Date;
};

export type CreateWorkoutDiary = Pick<
  WorkoutDiary,
  'workoutId' | 'lostCaloriesAmount' | 'lostTrainingTime'
>;

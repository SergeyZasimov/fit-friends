import { User } from './user.types';
import { Workout } from './workout.type';

export type SportGym = {
  id?: number;
  title: string;
  location: Location;
  isVerified: boolean;
  parameters: string[];
  photos: string[];
  description: string;
  oneWorkoutPrice: number;
  createdAd?: Date;
};

export type Review = {
  id?: number;
  userId: number;
  workoutId: number;
  rating: number;
  text: string;
  createdAt?: Date;
};

export type PersonalTrainingRequest = {
  id?: number;
  requesterId: number;
  conductorId: number;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Notification = {
  id?: number;
  userId: number;
  notifyAt?: Date;
  text: string;
};

export type BasicQuery = {
  limit?: number;
  page?: number;
  sortType?: string;
  sortOption?: string;
};

export type FoodDiary = {
  id?: number;
  userId?: number;
  user?: User;
  caloriesAmount: number;
  dateOfMeal: Date;
  typeOfMeal: string;
};

export type WorkoutDiary = {
  id?: number;
  userId?: number;
  user?: User;
  workoutId?: number;
  workout?: Workout;
  lostCaloriesAmount: number;
  lostTrainingTime: number;
  workoutDate: Date;
};

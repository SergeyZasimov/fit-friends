import { User } from './user.types';

export type FoodDiary = {
  id?: number;
  userId?: number;
  user?: User;
  caloriesAmount: number;
  dateOfMeal: Date;
  typeOfMeal: string;
};

export type CreateFoodDiary = Pick<
  FoodDiary,
  'caloriesAmount' | 'dateOfMeal' | 'typeOfMeal'
>;

export type UpdateFoodDiary = Partial<CreateFoodDiary>;

export type QueryFoodDiary = {
  weekBegin: Date;
  weekEnd: Date;
};

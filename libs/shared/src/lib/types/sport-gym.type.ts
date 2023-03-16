import { User } from './user.types';

export type SportGym = {
  id?: number;
  title: string;
  location: string;
  isVerified: boolean;
  parameters: string[];
  photos?: string[];
  description: string;
  oneWorkoutPrice: number;
  createdAd?: Date;
  users?: User[];
};

export type CreateSportGym = Omit<SportGym, 'id' | 'createdAt' | 'users'>;

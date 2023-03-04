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


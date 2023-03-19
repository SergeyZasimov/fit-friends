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

export type BasicQuery = {
  limit?: number;
  page?: number;
  sortType?: string;
  sortOption?: string;
};

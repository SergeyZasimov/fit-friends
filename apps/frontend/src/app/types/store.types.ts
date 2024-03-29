import {
  FoodDiary,
  Notification,
  Order,
  OrderForTrainer,
  PersonalTraining,
  Review,
  SportGym,
  User,
  Workout,
  WorkoutDiary,
} from '@fit-friends/shared';
import { AxiosInstance } from 'axios';
import { store } from '../store';
import { rootReducer } from '../store/root-reducer';
import { RequestStatus } from '../utils/constants';

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type Reducer = ReturnType<typeof rootReducer>;

export type AsyncThunkOptionField = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
};

export type UserState = {
  user: User | null;
  errors: Record<string, string[]>;
  status: keyof typeof RequestStatus;
  users: User[];
  userCard: User | null;
};

export type NotificationState = {
  notifications: Notification[];
  status: keyof typeof RequestStatus;
};

export type WorkoutState = {
  workouts: Workout[];
  workout: Workout | null;
  errors: Record<string, string[]>;
  priceInfo: { min: number; max: number } | null;
  caloriesInfo: { min: number; max: number } | null;
  status: keyof typeof RequestStatus;
};

export type ReviewState = {
  reviews: Review[];
  status: keyof typeof RequestStatus;
};

export type OrderState = {
  ordersForTrainer: OrderForTrainer[];
  ordersForCustomer: Order[];
  status: keyof typeof RequestStatus;
};

export type FriendsState = {
  friends: User[];
  status: keyof typeof RequestStatus;
};

export type PersonalTrainingStore = {
  personalTrainings: PersonalTraining[];
  myRequests: PersonalTraining[];
};

export type SportGymStore = {
  sportGyms: SportGym[];
  gymsPriceInfo: { min: number; max: number } | null;
  favoriteGyms: SportGym[];
  gym: SportGym | null;
};

export type FoodDiaryStore = {
  foodDiaryRecords: FoodDiary[];
};

export type WorkoutDiaryStore = {
  workoutDiaryRecords: WorkoutDiary[];
};

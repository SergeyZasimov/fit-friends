import {
  Notification,
  OrderForTrainer,
  PersonalTraining,
  Review,
  User,
  Workout,
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
};

export type OrderState = {
  ordersForTrainer: OrderForTrainer[];
};

export type FriendsState = {
  friends: User[];
};

export type PersonalTrainingStore = {
  personalTrainings: PersonalTraining[];
};

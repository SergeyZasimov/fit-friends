import { Notification, User, Workout } from '@fit-friends/shared';
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
  errors: Record<string, string[]>;
};

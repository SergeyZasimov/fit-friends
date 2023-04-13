import { combineReducers } from '@reduxjs/toolkit';
import { StoreNamespace } from '../utils/constants';
import NotificationReducer from './features/notification/notification-slice';
import OrderReducer from './features/order/order-slice';
import ReviewReducer from './features/review/review-slice';
import UserReducer from './features/user/user-slice';
import WorkoutReducer from './features/workout/workout-slice';

export const rootReducer = combineReducers({
  [StoreNamespace.UserStore]: UserReducer,
  [StoreNamespace.NotificationStore]: NotificationReducer,
  [StoreNamespace.WorkoutStore]: WorkoutReducer,
  [StoreNamespace.ReviewStore]: ReviewReducer,
  [StoreNamespace.OrderStore]: OrderReducer,
});

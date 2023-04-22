import { combineReducers } from '@reduxjs/toolkit';
import { StoreNamespace } from '../utils/constants';
import FoodDiaryReducer from './features/food-diary/food-diary.slice';
import FriendsReducer from './features/friends/friends-slice';
import NotificationReducer from './features/notification/notification-slice';
import OrderReducer from './features/order/order-slice';
import PersonalTrainingsReducer from './features/personal-training/personal-training-slice';
import ReviewReducer from './features/review/review-slice';
import SportGymsReducer from './features/sport-gyms/sport-gyms-slice';
import UserReducer from './features/user/user-slice';
import WorkoutDiaryReducer from './features/workout-diary/workout-diary.slice';
import WorkoutReducer from './features/workout/workout-slice';

export const rootReducer = combineReducers({
  [StoreNamespace.UserStore]: UserReducer,
  [StoreNamespace.NotificationStore]: NotificationReducer,
  [StoreNamespace.WorkoutStore]: WorkoutReducer,
  [StoreNamespace.ReviewStore]: ReviewReducer,
  [StoreNamespace.OrderStore]: OrderReducer,
  [StoreNamespace.FriendsStore]: FriendsReducer,
  [StoreNamespace.PersonalTrainingStore]: PersonalTrainingsReducer,
  [StoreNamespace.SportGymsStore]: SportGymsReducer,
  [StoreNamespace.FoodDiaryStore]: FoodDiaryReducer,
  [StoreNamespace.WorkoutDiaryStore]: WorkoutDiaryReducer,
});

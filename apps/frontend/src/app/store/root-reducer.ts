import { combineReducers } from '@reduxjs/toolkit';
import { StoreNamespace } from '../utils/constants';
import NotificationReducer from './features/notification/notification-slice';
import UserReducer from './features/user/user-slice';

export const rootReducer = combineReducers({
  [StoreNamespace.UserStore]: UserReducer,
  [StoreNamespace.NotificationStore]: NotificationReducer,
});

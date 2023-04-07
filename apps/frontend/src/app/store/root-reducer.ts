import { combineReducers } from '@reduxjs/toolkit';
import { StoreNamespace } from '../utils/constants';
import UserReducer from './features/user/user-slice';

export const rootReducer = combineReducers({
  [StoreNamespace.UserStore]: UserReducer,
});

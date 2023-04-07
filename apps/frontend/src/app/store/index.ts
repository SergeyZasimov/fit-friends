import { configureStore } from '@reduxjs/toolkit';
import { createApi } from '../services/api.service';
import { rootReducer } from './root-reducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: {
        extraArgument: createApi(),
      },
    });
  },
});

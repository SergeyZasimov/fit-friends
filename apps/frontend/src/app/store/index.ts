import { configureStore } from '@reduxjs/toolkit';
import { createApi } from '../services/api.service';
import { rootReducer } from './root-reducer';
import { redirectMiddleware } from './features/middlewares/redirect.middleware';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: {
        extraArgument: createApi(),
      },
    }).concat(redirectMiddleware)
  },
});

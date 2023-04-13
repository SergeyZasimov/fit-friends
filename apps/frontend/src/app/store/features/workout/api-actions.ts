import {
  CreateWorkout,
  UrlDomain,
  UrlRoute,
  Workout,
  WorkoutsInfo,
} from '@fit-friends/shared';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { browserHistory } from '../../../services/browser-history.service';
import { AsyncThunkOptionField } from '../../../types/store.types';
import { ActionName, AppRoute } from '../../../utils/constants';

export const createWorkout = createAsyncThunk<
  Workout,
  Record<string, FormDataEntryValue | string | File | null | undefined>,
  AsyncThunkOptionField
>(ActionName.Workout.Create, async (dto, { extra: api, rejectWithValue }) => {
  try {
    const { data } = await api.post(`/${UrlDomain.Workout}`, dto, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    browserHistory.push(`${AppRoute.TrainerAccount}/${AppRoute.MyWorkouts}`);
    return data;
  } catch (err) {
    if (axios.isAxiosError(err) && err.response) {
      const { message } = err.response.data;
      const errors: Record<string, string[]> = {};
      if (message instanceof Array) {
        (message as string[]).forEach((item) => {
          const [field, text] = item.split(':');
          errors[field] = errors[field] ? [...errors[field], text] : [text];
        });
        if (errors && errors.description) {
          errors.description.forEach((text) => toast.error(text));
        }
      } else {
        toast.error(message);
      }
      return rejectWithValue(errors);
    }
  }
});

export const fetchWorkouts = createAsyncThunk<
  Workout[],
  string,
  AsyncThunkOptionField
>(ActionName.Workout.FetchWorkouts, async (queryString, { extra: api }) => {
  const { data } = await api.get(`${UrlDomain.Workout}?${queryString}`);
  return data;
});

export const fetchWorkoutsInfo = createAsyncThunk<
  WorkoutsInfo,
  void,
  AsyncThunkOptionField
>(ActionName.Workout.FetchWorkoutsInfo, async (_, { extra: api }) => {
  const { data } = await api.get<WorkoutsInfo>(
    `${UrlDomain.Workout}/${UrlRoute.Info}`
  );
  return data;
});

export const fetchWorkout = createAsyncThunk<
  Workout,
  string,
  AsyncThunkOptionField
>(ActionName.Workout.FetchWorkout, async (workoutId, { extra: api }) => {
  const { data } = await api.get(`/${UrlDomain.Workout}/${workoutId}`);
  return data;
});

export const updateWorkout = createAsyncThunk<
  Workout,
  { workoutId: number; formData: Partial<CreateWorkout> },
  AsyncThunkOptionField
>(
  ActionName.Workout.UpdateWorkout,
  async (dto, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.patch<Workout>(
        `/${UrlDomain.Workout}/${dto.workoutId}`,
        dto.formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const { message } = err.response.data;
        const errors: Record<string, string[]> = {};
        if (message instanceof Array) {
          (message as string[]).forEach((item) => {
            const [field, text] = item.split(':');
            errors[field] = errors[field] ? [...errors[field], text] : [text];
          });
          if (errors && errors.description) {
            errors.description.forEach((text) => toast.error(text));
          }
        } else {
          toast.error(message);
        }
        return rejectWithValue(errors);
      }
      return rejectWithValue(err);
    }
  }
);

export const deleteVideo = createAsyncThunk<
  Workout,
  number,
  AsyncThunkOptionField
>(
  ActionName.Workout.DeleteVideo,
  async (workoutId, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.delete<Workout>(
        `/${UrlDomain.Workout}/${workoutId}`
      );
      return data;
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const { message } = err.response.data;
        toast.error(message);
      }
      return rejectWithValue(err);
    }
  }
);

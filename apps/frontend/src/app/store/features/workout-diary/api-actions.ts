import {
  CreateWorkoutDiary,
  UrlDomain,
  WorkoutDiary,
} from '@fit-friends/shared';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { HttpStatusCode } from 'axios';
import { toast } from 'react-toastify';
import { AsyncThunkOptionField } from '../../../types/store.types';
import { ActionName } from '../../../utils/constants';

export const createWorkoutDiaryRecord = createAsyncThunk<
  undefined,
  CreateWorkoutDiary,
  AsyncThunkOptionField
>(
  ActionName.WorkoutDiary.Create,
  async (dto, { extra: api, fulfillWithValue }) => {
    const response = await api.post(`/${UrlDomain.WorkoutDiary}`, dto);
    if (response.status === HttpStatusCode.Created) {
      toast.success('Тренировка записана в дневник тренировок');
    }
    return fulfillWithValue(undefined);
  }
);

export const fetchWorkoutDiaryRecords = createAsyncThunk<
  WorkoutDiary[],
  string,
  AsyncThunkOptionField
>(ActionName.WorkoutDiary.FetchMany, async (query, { extra: api }) => {
  const { data } = await api.get(`/${UrlDomain.WorkoutDiary}?${query}`);
  return data;
});

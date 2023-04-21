import { CreateFoodDiary, FoodDiary, UrlDomain } from '@fit-friends/shared';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { HttpStatusCode } from 'axios';
import { browserHistory } from '../../../services/browser-history.service';
import { AsyncThunkOptionField } from '../../../types/store.types';
import { ActionName } from '../../../utils/constants';

export const createFoodDiaryRecords = createAsyncThunk<
  undefined,
  CreateFoodDiary[],
  AsyncThunkOptionField
>(
  ActionName.FoodDiary.Create,
  async (dto, { extra: api, fulfillWithValue }) => {
    const response = await api.post(`/${UrlDomain.FoodDiary}`, dto);
    if (response.status === HttpStatusCode.Created) {
      browserHistory.back();
    }
    return fulfillWithValue(undefined);
  }
);

export const fetchFoodDiaryRecords = createAsyncThunk<
  FoodDiary[],
  string,
  AsyncThunkOptionField
>(ActionName.FoodDiary.FetchMany, async (query, { extra: api }) => {
  const { data } = await api.get<FoodDiary[]>(
    `/${UrlDomain.FoodDiary}?${query}`
  );
  return data;
});

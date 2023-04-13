import { Review, UrlDomain } from '@fit-friends/shared';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkOptionField } from '../../../types/store.types';
import { ActionName } from '../../../utils/constants';

export const fetchReviews = createAsyncThunk<
  Review[],
  string,
  AsyncThunkOptionField
>(ActionName.Review.FetchReviews, async (workoutId, { extra: api }) => {
  const { data } = await api.get(`/${UrlDomain.Review}/${workoutId}`);
  return data;
});

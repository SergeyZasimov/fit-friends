import { CreateReview, Review, UrlDomain } from '@fit-friends/shared';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkOptionField } from '../../../types/store.types';
import { ActionName } from '../../../utils/constants';
import { toastError } from '../../../utils/helpers';

export const fetchReviews = createAsyncThunk<
  Review[],
  string,
  AsyncThunkOptionField
>(ActionName.Review.FetchReviews, async (workoutId, { extra: api }) => {
  const { data } = await api.get(`/${UrlDomain.Review}/${workoutId}`);
  return data;
});

export const createReview = createAsyncThunk<
  Review,
  CreateReview,
  AsyncThunkOptionField
>(
  ActionName.Review.CreateReview,
  async (dto, { extra: api, dispatch, rejectWithValue }) => {
    try {
      const { data } = await api.post<Review>(`/${UrlDomain.Review}`, dto);
      return data;
    } catch (err) {
      toastError(err);
      return rejectWithValue(err);
    }
  }
);

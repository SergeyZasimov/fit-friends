import { Review } from '@fit-friends/shared';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReviewState, State } from '../../../types/store.types';
import { StoreNamespace } from '../../../utils/constants';
import { fetchReviews } from './api-actions';

const initialState: ReviewState = {
  reviews: [],
};

export const reviewSlice = createSlice({
  name: StoreNamespace.ReviewStore,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchReviews.fulfilled,
      (state, { payload }: PayloadAction<Review[]>) => {
        state.reviews = payload;
      }
    );
  },
});

export default reviewSlice.reducer

export const getReviews = (state: State) =>
  state[StoreNamespace.ReviewStore].reviews

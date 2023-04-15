import { Review } from '@fit-friends/shared';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReviewState, State } from '../../../types/store.types';
import { RequestStatus, StoreNamespace } from '../../../utils/constants';
import { createReview, fetchReviews } from './api-actions';

const initialState: ReviewState = {
  reviews: [],
  status: RequestStatus.Unknown,
};

export const reviewSlice = createSlice({
  name: StoreNamespace.ReviewStore,
  initialState,
  reducers: {
    resetReviewStatus: (state) => {
      state.status = RequestStatus.Unknown;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchReviews.fulfilled,
        (state, { payload }: PayloadAction<Review[]>) => {
          state.reviews = payload;
        }
      )
      .addCase(createReview.pending, (state) => {
        state.status = RequestStatus.Process;
      })
      .addCase(
        createReview.fulfilled,
        (state, { payload }: PayloadAction<Review>) => {
          state.status = RequestStatus.Success;
          state.reviews.unshift(payload)
        }
      )
      .addCase(createReview.rejected, (state) => {
        state.status = RequestStatus.Fail;
      });
  },
});

export default reviewSlice.reducer;

export const { resetReviewStatus } = reviewSlice.actions;

export const getReviews = (state: State) =>
  state[StoreNamespace.ReviewStore].reviews;

export const getReviewRequestStatus = (state: State) =>
  state[StoreNamespace.ReviewStore].status;

import { Workout, WorkoutsInfo } from '@fit-friends/shared';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { State, WorkoutState } from '../../../types/store.types';
import { RequestStatus, StoreNamespace } from '../../../utils/constants';
import {
  createWorkout,
  deleteVideo,
  fetchWorkout,
  fetchWorkouts,
  fetchWorkoutsInfo,
  updateWorkout,
} from './api-actions';

const initialState: WorkoutState = {
  workouts: [],
  workout: null,
  errors: {},
  priceInfo: null,
  caloriesInfo: null,
  status: RequestStatus.Unknown,
};

export const workoutSlice = createSlice({
  name: StoreNamespace.WorkoutStore,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkouts.pending, (state) => {
        state.status = RequestStatus.Process;
      })
      .addCase(fetchWorkouts.fulfilled, (state, { payload }) => {
        state.workouts = payload;
        state.status = RequestStatus.Success;
      })
      .addCase(fetchWorkouts.rejected, (state) => {
        state.status = RequestStatus.Fail;
      })
      .addCase(createWorkout.rejected, (state, { payload }) => {
        state.errors = payload as Record<string, string[]>;
      })
      .addCase(
        fetchWorkoutsInfo.fulfilled,
        (state, { payload }: PayloadAction<WorkoutsInfo>) => {
          state.priceInfo = {
            min: payload._min.price,
            max: payload._max.price,
          };
          state.caloriesInfo = {
            min: payload._min.caloriesAmountToLose,
            max: payload._max.caloriesAmountToLose,
          };
        }
      )
      .addCase(
        fetchWorkout.fulfilled,
        (state, { payload }: PayloadAction<Workout>) => {
          state.workout = payload;
        }
      )
      .addCase(
        updateWorkout.fulfilled,
        (state, { payload }: PayloadAction<Workout>) => {
          state.workout = payload;
        }
      )
      .addCase(updateWorkout.rejected, (state, { payload }) => {
        state.errors = payload as Record<string, string[]>;
      })
      .addCase(deleteVideo.fulfilled, (state, { payload }) => {
        state.workout = payload;
      });
  },
});

export default workoutSlice.reducer;

export const getWorkoutErrors = (state: State) =>
  state[StoreNamespace.WorkoutStore].errors;

export const getWorkouts = (state: State) =>
  state[StoreNamespace.WorkoutStore].workouts;

export const getWorkoutsPriceInfo = (state: State) =>
  state[StoreNamespace.WorkoutStore].priceInfo;

export const getWorkoutsCaloriesInfo = (state: State) =>
  state[StoreNamespace.WorkoutStore].caloriesInfo;

export const getWorkoutsRequestStatus = (state: State) =>
  state[StoreNamespace.WorkoutStore].status;

export const getWorkout = (state: State) =>
  state[StoreNamespace.WorkoutStore].workout;

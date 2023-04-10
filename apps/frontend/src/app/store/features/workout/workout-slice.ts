import { createSlice } from '@reduxjs/toolkit';
import { State, WorkoutState } from '../../../types/store.types';
import { StoreNamespace } from '../../../utils/constants';
import { createWorkout } from './api-actions';

const initialState: WorkoutState = {
  workouts: [],
  errors: {},
};

export const workoutSlice = createSlice({
  name: StoreNamespace.WorkoutStore,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createWorkout.rejected, (state, { payload }) => {
      state.errors = payload as Record<string, string[]>;
    });
  },
});

export default workoutSlice.reducer;

export const getWorkoutErrors = (state: State) =>
  state[StoreNamespace.WorkoutStore].errors;

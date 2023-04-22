import { WorkoutDiary } from '@fit-friends/shared';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { State, WorkoutDiaryStore } from '../../../types/store.types';
import { StoreNamespace } from '../../../utils/constants';
import { fetchWorkoutDiaryRecords } from './api-actions';

const initialState: WorkoutDiaryStore = {
  workoutDiaryRecords: [],
};

export const workoutDiarySlice = createSlice({
  name: StoreNamespace.WorkoutDiaryStore,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchWorkoutDiaryRecords.fulfilled,
      (state, { payload }: PayloadAction<WorkoutDiary[]>) => {
        state.workoutDiaryRecords = payload;
      }
    );
  },
});

export default workoutDiarySlice.reducer;

export const getWorkoutDiaryRecords = (state: State) =>
  state[StoreNamespace.WorkoutDiaryStore].workoutDiaryRecords;

import { FoodDiary } from '@fit-friends/shared';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FoodDiaryStore, State } from '../../../types/store.types';
import { StoreNamespace } from '../../../utils/constants';
import { fetchFoodDiaryRecords } from './api-actions';

const initialState: FoodDiaryStore = {
  foodDiaryRecords: [],
};

export const foodDiarySlice = createSlice({
  name: StoreNamespace.FoodDiaryStore,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchFoodDiaryRecords.fulfilled,
      (state, { payload }: PayloadAction<FoodDiary[]>) => {
        state.foodDiaryRecords = payload;
      }
    );
  },
});

export default foodDiarySlice.reducer;

export const getFoodDiaryRecords = (state: State) =>
  state[StoreNamespace.FoodDiaryStore].foodDiaryRecords;

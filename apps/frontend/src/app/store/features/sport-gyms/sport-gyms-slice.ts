import { SportGym, SportGymsInfo } from '@fit-friends/shared';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SportGymStore, State } from '../../../types/store.types';
import { StoreNamespace } from '../../../utils/constants';
import {
  fetchFavoriteGyms,
  fetchSportGyms,
  fetchSportGymsInfo,
} from './api-actions';

const initialState: SportGymStore = {
  sportGyms: [],
  gymsPriceInfo: null,
  favoriteGyms: [],
};

export const sportGymsSlice = createSlice({
  name: StoreNamespace.SportGymsStore,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchSportGyms.fulfilled,
        (state, { payload }: PayloadAction<SportGym[]>) => {
          state.sportGyms = payload;
        }
      )
      .addCase(
        fetchSportGymsInfo.fulfilled,
        (state, { payload }: PayloadAction<SportGymsInfo>) => {
          state.gymsPriceInfo = {
            min: payload._min.oneWorkoutPrice,
            max: payload._max.oneWorkoutPrice,
          };
        }
      )
      .addCase(
        fetchFavoriteGyms.fulfilled,
        (state, { payload }: PayloadAction<SportGym[]>) => {
          state.favoriteGyms = payload;
        }
      );
  },
});

export default sportGymsSlice.reducer;

export const getSportGyms = (state: State) =>
  state[StoreNamespace.SportGymsStore].sportGyms;

export const getGymsPriceInfo = (state: State) =>
  state[StoreNamespace.SportGymsStore].gymsPriceInfo;

export const getFavoriteGyms = (state: State) =>
  state[StoreNamespace.SportGymsStore].favoriteGyms;

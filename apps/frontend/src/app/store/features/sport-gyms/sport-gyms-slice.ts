import { SportGym } from '@fit-friends/shared';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SportGymStore, State } from '../../../types/store.types';
import { StoreNamespace } from '../../../utils/constants';
import { fetchSportGyms } from './api-actions';

const initialState: SportGymStore = {
  sportGyms: [],
};

export const sportGymsSlice = createSlice({
  name: StoreNamespace.SportGymsStore,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchSportGyms.fulfilled,
      (state, { payload }: PayloadAction<SportGym[]>) => {
        state.sportGyms = payload;
      }
    );
  },
});

export default sportGymsSlice.reducer;

export const getSportGyms = (state: State) =>
  state[StoreNamespace.SportGymsStore].sportGyms;

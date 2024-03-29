import { PersonalTraining } from '@fit-friends/shared';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PersonalTrainingStore, State } from '../../../types/store.types';
import { StoreNamespace } from '../../../utils/constants';
import {
  fetchMyRequests,
  fetchPersonalTrainings,
  updatePersonalTrainingStatus,
} from './api-actions';

const initialState: PersonalTrainingStore = {
  personalTrainings: [],
  myRequests: [],
};

export const personalTrainingSlice = createSlice({
  name: StoreNamespace.PersonalTrainingStore,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchPersonalTrainings.fulfilled,
        (state, { payload }: PayloadAction<PersonalTraining[]>) => {
          state.personalTrainings = payload;
        }
      )
      .addCase(
        fetchMyRequests.fulfilled,
        (state, { payload }: PayloadAction<PersonalTraining[]>) => {
          state.myRequests = payload;
        }
      )
      .addCase(
        updatePersonalTrainingStatus.fulfilled,
        (state, { payload }: PayloadAction<PersonalTraining>) => {
          const currentRequestIndex = state.personalTrainings.findIndex(
            (item) => item.id === payload.id
          );
          state.personalTrainings.splice(currentRequestIndex, 1, payload);
        }
      );
  },
});

export default personalTrainingSlice.reducer;

export const getPersonalTrainings = (state: State) =>
  state[StoreNamespace.PersonalTrainingStore].personalTrainings;

export const getMyRequests = (state: State) =>
  state[StoreNamespace.PersonalTrainingStore].myRequests;

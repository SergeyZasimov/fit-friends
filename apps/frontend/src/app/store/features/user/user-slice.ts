import { createSlice } from '@reduxjs/toolkit';
import { State, UserState } from '../../../types/store.types';
import { RequestStatus, StoreNamespace } from '../../../utils/constants';
import {
  fetchUser,
  login,
  questionnaireCustomer,
  questionnaireTrainer,
  registerUser,
  updateUser,
} from './api-actions';

const initialState: UserState = {
  user: null,
  errors: {},
  status: RequestStatus.Unknown,
};

export const userSlice = createSlice({
  name: StoreNamespace.UserStore,
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = RequestStatus.Unknown;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = RequestStatus.Process;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.status = RequestStatus.Success;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.errors = payload as Record<string, string[]>;
        state.status = RequestStatus.Fail;
      })
      .addCase(questionnaireCustomer.pending, (state) => {
        state.status = RequestStatus.Process;
      })
      .addCase(questionnaireCustomer.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.status = RequestStatus.Success;
      })
      .addCase(questionnaireCustomer.rejected, (state, { payload }) => {
        state.errors = payload as Record<string, string[]>;
        state.status = RequestStatus.Fail;
      })
      .addCase(questionnaireTrainer.pending, (state) => {
        state.status = RequestStatus.Process;
      })
      .addCase(questionnaireTrainer.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.status = RequestStatus.Success;
      })
      .addCase(questionnaireTrainer.rejected, (state, { payload }) => {
        state.errors = payload as Record<string, string[]>;
        state.status = RequestStatus.Fail;
      })
      .addCase(login.pending, (state) => {
        state.status = RequestStatus.Process;
      })
      .addCase(login.fulfilled, (state) => {
        state.status = RequestStatus.Success;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.errors = payload as Record<string, string[]>;
        state.status = RequestStatus.Fail;
      })
      .addCase(fetchUser.pending, (state) => {
        state.status = RequestStatus.Process;
      })
      .addCase(fetchUser.fulfilled, (state, { payload }) => {
        state.status = RequestStatus.Success;
        state.user = payload;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.status = RequestStatus.Fail;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = RequestStatus.Process;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.status = RequestStatus.Success;
        state.user = payload;
      })
      .addCase(updateUser.rejected, (state) => {
        state.status = RequestStatus.Fail;
      });
  },
});

export default userSlice.reducer;

export const { resetStatus } = userSlice.actions;

export const getErrors = (state: State) =>
  state[StoreNamespace.UserStore].errors;

export const getUserRequestStatus = (state: State) =>
  state[StoreNamespace.UserStore].status;

export const getUser = (state: State) => state[StoreNamespace.UserStore].user;

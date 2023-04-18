import { User } from '@fit-friends/shared';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { State, UserState } from '../../../types/store.types';
import { RequestStatus, StoreNamespace } from '../../../utils/constants';
import {
  deleteAvatar,
  deleteCertificate,
  fetchUser,
  fetchUserCard,
  fetchUsers,
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
  users: [],
  userCard: null,
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
      })
      .addCase(deleteCertificate.pending, (state) => {
        state.status = RequestStatus.Process;
      })
      .addCase(deleteCertificate.fulfilled, (state, { payload }) => {
        state.status = RequestStatus.Success;
        state.user = payload;
      })
      .addCase(deleteCertificate.rejected, (state) => {
        state.status = RequestStatus.Fail;
      })
      .addCase(deleteAvatar.pending, (state) => {
        state.status = RequestStatus.Process;
      })
      .addCase(deleteAvatar.fulfilled, (state, { payload }) => {
        state.status = RequestStatus.Success;
        state.user = payload;
      })
      .addCase(deleteAvatar.rejected, (state) => {
        state.status = RequestStatus.Fail;
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, { payload }: PayloadAction<User[]>) => {
          state.users = payload;
        }
      )
      .addCase(
        fetchUserCard.fulfilled,
        (state, { payload }: PayloadAction<User>) => {
          state.userCard = payload;
        }
      );
  },
});

export default userSlice.reducer;

export const { resetStatus } = userSlice.actions;

export const getErrors = (state: State) =>
  state[StoreNamespace.UserStore].errors;

export const getUserRequestStatus = (state: State) =>
  state[StoreNamespace.UserStore].status;

export const getUser = (state: State) => state[StoreNamespace.UserStore].user;

export const getUsers = (state: State) => state[StoreNamespace.UserStore].users;

export const getUserCard = (state: State) =>
  state[StoreNamespace.UserStore].userCard;

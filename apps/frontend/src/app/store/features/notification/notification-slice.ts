import { createSlice } from '@reduxjs/toolkit';
import { NotificationState, State } from '../../../types/store.types';
import { RequestStatus, StoreNamespace } from '../../../utils/constants';
import { deleteNotification, fetchNotifications } from './api-actions';

const initialState: NotificationState = {
  notifications: [],
  status: RequestStatus.Unknown,
};

export const notificationSlice = createSlice({
  name: StoreNamespace.NotificationStore,
  initialState,
  reducers: {
    resetNotificationRequestStatus: (state) => {
      state.status = RequestStatus.Unknown;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.fulfilled, (state, { payload }) => {
        state.notifications = payload;
      })
      .addCase(deleteNotification.pending, (state) => {
        state.status = RequestStatus.Process;
      })
      .addCase(deleteNotification.fulfilled, (state, { payload }) => {
        state.notifications = payload;
        state.status = RequestStatus.Success;
      });
  },
});

export default notificationSlice.reducer;

export const { resetNotificationRequestStatus } = notificationSlice.actions;

export const getNotifications = (state: State) =>
  state[StoreNamespace.NotificationStore].notifications;

export const getNotificationRequestStatus = (state: State) =>
  state[StoreNamespace.NotificationStore].status;

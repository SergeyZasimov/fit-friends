import { Notification, UrlDomain } from '@fit-friends/shared';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAccessToken } from '../../../services/token.service';
import { AsyncThunkOptionField } from '../../../types/store.types';
import { ActionName } from '../../../utils/constants';

export const fetchNotifications = createAsyncThunk<
  Notification[],
  void,
  AsyncThunkOptionField
>(ActionName.Notification.Fetch, async (_, { extra: api }) => {
  const accessToken = getAccessToken();
  const { data } = await api.get<Notification[]>(`${UrlDomain.Notification}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
});

export const deleteNotification = createAsyncThunk<
  Notification[],
  number,
  AsyncThunkOptionField
>(ActionName.Notification.Delete, async (id, { extra: api }) => {
  const accessToken = getAccessToken();
  const { data } = await api.delete(`${UrlDomain.Notification}/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
});

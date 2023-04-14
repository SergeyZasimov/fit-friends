import { UrlDomain, UrlRoute, User } from '@fit-friends/shared';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkOptionField } from '../../../types/store.types';
import { ActionName } from '../../../utils/constants';

export const fetchFriends = createAsyncThunk<
  User[],
  void,
  AsyncThunkOptionField
>(ActionName.Friends.FetchFriends, async (_, { extra: api }) => {
  const { data } = await api.get<User[]>(
    `/${UrlDomain.Profile}/${UrlRoute.Friends}`
  );
  return data;
});

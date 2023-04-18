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

export const addToFriends = createAsyncThunk<
  undefined,
  number,
  AsyncThunkOptionField
>(
  ActionName.Friends.AddToFriends,
  async (friendId, { extra: api, fulfillWithValue }) => {
    await api.get(`/${UrlDomain.Profile}/${UrlRoute.AddFriend}/${friendId}`);
    return fulfillWithValue(undefined);
  }
);

export const removeFromFriends = createAsyncThunk<
  undefined,
  number,
  AsyncThunkOptionField
>(
  ActionName.Friends.RemoveFromFriends,
  async (friendId, { extra: api, fulfillWithValue }) => {
    await api.get(`/${UrlDomain.Profile}/${UrlRoute.RemoveFriend}/${friendId}`);
    return fulfillWithValue(undefined);
  }
);

export const checkFriend = createAsyncThunk<
  undefined,
  string,
  AsyncThunkOptionField
>(
  ActionName.Friends.CheckFriend,
  async (friendId, { extra: api, fulfillWithValue }) => {
    await api.get(`/${UrlDomain.Profile}/${UrlRoute.CheckFriend}/${friendId}`);
    return fulfillWithValue(undefined);
  }
);

import {
  SportGym,
  SportGymsInfo,
  UrlDomain,
  UrlRoute,
} from '@fit-friends/shared';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkOptionField } from '../../../types/store.types';
import { ActionName } from '../../../utils/constants';

export const fetchSportGyms = createAsyncThunk<
  SportGym[],
  string,
  AsyncThunkOptionField
>(ActionName.SportGyms.FetchGyms, async (query, { extra: api }) => {
  const { data } = await api.get(`/${UrlDomain.SportGym}?${query}`);
  return data;
});

export const fetchSportGymsInfo = createAsyncThunk<
  SportGymsInfo,
  void,
  AsyncThunkOptionField
>(ActionName.SportGyms.FetchGymsInfo, async (_, { extra: api }) => {
  const { data } = await api.get<SportGymsInfo>(
    `${UrlDomain.SportGym}/${UrlRoute.Info}`
  );
  return data;
});

export const fetchFavoriteGyms = createAsyncThunk<
  SportGym[],
  void,
  AsyncThunkOptionField
>(ActionName.SportGyms.FetchFavorites, async (_, { extra: api }) => {
  const { data } = await api.get(
    `/${UrlDomain.Profile}/${UrlRoute.FavoriteGym}`
  );
  return data;
});

export const updateFavoriteStatus = createAsyncThunk<
  undefined,
  number,
  AsyncThunkOptionField
>(
  ActionName.SportGyms.UpdateFavoriteStatus,
  async (id, { extra: api, fulfillWithValue }) => {
    await api.patch(`/${UrlDomain.Profile}/${UrlRoute.FavoriteGym}/${id}`);
    return fulfillWithValue(undefined);
  }
);

export const fetchGym = createAsyncThunk<
  SportGym,
  string,
  AsyncThunkOptionField
>(ActionName.SportGyms.FetchGym, async (id, { extra: api }) => {
  const { data } = await api.get(`/${UrlDomain.SportGym}/${id}`);
  return data;
});

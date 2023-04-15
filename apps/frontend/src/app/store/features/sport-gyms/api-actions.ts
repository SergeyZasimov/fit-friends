import { SportGym, UrlDomain } from '@fit-friends/shared';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkOptionField } from '../../../types/store.types';
import { ActionName } from '../../../utils/constants';

export const fetchSportGyms = createAsyncThunk<
  SportGym[],
  void,
  AsyncThunkOptionField
>(ActionName.SportGyms.FetchGyms, async (_, { extra: api }) => {
  const { data } = await api.get(`/${UrlDomain.SportGym}`);
  return data;
});

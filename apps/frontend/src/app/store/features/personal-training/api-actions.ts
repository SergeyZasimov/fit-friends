import {
  PersonalTraining,
  UpdatePersonalTraining,
  UrlDomain,
  UrlRoute,
} from '@fit-friends/shared';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkOptionField } from '../../../types/store.types';
import { ActionName } from '../../../utils/constants';

export const fetchPersonalTrainings = createAsyncThunk<
  PersonalTraining[],
  void,
  AsyncThunkOptionField
>(ActionName.PersonalTraining.Fetch, async (_, { extra: api }) => {
  const { data } = await api.get(`/${UrlDomain.PersonalTraining}`);
  return data;
});

export const updatePersonalTrainingStatus = createAsyncThunk<
  PersonalTraining,
  UpdatePersonalTraining,
  AsyncThunkOptionField
>(ActionName.PersonalTraining.UpdateStatus, async (dto, { extra: api }) => {
  const { data } = await api.patch(`/${UrlDomain.PersonalTraining}`, dto);
  return data;
});

export const fetchMyRequests = createAsyncThunk<
  PersonalTraining[],
  void,
  AsyncThunkOptionField
>(ActionName.PersonalTraining.FetchMyRequests, async (_, { extra: api }) => {
  const { data } = await api.get(
    `/${UrlDomain.PersonalTraining}/${UrlRoute.UserPersonalTrainingRequests}`
  );
  return data;
});

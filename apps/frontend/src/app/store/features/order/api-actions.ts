import { OrderForTrainer, UrlDomain, UrlRoute } from '@fit-friends/shared';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkOptionField } from '../../../types/store.types';
import { ActionName } from '../../../utils/constants';

export const fetchOrders = createAsyncThunk<
  OrderForTrainer[],
  string,
  AsyncThunkOptionField
>(ActionName.Order.FetchOrders, async (query, { extra: api }) => {
  const { data } = await api.get<OrderForTrainer[]>(
    `/${UrlDomain.Order}/${UrlRoute.Trainer}?${query}`
  );
  return data;
});

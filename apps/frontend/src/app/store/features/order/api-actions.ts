import {
  CreateOrder,
  Order,
  OrderForTrainer,
  UrlDomain,
  UrlRoute,
} from '@fit-friends/shared';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AsyncThunkOptionField } from '../../../types/store.types';
import { ActionName } from '../../../utils/constants';
import { toastError } from '../../../utils/helpers';

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

export const fetchCustomerOrders = createAsyncThunk<
  Order[],
  string,
  AsyncThunkOptionField
>(ActionName.Order.FetchCustomersOrders, async (query, { extra: api }) => {
  const { data } = await api.get<Order[]>(
    `/${UrlDomain.Order}/${UrlRoute.Customer}?${query}`
  );
  return data;
});

export const createOrder = createAsyncThunk<
  Order,
  CreateOrder,
  AsyncThunkOptionField
>(
  ActionName.Order.CreateOrder,
  async (dto, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.post<Order>(`/${UrlDomain.Order}`, dto);
      return data;
    } catch (err) {
      toastError(err);
      return rejectWithValue(undefined);
    }
  }
);

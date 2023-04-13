import { OrderForTrainer } from '@fit-friends/shared';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { OrderState, State } from '../../../types/store.types';
import { StoreNamespace } from '../../../utils/constants';
import { fetchOrders } from './api-actions';

const initialState: OrderState = {
  ordersForTrainer: [],
};

export const orderSlice = createSlice({
  name: StoreNamespace.OrderStore,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchOrders.fulfilled,
      (state, { payload }: PayloadAction<OrderForTrainer[]>) => {
        state.ordersForTrainer = payload;
      }
    );
  },
});

export default orderSlice.reducer;

export const getOrdersForTrainer = (state: State) =>
  state[StoreNamespace.OrderStore].ordersForTrainer;

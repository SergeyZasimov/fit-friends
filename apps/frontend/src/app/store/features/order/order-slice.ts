import { OrderForTrainer } from '@fit-friends/shared';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { OrderState, State } from '../../../types/store.types';
import { RequestStatus, StoreNamespace } from '../../../utils/constants';
import { createOrder, fetchOrders } from './api-actions';

const initialState: OrderState = {
  ordersForTrainer: [],
  status: RequestStatus.Unknown,
};

export const orderSlice = createSlice({
  name: StoreNamespace.OrderStore,
  initialState,
  reducers: {
    resetOrderRequestStatus: (state) => {
      state.status = RequestStatus.Unknown;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchOrders.fulfilled,
        (state, { payload }: PayloadAction<OrderForTrainer[]>) => {
          state.ordersForTrainer = payload;
        }
      )
      .addCase(createOrder.pending, (state) => {
        state.status = RequestStatus.Process;
      })
      .addCase(createOrder.fulfilled, (state) => {
        state.status = RequestStatus.Success;
      })
      .addCase(createOrder.rejected, (state) => {
        state.status = RequestStatus.Fail;
      });
  },
});

export default orderSlice.reducer;

export const { resetOrderRequestStatus } = orderSlice.actions;

export const getOrdersForTrainer = (state: State) =>
  state[StoreNamespace.OrderStore].ordersForTrainer;

export const getOrderRequestStatus = (state: State) =>
  state[StoreNamespace.OrderStore].status;

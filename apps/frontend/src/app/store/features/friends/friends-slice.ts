import { User } from '@fit-friends/shared';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FriendsState, State } from '../../../types/store.types';
import { StoreNamespace } from '../../../utils/constants';
import { fetchFriends } from './api-actions';

const initialState: FriendsState = {
  friends: [],
};

export const friendsSlice = createSlice({
  name: StoreNamespace.FriendsStore,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchFriends.fulfilled,
      (state, { payload }: PayloadAction<User[]>) => {
        state.friends = payload;
      }
    );
  },
});

export default friendsSlice.reducer;

export const getFriends = (state: State) =>
  state[StoreNamespace.FriendsStore].friends;

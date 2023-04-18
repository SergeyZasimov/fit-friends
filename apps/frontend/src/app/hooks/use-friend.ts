import { UrlDomain, UrlRoute } from '@fit-friends/shared';
import { useEffect, useState } from 'react';
import { createApi } from '../services/api.service';
import {
  addToFriends,
  removeFromFriends,
} from '../store/features/friends/api-actions';
import { useAppDispatch } from '../store/store.hooks';

export const useFriend = (userId: number, friendId: string) => {
  const [isFriend, setIsFriend] = useState(false);
  const api = createApi();
  const dispatch = useAppDispatch();

  const checkFriend = async () => {
    const { data } = await api.get(
      `/${UrlDomain.Profile}/${UrlRoute.CheckFriend}/${friendId}`
    );
    if (data) {
      setIsFriend(true);
    } else {
      setIsFriend(false);
    }
  };

  useEffect(() => {
    checkFriend();
  }, []);

  const handleAddToFriend = () => {
    dispatch(addToFriends(userId)).then(() => checkFriend());
  };

  const handleRemoveFromFriend = () => {
    dispatch(removeFromFriends(userId)).then(() => checkFriend());
  };

  return { isFriend, handleAddToFriend, handleRemoveFromFriend };
};

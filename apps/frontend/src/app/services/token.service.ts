import {
  ACCESS_TOKEN_KEY_NAME,
  REFRESH_TOKEN_KEY_NAME,
} from '../utils/constants';

export const getAccessToken = (): string => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY_NAME);
  return token ?? '';
};

export const getRefreshToken = (): string => {
  const token = localStorage.getItem(REFRESH_TOKEN_KEY_NAME);
  return token ?? '';
};

export const setAccessToken = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY_NAME, token);
};

export const setRefreshToken = (token: string) => {
  localStorage.setItem(REFRESH_TOKEN_KEY_NAME, token);
};

export const dropAccessToken = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY_NAME);
};

export const dropRefreshToken = () => {
  localStorage.removeItem(REFRESH_TOKEN_KEY_NAME);
};

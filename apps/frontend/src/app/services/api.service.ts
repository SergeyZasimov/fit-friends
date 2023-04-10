import { AppError, UrlDomain, UrlRoute, UserTokens } from '@fit-friends/shared';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  HttpStatusCode,
  InternalAxiosRequestConfig,
} from 'axios';
import { toast } from 'react-toastify';
import { BACKEND_URL, REQUEST_TIMEOUT } from '../utils/constants';
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
} from './token.service';

const DISPLAY_STATUS_CODE = new Set([
  HttpStatusCode.NotFound,
  HttpStatusCode.Conflict,
  HttpStatusCode.Forbidden,
  HttpStatusCode.InternalServerError,
]);

export const shouldDisplayError = (response: AxiosResponse) =>
  DISPLAY_STATUS_CODE.has(response.status);

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<AppError>) => {
      const refreshToken = getRefreshToken();

      if (
        error.response &&
        error.response.status === HttpStatusCode.Unauthorized &&
        refreshToken
      ) {
        try {
          const { data } = await api.get<UserTokens>(
            `/${UrlDomain.Auth}/${UrlRoute.Refresh}`,
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            }
          );
          setAccessToken(data.access_token);
          setRefreshToken(data.refresh_token);
        } catch (err) {
          if (
            error.response &&
            error.response.status === HttpStatusCode.Unauthorized
          ) {
            return Promise.reject(error);
          }
        }
      }

      if (error.response && shouldDisplayError(error.response)) {
        const { message } = error.response.data;
        toast.error(message);
        return Promise.reject(error);
      } else {
        return Promise.reject(error);
      }
    }
  );

  return api;
};

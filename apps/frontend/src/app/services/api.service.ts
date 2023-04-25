import { AppError } from '@fit-friends/shared';
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  HttpStatusCode,
  InternalAxiosRequestConfig,
} from 'axios';
import { toast } from 'react-toastify';
import { BACKEND_URL, REQUEST_TIMEOUT } from '../utils/constants';
import { getAccessToken } from './token.service';

const DISPLAY_STATUS_CODE = new Set([
  HttpStatusCode.Conflict,
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

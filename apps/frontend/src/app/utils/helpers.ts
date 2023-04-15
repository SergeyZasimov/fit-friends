import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { toast } from 'react-toastify';
import { DEFAULT_PRICE_CHANGE_TIMEOUT } from './constants';

export const capitalizeWord = (word: string): string => {
  return `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;
};

export const formatNotificationDate = (date: Date | undefined) => {
  return dayjs(date).locale('ru').format('DD MMMM, HH:mm');
};

export const formatNotificationDateForTag = (date: Date | undefined) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm');
};

export const createQueryString = (query: Record<string, unknown>): string => {
  return `${Object.entries(query)
    .map(([key, value]) => {
      if (value instanceof Array && value.length > 0) {
        return `${key}=${value.join(',')}`;
      }

      if (!(value instanceof Array)) {
        return `${key}=${value}`;
      }

      return '';
    })
    .filter((item) => Boolean(item))
    .join('&')} `;
};

export const debounce = <T>(
  callback: (value: T) => void,
  timeoutDelay = DEFAULT_PRICE_CHANGE_TIMEOUT
) => {
  let timeout: NodeJS.Timeout;
  return (param: T) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(param), timeoutDelay);
  };
};

export const checkValueInCollection = <T>(collection: T[], value: T): T[] => {
  return collection.includes(value)
    ? collection.filter((item: T) => item !== value)
    : collection.concat(value);
};

export const toastError = (err: unknown) => {
  if (axios.isAxiosError(err) && err.response) {
    const { message } = err.response.data;
    if (message instanceof Array) {
      (message as string[]).forEach((item) => {
        const [, text] = item.split(':');
        toast.error(text);
      });
    } else {
      toast.error(message);
    }
  }
};

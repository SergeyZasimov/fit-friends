import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { toast } from 'react-toastify';
import { DEFAULT_PRICE_CHANGE_TIMEOUT, WEEK_DAYS } from './constants';

export const capitalizeWord = (word: string): string => {
  return word ? `${word.slice(0, 1).toUpperCase()}${word.slice(1)}` : '';
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

export const debounce = <U>(
  callback: (value: U) => void,
  timeoutDelay = DEFAULT_PRICE_CHANGE_TIMEOUT
) => {
  let timeout: NodeJS.Timeout;
  return (param: U) => {
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

export const formatPrice = (price: number | undefined): string => {
  if (price) {
    return price.toLocaleString('ru-RU');
  }
  return '';
};

export const isSameDate = (dateA: Date, dateB: Date): boolean => {
  return dayjs(dateA).diff(dateB, 'day') === 0;
};

export const getCurrentDayIndex = (index: number): number => {
  const dayIndex = index + 1;
  return dayIndex !== WEEK_DAYS ? dayIndex : 0;
};

import dayjs from 'dayjs';
import 'dayjs/locale/ru';

export const capitalizeWord = (word: string): string => {
  return `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`;
};

export const formatNotificationDate = (date: Date | undefined) => {
  return dayjs(date).locale('ru').format('DD MMMM, HH:mm');
};

export const formatNotificationDateForTag = (date: Date | undefined) => {
  return dayjs(date).format('YYYY-MM-DD HH:mm')
}

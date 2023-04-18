export const NotificationExceptionMessage = {
  NotFound: 'Оповещение не найдено',
  ForeignNotification: 'Нельзя удалять чужое оповещение',
};

export const createFriendNotification = (name: string) =>
  `Пользователь ${name} добавил вас в друзья`;

export const removeFriendNotification = (name: string) =>
  `Пользователь ${name} удалил вас из друзей`;

export const createPersonalTrainingNotification = (name: string) =>
  `Пользователь ${name} сделал заявку на персональную тренировку с вами`;

export const NotificationExceptionMessage = {
  NotFound: 'Оповещение не найдено',
  ForeignNotification: 'Нельзя удалять чужое оповещение',
};

export const createFriendNotification = (name: string) =>
  `Пользователь ${name} добавил вас в друзья`;

export const createPersonalTrainingNotification = (name: string) =>
  `Пользователь ${name} сделал заявку на персональную тренировку с вами`;

import { CreateNotification } from '@fit-friends/shared';
import {
  createFriendNotification,
  createPersonalTrainingNotification,
} from '../notification.constant';
import { NotificationEntity } from '../notification.entity';
import { notificationStubs } from './notification.stubs';

const { userId, userName } = notificationStubs;

describe('Notification Entity', () => {
  test('should return Friend Notification Entity', () => {
    const dto: CreateNotification = {
      userId,
      text: createFriendNotification(userName),
    };
    const entity = new NotificationEntity(dto);
    expect(entity).toBeInstanceOf(NotificationEntity);
    expect(entity.text).toEqual(
      `Пользователь ${userName} добавил вас в друзья`
    );
  });

  test('should return PersonalTraining Notification Entity', () => {
    const dto: CreateNotification = {
      userId,
      text: createPersonalTrainingNotification(userName),
    };
    const entity = new NotificationEntity(dto);
    expect(entity).toBeInstanceOf(NotificationEntity);
    expect(entity.text).toEqual(
      `Пользователь ${userName} сделал заявку на персональную тренировку с вами`
    );
  });
});

import { TestBed } from '@automock/jest';
import { BasicQueryDto } from '../../query/basic-query.dto';
import { fillObject } from '../../utils/helpers';
import { NotificationController } from '../notification.controller';
import { NotificationService } from '../notification.service';
import { NotificationRdo } from '../rdo/notification.rdo';
import { notificationStubs } from './notification.stubs';

const { userId, notification, id } = notificationStubs;

describe('Notification Controller', () => {
  let notificationController: NotificationController;
  let notificationService: jest.Mocked<NotificationService>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(NotificationController)
      .mock(NotificationService)
      .using({
        getMany: jest.fn().mockResolvedValue([notification]),
        delete: jest.fn().mockResolvedValue(notification),
      })
      .compile();

    notificationController = unit;
    notificationService = unitRef.get(NotificationService);
  });

  test('should be defined', () => {
    expect(notificationController).toBeDefined();
    expect(notificationService).toBeDefined();
  });

  test('showMany should return an array of notifications', async () => {
    const query = new BasicQueryDto();
    const result = await notificationController.showMany(userId, query);

    expect(notificationService.getMany).toBeCalledWith(userId, query);
    expect(result).toEqual([fillObject(NotificationRdo, notification)]);
  });

  test('delete should return a deleted notification', async () => {
    const result = await notificationController.delete(id, userId);

    expect(notificationService.delete).toBeCalledWith(id, userId);
    expect(result).toEqual(fillObject(NotificationRdo, notification));
  });
});

import { TestBed } from '@automock/jest';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { NotificationRepository } from '../notification.repository';
import { NotificationService } from '../notification.service';
import { notificationStubs } from './notification.stubs';

const { dto, notification, userId, id } = notificationStubs;

describe('Notification Service', () => {
  let notificationService: NotificationService;
  let notificationRepository: NotificationRepository;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(NotificationService)
      .mock(NotificationRepository)
      .using({
        create: jest.fn().mockResolvedValue(notification),
        findOne: jest.fn().mockResolvedValue(notification),
        findMany: jest.fn().mockResolvedValue([notification]),
        delete: jest.fn().mockResolvedValue(notification),
      })
      .compile();

    notificationService = unit;
    notificationRepository = unitRef.get(NotificationRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should be defined', () => {
    expect(notificationService).toBeDefined();
    expect(notificationRepository).toBeDefined();
  });

  test('create should return new Notification', async () => {
    const result = await notificationService.create(dto);

    expect(notificationRepository.create).toBeCalledWith(dto);
    expect(result).toEqual(notification);
  });

  test('getMany should return an array of notifications', async () => {
    const result = await notificationService.getMany(userId);

    expect(notificationRepository.findMany).toBeCalledWith(userId);
    expect(result).toEqual([notification]);
  });

  test('delete should return a deleted notification', async () => {
    const result = await notificationService.delete(id, userId);

    expect(notificationRepository.delete).toBeCalledWith(id);
    expect(result).toEqual(notification);
  });

  test('delete should throw NotFoundException when there is not notification', async () => {
    jest.spyOn(notificationRepository, 'findOne').mockResolvedValue(null);
    const result = notificationService.delete(id, userId);

    await expect(result).rejects.toThrowError(NotFoundException);
  });

  test('delete should throw ForbiddenException when there is another user ID', async () => {
    jest
      .spyOn(notificationRepository, 'findOne')
      .mockResolvedValue({ ...notification, userId: 2 });
    const result = notificationService.delete(id, userId);

    await expect(result).rejects.toThrowError(ForbiddenException);
  });
});

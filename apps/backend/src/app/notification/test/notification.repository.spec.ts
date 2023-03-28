import { TestBed } from '@automock/jest';
import { PrismaService } from '../../prisma/prisma.service';
import { NotificationEntity } from '../notification.entity';
import { NotificationRepository } from '../notification.repository';
import { notificationStubs } from './notification.stubs';

const { notification, dto, id, userId } = notificationStubs;

describe('Notification Repository', () => {
  let notificationRepository: NotificationRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(NotificationRepository)
      .mock(PrismaService)
      .using({
        notification: {
          create: jest.fn().mockResolvedValue(notification),
          findUnique: jest.fn().mockResolvedValue(notification),
          findMany: jest.fn().mockResolvedValue([notification]),
          delete: jest.fn().mockResolvedValue(notification),
        },
      })
      .compile();

    notificationRepository = unit;
    prisma = unitRef.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should be defined', () => {
    expect(notificationRepository).toBeDefined();
    expect(prisma).toBeDefined();
  });

  test('create should return new notification', async () => {
    const entity = new NotificationEntity(dto);
    const result = await notificationRepository.create(entity);

    expect(prisma.notification.create).toBeCalled();
    expect(result).toEqual(notification);
  });

  test('findOne should return notification', async () => {
    const result = await notificationRepository.findOne(id);

    expect(prisma.notification.findUnique).toBeCalled();
    expect(result).toEqual(notification);
  });

  test('findMany should return an array of notifications', async () => {
    const result = await notificationRepository.findMany(userId);

    expect(prisma.notification.findMany).toBeCalled();
    expect(result).toEqual([notification]);
  });

  test('delete should return a deleted notification', async () => {
    const result = await notificationRepository.delete(id);

    expect(prisma.notification.delete).toBeCalled();
    expect(result).toEqual(notification);
  });
});

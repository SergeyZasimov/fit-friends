import { TestBed } from '@automock/jest';
import { PrismaService } from '../../prisma/prisma.service';
import { SubscriptionEntity } from '../subscription.entity';
import { SubscriptionRepository } from '../subscription.repository';
import {
  dto,
  id,
  newLastNotify,
  subscription,
  trainerId,
  updatedSubscription,
  userId,
} from './subscription.stubs';

describe('Subscription Repository', () => {
  let subscriptionRepository: SubscriptionRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(SubscriptionRepository)
      .mock(PrismaService)
      .using({
        subscription: {
          create: jest.fn().mockResolvedValue(subscription),
          findUnique: jest.fn().mockResolvedValue(subscription),
          update: jest.fn().mockResolvedValue(updatedSubscription),
          delete: jest.fn().mockResolvedValue(undefined),
        },
      })
      .compile();

    subscriptionRepository = unit;
    prisma = unitRef.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return new subscription', async () => {
    const entity = new SubscriptionEntity(dto);
    const result = await subscriptionRepository.create(entity);

    expect(prisma.subscription.create).toBeCalled();
    expect(result).toEqual(subscription);
  });

  test('should return a subscription', async () => {
    const result = await subscriptionRepository.findOne(userId, trainerId);

    expect(prisma.subscription.findUnique).toBeCalled();
    expect(result).toEqual(subscription);
  });

  test('should return updated subscription', async () => {
    const result = await subscriptionRepository.findOne(userId, trainerId);
    const updatedResult = await subscriptionRepository.update(
      result.id,
      newLastNotify
    );

    expect(prisma.subscription.update).toBeCalled();
    expect(updatedResult).toEqual(updatedSubscription);
    expect(result).not.toEqual(updatedResult);
  });

  test('should void return when delete subscription', async () => {
    const result = await subscriptionRepository.delete(id);

    expect(prisma.subscription.delete).toBeCalled();
    expect(result).toBeUndefined();
  });
});

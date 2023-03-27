import { TestBed } from '@automock/jest';
import { userStubs } from '../../user/test/user.stub';
import { SubscriptionController } from '../subscription.controller';
import { SubscriptionService } from '../subscription.service';
import { subscription, trainerId, userId } from './subscription.stubs';

describe('Subscription Controller', () => {
  let subscriptionController: SubscriptionController;
  let subscriptionService: jest.Mocked<SubscriptionService>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(SubscriptionController)
      .mock(SubscriptionService)
      .using({
        addSubscribe: jest.fn().mockResolvedValue(subscription),
      })
      .compile();

    subscriptionController = unit;
    subscriptionService = unitRef.get(SubscriptionService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return new subscription', async () => {
    const result = await subscriptionController.addSubscribe(trainerId, userId);

    expect(subscriptionService.addSubscribe).toBeCalledWith(userId, trainerId);
    expect(result).toEqual(subscription);
  });

  test('should void return when getNotify', async () => {
    const result = await subscriptionController.getWorkouts(
      trainerId,
      userId,
      userStubs.user.email
    );

    expect(subscriptionService.getNotify).toBeCalledWith(
      userId,
      trainerId,
      userStubs.user.email
    );
    expect(result).toBeUndefined();
  });

  test('should void return when delete', async () => {
    const result = await subscriptionController.deleteSubscribe(
      trainerId,
      userId
    );

    expect(subscriptionService.deleteSubscription).toBeCalledWith(
      userId,
      trainerId
    );
    expect(result).toBeUndefined();
  });
});

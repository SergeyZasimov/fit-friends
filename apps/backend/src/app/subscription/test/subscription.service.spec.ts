import { TestBed } from '@automock/jest';
import { MailerService } from '@nestjs-modules/mailer';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { ProfileService } from '../../profile/profile.service';
import { userStubs } from '../../user/test/user.stub';
import { workoutStubs } from '../../workout/test/workout.stubs';
import { WorkoutService } from '../../workout/workout.service';
import { SubscriptionRepository } from '../subscription.repository';
import { SubscriptionService } from '../subscription.service';
import { subscription, trainer, trainerId, userId } from './subscription.stubs';

const { user } = userStubs;
const { workout } = workoutStubs;

describe('Subscription Service', () => {
  let subscriptionService: SubscriptionService;
  let subscriptionRepository: jest.Mocked<SubscriptionRepository>;
  let profileService: jest.Mocked<ProfileService>;
  let mailerService: jest.Mocked<MailerService>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(SubscriptionService)
      .mock(SubscriptionRepository)
      .using({
        create: jest.fn().mockResolvedValue(subscription),
        findOne: jest.fn().mockResolvedValue(subscription),
      })
      .mock(WorkoutService)
      .using({
        getFotSubscriptionNotify: jest.fn().mockResolvedValue([workout]),
      })
      .mock(ProfileService)
      .using({
        getOne: jest.fn().mockResolvedValue(trainer),
      })
      .mock(MailerService)
      .using({})
      .compile();

    subscriptionService = unit;
    subscriptionRepository = unitRef.get(SubscriptionRepository);
    profileService = unitRef.get(ProfileService);
    mailerService = unitRef.get(MailerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return new subscription', async () => {
    jest.spyOn(subscriptionRepository, 'findOne').mockResolvedValue(null);

    const result = await subscriptionService.addSubscribe(userId, trainerId);

    expect(profileService.getOne).toBeCalledWith(trainerId);
    expect(subscriptionRepository.findOne).toBeCalledWith(userId, trainerId);
    expect(result).toEqual(subscription);
  });

  test('should throw NotFoundException when trainer does not exist', async () => {
    jest.spyOn(profileService, 'getOne').mockResolvedValue(null);

    const result = subscriptionService.addSubscribe(userId, trainerId);
    await expect(result).rejects.toThrowError(NotFoundException);
  });

  test('should return ConflictException when subscription already exist', async () => {
    const result = subscriptionService.addSubscribe(userId, trainerId);

    await expect(result).rejects.toThrowError(ConflictException);
  });

  test('should void return when getNotify', async () => {
    const result = await subscriptionService.getNotify(
      userId,
      trainerId,
      user.email
    );

    expect(mailerService.sendMail).toBeCalled();
    expect(result).toBeUndefined();
  });

  test('should void return when delete subscription', async () => {
    jest
      .spyOn(
        SubscriptionService.prototype as unknown as {
          checkExist: SubscriptionService['checkExist'];
        },
        'checkExist'
      )
      .mockResolvedValue(subscription);

    const result = await subscriptionService.deleteSubscription(
      userId,
      trainerId
    );

    expect(subscriptionRepository.delete).toBeCalledWith(subscription.id);
    expect(result).toBeUndefined();
  });
});

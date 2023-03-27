import { TestBed } from '@automock/jest';
import { WorkoutService } from '../../workout/workout.service';
import { ReviewRepository } from '../review.repository';
import { ReviewService } from '../review.service';
import { dto, expectRating, review, userId, workout } from './review.stubs';

describe('Review Service', () => {
  let reviewService: ReviewService;
  let reviewRepository: jest.Mocked<ReviewRepository>;
  let workoutService: jest.Mocked<WorkoutService>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(ReviewService)
      .mock(ReviewRepository)
      .using({
        create: jest.fn().mockResolvedValue(review),
        findOne: jest.fn().mockResolvedValue(review),
        findMany: jest.fn().mockResolvedValue([review]),
        getRating: jest.fn().mockResolvedValue(expectRating),
      })
      .mock(WorkoutService)
      .using({
        checkWorkoutExist: jest.fn().mockResolvedValue(workout),
        updateRating: jest
          .fn()
          .mockResolvedValue({ ...workout, rating: expectRating }),
      })
      .compile();

    reviewService = unit;
    reviewRepository = unitRef.get(ReviewRepository);
    workoutService = unitRef.get(WorkoutService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should be defined', () => {
    expect(reviewRepository).toBeDefined();
    expect(reviewService).toBeDefined();
    expect(workoutService).toBeDefined();
  });

  test('should return new review', async () => {
    const result = await reviewService.create(dto, userId);

    expect(workoutService.checkWorkoutExist).toBeCalled();
    expect(workoutService.updateRating).toBeCalled();
    expect(reviewRepository.create).toBeCalled();
    expect(reviewRepository.findOne).toBeCalled();

    expect(result).toEqual(review);
  });

  test('should return an array of reviews', async () => {
    const result = await reviewService.getMany(workout.id);

    expect(workoutService.checkWorkoutExist).toBeCalledWith(workout.id);
    expect(reviewRepository.findMany).toBeCalledWith(workout.id);
    expect(result).toEqual([review]);
  });
});

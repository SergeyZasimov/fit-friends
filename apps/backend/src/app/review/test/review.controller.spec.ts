import { TestBed } from '@automock/jest';
import { fillObject } from '../../utils/helpers';
import { ReviewRdo } from '../rdo/review.rdo';
import { ReviewController } from '../review.controller';
import { ReviewService } from '../review.service';
import { dto, review, userId, workout } from './review.stubs';

describe('Review Controller', () => {
  let reviewController: ReviewController;
  let reviewService: jest.Mocked<ReviewService>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(ReviewController)
      .mock(ReviewService)
      .using({
        create: jest.fn().mockResolvedValue(review),
        getMany: jest.fn().mockResolvedValue([review]),
      })
      .compile();

    reviewController = unit;
    reviewService = unitRef.get(ReviewService);
  });

  test('should return new review', async () => {
    const result = await reviewController.create(dto, userId);

    expect(reviewService.create).toBeCalledWith(dto, userId);
    expect(result).toEqual(fillObject(ReviewRdo, review));
  });

  test('should return an array of reviews', async () => {
    const result = await reviewController.showMany(workout.id);

    expect(reviewService.getMany).toBeCalledWith(workout.id);
    expect(result).toEqual([review].map((item) => fillObject(ReviewRdo, item)));
  });
});

import { TestBed } from '@automock/jest';
import { PrismaService } from '../../prisma/prisma.service';
import { ReviewEntity } from '../review.entity';
import { ReviewRepository } from '../review.repository';
import { dto, expectRating, id, review, userId, workout } from './review.stubs';

describe('Review Repository', () => {
  let reviewRepository: ReviewRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(ReviewRepository)
      .mock(PrismaService)
      .using({
        review: {
          create: jest.fn().mockResolvedValue(review),
          findUnique: jest.fn().mockResolvedValue(review),
          findMany: jest.fn().mockResolvedValue([review]),
          aggregate: jest.fn(),
        },
      })
      .compile();

    reviewRepository = unit;
    prisma = unitRef.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should be defined', () => {
    expect(reviewRepository).toBeDefined();
    expect(prisma).toBeDefined();
  });

  test('should return new review', async () => {
    const entity = new ReviewEntity({ ...dto, userId });
    const result = await reviewRepository.create(entity);

    expect(prisma.review.create).toBeCalled();
    expect(result).toEqual(review);
  });

  test('should return review', async () => {
    const result = await reviewRepository.findOne(id);

    expect(prisma.review.findUnique).toBeCalled();
    expect(result).toEqual(review);
  });

  test('should return an array of reviews', async () => {
    const result = await reviewRepository.findMany(workout.id);

    expect(prisma.review.findMany).toBeCalled();
    expect(result).toEqual([review]);
  });

  test('should return rating', async () => {
    jest.spyOn(prisma.review, 'aggregate').mockResolvedValue({
      _avg: { rating: expectRating },
      _count: undefined,
      _max: undefined,
      _min: undefined,
      _sum: undefined,
    });

    const result = await reviewRepository.getRating(workout.id);

    expect(prisma.review.aggregate).toBeCalled();
    expect(result).toEqual(expectRating);
  });
});

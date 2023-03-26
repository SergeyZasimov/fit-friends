import { TestBed } from '@automock/jest';
import { PrismaService } from '../../prisma/prisma.service';
import { WorkoutDiaryEntity } from '../workout-diary.entity';
import { WorkoutDiaryRepository } from '../workout-diary.repository';
import { workoutDiaryStubs } from './workout-diary.stubs';

const { dto, workoutDiary, userId } = workoutDiaryStubs;

describe('Workout Diary Repository', () => {
  let workoutDiaryRepository: WorkoutDiaryRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(WorkoutDiaryRepository)
      .mock(PrismaService)
      .using({
        workoutDiary: {
          create: jest.fn().mockResolvedValue(workoutDiary),
          findMany: jest.fn().mockResolvedValue([workoutDiary]),
        },
      })
      .compile();

    workoutDiaryRepository = unit;
    prisma = unitRef.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should be defined', () => {
    expect(workoutDiaryRepository).toBeDefined();
    expect(prisma).toBeDefined();
  });

  test('should return new workout diary record', async () => {
    const entity = new WorkoutDiaryEntity(dto);
    const result = await workoutDiaryRepository.create(entity);

    expect(prisma.workoutDiary.create).toBeCalled();
    expect(result).toEqual(workoutDiary);
  });

  test('should return an array of workout diary records', async () => {
    const result = await workoutDiaryRepository.findMany(userId);

    expect(prisma.workoutDiary.findMany).toBeCalled();
    expect(result).toEqual([workoutDiary]);
  });
});

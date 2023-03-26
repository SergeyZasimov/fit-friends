import { TestBed } from '@automock/jest';
import { WorkoutDiaryRepository } from '../workout-diary.repository';
import { WorkoutDiaryService } from '../workout-diary.service';
import { workoutDiaryStubs } from './workout-diary.stubs';

const { workoutDiary, userId, dto } = workoutDiaryStubs;

describe('Workout Diary Service', () => {
  let workoutDiaryService: WorkoutDiaryService;
  let workoutDiaryRepository: jest.Mocked<WorkoutDiaryRepository>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(WorkoutDiaryService)
      .mock(WorkoutDiaryRepository)
      .using({
        create: jest.fn().mockResolvedValue(workoutDiary),
        findMany: jest.fn().mockResolvedValue([workoutDiary]),
      })
      .compile();

    workoutDiaryService = unit;
    workoutDiaryRepository = unitRef.get(WorkoutDiaryRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should be defined', () => {
    expect(workoutDiaryRepository).toBeDefined();
    expect(workoutDiaryService).toBeDefined();
  });

  test('should return new workout diary record', async () => {
    const result = await workoutDiaryService.create(userId, dto);

    expect(workoutDiaryRepository.create).toBeCalled();
    expect(result).toEqual(workoutDiary);
  });

  test('should return an array of workout diary records', async () => {
    const result = await workoutDiaryService.getMany(userId);

    expect(workoutDiaryRepository.findMany).toBeCalledWith(userId);
    expect(result).toEqual([workoutDiary]);
  });
});

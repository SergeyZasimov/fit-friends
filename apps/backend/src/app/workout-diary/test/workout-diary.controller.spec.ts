import { TestBed } from '@automock/jest';
import { WorkoutDiaryController } from '../workout-diary.controller';
import { WorkoutDiaryService } from '../workout-diary.service';
import { workoutDiaryStubs } from './workout-diary.stubs';

const { dto, userId, workoutDiary } = workoutDiaryStubs;

describe('Workout Diary Controller', () => {
  let workoutDiaryController: WorkoutDiaryController;
  let workoutDiaryService: jest.Mocked<WorkoutDiaryService>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(WorkoutDiaryController)
      .mock(WorkoutDiaryService)
      .using({
        create: jest.fn().mockResolvedValue(workoutDiary),
        getMany: jest.fn().mockResolvedValue([workoutDiary]),
      })
      .compile();

    workoutDiaryController = unit;
    workoutDiaryService = unitRef.get(WorkoutDiaryService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should be defined', () => {
    expect(workoutDiaryService).toBeDefined();
    expect(workoutDiaryController).toBeDefined();
  });

  test('should return new workout diary record', async () => {
    const result = await workoutDiaryController.create(dto, userId);

    expect(workoutDiaryService.create).toBeCalledWith(userId, dto);
    expect(result).toEqual(workoutDiary);
  });

  test('should return an array of workout diary records', async () => {
    const result = await workoutDiaryController.showMany(userId);

    expect(workoutDiaryService.getMany).toBeCalledWith(userId);
    expect(result).toEqual([workoutDiary]);
  });
});

import { TestBed } from '@automock/jest';
import { UserRole } from '@fit-friends/shared';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { QueryWorkoutDto } from '../dto/query-workout.dto';
import { WorkoutRepository } from '../workout.repository';
import { WorkoutService } from '../workout.service';
import { workoutStubs } from './workout.stubs';

const { dto, workout, userId, id, updatedWorkout, updateDto } = workoutStubs;

describe('Workout Service', () => {
  let workoutService: WorkoutService;
  let workoutRepository: jest.Mocked<WorkoutRepository>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(WorkoutService)
      .mock(WorkoutRepository)
      .using({
        create: jest.fn().mockResolvedValue(workout),
        findOne: jest.fn().mockResolvedValue(workout),
        findMany: jest.fn().mockResolvedValue([workout]),
        update: jest.fn().mockResolvedValue(updatedWorkout),
      })
      .compile();

    workoutService = unit;
    workoutRepository = unitRef.get(WorkoutRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should be defined', () => {
    expect(workoutRepository).toBeDefined();
    expect(workoutService).toBeDefined();
  });

  test('should return new workout', async () => {
    const mockSetBackgroundImage = jest.spyOn(
      WorkoutService.prototype as unknown as {
        setBackgroundImage: WorkoutService['setBackgroundImage'];
      },
      'setBackgroundImage'
    );
    mockSetBackgroundImage.mockResolvedValue('');

    const result = await workoutService.create(dto, userId);

    expect(workoutRepository.create).toBeCalled();
    expect(result).toEqual(workout);
  });

  test('should return workout', async () => {
    const result = await workoutService.getOne(id);

    expect(workoutRepository.findOne).toBeCalledWith(id);
    expect(result).toEqual(workout);
  });

  test('should return an array of workouts', async () => {
    const query = new QueryWorkoutDto();
    const result = await workoutService.getMany(
      query,
      userId,
      UserRole.Trainer
    );

    expect(workoutRepository.findMany).toBeCalledWith(query, userId);
    expect(result).toEqual([workout]);
  });

  test('should return updated workout', async () => {
    const result = await workoutService.update(id, updateDto, userId);

    expect(workoutRepository.update).toBeCalled();
    expect(result).toEqual(updatedWorkout);
  });

  test('should throw ForbiddenException', async () => {
    const userId = 2;
    const result = workoutService.update(id, updateDto, userId);

    await expect(result).rejects.toThrowError(ForbiddenException);
  });

  test('should throw NotFoundException when there is no workout', async () => {
    jest.spyOn(workoutRepository, 'findOne').mockResolvedValue(null);

    const result = workoutService.getOne(id);

    await expect(result).rejects.toThrowError(NotFoundException);
  });
});

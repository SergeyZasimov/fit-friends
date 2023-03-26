import { TestBed } from '@automock/jest';
import { UserRole } from '@fit-friends/shared';
import { fillObject } from '../../utils/helpers';
import { QueryWorkoutDto } from '../dto/query-workout.dto';
import { WorkoutRdo } from '../rdo/workout.rdo';
import { WorkoutController } from '../workout.controller';
import { WorkoutService } from '../workout.service';
import { workoutStubs } from './workout.stubs';

const { dto, workout, userId, updatedWorkout, id, updateDto } = workoutStubs;

describe('Workout Controller', () => {
  let workoutController: WorkoutController;
  let workoutService: jest.Mocked<WorkoutService>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(WorkoutController)
      .mock(WorkoutService)
      .using({
        create: jest.fn().mockResolvedValue(workout),
        getOne: jest.fn().mockResolvedValue(workout),
        getMany: jest.fn().mockResolvedValue([workout]),
        update: jest.fn().mockResolvedValue(updatedWorkout),
      })
      .compile();

    workoutController = unit;
    workoutService = unitRef.get(WorkoutService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should be defined', () => {
    expect(workoutController).toBeDefined();
    expect(workoutService).toBeDefined();
  });

  test('should return new workout', async () => {
    const result = await workoutController.create(dto, userId);

    expect(workoutService.create).toBeCalled();
    expect(result).toBeInstanceOf(WorkoutRdo);
    expect(result).toEqual(fillObject(WorkoutRdo, workout, UserRole.Trainer));
  });

  test('should return workout', async () => {
    const result = await workoutController.show(id);

    expect(workoutService.getOne).toBeCalledWith(id);
    expect(result).toBeInstanceOf(WorkoutRdo);
    expect(result).toEqual(fillObject(WorkoutRdo, workout, UserRole.Trainer));
  });

  test('should return an array of workouts', async () => {
    const query = new QueryWorkoutDto();
    const result = await workoutController.showMany(
      query,
      userId,
      UserRole.Trainer
    );

    expect(workoutService.getMany).toBeCalledWith(
      query,
      userId,
      UserRole.Trainer
    );
    expect(result).toEqual(
      [workout].map((workout) =>
        fillObject(WorkoutRdo, workout, UserRole.Trainer)
      )
    );
  });

  test('should return updated workout', async () => {
    const result = await workoutController.update(id, updateDto, userId);

    expect(workoutService.update).toBeCalled();
    expect(result).toEqual(
      fillObject(WorkoutRdo, updatedWorkout, UserRole.Trainer)
    );
  });
});

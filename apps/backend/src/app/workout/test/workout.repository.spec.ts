import { TestBed } from '@automock/jest';
import { PrismaService } from '../../prisma/prisma.service';
import { QueryWorkoutDto } from '../dto/query-workout.dto';
import { WorkoutEntity } from '../workout.entity';
import { WorkoutRepository } from '../workout.repository';
import { workoutStubs } from './workout.stubs';

const { workout, dto, id, userId, updateDto, updatedWorkout } = workoutStubs;

describe('Workout Repository', () => {
  let workoutRepository: WorkoutRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(WorkoutRepository)
      .mock(PrismaService)
      .using({
        workout: {
          create: jest.fn().mockResolvedValue(workout),
          findUnique: jest.fn().mockResolvedValue(workout),
          findMany: jest.fn().mockResolvedValue([workout]),
          update: jest.fn().mockResolvedValue(updatedWorkout),
        },
      })
      .compile();

    workoutRepository = unit;
    prisma = unitRef.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should be defined', () => {
    expect(WorkoutRepository).toBeDefined();
    expect(prisma).toBeDefined();
  });

  test('should return new workout', async () => {
    const entity = new WorkoutEntity(dto);
    const result = await workoutRepository.create(entity);

    expect(prisma.workout.create).toBeCalled();
    expect(result).toEqual(workout);
  });

  test('should return workout', async () => {
    const result = await workoutRepository.findOne(id);

    expect(prisma.workout.findUnique).toBeCalled();
    expect(result).toEqual(workout);
  });

  test('should return an array of workouts', async () => {
    const query = new QueryWorkoutDto();
    const result = await workoutRepository.findMany(query, userId);

    expect(prisma.workout.findMany).toBeCalled();
    expect(result).toEqual([workout]);
  });

  test('should return updated workout', async () => {
    const entity = new WorkoutEntity({ ...workout, ...updateDto });
    const result = await workoutRepository.update(id, entity);

    expect(prisma.workout.update).toBeCalled();
    expect(result).toEqual(updatedWorkout);
  });
});

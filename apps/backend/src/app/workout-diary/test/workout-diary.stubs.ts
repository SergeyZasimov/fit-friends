import { createWorkoutDiary } from '../../cli/mocks';
import { workoutStubs } from '../../workout/test/workout.stubs';

const { workout } = workoutStubs;

const id = 1;
const userId = 1;

const dto = {
  ...createWorkoutDiary(workout.id),
};

const workoutDiary = {
  ...dto,
  id,
  userId,
};

export const workoutDiaryStubs = { dto, workoutDiary, userId };

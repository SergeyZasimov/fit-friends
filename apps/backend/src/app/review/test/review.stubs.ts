import { createReview } from '../../cli/mocks';
import { workoutStubs } from '../../workout/test/workout.stubs';

export const { workout } = workoutStubs;

export const id = 1;
export const userId = 1;
export const dto = createReview(workout);
export const expectRating = 5;

export const review = {
  ...dto,
  id,
  userId,
};

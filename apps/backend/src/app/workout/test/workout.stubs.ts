import { createTrainer, createWorkout } from '../../cli/mocks';

const id = 1;
const userId = 1;
const newTitle = 'title';
const newRating = 3;

const updateDto = {
  title: newTitle,
  rating: newRating,
};

const dto = { ...createWorkout(), backgroundImage: '', video: '' };

const workout = {
  ...dto,
  id,
  trainerId: userId,
  trainer: { ...createTrainer() },
};

const updatedWorkout = {
  ...workout,
  ...updateDto,
};

export const workoutStubs = {
  id,
  dto,
  workout,
  userId,
  updateDto,
  updatedWorkout,
};

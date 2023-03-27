import { createTrainer } from '../../cli/mocks';

export const userId = 1;
export const trainerId = 2;
export const id = 1;
export const newLastNotify = new Date('2023-03-23');

export const dto = {
  userId,
  lastNotify: new Date('2023-03-22'),
  trainerId,
};

export const subscription = {
  ...dto,
  id,
};

export const trainer = {
  ...createTrainer(),
  id: trainerId,
};

export const updatedSubscription = {
  ...subscription,
  lastNotify: newLastNotify,
};

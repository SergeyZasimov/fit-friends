import { faker } from '@faker-js/faker';
import { CreateWorkoutDiaryDto } from '../../workout-diary/dto/create-workout-diary.dto';
import { MOCKS_DEFAULT } from '../cli.constant';

export const createWorkoutDiary = (
  workoutId: number
): CreateWorkoutDiaryDto => ({
  workoutId: workoutId,
  lostCaloriesAmount: faker.datatype.number({
    min: MOCKS_DEFAULT.WORKOUT_DIARY.LOST_CALORIES_AMOUNT.MIN,
    max: MOCKS_DEFAULT.WORKOUT_DIARY.LOST_CALORIES_AMOUNT.MAX,
  }),
  lostTrainingTime: faker.datatype.number({
    min: MOCKS_DEFAULT.WORKOUT_DIARY.LOST_TRAINING_TIME.MIN,
    max: MOCKS_DEFAULT.WORKOUT_DIARY.LOST_TRAINING_TIME.MAX,
  }),
});

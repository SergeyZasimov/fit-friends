import { faker } from '@faker-js/faker';
import {
  CreateWorkout,
  FavorGenders,
  TrainingTimes,
  TrainingTypes,
} from '@fit-friends/shared';
import { USER_CONSTRAINT } from '../../user/user.constant';
import { MOCKS_DEFAULT } from '../cli.constant';

export const createWorkout = (): CreateWorkout => ({
  title: faker.commerce.productName().slice(0, MOCKS_DEFAULT.WORKOUT.TITLE.MAX),
  description: faker.commerce.productDescription(),
  caloriesAmountToLose: faker.datatype.number({
    min: USER_CONSTRAINT.CALORIES_AMOUNT.MIN,
    max: USER_CONSTRAINT.CALORIES_AMOUNT.MAX,
  }),
  favorGender: faker.helpers.arrayElement(FavorGenders),
  price: faker.datatype.number({ max: MOCKS_DEFAULT.WORKOUT.PRICE.MAX }),
  isSpecial: faker.datatype.boolean(),
  trainingTime: faker.helpers.arrayElement(TrainingTimes),
  trainingType: faker.helpers.arrayElement(TrainingTypes),
});

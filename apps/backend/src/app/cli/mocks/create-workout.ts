import { faker } from '@faker-js/faker';
import {
  CreateWorkout,
  FavorGenders,
  TrainingLevels,
  TrainingTimes,
  TrainingTypes,
} from '@fit-friends/shared';
import { USER_CONSTRAINT } from '../../user/user.constant';
import { MOCKS_DEFAULT } from '../cli.constant';

export const createWorkout = (): CreateWorkout => ({
  title: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  caloriesAmountToLose: faker.datatype.number({
    min: USER_CONSTRAINT.CALORIES_AMOUNT.MIN,
    max: USER_CONSTRAINT.CALORIES_AMOUNT.MAX,
  }),
  customerLevel: faker.helpers.arrayElement(TrainingLevels),
  favorGender: faker.helpers.arrayElement(FavorGenders),
  price: faker.datatype.number({ max: MOCKS_DEFAULT.WORKOUT.PRICE.MAX }),
  isSpecial: faker.datatype.boolean(),
  trainingTime: faker.helpers.arrayElement(TrainingTimes),
  trainingType: faker.helpers.arrayElement(TrainingTypes),
});

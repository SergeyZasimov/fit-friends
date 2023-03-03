import { faker } from '@faker-js/faker';
import {
  Gender,
  Locations,
  TrainingLevels,
  TrainingTimes,
  TrainingTypes,
  UserRole,
} from '@fit-friends/shared';
import { CreateUserDto } from '../../auth/dto/create-user.dto';
import { USER_CONSTRAINT } from '../../user/user.constant';
import { MOCKS_DEFAULT } from '../cli.constant';

export const createCustomer = (): CreateUserDto => ({
  email: faker.internet.email(),
  role: UserRole.Customer,
  password: MOCKS_DEFAULT.USER.PASSWORD,
  name: faker.name.firstName(),
  gender: faker.helpers.arrayElement(Object.values(Gender)),
  location: faker.helpers.arrayElement(Locations),
  birthDay: faker.date.birthdate().toDateString(),
  caloriesAmountToLose: faker.datatype.number({
    min: USER_CONSTRAINT.CALORIES_AMOUNT.MIN,
    max: USER_CONSTRAINT.CALORIES_AMOUNT.MAX,
  }),
  caloriesAmountToLosePerDay: faker.datatype.number({
    min: USER_CONSTRAINT.CALORIES_AMOUNT.MIN,
    max: USER_CONSTRAINT.CALORIES_AMOUNT.MAX,
  }),
  trainingLevel: faker.helpers.arrayElement(TrainingLevels),
  trainingType: faker.helpers.arrayElements(
    TrainingTypes,
    faker.datatype.number({
      min: MOCKS_DEFAULT.USER.TRAINING_TYPE_COUNT.MIN,
      max: MOCKS_DEFAULT.USER.TRAINING_TYPE_COUNT.MAX,
    })
  ),
  trainingTime: faker.helpers.arrayElement(TrainingTimes),
  isReadyToTraining: faker.datatype.boolean(),
});

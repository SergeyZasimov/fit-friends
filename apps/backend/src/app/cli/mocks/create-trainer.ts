import { faker } from '@faker-js/faker';
import {
  Gender,
  Locations,
  TrainingLevels,
  TrainingTypes,
  UserRole,
} from '@fit-friends/shared';
import { CreateUserDto } from '../../auth/dto/create-user.dto';
import { MOCKS_DEFAULT } from '../cli.constant';

export const createTrainer = (): CreateUserDto => ({
  email: faker.internet.email(),
  role: UserRole.Trainer,
  password: MOCKS_DEFAULT.USER.PASSWORD,
  name: faker.name.firstName(),
  gender: faker.helpers.arrayElement(Object.values(Gender)),
  location: faker.helpers.arrayElement(Locations),
  birthDay: faker.date.birthdate().toDateString(),
  trainingLevel: faker.helpers.arrayElement(TrainingLevels),
  trainingType: faker.helpers.arrayElements(
    TrainingTypes,
    faker.datatype.number({
      min: MOCKS_DEFAULT.USER.TRAINING_TYPE_COUNT.MIN,
      max: MOCKS_DEFAULT.USER.TRAINING_TYPE_COUNT.MAX,
    })
  ),
  resume: faker.lorem.sentences(),
  isReadyToPersonalTraining: faker.datatype.boolean(),
});

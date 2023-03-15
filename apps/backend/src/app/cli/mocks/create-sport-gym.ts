import { faker } from '@faker-js/faker';
import { GymParameters, Locations, SportGym } from '@fit-friends/shared';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { MOCKS_DEFAULT } from '../cli.constant';

export const createSportGym = async (
  staticFolder: string
): Promise<SportGym> => {
  const photoFolderPath = path.resolve(staticFolder, 'sport-gym-photos');
  const photos = await readdir(photoFolderPath);

  return {
    title: faker.commerce.productName(),
    description: faker.lorem.sentences(2),
    isVerified: faker.datatype.boolean(),
    location: faker.helpers.arrayElement(Locations),
    oneWorkoutPrice: faker.datatype.number({
      min: MOCKS_DEFAULT.SPORT_GYM.PRICE.MIN,
      max: MOCKS_DEFAULT.SPORT_GYM.PRICE.MAX,
    }),
    parameters: faker.helpers.arrayElements(
      GymParameters,
      faker.datatype.number({ min: 1, max: GymParameters.length })
    ),
    photos,
  };
};

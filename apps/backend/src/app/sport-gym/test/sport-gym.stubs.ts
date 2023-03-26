import { createSportGym } from '../../cli/mocks';

const dto = createSportGym();
const id = 1;

const sportGym = { ...dto, id };

export const sportGymStubs = { dto, id, sportGym };

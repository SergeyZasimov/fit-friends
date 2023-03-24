import { FoodDiary } from '@fit-friends/shared';
import { createCustomer, createFoodDiary } from '../../cli/mocks';

const dto = createFoodDiary();
const updateDto = createFoodDiary();

const id = 1;

const userId = 1;

const customer = {
  ...createCustomer(),
  id: userId,
};

const foodDiary: FoodDiary = {
  ...dto,
  id,
  userId,
  user: customer,
};

const updatedFoodDiary: FoodDiary = {
  ...updateDto,
  userId,
  user: customer,
  id,
};

export const foodDiaryStubs = {
  id,
  userId,
  foodDiary,
  updatedFoodDiary,
  updateDto,
  dto,
};

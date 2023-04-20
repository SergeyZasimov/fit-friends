import { faker } from '@faker-js/faker';
import { TypeOfMeal } from '@fit-friends/shared';
import { CreateFoodDiaryDto } from '../../food-diary/dto/create-food-diary.dto';
import { MOCKS_DEFAULT } from '../cli.constant';

export const createFoodDiary = (): CreateFoodDiaryDto => ({
  caloriesAmount: faker.datatype.number({
    min: MOCKS_DEFAULT.FOOD_DIARY.CALORIES_AMOUNT.MIN,
    max: MOCKS_DEFAULT.FOOD_DIARY.CALORIES_AMOUNT.MAX,
  }),
  dateOfMeal: faker.date.recent(MOCKS_DEFAULT.FOOD_DIARY.RECENT_DAYS),
  typeOfMeal: faker.helpers.arrayElement(Object.values(TypeOfMeal)),
});

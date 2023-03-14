import { TypeOfMeal } from '@fit-friends/shared';
import { formatEnumToValidationMessage } from '../utils/helpers';

export const FoodDiaryValidationMessage = {
  CaloriesAmountNotValid: 'Количество калорий должно быть целым числом',
  DateOfMealNotValid: 'Неверный формат даты приёма пищи',
  TypeOfMealNotValid: `Вид приёма пищи должен быть один из вариантов: ${formatEnumToValidationMessage(
    TypeOfMeal
  )}`,
} as const;

export const FoodDiaryExceptionMessage = {
  NotFound: 'Запись в дневнике питания не найдена',
  ForeignFoodDiary: 'Запрещены действия с чужими записями',
};

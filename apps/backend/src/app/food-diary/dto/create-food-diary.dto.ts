import { CreateFoodDiary, TypeOfMeal } from '@fit-friends/shared';
import { IsDateString, IsEnum, IsInt } from 'class-validator';
import { FoodDiaryValidationMessage } from '../food-diary.constant';

const { CaloriesAmountNotValid, DateOfMealNotValid, TypeOfMealNotValid } =
  FoodDiaryValidationMessage;

export class CreateFoodDiaryDto implements CreateFoodDiary {
  @IsInt({ message: CaloriesAmountNotValid })
  caloriesAmount: number;

  @IsDateString({}, { message: DateOfMealNotValid })
  dateOfMeal: Date;

  @IsEnum(TypeOfMeal, { message: TypeOfMealNotValid })
  typeOfMeal: string;
}

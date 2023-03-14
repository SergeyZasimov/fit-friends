import { TypeOfMeal, UpdateFoodDiary } from '@fit-friends/shared';
import { IsDateString, IsEnum, IsInt, IsOptional } from 'class-validator';
import { FoodDiaryValidationMessage } from '../food-diary.constant';

const { CaloriesAmountNotValid, DateOfMealNotValid, TypeOfMealNotValid } =
  FoodDiaryValidationMessage;

export class UpdateFoodDiaryDto implements UpdateFoodDiary {
  @IsInt({ message: CaloriesAmountNotValid })
  @IsOptional()
  caloriesAmount?: number;

  @IsDateString({}, { message: DateOfMealNotValid })
  @IsOptional()
  dateOfMeal?: Date;

  @IsEnum(TypeOfMeal, { message: TypeOfMealNotValid })
  @IsOptional()
  typeOfMeal?: string;
}

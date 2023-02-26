import {
  CreateWorkout,
  FavorGenders,
  TrainingLevels,
  TrainingTimes,
  TrainingTypes,
} from '@fit-friends/shared';
import { Transform } from 'class-transformer';
import { IsBoolean, IsEnum, IsInt, Length, Max, Min } from 'class-validator';
import {
  WORKOUT_CONSTRAINT,
  WorkoutValidationMessage,
} from '../workout.constant';

const { TITLE, PRICE, CALORIES_AMOUNT, DESCRIPTION } = WORKOUT_CONSTRAINT;

const {
  TitleNotValid,
  CustomerLevelNotValid,
  TrainingTypeNotValid,
  TrainingTimeNotValid,
  PriceNotValid,
  MinPriceNotValid,
  CaloriesAmountNotValid,
  CaloriesAmountRangeNotValid,
  DescriptionNotValid,
  FavorGenderNotValid,
  IsSpecialNovValid,
} = WorkoutValidationMessage;

export class CreateWorkoutDto implements CreateWorkout {
  @Length(TITLE.MIN, TITLE.MAX, { message: TitleNotValid })
  title: string;

  @IsEnum(TrainingLevels, { message: CustomerLevelNotValid })
  customerLevel: string;

  @IsEnum(TrainingTypes, { message: TrainingTypeNotValid })
  trainingType: string;

  @IsEnum(TrainingTimes, { message: TrainingTimeNotValid })
  trainingTime: string;

  @Min(PRICE.MIN, { message: MinPriceNotValid })
  @IsInt({ message: PriceNotValid })
  @Transform(({ value }) => +value)
  price: number;

  @Max(CALORIES_AMOUNT.MAX, { message: CaloriesAmountRangeNotValid })
  @Min(CALORIES_AMOUNT.MIN, { message: CaloriesAmountRangeNotValid })
  @IsInt({ message: CaloriesAmountNotValid })
  @Transform(({ value }) => +value)
  caloriesAmountToLose: number;

  @Length(DESCRIPTION.MIN, DESCRIPTION.MAX, { message: DescriptionNotValid })
  description: string;

  @IsEnum(FavorGenders, { message: FavorGenderNotValid })
  favorGender: string;

  @IsBoolean({ message: IsSpecialNovValid })
  @Transform(({ value }) => !!value)
  isSpecial: boolean;
}

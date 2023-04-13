import {
  CreateWorkout,
  FavorGenders,
  TrainingLevels,
  TrainingTimes,
  TrainingTypes,
} from '@fit-friends/shared';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  Length,
  Max,
  Min,
} from 'class-validator';
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

export class UpdateWorkoutDto implements Partial<CreateWorkout> {
  @Length(TITLE.MIN, TITLE.MAX, { message: TitleNotValid })
  @IsOptional()
  title?: string;

  @IsEnum(TrainingLevels, { message: CustomerLevelNotValid })
  @IsOptional()
  customerLevel?: string;

  @IsEnum(TrainingTypes, { message: TrainingTypeNotValid })
  @IsOptional()
  trainingType?: string;

  @IsEnum(TrainingTimes, { message: TrainingTimeNotValid })
  @IsOptional()
  trainingTime?: string;

  @Min(PRICE.MIN, { message: MinPriceNotValid })
  @IsInt({ message: PriceNotValid })
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  price?: number;

  @Max(CALORIES_AMOUNT.MAX, { message: CaloriesAmountRangeNotValid })
  @Min(CALORIES_AMOUNT.MIN, { message: CaloriesAmountRangeNotValid })
  @IsInt({ message: CaloriesAmountNotValid })
  @Transform(({ value }) => +value)
  @IsOptional()
  caloriesAmountToLose?: number;

  @Length(DESCRIPTION.MIN, DESCRIPTION.MAX, { message: DescriptionNotValid })
  @IsOptional()
  description?: string;

  @IsEnum(FavorGenders, { message: FavorGenderNotValid })
  @IsOptional()
  favorGender?: string;

  @IsBoolean({ message: IsSpecialNovValid })
  @Transform(({ value }) => !!value)
  @IsOptional()
  isSpecial?: boolean;
}

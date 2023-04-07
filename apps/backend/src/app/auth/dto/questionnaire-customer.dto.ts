import {
  CustomerAdditionalInfo,
  TrainingLevels,
  TrainingTimes,
  TrainingTypes,
} from '@fit-friends/shared';
import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayNotEmpty,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  Max,
  Min,
} from 'class-validator';
import {
  USER_CONSTRAINT,
  UserValidationMessage,
} from '../../user/user.constant';

const {
  TrainingLevelNotValid,
  TrainingLevelRequired,
  TrainingTypeArrayNotValid,
  TrainingTypeNotValid,
  TrainingTypeRequired,
  TrainingTimeNotValid,
  TrainingTimeRequired,
  CaloriesAmountToLoseNotValid,
  CaloriesAmountToLoseRequired,
  CaloriesAmountToLosePerDayNotValid,
  CaloriesAmountToLosePerDayRequired,
  IsReadyToTraining,
  UserIdRequired,
} = UserValidationMessage;

export class QuestionnaireCustomerDto implements CustomerAdditionalInfo {
  @IsNotEmpty({ message: UserIdRequired })
  userId: number;

  @IsEnum(TrainingLevels, { message: TrainingLevelNotValid })
  @IsNotEmpty({ message: TrainingLevelRequired })
  trainingLevel: string;

  @IsEnum(TrainingTypes, { each: true, message: TrainingTypeNotValid })
  @ArrayMaxSize(USER_CONSTRAINT.TRAINING_TYPE.MAX, {
    message: TrainingTypeArrayNotValid,
  })
  @ArrayNotEmpty({ message: TrainingTypeRequired })
  trainingType: string[];

  @IsEnum(TrainingTimes, { message: TrainingTimeNotValid })
  @IsNotEmpty({ message: TrainingTimeRequired })
  trainingTime: string;

  @Max(USER_CONSTRAINT.CALORIES_AMOUNT.MAX, {
    message: CaloriesAmountToLoseNotValid,
  })
  @Min(USER_CONSTRAINT.CALORIES_AMOUNT.MIN, {
    message: CaloriesAmountToLoseNotValid,
  })
  @IsNotEmpty({ message: CaloriesAmountToLoseRequired })
  @Transform(({ value }) => +value)
  caloriesAmountToLose: number;

  @Max(USER_CONSTRAINT.CALORIES_AMOUNT.MAX, {
    message: CaloriesAmountToLosePerDayNotValid,
  })
  @Min(USER_CONSTRAINT.CALORIES_AMOUNT.MIN, {
    message: CaloriesAmountToLosePerDayNotValid,
  })
  @IsNotEmpty({ message: CaloriesAmountToLosePerDayRequired })
  @Transform(({ value }) => +value)
  caloriesAmountToLosePerDay: number;

  @IsBoolean({ message: IsReadyToTraining })
  isReadyToTraining: boolean;
}

import {
  Gender,
  Locations,
  Profile,
  TrainingLevels,
  TrainingTimes,
  TrainingTypes,
  UserRole,
} from '@fit-friends/shared';
import {
  ArrayMaxSize,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Length,
  Matches,
  Max,
  Min,
  Validate,
  ValidateIf,
} from 'class-validator';
import {
  USER_CONSTRAINT,
  UserValidationMessage,
} from '../../user/user.constant';
import { BirthdayValidator } from '../../validators/birthday.validator';

const {
  NameLengthNotValid,
  NameRequired,
  NameNotValid,
  GenderNotValid,
  GenderRequired,
  LocationNotValid,
  LocationRequired,
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
  IsReadyToPersonalTraining,
  IsReadyToTraining,
  ResumeNotValid,
  BirthdayNotValid,
} = UserValidationMessage;

export class UpdateProfileDto implements Partial<Profile> {
  @Matches(/^[a-zA-Zа-яА-ЯЁё]+$/, { message: NameNotValid })
  @Length(USER_CONSTRAINT.NAME.MIN, USER_CONSTRAINT.NAME.MAX, {
    message: NameLengthNotValid,
  })
  @IsNotEmpty({ message: NameRequired })
  @IsOptional()
  name?: string;

  @IsEnum(Gender, { message: GenderNotValid })
  @IsNotEmpty({ message: GenderRequired })
  @IsOptional()
  gender?: string;

  @Validate(BirthdayValidator, {
    message: BirthdayNotValid,
  })
  @IsOptional()
  birthDay?: string;

  @IsEnum(Locations, { message: LocationNotValid })
  @IsNotEmpty({ message: LocationRequired })
  @IsOptional()
  location?: string;

  @IsEnum(TrainingLevels, { message: TrainingLevelNotValid })
  @IsNotEmpty({ message: TrainingLevelRequired })
  @IsOptional()
  trainingLevel?: string;

  @IsEnum(TrainingTypes, { each: true, message: TrainingTypeNotValid })
  @ArrayMaxSize(USER_CONSTRAINT.TRAINING_TYPE.MAX, {
    message: TrainingTypeArrayNotValid,
  })
  @IsNotEmpty({ message: TrainingTypeRequired })
  @IsOptional()
  trainingType?: string[];

  @IsEnum(TrainingTimes, { message: TrainingTimeNotValid })
  @IsNotEmpty({ message: TrainingTimeRequired })
  @ValidateIf((obj) => obj.role === UserRole.Customer)
  @IsOptional()
  trainingTime?: string;

  @Max(USER_CONSTRAINT.CALORIES_AMOUNT.MAX, {
    message: CaloriesAmountToLoseNotValid,
  })
  @Min(USER_CONSTRAINT.CALORIES_AMOUNT.MIN, {
    message: CaloriesAmountToLoseNotValid,
  })
  @IsNotEmpty({ message: CaloriesAmountToLoseRequired })
  @ValidateIf((obj) => obj.role === UserRole.Customer)
  @IsOptional()
  caloriesAmountToLose?: number;

  @Max(USER_CONSTRAINT.CALORIES_AMOUNT.MAX, {
    message: CaloriesAmountToLosePerDayNotValid,
  })
  @Min(USER_CONSTRAINT.CALORIES_AMOUNT.MIN, {
    message: CaloriesAmountToLosePerDayNotValid,
  })
  @IsNotEmpty({ message: CaloriesAmountToLosePerDayRequired })
  @ValidateIf((obj) => obj.role === UserRole.Customer)
  @IsOptional()
  caloriesAmountToLosePerDay?: number;

  @IsBoolean({ message: IsReadyToTraining })
  @ValidateIf((obj) => obj.role === UserRole.Customer)
  @IsOptional()
  isReadyToTraining?: boolean;

  @Length(USER_CONSTRAINT.RESUME.MIN, USER_CONSTRAINT.RESUME.MAX, {
    message: ResumeNotValid,
  })
  @ValidateIf((obj) => obj.role === UserRole.Trainer)
  @IsOptional()
  resume?: string;

  @IsBoolean({ message: IsReadyToPersonalTraining })
  @ValidateIf((obj) => obj.role === UserRole.Trainer)
  @IsOptional()
  isReadyToPersonalTraining?: boolean;

  avatar?: string;
}

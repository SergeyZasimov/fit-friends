import {
  Gender,
  Locations,
  Profile,
  TrainingLevels,
  TrainingTimes,
  TrainingTypes,
  UserRole,
} from '@fit-friends/shared';
import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  IsBoolean,
  IsEnum,
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
  NameNotValid,
  GenderNotValid,
  LocationNotValid,
  TrainingLevelNotValid,
  TrainingTypeArrayNotValid,
  TrainingTypeNotValid,
  TrainingTimeNotValid,
  CaloriesAmountToLoseNotValid,
  CaloriesAmountToLosePerDayNotValid,
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
  @IsOptional()
  name?: string;

  @IsEnum(Gender, { message: GenderNotValid })
  @IsOptional()
  gender?: string;

  @Validate(BirthdayValidator, {
    message: BirthdayNotValid,
  })
  @IsOptional()
  birthDay?: string;

  @IsEnum(Locations, { message: LocationNotValid })
  @IsOptional()
  location?: string;

  @IsEnum(TrainingLevels, { message: TrainingLevelNotValid })
  @IsOptional()
  trainingLevel?: string;

  @IsEnum(TrainingTypes, { each: true, message: TrainingTypeNotValid })
  @ArrayMaxSize(USER_CONSTRAINT.TRAINING_TYPE.MAX, {
    message: TrainingTypeArrayNotValid,
  })
  @Transform(({ value }) => value.split(','))
  @IsOptional()
  trainingType?: string[];

  @IsEnum(TrainingTimes, { message: TrainingTimeNotValid })
  @ValidateIf((obj) => obj.role === UserRole.Customer)
  @IsOptional()
  trainingTime?: string;

  @Max(USER_CONSTRAINT.CALORIES_AMOUNT.MAX, {
    message: CaloriesAmountToLoseNotValid,
  })
  @Min(USER_CONSTRAINT.CALORIES_AMOUNT.MIN, {
    message: CaloriesAmountToLoseNotValid,
  })
  @ValidateIf((obj) => obj.role === UserRole.Customer)
  @Transform(({ value }) => +value)
  @IsOptional()
  caloriesAmountToLose?: number;

  @Max(USER_CONSTRAINT.CALORIES_AMOUNT.MAX, {
    message: CaloriesAmountToLosePerDayNotValid,
  })
  @Min(USER_CONSTRAINT.CALORIES_AMOUNT.MIN, {
    message: CaloriesAmountToLosePerDayNotValid,
  })
  @ValidateIf((obj) => obj.role === UserRole.Customer)
  @Transform(({ value }) => +value)
  @IsOptional()
  caloriesAmountToLosePerDay?: number;

  @IsBoolean({ message: IsReadyToTraining })
  @ValidateIf((obj) => obj.role === UserRole.Customer)
  @Transform(({ value }) => !!value)
  @IsOptional()
  isReadyToTraining?: boolean;

  @Length(USER_CONSTRAINT.RESUME.MIN, USER_CONSTRAINT.RESUME.MAX, {
    message: ResumeNotValid,
  })
  @ValidateIf((obj) => obj.role === UserRole.Trainer)
  @IsOptional()
  resume?: string;

  @IsBoolean({ message: IsReadyToPersonalTraining })
  @Transform(({ value }) => !!value)
  @ValidateIf((obj) => obj.role === UserRole.Trainer)
  @IsOptional()
  isReadyToPersonalTraining?: boolean;
}

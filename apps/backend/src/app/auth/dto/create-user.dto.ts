import {
  Gender,
  Locations,
  TrainingLevels,
  TrainingTimes,
  TrainingTypes,
  UserRole,
} from '@fit-friends/shared';
import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
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
  EmailNotValid,
  EmailRequired,
  PasswordLengthNotValid,
  PasswordRequired,
  RoleNotValid,
  RoleRequired,
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

export class CreateUserDto {
  @IsEmail({}, { message: EmailNotValid })
  @IsNotEmpty({ message: EmailRequired })
  email: string;

  @Length(USER_CONSTRAINT.PASSWORD.MIN, USER_CONSTRAINT.PASSWORD.MAX, {
    message: PasswordLengthNotValid,
  })
  @IsNotEmpty({ message: PasswordRequired })
  password: string;

  @IsEnum(UserRole, { message: RoleNotValid })
  @IsNotEmpty({ message: RoleRequired })
  role: string;

  @Matches(/^[a-zA-Zа-яА-ЯЁё]+$/, { message: NameNotValid })
  @Length(USER_CONSTRAINT.NAME.MIN, USER_CONSTRAINT.NAME.MAX, {
    message: NameLengthNotValid,
  })
  @IsNotEmpty({ message: NameRequired })
  name: string;

  @IsEnum(Gender, { message: GenderNotValid })
  @IsNotEmpty({ message: GenderRequired })
  gender: string;

  @Validate(BirthdayValidator, {
    message: BirthdayNotValid,
  })
  birthDay: string;

  @IsEnum(Locations, { message: LocationNotValid })
  @IsNotEmpty({ message: LocationRequired })
  location: string;

  @IsEnum(TrainingLevels, { message: TrainingLevelNotValid })
  @IsNotEmpty({ message: TrainingLevelRequired })
  trainingLevel: string;

  @IsEnum(TrainingTypes, { each: true, message: TrainingTypeNotValid })
  @ArrayMaxSize(USER_CONSTRAINT.TRAINING_TYPE.MAX, {
    message: TrainingTypeArrayNotValid,
  })
  @IsNotEmpty({ message: TrainingTypeRequired })
  trainingType: string[];

  @IsEnum(TrainingTimes, { message: TrainingTimeNotValid })
  @IsNotEmpty({ message: TrainingTimeRequired })
  @ValidateIf((obj) => obj.role === UserRole.Customer)
  trainingTime?: string;

  @Max(USER_CONSTRAINT.CALORIES_AMOUNT.MAX, {
    message: CaloriesAmountToLoseNotValid,
  })
  @Min(USER_CONSTRAINT.CALORIES_AMOUNT.MIN, {
    message: CaloriesAmountToLoseNotValid,
  })
  @IsNotEmpty({ message: CaloriesAmountToLoseRequired })
  @Transform(({ value }) => +value)
  @ValidateIf((obj) => obj.role === UserRole.Customer)
  caloriesAmountToLose?: number;

  @Max(USER_CONSTRAINT.CALORIES_AMOUNT.MAX, {
    message: CaloriesAmountToLosePerDayNotValid,
  })
  @Min(USER_CONSTRAINT.CALORIES_AMOUNT.MIN, {
    message: CaloriesAmountToLosePerDayNotValid,
  })
  @IsNotEmpty({ message: CaloriesAmountToLosePerDayRequired })
  @Transform(({ value }) => +value)
  @ValidateIf((obj) => obj.role === UserRole.Customer)
  caloriesAmountToLosePerDay?: number;

  @IsBoolean({ message: IsReadyToTraining })
  @Transform(({ value }) => !!value)
  @ValidateIf((obj) => obj.role === UserRole.Customer)
  isReadyToTraining?: boolean;

  @Length(USER_CONSTRAINT.RESUME.MIN, USER_CONSTRAINT.RESUME.MAX, {
    message: ResumeNotValid,
  })
  @ValidateIf((obj) => obj.role === UserRole.Trainer)
  resume?: string;

  @IsBoolean({ message: IsReadyToPersonalTraining })
  @Transform(({ value }) => !!value)
  @ValidateIf((obj) => obj.role === UserRole.Trainer)
  isReadyToPersonalTraining?: boolean;
}

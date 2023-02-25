import {
  CreateUser,
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
  UserConstraint,
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

export class CreateUserDto implements CreateUser {
  @IsEmail({}, { message: EmailNotValid })
  @IsNotEmpty({ message: EmailRequired })
  email: string;

  @Length(UserConstraint.Password.Min, UserConstraint.Password.Max, {
    message: PasswordLengthNotValid,
  })
  @IsNotEmpty({ message: PasswordRequired })
  password: string;

  @IsEnum(UserRole, { message: RoleNotValid })
  @IsNotEmpty({ message: RoleRequired })
  role: string;

  @Matches(/^[a-zA-Zа-яА-ЯЁё]+$/, { message: NameNotValid })
  @Length(UserConstraint.Name.Min, UserConstraint.Name.Max, {
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
  @ArrayMaxSize(UserConstraint.TrainingType.Max, {
    message: TrainingTypeArrayNotValid,
  })
  @IsNotEmpty({ message: TrainingTypeRequired })
  trainingType: string[];

  @IsEnum(TrainingTimes, { message: TrainingTimeNotValid })
  @IsNotEmpty({ message: TrainingTimeRequired })
  @ValidateIf((obj) => obj.role === UserRole.Customer)
  trainingTime: string;

  @Max(UserConstraint.CaloriesAmount.Max, {
    message: CaloriesAmountToLoseNotValid,
  })
  @Min(UserConstraint.CaloriesAmount.Min, {
    message: CaloriesAmountToLoseNotValid,
  })
  @IsNotEmpty({ message: CaloriesAmountToLoseRequired })
  @ValidateIf((obj) => obj.role === UserRole.Customer)
  caloriesAmountToLose: number;

  @Max(UserConstraint.CaloriesAmount.Max, {
    message: CaloriesAmountToLosePerDayNotValid,
  })
  @Min(UserConstraint.CaloriesAmount.Min, {
    message: CaloriesAmountToLosePerDayNotValid,
  })
  @IsNotEmpty({ message: CaloriesAmountToLosePerDayRequired })
  @ValidateIf((obj) => obj.role === UserRole.Customer)
  caloriesAmountToLosePerDay: number;

  @IsBoolean({ message: IsReadyToTraining })
  @ValidateIf((obj) => obj.role === UserRole.Customer)
  isReadyToTraining: boolean;

  @Length(UserConstraint.Resume.Min, UserConstraint.Resume.Max, {
    message: ResumeNotValid,
  })
  @ValidateIf((obj) => obj.role === UserRole.Trainer)
  resume: string;

  @IsBoolean({ message: IsReadyToPersonalTraining })
  @Transform(({ value }) => !!value)
  @ValidateIf((obj) => obj.role === UserRole.Trainer)
  isReadyToPersonalTraining: boolean;
}

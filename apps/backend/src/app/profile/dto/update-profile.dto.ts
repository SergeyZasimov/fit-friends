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
  UserConstraint,
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
  @Length(UserConstraint.Name.Min, UserConstraint.Name.Max, {
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
  @ArrayMaxSize(UserConstraint.TrainingType.Max, {
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

  @Max(UserConstraint.CaloriesAmount.Max, {
    message: CaloriesAmountToLoseNotValid,
  })
  @Min(UserConstraint.CaloriesAmount.Min, {
    message: CaloriesAmountToLoseNotValid,
  })
  @IsNotEmpty({ message: CaloriesAmountToLoseRequired })
  @ValidateIf((obj) => obj.role === UserRole.Customer)
  @IsOptional()
  caloriesAmountToLose?: number;

  @Max(UserConstraint.CaloriesAmount.Max, {
    message: CaloriesAmountToLosePerDayNotValid,
  })
  @Min(UserConstraint.CaloriesAmount.Min, {
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

  @Length(UserConstraint.Resume.Min, UserConstraint.Resume.Max, {
    message: ResumeNotValid,
  })
  @ValidateIf((obj) => obj.role === UserRole.Trainer)
  @IsOptional()
  resume?: string;

  @IsBoolean({ message: IsReadyToPersonalTraining })
  @ValidateIf((obj) => obj.role === UserRole.Trainer)
  @IsOptional()
  isReadyToPersonalTraining?: boolean;
}

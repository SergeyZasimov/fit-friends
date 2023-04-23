import {
  TrainerAdditionalInfo,
  TrainingLevels,
  TrainingTypes,
} from '@fit-friends/shared';
import { Transform } from 'class-transformer';
import {
  ArrayMaxSize,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Length,
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

  IsReadyToPersonalTraining,
  ResumeNotValid,
  UserIdRequired,
} = UserValidationMessage;

export class QuestionnaireTrainerDto implements TrainerAdditionalInfo {
  certificate: string | File;

  @IsNotEmpty({ message: UserIdRequired })
  @Transform(({ value }) => +value)
  userId: number;

  @IsEnum(TrainingLevels, { message: TrainingLevelNotValid })
  @IsNotEmpty({ message: TrainingLevelRequired })
  trainingLevel: string;

  @IsEnum(TrainingTypes, { each: true, message: TrainingTypeNotValid })
  @ArrayMaxSize(USER_CONSTRAINT.TRAINING_TYPE.MAX, {
    message: TrainingTypeArrayNotValid,
  })
  @IsNotEmpty({ message: TrainingTypeRequired })
  trainingType: string[];

  @Length(USER_CONSTRAINT.RESUME.MIN, USER_CONSTRAINT.RESUME.MAX, {
    message: ResumeNotValid,
  })
  @IsOptional()
  resume: string;

  @IsBoolean({ message: IsReadyToPersonalTraining })
  @Transform(({ value }) => (value === 'true' ? true : false))
  @IsOptional()
  isReadyToPersonalTraining: boolean;
}

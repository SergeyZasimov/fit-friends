import { TrainingStatus, UpdatePersonalTraining } from '@fit-friends/shared';
import { IsEnum, IsInt } from 'class-validator';
import { PersonalTrainingValidationMessage } from '../personal-training.constant';

export class UpdatePersonalTrainingDto implements UpdatePersonalTraining {
  @IsInt({ message: PersonalTrainingValidationMessage.IdNotValid })
  id: number;

  @IsEnum(TrainingStatus, {
    message: PersonalTrainingValidationMessage.StatusNotValid,
  })
  status: string;
}

import { CreatePersonalTraining } from '@fit-friends/shared';
import { IsInt } from 'class-validator';
import { PersonalTrainingValidationMessage } from '../personal-training.constant';

export class CreatePersonalTrainingDto implements CreatePersonalTraining {
  @IsInt({ message: PersonalTrainingValidationMessage.ConductorIdNotValid })
  conductorId: number;
}

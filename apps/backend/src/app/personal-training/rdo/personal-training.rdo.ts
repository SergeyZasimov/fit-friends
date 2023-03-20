import { PersonalTraining } from '@fit-friends/shared';
import { Expose } from 'class-transformer';

export class PersonalTrainingRdo implements PersonalTraining {
  @Expose()
  id: number;

  @Expose()
  requesterId: number;

  @Expose()
  conductorId: number;

  @Expose()
  status: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}

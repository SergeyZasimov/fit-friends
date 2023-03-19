import { PersonalTraining } from '@fit-friends/shared';

export class PersonalTrainingEntity implements PersonalTraining {
  requesterId?: number;
  conductorId?: number;
  status: string;

  constructor(entity: PersonalTraining) {
    this.requesterId = entity.requesterId;
    this.conductorId = entity.conductorId;
    this.status = entity.status;
  }
}

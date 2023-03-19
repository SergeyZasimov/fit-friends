import { User } from './user.types';

export type PersonalTraining = {
  id?: number;
  requesterId?: number;
  requester?: User;
  conductorId?: number;
  conductor?: User;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CreatePersonalTraining = Pick<PersonalTraining, 'conductorId'>;

export type UpdatePersonalTraining = Pick<PersonalTraining, 'id' | 'status'>;

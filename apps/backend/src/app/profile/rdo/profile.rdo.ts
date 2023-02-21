import { Profile, UserRole } from '@fit-friends/shared';
import { Expose } from 'class-transformer';

export class ProfileRdo implements Profile {
  @Expose()
  name: string;

  @Expose()
  avatar: string;

  @Expose()
  gender: string;

  @Expose()
  birthDay: string;

  @Expose()
  location: string;

  @Expose()
  trainingLevel: string;

  @Expose()
  trainingType: string[];

  @Expose({ groups: [UserRole.Customer] })
  trainingTime: string;

  @Expose({ groups: [UserRole.Customer] })
  caloriesAmountToLose: number;

  @Expose({ groups: [UserRole.Customer] })
  caloriesAmountToLosePerDay: number;

  @Expose({ groups: [UserRole.Customer] })
  isReadyToTraining: boolean;

  @Expose({ groups: [UserRole.Trainer] })
  certificate: string;

  @Expose({ groups: [UserRole.Trainer] })
  resume: string;

  @Expose({ groups: [UserRole.Trainer] })
  isReadyToPersonalTraining: boolean;
}

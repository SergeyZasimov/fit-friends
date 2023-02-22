import { Profile } from '@fit-friends/shared';

export class ProfileEntity implements Profile {
  user?: number;
  name: string;
  gender: string;
  avatar: string;
  birthDay: Date;
  location: string;
  trainingLevel: string;
  trainingType: string[];
  trainingTime?: string;
  caloriesAmountToLose?: number;
  caloriesAmountToLosePerDay?: number;
  isReadyToTraining?: boolean;
  certificate?: string;
  resume?: string;
  isReadyToPersonalTraining?: boolean;

  constructor(profile: Profile) {
    this.user = profile.user;
    this.name = profile.name;
    this.gender = profile.gender;
    this.avatar = profile.avatar ?? '';
    this.birthDay = new Date(profile.birthDay);
    this.location = profile.location;
    this.trainingLevel = profile.trainingLevel;
    this.trainingTime = profile.trainingTime;
    this.trainingType = profile.trainingType;
    this.caloriesAmountToLose = profile.caloriesAmountToLose;
    this.caloriesAmountToLosePerDay = profile.caloriesAmountToLosePerDay;
    this.isReadyToTraining = profile.isReadyToTraining;
    this.certificate = profile.certificate;
    this.resume = profile.resume;
    this.isReadyToPersonalTraining = profile.isReadyToPersonalTraining;
  }
}

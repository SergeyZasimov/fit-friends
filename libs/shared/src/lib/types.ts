import {
  FavorGenders,
  Gender,
  Locations,
  Role,
  TrainingLevels,
  TrainingTimes,
  TrainingTypes,
} from './enums';

export type User = {
  id?: number;
  email: string;
  password?: string;
  passwordHash?: string;
  role: UserRole;
  createdAt?: Date;
};

export type Profile = {
  id?: number;
  userId: number;
  name: string;
  gender: UserGender;
  avatar: string;
  birthDate?: Date;
  location: Location;
};

export type CustomerAdditionalInfo = {
  trainingLevel: TrainingLevel;
  trainingType: TrainingType[];
  trainingTime: TrainingTime;
  caloriesAmountToLose: number;
  caloriesAmountToLosePerDay: number;
  isReadyToTraining: boolean;
};

export type TrainerAdditionalInfo = {
  trainingLevel: TrainingLevel;
  trainingType: TrainingType[];
  certificate: string;
  resume: string;
  isReadyToPersonalTraining: boolean;
};

export type CustomerProfile = Profile & CustomerAdditionalInfo;

export type TrainerProfile = Profile & TrainerAdditionalInfo;

export type UserGender = typeof Gender;

export type UserRole = typeof Role;

export type Location = (typeof Locations)[number];

export type TrainingLevel = (typeof TrainingLevels)[number];

export type TrainingType = (typeof TrainingTypes)[number];

export type TrainingTime = (typeof TrainingTimes)[number];

export type Workout = {
  title: string;
  backgroundImage: string;
  customerLevel: TrainingLevel;
  trainingType: TrainingType;
  trainingTime: TrainingTime;
  price: number;
  caloriesAmountToLose: number;
  description: string;
  favorGender: FavorGender;
  video: string;
  rating: number;
  trainerId: string;
  isSpecial: boolean;
};

export type FavorGender = (typeof FavorGenders)[number];

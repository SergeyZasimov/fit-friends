import {
  FavorGenders,
  Gender,
  GymParameters,
  Locations,
  PaymentMethods,
  Purchases,
  Role,
  TrainingLevels,
  TrainingStatus,
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

export type Workout = {
  id?: number;
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

export type SportGym = {
  id?: number;
  title: string;
  location: Location;
  isVerified: boolean;
  parameters: GymParameter[];
  photos: string[];
  description: string;
  oneWorkoutPrice: number;
  createdAd?: Date;
};

export type Review = {
  id?: number;
  userId: number;
  workoutId: number;
  rating: number;
  text: string;
  createdAt?: Date;
};

export type Order = {
  id?: number;
  purchaseType: Purchase;
  purchaseId: number;
  workoutPrice: number;
  workoutAmount: number;
  totalCost: number;
  paymentMethod: PaymentMethod;
  createdAt?: Date;
};

export type PersonalTrainingRequest = {
  id?: number;
  requesterId: number;
  conductorId: number;
  status: PersonalTrainingStatus;
  createdAt?: Date;
  updatedAt?: Date;
};

export type Notification = {
  id?: number;
  userId: number;
  notifyAt?: Date;
  text: string;
};

export type CustomerProfile = Profile & CustomerAdditionalInfo;

export type TrainerProfile = Profile & TrainerAdditionalInfo;

export type UserGender = typeof Gender;

export type UserRole = typeof Role;

export type Location = (typeof Locations)[number];

export type TrainingLevel = (typeof TrainingLevels)[number];

export type TrainingType = (typeof TrainingTypes)[number];

export type TrainingTime = (typeof TrainingTimes)[number];

export type FavorGender = (typeof FavorGenders)[number];

export type GymParameter = (typeof GymParameters)[number];

export type Purchase = (typeof Purchases)[number];

export type PaymentMethod = (typeof PaymentMethods)[number];

export type PersonalTrainingStatus = typeof TrainingStatus;

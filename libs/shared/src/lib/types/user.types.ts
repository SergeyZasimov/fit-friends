import { SportGym } from './sport-gym.type';

export type User = {
  id?: number;
  email: string;
  password?: string;
  passwordHash?: string;
  role: string;
  profile?: Profile;
  refreshToken?: string;
  createdAt?: Date;
  followedBy?: User[];
  following?: User[];
  sportGyms?: SportGym[];
};

export type DefaultProfile = {
  id?: number;
  user?: number;
  name: string;
  gender: string;
  avatar?: File | string;
  birthDay?: Date | string;
  location: string;
};

export type CustomerAdditionalInfo = {
  userId?: number;
  trainingLevel: string;
  trainingType: string[];
  trainingTime: string;
  caloriesAmountToLose: number;
  caloriesAmountToLosePerDay: number;
  isReadyToTraining: boolean;
};

export type TrainerAdditionalInfo = {
  userId?: number;
  trainingLevel: string;
  trainingType: string[];
  certificate: File | string;
  resume: string;
  isReadyToPersonalTraining: boolean;
};

export type CustomerProfile = DefaultProfile & Partial<CustomerAdditionalInfo>;

export type TrainerProfile = DefaultProfile & Partial<TrainerAdditionalInfo>;

export type Profile = CustomerProfile & TrainerProfile;

export type CreateUser = Pick<User, 'email' | 'password' | 'role'> &
  Omit<Profile, 'id' | 'user'>;

export type LoginUser = Pick<User, 'email' | 'password'>;

export type TokenPayload = {
  id: number;
  email: string;
  role: string;
};

export type UserTokens = {
  access_token: string;
  refresh_token: string;
};

export type RegisterUser = Pick<User, 'email' | 'password' | 'role'> &
  Pick<Profile, 'avatar' | 'birthDay' | 'gender' | 'location' | 'name'>;

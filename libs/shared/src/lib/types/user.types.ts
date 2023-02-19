export type User = {
  id?: number;
  email: string;
  password?: string;
  passwordHash?: string;
  role: string;
  createdAt?: Date;
};

export type DefaultProfile = {
  id?: number;
  user: number;
  name: string;
  gender: string;
  avatar?: string;
  birthDay?: Date | string;
  location: string;
};

export type CustomerAdditionalInfo = {
  trainingLevel: string;
  trainingType: string[];
  trainingTime: string;
  caloriesAmountToLose: number;
  caloriesAmountToLosePerDay: number;
  isReadyToTraining: boolean;
};

export type TrainerAdditionalInfo = {
  trainingLevel: string;
  trainingType: string[];
  certificate: string;
  resume: string;
  isReadyToPersonalTraining: boolean;
};

export type CustomerProfile = DefaultProfile & Partial<CustomerAdditionalInfo>;

export type TrainerProfile = DefaultProfile & Partial<TrainerAdditionalInfo>;

export type Profile = CustomerProfile & TrainerProfile;

export type CreateUser = Omit<User, 'id' | 'passwordHash' | 'createdAt'> &
  Omit<Profile, 'id' | 'user'>;

export type LoginUser = Pick<User, 'email' | 'password'>;

import { createCustomer } from '../../cli/mocks';

const dto = createCustomer();

const id = 1;

const refreshToken = 'refresh';

const user = {
  id,
  email: dto.email,
  role: dto.role,
  passwordHash: dto.password,
  refreshToken: '',
  createdAt: new Date(),
  profile: {
    gender: dto.gender,
    location: dto.location,
    name: dto.email,
    avatar: '',
    birthDay: dto.birthDay,
    trainingLevel: dto.trainingLevel,
    trainingType: dto.trainingType,
    trainingTime: dto.trainingTime,
    caloriesAmountToLose: dto.caloriesAmountToLose,
    caloriesAmountToLosePerDay: dto.caloriesAmountToLosePerDay,
    isReadyToTraining: dto.isReadyToTraining,
  },
};

const updatedUser = { ...user, refreshToken };

export const userStubs = { dto, id, user, updatedUser, refreshToken };

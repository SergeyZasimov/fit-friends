import { createCustomer } from '../../cli/mocks';
import { userStubs } from '../../user/test/user.stub';

export const id = 1;
export const userId = 1;
export const { profile: dto, ...user } = userStubs.user;

export const userDto = createCustomer();

export const profile = {
  ...dto,
  id,
  userId,
};

export const updateDto = {
  name: 'John',
  caloriesAmountToLose: 2000,
};

export const updatedProfile = {
  ...profile,
  ...updateDto,
};

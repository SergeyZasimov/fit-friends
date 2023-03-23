import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { createCustomer, createTrainer } from '../../cli/mocks';
import { UserRdo } from '../../user/rdo/user.rdo';
import { UserFiles } from '../../user/user.constant';
import { fillObject } from '../../utils/helpers';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

const customerStub = createCustomer();

const tokens = {
  access_token: 'accessToken',
  refresh_token: 'refreshToken',
};

const mockAuthService = {
  register: jest.fn().mockResolvedValue(customerStub),
  login: jest.fn().mockResolvedValue(tokens),
  logout: jest.fn().mockResolvedValue(undefined),
};

describe('Auth Controller', () => {
  let authService: AuthService;
  let authController: AuthController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AuthService],
      controllers: [AuthController],
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    authService = module.get<AuthService>(AuthService);
    authController = module.get<AuthController>(AuthController);

    jest.clearAllMocks();
  });

  test('should be defined', () => {
    expect(authService).toBeDefined();
    expect(authController).toBeDefined();
  });

  test('register should return user', async () => {
    const files: UserFiles = { avatar: [] };
    const user = await authController.register(customerStub, files);
    expect(authService.register).toBeCalled();
    expect(user).toEqual(fillObject(UserRdo, customerStub));
  });

  test('login should return tokens', async () => {
    const result = await authController.login(customerStub);
    expect(authService.login).toBeCalledWith(customerStub);
    expect(result).toMatchObject(tokens);
  });

  test('refresh tokens should return tokens', async () => {
    const result = await authController.refreshTokens(customerStub);
    expect(authService.login).toBeCalledWith(customerStub);
    expect(result).toMatchObject(tokens);
  });

  test('logout should return void', async () => {
    const result = await authController.logout(customerStub);
    expect(authService.logout).toBeCalledWith(customerStub);
    expect(result).toBeUndefined();
  });

  test('register should throw error when not avatar', async () => {
    const files: UserFiles = { certificate: [] };
    await expect(
      authController.register(customerStub, files)
    ).rejects.toThrowError(BadRequestException);
  });

  test('register should throw error when trainer and not certificate', async () => {
    const files: UserFiles = { avatar: [] };
    const trainerStub = createTrainer();
    await expect(
      authController.register(trainerStub, files)
    ).rejects.toThrowError(BadRequestException);
  });
});

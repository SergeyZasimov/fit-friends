import { SportGym, User } from '@prisma/client';
import { createCustomer, createSportGym, createTrainer } from '../../cli/mocks';
import {
  Context,
  MockContext,
  createMockContext,
} from '../../context/prisma-context';
import { UserEntity } from '../user.entity';

import { FavoriteAction, UserRole } from '@fit-friends/shared';
import { ProfileQueryDto } from '../../profile/dto/profile-query.dto';
import { SportGymEntity } from '../../sport-gym/sport-gym.entity';
import { UserRepository } from '../user.repository';

describe('User Repository', () => {
  let mockCtx: MockContext;
  let ctx: Context;
  let userRepository: UserRepository;

  beforeEach(async () => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;

    userRepository = new UserRepository(ctx.prisma);

    jest.clearAllMocks();
  });

  test('should create a new customer', async () => {
    const dto = createCustomer();
    const entity = new UserEntity(dto);
    const user: User = {
      ...entity,
      id: 1,
      createdAt: new Date(),
    };

    mockCtx.prisma.user.create.mockResolvedValue(user);

    const newUser = await userRepository.create(entity);
    expect(newUser).toEqual(user);
    expect(newUser.role).toEqual(UserRole.Customer);
  });

  test('should create a new trainer', async () => {
    const dto = createTrainer();
    const entity = new UserEntity(dto);
    const user: User = {
      ...entity,
      id: 1,
      createdAt: new Date(),
    };

    mockCtx.prisma.user.create.mockResolvedValue(user);

    const newUser = await userRepository.create(entity);
    expect(newUser).toEqual(user);
    expect(newUser.role).toEqual(UserRole.Trainer);
  });

  test('should update refreshToken', async () => {
    const refreshToken = 'refreshToken';
    const id = 1;
    const dto = createCustomer();
    const entity = new UserEntity({ ...dto, refreshToken });
    const user: User = {
      ...entity,
      id,
      createdAt: new Date(),
      refreshToken,
    };

    mockCtx.prisma.user.update.mockResolvedValue(user);

    const newUser = await userRepository.update(id, entity);
    expect(newUser).toEqual(user);
    expect(newUser.refreshToken).toEqual(refreshToken);
  });

  test('should find user by email', async () => {
    const entity = new UserEntity(createCustomer());
    const email = entity.email;

    const user: User = {
      ...entity,
      id: 1,
      createdAt: new Date(),
    };

    mockCtx.prisma.user.findUnique.mockResolvedValue(user);

    expect(await userRepository.findByEmail(email)).toEqual(user);
  });

  test('should find user by id', async () => {
    const id = 1;
    const entity = new UserEntity(createCustomer());

    const expectedUser: User = {
      ...entity,
      id,
      createdAt: new Date(),
    };

    mockCtx.prisma.user.findUnique.mockResolvedValue(expectedUser);

    expect(await userRepository.findById(id)).toEqual(expectedUser);
  });

  test('should find users', async () => {
    const users: User[] = [];
    const query = new ProfileQueryDto();
    for (let i = 1; i <= 2; i++) {
      const entity = new UserEntity(createCustomer());
      users.push({ ...entity, id: i, createdAt: new Date() });
    }

    mockCtx.prisma.user.findMany.mockResolvedValue(users);
    expect(await userRepository.find(query)).toEqual(users);
  });

  test('should add new friend', async () => {
    const users: User[] = [];
    const query = new ProfileQueryDto();

    for (let i = 1; i <= 2; i++) {
      const entity = new UserEntity(createCustomer());
      users.push({ ...entity, id: i, createdAt: new Date() });
    }

    const expectUser = { ...users[0], friends: [users[1]] };

    mockCtx.prisma.user.findUnique.mockResolvedValue(expectUser);

    await userRepository.addFriend(users[0].id, users[1].id);
    expect(await userRepository.findFriends(users[0].id, query)).toContain(
      users[1]
    );
  });

  test('should remove gym from favorite', async () => {
    const userEntity = new UserEntity(createCustomer());
    const gymEntity = new SportGymEntity(createSportGym());

    const user: User = {
      ...userEntity,
      id: 1,
      createdAt: new Date(),
    };

    const gym: SportGym = {
      ...gymEntity,
      id: 1,
      createdAt: new Date(),
    };

    const expectUser = { ...user, sportGyms: [gym] };

    mockCtx.prisma.user.findUnique.mockResolvedValue(expectUser);
    await userRepository.updateSportGymToFavorite(
      user.id,
      gym.id,
      FavoriteAction.Add
    );

    expect(await userRepository.findFavoriteGyms(user.id)).toContain(gym);
  });

  test('should add gym to favorite', async () => {
    const userEntity = new UserEntity(createCustomer());
    const gymEntity = new SportGymEntity(createSportGym());

    const user: User = {
      ...userEntity,
      id: 1,
      createdAt: new Date(),
    };

    const gym: SportGym = {
      ...gymEntity,
      id: 1,
      createdAt: new Date(),
    };

    const expectUser = { ...user, sportGyms: [] };

    mockCtx.prisma.user.findUnique.mockResolvedValue(expectUser);

    await userRepository.updateSportGymToFavorite(
      user.id,
      gym.id,
      FavoriteAction.Add
    );

    await userRepository.updateSportGymToFavorite(
      user.id,
      gym.id,
      FavoriteAction.Remove
    );

    expect(await userRepository.findFavoriteGyms(user.id)).not.toContain(gym);
  });
});

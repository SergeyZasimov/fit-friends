import { SportGym, User } from '@prisma/client';
import { createCustomer, createSportGym } from '../../cli/mocks';

import { UserEntity } from '../user.entity';

import { TestBed } from '@automock/jest';
import { FavoriteAction, UserRole } from '@fit-friends/shared';
import { PrismaService } from '../../prisma/prisma.service';
import { ProfileQueryDto } from '../../profile/dto/profile-query.dto';
import { SportGymEntity } from '../../sport-gym/sport-gym.entity';
import { UserRepository } from '../user.repository';
import { userStubs } from './user.stub';

const { dto, user, id, updatedUser, refreshToken } = userStubs;

describe('User Repository', () => {
  let userRepository: UserRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(UserRepository)
      .mock(PrismaService)
      .using({
        user: {
          create: jest.fn().mockResolvedValue(user),
          update: jest.fn().mockResolvedValue(updatedUser),
          findUnique: jest.fn().mockResolvedValue(user),
          findMany: jest.fn().mockResolvedValue([user]),
        },
      })
      .compile();

    userRepository = unit;
    prisma = unitRef.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should be defined', () => {
    expect(userRepository).toBeDefined();
    expect(prisma).toBeDefined();
  });

  test('should create a new user', async () => {
    const entity = new UserEntity(dto);
    const newUser = await userRepository.create(entity);

    expect(prisma.user.create).toBeCalled();
    expect(newUser).toEqual(user);
    expect(newUser.role).toEqual(UserRole.Customer);
  });

  test('should update refreshToken', async () => {
    const entity = new UserEntity({ ...dto, refreshToken });
    const newUser = await userRepository.update(id, entity);

    expect(prisma.user.update).toBeCalled();
    expect(newUser).toEqual(updatedUser);
    expect(newUser.refreshToken).toEqual(refreshToken);
  });

  test('should find user by email', async () => {
    const result = await userRepository.findByEmail(dto.email);

    expect(prisma.user.findUnique).toBeCalled();
    expect(result).toEqual(user);
  });

  test('should find user by id', async () => {
    const result = await userRepository.findById(id);

    expect(prisma.user.findUnique).toBeCalled();
    expect(result).toEqual(user);
  });

  test('should find users', async () => {
    const query = new ProfileQueryDto();
    const result = await userRepository.find(query);

    expect(prisma.user.findMany).toBeCalled();
    expect(result).toEqual([user]);
  });

  test('should add new friend', async () => {
    const users: User[] = [];
    const query = new ProfileQueryDto();

    for (let i = 1; i <= 2; i++) {
      const entity = new UserEntity(createCustomer());
      users.push({ ...entity, id: i, createdAt: new Date() });
    }

    const expectUser = { ...users[0], friends: [users[1]] };

    jest.spyOn(prisma.user, 'update').mockResolvedValue(expectUser);
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(expectUser);

    const result = await userRepository.addFriend(users[0].id, users[1].id);

    expect(prisma.user.update).toBeCalled();
    expect(result).toEqual(expectUser);
    expect(await userRepository.findFriends(users[0].id, query)).toContain(
      users[1]
    );
    expect(prisma.user.findUnique).toBeCalled();
  });

  test('should add gym from favorite', async () => {
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
    jest.spyOn(prisma.user, 'update').mockResolvedValue(expectUser);
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(expectUser);

    const result = await userRepository.updateSportGymToFavorite(
      user.id,
      gym.id,
      FavoriteAction.Add
    );

    expect(prisma.user.update).toBeCalled();
    expect(result).toEqual(expectUser);
    expect(await userRepository.findFavoriteGyms(user.id)).toContain(gym);
    expect(prisma.user.findUnique).toBeCalled();
  });

  test('should remove gym to favorite', async () => {
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
    jest.spyOn(prisma.user, 'update').mockResolvedValue(expectUser);
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(expectUser);

    await userRepository.updateSportGymToFavorite(
      user.id,
      gym.id,
      FavoriteAction.Add
    );

    const result = await userRepository.updateSportGymToFavorite(
      user.id,
      gym.id,
      FavoriteAction.Remove
    );

    expect(prisma.user.update).toBeCalled();
    expect(result).toEqual(expectUser);
    expect(await userRepository.findFavoriteGyms(user.id)).not.toContain(gym);
    expect(prisma.user.findUnique).toBeCalled();
  });
});

import { TestBed } from '@automock/jest';
import { PrismaService } from '../../prisma/prisma.service';
import { ProfileEntity } from '../profile.entity';
import { ProfileRepository } from '../profile.repository';
import {
  dto,
  profile,
  updateDto,
  updatedProfile,
  userId,
} from './profile.stubs';

describe('Profile Repository', () => {
  let profileRepository: ProfileRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(ProfileRepository)
      .mock(PrismaService)
      .using({
        profile: {
          create: jest.fn().mockResolvedValue(profile),
          update: jest.fn().mockResolvedValue(updatedProfile),
        },
      })
      .compile();

    profileRepository = unit;
    prisma = unitRef.get(PrismaService);
  });

  test('should return new profile', async () => {
    const entity = new ProfileEntity(dto);
    const result = await profileRepository.create(entity);

    expect(prisma.profile.create).toBeCalled();
    expect(result).toEqual(profile);
  });

  test('should return updated profile', async () => {
    const entity = new ProfileEntity({ ...profile, ...updateDto });
    const result = await profileRepository.update(userId, entity);

    expect(prisma.profile.update).toBeCalled();
    expect(result).toEqual(updatedProfile);
    expect(result).not.toEqual(profile);
  });
});

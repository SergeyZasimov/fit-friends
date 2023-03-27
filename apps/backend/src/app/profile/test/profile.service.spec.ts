import { TestBed } from '@automock/jest';
import { BadRequestException } from '@nestjs/common';
import { userStubs } from '../../user/test/user.stub';
import { UserFiles } from '../../user/user.constant';
import { UserRepository } from '../../user/user.repository';
import { ProfileRepository } from '../profile.repository';
import { ProfileService } from '../profile.service';
import { dto, user, userDto } from './profile.stubs';

describe('Profile Service', () => {
  let profileService: ProfileService;
  let profileRepository: jest.Mocked<ProfileRepository>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(ProfileService)
      .mock(UserRepository)
      .using({
        findById: jest.fn().mockResolvedValue(userStubs.user),
      })
      .compile();

    profileService = unit;
    profileRepository = unitRef.get(ProfileRepository);
  });

  test('should call create new profile', async () => {
    await profileService.create(user, userDto);

    expect(profileRepository.create).toBeCalled();
  });

  test('should call update when update profile', async () => {
    await profileService.update(user.id, dto);

    expect(profileRepository.update).toBeCalled();
  });

  test('should throw BadRequestException if customer send certificate', async () => {
    const files: UserFiles = { certificate: [] };
    const result = profileService.update(user.id, dto, files);

    await expect(result).rejects.toThrowError(BadRequestException);
  });
});

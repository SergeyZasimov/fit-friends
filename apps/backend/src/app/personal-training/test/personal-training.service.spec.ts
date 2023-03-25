import { TestBed } from '@automock/jest';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { NotificationService } from '../../notification/notification.service';
import { PersonalTrainingRepository } from '../personal-training.repository';
import { PersonalTrainingService } from '../personal-training.service';
import { personalTrainingStubs } from './personal-training.stubs';

const {
  dto,
  id,
  personalTraining,
  userId,
  updatedPersonalTraining,
  newStatus,
  anotherUserId,
} = personalTrainingStubs;

describe('Personal Training Service', () => {
  let personalTrainingService: PersonalTrainingService;
  let personalTrainingRepository: jest.Mocked<PersonalTrainingRepository>;
  let notificationService: jest.Mocked<NotificationService>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(PersonalTrainingService)
      .mock(PersonalTrainingRepository)
      .using({
        create: jest.fn().mockResolvedValue(personalTraining),
        findOne: jest.fn().mockResolvedValue(personalTraining),
        updateStatus: jest.fn().mockResolvedValue(updatedPersonalTraining),
      })
      .mock(NotificationService)
      .using({
        create: jest.fn().mockResolvedValue({}),
      })
      .compile();

    personalTrainingService = unit;
    personalTrainingRepository = unitRef.get(PersonalTrainingRepository);
    notificationService = unitRef.get(NotificationService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return new personal training record', async () => {
    const result = await personalTrainingService.create(dto, userId);

    expect(personalTrainingRepository.create).toBeCalledWith(dto);
    expect(notificationService.create).toBeCalled();
    expect(result).toEqual(personalTraining);
  });

  test('should throw BadRequestException if the requester and the conductor are the same user', async () => {
    const result = personalTrainingService.create(dto, dto.conductorId);

    await expect(result).rejects.toThrowError(BadRequestException);
  });

  test('should return updated personal training', async () => {
    const updateDto = { status: newStatus, id };
    const result = await personalTrainingService.update(
      updateDto,
      anotherUserId
    );

    expect(personalTrainingRepository.updateStatus).toBeCalledWith(
      updateDto.id,
      updateDto.status
    );
    expect(result).toEqual(updatedPersonalTraining);
  });

  test('should throw ForbiddenException when requester try to update status', async () => {
    const updateDto = { status: newStatus, id };
    const result = personalTrainingService.update(updateDto, userId);

    await expect(result).rejects.toThrowError(ForbiddenException);
  });

  test('should throw NotFoundException when personal training request not exist', async () => {
    jest.spyOn(personalTrainingRepository, 'findOne').mockResolvedValue(null);

    const updateDto = { status: newStatus, id };
    const result = personalTrainingService.update(updateDto, anotherUserId);

    await expect(result).rejects.toThrowError(NotFoundException);
  });

  test('should throw ForbiddenException when user try to update status for foreign personal training request', async () => {
    jest
      .spyOn(personalTrainingRepository, 'findOne')
      .mockResolvedValue({ ...personalTraining, conductorId: 3 });

    const updateDto = { status: newStatus, id };
    const result = personalTrainingService.update(updateDto, anotherUserId);

    await expect(result).rejects.toThrowError(ForbiddenException);
  });

  test('should throw ConflictException when new status and exist status is the same', async () => {
    const updateDto = { status: personalTraining.status, id };
    const result = personalTrainingService.update(updateDto, anotherUserId);

    await expect(result).rejects.toThrowError(ConflictException);
  });
});

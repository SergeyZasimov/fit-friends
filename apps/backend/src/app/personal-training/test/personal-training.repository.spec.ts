import { TestBed } from '@automock/jest';
import { PrismaService } from '../../prisma/prisma.service';
import { PersonalTrainingEntity } from '../personal-training.entity';
import { PersonalTrainingRepository } from '../personal-training.repository';
import { personalTrainingStubs } from './personal-training.stubs';

const { dto, personalTraining, id, updatedPersonalTraining, newStatus } =
  personalTrainingStubs;

describe('Personal Training Repository', () => {
  let personalTrainingRepository: PersonalTrainingRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(PersonalTrainingRepository)
      .mock(PrismaService)
      .using({
        personalTraining: {
          create: jest.fn().mockResolvedValue(personalTraining),
          findUnique: jest.fn().mockResolvedValue(personalTraining),
          update: jest.fn().mockResolvedValue(updatedPersonalTraining),
        },
      })
      .compile();

    personalTrainingRepository = unit;
    prisma = unitRef.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return new personal training record', async () => {
    const entity = new PersonalTrainingEntity(dto);
    const result = await personalTrainingRepository.create(entity);

    expect(prisma.personalTraining.create).toBeCalled();
    expect(result).toEqual(personalTraining);
  });

  test('should update personal training status', async () => {
    const result = await personalTrainingRepository.findOne(id);
    const updatedResult = await personalTrainingRepository.updateStatus(
      id,
      newStatus
    );

    expect(prisma.personalTraining.update).toBeCalled();
    expect(updatedResult).toEqual(updatedPersonalTraining);
    expect(result).not.toEqual(updatedResult);
  });

  test('should return personal training record', async () => {
    const result = await personalTrainingRepository.findOne(id);

    expect(prisma.personalTraining.findUnique).toBeCalled();
    expect(result).toEqual(personalTraining);
  });
});

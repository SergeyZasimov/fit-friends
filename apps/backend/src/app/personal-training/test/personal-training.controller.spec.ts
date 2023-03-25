import { TestBed } from '@automock/jest';
import { TrainingStatus } from '@fit-friends/shared';
import { fillObject } from '../../utils/helpers';
import { PersonalTrainingController } from '../personal-training.controller';
import { PersonalTrainingService } from '../personal-training.service';
import { PersonalTrainingRdo } from '../rdo/personal-training.rdo';
import { personalTrainingStubs } from './personal-training.stubs';

const { dto, userId, personalTraining, updatedPersonalTraining, id } =
  personalTrainingStubs;

describe('Personal Training Controller', () => {
  let personalTrainingController: PersonalTrainingController;
  let personalTrainingService: jest.Mocked<PersonalTrainingService>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(PersonalTrainingController)
      .mock(PersonalTrainingService)
      .using({
        create: jest.fn().mockResolvedValue(personalTraining),
        update: jest.fn().mockResolvedValue(updatedPersonalTraining),
      })
      .compile();

    personalTrainingController = unit;
    personalTrainingService = unitRef.get(PersonalTrainingService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return new personal training record', async () => {
    const result = await personalTrainingController.create(dto, userId);

    expect(personalTrainingService.create).toBeCalledWith(dto, userId);
    expect(result).toEqual(fillObject(PersonalTrainingRdo, personalTraining));
  });

  test('should return updated personal training record', async () => {
    const result = await personalTrainingController.update(
      { status: TrainingStatus.Accept, id },
      userId
    );

    expect(personalTrainingService.update).toBeCalled();
    expect(result).toEqual(
      fillObject(PersonalTrainingRdo, updatedPersonalTraining)
    );
  });
});

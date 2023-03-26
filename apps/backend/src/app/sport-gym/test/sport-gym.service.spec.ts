import { TestBed } from '@automock/jest';
import { QuerySportGymDto } from '../dto/query-sport-gym.dto';
import { SportGymRepository } from '../sport-gym.repository';
import { SportGymService } from '../sport-gym.service';
import { sportGymStubs } from './sport-gym.stubs';

const { dto, id, sportGym } = sportGymStubs;

describe('Sport Gym Service', () => {
  let sportGymService: SportGymService;
  let sportGymRepository: jest.Mocked<SportGymRepository>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(SportGymService)
      .mock(SportGymRepository)
      .using({
        create: jest.fn().mockResolvedValue(sportGym),
        findOne: jest.fn().mockResolvedValue(sportGym),
        findMany: jest.fn().mockResolvedValue([sportGym]),
      })
      .compile();

    sportGymService = unit;
    sportGymRepository = unitRef.get(SportGymRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should be defined', () => {
    expect(sportGymRepository).toBeDefined();
    expect(sportGymService).toBeDefined();
  });

  test('should return new sport gym', async () => {
    jest
      .spyOn(
        SportGymService.prototype as unknown as {
          setPhotos: SportGymService['setPhotos'];
        },
        'setPhotos'
      )
      .mockResolvedValue(['']);

    const result = await sportGymService.create(dto);

    expect(sportGymRepository.create).toBeCalled();
    expect(result).toEqual(sportGym);
  });

  test('should return sport gym', async () => {
    const result = await sportGymService.getOne(id);

    expect(sportGymRepository.findOne).toBeCalledWith(id);
    expect(result).toEqual(sportGym);
  });

  test('should return an array of sport gyms', async () => {
    const query = new QuerySportGymDto();
    const result = await sportGymService.getMany(query);

    expect(sportGymRepository.findMany).toBeCalledWith(query);
    expect(result).toEqual([sportGym]);
  });
});

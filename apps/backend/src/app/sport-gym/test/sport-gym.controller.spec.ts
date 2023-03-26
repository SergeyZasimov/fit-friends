import { TestBed } from '@automock/jest';
import { QuerySportGymDto } from '../dto/query-sport-gym.dto';
import { SportGymController } from '../sport-gym.controller';
import { SportGymService } from '../sport-gym.service';
import { sportGymStubs } from './sport-gym.stubs';

const { sportGym } = sportGymStubs;
describe('Sport Gym Controller', () => {
  let sportGymController: SportGymController;
  let sportGymService: jest.Mocked<SportGymService>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(SportGymController)
      .mock(SportGymService)
      .using({
        getMany: jest.fn().mockResolvedValue([sportGym]),
      })
      .compile();

    sportGymController = unit;
    sportGymService = unitRef.get(SportGymService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should be defined', () => {
    expect(SportGymController).toBeDefined();
    expect(SportGymService).toBeDefined();
  });

  test('should return an array of sport gyms', async () => {
    const query = new QuerySportGymDto();
    const result = await sportGymController.showMany(query);

    expect(sportGymService.getMany).toBeCalledWith(query);
    expect(result).toEqual([sportGym]);
  });
});

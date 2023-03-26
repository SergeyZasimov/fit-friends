import { TestBed } from '@automock/jest';
import { PrismaService } from '../../prisma/prisma.service';
import { QuerySportGymDto } from '../dto/query-sport-gym.dto';
import { SportGymEntity } from '../sport-gym.entity';
import { SportGymRepository } from '../sport-gym.repository';
import { sportGymStubs } from './sport-gym.stubs';

const { dto, id, sportGym } = sportGymStubs;

describe('Sport Gym Repository', () => {
  let sportGymRepository: SportGymRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeAll(() => {
    const { unit, unitRef } = TestBed.create(SportGymRepository)
      .mock(PrismaService)
      .using({
        sportGym: {
          create: jest.fn().mockResolvedValue(sportGym),
          findUnique: jest.fn().mockResolvedValue(sportGym),
          findMany: jest.fn().mockResolvedValue([sportGym]),
        },
      })
      .compile();

    sportGymRepository = unit;
    prisma = unitRef.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should be defined', () => {
    expect(sportGymRepository).toBeDefined();
    expect(prisma).toBeDefined();
  });

  test('should return new sport gym', async () => {
    const entity = new SportGymEntity(dto);
    const result = await sportGymRepository.create(entity);

    expect(prisma.sportGym.create).toBeCalled();
    expect(result).toEqual(sportGym);
  });

  test('should return sport gym', async () => {
    const result = await sportGymRepository.findOne(id);

    expect(prisma.sportGym.findUnique).toBeCalled();
    expect(result).toEqual(sportGym);
  });

  test('should return an array of sport gyms', async () => {
    const query = new QuerySportGymDto();
    const result = await sportGymRepository.findMany(query);

    expect(prisma.sportGym.findMany).toBeCalled();
    expect(result).toEqual([sportGym]);
  });
});

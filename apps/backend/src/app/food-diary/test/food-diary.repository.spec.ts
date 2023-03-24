import { TestBed } from '@automock/jest';
import { PrismaService } from '../../prisma/prisma.service';
import { FoodDiaryEntity } from '../food-diary.entity';
import { FoodDiaryRepository } from '../food-diary.repository';
import { foodDiaryStubs } from './food-diary.stubs';

const { foodDiary, dto, id, userId, updateDto, updatedFoodDiary } =
  foodDiaryStubs;

describe('Food Diary Repository', () => {
  let foodDiaryRepository: FoodDiaryRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(FoodDiaryRepository)
      .mock(PrismaService)
      .using({
        foodDiary: {
          create: jest.fn().mockResolvedValue(foodDiary),
          findUnique: jest.fn().mockResolvedValue(foodDiary),
          findMany: jest.fn().mockResolvedValue([foodDiary]),
          update: jest.fn().mockResolvedValue(updatedFoodDiary),
          delete: jest.fn().mockResolvedValue(foodDiary),
        },
      })
      .compile();

    foodDiaryRepository = unit;
    prisma = unitRef.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should be defined', () => {
    expect(foodDiaryRepository).toBeDefined();
    expect(prisma).toBeDefined();
  });

  test('create should return new food diary record', async () => {
    const entity = new FoodDiaryEntity(dto);
    const result = await foodDiaryRepository.create(entity);
    expect(prisma.foodDiary.create).toBeCalled();
    expect(result).toEqual(foodDiary);
  });

  test('findOne should return food diary record', async () => {
    const result = await foodDiaryRepository.findOne(id);
    expect(prisma.foodDiary.findUnique).toBeCalled();
    expect(result).toEqual(foodDiary);
  });

  test('findMany should return array of food diary records', async () => {
    const result = await foodDiaryRepository.findMany(userId);
    expect(prisma.foodDiary.findMany).toBeCalled();
    expect(result).toEqual([foodDiary]);
  });

  test('update should return updated food diary record', async () => {
    const entity = new FoodDiaryEntity(dto);
    const result = await foodDiaryRepository.create(entity);

    const updatedEntity = new FoodDiaryEntity(updateDto);
    const updatedResult = await foodDiaryRepository.update(
      result.id,
      updatedEntity
    );

    expect(prisma.foodDiary.update).toBeCalled();
    expect(updatedResult).toEqual(updatedFoodDiary);
    expect(updatedResult).not.toEqual(result);
  });

  test('delete should return deleted food diary record', async () => {
    const result = await foodDiaryRepository.delete(id);
    expect(prisma.foodDiary.delete).toBeCalled();
    expect(result).toEqual(foodDiary);
  });
});

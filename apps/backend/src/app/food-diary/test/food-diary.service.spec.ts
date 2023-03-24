import { TestBed } from '@automock/jest';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { FoodDiaryRepository } from '../food-diary.repository';
import { FoodDiaryService } from '../food-diary.service';
import { foodDiaryStubs } from './food-diary.stubs';

const { foodDiary, id, updatedFoodDiary, userId, updateDto, dto } =
  foodDiaryStubs;

describe('Food Diary Service', () => {
  let foodDiaryService: FoodDiaryService;
  let foodDiaryRepository: jest.Mocked<FoodDiaryRepository>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(FoodDiaryService)
      .mock(FoodDiaryRepository)
      .using({
        create: jest.fn().mockResolvedValue(foodDiary),
        findOne: jest.fn().mockResolvedValue(foodDiary),
        findMany: jest.fn().mockResolvedValue([foodDiary]),
        update: jest.fn().mockResolvedValue(updatedFoodDiary),
        delete: jest.fn().mockResolvedValue(foodDiary),
      })
      .compile();
    foodDiaryService = unit;
    foodDiaryRepository = unitRef.get(FoodDiaryRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should be defined', () => {
    expect(foodDiaryService).toBeDefined();
    expect(foodDiaryRepository).toBeDefined();
  });

  test('create should return food diary record', async () => {
    const result = await foodDiaryService.create(userId, dto);
    expect(foodDiaryRepository.create).toBeCalledWith({ userId, ...dto });
    expect(result).toEqual(foodDiary);
  });

  test('getOne should return food diary record', async () => {
    const result = await foodDiaryService.getOne(userId, id);
    expect(foodDiaryRepository.findOne).toBeCalledWith(id);
    expect(result).toEqual(foodDiary);
  });

  test('getOne should throw NotFoundException when there is no food diary record', async () => {
    jest.spyOn(foodDiaryRepository, 'findOne').mockResolvedValue(null);
    await expect(foodDiaryService.getOne(userId, id)).rejects.toThrowError(
      NotFoundException
    );
  });

  test('getOne should return ForbiddenException when userId did not match', async () => {
    const foreignUserId = 2;
    await expect(
      foodDiaryService.getOne(foreignUserId, id)
    ).rejects.toThrowError(ForbiddenException);
  });

  test('getMany should return array of food diary records', async () => {
    const result = await foodDiaryService.getMany(userId);
    expect(foodDiaryRepository.findMany).toBeCalledWith(userId);
    expect(result).toEqual([foodDiary]);
  });

  test('update should return updated food diary record', async () => {
    const result = await foodDiaryService.getOne(userId, id);
    expect(result).toEqual(foodDiary);
    const updatedResult = await foodDiaryService.update(userId, id, updateDto);
    expect(foodDiaryRepository.update).toBeCalledWith(id, {
      userId,
      ...updateDto,
    });
    expect(updatedResult).toEqual(updatedFoodDiary);
    expect(result).not.toEqual(updatedResult);
  });

  test('delete should return deleted food diary record', async () => {
    const result = await foodDiaryService.delete(userId, id);
    expect(foodDiaryRepository.delete).toBeCalledWith(id);
    expect(result).toEqual(foodDiary);
  });
});

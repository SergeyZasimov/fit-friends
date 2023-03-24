import { TestBed } from '@automock/jest';
import { UserRole } from '@fit-friends/shared';
import { fillObject } from '../../utils/helpers';
import { FoodDiaryController } from '../food-diary.controller';
import { FoodDiaryService } from '../food-diary.service';
import { FoodDiaryRdo } from '../rdo/food-diary.rdo';
import { foodDiaryStubs } from './food-diary.stubs';

const { dto, userId, foodDiary, id, updatedFoodDiary, updateDto } =
  foodDiaryStubs;

describe('Food Diary Controller', () => {
  let foodDiaryController: FoodDiaryController;
  let foodDiaryService: jest.Mocked<FoodDiaryService>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(FoodDiaryController)
      .mock(FoodDiaryService)
      .using({
        create: jest.fn().mockResolvedValue(foodDiary),
        getOne: jest.fn().mockResolvedValue(foodDiary),
        getMany: jest.fn().mockResolvedValue([foodDiary]),
        update: jest.fn().mockResolvedValue(updatedFoodDiary),
        delete: jest.fn().mockResolvedValue(foodDiary),
      })
      .compile();
    foodDiaryController = unit;
    foodDiaryService = unitRef.get(FoodDiaryService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should be defined', () => {
    expect(foodDiaryController).toBeDefined();
    expect(foodDiaryService).toBeDefined();
  });

  test('create should return food diary record', async () => {
    const result = await foodDiaryController.create(dto, userId);
    expect(foodDiaryService.create).toBeCalledWith(userId, dto);
    expect(result).toEqual(
      fillObject(FoodDiaryRdo, foodDiary, UserRole.Customer)
    );
  });

  test('showOne should return food diary record', async () => {
    const result = await foodDiaryController.showOne(id, userId);
    expect(foodDiaryService.getOne).toBeCalledWith(userId, id);
    expect(result).toEqual(
      fillObject(FoodDiaryRdo, foodDiary, UserRole.Customer)
    );
  });

  test('showMany should return array of food diaries', async () => {
    const result = await foodDiaryController.showMany(userId);
    expect(foodDiaryService.getMany).toBeCalledWith(userId);
    expect(result).toEqual(
      [foodDiary].map((item) =>
        fillObject(FoodDiaryRdo, item, UserRole.Customer)
      )
    );
  });

  test('update should return updated food diary record', async () => {
    const result = await foodDiaryController.update(updateDto, userId, id);
    expect(foodDiaryService.update).toBeCalledWith(userId, id, updateDto);
    expect(result).toEqual(
      fillObject(FoodDiaryRdo, updatedFoodDiary, UserRole.Customer)
    );
  });

  test('delete should return deleted food diary record', async () => {
    const result = await foodDiaryController.delete(userId, id);
    expect(foodDiaryService.delete).toBeCalledWith(userId, id);
    expect(result).toEqual(
      fillObject(FoodDiaryRdo, foodDiary, UserRole.Customer)
    );
  });
});

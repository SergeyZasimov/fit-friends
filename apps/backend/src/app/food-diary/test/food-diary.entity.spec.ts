import { FoodDiaryEntity } from '../food-diary.entity';
import { foodDiaryStubs } from './food-diary.stubs';

const { dto } = foodDiaryStubs;

describe('Food Diary Entity', () => {
  test('should return FoodDiaryEntity', () => {
    const entity = new FoodDiaryEntity(dto);
    expect(entity).toBeInstanceOf(FoodDiaryEntity);
    expect(entity.dateOfMeal).toMatchObject(dto.dateOfMeal);
  });
});

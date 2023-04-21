import { FoodDiary } from '@fit-friends/shared';
import { Expose } from 'class-transformer';

export class FoodDiaryRdo implements FoodDiary {
  @Expose()
  id: number;

  @Expose()
  caloriesAmount: number;

  @Expose()
  dateOfMeal: Date;

  @Expose()
  typeOfMeal: string;
}

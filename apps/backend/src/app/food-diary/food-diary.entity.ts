import { FoodDiary } from '@fit-friends/shared';

export class FoodDiaryEntity implements FoodDiary {
  userId: number;
  caloriesAmount: number;
  dateOfMeal: Date;
  typeOfMeal: string;

  constructor(foodDiary: FoodDiary) {
    this.userId = foodDiary.userId;
    this.caloriesAmount = foodDiary.caloriesAmount;
    this.dateOfMeal = new Date(foodDiary.dateOfMeal);
    this.typeOfMeal = foodDiary.typeOfMeal;
  }
}

import { FoodDiary, User } from '@fit-friends/shared';
import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/rdo/user.rdo';

export class FoodDiaryRdo implements FoodDiary {
  @Expose()
  id: number;

  @Type(() => UserRdo)
  @Expose()
  user: User;

  @Expose()
  caloriesAmount: number;

  @Expose()
  dateOfMeal: Date;

  @Expose()
  typeOfMeal: string;
}

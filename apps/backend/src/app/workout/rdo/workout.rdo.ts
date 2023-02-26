import { User, Workout } from '@fit-friends/shared';
import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/rdo/user.rdo';

export class WorkoutRdo implements Workout {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  backgroundImage: string;

  @Expose()
  customerLevel: string;

  @Expose()
  trainingType: string;

  @Expose()
  trainingTime: string;

  @Expose()
  price: number;

  @Expose()
  caloriesAmountToLose: number;

  @Expose()
  description: string;

  @Expose()
  favorGender: string;

  @Expose()
  video: string;

  @Expose()
  rating: number;

  @Expose()
  @Type(() => UserRdo)
  trainer: User;

  @Expose()
  isSpecial: boolean;
}

import { Order, OrderType, SportGym, User, Workout } from '@fit-friends/shared';
import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/rdo/user.rdo';
import { WorkoutRdo } from '../../workout/rdo/workout.rdo';

export class OrderRdo implements Order {
  @Expose()
  id: number;

  @Expose()
  @Type(() => UserRdo)
  user: User;

  @Expose()
  orderType: string;

  @Expose({ groups: [OrderType.Workout] })
  @Type(() => WorkoutRdo)
  workout: Workout;

  @Expose({ groups: [OrderType.SportGym] })
  sportGym: SportGym;

  @Expose()
  price: number;

  @Expose()
  amount: number;

  @Expose()
  totalCost: number;

  @Expose()
  paymentMethod: string;
}

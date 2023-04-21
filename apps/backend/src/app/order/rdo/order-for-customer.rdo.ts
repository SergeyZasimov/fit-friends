import { Order, OrderType, SportGym, Workout } from '@fit-friends/shared';
import { Expose, Type } from 'class-transformer';
import { WorkoutRdo } from '../../workout/rdo/workout.rdo';

export class OrderForCustomerRdo implements Partial<Order> {
  @Expose()
  id: number;

  @Expose()
  orderType: string;

  @Type(() => WorkoutRdo)
  @Expose({ groups: [OrderType.Workout] })
  workout: Workout;

  @Expose({ groups: [OrderType.SportGym] })
  sportGym: SportGym;
}

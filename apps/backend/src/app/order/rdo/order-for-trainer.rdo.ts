import { OrderForTrainer, Workout } from '@fit-friends/shared';
import { Expose, Type } from 'class-transformer';
import { WorkoutRdo } from '../../workout/rdo/workout.rdo';

export class OrderForTrainerRdo implements OrderForTrainer {
  @Type(() => WorkoutRdo)
  @Expose()
  workout: Workout;

  @Expose()
  count: number;

  @Expose()
  totalPrice: number;
}

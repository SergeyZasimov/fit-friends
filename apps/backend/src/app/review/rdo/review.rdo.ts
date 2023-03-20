import { Review, User, Workout } from '@fit-friends/shared';
import { Expose, Transform } from 'class-transformer';
import { UserRdo } from '../../user/rdo/user.rdo';

export class ReviewRdo implements Review {
  @Expose()
  id: number;

  @Transform(() => UserRdo)
  @Expose()
  user: User;

  @Expose()
  workout: Workout;

  @Expose()
  rating: number;

  @Expose()
  text: string;

  @Expose()
  createdAt: Date;
}

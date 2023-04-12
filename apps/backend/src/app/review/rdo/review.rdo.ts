import { Review, User } from '@fit-friends/shared';
import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/rdo/user.rdo';

export class ReviewRdo implements Review {
  @Expose()
  id: number;

  @Type(() => UserRdo)
  @Expose()
  user: User;

  @Expose()
  rating: number;

  @Expose()
  text: string;

  @Expose()
  createdAt: Date;
}

import { Profile, User } from '@fit-friends/shared';
import { Expose, Type } from 'class-transformer';
import { ProfileRdo } from '../../profile/rdo/profile.rdo';

export class UserRdo implements User {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  role: string;

  @Type(() => ProfileRdo)
  @Expose()
  profile: Profile;
}

import { User } from '@fit-friends/shared';
import { Expose } from 'class-transformer';

export class RegisteredUserRdo implements User {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  role: string;
}

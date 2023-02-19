import { User } from '@fit-friends/shared';
import bcrypt from 'bcryptjs';
import { SAULT_ROUNDS } from './user.constant';

export class UserEntity implements User {
  email: string;
  passwordHash: string;
  role: string;

  constructor(user: User) {
    this.email = user.email;
    this.role = user.role;
    this.passwordHash = user.passwordHash ?? '';
  }

  async setPassword(password: string): Promise<UserEntity> {
    this.passwordHash = await bcrypt.hash(password, SAULT_ROUNDS);
    return this;
  }

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.passwordHash);
  }
}

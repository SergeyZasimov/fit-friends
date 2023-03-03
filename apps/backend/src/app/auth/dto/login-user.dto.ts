import { LoginUser } from '@fit-friends/shared';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import {
  USER_CONSTRAINT,
  UserValidationMessage,
} from '../../user/user.constant';

const {
  EmailNotValid,
  EmailRequired,
  PasswordLengthNotValid,
  PasswordRequired,
} = UserValidationMessage;

export class LoginUserDto implements LoginUser {
  @IsEmail({}, { message: EmailNotValid })
  @IsNotEmpty({ message: EmailRequired })
  email: string;

  @Length(USER_CONSTRAINT.PASSWORD.MIN, USER_CONSTRAINT.PASSWORD.MAX, {
    message: PasswordLengthNotValid,
  })
  @IsNotEmpty({ message: PasswordRequired })
  password: string;
}

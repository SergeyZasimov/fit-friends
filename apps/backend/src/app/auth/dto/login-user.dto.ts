import { LoginUser } from '@fit-friends/shared';
import { IsEmail, IsNotEmpty, Length } from 'class-validator';
import {
  UserConstraint,
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

  @Length(UserConstraint.Password.Min, UserConstraint.Password.Max, {
    message: PasswordLengthNotValid,
  })
  @IsNotEmpty({ message: PasswordRequired })
  password: string;
}

import { Gender, Locations, RegisterUser, UserRole } from '@fit-friends/shared';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  Length,
  Matches,
  Validate,
} from 'class-validator';
import {
  USER_CONSTRAINT,
  UserValidationMessage,
} from '../../user/user.constant';
import { BirthdayValidator } from '../../validators/birthday.validator';

const {
  EmailNotValid,
  EmailRequired,
  PasswordLengthNotValid,
  PasswordRequired,
  RoleNotValid,
  RoleRequired,
  NameLengthNotValid,
  NameRequired,
  NameNotValid,
  GenderNotValid,
  GenderRequired,
  LocationNotValid,
  LocationRequired,
  BirthdayNotValid,
} = UserValidationMessage;

export class RegisterUserDto implements RegisterUser {
  @IsEmail({}, { message: EmailNotValid })
  @IsNotEmpty({ message: EmailRequired })
  email: string;

  @Length(USER_CONSTRAINT.PASSWORD.MIN, USER_CONSTRAINT.PASSWORD.MAX, {
    message: PasswordLengthNotValid,
  })
  @IsNotEmpty({ message: PasswordRequired })
  password: string;

  @IsEnum(UserRole, { message: RoleNotValid })
  @IsNotEmpty({ message: RoleRequired })
  role: string;

  @Matches(/^[a-zA-Zа-яА-ЯЁё]+$/, { message: NameNotValid })
  @Length(USER_CONSTRAINT.NAME.MIN, USER_CONSTRAINT.NAME.MAX, {
    message: NameLengthNotValid,
  })
  @IsNotEmpty({ message: NameRequired })
  name: string;

  @IsEnum(Gender, { message: GenderNotValid })
  @IsNotEmpty({ message: GenderRequired })
  gender: string;

  @Validate(BirthdayValidator, {
    message: BirthdayNotValid,
  })
  @IsOptional()
  birthDay: string;

  @IsEnum(Locations, { message: LocationNotValid })
  @IsNotEmpty({ message: LocationRequired })
  location: string;
}

import {
  Gender,
  TrainingLevels,
  TrainingTimes,
  TrainingTypes,
  UserRole,
} from '@fit-friends/shared';
import { formatEnumToValidationMessage } from '../utils/helpers';

export const SAULT_ROUNDS = 10;

export const USER_CONSTRAINT = {
  NAME: {
    MIN: 1,
    MAX: 15,
  },
  PASSWORD: {
    MIN: 6,
    MAX: 12,
  },
  CALORIES_AMOUNT: {
    MIN: 1000,
    MAX: 5000,
  },
  RESUME: {
    MIN: 10,
    MAX: 140,
  },
  TRAINING_TYPE: {
    MAX: 3,
  },
  AVATAR_TYPE: /(jpg|jpeg|png)$/,
  CERTIFICATE_TYPE: /(jpg|jpeg|png)$/,
  FILE_SIZE: 1_000_000,
} as const;

export const UserValidationMessage = {
  UserIdRequired: '$property: Необходим ID пользователя',
  EmailRequired: '$property: Почта - обязательно для заполнения',
  EmailNotValid: '$property: Неверный формат почты',
  PasswordRequired: '$property:Пароль - обязательно для заполнения',
  PasswordLengthNotValid: `$property:Пароль должен быть строкой длиной от ${USER_CONSTRAINT.PASSWORD.MIN} до ${USER_CONSTRAINT.PASSWORD.MAX} символов`,
  RoleRequired: '$property:Роль - обязательно для заполнения',
  RoleNotValid: `$property:Роль должна быть одним из значений - ${formatEnumToValidationMessage(
    UserRole
  )}`,
  NameRequired: '$property:Имя - обязательно для заполнения',
  NameLengthNotValid: `$property:Имя должно быть строкой длиной от ${USER_CONSTRAINT.NAME.MIN} до ${USER_CONSTRAINT.NAME.MAX} символов`,
  NameNotValid:
    '$property:Имя должно состоять только из букв русского или английского алфавита',
  GenderRequired: '$property:Пол - обязательно для заполнения',
  GenderNotValid: `$property:Пол должен быть одним из значений - ${formatEnumToValidationMessage(
    Gender
  )}`,
  LocationRequired: '$property:Локация - обязательно для заполнения',
  LocationNotValid:
    '$property:Локация должна быть одним из предложенных значений',
  TrainingLevelRequired:
    '$property:Уровень подготовки - обязательно для заполнения',
  TrainingLevelNotValid: `$property:Уровень подготовки должен быть один из значений - ${formatEnumToValidationMessage(
    TrainingLevels
  )}`,
  TrainingTypeRequired: '$property:Тип тренировки - обязательно для заполнения',
  TrainingTypeArrayNotValid: `$property:Тип тренировки  - возможно выбрать на более ${USER_CONSTRAINT.TRAINING_TYPE.MAX} значений`,
  TrainingTypeNotValid: `$property:Допустимые значения типов тренировок - ${formatEnumToValidationMessage(
    TrainingTypes
  )}`,
  TrainingTimeRequired:
    '$property:Время на тренировку - обязательно для заполнения',
  TrainingTimeNotValid: `$property: Допустимые значения времени на тренировку - ${formatEnumToValidationMessage(
    TrainingTimes
  )}`,
  CaloriesAmountToLoseRequired:
    '$property: Количество калорий для сброса - обязательно для заполнения',
  CaloriesAmountToLoseNotValid: `$property:Количество калорий для сброса должно быть числом от ${USER_CONSTRAINT.CALORIES_AMOUNT.MIN} до ${USER_CONSTRAINT.CALORIES_AMOUNT.MAX}`,
  CaloriesAmountToLosePerDayRequired:
    '$property:Количество калорий для траты в день - обязательно для заполнения',
  CaloriesAmountToLosePerDayNotValid: `$property:Количество калорий для траты в день должно быть числом от ${USER_CONSTRAINT.CALORIES_AMOUNT.MIN} до ${USER_CONSTRAINT.CALORIES_AMOUNT.MAX}`,
  ResumeNotValid: `$property:Заслуги тренера должны быть текстом с количеством символов от ${USER_CONSTRAINT.RESUME.MIN} до ${USER_CONSTRAINT.RESUME.MAX}`,
  IsReadyToTraining:
    '$property:Готовность к тренировке - обязательно для заполнения',
  IsReadyToPersonalTraining:
    '$property:Готовность проводить персональные тренировки - обязательно для заполнения',
  BirthdayNotValid: '$property:Неверная дата рождения',
  AvatarNotValid: 'Аватар должен быть в формате jpg или png',
  CertificateNotValid: 'Сертификат должен быть в формате pdf',
  AvatarRequired: 'Добавьте аватар',
  CertificateRequired: 'Добавьте сертификат',
  FileTooLarge: `Файл превышает ${USER_CONSTRAINT.FILE_SIZE}`,
  CustomerNotUploadCertificate: 'Пользователь не может загружать сертификаты',
} as const;

export const CurrentUserField = {
  Id: 'id',
  Email: 'email',
  Role: 'role',
} as const;

export type UserFiles = {
  avatar?: Express.Multer.File[];
  certificate?: Express.Multer.File[];
};

import {
  Gender,
  Locations,
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
  AVATAR_SIZE: 1_000_000,
} as const;

export const UserValidationMessage = {
  EmailRequired: 'Почта - обязательно для заполнения',
  EmailNotValid: 'Неверный формат почты',
  PasswordRequired: 'Пароль - обязательно для заполнения',
  PasswordLengthNotValid: `Пароль должен быть строкой длиной от ${USER_CONSTRAINT.PASSWORD.MIN} до ${USER_CONSTRAINT.PASSWORD.MAX} символов`,
  RoleRequired: 'Роль - обязательно для заполнения',
  RoleNotValid: `Роль должна быть одним из значений: ${formatEnumToValidationMessage(
    UserRole
  )}`,
  NameRequired: 'Имя - обязательно для заполнения',
  NameLengthNotValid: `Имя должно быть строкой длиной от ${USER_CONSTRAINT.NAME.MIN} до ${USER_CONSTRAINT.NAME.MAX} символов`,
  NameNotValid:
    'Имя должно состоять только из букв русского или английского алфавита',
  GenderRequired: 'Пол - обязательно для заполнения',
  GenderNotValid: `Пол должен быть одним из значений: ${formatEnumToValidationMessage(
    Gender
  )}`,
  LocationRequired: 'Локация - обязательно для заполнения',
  LocationNotValid: `Локация должна быть одним из значений: ${formatEnumToValidationMessage(
    Locations
  )}`,
  TrainingLevelRequired: 'Уровень подготовки - обязательно для заполнения',
  TrainingLevelNotValid: `Уровень подготовки должен быть один из значений: ${formatEnumToValidationMessage(
    TrainingLevels
  )}`,
  TrainingTypeRequired: 'Тип тренировки - обязательно для заполнения',
  TrainingTypeArrayNotValid: `Тип тренировки  - возможно выбрать на более ${USER_CONSTRAINT.TRAINING_TYPE.MAX} значений`,
  TrainingTypeNotValid: `Допустимые значения типов тренировок: ${formatEnumToValidationMessage(
    TrainingTypes
  )}`,
  TrainingTimeRequired: 'Время на тренировку - обязательно для заполнения',
  TrainingTimeNotValid: `Допустимые значения времени на тренировку: ${formatEnumToValidationMessage(
    TrainingTimes
  )}`,
  CaloriesAmountToLoseRequired:
    'Количество калорий для сброса - обязательно для заполнения',
  CaloriesAmountToLoseNotValid: `Количество калорий для сброса должно быть числом от ${USER_CONSTRAINT.CALORIES_AMOUNT.MIN} до ${USER_CONSTRAINT.CALORIES_AMOUNT.MAX}`,
  CaloriesAmountToLosePerDayRequired:
    'Количество калорий для траты в день - обязательно для заполнения',
  CaloriesAmountToLosePerDayNotValid: `Количество калорий для траты в день должно быть числом от ${USER_CONSTRAINT.CALORIES_AMOUNT.MIN} до ${USER_CONSTRAINT.CALORIES_AMOUNT.MAX}`,
  ResumeNotValid: `Заслуги тренера должны быть текстом с количеством символов от ${USER_CONSTRAINT.RESUME.MIN} до ${USER_CONSTRAINT.RESUME.MAX}`,
  IsReadyToTraining: 'Готовность к тренировке - обязательно для заполнения',
  IsReadyToPersonalTraining:
    'Готовность проводить персональные тренировки - обязательно для заполнения',
  BirthdayNotValid: 'Неверная дата рождения',
  AvatarNotValid: 'Аватар должен быть в формате jpg или png',
} as const;

export const CurrentUserField = {
  Id: 'id',
  Email: 'email',
  Role: 'role',
} as const;

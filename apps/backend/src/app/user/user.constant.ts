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

export const UserConstraint = {
  Name: {
    Min: 1,
    Max: 15,
  },
  Password: {
    Min: 6,
    Max: 12,
  },
  CaloriesAmount: {
    Min: 1000,
    Max: 5000,
  },
  Resume: {
    Min: 10,
    Max: 140,
  },
  TrainingType: {
    Max: 3,
  },
  AvatarType: /(jpg|jpeg|png)$/,
  AvatarSize: 1_000_000,
} as const;

export const UserValidationMessage = {
  EmailRequired: 'Почта - обязательно для заполнения',
  EmailNotValid: 'Неверный формат почты',
  PasswordRequired: 'Пароль - обязательно для заполнения',
  PasswordLengthNotValid: `Пароль должен быть строкой длиной от ${UserConstraint.Password.Min} до ${UserConstraint.Password.Max} символов`,
  RoleRequired: 'Роль - обязательно для заполнения',
  RoleNotValid: `Роль должна быть одним из значений: ${formatEnumToValidationMessage(
    UserRole
  )}`,
  NameRequired: 'Имя - обязательно для заполнения',
  NameLengthNotValid: `Имя должно быть строкой длиной от ${UserConstraint.Name.Min} до ${UserConstraint.Name.Max} символов`,
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
  TrainingTypeArrayNotValid: `Тип тренировки  - возможно выбрать на более ${UserConstraint.TrainingType.Max} значений`,
  TrainingTypeNotValid: `Допустимые значения типов тренировок: ${formatEnumToValidationMessage(
    TrainingTypes
  )}`,
  TrainingTimeRequired: 'Время на тренировку - обязательно для заполнения',
  TrainingTimeNotValid: `Допустимые значения времени на тренировку: ${formatEnumToValidationMessage(
    TrainingTimes
  )}`,
  CaloriesAmountToLoseRequired:
    'Количество калорий для сброса - обязательно для заполнения',
  CaloriesAmountToLoseNotValid: `Количество калорий для сброса должно быть числом от ${UserConstraint.CaloriesAmount.Min} до ${UserConstraint.CaloriesAmount.Max}`,
  CaloriesAmountToLosePerDayRequired:
    'Количество калорий для траты в день - обязательно для заполнения',
  CaloriesAmountToLosePerDayNotValid: `Количество калорий для траты в день должно быть числом от ${UserConstraint.CaloriesAmount.Min} до ${UserConstraint.CaloriesAmount.Max}`,
  ResumeNotValid: `Заслуги тренера должны быть текстом с количеством символов от ${UserConstraint.Resume.Min} до ${UserConstraint.Resume.Max}`,
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
};

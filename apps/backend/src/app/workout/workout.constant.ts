import {
  FavorGenders,
  TrainingLevels,
  TrainingTimes,
  TrainingTypes,
} from '@fit-friends/shared';
import { formatEnumToValidationMessage } from '../utils/helpers';

export const WORKOUT_BACKGROUNDS_FOLDER = 'workout-backgrounds';

export const WORKOUT_CONSTRAINT = {
  TITLE: {
    MIN: 1,
    MAX: 15,
  },
  PRICE: {
    MIN: 0,
  },
  CALORIES_AMOUNT: {
    MIN: 1000,
    MAX: 5000,
  },
  DESCRIPTION: {
    MIN: 10,
    MAX: 140,
  },
  VIDEO_TYPE: /(mov|avi|mp4)$/,
};

export const WorkoutValidationMessage = {
  TitleNotValid: `Название тренировки должно быть строкой длиной от ${WORKOUT_CONSTRAINT.TITLE.MIN} до ${WORKOUT_CONSTRAINT.TITLE.MAX} символов`,
  CustomerLevelNotValid: `Уровень клиента должен быть одним из значений: ${formatEnumToValidationMessage(
    TrainingLevels
  )}`,
  TrainingTypeNotValid: `Тип тренировки должен быть одним из значений: ${formatEnumToValidationMessage(
    TrainingTypes
  )}`,
  TrainingTimeNotValid: `Длительность тренировки должна быть одной из значений: ${formatEnumToValidationMessage(
    TrainingTimes
  )}`,
  PriceNotValid: 'Цена должна быть целым числом',
  MinPriceNotValid: `Минимальная цена должна быть ${WORKOUT_CONSTRAINT.PRICE.MIN}`,
  CaloriesAmountNotValid: 'Количество калорий должно целым числом',
  CaloriesAmountRangeNotValid: `Количество калорий должно быть в диапазоне от ${WORKOUT_CONSTRAINT.CALORIES_AMOUNT.MIN} до ${WORKOUT_CONSTRAINT.CALORIES_AMOUNT.MAX}`,
  FavorGenderNotValid: `Предпочтительный пол клиента должен быть одним из значений: ${formatEnumToValidationMessage(
    FavorGenders
  )}`,
  VideoRequired: 'Видео обязательно для заполнения',
  VideoNotValid: 'Видео должно быть в формате mov, avi, mp4',
  IsSpecialNovValid: 'Неверный формат флага специального предложения',
  DescriptionNotValid: `Описание должно быть строкой длиной от ${WORKOUT_CONSTRAINT.DESCRIPTION.MIN} до ${WORKOUT_CONSTRAINT.DESCRIPTION.MAX} символов`,
};

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
  VIDEO_TYPE: /(mov|avi|mp4|quicktime)$/,
  RATING: {
    MIN: 1,
    MAX: 5,
  },
} as const;

export const WorkoutValidationMessage = {
  TitleNotValid: `$property: Название тренировки должно быть строкой длиной от ${WORKOUT_CONSTRAINT.TITLE.MIN} до ${WORKOUT_CONSTRAINT.TITLE.MAX} символов`,
  CustomerLevelNotValid: `$property: Уровень клиента должен быть одним из значений - ${formatEnumToValidationMessage(
    TrainingLevels
  )}`,
  TrainingTypeNotValid: `$property: Тип тренировки должен быть одним из значений - ${formatEnumToValidationMessage(
    TrainingTypes
  )}`,
  TrainingTimeNotValid: `$property: Длительность тренировки должна быть из предопределённых диапазонов - ${formatEnumToValidationMessage(
    TrainingTimes
  )}`,
  PriceNotValid: '$property: Цена должна быть целым числом',
  MinPriceNotValid: `$property: Минимальная цена должна быть ${WORKOUT_CONSTRAINT.PRICE.MIN}`,
  CaloriesAmountNotValid: '$property: Количество калорий должно целым числом',
  CaloriesAmountRangeNotValid: `$property: Количество калорий должно быть в диапазоне от ${WORKOUT_CONSTRAINT.CALORIES_AMOUNT.MIN} до ${WORKOUT_CONSTRAINT.CALORIES_AMOUNT.MAX}`,
  FavorGenderNotValid: `$property: Предпочтительный пол клиента должен быть одним из значений - ${formatEnumToValidationMessage(
    FavorGenders
  )}`,
  VideoRequired: 'Видео обязательно для заполнения',
  VideoNotValid: 'Видео должно быть в формате mov, avi, mp4',
  IsSpecialNovValid:
    '$property: Неверный формат флага специального предложения',
  DescriptionNotValid: `$property: Описание должно быть строкой длиной от ${WORKOUT_CONSTRAINT.DESCRIPTION.MIN} до ${WORKOUT_CONSTRAINT.DESCRIPTION.MAX} символов`,
  RatingNotValid: `$property: Рейтинг должен быть целым числом между ${WORKOUT_CONSTRAINT.RATING.MIN} и ${WORKOUT_CONSTRAINT.RATING.MAX}`,
} as const;

export const WorkoutExceptionMessage = {
  NotFound: 'Тренировка не найдена',
  ForeignWorkout: 'Нельзя редактировать чужую тренировку',
} as const;

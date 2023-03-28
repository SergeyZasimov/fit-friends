import { TrainingTimes } from '@fit-friends/shared';
import { formatEnumToValidationMessage } from '../utils/helpers';

export const WorkoutDiaryValidationMessage = {
  WorkoutIdNotValid: 'Неверное ID тренировки',
  LostCaloriesAmountNotValid:
    'Количество потраченных калорий должно быть целым числом',
  LostTrainingTimeNotValid: `Время, затраченное на тренировку должно быть одним из значений: ${formatEnumToValidationMessage(
    TrainingTimes
  )}`,
} as const;

import { TrainingStatus } from '@fit-friends/shared';
import { formatEnumToValidationMessage } from '../utils/helpers';

export const PersonalTrainingValidationMessage = {
  IdNotValid: 'Неверный ID заявки на персональную тренировку',
  ConductorIdNotValid: 'Неверный ID исполнителя тренировки',
  StatusNotValid: `Статус тренировки должен быть одним из значений: ${formatEnumToValidationMessage(
    TrainingStatus
  )}`,
};

export const PersonalTrainingExceptionMessage = {
  NotFound: 'Заявка на персональную тренировку не найдена',
  Conflict: 'Неверное действие. Статус уже установлен',
  ForeignPersonalTraining: 'Нельзя изменять статус чужой заявки',
  OwnPersonalTraining: 'Изменить статус тренировки должен исполнитель',
  ConductorError: 'Инициатор и исполнитель не может быть одним пользователем',
};

export const createPersonalTrainingNotification = (name: string) =>
  `Пользователь ${name} сделал заявку на персональную тренировку с вами`;

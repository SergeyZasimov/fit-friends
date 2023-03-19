import { SortOption, SortType } from '@fit-friends/shared';
import { formatEnumToValidationMessage } from '../utils/helpers';

export const DEFAULT_PROFILE_QUERY = {
  LIMIT: 50,
  PAGE: 1,
  SORT_TYPE: SortType.Desc,
  SORT_OPTION: SortOption.CreatedAt,
};

export const ProfileQueryValidationMessage = {
  LimitNotValid: `Количество элементов должно быть целым числом не более ${DEFAULT_PROFILE_QUERY.LIMIT}`,
  PageNotValid: 'Страница пагинации должна быть целым числом',
  SortTypeNotValid: `Направление сортировки должно быть одним из значений: ${formatEnumToValidationMessage(
    SortType
  )}`,
  SortOptionNotValid: `Вариант сортировки должен быть одним из значений: ${formatEnumToValidationMessage(
    SortOption
  )}`,
};

export const createFriendNotification = (name: string) =>
  `Пользователь ${name} добавил вас в друзья`;

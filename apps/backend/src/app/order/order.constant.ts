import { OrderType, PaymentMethods, SortOption } from '@fit-friends/shared';
import { formatEnumToValidationMessage } from '../utils/helpers';

export const MIN_AMOUNT_VALUE = 1;

export const DEFAULT_TRAINER_ORDERS_SORTING_OPTION = SortOption.Price;

export const OrderValidationMessage = {
  OrderTypeNotValid: `$property: Тип заказа должен быть одним из значений - ${formatEnumToValidationMessage(
    OrderType
  )}`,
  AmountNotValid:
    '$property: Количество должно быть целым положительным числом',
  PaymentMethodNotValid: `$property: Метод платежа должен быть одним из значений - ${formatEnumToValidationMessage(
    PaymentMethods
  )}`,
  PurchaseIdNotValid: 'Неверный ID услуги',
};

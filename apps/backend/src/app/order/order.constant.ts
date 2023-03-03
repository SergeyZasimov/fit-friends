import { OrderType, PaymentMethods, SortOption } from '@fit-friends/shared';
import { formatEnumToValidationMessage } from '../utils/helpers';

export const MIN_VALUE = 0;

export const DEFAULT_TRAINER_ORDERS_SORTING_OPTION = SortOption.Price;

export const OrderValidationMessage = {
  OrderTypeNotValid: `Тип заказа должен быть одним из значений: ${formatEnumToValidationMessage(
    OrderType
  )}`,
  PriceNotValid: 'Цена должна быть целым положительным числом',
  AmountNotValid: 'Количество должно быть целым положительным числом',
  PaymentMethodNotValid: `Метод платежа должен быть одним из значений: ${formatEnumToValidationMessage(
    PaymentMethods
  )}`,
  PurchaseIdNotValid: 'ID услуги должен быть целым положительным числом',
};

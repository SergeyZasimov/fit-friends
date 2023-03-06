import { CreateOrder, OrderType, PaymentMethods } from '@fit-friends/shared';
import { IsEnum, IsInt, Min } from 'class-validator';
import { MIN_AMOUNT_VALUE, OrderValidationMessage } from '../order.constant';

const {
  AmountNotValid,
  OrderTypeNotValid,
  PaymentMethodNotValid,
  PurchaseIdNotValid,
} = OrderValidationMessage;

export class CreateOrderDto implements CreateOrder {
  @IsEnum(OrderType, { message: OrderTypeNotValid })
  orderType: string;

  @Min(MIN_AMOUNT_VALUE, { message: AmountNotValid })
  amount: number;

  @IsEnum(PaymentMethods, { message: PaymentMethodNotValid })
  paymentMethod: string;

  @IsInt({ message: PurchaseIdNotValid })
  purchaseId: number;
}

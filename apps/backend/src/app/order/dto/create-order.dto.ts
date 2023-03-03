import { CreateOrder, OrderType, PaymentMethods } from '@fit-friends/shared';
import { IsEnum, Min } from 'class-validator';
import { MIN_VALUE, OrderValidationMessage } from '../order.constant';

const {
  AmountNotValid,
  OrderTypeNotValid,
  PaymentMethodNotValid,
  PriceNotValid,
  PurchaseIdNotValid,
} = OrderValidationMessage;

export class CreateOrderDto implements CreateOrder {
  @IsEnum(OrderType, { message: OrderTypeNotValid })
  orderType: string;

  @Min(MIN_VALUE, { message: PriceNotValid })
  price: number;

  @Min(MIN_VALUE, { message: AmountNotValid })
  amount: number;

  @IsEnum(PaymentMethods, { message: PaymentMethodNotValid })
  paymentMethod: string;

  @Min(MIN_VALUE, { message: PurchaseIdNotValid })
  purchaseId: number;
}

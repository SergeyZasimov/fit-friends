import { faker } from '@faker-js/faker';
import { OrderType, PaymentMethods, Workout } from '@fit-friends/shared';
import { CreateOrderDto } from '../../order/dto/create-order.dto';
import { MOCKS_DEFAULT } from '../cli.constant';

export const createWorkoutOrders = (workout: Workout): CreateOrderDto => ({
  amount: faker.datatype.number({ max: MOCKS_DEFAULT.ORDER.AMOUNT.MAX }),
  orderType: OrderType.Workout,
  paymentMethod: faker.helpers.arrayElement(PaymentMethods),
  purchaseId: workout.id,
});

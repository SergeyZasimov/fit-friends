import { faker } from '@faker-js/faker';
import {
  OrderType,
  PaymentMethods,
  SportGym,
  Workout,
} from '@fit-friends/shared';
import { CreateOrderDto } from '../../order/dto/create-order.dto';
import { MOCKS_DEFAULT } from '../cli.constant';

export const createWorkoutOrder = (workout: Workout): CreateOrderDto => ({
  amount: faker.datatype.number({ max: MOCKS_DEFAULT.ORDER.AMOUNT.MAX }),
  orderType: OrderType.Workout,
  paymentMethod: faker.helpers.arrayElement(PaymentMethods),
  purchaseId: workout.id,
});

export const createSportGymOrder = (sportGym: SportGym): CreateOrderDto => ({
  amount: faker.datatype.number({ max: MOCKS_DEFAULT.ORDER.AMOUNT.MAX }),
  orderType: OrderType.SportGym,
  paymentMethod: faker.helpers.arrayElement(PaymentMethods),
  purchaseId: sportGym.id,
});

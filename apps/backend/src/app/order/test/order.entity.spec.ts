import { OrderEntity } from '../order.entity';
import { orderStubs } from './order.stubs';

const { workoutOrderDto, workout } = orderStubs;

describe('Order Entity', () => {
  test('should return new order entity', () => {
    const entity = new OrderEntity({
      ...workoutOrderDto,
      price: workout.price,
    });

    expect(entity).toBeInstanceOf(OrderEntity);
    expect(entity.paymentMethod).toEqual(workoutOrderDto.paymentMethod);
  });

  test('should return total cost', () => {
    const amount = 2;
    const price = 3;

    const entity = new OrderEntity({ ...workoutOrderDto, amount, price });
    expect(entity.totalCost).toEqual(amount * price);
  });
});

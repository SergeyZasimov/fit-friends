import { TestBed } from '@automock/jest';
import { fillObject } from '../../utils/helpers';
import { OrderController } from '../order.controller';
import { OrderService } from '../order.service';
import { OrderRdo } from '../rdo/order.rdo';
import { orderStubs } from './order.stubs';

const { workoutOrderDto, workoutOrder, userId } = orderStubs;

describe('Order Controller', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(OrderController)
      .mock(OrderService)
      .using({
        create: jest.fn().mockResolvedValue(workoutOrder),
      })
      .compile();

    orderController = unit;
    orderService = unitRef.get(OrderService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return new order', async () => {
    const result = await orderController.create(workoutOrderDto, userId);

    expect(orderService.create).toBeCalled();
    expect(result).toEqual(
      fillObject(OrderRdo, workoutOrder, workoutOrder.orderType)
    );
  });
});

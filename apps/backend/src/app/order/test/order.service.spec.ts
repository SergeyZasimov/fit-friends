import { TestBed } from '@automock/jest';
import { WorkoutService } from '../../workout/workout.service';
import { OrderRepository } from '../order.repository';
import { OrderService } from '../order.service';
import { orderStubs } from './order.stubs';

const { workoutOrderDto, workout, workoutOrder, userId } = orderStubs;

describe('Order Service', () => {
  let orderRepository: OrderRepository;
  let orderService: OrderService;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(OrderService)
      .mock(OrderRepository)
      .using({
        create: jest.fn().mockResolvedValue(workoutOrder),
      })
      .mock(WorkoutService)
      .using({
        checkWorkoutExist: jest.fn().mockResolvedValue(workout),
      })
      .compile();

    orderService = unit;
    orderRepository = unitRef.get(OrderRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return new order', async () => {
    const result = await orderService.create(workoutOrderDto, userId);

    expect(orderRepository.create).toBeCalled();
    expect(result).toEqual(workoutOrder);
  });
});

import { TestBed } from '@automock/jest';
import { PrismaService } from '../../prisma/prisma.service';
import { OrderEntity } from '../order.entity';
import { OrderRepository } from '../order.repository';
import { orderStubs } from './order.stubs';

const { workoutOrderDto, workout, workoutOrder } = orderStubs;

describe('Order Repository', () => {
  let orderRepository: OrderRepository;
  let prisma: jest.Mocked<PrismaService>;

  beforeEach(() => {
    const { unit, unitRef } = TestBed.create(OrderRepository)
      .mock(PrismaService)
      .using({
        order: { create: jest.fn() },
      })
      .compile();

    orderRepository = unit;
    prisma = unitRef.get(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should be defined', () => {
    expect(orderRepository).toBeDefined();
    expect(prisma).toBeDefined();
  });

  test('create should return new workout order', async () => {
    const entity = new OrderEntity({
      ...workoutOrderDto,
      price: workout.price,
    });

    jest.spyOn(prisma.order, 'create').mockResolvedValue(workoutOrder);

    const result = await orderRepository.create(entity);

    expect(prisma.order.create).toBeCalled();
    expect(result).toEqual(workoutOrder);
  });
});

import { OrderType, Workout } from '@fit-friends/shared';
import { createWorkout, createWorkoutOrder } from '../../cli/mocks';

const id = 1;
const userId = 1;
const workoutId = 1;

const workout: Workout = {
  id: workoutId,
  ...createWorkout(),
  backgroundImage: '',
  video: '',
};

const workoutOrderDto = createWorkoutOrder(workout);

const workoutOrder = {
  id,
  amount: workoutOrderDto.amount,
  orderType: OrderType.Workout,
  paymentMethod: workoutOrderDto.paymentMethod,
  price: workout.price,
  totalCost: workout.price * workoutOrderDto.amount,
  userId,
  workoutId,
  createdAt: new Date(),
  sportGymId: undefined,
};

export const orderStubs = { workoutOrderDto, workout, workoutOrder, userId };

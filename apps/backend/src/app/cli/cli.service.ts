import { faker } from '@faker-js/faker';
import { User, UserRole, Workout } from '@fit-friends/shared';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth/auth.service';
import { OrderService } from '../order/order.service';
import { PrismaService } from '../prisma/prisma.service';
import { WorkoutService } from '../workout/workout.service';
import { MOCKS_DEFAULT } from './cli.constant';
import { createCustomer } from './mocks/create-customer';
import { createWorkoutOrder } from './mocks/create-order';
import { createSportGym } from './mocks/create-sport-gym';
import { createTrainer } from './mocks/create-trainer';
import { createWorkout } from './mocks/create-workout';

@Injectable()
export class CliService {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
    private readonly workoutService: WorkoutService,
    private readonly orderService: OrderService,
    private readonly config: ConfigService
  ) {}

  async execution() {
    await this.generateSportGyms();
    await this.generateUsers();
    const customers = await this.prisma.user.findMany({
      where: { role: UserRole.Customer },
    });
    const trainers = await this.prisma.user.findMany({
      where: { role: UserRole.Trainer },
    });
    await this.generateFriends([...customers, ...trainers]);
    await this.generateWorkouts(trainers);
    const workouts = await this.prisma.workout.findMany();
    await this.generateWorkoutOrders(workouts, customers);
  }

  async generateSportGyms() {
    const staticFolder = this.config.get<string>('static.folder');
    await Promise.all(
      Array.from({ length: 5 }, async () => {
        const sportGym = await createSportGym(staticFolder);
        await this.prisma.sportGym.create({
          data: sportGym,
        });
      })
    ).then(() => {
      console.log('SportGyms were created');
    });
  }

  async generateUsers() {
    await Promise.all(
      Array.from({ length: MOCKS_DEFAULT.GENERATE.USER_COUNT }, async () => {
        await this.authService.register(createCustomer());
      })
    ).then(() => {
      console.log('Customers were created');
    });

    await Promise.all(
      Array.from({ length: MOCKS_DEFAULT.GENERATE.USER_COUNT }, async () => {
        await this.authService.register(createTrainer());
      })
    ).then(() => {
      console.log('Trainers were created');
    });
  }

  async generateFriends(users: User[]) {
    await Promise.all(
      Array.from(
        { length: MOCKS_DEFAULT.GENERATE.FRIENDS_ROUNDS },
        async () => {
          const [user, ...rest] = faker.helpers.shuffle(users);
          const friends = faker.helpers.arrayElements(
            rest,
            MOCKS_DEFAULT.GENERATE.FRIENDS_COUNT
          );
          await this.prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              friends: {
                connect: friends.map((friend) => ({ id: friend.id })),
              },
            },
          });
        }
      )
    ).then(() => {
      console.log('Friends were assigned');
    });
  }

  async generateWorkouts(trainers: User[]) {
    await Promise.all(
      Array.from(trainers, async (trainer) => {
        const workoutsCount = faker.datatype.number({
          min: MOCKS_DEFAULT.GENERATE.WORKOUTS_COUNT.MIN,
          max: MOCKS_DEFAULT.GENERATE.WORKOUTS_COUNT.MAX,
        });
        for (let i = 0; i < workoutsCount; i++) {
          await this.workoutService.create(createWorkout(), trainer.id);
        }
      })
    ).then(() => {
      console.log('Workouts were generated');
    });
  }

  async generateWorkoutOrders(workouts: Workout[], customers: User[]) {
    await Promise.all(
      Array.from(workouts, async (workout) => {
        const ordersCount = faker.datatype.number({
          min: MOCKS_DEFAULT.GENERATE.ORDERS_COUNT.MIN,
          max: MOCKS_DEFAULT.GENERATE.ORDERS_COUNT.MAX,
        });
        for (let i = 0; i < ordersCount; i++) {
          const user = faker.helpers.arrayElement(customers);
          await this.orderService.create(createWorkoutOrder(workout), user.id);
        }
      })
    ).then(() => {
      console.log('Orders were generated');
    });
  }
}

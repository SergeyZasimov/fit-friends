import { faker } from '@faker-js/faker';
import { SportGym, User, UserRole, Workout } from '@fit-friends/shared';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth/auth.service';
import { OrderService } from '../order/order.service';
import { PrismaService } from '../prisma/prisma.service';
import { ProfileService } from '../profile/profile.service';
import { SportGymService } from '../sport-gym/sport-gym.service';
import { WorkoutService } from '../workout/workout.service';
import { MOCKS_DEFAULT } from './cli.constant';
import { createCustomer } from './mocks/create-customer';
import { createSportGymOrder, createWorkoutOrder } from './mocks/create-order';
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
    private readonly config: ConfigService,
    private readonly sportGymService: SportGymService,
    private readonly profileService: ProfileService
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
    const sportGyms = await this.prisma.sportGym.findMany();
    await this.generateWorkoutOrders(workouts, customers);
    await this.generateSportGymOrders(sportGyms, customers);
  }

  async generateSportGyms() {
    await Promise.all(
      Array.from(
        { length: MOCKS_DEFAULT.GENERATE.SPORT_GYM_COUNT },
        async () => {
          await this.sportGymService.create(createSportGym());
        }
      )
    ).then(() => {
      console.log('Sport Gyms were generated');
    });
  }

  async generateUsers() {
    await Promise.all(
      Array.from({ length: MOCKS_DEFAULT.GENERATE.USER_COUNT }, async () => {
        await this.authService.register(createCustomer());
      })
    ).then(() => {
      console.log('Customers were generated');
    });

    await Promise.all(
      Array.from({ length: MOCKS_DEFAULT.GENERATE.USER_COUNT }, async () => {
        await this.authService.register(createTrainer());
      })
    ).then(() => {
      console.log('Trainers were generated');
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
          for (const friend of friends) {
            await this.profileService.addFriend(user.id, friend.id);
          }
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
      console.log('Workout orders were generated');
    });
  }

  async generateSportGymOrders(sportGyms: SportGym[], customers: User[]) {
    await Promise.all(
      Array.from(sportGyms, async (gym) => {
        const user = faker.helpers.arrayElement(customers);
        await this.orderService.create(createSportGymOrder(gym), user.id);
      })
    ).then(() => {
      console.log('Sport Gym orders were generated');
    });
  }
}

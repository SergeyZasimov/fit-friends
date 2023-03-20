import { faker } from '@faker-js/faker';
import {
  OrderType,
  SportGym,
  User,
  UserRole,
  Workout,
} from '@fit-friends/shared';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth/auth.service';
import { FoodDiaryService } from '../food-diary/food-diary.service';
import { OrderService } from '../order/order.service';
import { PersonalTrainingService } from '../personal-training/personal-training.service';
import { PrismaService } from '../prisma/prisma.service';
import { ProfileService } from '../profile/profile.service';
import { ReviewService } from '../review/review.service';
import { SportGymService } from '../sport-gym/sport-gym.service';
import { WorkoutDiaryService } from '../workout-diary/workout-diary.service';
import { WorkoutService } from '../workout/workout.service';
import { MOCKS_DEFAULT } from './cli.constant';
import { createCustomer } from './mocks/create-customer';
import { createFoodDiary } from './mocks/create-food-diary';
import { createSportGymOrder, createWorkoutOrder } from './mocks/create-order';
import { createReview } from './mocks/create-review';
import { createSportGym } from './mocks/create-sport-gym';
import { createTrainer } from './mocks/create-trainer';
import { createWorkout } from './mocks/create-workout';
import { createWorkoutDiary } from './mocks/create-workout-diary';

@Injectable()
export class CliService {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
    private readonly workoutService: WorkoutService,
    private readonly orderService: OrderService,
    private readonly config: ConfigService,
    private readonly sportGymService: SportGymService,
    private readonly profileService: ProfileService,
    private readonly personalTrainingService: PersonalTrainingService,
    private readonly reviewService: ReviewService,
    private readonly foodDiaryService: FoodDiaryService,
    private readonly workoutDiaryService: WorkoutDiaryService
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
    await this.generatePersonalTrainings([...customers, ...trainers]);
    await this.generateWorkouts(trainers);
    const workouts = await this.prisma.workout.findMany();
    const sportGyms = await this.prisma.sportGym.findMany();
    await this.generateReviews(customers, workouts);
    await this.generateWorkoutOrders(workouts, customers);
    await this.generateSportGymOrders(sportGyms, customers);
    await this.generateFoodDiary(customers);
    await this.generateWorkoutDiary(customers);
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

  async generatePersonalTrainings(users: User[]) {
    await Promise.all(
      Array.from(
        { length: MOCKS_DEFAULT.GENERATE.PERSONAL_TRAINING_ROUNDS },
        async () => {
          const [user, ...rest] = faker.helpers.shuffle(users);
          const conductors = faker.helpers.arrayElements(
            rest,
            MOCKS_DEFAULT.GENERATE.PERSONAL_TRAINING_COUNT
          );
          for (const conductor of conductors) {
            await this.personalTrainingService.create(
              { conductorId: conductor.id },
              user.id
            );
          }
        }
      )
    ).then(() => {
      console.log('Personal Trainings were assigned');
    });
  }

  async generateReviews(customers: User[], workouts: Workout[]) {
    await Promise.all(
      workouts.map(async (workout) => {
        const users = faker.helpers.arrayElements(
          customers,
          faker.datatype.number({
            min: 0,
            max: MOCKS_DEFAULT.GENERATE.REVIEW_COUNT,
          })
        );

        for (const user of users) {
          await this.reviewService.create(createReview(workout), user.id);
        }
      })
    ).then(() => {
      console.log('Reviews were generated');
    });
  }

  async generateFoodDiary(customers: User[]) {
    await Promise.all(
      customers.map((user) => {
        Array.from(
          { length: MOCKS_DEFAULT.GENERATE.FOOD_DIARY_COUNT },
          async () => {
            await this.foodDiaryService.create(user.id, createFoodDiary());
          }
        );
      })
    ).then(() => {
      console.log('Food Diary records were generated');
    });
  }

  async generateWorkoutDiary(customers: User[]) {
    await Promise.all(
      customers.map(async (user) => {
        const workoutOrders = await this.prisma.order.findMany({
          where: {
            userId: user.id,
            orderType: OrderType.Workout,
          },
        });
        Array.from(
          { length: MOCKS_DEFAULT.GENERATE.WORKOUT_DIARY_COUNT },
          async () => {
            const order = faker.helpers.arrayElement(workoutOrders);
            await this.workoutDiaryService.create(
              user.id,
              createWorkoutDiary(order.workoutId)
            );
          }
        );
      })
    ).then(() => {
      console.log('Workout Diary records were generated');
    });
  }
}

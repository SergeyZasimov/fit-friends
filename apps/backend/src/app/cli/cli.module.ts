import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { ENV_FILE_PATH } from '../config/config.constant';
import { validateEnvironments } from '../config/env.validator';
import { appConfig, jwtConfig, staticConfig } from '../config/namespaces';
import { FoodDiaryModule } from '../food-diary/food-diary.module';
import { OrderModule } from '../order/order.module';
import { PersonalTrainingModule } from '../personal-training/personal-training.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ProfileModule } from '../profile/profile.module';
import { ReviewModule } from '../review/review.module';
import { SportGymModule } from '../sport-gym/sport-gym.module';
import { WorkoutDiaryModule } from '../workout-diary/workout-diary.module';
import { WorkoutModule } from '../workout/workout.module';
import { CliService } from './cli.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [appConfig, jwtConfig, staticConfig],
      validate: validateEnvironments,
    }),
    AuthModule,
    PrismaModule,
    WorkoutModule,
    OrderModule,
    SportGymModule,
    ProfileModule,
    PersonalTrainingModule,
    ReviewModule,
    FoodDiaryModule,
    WorkoutDiaryModule,
  ],
  providers: [CliService],
})
export class CliModule {}

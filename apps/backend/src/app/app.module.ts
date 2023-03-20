import { Module } from '@nestjs/common';

import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import 'multer';
import { AuthModule } from './auth/auth.module';
import { ENV_FILE_PATH } from './config/config.constant';
import { validateEnvironments } from './config/env.validator';
import {
  appConfig,
  jwtConfig,
  smtpConfig,
  staticConfig,
} from './config/namespaces';
import { getSmtpConfig } from './config/smtp.config';
import { getStaticConfig } from './config/static.config';
import { FoodDiaryModule } from './food-diary/food-diary.module';
import { JwtGuard } from './guards/jwt.guard';
import { OrderModule } from './order/order.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { SportGymModule } from './sport-gym/sport-gym.module';
import { UserModule } from './user/user.module';
import { WorkoutDiaryModule } from './workout-diary/workout-diary.module';
import { WorkoutModule } from './workout/workout.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { NotificationModule } from './notification/notification.module';
import { PersonalTrainingModule } from './personal-training/personal-training.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [appConfig, jwtConfig, staticConfig, smtpConfig],
      validate: validateEnvironments,
    }),
    UserModule,
    PrismaModule,
    ProfileModule,
    AuthModule,
    ServeStaticModule.forRootAsync(getStaticConfig()),
    WorkoutModule,
    OrderModule,
    FoodDiaryModule,
    WorkoutDiaryModule,
    SportGymModule,
    MailerModule.forRootAsync(getSmtpConfig()),
    SubscriptionModule,
    NotificationModule,
    PersonalTrainingModule,
    ReviewModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}

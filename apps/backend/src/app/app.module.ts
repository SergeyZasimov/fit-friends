import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { validateEnvironments } from './config/env.validator';
import {
  appConfig,
  jwtConfig,
  multerConfig,
  staticConfig,
} from './config/namespaces';
import { getStaticConfig } from './config/static.config';
import { JwtGuard } from './guards/jwt.guard';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './user/user.module';
import { WorkoutModule } from './workout/workout.module';
import { OrderModule } from './order/order.module';

const ENV_FILE_PATH = join('..', '..', '.env');

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [appConfig, jwtConfig, multerConfig, staticConfig],
      validate: validateEnvironments,
    }),
    UserModule,
    PrismaModule,
    ProfileModule,
    AuthModule,
    ServeStaticModule.forRootAsync(getStaticConfig()),
    WorkoutModule,
    OrderModule,
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

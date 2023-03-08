import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';
import 'multer';
import { AuthModule } from './auth/auth.module';
import { validateEnvironments } from './config/env.validator';
import { appConfig, jwtConfig, staticConfig } from './config/namespaces';
import { getStaticConfig } from './config/static.config';
import { JwtGuard } from './guards/jwt.guard';
import { OrderModule } from './order/order.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './user/user.module';
import { WorkoutModule } from './workout/workout.module';
import { ENV_FILE_PATH } from './config/config.constant';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [appConfig, jwtConfig, staticConfig],
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

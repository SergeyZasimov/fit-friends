import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { ENV_FILE_PATH } from '../config/config.constant';
import { validateEnvironments } from '../config/env.validator';
import { appConfig, jwtConfig, staticConfig } from '../config/namespaces';
import { OrderModule } from '../order/order.module';
import { PrismaModule } from '../prisma/prisma.module';
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
  ],
  providers: [CliService],
})
export class CliModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import path from 'node:path';
import { AuthModule } from '../auth/auth.module';
import { validateEnvironments } from '../config/env.validator';
import { appConfig, jwtConfig, staticConfig } from '../config/namespaces';
import { PrismaModule } from '../prisma/prisma.module';
import { WorkoutModule } from '../workout/workout.module';
import { CliService } from './cli.service';
import { OrderModule } from '../order/order.module';

const ENV_FILE_PATH = path.join('..', '..', '.env');

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
    OrderModule
  ],
  providers: [CliService],
})
export class CliModule {}

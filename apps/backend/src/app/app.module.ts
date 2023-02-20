import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { validateEnvironments } from './config/env.validator';
import { appConfig, jwtConfig } from './config/namespaces';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './user/user.module';

const ENV_FILE_PATH = join('..', '..', '.env');

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: ENV_FILE_PATH,
      load: [appConfig, jwtConfig],
      validate: validateEnvironments,
    }),
    UserModule,
    PrismaModule,
    ProfileModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

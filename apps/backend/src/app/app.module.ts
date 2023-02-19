import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, PrismaModule, ProfileModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

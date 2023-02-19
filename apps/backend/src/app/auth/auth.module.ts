import { Module } from '@nestjs/common';
import { ProfileModule } from '../profile/profile.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, ProfileModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}

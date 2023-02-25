import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MulterModule } from '@nestjs/platform-express';
import { getJwtConfig } from '../config/jwt.config';
import { getMulterConfig } from '../config/multer.config';
import { ProfileModule } from '../profile/profile.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt-auth.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { LocalStrategy } from './strategies/local-auth.strategy';

@Module({
  imports: [
    UserModule,
    ProfileModule,
    PassportModule,
    JwtModule.registerAsync(getJwtConfig()),
    MulterModule.registerAsync(getMulterConfig()),
  ],
  providers: [AuthService, LocalStrategy, JwtRefreshStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

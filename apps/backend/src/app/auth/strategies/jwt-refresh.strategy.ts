import { TokenPayload } from '@fit-friends/shared';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthExceptionMessage, StrategyName } from '../auth.constant';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  StrategyName.JwtRefresh
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.refreshTokenSecret'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: TokenPayload) {
    const refreshToken = req.get('authorization').split(' ').at(-1);
    const user = await this.authService.checkUserExist(payload.email);

    if (user.refreshToken !== refreshToken) {
      throw new UnauthorizedException(AuthExceptionMessage.ForeignToken);
    }

    return user;
  }
}

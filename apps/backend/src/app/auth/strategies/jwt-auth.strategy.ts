import { TokenPayload } from '@fit-friends/shared';
import { Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConfig } from '../../config/namespaces';
import { StrategyName } from '../auth.constant';
import { AuthService } from '../auth.service';

export class JwtStrategy extends PassportStrategy(Strategy, StrategyName.Jwt) {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtOptions: ConfigType<typeof jwtConfig>,
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtOptions.accessTokenSecret,
    });
  }

  async validate(payload: TokenPayload) {
    return await this.authService.checkUserExist(payload.email);
  }
}

import { TokenPayload } from '@fit-friends/shared';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { StrategyName } from '../auth.constant';
import { AuthService } from '../auth.service';

export class JwtStrategy extends PassportStrategy(Strategy, StrategyName.Jwt) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.accessTokenSecret'),
    });
  }

  async validate(payload: TokenPayload) {
    return await this.authService.checkUserExist(payload.email);
  }
}

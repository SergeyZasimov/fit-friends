import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { StrategyName } from '../auth/auth.constant';
import { IS_SKIP_ACCESS_JWT } from '../decorators/skip-access-jwt.decorator';

@Injectable()
export class JwtGuard extends AuthGuard(StrategyName.Jwt) {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isSkipAccessJwt = this.reflector.getAllAndOverride<boolean>(
      IS_SKIP_ACCESS_JWT,
      [context.getHandler(), context.getClass()]
    );

    if (isSkipAccessJwt) {
      return true;
    }

    return super.canActivate(context);
  }
}

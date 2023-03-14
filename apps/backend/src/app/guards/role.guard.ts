import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLE_FIELD } from '../decorators/role.decorator';

const FOREIGN_ROLE_MESSAGE = 'Неверная роль пользователя';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const role = this.reflector.getAllAndOverride<string>(ROLE_FIELD, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (role) {
      const request = context.switchToHttp().getRequest();
      const user = request.user;

      if (user.role !== role) {
        throw new ForbiddenException(FOREIGN_ROLE_MESSAGE);
      }
    }
    return true;
  }
}

import { UrlDomain, UrlRoute, User } from '@fit-friends/shared';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GetCurrentUser } from '../decorators/get-current-user.decorator';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { fillObject } from '../utils/helpers';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRdo } from './rdo/user.rdo';

@Controller(UrlDomain.Auth)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(UrlRoute.Register)
  async register(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    return fillObject(UserRdo, newUser, newUser.role);
  }

  @UseGuards(LocalAuthGuard)
  @Post(UrlRoute.Login)
  async login(@GetCurrentUser() user: User) {
    return this.authService.login(user);
  }
}

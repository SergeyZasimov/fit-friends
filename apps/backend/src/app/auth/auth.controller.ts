import { UrlDomain, UrlRoute, User } from '@fit-friends/shared';
import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { GetCurrentUser } from '../decorators/get-current-user.decorator';
import { SkipAccessJwt } from '../decorators/skip-access-jwt.decorator';
import { JwtRefreshGuard } from '../guards/jwt-refresh.guard';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { UserFilesValidationPipe } from '../pipes/user-files-validation.pipe';
import { UserRdo } from '../user/rdo/user.rdo';
import { UserFiles } from '../user/user.constant';
import { fillObject } from '../utils/helpers';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@SkipAccessJwt()
@Controller(UrlDomain.Auth)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'certificate', maxCount: 1 },
    ])
  )
  @Post(UrlRoute.Register)
  async register(
    @Body() dto: CreateUserDto,
    @UploadedFiles(new UserFilesValidationPipe())
    files: UserFiles
  ) {
    const newUser = await this.authService.register(dto, files);
    return fillObject(UserRdo, newUser, newUser.role);
  }

  @UseGuards(LocalAuthGuard)
  @Post(UrlRoute.Login)
  async login(@GetCurrentUser() user: User) {
    return this.authService.login(user);
  }

  @UseGuards(JwtRefreshGuard)
  @Get(UrlRoute.Refresh)
  async refreshTokens(@GetCurrentUser() user: User) {
    return this.authService.login(user);
  }

  @UseGuards(JwtRefreshGuard)
  @Get(UrlRoute.Logout)
  async logout(@GetCurrentUser() user: User) {
    return this.authService.logout(user);
  }
}

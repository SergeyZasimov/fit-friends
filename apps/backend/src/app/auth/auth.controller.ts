import { UrlDomain, UrlRoute, User } from '@fit-friends/shared';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
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
import { ProfileService } from '../profile/profile.service';
import { RegisteredUserRdo } from '../user/rdo/registered-user.rdo';
import { UserRdo } from '../user/rdo/user.rdo';
import { UserFiles, UserValidationMessage } from '../user/user.constant';
import { fillObject } from '../utils/helpers';
import { AuthService } from './auth.service';
import { QuestionnaireCustomerDto } from './dto/questionnaire-customer.dto';
import { QuestionnaireTrainerDto } from './dto/questionnaire-trainer.dto';
import { RegisterUserDto } from './dto/register-user.dto';

@SkipAccessJwt()
@Controller(UrlDomain.Auth)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly profileService: ProfileService
  ) {}

  @UseInterceptors(FileFieldsInterceptor([{ name: 'avatar', maxCount: 1 }]))
  @Post(UrlRoute.Register)
  async register(
    @Body() dto: RegisterUserDto,
    @UploadedFiles(new UserFilesValidationPipe())
    files: UserFiles
  ) {
    if (!files.avatar) {
      throw new BadRequestException(UserValidationMessage.AvatarRequired);
    }

    const newUser = await this.authService.register(dto, files);
    return fillObject(RegisteredUserRdo, newUser);
  }

  @Post(UrlRoute.QuestionnaireCustomer)
  async registerQuestionnaireCustomer(@Body() dto: QuestionnaireCustomerDto) {
    const user = await this.profileService.update(dto.userId, dto);
    return fillObject(UserRdo, user, user.role);
  }

  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'certificate', maxCount: 1 }])
  )
  @Post(UrlRoute.QuestionnaireTrainer)
  async registerQuestionnaireTrainer(
    @Body() dto: QuestionnaireTrainerDto,
    @UploadedFiles(new UserFilesValidationPipe())
    files: UserFiles
  ) {
    if (files && !files.certificate) {
      throw new BadRequestException(UserValidationMessage.CertificateRequired);
    }

    const user = await this.profileService.update(dto.userId, dto, files);
    return fillObject(UserRdo, user, user.role);
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
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
    await this.authService.logout(user);
  }
}

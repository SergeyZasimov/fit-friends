import { UrlDomain, UrlParams, UrlRoute, UserRole } from '@fit-friends/shared';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { GetCurrentUser } from '../decorators/get-current-user.decorator';
import { Role } from '../decorators/role.decorator';
import { RoleGuard } from '../guards/role.guard';
import { DbIdValidationPipe } from '../pipes/db-id-validation.pipe';
import { UserFilesValidationPipe } from '../pipes/user-files-validation.pipe';
import { UserRdo } from '../user/rdo/user.rdo';
import { CurrentUserField, UserFiles } from '../user/user.constant';
import { fillObject } from '../utils/helpers';
import { ProfileQueryDto } from './dto/profile-query.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

@Controller(UrlDomain.Profile)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(RoleGuard)
  @Role(UserRole.Customer)
  @Get('')
  async show(@Query() query: ProfileQueryDto) {
    const users = await this.profileService.getMany(query);
    return users.map((user) => fillObject(UserRdo, user, user.role));
  }

  @Get(UrlRoute.Friends)
  async showFriends(
    @GetCurrentUser(CurrentUserField.Id) userId: number,
    @Query() query: ProfileQueryDto
  ) {
    const { friends } = await this.profileService.getFriends(userId, query);
    return friends.map((user) => fillObject(UserRdo, user, user.role));
  }

  @Get(`:${UrlParams.Id}`)
  async showMany(@Param(UrlParams.Id, DbIdValidationPipe) id: number) {
    const user = await this.profileService.getOne(id);
    return fillObject(UserRdo, user, user.role);
  }

  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'avatar', maxCount: 1 },
      { name: 'certificate', maxCount: 1 },
    ])
  )
  @Patch('')
  async update(
    @Body() dto: UpdateProfileDto,
    @GetCurrentUser(CurrentUserField.Id) userId: number,
    @UploadedFiles(new UserFilesValidationPipe())
    files: UserFiles
  ) {
    const user = await this.profileService.update(userId, dto, files);
    return fillObject(UserRdo, user, user.role);
  }

  @Get(`${UrlRoute.AddFriend}/:${UrlParams.Id}`)
  async addToFriends(
    @Param(UrlParams.Id, DbIdValidationPipe) friendId: number,
    @GetCurrentUser(CurrentUserField.Id) userId: number
  ) {
    await this.profileService.addFriend(userId, friendId);
  }
}

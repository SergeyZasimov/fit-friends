import { UrlDomain, UrlParams, UserRole } from '@fit-friends/shared';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { GetCurrentUser } from '../decorators/get-current-user.decorator';
import { Role } from '../decorators/role.decorator';
import { RoleGuard } from '../guards/role.guard';
import { DbIdValidationPipe } from '../pipes/db-id-validation.pipe';
import { UserRdo } from '../user/rdo/user.rdo';
import { CurrentUserField } from '../user/user.constant';
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

  @Get('friends')
  async showFriends(@GetCurrentUser(CurrentUserField.Id) userId: number) {
    const { friends } = await this.profileService.getFriends(userId);
    return friends.map((user) => fillObject(UserRdo, user, user.role));
  }

  @Get(`:${UrlParams.Id}`)
  async showMany(@Param(UrlParams.Id, DbIdValidationPipe) id: number) {
    const user = await this.profileService.getOne(id);
    return fillObject(UserRdo, user, user.role);
  }

  // @UseInterceptors(AvatarInterceptor())
  @Patch('')
  async update(
    @Body() dto: UpdateProfileDto,
    @GetCurrentUser(CurrentUserField.Id) userId: number,
    @UploadedFile()
    file: Express.Multer.File
  ) {
    const user = await this.profileService.update(userId, dto, file);
    return fillObject(UserRdo, user, user.role);
  }

  @Get('add-friend/:id')
  async addToFriends(
    @Param('id', DbIdValidationPipe) friendId: number,
    @GetCurrentUser(CurrentUserField.Id) userId: number
  ) {
    await this.profileService.addFriend(userId, friendId);
  }
}

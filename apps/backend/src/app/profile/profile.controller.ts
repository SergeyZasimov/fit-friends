import { UrlDomain, UrlParams, UserRole } from '@fit-friends/shared';
import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { GetCurrentUser } from '../decorators/get-current-user.decorator';
import { Role } from '../decorators/role.decorator';
import { RoleGuard } from '../guards/role.guard';
import { DbIdValidationPipe } from '../pipes/db-id-validation.pipe';
import { UserRdo } from '../user/rdo/user.rdo';
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

  @Get(`:${UrlParams.Id}`)
  async showMany(@Param(UrlParams.Id, DbIdValidationPipe) id: number) {
    const user = await this.profileService.getOne(id);
    return fillObject(UserRdo, user, user.role);
  }

  @Patch('')
  async update(
    @Body() dto: UpdateProfileDto,
    @GetCurrentUser('id') userId: number
  ) {
    const user = await this.profileService.update(userId, dto);
    return fillObject(UserRdo, user, user.role);
  }
}

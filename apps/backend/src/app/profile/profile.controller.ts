import { UrlDomain, UrlParams, UserRole } from '@fit-friends/shared';
import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { Role } from '../decorators/role.decorator';
import { RoleGuard } from '../guards/role.guard';
import { DbIdValidationPipe } from '../pipes/db-id-validation.pipe';
import { UserRdo } from '../user/rdo/user.rdo';
import { fillObject } from '../utils/helpers';
import { ProfileQueryDto } from './dto/profile-query.dto';
import { ProfileService } from './profile.service';

@Controller(UrlDomain.Profile)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(RoleGuard)
  @Role(UserRole.Customer)
  @Get('')
  async showUsers(@Query() query: ProfileQueryDto) {
    const users = await this.profileService.getUsers(query);
    return users.map((user) => fillObject(UserRdo, user, user.role));
  }

  @Get(`:${UrlParams.Id}`)
  async showUser(@Param(UrlParams.Id, DbIdValidationPipe) id: number) {
    const user = await this.profileService.getUser(id);
    return fillObject(UserRdo, user, user.role);
  }
}

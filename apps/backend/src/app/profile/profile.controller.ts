import { UrlDomain, UrlParams } from '@fit-friends/shared';
import { Controller, Get, Param } from '@nestjs/common';
import { DbIdValidationPipe } from '../pipes/db-id-validation.pipe';
import { UserRdo } from '../user/rdo/user.rdo';
import { fillObject } from '../utils/helpers';
import { ProfileService } from './profile.service';

@Controller(UrlDomain.Profile)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(`:${UrlParams.Id}`)
  async showUser(@Param(UrlParams.Id, DbIdValidationPipe) id: number) {
    const user = await this.profileService.getUser(id);
    return fillObject(UserRdo, user, user.role);
  }
}

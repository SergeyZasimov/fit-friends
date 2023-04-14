import { UrlDomain, UrlParams, UrlRoute, UserRole } from '@fit-friends/shared';
import {
  Body,
  Controller,
  Delete,
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
import { DeleteCertificateDto } from './dto/delete-certificate.rdo';
import { ProfileQueryDto } from './dto/profile-query.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';

@Controller(UrlDomain.Profile)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(RoleGuard)
  @Role(UserRole.Customer)
  @Get('')
  async showMany(@Query() query: ProfileQueryDto) {
    const users = await this.profileService.getMany(query);
    return users.map((user) => fillObject(UserRdo, user, user.role));
  }

  @Get(UrlRoute.Friends)
  async showFriends(
    @GetCurrentUser(CurrentUserField.Id) userId: number,
    @Query() query: ProfileQueryDto
  ) {
    const result = await this.profileService.getFriends(userId, query);
    return result.map((user) => fillObject(UserRdo, user, user.role));
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
    console.log(dto);
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

  @UseGuards(RoleGuard)
  @Role(UserRole.Customer)
  @Patch(`${UrlRoute.UpdateFavoriteGym}/:${UrlParams.Id}`)
  async updateFavoriteGym(
    @GetCurrentUser(CurrentUserField.Id) userId: number,
    @Param(UrlParams.Id, DbIdValidationPipe) gymId: number
  ) {
    await this.profileService.updateFavoriteGym(userId, gymId);
  }

  @UseGuards(RoleGuard)
  @Role(UserRole.Customer)
  @Get(`${UrlRoute.UpdateFavoriteGym}`)
  async showFavoriteGyms(@GetCurrentUser(CurrentUserField.Id) userId: number) {
    return this.profileService.getFavoriteGyms(userId);
  }

  @Get(`:${UrlParams.Id}`)
  async showOne(@Param(UrlParams.Id, DbIdValidationPipe) id: number) {
    const user = await this.profileService.getOne(id);
    return fillObject(UserRdo, user, user.role);
  }

  @Patch(UrlRoute.DeleteCertificate)
  async deleteCertificate(
    @GetCurrentUser(CurrentUserField.Id) userId: number,
    @Body() dto: DeleteCertificateDto
  ) {
    const user = await this.profileService.deleteCertificate(userId, dto);
    return fillObject(UserRdo, user, user.role);
  }

  @Delete(UrlRoute.DeleteAvatar)
  async deleteAvatar(@GetCurrentUser(CurrentUserField.Id) userId: number) {
    const user = await this.profileService.deleteAvatar(userId);
    return fillObject(UserRdo, user, user.role);
  }
}

import { UrlDomain, UrlParams } from '@fit-friends/shared';
import { Controller, Delete, Get, Param } from '@nestjs/common';
import { GetCurrentUser } from '../decorators/get-current-user.decorator';
import { DbIdValidationPipe } from '../pipes/db-id-validation.pipe';
import { CurrentUserField } from '../user/user.constant';
import { fillObject } from '../utils/helpers';
import { NotificationService } from './notification.service';
import { NotificationRdo } from './rdo/notification.rdo';

@Controller(UrlDomain.Notification)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  async showMany(@GetCurrentUser(CurrentUserField.Id) userId: number) {
    const result = await this.notificationService.getMany(userId);
    return fillObject(NotificationRdo, result);
  }

  @Delete(`:${UrlParams.Id}`)
  async delete(
    @Param(UrlParams.Id, DbIdValidationPipe) id: number,
    @GetCurrentUser(CurrentUserField.Id) userId: number
  ) {
    const result = await this.notificationService.delete(id, userId);
    return fillObject(NotificationRdo, result);
  }
}

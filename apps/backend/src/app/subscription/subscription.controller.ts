import { UrlDomain, UrlParams, UserRole } from '@fit-friends/shared';
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetCurrentUser } from '../decorators/get-current-user.decorator';
import { Role } from '../decorators/role.decorator';
import { RoleGuard } from '../guards/role.guard';
import { DbIdValidationPipe } from '../pipes/db-id-validation.pipe';
import { CurrentUserField } from '../user/user.constant';
import { SubscriptionService } from './subscription.service';

@UseGuards(RoleGuard)
@Role(UserRole.Customer)
@Controller(UrlDomain.Subscription)
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post(`:${UrlParams.Id}`)
  async addSubscribe(
    @Param(UrlParams.Id, DbIdValidationPipe) trainerId: number,
    @GetCurrentUser(CurrentUserField.Id) userId: number
  ) {
    return this.subscriptionService.addSubscribe(userId, trainerId);
  }

  @Get(`:${UrlParams.Id}`)
  async getWorkouts(
    @Param(UrlParams.Id, DbIdValidationPipe) trainerId: number,
    @GetCurrentUser(CurrentUserField.Id) userId: number,
    @GetCurrentUser(CurrentUserField.Email) userEmail: string
  ) {
    await this.subscriptionService.getNotify(userId, trainerId, userEmail);
  }

  @Delete(`:${UrlParams.Id}`)
  async deleteSubscribe(
    @Param(UrlParams.Id, DbIdValidationPipe) trainerId: number,
    @GetCurrentUser(CurrentUserField.Id) userId: number
  ) {
    await this.subscriptionService.deleteSubscription(userId, trainerId);
  }
}

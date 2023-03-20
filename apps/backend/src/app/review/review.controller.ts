import { UrlDomain, UrlParams, UserRole } from '@fit-friends/shared';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { GetCurrentUser } from '../decorators/get-current-user.decorator';
import { Role } from '../decorators/role.decorator';
import { RoleGuard } from '../guards/role.guard';
import { DbIdValidationPipe } from '../pipes/db-id-validation.pipe';
import { CurrentUserField } from '../user/user.constant';
import { fillObject } from '../utils/helpers';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewRdo } from './rdo/review.rdo';
import { ReviewService } from './review.service';

@Controller(UrlDomain.Review)
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(RoleGuard)
  @Role(UserRole.Customer)
  @Post()
  async create(
    @Body() dto: CreateReviewDto,
    @GetCurrentUser(CurrentUserField.Id) userId: number
  ) {
    const result = await this.reviewService.create(dto, userId);
    return fillObject(ReviewRdo, result);
  }

  @Get(`:${UrlParams.Id}`)
  async showMany(@Param(UrlParams.Id, DbIdValidationPipe) workoutId: number) {
    const result = await this.reviewService.getMany(workoutId);
    return fillObject(ReviewRdo, result);
  }
}

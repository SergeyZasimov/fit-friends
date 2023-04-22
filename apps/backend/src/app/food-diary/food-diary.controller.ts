import {
  UpdateFoodDiary,
  UrlDomain,
  UrlParams,
  UserRole,
} from '@fit-friends/shared';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetCurrentUser } from '../decorators/get-current-user.decorator';
import { Role } from '../decorators/role.decorator';
import { RoleGuard } from '../guards/role.guard';
import { DbIdValidationPipe } from '../pipes/db-id-validation.pipe';
import { CurrentUserField } from '../user/user.constant';
import { fillObject } from '../utils/helpers';
import { CreateFoodDiaryDto } from './dto/create-food-diary.dto';
import { FoodDiaryService } from './food-diary.service';
import { FoodDiaryRdo } from './rdo/food-diary.rdo';
import { QueryDiaryDto } from '../query/diary-query.dto';

@UseGuards(RoleGuard)
@Role(UserRole.Customer)
@Controller(UrlDomain.FoodDiary)
export class FoodDiaryController {
  constructor(private readonly foodDiaryService: FoodDiaryService) {}

  @Post()
  async create(
    @Body() dto: CreateFoodDiaryDto[],
    @GetCurrentUser(CurrentUserField.Id) userId: number
  ) {
    await this.foodDiaryService.createMany(userId, dto);
  }

  @Get(`:${UrlParams.Id}`)
  async showOne(
    @Param(UrlParams.Id, DbIdValidationPipe) id: number,
    @GetCurrentUser(CurrentUserField.Id) userId: number
  ) {
    const result = await this.foodDiaryService.getOne(userId, id);
    return fillObject(FoodDiaryRdo, result, result.user.role);
  }

  @Get()
  async showMany(
    @GetCurrentUser(CurrentUserField.Id) userId: number,
    @Query() query: QueryDiaryDto
  ) {
    const result = await this.foodDiaryService.getMany(userId, query);
    return fillObject(FoodDiaryRdo, result);
  }

  @Patch(`:${UrlParams.Id}`)
  async update(
    @Body() dto: UpdateFoodDiary,
    @GetCurrentUser(CurrentUserField.Id) userId: number,
    @Param(UrlParams.Id, DbIdValidationPipe) id: number
  ) {
    const result = await this.foodDiaryService.update(userId, id, dto);
    return fillObject(FoodDiaryRdo, result, result.user.role);
  }

  @Delete(`:${UrlParams.Id}`)
  async delete(
    @GetCurrentUser(CurrentUserField.Id) userId: number,
    @Param(UrlParams.Id, DbIdValidationPipe) id: number
  ) {
    const result = await this.foodDiaryService.delete(userId, id);
    return fillObject(FoodDiaryRdo, result);
  }
}

import {
  FoodDiary,
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

@Role(UserRole.Customer)
@Controller(UrlDomain.FoodDiary)
export class FoodDiaryController {
  constructor(private readonly foodDiaryService: FoodDiaryService) {}

  @UseGuards(RoleGuard)
  @Post()
  async create(
    @Body() dto: CreateFoodDiaryDto,
    @GetCurrentUser(CurrentUserField.Id) userId: number
  ) {
    const result = await this.foodDiaryService.create(userId, dto);
    return fillObject(FoodDiaryRdo, result, result.user.role);
  }

  @UseGuards(RoleGuard)
  @Get(`:${UrlParams.Id}`)
  async showOne(
    @Param(UrlParams.Id, DbIdValidationPipe) id: number,
    @GetCurrentUser(CurrentUserField.Id) userId: number
  ) {
    const result = await this.foodDiaryService.getOne(userId, id);
    return fillObject(FoodDiaryRdo, result, result.user.role);
  }

  @UseGuards(RoleGuard)
  @Get()
  async showMany(@GetCurrentUser(CurrentUserField.Id) userId: number) {
    const results = await this.foodDiaryService.getMany(userId);
    return results.map((item: FoodDiary) =>
      fillObject(FoodDiaryRdo, item, item.user.role)
    );
  }

  @UseGuards(RoleGuard)
  @Patch(`:${UrlParams.Id}`)
  async update(
    @Body() dto: UpdateFoodDiary,
    @GetCurrentUser(CurrentUserField.Id) userId: number,
    @Param(UrlParams.Id, DbIdValidationPipe) id: number
  ) {
    const result = await this.foodDiaryService.update(userId, id, dto);
    return fillObject(FoodDiaryRdo, result, result.user.role);
  }

  @UseGuards(RoleGuard)
  @Delete(`:${UrlParams.Id}`)
  async delete(
    @GetCurrentUser(CurrentUserField.Id) userId: number,
    @Param(UrlParams.Id, DbIdValidationPipe) id: number
  ) {
    const result = await this.foodDiaryService.delete(userId, id);
    return fillObject(FoodDiaryRdo, result);
  }
}

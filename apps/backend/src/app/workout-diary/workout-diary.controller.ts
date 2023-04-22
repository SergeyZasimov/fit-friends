import { UrlDomain, UserRole } from '@fit-friends/shared';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { GetCurrentUser } from '../decorators/get-current-user.decorator';
import { Role } from '../decorators/role.decorator';
import { RoleGuard } from '../guards/role.guard';
import { CurrentUserField } from '../user/user.constant';
import { CreateWorkoutDiaryDto } from './dto/create-workout-diary.dto';
import { WorkoutDiaryService } from './workout-diary.service';
import { QueryDiaryDto } from '../query/diary-query.dto';

@UseGuards(RoleGuard)
@Role(UserRole.Customer)
@Controller(UrlDomain.WorkoutDiary)
export class WorkoutDiaryController {
  constructor(private readonly workoutDiaryService: WorkoutDiaryService) {}

  @Post()
  async create(
    @Body() dto: CreateWorkoutDiaryDto,
    @GetCurrentUser(CurrentUserField.Id) userId: number
  ) {
    return this.workoutDiaryService.create(userId, dto);
  }

  @Get()
  async showMany(@GetCurrentUser(CurrentUserField.Id) userId: number, @Query() query: QueryDiaryDto) {
    return this.workoutDiaryService.getMany(userId, query);
  }
}

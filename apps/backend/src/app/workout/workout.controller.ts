import {
  UrlDomain,
  UrlParams,
  User,
  UserRole,
  Workout,
} from '@fit-friends/shared';
import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetCurrentUser } from '../decorators/get-current-user.decorator';
import { Role } from '../decorators/role.decorator';
import { RoleGuard } from '../guards/role.guard';
import { DbIdValidationPipe } from '../pipes/db-id-validation.pipe';
import { ParseVideoFilePipe } from '../pipes/parse-video-file.pipe';
import { CurrentUserField } from '../user/user.constant';
import { fillObject } from '../utils/helpers';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { QueryWorkoutDto } from './dto/query-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';
import { WorkoutRdo } from './rdo/workout.rdo';
import { WorkoutService } from './workout.service';

@Controller(UrlDomain.Workout)
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @UseInterceptors(FileInterceptor('video'))
  @UseGuards(RoleGuard)
  @Role(UserRole.Trainer)
  @Post('')
  async create(
    @Body() dto: CreateWorkoutDto,
    @UploadedFile(new ParseVideoFilePipe({ fileIsRequired: true }))
    file: Express.Multer.File,
    @GetCurrentUser(CurrentUserField.Id) userId: number
  ) {
    const workout = await this.workoutService.create(dto, userId, file);
    return fillObject(WorkoutRdo, workout, (workout.trainer as User).role);
  }

  @UseGuards(RoleGuard)
  @Role(UserRole.Trainer)
  @Get('')
  async showMany(
    @Query() query: QueryWorkoutDto,
    @GetCurrentUser(CurrentUserField.Id) userId: number
  ) {
    const workouts = await this.workoutService.getMany(query, userId);
    return workouts.map((item: Workout) =>
      fillObject(WorkoutRdo, item, (item.trainer as User).role)
    );
  }

  @Get(`:${UrlParams.Id}`)
  async show(@Param(UrlParams.Id, DbIdValidationPipe) id: number) {
    const workout = await this.workoutService.getOne(id);
    return fillObject(WorkoutRdo, workout, (workout.trainer as User).role);
  }

  @UseInterceptors(FileInterceptor('video'))
  @UseGuards(RoleGuard)
  @Role(UserRole.Trainer)
  @Patch(`:${UrlParams.Id}`)
  async update(
    @Param(UrlParams.Id, DbIdValidationPipe) id: number,
    @Body() dto: UpdateWorkoutDto,
    @UploadedFile(new ParseVideoFilePipe({ fileIsRequired: false }))
    file: Express.Multer.File,
    @GetCurrentUser(CurrentUserField.Id) userId: number
  ) {
    const workout = await this.workoutService.update(id, dto, userId, file);
    return fillObject(WorkoutRdo, workout, (workout.trainer as User).role);
  }
}

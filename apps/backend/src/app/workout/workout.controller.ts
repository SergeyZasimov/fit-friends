import { UrlDomain, User, UserRole } from '@fit-friends/shared';
import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GetCurrentUser } from '../decorators/get-current-user.decorator';
import { Role } from '../decorators/role.decorator';
import { RoleGuard } from '../guards/role.guard';
import { VideoInterceptor } from '../interceptors/video.interceptor';
import { CurrentUserField } from '../user/user.constant';
import { fillObject } from '../utils/helpers';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { WorkoutRdo } from './rdo/workout.rdo';
import { WorkoutService } from './workout.service';

@Controller(UrlDomain.Workout)
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  @UseInterceptors(VideoInterceptor())
  @UseGuards(RoleGuard)
  @Role(UserRole.Trainer)
  @Post('')
  async create(
    @Body() dto: CreateWorkoutDto,
    @UploadedFile() file: Express.Multer.File,
    @GetCurrentUser(CurrentUserField.Id) userId: number
  ) {
    const workout = await this.workoutService.create(dto, file, userId);
    return fillObject(WorkoutRdo, workout, (workout.trainer as User).role);
  }
}

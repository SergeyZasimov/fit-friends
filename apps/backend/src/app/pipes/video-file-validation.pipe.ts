import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import {
  WORKOUT_CONSTRAINT,
  WorkoutValidationMessage,
} from '../workout/workout.constant';

@Injectable()
export class VideoFileValidationPipe implements PipeTransform {
  transform(file: Express.Multer.File) {
    if (
      !file.mimetype.match(WORKOUT_CONSTRAINT.VIDEO_TYPE) ||
      !file.originalname.match(WORKOUT_CONSTRAINT.VIDEO_TYPE)
    ) {
      throw new BadRequestException(WorkoutValidationMessage.VideoNotValid);
    }

    return file;
  }
}

import { FileValidator, Injectable } from '@nestjs/common';
import {
  WORKOUT_CONSTRAINT,
  WorkoutValidationMessage,
} from '../workout/workout.constant';

@Injectable()
export class VideoFileTypeValidationPipe extends FileValidator {
  isValid(file: Express.Multer.File): boolean | Promise<boolean> {
    if (
      !file.mimetype.match(WORKOUT_CONSTRAINT.VIDEO_TYPE) ||
      !file.originalname.match(WORKOUT_CONSTRAINT.VIDEO_TYPE)
    ) {
      return false;
    }
    return true;
  }

  buildErrorMessage(): string {
    return WorkoutValidationMessage.VideoNotValid;
  }
}

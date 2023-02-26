import { BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  WORKOUT_CONSTRAINT,
  WorkoutValidationMessage,
} from '../workout/workout.constant';

export function VideoInterceptor() {
  return FileInterceptor('video', {
    fileFilter(_req, file, callback) {
      if (!WORKOUT_CONSTRAINT.VIDEO_TYPE.test(file.originalname)) {
        callback(
          new BadRequestException(WorkoutValidationMessage.VideoNotValid),
          false
        );
      } else {
        callback(null, true);
      }
    },
  });
}

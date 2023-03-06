import {
  BadRequestException,
  ParseFileOptions,
  ParseFilePipe,
} from '@nestjs/common';
import { WorkoutValidationMessage } from '../workout/workout.constant';
import { VideoFileTypeValidationPipe } from './video-file-type-validation.pipe';

export class ParseVideoFilePipe extends ParseFilePipe {
  constructor(options: ParseFileOptions) {
    super({
      validators: [new VideoFileTypeValidationPipe({})],
      fileIsRequired: options.fileIsRequired,
      exceptionFactory(error) {
        if (error === 'File is required') {
          error = WorkoutValidationMessage.VideoRequired;
        }
        return new BadRequestException(error);
      },
    });
  }
}

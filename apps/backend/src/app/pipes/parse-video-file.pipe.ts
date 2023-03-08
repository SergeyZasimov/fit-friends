import {
  BadRequestException,
  ParseFileOptions,
  ParseFilePipe,
} from '@nestjs/common';
import { WorkoutValidationMessage } from '../workout/workout.constant';
import { VideoFileTypeValidationPipe } from './video-file-type-validation.pipe';
import { DEFAULT_FILE_PARSE_REQUIRED_MESSAGE } from './pipes.constant';

export class ParseVideoFilePipe extends ParseFilePipe {
  constructor(options: ParseFileOptions) {
    super({
      validators: [new VideoFileTypeValidationPipe({})],
      fileIsRequired: options.fileIsRequired,
      exceptionFactory(error) {
        if (error === DEFAULT_FILE_PARSE_REQUIRED_MESSAGE) {
          error = WorkoutValidationMessage.VideoRequired;
        }
        return new BadRequestException(error);
      },
    });
  }
}

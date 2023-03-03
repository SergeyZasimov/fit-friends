import { BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { USER_CONSTRAINT, UserValidationMessage } from '../user/user.constant';

export function AvatarInterceptor() {
  return FileInterceptor('avatar', {
    limits: {
      fileSize: USER_CONSTRAINT.AVATAR_SIZE,
    },
    fileFilter(_req, file, callback) {
      if (
        !file.mimetype.match(USER_CONSTRAINT.AVATAR_TYPE) ||
        !USER_CONSTRAINT.AVATAR_TYPE.test(file.originalname)
      ) {
        callback(
          new BadRequestException(UserValidationMessage.AvatarNotValid),
          false
        );
      } else {
        callback(null, true);
      }
    },
  });
}

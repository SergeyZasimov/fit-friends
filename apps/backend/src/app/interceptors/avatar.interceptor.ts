import { BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserConstraint, UserValidationMessage } from '../user/user.constant';

export function AvatarInterceptor() {
  return FileInterceptor('avatar', {
    limits: {
      fileSize: UserConstraint.AvatarSize,
    },
    fileFilter(_req, file, callback) {
      if (
        !file.mimetype.match(UserConstraint.AvatarType) ||
        !UserConstraint.AvatarType.test(file.originalname)
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

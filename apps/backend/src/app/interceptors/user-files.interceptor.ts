import { BadRequestException, PayloadTooLargeException } from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { USER_CONSTRAINT, UserValidationMessage } from '../user/user.constant';

export function UserFilesInterceptor() {
  return FileFieldsInterceptor(
    [
      { name: 'avatar', maxCount: 1 },
      { name: 'certificate', maxCount: 1 },
    ],
    {
      fileFilter(_req, file, callback) {
        switch (file.fieldname) {
          case 'avatar':
            if (file.size > USER_CONSTRAINT.FILE_SIZE) {
              callback(new PayloadTooLargeException(), false);
            } else if (!file.mimetype.match(USER_CONSTRAINT.AVATAR_TYPE)) {
              callback(
                new BadRequestException(UserValidationMessage.AvatarNotValid),
                false
              );
            } else {
              callback(null, true);
            }
            break;

          case 'certificate':
            if (!file.mimetype.match(USER_CONSTRAINT.CERTIFICATE_TYPE)) {
              callback(
                new BadRequestException(
                  UserValidationMessage.CertificateNotValid
                ),
                false
              );
            } else {
              callback(null, true);
            }
            break;

          default:
            callback(null, true);
        }
      },
    }
  );
}

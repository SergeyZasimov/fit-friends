import {
  BadRequestException,
  Injectable,
  PayloadTooLargeException,
  PipeTransform,
} from '@nestjs/common';
import {
  USER_CONSTRAINT,
  UserFiles,
  UserValidationMessage,
} from '../user/user.constant';

@Injectable()
export class UserFilesValidationPipe implements PipeTransform {
  transform(files: UserFiles) {
    if (files && files.avatar) {
      const [avatar] = files.avatar;

      if (avatar.size > USER_CONSTRAINT.FILE_SIZE) {
        throw new PayloadTooLargeException(UserValidationMessage.FileTooLarge);
      }

      if (
        !avatar.mimetype.match(USER_CONSTRAINT.AVATAR_TYPE) ||
        !avatar.originalname.match(USER_CONSTRAINT.AVATAR_TYPE)
      ) {
        throw new BadRequestException(UserValidationMessage.AvatarNotValid);
      }
    }

    if (files && files.certificate) {
      const [certificate] = files.certificate;

      if (
        !certificate.mimetype.match(USER_CONSTRAINT.CERTIFICATE_TYPE) ||
        !certificate.originalname.match(USER_CONSTRAINT.CERTIFICATE_TYPE)
      ) {
        throw new BadRequestException(
          UserValidationMessage.CertificateNotValid
        );
      }
    }

    return files;
  }
}

import { SetMetadata } from '@nestjs/common';

export const IS_SKIP_ACCESS_JWT = 'isSkipAccessJwt';

export const SkipAccessJwt = () => SetMetadata(IS_SKIP_ACCESS_JWT, true);

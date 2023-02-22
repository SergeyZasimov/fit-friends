import { SetMetadata } from '@nestjs/common';

export const ROLE_FIELD = 'role';

export const Role = (role: string) => SetMetadata(ROLE_FIELD, role);

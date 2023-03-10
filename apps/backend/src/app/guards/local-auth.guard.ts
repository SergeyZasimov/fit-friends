import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { StrategyName } from '../auth/auth.constant';

@Injectable()
export class LocalAuthGuard extends AuthGuard(StrategyName.Local) {}

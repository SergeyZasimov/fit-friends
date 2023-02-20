import { ConfigService } from '@nestjs/config';
import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export function getJwtConfig(): JwtModuleAsyncOptions {
  return {
    useFactory: async (configService: ConfigService) => ({
      secret: configService.get<string>('jwt.accessTokenSecret'),
      signOptions: {
        expiresIn: configService.get<string>('jwt.accessTokenExpiresIn'),
        algorithm: 'HS256',
      },
    }),
    inject: [ConfigService],
  };
}

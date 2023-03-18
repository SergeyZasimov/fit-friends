import { registerAs } from '@nestjs/config';

export const appConfig = registerAs('app', () => ({
  host: process.env.APP_HOST,
  port: process.env.APP_PORT,
  database_url: process.env.DATABASE_URL,
}));

export const jwtConfig = registerAs('jwt', () => ({
  accessTokenSecret: process.env.JWT_AT_SECRET,
  accessTokenExpiresIn: process.env.JWT_AT_EXPIRES_IN,
  refreshTokenSecret: process.env.JWT_RT_SECRET,
  refreshTokenExpiresIn: process.env.JWT_RT_EXPIRES_IN,
}));

export const staticConfig = registerAs('static', () => ({
  folder: process.env.STATIC_FOLDER,
  upload: process.env.UPLOAD_FOLDER,
}));

export const smtpConfig = registerAs('smtp', () => ({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  from: process.env.MAIL_FROM,
}));

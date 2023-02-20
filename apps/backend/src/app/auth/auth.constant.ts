export const StrategyName = {
  Local: 'local',
  Jwt: 'jwt',
  JwtRefresh: 'jwt-refresh',
} as const;

export const AuthExceptionMessage = {
  ForeignToken: 'Неверный токен',
  ForeignPassword: 'Неверный пароль',
  ConflictUser: (email: string) =>
    `Пользователь с email ${email} уже существует`,
  UserNotFound: (email: string) => `Пользователь с email ${email} не найден`,
};

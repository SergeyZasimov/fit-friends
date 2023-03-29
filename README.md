# Fit Friends

### Запуск проекта:

Все команды запускаются из корневой папки.

- установите зависимости - `npm install`
- запустите докер контейнер - `npm run backend-docker:up`
- в папке `environments` создайте файл с переменными окружения `.backend.env` по примеру файла `.backend.env-example`
- проинициализируйте БД командой `npm run backend-db:init`
- создайте тестовые данные - `npm run backend-db:generate-mocks`
- запустите backend - `npm run backend:start`

Папка для тестирования загрузки файлов: `test-content`

Документация в формате OpenApi: `specification/specification.yml`

Пароль для авторизации тестовых пользователей: `secret`

Для просмотра БД выполните команду `npm run backend-db:studio`. По адресу `http://localhost:5555` будет доступна `prisma studio`

### Команды для работы с prisma:

- создать и применить миграцию - `nx run backend:db-migrate`
- удалить данные из БД - `nx run backend:db-reset`
- создать PrismaClient - `nx run backend:db-generate-client`

### Команды для выполнения тестирования:

- выполнить unit-тесты - `nx run backend:test`

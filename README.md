# Fit Friends

### Запуск проекта:

Все команды запускаются из корневой папки.

- установите зависимости - `npm install`
- запустите докер контейнер - `npm run backend-docker:up`
- в папке `apps/backend/` создайте файл с переменными окружения `.env` по примеру файла `.env-example`
- создайте тестовые данные - `npm run generate-mocks`
- запустите backend - `npm run backend:start`

Папка для тестирования загрузки файлов: `test-content`

Документация в формате OpenApi: `specification/specification.yml`

Пароль для авторизации тестовых пользователей: `secret`

Для просмотра БД выполните команду `npm run backend-db:studio`. По адресу `http://localhost:5555` будет доступна `prisma studio`

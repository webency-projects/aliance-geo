# Инструкция по запуску приложения

1. Запустите сборку приложения
```shell
docker compose up -d --build
```

2. Создание миграций Django внутри докер контейнера.
  ```shell
  docker compose exec geo_backend_api python manage.py makemigrations
  ```
> geo_backend_api - сервес бэкенда Django, указанный в `docker-compose.yml`файле.


3. Применение миграций
```shell
docker compose exec geo_backend_api python manage.py migrate
```

## Использование

1. Основное вебприложение будет доступно:
```
http://localhost:3000
```

2. Панель pgAdmin для работы с базой данных

```
http://localhost:8888
```
> Данные для входа в панель.

> **email:** admin@admin.ru

> **password:** admin

> Для подключения к серверу базы данных необходимо ввести?
- USER:     postgres
- PASSWORD: postgres
- DATABASE: geo_db



# AI Support Chatbot: Техническая документация

  

## 1. Назначение и область ответственности

  

Сервис `ai-support` — backend AI-чатбота для платформы Trading platform.

  

Основные задачи:

  

- обработка сообщений пользователя и генерация AI-ответов;

- вызов функций платформы Trading platform через Backend Master (WebSocket gateway);

- хранение истории чатов и сессий в MongoDB;

- RAG-поиск по внутренней документации из каталога `docs/`;

- сканирование арбитражных паттернов и доставка алертов;

- работа с внутренним тегом `AI warn` для аккаунтов.

  

Базовый стек:

  

- Node.js 18+, Express;

- MongoDB;

- WebSocket (`ws`) к Backend Master;

- Gemini API (основной LLM);

- OpenAI Embeddings (опционально для векторного RAG);

- Nginx (в docker-окружениях для reverse proxy).

  

## 2. Архитектура и поток данных

  

## 2.1 Компоненты

  

- `server.js`: точка входа, инициализация сервисов и маршрутов.

- `routes/chat.routes.js`: API чата, сессии, история, алерты, AI warn tags.

- `routes/scanner.routes.js`: API управления сканером.

- `services/gateway.service.js`: WebSocket-подключение к Backend Master (reconnect/heartbeat/request-response).

- `services/platform-api.service.js`: обертка вызовов Request* в Backend Master.

- `services/gemini.service.js`: генерация ответа, Function Calling, retry/backoff.

- `services/hybrid-rag.service.js`: загрузка markdown-доков, BM25+vector поиск.

- `services/session.service.js` + `services/database.service.js`: сессии/история/индексы/TTL.

- `services/arbitrage-scanner.service.js` + `services/scheduler.service.js`: плановые проверки и алерты.

- `services/internal-ai-warn-tag.service.js`: внутренний storage статуса тега `AI warn`.

  

## 2.2 Последовательность обработки сообщения

  

1. Фронтенд отправляет `POST /ai-chat-api/message`.

2. Проверяется JWT (middleware `freshchat-jwt`).

3. Сообщение валидируется/санитизируется.

4. История сессии читается из MongoDB.

5. Gemini получает контекст + результаты RAG.

6. При необходимости Gemini инициирует Function Calling к Platform API.

7. Ответ AI сохраняется в MongoDB и возвращается во фронтенд.

  

## 3. Функционал API

  

## 3.1 Chat API (основной)

  

Префикс: `/ai-chat-api`

  

- `POST /session` - создать чат-сессию.

- `GET /sessions` - список сессий пользователя.

- `GET /sessions/:sessionId` - получить сессию.

- `PATCH /sessions/:sessionId` - обновить свойства сессии.

- `DELETE /session/:sessionId` - архив/удаление сессии.

- `POST /message` - отправить сообщение боту.

- `GET /history/:sessionId` - история сообщений сессии.

- `GET /alerts/:sessionId` - алерты для сессии.

- `GET /alerts/all` - все pending алерты.

- `GET /alerts/export/:alertId` - выгрузка одного общего Scanner Alert в `.xlsx`.

- `GET /alerts/count` - количество алертов.

- `GET /alerts/check/:sessionId` - быстрый check алертов.

- `GET /stats` - статистика.

- `GET /export` - экспорт диалогов.

- `GET /ai-warn-tags/:login` - проверка внутреннего тега `AI warn`.

- `POST /ai-warn-tags/:login/assign` - принудительно назначить `AI warn`.

- `DELETE /ai-warn-tags/:login` - снять `AI warn`.

  

## 3.2 Scanner API

  

Префикс: `/api/scanner`

  

- `GET /status` - статус scheduler/scanner.

- `POST /run` - ручной запуск сканирования.

- `GET /alerts` - метрики/состояние алертов.

- `GET /results` - результаты последнего скана.

- `POST /analyze/:login` - анализ конкретного аккаунта.

- `GET /watchlist` - watchlist.

- `POST /watchlist/check` - проверка watchlist.

- `POST /watchlist/:login` - добавить аккаунт в watchlist.

- `DELETE /watchlist/:login` - убрать из watchlist.

## 3.3 Scanner Alerts Settings API

Префикс: `/api/scanner-alerts`

- `GET /settings` - получить текущие настройки scanner alerts.

- `PUT /settings` - обновить настройки scanner alerts.

- `PATCH /settings/enabled` - быстро включить/выключить scanner alerts.

- `GET /lists` - получить список управляемых списков сканирования.

- `GET /status` - получить runtime-статус scanner alerts worker.

  

## 3.4 Health endpoints

  

- `GET /health/live` - liveness probe без зависимостей от БД.

- `GET /health` - расширенный health (gateway/rag/scheduler/sessions).

  

## 4. Конфигурация: переменные окружения

  

Ниже перечислены переменные, которые могут задаваться в runtime/compose.

  

## 4.1 Core / Server

  

| Переменная | По умолчанию | Назначение |

|---|---|---|

| `NODE_ENV` | `development` (фактически через процесс) | Режим приложения (`production`/`development`), влияет на логи/обработку ошибок. |

| `PORT` | `3001` | Порт HTTP-сервера. |

| `ALLOWED_ORIGINS` | `http://localhost:4200,https://demo-frontend.example.com` | Список allowed origins (comma-separated). |

| `LOG_LEVEL` | `info` | Уровень логирования winston (`error`, `warn`, `info`, `debug`). |

  

## 4.2 AI / Gemini / RAG

  

| Переменная | По умолчанию | Назначение |

|---|---|---|

| `GEMINI_API_KEY` | нет | Ключ Gemini (обязателен для AI-ответов). |

| `GEMINI_MODEL` | `gemini-2.0-flash-exp` | Модель Gemini. |

| `GEMINI_REQUEST_TIMEOUT_MS` | `60000` | Таймаут запроса к Gemini (мс). |

| `GEMINI_MAX_RETRIES` | `2` | Количество retry на 429/5xx. |

| `GEMINI_RETRY_MAX_ATTEMPTS` | алиас для `GEMINI_MAX_RETRIES` | Backward compatibility для старого имени переменной. |

| `GEMINI_RETRY_BASE_DELAY_MS` | `1000` | Базовая задержка retry (мс). |

| `GEMINI_RETRY_MAX_DELAY_MS` | `15000` | Максимальная задержка retry (мс). |

| `OPENAI_API_KEY` | нет | Ключ OpenAI для embeddings в hybrid RAG (опционально). |

| `AI_OPTIMIZE_MAX_ITEMS` | `50` | Ограничение объема данных при AI-оптимизации ответа. |

  

Примечание: при отсутствии `OPENAI_API_KEY` бот продолжает работать, но векторный поиск (embeddings) отключается, остается keyword/BM25 логика.

  

## 4.3 Интеграция с Trading Platform / Gateway

  

| Переменная | По умолчанию | Назначение |

|---|---|---|

| `BACKEND_MASTER_URI` | `ws://gateway.example.com:11700` | WebSocket URI Backend Master (ключевая переменная интеграции). |

| `BROKER_NODES` | нет | Явный список нод через запятую, fallback если автодискавер недоступен. |

| `PLATFORM_SERVICE_URL` | `http://localhost:3003` | Базовый URL platform-service (в legacy/вспомогательных сценариях). |

| `TENANT_PLATFORM_URLS` | нет | JSON-мэппинг tenant -> URL (backward compatibility). |

| `TENANT_<TENANT_ID>_PLATFORM_URL` | нет | Пер-tenant URL в env-формате (backward compatibility). |

| `BROKER_NAME` | `default` | Идентификатор брокера (логи, сегментация данных, контекст). |

| `ENVIRONMENT` | нет | Лейбл окружения (`develop`, `release`, `production` и т.д.). |

  

## 4.4 MongoDB / Данные

  

| Переменная | По умолчанию | Назначение |

|---|---|---|

| `MONGODB_URI` | `mongodb://localhost:27017` | Строка подключения к MongoDB. |

| `MONGODB_DATABASE` | `chatbot_demo` | База данных чат-бота. |

| `MESSAGE_RETENTION_DAYS` | `0` | TTL для сообщений (0 = выключено). |

| `SESSION_RETENTION_DAYS` | `0` | TTL для сессий (0 = выключено). |

| `BACKFILL_DATE_FIELDS` | `false` | Одноразовый backfill Date-полей для TTL-индексов. |

  

## 4.5 Сессии и приватность

  

| Переменная | По умолчанию | Назначение |

|---|---|---|

| `SESSION_TIMEOUT_MINUTES` | `30` | Таймаут неактивной сессии. |

| `MAX_HISTORY_MESSAGES` | `10` | Лимит сообщений истории в AI-контексте. |

| `ALLOWED_PERSONAL_FIELDS` | пусто | Разрешенные персональные поля в ответах AI (`name,email,phone,country,city,address,comment`). |

  

## 4.6 Scanner / Scheduler

  

| Переменная | По умолчанию | Назначение |

|---|---|---|

| `SCANNER_ENABLED` | `true` | Глобальное включение сканера. |

| `SCANNER_MORNING_HOUR` | `9` | Утренний запуск (production mode). |

| `SCANNER_EVENING_HOUR` | `21` | Вечерний запуск (production mode). |

| `SCANNER_INTERVAL_MINUTES` | `60` | Интервал в testing mode. |

| `SCANNER_TESTING_MODE` | `true` | Если `true`, запускается interval-режим вместо fixed schedule. |

| `SCANNER_TOP_WINNERS` | `100` | Кол-во top winners для анализа. |

| `SCANNER_TOP_TRADES` | `50` | Кол-во top by trades для анализа. |

| `SCANNER_NEW_ACCOUNTS` | `100` | Кол-во новых счетов для анализа. |

| `SCANNER_NEW_ACCOUNT_DAYS` | `7` | Окно новых аккаунтов (дней). |

| `SCANNER_LOOKBACK_DAYS` | `7` | Глубина ретроспективного анализа (дней). |

| `SCANNER_CONCURRENCY` | `5` | Параллелизм API-запросов сканера. |

| `SCANNER_EXCLUDE_NODES` | пусто | Ноды, исключаемые из сканирования (comma-separated). |

| `SCANNER_ALERTS_ENABLED` | `true` | Дефолт включенности scanner alerts (bootstrap в БД). |

| `SCANNER_ALERTS_TOP_WINNERS_ENABLED` | `true` | Дефолт для списка `top_winners` (bootstrap в БД). |

| `SCANNER_ALERTS_TOP_BY_TRADE_COUNT_ENABLED` | `true` | Дефолт для списка `top_by_trade_count` (bootstrap в БД). |

| `SCANNER_ALERTS_NEW_ACCOUNTS_ENABLED` | `true` | Дефолт для списка `new_accounts` (bootstrap в БД). |

| `SCANNER_ALERTS_INTERVAL_SECONDS` | `300` | Дефолт интервала между автозапусками scanner alerts (bootstrap в БД). |

| `SCANNER_ALERTS_CONFIG_REFRESH_SECONDS` | `10` | Интервал polling настроек scanner alerts из БД. |

  

## 4.7 Безопасность и ограничения

  

| Переменная | По умолчанию | Назначение |

|---|---|---|

| `RATE_LIMIT_WINDOW_MS` | `60000` | Окно rate-limit для chat endpoints. |

| `RATE_LIMIT_MAX_REQUESTS` | `10` | Максимум запросов в окне rate-limit. |

| `JWT_SECRET` | генерируется/берется из файла | Секрет для локального JWT middleware (если используется). |

| `JWT_EXPIRES_IN` | `24h` | TTL JWT-токена локального middleware. |

| `FRESHCHAT_JWT_SECRET` | нет | Секрет проверки Freshchat JWT (приоритетнее `JWT_SECRET`). |

  

## 4.8 Переменные docker-compose инфраструктуры

  

Эти переменные нужны для шаблона `docker-compose.yml` и не читаются напрямую бизнес-логикой приложения:

  

- `HARBOR_REGISTRY`, `HARBOR_PROJECT`, `IMAGE_NAME`, `VERSION` - формирование image reference;

- `MONGO_ROOT_USER`, `MONGO_ROOT_PASSWORD` - учетные данные контейнера MongoDB.

  

## 5. Развертывание локально

  

## 5.1 Вариант A: без Docker (локальная разработка)

  

Требования:

  

- Node.js 18+;

- доступная MongoDB (локально или в docker);

- доступ к Backend Master (`BACKEND_MASTER_URI`).

  

Шаги:

  

1. Перейти в каталог `ai-support`.

2. Установить зависимости: `npm install`.

3. Создать env-файл: для публичного демо используйте `.env.public.example`, для интеграционной установки — `.env.example`.

4. Заполнить минимум: `GEMINI_API_KEY`, `MONGODB_URI`, `MONGODB_DATABASE`, `BACKEND_MASTER_URI`.

5. Запустить сервис: `npm start`.

6. Проверить health: `GET http://localhost:3001/health`.

  

PowerShell пример запуска с явными переменными:

  

```powershell

Set-Location C:\games\ChatbotAI\ai-support

$env:MONGODB_URI='mongodb://root:root@localhost:27095/?authSource=admin'

$env:MONGODB_DATABASE='chatbot_demo'

$env:BACKEND_MASTER_URI='ws://gateway.example.com:11700'

$env:ALLOWED_ORIGINS='http://localhost:4200,https://demo-frontend.example.com'

$env:OPENAI_API_KEY='local-dev-key'   # опционально, только для локального режима

npm start

```

  

## 5.2 Вариант B: через Docker Compose

  

В каталоге `ai-support`:

  

```bash

docker compose up -d

docker compose logs -f ai-chatbot

```

  

Сервис поднимается вместе с:

  

- `mongo` (порт `27095` наружу);

- `nginx` (порт `7001` наружу);

- контейнером backend `ai-chatbot`.

  

Проверки:

  

- `http://localhost:7001/health/live`

- `http://localhost:7001/health`

  

## 5.3 Подключение локального фронтенда к локальному chatbot backend

  

Для проекта `platform-frontend` используется proxy-конфиг:

  

- `/ai-chat-api` -> `http://localhost:3001`;

- `/api`, `/api/config`, `/public-api` -> stand `https://demo-frontend.example.com`.

  

Команда запуска фронтенда:

  

```bash

npm start -- docker-headless --proxy-config proxy.config.demo.local-backend.json

```

  

## 6. Развертывание на стендах (develop/release)

  

## 6.1 Подготовка

  

1. Подготовить/обновить `.env` для стенда (или переменные CI/CD).

2. Проверить значения:

   - `BACKEND_MASTER_URI` (для нужного стенда);

   - `ALLOWED_ORIGINS` (домен фронтенда стенда);

   - `MONGODB_*`;

   - `GEMINI_API_KEY`;

   - `FRESHCHAT_JWT_SECRET`.

3. Проверить доступность Backend Master из сети стенда.

  

## 6.2 Запуск/обновление

  

```bash

docker compose pull

docker compose up -d

docker compose ps

```

  

Если используется конкретный тег образа:

  

- задать `VERSION=<tag>`;

- выполнить `docker compose up -d`.

  

## 6.3 Проверка после деплоя

  

Минимальный чек-лист:

  

1. `GET /health/live` -> `status=ok`.

2. `GET /health` -> `services.gateway.status` не `error`.

3. Проверить создание сессии и отправку тестового сообщения.

4. Проверить endpoint AI warn tag для тестового login.

5. Проверить отсутствие restart-loop контейнера.

  

## 6.4 Типовые причины проблем на стенде

  

- недоступен `BACKEND_MASTER_URI` (timeout/reconnect);

- неверный `FRESHCHAT_JWT_SECRET` (401 на chat endpoints);

- неверный `MONGODB_URI`/authSource;

- слишком узкий `ALLOWED_ORIGINS` для домена фронтенда;

- отсутствует `GEMINI_API_KEY` или исчерпана квота.

  

## 7. Как актуализировать файлы документации

  

Каталог документации для RAG: `ai-support/docs/`.

  

Правила актуализации:

  

1. Обновлять только markdown-файлы (`*.md`) в `ai-support/docs/`.

2. Поддерживать структуру: один документ = одна доменная тема.

3. Для новых функций добавлять:

   - описание сценария;

   - входные параметры/ограничения;

   - примеры запросов/ответов (если применимо).

4. При изменении API или конфигов обновлять этот документ в том же MR.

  

Важно про применение изменений:

  

- `hybrid-rag.service` загружает документы при инициализации сервера;

- после изменения файлов в `docs/` требуется перезапуск backend-сервиса (или контейнера), чтобы бот перечитал документацию.

  

Рекомендуемый workflow:

  

1. Изменить/добавить `.md` в `ai-support/docs/`.

2. Перезапустить `ai-support`.

3. Проверить `GET /health`:

   - `services.rag.initialized = true`;

   - `services.rag.documentsCount` соответствует ожиданию.

4. Провести smoke-проверку вопросом к боту по обновленной теме.

5. Закоммитить изменения кода и документации вместе.

  

## 8. Быстрый operational checklist

  

Перед релизом:

  

1. Проверить env-переменные по разделу 4.

2. Проверить `/health` и gateway connection.

3. Проверить ключевые chat endpoints.

4. Проверить scanner status.

5. Проверить доступность и актуальность `docs/` для RAG.

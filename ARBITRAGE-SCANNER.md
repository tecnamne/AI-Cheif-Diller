# Proactive Arbitrage Scanner

> Автоматическое обнаружение арбитражных/читерских схем в дилинге

## Архитектура

```
┌─────────────────────────────────────────────────────────────────────┐
│                         AI SUPPORT BOT                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   ┌────────────────┐                      ┌─────────────────────┐   │
│   │   Chat API     │◄────── Alerts ───────│  Arbitrage Scanner  │   │
│   │   (backend)    │                      │     Service         │   │
│   └────────────────┘                      └──────────┬──────────┘   │
│                                                      │              │
│                                           ┌──────────▼──────────┐   │
│                                           │   Scheduler         │   │
│                                           │   (2x daily)        │   │
│                                           └──────────┬──────────┘   │
│                                                      │              │
│   ┌────────────────────────────────────────────────▼────────────┐  │
│   │                    Detection Pipeline                        │  │
│   │  ┌─────────────┐   ┌─────────────┐   ┌──────────────────┐   │  │
│   │  │ Rule-based  │──►│ AI Analysis │──►│ Alert Generator  │   │  │
│   │  │   Filter    │   │  (Gemini)   │   │                  │   │  │
│   │  └─────────────┘   └─────────────┘   └──────────────────┘   │  │
│   └─────────────────────────────────────────────────────────────┘  │
│                                                                      │
│   ┌────────────────────────────────────────────────────────────┐   │
│   │                   Trading Platform API                           │   │
│   │   - getWinnersLosers() - топ прибыльных                     │   │
│   │   - getAccountTrades() - история сделок                     │   │
│   │   - searchAccounts() - поиск по критериям                   │   │
│   └────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

## Паттерны арбитража для детекции

### 1. High Win Rate Pattern
Аномально высокий процент прибыльных сделок.

```javascript
{
  name: 'highWinRate',
  criteria: {
    winRate: '>= 85%',      // Win rate >= 85%
    minTrades: 15,          // Минимум 15 сделок за период
    period: '7d',           // За 7 дней
  },
  riskScore: 8,
  description: 'Подозрительно высокий win rate'
}
```

### 2. Lock Pattern (Одновременные Buy+Sell)
Открытие противоположных позиций с разницей < 5 секунд.

```javascript
{
  name: 'lockPattern',
  criteria: {
    timeWindowSeconds: 5,   // Разница между открытием < 5 сек
    sameSymbol: true,       // Тот же инструмент
    bothProfitable: true,   // Обе закрыты в плюс
  },
  riskScore: 9,
  description: 'Паттерн "лок" - арбитраж на отставании котировок'
}
```

### 3. Short Profitable Trades
Короткие сделки, все в плюс, маленькая прибыль.

```javascript
{
  name: 'shortProfitableTrades',
  criteria: {
    avgDuration: '< 60 min',  // Среднее < 60 минут
    avgProfit: '< $5',        // Маленький профит
    allProfitable: true,      // Все/почти все в плюс
  },
  riskScore: 7,
  description: 'Короткие стабильные профиты - признак арбитража'
}
```

### 4. All TP Closure
Почти все сделки закрыты по Take Profit.

```javascript
{
  name: 'allTPClosure',
  criteria: {
    tpClosureRate: '>= 90%', // >= 90% закрытий по TP
    minTrades: 10,
  },
  riskScore: 6,
  description: 'Аномально высокий процент закрытия по TP'
}
```

## Расписание сканирования

- **Утренний скан:** 09:00 (UTC+3) - анализ за ночную сессию
- **Вечерний скан:** 21:00 (UTC+3) - анализ за дневную сессию

## API Endpoints

### Backend API (port 3001)

| Endpoint | Method | Описание |
|----------|--------|----------|
| `/api/scanner/status` | GET | Статус сканера и последние результаты |
| `/api/scanner/run` | POST | Принудительный запуск сканирования |
| `/api/scanner/history` | GET | История сканирований |
| `/api/scanner/alerts` | GET | Список активных алертов |
| `/api/scanner/alerts/:id/acknowledge` | POST | Подтвердить/закрыть алерт |
| `/api/scanner/schedule/start` | POST | Запустить автоматическое расписание |
| `/api/scanner/schedule/stop` | POST | Остановить расписание |

### Trading Platform Service API (port 3003)

| Endpoint | Method | Описание |
|----------|--------|----------|
| `/scanner/accounts?count=50` | GET | Топ прибыльных счетов |
| `/scanner/trades/:login?days=7` | GET | Сделки счета за период |
| `/scanner/trades/batch` | POST | Сделки нескольких счетов (body: `{logins: [], days: 7}`) |
| `/scanner/account/:login` | GET | Информация о счете |

## Алгоритм работы

```
1. SCHEDULER запускает скан (09:00 и 21:00)
   │
2. ├── Получить топ-100 прибыльных счетов (getWinnersLosers)
   │
3. ├── Для каждого счета из топ-30 Winners:
   │   │
   │   ├── Получить историю сделок за 7 дней
   │   │
   │   ├── Применить Rule-based фильтры:
   │   │   ├── checkWinRate()
   │   │   ├── checkLockPattern()
   │   │   ├── checkShortProfits()
   │   │   └── checkTPRate()
   │   │
   │   └── Если score >= 6:
   │       └── Добавить в подозрительные
   │
4. ├── Для подозрительных счетов (score >= 6):
   │   │
   │   └── AI Analysis (Gemini):
   │       ├── Передать историю сделок
   │       ├── Попросить определить паттерн
   │       └── Получить финальную оценку и рекомендацию
   │
5. └── Сгенерировать алерты:
       ├── Сохранить в хранилище алертов
       └── Отправить в активные сессии чат-бота
```

## Формат алерта в чате

```
⚠️ ОБНАРУЖЕНА АНОМАЛИЯ

Счет: 46259763 (Live, Mt4)
Группа: retail_ecn
Тип: Вероятный арбитраж

📊 Статистика за 7 дней:
- Сделок: 52
- Win Rate: 98%
- Средний профит: $1.85
- Среднее время: 25 мин
- Закрытий по TP: 96%

🔍 Обнаруженные паттерны:
1. Lock Pattern: 23 пары Buy+Sell с разницей < 5 сек
2. High Win Rate: 98% (норма: 40-60%)
3. Все сделки закрыты по TP

💡 AI-анализ:
Типичный паттерн арбитража на отставании котировок. 
Трейдер открывает лок, ждёт расхождения и закрывает 
профитную ногу. Рекомендация: перевести в A-Book или 
применить триггер Latency Arbitrage.

Risk Score: 9/10
```

## Файловая структура

```
ai-support-bot/
  backend/
    services/
      arbitrage-scanner.service.js   ← Детектор паттернов
      scheduler.service.js           ← Планировщик задач
      alert.service.js               ← Управление алертами
    routes/
      scanner.routes.js              ← API endpoints
```

## Конфигурация (.env)

```env
# Arbitrage Scanner
SCANNER_ENABLED=true
SCANNER_MORNING_HOUR=9
SCANNER_EVENING_HOUR=21
SCANNER_TOP_ACCOUNTS=30
SCANNER_MIN_RISK_SCORE=6
SCANNER_LOOKBACK_DAYS=7
```

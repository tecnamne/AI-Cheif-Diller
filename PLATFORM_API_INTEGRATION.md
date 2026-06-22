# Trading Platform API Integration - Документация для AI Bot

## 📌 Архитектура Backend API

Trading Platform использует **.NET Core Web API** с паттерном **Request/Response**.

### Base URL:
```
http://api.example.com/api
или
https://[broker-domain]/api
```

---

## 🔑 Формат запросов

Все запросы отправляются как **POST** с JSON body:

```http
POST /api
Content-Type: application/json

{
  "RequestId": "guid",
  "RequestName": "RequestTradeSessionAccountCurrentProfit",
  ...параметры запроса
}
```

---

## 📊 API Endpoints для AI Bot

### 1. **Получить текущее состояние счета**

**Request: `RequestTradeSessionAccountCurrentProfit`**

```json
POST /api

{
  "RequestId": "8338874f-25df-4aee-a6fb-808c700f2cb7",
  "RequestName": "RequestTradeSessionAccountCurrentProfit",
  "Login": 3002,
  "Nodes": [],
  "Reasons": []
}
```

**Response:**
```json
{
  "ResponseMaster": "ResponseTradeSessionAccountCurrentProfit",
  "RequestId": "8338874f-25df-4aee-a6fb-808c700f2cb7",
  "Nodes": [
    {
      "NodeId": "MT5IndigeSoft",
      "Login": 3002,
      "Currency": "USD",
      "AccountGroup": "develop1",
      "ABookSessionProfitInUsd": 19.00,
      "BBookSessionProfitInUsd": -0.893,
      "NetSessionProfitInUsd": 18.107,
      "NetSessionRealizedProfitInUsd": 150.50,
      "NetUnrealizedProfitInUsd": -132.393
    }
  ]
}
```

---

### 2. **Получить сделки счета за период**

**Request: `RequestTradeSessionAccountsProfitHistory`**

```json
POST /api

{
  "RequestId": "uuid",
  "RequestName": "RequestTradeSessionAccountsProfitHistory",
  "Logins": [3002],
  "Nodes": [],
  "StartDate": "2025-11-01T00:00:00Z",
  "EndDate": "2025-11-30T23:59:59Z"
}
```

**Response:**
```json
{
  "ResponseMaster": "ResponseTradeSessionAccountsProfitHistory",
  "Nodes": [
    {
      "NodeId": "MT5IndigeSoft",
      "Accounts": [
        {
          "Login": 3002,
          "History": [
            {
              "Timestamp": "2025-11-15T10:30:00Z",
              "Symbol": "EURUSD",
              "Volume": 1.5,
              "Profit": 150.00,
              "ProfitInUsd": 150.00
            }
          ]
        }
      ]
    }
  ]
}
```

---

### 3. **Получить информацию о счете (groups, settings)**

**Request: `RequestAccountsGroupsCustomSettings`**

```json
POST /api

{
  "RequestId": "uuid",
  "RequestName": "RequestAccountsGroupsCustomSettings",
  "Nodes": [],
  "TradeEnabled": true
}
```

**Response:**
```json
{
  "ResponseMaster": "ResponseAccountsGroupsCustomSettings",
  "Nodes": [
    {
      "NodeId": "MT5IndigeSoft",
      "AccountGroup": {
        "Name": "develop1",
        "Server": "MT5IndigeSoft"
      },
      "Symbols": [
        {
          "Symbol": "EURUSD",
          "TradeEnabled": true,
          "Leverage": 100
        }
      ]
    }
  ]
}
```

---

## 🔍 Найденные Request классы

Полный список запросов находится в:
```
platform-backend-demo\Bp.Domain\Bp.Requests.Contracts\Api\Requests\
```

### Для работы со счетами:

| Request Class | Описание | Что возвращает |
|---------------|----------|----------------|
| **RequestTradeSessionAccountCurrentProfit** | Текущая прибыль счета | Equity, P&L, баланс |
| **RequestTradeSessionAccountProfitHistory** | История прибыли счета | Почасовая статистика |
| **RequestTradeSessionAccountActiveSymbols** | Активные символы счета | Список торгуемых инструментов |
| **RequestTradeSessionAccountsProfitHistory** | История прибыли нескольких счетов | Массив историй |
| **RequestAccountsGroupsDetails** | Детали групп счетов | Настройки групп |
| **RequestAccountsTopByCategory** | Топ счетов по категориям | Рейтинг счетов |
| **RequestAccountsTopVolumes** | Топ счетов по объемам | Объемы торговли |
| **RequestAccountsTopTurnover** | Топ счетов по обороту | Оборот в USD |

---

## 🛠️ Интеграция в AI Bot

### Шаг 1: Создать Trading Platform API Service

```javascript
// ai-support-bot/backend/services/platform-api.service.js

const fetch = require('node-fetch');
const { v4: uuidv4 } = require('uuid');

class Trading PlatformAPIService {
    constructor() {
        this.baseUrl = process.env.PLATFORM_API_URL || 'http://api.example.com/api';
    }

    async makeRequest(requestName, params) {
        const requestBody = {
            RequestId: uuidv4(),
            RequestName: requestName,
            ...params
        };

        const response = await fetch(this.baseUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        return response.json();
    }

    // Получить текущее состояние счета
    async getAccountCurrentProfit(login) {
        return this.makeRequest('RequestTradeSessionAccountCurrentProfit', {
            Login: login,
            Nodes: [],
            Reasons: []
        });
    }

    // Получить сделки за период
    async getAccountTrades(login, startDate, endDate) {
        return this.makeRequest('RequestTradeSessionAccountsProfitHistory', {
            Logins: [login],
            Nodes: [],
            StartDate: startDate,
            EndDate: endDate
        });
    }

    // Получить активные символы
    async getAccountActiveSymbols(login) {
        return this.makeRequest('RequestTradeSessionAccountActiveSymbols', {
            Login: login,
            Nodes: []
        });
    }
}

module.exports = new Trading PlatformAPIService();
```

---

### Шаг 2: Gemini Function Calling

```javascript
// ai-support-bot/backend/services/gemini.service.js

const functions = [
    {
        name: 'getAccountInfo',
        description: 'Get current account information by login ID',
        parameters: {
            type: 'object',
            properties: {
                login: {
                    type: 'number',
                    description: 'Account login number (e.g., 3002, 490584)'
                }
            },
            required: ['login']
        }
    },
    {
        name: 'getAccountTrades',
        description: 'Get trading history for an account',
        parameters: {
            type: 'object',
            properties: {
                login: { type: 'number' },
                startDate: { type: 'string', format: 'date' },
                endDate: { type: 'string', format: 'date' }
            },
            required: ['login']
        }
    }
];

// В запросе к Gemini:
const requestBody = {
    contents: [{ parts: [{ text: fullPrompt }] }],
    tools: [{
        functionDeclarations: functions
    }]
};
```

---

### Шаг 3: Обработка Function Call

```javascript
// Если Gemini вернул functionCall
if (response.candidates[0].content.parts[0].functionCall) {
    const functionCall = response.candidates[0].content.parts[0].functionCall;
    
    let functionResult;
    
    switch (functionCall.name) {
        case 'getAccountInfo':
            functionResult = await brokerPilotAPI.getAccountCurrentProfit(
                functionCall.args.login
            );
            break;
            
        case 'getAccountTrades':
            functionResult = await brokerPilotAPI.getAccountTrades(
                functionCall.args.login,
                functionCall.args.startDate || getMonthStart(),
                functionCall.args.endDate || getTodayDate()
            );
            break;
    }
    
    // Отправить результат обратно в Gemini
    const followUpRequest = {
        contents: [
            { parts: [{ text: fullPrompt }] },
            { 
                parts: [{ 
                    functionResponse: {
                        name: functionCall.name,
                        response: functionResult
                    }
                }] 
            }
        ]
    };
    
    const finalResponse = await fetch(geminiUrl, { 
        method: 'POST',
        body: JSON.stringify(followUpRequest) 
    });
}
```

---

## 📋 Что нужно для запуска

### 1. Environment Variables (.env)

```env
# Trading Platform API
PLATFORM_API_URL=http://api.example.com/api

# Multi-tenant (если несколько брокеров)
TENANT_ID=broker-a

# Optional: API Key (если требуется авторизация)
PLATFORM_API_KEY=your_api_key
```

### 2. Тестовый доступ

**Нужно уточнить:**
- ✅ Требуется ли авторизация для `/api`?
- ✅ Есть ли API ключ для api.example.com?
- ✅ Какие Nodes доступны? (MT5IndigeSoft, CTrader, etc.)

---

## 🎯 Пример диалога после интеграции

**Пользователь:**  
> "Какие сделки совершал счет 3002 в ноябре?"

**Bot (внутренне):**
1. Gemini распознает: `getAccountTrades(login=3002, startDate="2025-11-01", endDate="2025-11-30")`
2. Backend вызывает `RequestTradeSessionAccountsProfitHistory`
3. Получает JSON с массивом сделок
4. Отправляет данные обратно в Gemini

**Bot (ответ пользователю):**
> "Счет **3002** совершил **47 сделок** в ноябре 2025:
> 
> - **EURUSD**: 25 сделок, прибыль +$1,250
> - **GBPUSD**: 12 сделок, убыток -$340  
> - **GOLD**: 10 сделок, прибыль +$500
> 
> **Общая прибыль**: +$1,410"

---

## 🔄 Multi-Tenant Architecture

Каждый брокер имеет свой API URL:

```javascript
const tenants = {
    'broker-a': {
        apiUrl: 'https://broker-a.example.com/api',
        nodes: ['MT5IndigeSoft']
    },
    'broker-b': {
        apiUrl: 'https://broker-b.example.com/api',
        nodes: ['CTrader', 'MT4']
    }
};

// В запросе виджета
<platform-chat-widget 
  api-url="http://localhost:3001"
  tenant-id="broker-a">
</platform-chat-widget>
```

---

## ✅ Next Steps

1. **Подтвердить доступ к API** api.example.com
2. **Протестировать запросы** через Postman/curl
3. **Создать platform-api.service.js**
4. **Настроить Function Calling** в gemini.service.js
5. **Добавить авторизацию** (если требуется)

**Готов начать с Proof of Concept?** 🚀

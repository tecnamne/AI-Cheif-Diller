/**
 * Function Calling definitions for Gemini AI
 * These functions describe available platform API operations
 */

const functionDeclarations = [
  {
    name: 'getAccountCurrentProfit',
    description: 'Get current session profit/loss for trading account (Unrealized P&L). Use for: "what is the profit", "account P&L", "какой профит у счета".',
    parameters: {
      type: 'object',
      properties: {
        login: { type: 'integer', description: 'Account login number' }
      },
      required: ['login']
    }
  },
  {
    name: 'getAccountProfitHistory',
    description: 'Get account PROFIT HISTORY for period. Use for: "profit history", "P&L trend", "история прибыли", "PnL за период", "прибыль за месяц", "прибыль за неделю", "profit for last month/week". Dates must be ISO 8601 format (YYYY-MM-DD). Bot MUST calculate dates from relative periods (e.g. "last week" = today - 7 days).',
    parameters: {
      type: 'object',
      properties: {
        login: { type: 'integer', description: 'Account login number' },
        startDate: { type: 'string', description: 'Start date ISO 8601' },
        endDate: { type: 'string', description: 'End date ISO 8601' }
      },
      required: ['login', 'startDate', 'endDate']
    }
  },
  {
    name: 'getAccountDetails',
    description: 'Get basic account information: Group, Balance, Equity, Leverage, Margin, Margin Level, Currency, Book, Node. Use for: "tell me about account", "какой баланс", "уровень маржи", "margin level", "какая маржа", "какое плечо".',
    parameters: {
      type: 'object',
      properties: {
        login: { type: 'integer', description: 'Account login number' }
      },
      required: ['login']
    }
  },
  {
    name: 'getAccountTrades',
    description: 'Get account TRADE HISTORY (closed orders). Use for: "trade history", "история сделок".',
    parameters: {
      type: 'object',
      properties: {
        login: { type: 'integer', description: 'Account login number' },
        startDate: { type: 'string', description: 'Start date (optional)' },
        endDate: { type: 'string', description: 'End date (optional)' }
      },
      required: ['login']
    }
  },
  {
    name: 'getAccountPositions',
    description: 'Get current OPEN POSITIONS for account with FULL DETAILS: Symbol, Type (Buy/Sell), Volume (Lots), Open Price, Current Price, Profit/Loss, Swap, Commission, Open Time. Use for: "open positions", "что торгует счет", "какие позиции", "what symbols are open", "show positions with P&L".',
    parameters: {
      type: 'object',
      properties: {
        login: { type: 'integer', description: 'Account login number' }
      },
      required: ['login']
    }
  },
  {
    name: 'analyzeAccount',
    description: 'COMPREHENSIVE account analysis - all data at once. Use for: "analyze account", "проанализируй счет".',
    parameters: {
      type: 'object',
      properties: {
        login: { type: 'integer', description: 'Account login number' }
      },
      required: ['login']
    }
  },
  {
    name: 'getAccountConnections',
    description: 'Get account CID and IP connections. Use for: "CID connections", "связанные счета".',
    parameters: {
      type: 'object',
      properties: {
        login: { type: 'integer', description: 'Account login number' }
      },
      required: ['login']
    }
  },
  {
    name: 'getAccountIssues',
    description: 'Get ALERTS and ISSUES history for account. Use for: "alerts on account", "какие алерты".',
    parameters: {
      type: 'object',
      properties: {
        login: { type: 'integer', description: 'Account login number' }
      },
      required: ['login']
    }
  },
  {
    name: 'getAccountTriggers',
    description: 'Get TRIGGERS monitoring specific account. Use for: "what triggers monitor account".',
    parameters: {
      type: 'object',
      properties: {
        login: { type: 'integer', description: 'Account login number' }
      },
      required: ['login']
    }
  },
  {
    name: 'getAccountTriggerStats',
    description: 'Get trigger statistics for account. Use for: "trigger stats", "статистика триггеров".',
    parameters: {
      type: 'object',
      properties: {
        login: { type: 'integer', description: 'Account login number' },
        days: { type: 'integer', description: 'Days to analyze (default 30)' }
      },
      required: ['login']
    }
  },
  {
    name: 'getAverageTradeTime',
    description: 'Calculate average trade duration for account. Use for: "average trade time", "среднее время сделок".',
    parameters: {
      type: 'object',
      properties: {
        login: { type: 'integer', description: 'Account login number' },
        days: { type: 'integer', description: 'Days to analyze (default 30)' }
      },
      required: ['login']
    }
  },
  {
    name: 'getTriggersSettings',
    description: 'Get list of ALL configured TRIGGERS. Use for: "list all triggers", "какие триггеры есть".',
    parameters: { type: 'object', properties: {}, required: [] }
  },
  {
    name: 'getTriggersActivity',
    description: 'Get current TRIGGERS ACTIVITY. Use for: "which triggers fired".',
    parameters: { type: 'object', properties: {}, required: [] }
  },
  {
    name: 'getABookSettings',
    description: 'Get A-BOOK routing settings. Use for: "is account in A-book".',
    parameters: {
      type: 'object',
      properties: {
        login: { type: 'integer', description: 'Account login (optional)' }
      },
      required: []
    }
  },
  {
    name: 'getAccountJournal',
    description: 'Get account change LOG / JOURNAL: leverage changes, group changes, admin actions, balance operations. Use for: "was leverage changed", "журнал счета", "лог счета", "account log", "changelog", "история изменений".',
    parameters: {
      type: 'object',
      properties: {
        login: { type: 'integer', description: 'Account login number' }
      },
      required: ['login']
    }
  },
  {
    name: 'getAccountExposure',
    description: 'Get account EXPOSURE by instruments. Use for: "account exposure", "экспозиция".',
    parameters: {
      type: 'object',
      properties: {
        login: { type: 'integer', description: 'Account login number' }
      },
      required: ['login']
    }
  },
  {
    name: 'getNetSummary',
    description: 'Get NET VOLUME by all INSTRUMENTS. Use for: "net volume", "чистый объем".',
    parameters: { type: 'object', properties: {}, required: [] }
  },
  {
    name: 'getAllOpenPositions',
    description: 'Get ALL OPEN POSITIONS across all accounts and nodes. Use for: "all open positions", "все открытые позиции".',
    parameters: {
      type: 'object',
      properties: {
        pageSize: { type: 'integer', description: 'Page size (default 100)' },
        pageNum: { type: 'integer', description: 'Page number (default 1)' }
      },
      required: []
    }
  },
  {
    name: 'getOpenPositionsSummary',
    description: 'Get summary of open positions (total positions, lots, profit, accounts).',
    parameters: { type: 'object', properties: {}, required: [] }
  },
  {
    name: 'getTriggerEventsHistory',
    description: 'Get trigger events history for period. Use for: "triggers fired last week", "какие триггеры срабатывали".',
    parameters: {
      type: 'object',
      properties: {
        days: { type: 'integer', description: 'Days to analyze (default 7)' },
        triggerTypes: { type: 'array', items: { type: 'string' }, description: 'Optional trigger type filter' }
      },
      required: []
    }
  },
  {
    name: 'getSessionPnLBySymbols',
    description: 'Get session P&L breakdown by instruments. Use for: "session P&L by instruments", "сессионный профит по инструментам".',
    parameters: {
      type: 'object',
      properties: {
        topN: { type: 'integer', description: 'Top symbols count (default 20)' }
      },
      required: []
    }
  },
  {
    name: 'getTradeSessionSummary',
    description: 'Get TRADE SESSION SUMMARY. Use for: "session summary", "итоги дня".',
    parameters: { type: 'object', properties: {}, required: [] }
  },
  {
    name: 'getWinnersLosers',
    description: 'Get TOP WINNERS and LOSERS with account list and summaries. Supports optional node filter. Use for: "top winners", "топ прибыльных", "прибыльные клиенты", "убыточные клиенты", "по серверу", "по странам среди топ клиентов" (aggregate by country when country field is present).',
    parameters: {
      type: 'object',
      properties: {
        top: { type: 'integer', description: 'Number of accounts (default 10)' },
        node: { type: 'string', description: 'Optional: filter by trading server/node name (e.g. "Neo", "MT5Demo")' }
      },
      required: []
    }
  },
  {
    name: 'getActiveIssues',
    description: 'Get ACTIVE (unread) ISSUES. Use for: "active alerts", "активные алерты".',
    parameters: { type: 'object', properties: {}, required: [] }
  },
  {
    name: 'getNodesInfo',
    description: 'Get info about trading NODES. Use for: "nodes info", "информация о нодах".',
    parameters: { type: 'object', properties: {}, required: [] }
  }
];

module.exports = { functionDeclarations };

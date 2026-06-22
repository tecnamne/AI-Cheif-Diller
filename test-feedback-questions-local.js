/**
 * Local regression check for broker feedback questions.
 *
 * This script does NOT call external services.
 * It mocks Backend Master API responses and runs question->function cases.
 *
 * Run:
 *   node test-feedback-questions-local.js
 */

process.env.ALLOWED_PERSONAL_FIELDS = process.env.ALLOWED_PERSONAL_FIELDS || 'name,country,email,city,phone,address,comment';
process.env.OPENAI_API_KEY = process.env.OPENAI_API_KEY || 'local-test-key';

const fs = require('fs');
const path = require('path');

const platformApi = require('./services/platform-api.service');
const geminiService = require('./services/gemini.service');
const { SYSTEM_PROMPT } = require('./prompts/system.prompt');

const connectionSetupPath = path.join(__dirname, 'docs', 'connection-setup.md');
const systemReqPath = path.join(__dirname, 'docs', 'system-requirements.md');

const connectionSetup = fs.existsSync(connectionSetupPath)
    ? fs.readFileSync(connectionSetupPath, 'utf-8')
    : '';
const systemRequirements = fs.existsSync(systemReqPath)
    ? fs.readFileSync(systemReqPath, 'utf-8')
    : '';

platformApi.findAccountNode = async (login) => {
    if (Number(login) === 902374 || Number(login) === 12345) return 'Neo';
    return 'Neo';
};

platformApi.executeRequest = async (requestName, params = {}) => {
    switch (requestName) {
        case 'RequestAccountTradeState':
            return {
                Result: [{
                    Node: 'Neo',
                    Platform: 'Mt5',
                    Result: {
                        Login: params.Login,
                        Group: 'real\\vip',
                        Platform: 'Mt5',
                        Currency: 'USD',
                        Balance: 12500.33,
                        Equity: 11980.12,
                        Credit: 0,
                        Margin: 3200.55,
                        MarginLevel: 374.31,
                        Leverage: 100,
                        Book: 'BBook',
                        Name: 'Ivan Petrov',
                        Country: 'Thailand',
                        Email: 'ivan.petrov@example.com',
                        City: 'Bangkok',
                        Phone: '+6600000000',
                        Address: 'Demo street 1',
                        Comment: 'VIP'
                    }
                }]
            };

        case 'RequestTradeSessionAccountCurrentProfit':
            return {
                Result: [{
                    Node: 'Neo',
                    Platform: 'Mt5',
                    Result: {
                        Login: params.Login,
                        ProfitInUsd: 126.56,
                        EquityInUsd: 11980.12
                    }
                }]
            };

        case 'RequestTradeSessionAccountsProfitHistory':
            return {
                Result: [{
                    Node: 'Neo',
                    Platform: 'Mt5',
                    Result: {
                        Page: [
                            { Date: '2026-03-01', Balance: 12000, Profit: 100, Equity: 12100, Deposit: 0, Withdrawal: 0 },
                            { Date: '2026-03-08', Balance: 12100, Profit: -40, Equity: 12060, Deposit: 0, Withdrawal: 0 },
                            { Date: '2026-03-15', Balance: 12060, Profit: 60, Equity: 12120, Deposit: 0, Withdrawal: 0 }
                        ],
                        TotalRecords: 3
                    }
                }]
            };

        case 'RequestAccountOpenedOrders':
            return {
                Result: [{
                    Node: 'Neo',
                    Platform: 'Mt5',
                    Result: {
                        Page: [
                            {
                                Order: 70001,
                                Symbol: 'XAUUSD',
                                Type: 'Buy',
                                Volume: 2.0,
                                OpenPrice: 2150.1,
                                CurrentPrice: 2158.8,
                                Profit: 87.2,
                                Swap: -1.2,
                                Commission: -3.5,
                                OpenTime: '2026-04-02T10:00:00Z'
                            },
                            {
                                Order: 70002,
                                Symbol: 'EURUSD',
                                Type: 'Sell',
                                Volume: 1.5,
                                OpenPrice: 1.0912,
                                CurrentPrice: 1.0899,
                                Profit: 19.5,
                                Swap: -0.3,
                                Commission: -2.0,
                                OpenTime: '2026-04-02T11:00:00Z'
                            }
                        ],
                        TotalRecords: 2
                    }
                }]
            };

        case 'RequestAccountHistory':
            return {
                Result: [{
                    Node: 'Neo',
                    Platform: 'Mt5',
                    Result: {
                        Page: [
                            {
                                Order: 60001,
                                Symbol: 'EURUSD',
                                Type: 'Buy',
                                Volume: 1.0,
                                OpenTime: '2026-03-10T08:00:00Z',
                                CloseTime: '2026-03-10T10:30:00Z',
                                Profit: 21.3
                            },
                            {
                                Order: 60002,
                                Symbol: 'GBPUSD',
                                Type: 'Sell',
                                Volume: 1.2,
                                OpenTime: '2026-03-12T09:00:00Z',
                                CloseTime: '2026-03-12T12:00:00Z',
                                Profit: -14.8
                            }
                        ],
                        TotalRecords: 2
                    }
                }]
            };

        case 'RequestTradeSessionRealizedOrders':
            return {
                Result: {
                    Page: [
                        { Symbol: 'XAUUSD', Profit: 120, Volume: 1.2 },
                        { Symbol: 'XAUUSD', Profit: -45, Volume: 0.8 },
                        { Symbol: 'EURUSD', Profit: 65, Volume: 1.0 },
                        { Symbol: 'GBPJPY', Profit: -20, Volume: 0.5 }
                    ],
                    TotalRecords: 4
                }
            };

        case 'RequestWinnersLosers':
            return {
                Result: [
                    {
                        Node: 'Neo',
                        Platform: 'Mt5',
                        Result: {
                            Winners: [
                                {
                                    Login: 100011,
                                    Name: 'Alpha One',
                                    Country: 'Thailand',
                                    Lots: 12.5,
                                    EquityInUsd: 15000,
                                    SessionProfitInUsd: 350,
                                    SessionRealizedProfitInUsd: 300,
                                    TotalProfitInUsd: 9200
                                },
                                {
                                    Login: 100012,
                                    Name: 'Alpha Two',
                                    Country: 'Vietnam',
                                    Lots: 10.3,
                                    EquityInUsd: 13200,
                                    SessionProfitInUsd: 270,
                                    SessionRealizedProfitInUsd: 250,
                                    TotalProfitInUsd: 8700
                                }
                            ],
                            Losers: [
                                {
                                    Login: 100021,
                                    Name: 'Beta One',
                                    Country: 'Thailand',
                                    Lots: 9.8,
                                    EquityInUsd: 8900,
                                    SessionProfitInUsd: -310,
                                    SessionRealizedProfitInUsd: -280,
                                    TotalProfitInUsd: -4300
                                }
                            ],
                            WinnersSummary: {
                                Accounts: 2,
                                EquitiesInUsd: 28200,
                                Lots: 22.8,
                                NetUnrealizedProfitInUsd: 40,
                                TotalSessionProfitInUsd: 620,
                                TotalSessionRealizedProfitInUsd: 550,
                                TotalProfitInUsd: 17900,
                                TimePeriod: 'session'
                            },
                            LosersSummary: {
                                Accounts: 1,
                                EquitiesInUsd: 8900,
                                Lots: 9.8,
                                NetUnrealizedProfitInUsd: -30,
                                TotalSessionProfitInUsd: -310,
                                TotalSessionRealizedProfitInUsd: -280,
                                TotalProfitInUsd: -4300,
                                TimePeriod: 'session'
                            }
                        }
                    }
                ]
            };

        case 'RequestAccountExposure':
            return {
                Result: [{
                    Node: 'Neo',
                    Platform: 'Mt5',
                    Result: {
                        Page: [
                            {
                                Symbol: 'XAUUSD',
                                LongVolume: 2.0,
                                ShortVolume: 0.5,
                                LongExposure: 420000,
                                ShortExposure: 105000,
                                Profit: 87.2
                            },
                            {
                                Symbol: 'EURUSD',
                                LongVolume: 0.2,
                                ShortVolume: 1.1,
                                LongExposure: 22000,
                                ShortExposure: 121000,
                                Profit: 19.5
                            }
                        ],
                        TotalRecords: 2
                    }
                }]
            };

        case 'RequestAccountJournal':
            return {
                Result: [{
                    Node: 'Neo',
                    Platform: 'Mt5',
                    Result: {
                        Page: [
                            {
                                Time: '2026-03-10T07:55:00Z',
                                Action: 'LeverageChanged',
                                Field: 'Leverage',
                                OldValue: '1:50',
                                NewValue: '1:100',
                                User: 'manager',
                                Comment: 'Risk profile updated'
                            },
                            {
                                Time: '2026-03-11T09:15:00Z',
                                Action: 'GroupChanged',
                                Field: 'Group',
                                OldValue: 'real\\standard',
                                NewValue: 'real\\vip',
                                User: 'manager'
                            }
                        ],
                        TotalRecords: 2
                    }
                }]
            };

        case 'RequestTriggersSettings':
            return {
                Result: [
                    {
                        Node: 'Neo',
                        Platform: 'Mt5',
                        Result: [
                            {
                                RuleName: 'Net Dynamic Leverage',
                                TriggerType: 'HedgeTriggerMarginLevel',
                                Enabled: false,
                                State: 'Locked',
                                Accounts: { Included: [], Excluded: [] },
                                AccountsGroups: { Included: [], Excluded: [] },
                                Description: 'Locked for broker plan'
                            },
                            {
                                RuleName: 'Stop Out Guard',
                                TriggerType: 'TriggerStopOut',
                                Enabled: false,
                                State: 'Inactive',
                                Accounts: { Included: [], Excluded: [] },
                                AccountsGroups: { Included: [], Excluded: [] },
                                Description: 'Can be enabled in settings'
                            }
                        ]
                    }
                ]
            };

        default:
            return { Result: [] };
    }
};

const docCases = [
    {
        id: 'CS-1',
        question: 'РљР°Рє РїРѕРґРєР»СЋС‡РёС‚СЊ platform Рє MT4/MT5?',
        check: () => ({
            source: 'docs/connection-setup.md',
            hasAnswer: /MT4/i.test(connectionSetup) && /MT5/i.test(connectionSetup)
        })
    },
    {
        id: 'CS-2',
        question: 'РљР°Рє РїРѕРґРєР»СЋС‡РёС‚СЊ platform Рє cTrader?',
        check: () => ({
            source: 'docs/connection-setup.md',
            hasAnswer: /cTrader/i.test(connectionSetup)
        })
    },
    {
        id: 'CS-3',
        question: 'РљР°РєРёРµ API credentials РЅСѓР¶РЅС‹ РґР»СЏ РїРѕРґРєР»СЋС‡РµРЅРёСЏ?',
        check: () => ({
            source: 'docs/connection-setup.md',
            hasAnswer: /Manager API/i.test(connectionSetup)
        })
    },
    {
        id: 'CS-4',
        question: 'РЎРєРѕР»СЊРєРѕ РІСЂРµРјРµРЅРё Р·Р°РЅРёРјР°РµС‚ РїРѕРґРєР»СЋС‡РµРЅРёРµ Рє С‚РѕСЂРіРѕРІРѕРјСѓ СЃРµСЂРІРµСЂСѓ?',
        check: () => ({
            source: 'docs/connection-setup.md',
            hasAnswer: /1.?2/i.test(connectionSetup)
        })
    },
    {
        id: 'CS-5',
        question: 'РњРѕР¶РЅРѕ Р»Рё РїРѕРґРєР»СЋС‡РёС‚СЊ РЅРµСЃРєРѕР»СЊРєРѕ С‚РѕСЂРіРѕРІС‹С… СЃРµСЂРІРµСЂРѕРІ РѕРґРЅРѕРІСЂРµРјРµРЅРЅРѕ?',
        check: () => ({
            source: 'docs/connection-setup.md',
            hasAnswer: /РЅРµСЃРєРѕР»СЊРє/i.test(connectionSetup) || /multiple/i.test(connectionSetup)
        })
    },
    {
        id: 'CS-6',
        question: 'РќСѓР¶РЅРѕ Р»Рё СѓСЃС‚Р°РЅР°РІР»РёРІР°С‚СЊ РїР»Р°РіРёРЅС‹ РЅР° MT4/MT5 СЃРµСЂРІРµСЂ?',
        check: () => ({
            source: 'docs/connection-setup.md',
            hasAnswer: /РїР»Р°РіРёРЅ/i.test(connectionSetup) && /Dynamic Leverage/i.test(connectionSetup),
            noEmployeeNames: !/(Р—РµР»РµРЅРѕРІ|Р”РѕР»РіРѕРІ|РџРѕРјРёРЅРѕРІ|Zelenov)/i.test(connectionSetup)
        })
    },
    {
        id: 'CS-7',
        question: 'Should I install plugins to my MT4/MT5 servers?',
        check: () => ({
            source: 'docs/connection-setup.md',
            hasAnswer: /plugin|РїР»Р°РіРёРЅ/i.test(connectionSetup),
            noEmployeeNames: !/(Р—РµР»РµРЅРѕРІ|Р”РѕР»РіРѕРІ|РџРѕРјРёРЅРѕРІ|Zelenov)/i.test(connectionSetup)
        })
    },
    {
        id: 'CS-8',
        question: 'РљР°РєРёРµ СЃРёСЃС‚РµРјРЅС‹Рµ С‚СЂРµР±РѕРІР°РЅРёСЏ РґР»СЏ СЂР°Р±РѕС‚С‹ platform?',
        check: () => ({
            source: 'docs/system-requirements.md',
            hasAnswer: systemRequirements.length > 0
        })
    },
    {
        id: 'CS-9',
        question: 'Р§С‚Рѕ РґРµР»Р°С‚СЊ, РµСЃР»Рё СЃРѕРµРґРёРЅРµРЅРёРµ СЃ С‚РѕСЂРіРѕРІС‹Рј СЃРµСЂРІРµСЂРѕРј РїСЂРµСЂРІР°Р»РѕСЃСЊ?',
        check: () => ({
            source: 'docs/connection-setup.md',
            hasAnswer: /(РїСЂРµСЂРІР°Р»|РѕР±СЂС‹РІ|support|РїРѕРґРґРµСЂР¶Рє)/i.test(connectionSetup),
            noEmployeeNames: !/(Р—РµР»РµРЅРѕРІ|Р”РѕР»РіРѕРІ|РџРѕРјРёРЅРѕРІ|Zelenov)/i.test(connectionSetup)
        })
    },
    {
        id: 'CS-10',
        question: 'Р§С‚Рѕ РґРµР»Р°С‚СЊ РµСЃР»Рё С‚СЂРёРіРіРµСЂ Р·Р°Р±Р»РѕРєРёСЂРѕРІР°РЅ?',
        check: () => ({
            source: 'prompts/system.prompt.js',
            hasAnswer: /LOCKED vs INACTIVE/i.test(SYSTEM_PROMPT) && /Customer Success/i.test(SYSTEM_PROMPT)
        })
    }
];

const functionCases = [
    {
        id: 'N-1',
        question: 'РљР°РєРѕР№ СѓСЂРѕРІРµРЅСЊ РјР°СЂР¶Рё Сѓ РєР»РёРµРЅС‚Р° 902374?',
        run: async () => platformApi.getAccountDetails(902374)
    },
    {
        id: 'N-2',
        question: 'РР· РєР°РєРёС… СЃС‚СЂР°РЅ С‚РѕСЂРіСѓСЋС‚ РєР»РёРµРЅС‚С‹ СЃ СЃР°РјС‹РјРё Р±РѕР»СЊС€РёРјРё РѕР±СЉРµРјР°РјРё? РџРѕ СѓР±С‹РІР°РЅРёСЋ',
        run: async () => platformApi.getWinnersLosers(10, 'Neo')
    },
    {
        id: 'N-3',
        question: 'Р”Р°РЅРЅС‹Рµ trade server NEO РЅР° СЃРµР№С‡Р°СЃ',
        run: async () => platformApi.getWinnersLosers(10, 'Neo')
    },
    {
        id: 'N-4',
        question: 'Р”Р°Р№ Session PnL РЅР° С‚РµРєСѓС‰РёР№ РјРѕРјРµРЅС‚',
        run: async () => platformApi.getSessionPnLBySymbols(20)
    },
    {
        id: 'N-5a',
        question: 'РљР°РєРѕР№ PnL РєР»РёРµРЅС‚Р° 902374 Р·Р° РїРµСЂРёРѕРґ 01.03.2026 вЂ” 15.03.2026?',
        run: async () => platformApi.getAccountProfitHistory(902374, '01.03.2026', '15.03.2026')
    },
    {
        id: 'N-5b',
        question: 'Р”Р°Р№ РїРѕР¶Р°Р»СѓР№СЃС‚Р° Р¤РРћ СЌС‚РѕРіРѕ РєР»РёРµРЅС‚Р°',
        run: async () => platformApi.getAccountDetails(902374)
    },
    {
        id: 'N-6',
        question: 'Р”Р°Р№ СЃРїРёСЃРѕРє РІСЃРµС… РїСЂРёР±С‹Р»СЊРЅС‹С… РєР»РёРµРЅС‚РѕРІ РЅР° СЃРµР№С‡Р°СЃ РїРѕ СЃРµСЂРІРµСЂСѓ Neo',
        run: async () => platformApi.getWinnersLosers(10, 'Neo')
    },
    {
        id: 'IUX-1',
        question: 'What is the balance and equity for account 12345?',
        run: async () => platformApi.getAccountDetails(12345)
    },
    {
        id: 'IUX-2',
        question: 'What is the current P&L for account 12345?',
        run: async () => platformApi.getAccountCurrentProfit(12345)
    },
    {
        id: 'IUX-3',
        question: 'Show the profit of account 12345 for the last month',
        run: async () => platformApi.getAccountProfitHistory(12345, '2026-03-01', '2026-03-31')
    },
    {
        id: 'IUX-4',
        question: 'Show open positions for account 12345',
        run: async () => platformApi.getAccountPositions(12345)
    },
    {
        id: 'IUX-5a',
        question: 'Show exposure for account 12345',
        run: async () => platformApi.getAccountExposure(12345)
    },
    {
        id: 'IUX-5b',
        question: 'Show account log/changelog for account 12345',
        run: async () => platformApi.getAccountJournal(12345)
    },
    {
        id: 'IUX-5c',
        question: 'What is the average position holding time for 12345?',
        run: async () => platformApi.getAverageTradeTime(12345, 30)
    },
    {
        id: 'T-LOCKED',
        question: 'Сѓ РјРµРЅСЏ Р·Р°Р±Р»РѕРєРёСЂРѕРІР°РЅ С‚СЂРёРіРіРµСЂ Net Dynamic Leverage. РєР°Рє РѕС‚РєСЂС‹С‚СЊ РµРіРѕ?',
        run: async () => platformApi.getAccountTriggers(902374)
    }
];

function clip(value, maxLen = 1200) {
    const str = JSON.stringify(value, null, 2);
    if (str.length <= maxLen) return str;
    return `${str.slice(0, maxLen)}\n... [truncated ${str.length - maxLen} chars]`;
}

async function run() {
    const report = {
        generatedAt: new Date().toISOString(),
        docs: [],
        functions: []
    };

    for (const c of docCases) {
        const details = c.check();
        report.docs.push({ id: c.id, question: c.question, details });
    }

    for (const c of functionCases) {
        try {
            const raw = await c.run();
            const optimized = geminiService._optimizeResultForAI(raw);

            report.functions.push({
                id: c.id,
                question: c.question,
                raw,
                optimized
            });
        } catch (error) {
            report.functions.push({
                id: c.id,
                question: c.question,
                error: error.message
            });
        }
    }

    console.log('=== LOCAL FEEDBACK QUESTION CHECK ===');
    console.log(`Generated: ${report.generatedAt}`);
    console.log('');

    console.log('--- Documentation / Prompt Cases ---');
    for (const item of report.docs) {
        console.log(`\n[${item.id}] ${item.question}`);
        console.log(clip(item.details, 500));
    }

    console.log('\n--- Function-backed Cases (raw + optimized) ---');
    for (const item of report.functions) {
        console.log(`\n[${item.id}] ${item.question}`);
        if (item.error) {
            console.log(`ERROR: ${item.error}`);
            continue;
        }
        console.log('RAW:');
        console.log(clip(item.raw));
        console.log('OPTIMIZED:');
        console.log(clip(item.optimized));
    }

    const outPath = path.join(__dirname, 'feedback-local-check-output.json');
    fs.writeFileSync(outPath, JSON.stringify(report, null, 2), 'utf-8');
    console.log(`\nSaved full report: ${outPath}`);
}

run().catch((e) => {
    console.error('Local feedback check failed:', e);
    process.exit(1);
});


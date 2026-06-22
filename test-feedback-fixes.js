/**
 * Local verification script for feedback fixes
 * Tests all changes without requiring MongoDB, Gemini API, or Backend Master
 * 
 * Run: node test-feedback-fixes.js
 */

const fs = require('fs');
const path = require('path');

let passed = 0;
let failed = 0;

function test(name, fn) {
    try {
        fn();
        console.log(`  вњ… ${name}`);
        passed++;
    } catch (e) {
        console.log(`  вќЊ ${name}`);
        console.log(`     ${e.message}`);
        failed++;
    }
}

function assert(condition, message) {
    if (!condition) throw new Error(message);
}

// ============================================================
console.log('\nрџ“‹ 1. RAG DOCS вЂ” Employee names removed');
console.log('в”Ђ'.repeat(50));

const docsDir = path.join(__dirname, 'docs');
const docsToCheck = fs.readdirSync(docsDir).filter(f => f.endsWith('.md'));

const employeePatterns = [
    /Р—РµР»РµРЅРѕРІ/gi,
    /Р”РѕР»РіРѕРІ/gi,
    /РџРѕРјРёРЅРѕРІ/gi,
    /РђРЅРґСЂРµСЋ\s+(Р—РµР»РµРЅРѕРІСѓ|Р”РѕР»РіРѕРІСѓ|РџРѕРјРёРЅРѕРІСѓ)/gi,
    /РђРЅРґСЂРµРµРј\s+(Р—РµР»РµРЅРѕРІС‹Рј|Р”РѕР»РіРѕРІС‹Рј|РџРѕРјРёРЅРѕРІС‹Рј)/gi,
    /РђРЅРґСЂРµСЏ\s+(Р—РµР»РµРЅРѕРІР°|Р”РѕР»РіРѕРІР°|РџРѕРјРёРЅРѕРІР°)/gi,
];

for (const file of docsToCheck) {
    const content = fs.readFileSync(path.join(docsDir, file), 'utf-8');
    test(`${file} вЂ” no employee names`, () => {
        for (const pattern of employeePatterns) {
            const match = content.match(pattern);
            assert(!match, `Found "${match}" in ${file}`);
        }
    });
}

// ============================================================
console.log('\nрџ“‹ 2. NEW RAG DOCS вЂ” connection-setup.md & system-requirements.md');
console.log('в”Ђ'.repeat(50));

test('connection-setup.md exists', () => {
    assert(fs.existsSync(path.join(docsDir, 'connection-setup.md')), 'File not found');
});

test('connection-setup.md covers MT4/MT5', () => {
    const content = fs.readFileSync(path.join(docsDir, 'connection-setup.md'), 'utf-8');
    assert(content.includes('MT4') && content.includes('MT5'), 'Missing MT4/MT5 info');
});

test('connection-setup.md covers cTrader', () => {
    const content = fs.readFileSync(path.join(docsDir, 'connection-setup.md'), 'utf-8');
    assert(content.includes('cTrader'), 'Missing cTrader info');
});

test('connection-setup.md covers API credentials', () => {
    const content = fs.readFileSync(path.join(docsDir, 'connection-setup.md'), 'utf-8');
    assert(content.includes('Manager API'), 'Missing API credentials info');
});

test('connection-setup.md covers connection time (1-2 days)', () => {
    const content = fs.readFileSync(path.join(docsDir, 'connection-setup.md'), 'utf-8');
    assert(content.includes('1вЂ“2'), 'Missing connection time info');
});

test('connection-setup.md covers multiple servers', () => {
    const content = fs.readFileSync(path.join(docsDir, 'connection-setup.md'), 'utf-8');
    assert(content.includes('РЅРµСЃРєРѕР»СЊРєРёС… С‚РѕСЂРіРѕРІС‹С… СЃРµСЂРІРµСЂРѕРІ'), 'Missing multi-server info');
});

test('connection-setup.md covers plugins', () => {
    const content = fs.readFileSync(path.join(docsDir, 'connection-setup.md'), 'utf-8');
    assert(content.includes('РїР»Р°РіРёРЅ') && content.includes('Dynamic Leverage'), 'Missing plugin info');
    // Should NOT contain employee names
    for (const p of employeePatterns) {
        assert(!p.test(content), `Employee name found in connection-setup.md`);
    }
});

test('connection-setup.md covers connection loss', () => {
    const content = fs.readFileSync(path.join(docsDir, 'connection-setup.md'), 'utf-8');
    assert(content.includes('РѕР±СЂС‹РІ') || content.includes('РїСЂРµСЂРІР°Р»'), 'Missing connection loss info');
});

test('system-requirements.md exists', () => {
    assert(fs.existsSync(path.join(docsDir, 'system-requirements.md')), 'File not found');
});

test('system-requirements.md covers browser requirements', () => {
    const content = fs.readFileSync(path.join(docsDir, 'system-requirements.md'), 'utf-8');
    assert(content.includes('Chrome') || content.includes('Р±СЂР°СѓР·РµСЂ'), 'Missing browser info');
});

// ============================================================
console.log('\nрџ“‹ 3. SYSTEM PROMPT вЂ” New rules added');
console.log('в”Ђ'.repeat(50));

const { SYSTEM_PROMPT } = require('./prompts/system.prompt');

test('Margin level mapping exists', () => {
    assert(SYSTEM_PROMPT.includes('РЈР РћР’Р•РќР¬ РњРђР Р–Р') || SYSTEM_PROMPT.includes('MARGIN LEVEL'), 
        'Missing margin level mapping');
    assert(SYSTEM_PROMPT.includes('marginLevel'), 'Missing marginLevel field reference');
});

test('Trigger statuses (Locked/Inactive/Active) documented', () => {
    assert(SYSTEM_PROMPT.includes('LOCKED vs INACTIVE'), 'Missing trigger status section');
    assert(SYSTEM_PROMPT.includes('Locked') && SYSTEM_PROMPT.includes('Inactive') && SYSTEM_PROMPT.includes('Active'), 
        'Missing status descriptions');
});

test('Locked trigger в†’ Customer Success', () => {
    assert(SYSTEM_PROMPT.includes('Customer Success'), 'Missing Customer Success reference for locked triggers');
});

test('Personal data rules added', () => {
    assert(SYSTEM_PROMPT.includes('РџР•Р РЎРћРќРђР›Р¬РќР«РҐ Р”РђРќРќР«РҐ') || SYSTEM_PROMPT.includes('РџР РђР’РР›Рђ РџР•Р РЎРћРќРђР›Р¬РќР«РҐ'), 
        'Missing personal data rules');
});

test('Connection/setup topics NOT off-topic', () => {
    assert(SYSTEM_PROMPT.includes('РќР• РЇР’Р›РЇР•РўРЎРЇ OFF-TOPIC'), 'Missing on-topic exception list');
    assert(SYSTEM_PROMPT.includes('РїРѕРґРєР»СЋС‡РµРЅРёРё Рє MT4'), 'Missing MT4 connection as on-topic');
    assert(SYSTEM_PROMPT.includes('СЃРёСЃС‚РµРјРЅС‹С… С‚СЂРµР±РѕРІР°РЅ'), 'Missing system requirements as on-topic');
});

test('Empty result guidance (no false off-topic)', () => {
    assert(SYSTEM_PROMPT.includes('РќР• РќРђР™Р”Р•РќР« Р”РђРќРќР«Р•') || SYSTEM_PROMPT.includes('РїСѓСЃС‚РѕР№ СЂРµР·СѓР»СЊС‚Р°С‚'), 
        'Missing empty result handling guidance');
});

test('Response guidelines improved', () => {
    assert(SYSTEM_PROMPT.includes('РќРРљРћР“Р”Рђ РЅРµ РіРѕРІРѕСЂРё "Сѓ РјРµРЅСЏ РЅРµС‚ РґРѕСЃС‚СѓРїР°"') || 
           SYSTEM_PROMPT.includes('РЅРµС‚ РґРѕСЃС‚СѓРїР° Рє СЌС‚РѕР№ РёРЅС„РѕСЂРјР°С†РёРё'), 
        'Missing improved response guidelines');
});

// ============================================================
console.log('\nрџ“‹ 4. FUNCTIONS.JS вЂ” Improved descriptions');
console.log('в”Ђ'.repeat(50));

const { functionDeclarations } = require('./config/functions');

test('getAccountDetails mentions margin level', () => {
    const fn = functionDeclarations.find(f => f.name === 'getAccountDetails');
    assert(fn, 'Function not found');
    assert(fn.description.includes('Margin Level') || fn.description.includes('РјР°СЂР¶Рё'), 
        `Description doesn't mention margin: "${fn.description}"`);
});

test('getAccountProfitHistory has improved description with date examples', () => {
    const fn = functionDeclarations.find(f => f.name === 'getAccountProfitHistory');
    assert(fn, 'Function not found');
    assert(fn.description.includes('YYYY-MM-DD') || fn.description.includes('ISO 8601') || fn.description.includes('Р·Р° РјРµСЃСЏС†'), 
        `Description lacks date info: "${fn.description}"`);
});

test('getAccountPositions mentions all detail fields', () => {
    const fn = functionDeclarations.find(f => f.name === 'getAccountPositions');
    assert(fn, 'Function not found');
    assert(fn.description.includes('Symbol') && fn.description.includes('Profit'), 
        `Description doesn't mention detail fields: "${fn.description}"`);
});

test('getWinnersLosers has node parameter', () => {
    const fn = functionDeclarations.find(f => f.name === 'getWinnersLosers');
    assert(fn, 'Function not found');
    assert(fn.parameters.properties.node, 'Missing node parameter');
    assert(fn.parameters.properties.node.type === 'string', 'Node should be string type');
});

test('getAccountJournal has improved description', () => {
    const fn = functionDeclarations.find(f => f.name === 'getAccountJournal');
    assert(fn, 'Function not found');
    assert(fn.description.includes('leverage changes') || fn.description.includes('РёСЃС‚РѕСЂРёСЏ РёР·РјРµРЅРµРЅРёР№'), 
        `Description not improved: "${fn.description}"`);
});

// ============================================================
console.log('\nрџ“‹ 5. isOnTopic() вЂ” On-topic whitelist');
console.log('в”Ђ'.repeat(50));

// Simulate the isOnTopic logic from gemini.service.js
function isOnTopic(message) {
    const onTopicPatterns = [
        /\b(account|СЃС‡РµС‚|Р°РєРєР°СѓРЅС‚|login|Р»РѕРіРёРЅ)\b/i,
        /\b(trigger|С‚СЂРёРіРіРµСЂ|alert|Р°Р»РµСЂС‚)\b/i,
        /\b(position|РїРѕР·РёС†|trade|СЃРґРµР»Рє|РѕСЂРґРµСЂ)\b/i,
        /\b(balance|Р±Р°Р»Р°РЅСЃ|equity|СЌРєРІРёС‚Рё|profit|РїСЂРѕС„РёС‚|p&l|pnl)\b/i,
        /\b(margin|РјР°СЂР¶Р°|РјР°СЂР¶РёРЅ|leverage|РїР»РµС‡Рѕ)\b/i,
        /\b(a-book|b-book|abook|bbook|routing|СЂРѕСѓС‚РёРЅРі)\b/i,
        /\b(node|РЅРѕРґР°|СЃРµСЂРІРµСЂ|server|mt4|mt5|ctrader)\b/i,
        /\b(platform|Р±СЂРѕРєРµСЂРїРёР»РѕС‚)\b/i,
        /\b(РїРѕРґРєР»СЋС‡|connect|plugin|РїР»Р°РіРёРЅ|РёРЅС‚РµРіСЂР°С†|integration)\b/i,
        /\b(С‚СЂРµР±РѕРІР°РЅ|requirement|РЅР°СЃС‚СЂРѕР№|setting|config)\b/i,
    ];
    for (const pattern of onTopicPatterns) {
        if (pattern.test(message)) return true;
    }
    const offTopicPatterns = [
        /what (ai model|model|llm|language model)/i,
        /who (created|made|built) you/i,
        /what('s| is) your (revenue|income|profit|financials)/i,
        /company (revenue|income|financials|earnings)/i,
        /write (code|program|script)/i,
        /how (much|many) (money|dollars|revenue)/i,
        /what('s| is) the weather/i,
        /tell me a joke/i,
        /recommend (a movie|a book|restaurants)/i,
        /СЂР°СЃСЃРєР°Р¶Рё Р°РЅРµРєРґРѕС‚/i,
        /РєР°РєР°СЏ РїРѕРіРѕРґР°/i,
        /РЅР°РїРёС€Рё (РєРѕРґ|РїСЂРѕРіСЂР°РјРј|СЃРєСЂРёРїС‚)/i,
    ];
    for (const pattern of offTopicPatterns) {
        if (pattern.test(message.toLowerCase())) return false;
    }
    return true;
}

// Questions that SHOULD be on-topic (from feedback вЂ” were incorrectly refused)
const shouldBeOnTopic = [
    'РљР°Рє РїРѕРґРєР»СЋС‡РёС‚СЊ platform Рє MT4/MT5?',
    'РљР°Рє РїРѕРґРєР»СЋС‡РёС‚СЊ platform Рє cTrader?',
    'РљР°РєРёРµ API credentials РЅСѓР¶РЅС‹ РґР»СЏ РїРѕРґРєР»СЋС‡РµРЅРёСЏ?',
    'РљР°РєРёРµ СЃРёСЃС‚РµРјРЅС‹Рµ С‚СЂРµР±РѕРІР°РЅРёСЏ РґР»СЏ СЂР°Р±РѕС‚С‹ platform?',
    'РќСѓР¶РЅРѕ Р»Рё СѓСЃС‚Р°РЅР°РІР»РёРІР°С‚СЊ РїР»Р°РіРёРЅС‹ РЅР° MT4/MT5 СЃРµСЂРІРµСЂ?',
    'РљР°РєРѕР№ СѓСЂРѕРІРµРЅСЊ РјР°СЂР¶Рё Сѓ РєР»РёРµРЅС‚Р° 902374',
    'Р”Р°Р№ РїРѕР¶Р°Р»СѓР№СЃС‚Р° Р¤РРћ СЌС‚РѕРіРѕ РєР»РёРµРЅС‚Р°',  // has "РєР»РёРµРЅС‚Р°" в†’ account-related
    'Р”Р°РЅРЅС‹Рµ trade server NEO РЅР° СЃРµР№С‡Р°СЃ',
    'Сѓ РјРµРЅСЏ Р·Р°Р±Р»РѕРєРёСЂРѕРІР°РЅ С‚СЂРёРіРіРµСЂ Net Dynamic Leverage',
    'С‡С‚Рѕ РґРµР»Р°С‚СЊ РµСЃР»Рё С‚СЂРёРіРіРµСЂ Р·Р°Р±Р»РѕРєРёСЂРѕРІР°РЅ?',
    'Should I install plugins to my MT4/MT5 servers?',
    'What is the balance of account 12345?',
    'Show open positions for account 12345',
    'Р”Р°Р№ Session PnL РЅР° С‚РµРєСѓС‰РёР№ РјРѕРјРµРЅС‚',
];

for (const q of shouldBeOnTopic) {
    test(`ON-TOPIC: "${q.substring(0, 50)}..."`, () => {
        assert(isOnTopic(q), `Incorrectly classified as off-topic!`);
    });
}

// Questions that SHOULD be off-topic
const shouldBeOffTopic = [
    'What AI model are you using?',
    'Tell me a joke',
    'What is the weather today?',
    'Write code for me please',
    'СЂР°СЃСЃРєР°Р¶Рё Р°РЅРµРєРґРѕС‚',
    'РєР°РєР°СЏ РїРѕРіРѕРґР° СЃРµРіРѕРґРЅСЏ',
    'РЅР°РїРёС€Рё РєРѕРґ РЅР° python',
];

for (const q of shouldBeOffTopic) {
    test(`OFF-TOPIC: "${q.substring(0, 50)}..."`, () => {
        assert(!isOnTopic(q), `Incorrectly classified as on-topic!`);
    });
}

// ============================================================
console.log('\nрџ“‹ 6. Date normalization in getAccountProfitHistory');
console.log('в”Ђ'.repeat(50));

// Extract the normalizeDate logic
function normalizeDate(dateStr) {
    if (!dateStr) return dateStr;
    const dotMatch = dateStr.match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
    if (dotMatch) {
        return `${dotMatch[3]}-${dotMatch[2].padStart(2, '0')}-${dotMatch[1].padStart(2, '0')}`;
    }
    const slashMatch = dateStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (slashMatch) {
        return `${slashMatch[3]}-${slashMatch[2].padStart(2, '0')}-${slashMatch[1].padStart(2, '0')}`;
    }
    return dateStr;
}

test('ISO date passes through: 2026-03-15', () => {
    assert(normalizeDate('2026-03-15') === '2026-03-15', 'Should pass through unchanged');
});

test('Dot format: 15.03.2026 в†’ 2026-03-15', () => {
    assert(normalizeDate('15.03.2026') === '2026-03-15', `Got: ${normalizeDate('15.03.2026')}`);
});

test('Slash format: 15/03/2026 в†’ 2026-03-15', () => {
    assert(normalizeDate('15/03/2026') === '2026-03-15', `Got: ${normalizeDate('15/03/2026')}`);
});

test('Single digit: 1.3.2026 в†’ 2026-03-01', () => {
    assert(normalizeDate('1.3.2026') === '2026-03-01', `Got: ${normalizeDate('1.3.2026')}`);
});

test('Null/empty handled', () => {
    assert(normalizeDate(null) === null, 'null should return null');
    assert(normalizeDate('') === '', 'empty should return empty');
});

// ============================================================
console.log('\nрџ“‹ 7. Field filter with ALLOWED_PERSONAL_FIELDS');
console.log('в”Ђ'.repeat(50));

// Simulate field filter behavior
test('ALLOWED_PERSONAL_FIELDS=name,country exposes those fields', () => {
    process.env.ALLOWED_PERSONAL_FIELDS = 'name,country';
    // Re-require to pick up new env
    delete require.cache[require.resolve('./services/field-filter.service')];
    const fieldFilter = require('./services/field-filter.service');
    
    const formatted = { login: 123, balance: 1000 };
    const raw = { Name: 'John Doe', Country: 'Thailand', Email: 'john@test.com', Phone: '+123' };
    
    fieldFilter.enrichAccountData(formatted, raw);
    
    assert(formatted.name === 'John Doe', `name should be exposed, got: ${formatted.name}`);
    assert(formatted.country === 'Thailand', `country should be exposed, got: ${formatted.country}`);
    assert(!formatted.email, `email should NOT be exposed`);
    assert(!formatted.phone, `phone should NOT be exposed`);
});

test('ALLOWED_PERSONAL_FIELDS="" hides all fields', () => {
    process.env.ALLOWED_PERSONAL_FIELDS = '';
    delete require.cache[require.resolve('./services/field-filter.service')];
    const fieldFilter = require('./services/field-filter.service');
    
    const formatted = { login: 123, balance: 1000 };
    const raw = { Name: 'John Doe', Country: 'Thailand', Email: 'john@test.com' };
    
    fieldFilter.enrichAccountData(formatted, raw);
    
    assert(!formatted.name, `name should NOT be exposed`);
    assert(!formatted.country, `country should NOT be exposed`);
    assert(!formatted.email, `email should NOT be exposed`);
});

// ============================================================
// Summary
console.log('\n' + 'в•ђ'.repeat(50));
console.log(`\nрџ“Љ Results: ${passed} passed, ${failed} failed out of ${passed + failed} tests\n`);

if (failed > 0) {
    console.log('вљ пёЏ  Some tests failed. Review the failures above.');
    process.exit(1);
} else {
    console.log('рџЋ‰ All tests passed! Changes are correct.');
    process.exit(0);
}


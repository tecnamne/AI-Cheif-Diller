/**
 * Local regression checks for scanner pattern coverage.
 *
 * Validates:
 * 1) Legacy same-symbol lock strategy is still detected.
 * 2) New cross-symbol synthetic strategy (BTCUSD + BTCJPY) is detected.
 * 3) Non-synthetic cross-symbol pairs do not trigger the new pattern.
 *
 * Run:
 *   node test-scanner-synthetic-cross-local.js
 */

const { ArbitrageScannerService } = require('./services/arbitrage-scanner.service');

function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

function buildTrade({
    symbol,
    cmd,
    profit,
    openTime,
    closeMinutes = 20,
    comment = '',
}) {
    const close = new Date(openTime.getTime() + closeMinutes * 60 * 1000);
    return {
        Symbol: symbol,
        Cmd: cmd,
        Profit: profit,
        OpenTime: openTime.toISOString(),
        CloseTime: close.toISOString(),
        Comment: comment,
    };
}

function buildLegacyLockTrades() {
    const start = new Date('2025-10-04T00:00:00.000Z');
    const trades = [];

    for (let i = 0; i < 6; i++) {
        const base = new Date(start.getTime() + i * 10 * 60 * 1000);
        trades.push(buildTrade({
            symbol: 'EURUSD.ecn',
            cmd: 'Buy',
            profit: 1.4,
            openTime: base,
            closeMinutes: 10,
            comment: '[tp]',
        }));
        trades.push(buildTrade({
            symbol: 'EURUSD.ecn',
            cmd: 'Sell',
            profit: 1.1,
            openTime: new Date(base.getTime() + 2000),
            closeMinutes: 12,
            comment: '[tp]',
        }));
    }

    return trades;
}

function buildSyntheticCrossTrades() {
    const start = new Date('2025-10-05T00:00:00.000Z');
    const trades = [];

    for (let i = 0; i < 12; i++) {
        const base = new Date(start.getTime() + i * 5 * 60 * 1000);
        const isPositivePair = i < 8;

        trades.push(buildTrade({
            symbol: 'BTCJPY',
            cmd: 'Buy',
            profit: isPositivePair ? 500 : -300,
            openTime: base,
            closeMinutes: 180,
        }));
        trades.push(buildTrade({
            symbol: 'BTCUSD',
            cmd: 'Sell',
            profit: isPositivePair ? -100 : 100,
            openTime: new Date(base.getTime() + 1000),
            closeMinutes: 180,
        }));
    }

    return trades;
}

function buildNonSyntheticCrossTrades() {
    const start = new Date('2025-10-06T00:00:00.000Z');
    const trades = [];

    for (let i = 0; i < 8; i++) {
        const base = new Date(start.getTime() + i * 7 * 60 * 1000);

        trades.push(buildTrade({
            symbol: 'EURUSD',
            cmd: 'Buy',
            profit: 90,
            openTime: base,
            closeMinutes: 90,
        }));
        trades.push(buildTrade({
            symbol: 'GBPUSD',
            cmd: 'Sell',
            profit: -40,
            openTime: new Date(base.getTime() + 1000),
            closeMinutes: 90,
        }));
    }

    return trades;
}

function run() {
    const scanner = new ArbitrageScannerService('default');
    const accountInfo = {
        Login: 11092326,
        Node: 'Live',
        Group: 'real',
        Platform: 'Mt5',
        SessionProfitInUsd: 0,
        BalanceInUsd: 50000,
    };

    console.log('\n[1/3] Legacy same-symbol lock strategy remains detected');
    {
        const analysis = scanner._analyzeTradesDeep(11092326, accountInfo, buildLegacyLockTrades());
        assert(analysis, 'Expected analysis for legacy strategy');
        const names = analysis.patterns.map(p => p.name);
        assert(names.includes('lockPattern'), 'Expected lockPattern for legacy strategy');
        assert(analysis.riskScore >= scanner.config.confirmedArbitrageScore, `Expected confirmed score, got ${analysis.riskScore}`);
        console.log(`  PASS: patterns=${names.join(', ')} risk=${analysis.riskScore}`);
    }

    console.log('\n[2/3] Cross-symbol synthetic strategy is detected');
    {
        const analysis = scanner._analyzeTradesDeep(11092326, accountInfo, buildSyntheticCrossTrades());
        assert(analysis, 'Expected analysis for synthetic cross-symbol strategy');
        const names = analysis.patterns.map(p => p.name);
        assert(names.includes('crossSymbolSyntheticLock'), 'Expected crossSymbolSyntheticLock pattern');
        assert(!names.includes('lockPattern'), 'Did not expect same-symbol lockPattern for synthetic strategy');
        assert(analysis.riskScore >= scanner.config.suspiciousScore, `Expected at least suspicious score, got ${analysis.riskScore}`);
        console.log(`  PASS: patterns=${names.join(', ')} risk=${analysis.riskScore}`);
    }

    console.log('\n[3/3] Non-synthetic cross-symbol pairs do not trigger synthetic pattern');
    {
        const analysis = scanner._analyzeTradesDeep(11092326, accountInfo, buildNonSyntheticCrossTrades());
        if (!analysis) {
            console.log('  PASS: no patterns detected');
        } else {
            const names = analysis.patterns.map(p => p.name);
            assert(!names.includes('crossSymbolSyntheticLock'), 'Synthetic pattern must not trigger for non-USD/JPY synthetic pairs');
            console.log(`  PASS: patterns=${names.join(', ')} risk=${analysis.riskScore}`);
        }
    }

    console.log('\nAll scanner synthetic checks passed.');
}

try {
    run();
} catch (error) {
    console.error('\nTest failed:', error.message);
    process.exit(1);
}

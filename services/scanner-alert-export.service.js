const ExcelJS = require('exceljs');

function toNumber(value, fallback = 0) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
}

function toArray(value) {
    return Array.isArray(value) ? value : [];
}

function getExplainableAccounts(alert) {
    const accounts = alert?.data?.explainableAccounts;
    if (Array.isArray(accounts) && accounts.length > 0) {
        return accounts;
    }

    return [];
}

function formatTimestampForFilename(value) {
    const date = value ? new Date(value) : new Date();
    if (Number.isNaN(date.getTime())) {
        return new Date().toISOString().replace(/[:.]/g, '-');
    }

    return date.toISOString().replace(/[:.]/g, '-');
}

class ScannerAlertExportService {
    isGeneralScannerAlert(alert) {
        return getExplainableAccounts(alert).length > 0;
    }

    buildFileName(alert) {
        const timestamp = formatTimestampForFilename(alert?.timestamp || alert?.queuedAt || Date.now());
        return `scanner-alert-${alert?.id || 'unknown'}-${timestamp}.xlsx`;
    }

    async exportGeneralAlertToXlsxBuffer(alert) {
        const explainableAccounts = getExplainableAccounts(alert);
        if (explainableAccounts.length === 0) {
            const error = new Error('Export is available only for general scanner alerts');
            error.code = 'NOT_GENERAL_ALERT';
            throw error;
        }

        const workbook = new ExcelJS.Workbook();
        workbook.creator = 'AI Scanner Demo';
        workbook.created = new Date();

        this._fillSummarySheet(workbook, alert, explainableAccounts);
        this._fillAccountsSheet(workbook, explainableAccounts);
        this._fillSignalsSheet(workbook, explainableAccounts);

        return workbook.xlsx.writeBuffer();
    }

    _fillSummarySheet(workbook, alert, explainableAccounts) {
        const sheet = workbook.addWorksheet('Summary');

        const data = alert?.data || {};
        const confirmedCount = toNumber(data.confirmedCount);
        const suspiciousCount = toNumber(data.suspiciousCount);

        const rows = [
            ['Alert ID', String(alert?.id || '')],
            ['Alert type', String(alert?.type || 'scan_result')],
            ['Generated at', String(alert?.timestamp || alert?.queuedAt || '')],
            ['Accounts scanned', toNumber(data.totalScanned)],
            ['Confirmed accounts', confirmedCount],
            ['Suspicious accounts', suspiciousCount],
            ['Deep analysis accounts', toNumber(data.analyzedDeep)],
            ['Quick analysis accounts', toNumber(data.analyzedQuick)],
            ['Eligible accounts (>=10 trades)', toNumber(data.accountsWithTrades)],
            ['Explainable accounts exported', explainableAccounts.length],
        ];

        sheet.columns = [
            { header: 'Field', key: 'field', width: 36 },
            { header: 'Value', key: 'value', width: 48 },
        ];

        for (const [field, value] of rows) {
            sheet.addRow({ field, value });
        }

        sheet.getRow(1).font = { bold: true };
    }

    _fillAccountsSheet(workbook, explainableAccounts) {
        const sheet = workbook.addWorksheet('Accounts');

        sheet.columns = [
            { header: 'Account Login', key: 'accountLogin', width: 16 },
            { header: 'Status', key: 'status', width: 14 },
            { header: 'Severity', key: 'severity', width: 12 },
            { header: 'Risk Score', key: 'riskScore', width: 12 },
            { header: 'Detected At', key: 'detectedAt', width: 26 },
            { header: 'Node', key: 'node', width: 20 },
            { header: 'Group', key: 'group', width: 22 },
            { header: 'Platform', key: 'platform', width: 14 },
            { header: 'Total Trades', key: 'totalTrades', width: 12 },
            { header: 'Win Rate %', key: 'winRate', width: 12 },
            { header: 'Total Profit', key: 'totalProfit', width: 14 },
            { header: 'Avg Duration Min', key: 'avgDurationMin', width: 16 },
            { header: 'Top Symbols', key: 'topSymbols', width: 28 },
            { header: 'Top Signals', key: 'topSignals', width: 40 },
            { header: 'Short Reason', key: 'shortReason', width: 44 },
            { header: 'Actions', key: 'actions', width: 50 },
        ];

        for (const account of explainableAccounts) {
            const tradeStats = account?.tradeStats || {};
            sheet.addRow({
                accountLogin: String(account?.accountLogin || ''),
                status: String(account?.status || ''),
                severity: String(account?.severity || ''),
                riskScore: toNumber(account?.riskScore),
                detectedAt: String(account?.detectedAt || ''),
                node: String(account?.node || ''),
                group: String(account?.group || ''),
                platform: String(account?.platform || ''),
                totalTrades: toNumber(tradeStats?.totalTrades),
                winRate: toNumber(tradeStats?.winRate),
                totalProfit: toNumber(tradeStats?.totalProfit),
                avgDurationMin: toNumber(tradeStats?.avgDurationMin),
                topSymbols: toArray(tradeStats?.topSymbols).join(', '),
                topSignals: toArray(account?.topSignals).join(' | '),
                shortReason: String(account?.shortReason || ''),
                actions: toArray(account?.actions).join(' | '),
            });
        }

        sheet.getRow(1).font = { bold: true };
    }

    _fillSignalsSheet(workbook, explainableAccounts) {
        const sheet = workbook.addWorksheet('Signals');

        sheet.columns = [
            { header: 'Account Login', key: 'accountLogin', width: 16 },
            { header: 'Status', key: 'status', width: 14 },
            { header: 'Signal Name', key: 'name', width: 24 },
            { header: 'Description', key: 'description', width: 44 },
            { header: 'Score', key: 'score', width: 10 },
            { header: 'Contribution %', key: 'contribution', width: 14 },
            { header: 'Evidence', key: 'evidence', width: 60 },
        ];

        for (const account of explainableAccounts) {
            const signals = toArray(account?.signals);
            if (signals.length === 0) {
                sheet.addRow({
                    accountLogin: String(account?.accountLogin || ''),
                    status: String(account?.status || ''),
                    name: '',
                    description: '',
                    score: '',
                    contribution: '',
                    evidence: '',
                });
                continue;
            }

            for (const signal of signals) {
                sheet.addRow({
                    accountLogin: String(account?.accountLogin || ''),
                    status: String(account?.status || ''),
                    name: String(signal?.name || ''),
                    description: String(signal?.description || ''),
                    score: toNumber(signal?.score),
                    contribution: toNumber(signal?.contribution),
                    evidence: toArray(signal?.evidence).join(' | '),
                });
            }
        }

        sheet.getRow(1).font = { bold: true };
    }
}

module.exports = new ScannerAlertExportService();

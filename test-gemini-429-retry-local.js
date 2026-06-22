/**
 * Local regression check for Gemini 429 handling.
 *
 * This test does not call external APIs.
 * It mocks node-fetch and validates:
 * 1) retry succeeds after transient 429
 * 2) exhausted retries produce structured rate-limit error
 *
 * Run:
 *   node test-gemini-429-retry-local.js
 */

const path = require('path');

function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}

function createResponse(status, body, headers = {}) {
    const normalizedHeaders = {};
    for (const [key, value] of Object.entries(headers)) {
        normalizedHeaders[String(key).toLowerCase()] = value;
    }

    const payloadText = typeof body === 'string' ? body : JSON.stringify(body);

    return {
        ok: status >= 200 && status < 300,
        status,
        text: async () => payloadText,
        json: async () => JSON.parse(payloadText),
        headers: {
            get: (name) => normalizedHeaders[String(name).toLowerCase()] || null,
        },
    };
}

function loadGeminiServiceWithMockedFetch(mockFetch) {
    const fetchModulePath = require.resolve('node-fetch');
    const geminiModulePath = path.join(__dirname, 'services', 'gemini.service.js');

    delete require.cache[fetchModulePath];
    delete require.cache[geminiModulePath];

    require.cache[fetchModulePath] = {
        id: fetchModulePath,
        filename: fetchModulePath,
        loaded: true,
        exports: mockFetch,
    };

    return require('./services/gemini.service');
}

async function run() {
    process.env.GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'local-test-key';
    process.env.GEMINI_MAX_RETRIES = '2';
    process.env.GEMINI_RETRY_BASE_DELAY_MS = '1';
    process.env.GEMINI_RETRY_MAX_DELAY_MS = '5';

    console.log('\n[1/2] Retry succeeds after transient 429');
    {
        let callIndex = 0;
        const mockedFetch = async () => {
            callIndex += 1;
            if (callIndex === 1) {
                return createResponse(429, {
                    error: {
                        code: 429,
                        message: 'Resource exhausted',
                        status: 'RESOURCE_EXHAUSTED',
                    },
                }, {
                    'retry-after': '0',
                });
            }

            return createResponse(200, {
                candidates: [
                    {
                        content: {
                            parts: [{ text: 'ok' }],
                        },
                    },
                ],
            });
        };

        const geminiService = loadGeminiServiceWithMockedFetch(mockedFetch);
        geminiService.initialized = true;
        geminiService._sleep = async () => {};

        const result = await geminiService._callGeminiApi(
            {
                contents: [{ parts: [{ text: 'ping' }] }],
            },
            {
                requestType: 'local-regression-retry-success',
                tenantId: 'default',
            }
        );

        assert(callIndex === 2, `Expected 2 API calls, got ${callIndex}`);
        assert(Array.isArray(result.candidates), 'Expected candidates in successful response');
        console.log('  PASS: retried once and recovered');
    }

    console.log('\n[2/2] Retries exhausted on repeated 429');
    {
        let callIndex = 0;
        const mockedFetch = async () => {
            callIndex += 1;
            return createResponse(429, {
                error: {
                    code: 429,
                    message: 'Resource exhausted',
                    status: 'RESOURCE_EXHAUSTED',
                },
            });
        };

        const geminiService = loadGeminiServiceWithMockedFetch(mockedFetch);
        geminiService.initialized = true;
        geminiService._sleep = async () => {};

        let thrown = null;
        try {
            await geminiService._callGeminiApi(
                {
                    contents: [{ parts: [{ text: 'ping' }] }],
                },
                {
                    requestType: 'local-regression-retry-exhausted',
                    tenantId: 'default',
                }
            );
        } catch (error) {
            thrown = error;
        }

        assert(thrown, 'Expected error to be thrown after retries exhausted');
        assert(thrown.code === 'GEMINI_API_ERROR', `Expected GEMINI_API_ERROR, got ${thrown.code}`);
        assert(thrown.isRateLimit === true, 'Expected rate limit classification');
        assert(callIndex === 3, `Expected 3 API calls (1 initial + 2 retries), got ${callIndex}`);
        console.log('  PASS: exhausted retries and returned structured error');
    }

    console.log('\nAll checks passed.');
}

run().catch((error) => {
    console.error('\nTest failed:', error.message);
    process.exit(1);
});

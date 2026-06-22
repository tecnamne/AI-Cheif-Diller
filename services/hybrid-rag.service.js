const fs = require('fs').promises;
const path = require('path');
const natural = require('natural');
const OpenAI = require('openai');
const logger = require('../utils/logger');

/**
 * Hybrid RAG Service
 * Combines BM25 (keyword) + Vector (semantic) search
 * with Query Rewriting, Citations, and Metadata filtering
 */
class HybridRAGService {
    constructor() {
        this.documents = [];
        this.documentsLoaded = false;
        this.docsPath = path.join(__dirname, '../docs');
        
        // BM25 for keyword search
        this.tfidf = new natural.TfIdf();
        
        // OpenAI for embeddings. Optional in public demo mode; BM25 still works without it.
        this.openai = process.env.OPENAI_API_KEY
            ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
            : null;
        
        // Document embeddings cache
        this.embeddings = new Map();
        
        // Document metadata
        this.metadata = new Map();
        
        // Configuration
        this.config = {
            bm25Weight: 0.4,      // 40% weight for keyword matching
            vectorWeight: 0.6,    // 60% weight for semantic similarity
            maxResults: 10,
            minScore: 0.1,
            embeddingModel: 'text-embedding-3-small', // Cheap and fast
            enableQueryRewriting: true,
            enableCitations: false, // Disabled - no (Source: [N]) in responses
            enableMetadataFiltering: true
        };
    }

    /**
     * Initialize and load all documentation
     */
    async initialize() {
        try {
            logger.info('🚀 Initializing Hybrid RAG (BM25 + Vector)...');
            
            // Load documents
            await this.loadDocuments();
            
            // Build BM25 index
            this.buildBM25Index();
            
            // Generate embeddings for all documents
            if (process.env.OPENAI_API_KEY) {
                await this.generateEmbeddings();
                logger.info('✅ Vector embeddings generated');
            } else {
                logger.warn('⚠️ No OPENAI_API_KEY found, using BM25 only');
            }
            
            this.documentsLoaded = true;
            logger.info(`✅ Hybrid RAG initialized with ${this.documents.length} documents`);
            
        } catch (error) {
            logger.logError(error, { context: 'Hybrid RAG initialization' });
            throw error;
        }
    }

    /**
     * Load all markdown documents from docs directory
     */
    async loadDocuments() {
        try {
            const files = await fs.readdir(this.docsPath);
            const mdFiles = files.filter(file => file.endsWith('.md'));
            
            for (const file of mdFiles) {
                const filePath = path.join(this.docsPath, file);
                const content = await fs.readFile(filePath, 'utf-8');
                
                // Parse document with enhanced metadata
                const doc = this.parseDocumentWithMetadata(file, content);
                this.documents.push(doc);
                
                // Store metadata
                this.metadata.set(doc.id, doc.metadata);
            }
            
            logger.info(`📚 Loaded ${this.documents.length} documents with metadata`);
        } catch (error) {
            logger.logError(error, { context: 'Loading documents' });
            this.documents = [];
        }
    }

    /**
     * Parse document with enhanced metadata extraction
     */
    parseDocumentWithMetadata(filename, content) {
        const titleMatch = content.match(/^#\s+(.+)$/m);
        const title = titleMatch ? titleMatch[1] : filename.replace('.md', '');
        
        // Split into sections by headings
        const sections = [];
        const sectionRegex = /^(#{2,3})\s+(.+)$/gm;
        let lastIndex = 0;
        let currentLevel = 2;
        let match;
        
        while ((match = sectionRegex.exec(content)) !== null) {
            if (lastIndex > 0) {
                const prevContent = content.substring(lastIndex, match.index).trim();
                if (prevContent) {
                    sections.push({
                        level: currentLevel,
                        heading: sections[sections.length - 1]?.heading || '',
                        content: prevContent,
                    });
                }
            }
            currentLevel = match[1].length;
            sections.push({ level: currentLevel, heading: match[2], content: '' });
            lastIndex = match.index + match[0].length;
        }
        
        // Add last section
        if (lastIndex > 0 && sections.length > 0) {
            sections[sections.length - 1].content = content.substring(lastIndex).trim();
        }
        
        // Detect category and tags from content
        const category = this.detectCategory(title, content);
        const tags = this.extractTags(content);
        const language = this.detectLanguage(content);
        
        const doc = {
            id: `doc_${this.documents.length}`,
            filename,
            title,
            content,
            sections: sections.length > 0 ? sections : [{ level: 1, heading: title, content }],
            metadata: {
                category,
                tags,
                language,
                length: content.length,
                sectionsCount: sections.length,
                lastModified: new Date().toISOString()
            }
        };
        
        return doc;
    }

    /**
     * Detect document category from title and content
     */
    detectCategory(title, content) {
        const categories = {
            'API': ['api', 'integration', 'endpoint', 'request', 'response'],
            'Settings': ['настройки', 'settings', 'конфигурация', 'параметры'],
            'Formulas': ['формулы', 'расчет', 'calculation', 'formula'],
            'UI': ['интерфейс', 'navigation', 'ui', 'dashboard'],
            'Trading': ['торговля', 'trading', 'позиции', 'сделки', 'orders'],
            'Risk': ['риск', 'risk', 'management', 'exposure'],
            'Accounts': ['счета', 'accounts', 'группы', 'groups'],
            'Symbols': ['символы', 'symbols', 'инструменты', 'instruments'],
            'Reporting': ['отчеты', 'reporting', 'metabase', 'reports']
        };
        
        const text = `${title} ${content}`.toLowerCase();
        
        for (const [category, keywords] of Object.entries(categories)) {
            if (keywords.some(kw => text.includes(kw))) {
                return category;
            }
        }
        
        return 'General';
    }

    /**
     * Extract tags from content (important terms)
     */
    extractTags(content) {
        const importantTerms = [
            'swap', 'margin', 'leverage', 'profit', 'loss', 'balance',
            'equity', 'commission', 'spread', 'pip', 'lot', 'position',
            'order', 'pending', 'stop loss', 'take profit', 'trailing stop',
            'hedging', 'a-book', 'b-book', 'group', 'symbol', 'cluster'
        ];
        
        const contentLower = content.toLowerCase();
        const tags = importantTerms.filter(term => contentLower.includes(term));
        
        return tags;
    }

    /**
     * Detect document language
     */
    detectLanguage(content) {
        const cyrillicCount = (content.match(/[а-яА-ЯёЁ]/g) || []).length;
        const latinCount = (content.match(/[a-zA-Z]/g) || []).length;
        
        if (cyrillicCount > latinCount * 2) return 'ru';
        if (latinCount > cyrillicCount * 2) return 'en';
        return 'mixed';
    }

    /**
     * Build BM25 index for keyword search
     */
    buildBM25Index() {
        logger.info('🔨 Building BM25 index...');
        
        for (const doc of this.documents) {
            // Add document with all sections combined
            const fullText = `${doc.title} ${doc.sections.map(s => `${s.heading} ${s.content}`).join(' ')}`;
            this.tfidf.addDocument(fullText);
        }
        
        logger.info('✅ BM25 index built');
    }

    /**
     * Generate embeddings for all documents
     */
    async generateEmbeddings() {
        logger.info('🧮 Generating vector embeddings...');
        
        // Limit embeddings to avoid too many API calls
        const MAX_EMBEDDINGS = 100; // Limit to 100 most important sections
        let embeddingCount = 0;
        
        try {
            for (const doc of this.documents) {
                // Create embedding for each section (limited)
                for (let i = 0; i < doc.sections.length && embeddingCount < MAX_EMBEDDINGS; i++) {
                    const section = doc.sections[i];
                    
                    // Skip empty sections or Table of Contents
                    if (!section.content || section.content.length < 100) continue;
                    if (section.heading.toLowerCase().includes('table of contents')) continue;
                    
                    const text = `${doc.title} - ${section.heading}: ${section.content.substring(0, 8000)}`;
                    
                    try {
                        const response = await this.openai.embeddings.create({
                            model: this.config.embeddingModel,
                            input: text,
                        });
                        
                        const embeddingKey = `${doc.id}_section_${i}`;
                        this.embeddings.set(embeddingKey, {
                            vector: response.data[0].embedding,
                            docId: doc.id,
                            sectionIndex: i,
                            text: text.substring(0, 200) // Store preview
                        });
                        
                        embeddingCount++;
                        
                        // Log progress every 10 embeddings
                        if (embeddingCount % 10 === 0) {
                            logger.info(`   Generated ${embeddingCount}/${MAX_EMBEDDINGS} embeddings...`);
                        }
                        
                        // Small delay to avoid rate limiting (100ms)
                        await new Promise(resolve => setTimeout(resolve, 100));
                        
                    } catch (error) {
                        // Check if it's a quota error or rate limit
                        if (error.message?.includes('429') || error.message?.includes('quota') || error.message?.includes('rate')) {
                            logger.warn('❌ OpenAI API rate limit - stopping embeddings generation');
                            logger.warn(`💡 Generated ${embeddingCount} embeddings, RAG will use hybrid mode`);
                            return; // Stop trying to generate more embeddings
                        }
                        logger.warn(`Failed to generate embedding for ${doc.filename} section ${i}:`, error.message);
                    }
                }
                
                if (embeddingCount >= MAX_EMBEDDINGS) {
                    logger.info(`📊 Reached embedding limit (${MAX_EMBEDDINGS})`);
                    break;
                }
            }
            
            logger.info(`✅ Generated ${this.embeddings.size} section embeddings`);
            
        } catch (error) {
            logger.error('Failed to generate embeddings:', error.message);
        }
    }

    /**
     * Main search function - Hybrid approach
     */
    async search(query, options = {}) {
        if (!this.documentsLoaded || this.documents.length === 0) {
            return { context: '', sources: [] };
        }
        
        try {
            // Step 0a: Check for known trigger searches and do direct lookup
            const triggerMatch = this.findKnownTriggerSection(query);
            if (triggerMatch) {
                logger.info('Found direct trigger match:', triggerMatch.section.heading);
                return this.formatContextWithCitations([triggerMatch], options);
            }
            
            // Step 0b: Check for troubleshooting questions and do direct lookup
            const troubleshootingMatch = this.findTroubleshootingSection(query);
            if (troubleshootingMatch) {
                logger.info('Found troubleshooting match:', troubleshootingMatch.section.heading);
                return this.formatContextWithCitations([troubleshootingMatch], options);
            }
            
            // Step 1: Query Rewriting (if enabled)
            let processedQuery = query;
            if (this.config.enableQueryRewriting && options.rewriteQuery !== false) {
                processedQuery = await this.rewriteQuery(query);
                logger.info('Query rewritten:', { original: query.substring(0, 50), rewritten: processedQuery.substring(0, 50) });
            }
            
            // Step 2: Metadata Filtering (if enabled)
            let filteredDocs = this.documents;
            if (this.config.enableMetadataFiltering && options.category) {
                filteredDocs = this.filterByCategory(options.category);
            }
            
            // Step 3: BM25 Search (keyword)
            const bm25Results = this.bm25Search(processedQuery, filteredDocs);
            
            // Step 4: Vector Search (semantic) - if embeddings available
            let vectorResults = [];
            if (this.embeddings.size > 0 && process.env.OPENAI_API_KEY) {
                vectorResults = await this.vectorSearch(processedQuery, filteredDocs);
            }
            
            // Step 5: Hybrid Scoring - merge BM25 + Vector
            const hybridResults = this.mergeResults(bm25Results, vectorResults);
            
            // Step 6: Format with Citations (if enabled)
            const formattedContext = this.formatContextWithCitations(hybridResults, options);
            
            return formattedContext;
            
        } catch (error) {
            logger.logError(error, { context: 'Hybrid search' });
            // Fallback to simple keyword search
            return this.fallbackSearch(query);
        }
    }

    /**
     * Query Rewriting - improve vague queries
     */
    async rewriteQuery(query) {
        // Add English equivalents for trigger names and common terms
        const triggerTranslations = {
            'achieved profit': 'Achieved Profit trigger profit percentage Base Point deposit withdrawal вводы выводы',
            'latency arbitrage': 'Latency Arbitrage trigger detection',
            'cid control': 'CID Control trigger computer identification CID settings configuration Detect Several CIDs Auto Block Trade',
            'ip control': 'IP Control trigger address',
            'bad rates': 'Bad Rates trigger wrong quotes',
            'churning': 'Churning trigger volumes',
            'overdue credits': 'Overdue Credits trigger',
            'insiders': 'Insiders trigger trading',
            'stop out': 'Stop Out trigger failed',
            'large volume': 'Large Volume trigger order',
            'unusual pnl': 'Unusual PnL trigger symbol',
            'margin level': 'Margin Level trigger',
            'trader activity': 'Trader Activity trigger',
            'affiliate cheating': 'Affiliate Cheating trigger'
        };
        
        // Специальные расширения для часто задаваемых вопросов
        const specialQueries = {
            // Achieved Profit - детальные вопросы
            'achieved profit': 'Achieved Profit trigger profit percentage Base Point deposit withdrawal вводы выводы собственные средства алгоритм расчёта',
            'achieved profit вводы': 'Achieved Profit trigger Base Point deposit withdrawal вводы выводы алгоритм расчёта собственные средства базовая точка',
            'achieved profit выводы': 'Achieved Profit trigger Base Point deposit withdrawal вводы выводы алгоритм расчёта собственные средства',
            'achieved profit учитывает': 'Achieved Profit trigger Base Point deposit withdrawal вводы выводы алгоритм расчёта собственные средства базовая точка',
            'achieved profit алгоритм': 'Achieved Profit trigger Base Point deposit withdrawal вводы выводы алгоритм расчёта собственные средства детальный',
            'achieved profit расчёт': 'Achieved Profit trigger Base Point deposit withdrawal вводы выводы алгоритм расчёта собственные средства формула',
            'achieved profit base point': 'Achieved Profit trigger Base Point deposit withdrawal вводы выводы алгоритм расчёта базовая точка',
            'как работает achieved profit': 'Achieved Profit trigger Base Point deposit withdrawal вводы выводы алгоритм расчёта собственные средства логика триггера',
            
            // CID Control
            'настроить cid': 'CID Control trigger settings configuration Rule Name Detect Several CIDs CID Count Auto Block Trade Excluded Accounts menu navigation Risk Management Additional',
            'cid control': 'CID Control trigger settings configuration Rule Name Detect Several CIDs CID Count Auto Block Trade menu navigation Risk Management Additional',
            'как работает cid': 'CID Control trigger logic how works Computer Identification Number CID detection accounts Auto Block Trade',
            
            // Troubleshooting - данные не поступают
            'данные не поступают': 'troubleshooting данные не поступают задержка синхронизация подключение Nodes Connected Manager API права фильтрация кэш',
            'не поступают данные': 'troubleshooting данные не поступают задержка подключение Nodes Manager API права',
            'задержка данных': 'troubleshooting задержка синхронизация данные подключение торговый сервер',
            'нет данных': 'troubleshooting данные не поступают подключение Nodes Connected',
            // English - data issues
            'data not received': 'troubleshooting data delay synchronization connection Nodes Connected Manager API permissions',
            'data delayed': 'troubleshooting data delay synchronization connection trading server',
            'no data': 'troubleshooting data not received connection Nodes Connected',
            'trades not showing': 'troubleshooting data positions connection Nodes Manager API',
            
            // Alerts по лимитам
            'alerts по': 'alerts алерты триггеры Large Volume Leverage by Equity Dynamic Leverage Achieved Profit Margin Calls уведомления notifications',
            'алерты по': 'alerts алерты триггеры Large Volume Leverage by Equity Dynamic Leverage уведомления',
            'настроить alert': 'alerts алерты триггеры Large Volume Account Order Leverage Equity triggers notification Risk Management',
            'превышению лимита': 'Large Volume by Account Large Volume by Order Leverage by Equity Dynamic Leverage triggers threshold alerts',
            'по объему': 'Large Volume by Account Large Volume by Order threshold lots USD alerts triggers',
            'по плечу': 'Leverage by Equity Dynamic Leverage trigger leverage threshold alerts',
            'по левериджу': 'Leverage by Equity Dynamic Leverage trigger leverage threshold alerts',
            'по убыткам': 'Winners Losers Margin Calls Achieved Profit alerts triggers loss',
            // English - alerts
            'set up alerts': 'alerts triggers Large Volume Leverage by Equity Dynamic Leverage Achieved Profit notifications Risk Management',
            'configure alerts': 'alerts triggers Large Volume Account Order Leverage Equity notifications Risk Management',
            'alerts for volume': 'Large Volume by Account Large Volume by Order threshold lots USD alerts triggers',
            'alerts for leverage': 'Leverage by Equity Dynamic Leverage trigger leverage threshold alerts',
            'alerts for losses': 'Winners Losers Margin Calls Achieved Profit alerts triggers loss',
            'limit exceeded': 'Large Volume Leverage by Equity Dynamic Leverage triggers threshold alerts limit',
            
            // Dealing Desk BI
            'dealing desk bi': 'Dealing Desk Net Summary A/B Books Net Exposures Top Volumes Winners Losers reporting Metabase dashboards',
            'исторические отчеты': 'reporting Metabase dashboards history reports dealing desk analytics',
            'раздел bi': 'Dealing Desk Net Summary Exposures reporting Metabase dashboards analytics BI',
            // English - BI
            'historical reports': 'reporting Metabase dashboards history reports dealing desk analytics BI',
            'bi section': 'Dealing Desk Net Summary Exposures reporting Metabase dashboards analytics BI',
            'business intelligence': 'Dealing Desk BI Metabase dashboards reporting analytics',
            'where are historical reports': 'reporting Metabase dashboards history reports dealing desk analytics BI section',
            
            // A-Book vs B-Book
            'a-book vs b-book': 'A-Book B-Book Settings routing hedging cost LP liquidity provider comparison STP ECN Market Maker',
            'a-book b-book': 'A-Book B-Book Settings routing hedging cost стоимость comparison',
            'стоимость a-book': 'A-Book cost hedging LP liquidity provider commission spread comparison B-Book',
            'дороже обслуживания': 'A-Book B-Book cost hedging стоимость LP commission comparison routing',
            'перевести в a-book': 'A-Book Settings accounts groups routing hedging configuration',
            // English - A-Book B-Book
            'a-book cost': 'A-Book cost hedging LP liquidity provider commission spread comparison B-Book',
            'b-book cost': 'B-Book cost hedging comparison A-Book Market Maker',
            'a-book more expensive': 'A-Book B-Book cost hedging LP commission comparison routing expensive',
            'a-book became more expensive': 'A-Book B-Book cost hedging LP commission comparison routing expensive',
            'hedging cost': 'A-Book hedging cost LP liquidity provider commission comparison',
            'cost of hedging': 'A-Book hedging cost LP liquidity provider commission spread',
            
            // Hedge проблемы
            'хедж не закрылся': 'hedge closing problem LP liquidity provider order execution troubleshooting Manager API права',
            'hedge не закрылся': 'hedge closing problem LP liquidity provider order execution troubleshooting',
            'проблемы с хеджем': 'hedge problems LP liquidity provider execution troubleshooting',
            // English - hedge
            'hedge did not close': 'hedge closing problem LP liquidity provider order execution troubleshooting',
            'hedge not closed': 'hedge closing problem LP liquidity provider order execution troubleshooting',
            'hedge problems': 'hedge problems LP liquidity provider execution troubleshooting',
            
            // Расхождения
            'расхождение net-volume': 'Net Volume расхождение Collect Symbol Suffixes Dealer Side фильтры A-Book B-Book',
            'расхождение между net': 'Net Volume расхождение фильтры Collect Symbol Suffixes',
            'расхождение equity': 'Equity Exposure расхождение Actual Leverage formula margin',
            'equity и exposure': 'Equity Exposure difference Actual Leverage formula Volume Balance margin',
            // English - discrepancies
            'net-volume discrepancy': 'Net Volume discrepancy Collect Symbol Suffixes Dealer Side filters A-Book B-Book',
            'net volume discrepancy': 'Net Volume discrepancy Collect Symbol Suffixes Dealer Side filters',
            'equity discrepancy': 'Equity Exposure discrepancy Actual Leverage formula margin',
            'equity and exposure': 'Equity Exposure difference Actual Leverage formula Volume Balance margin',
            'discrepancy between equity': 'Equity Exposure discrepancy difference formula margin Volume Balance',
            
            // Net Volume, Exposure
            'чистый объем': 'Net Summary Net Volume dealing desk Exposures символы',
            'net volume': 'Net Summary Net Volume dealing desk total lots USD',
            'net exposure': 'Exposures exposure currency USD Net Summary',
            'total exposure': 'Exposures total exposure currency Net Volume',
            // English - net volume
            'net volume by asset': 'Net Summary Net Volume dealing desk Exposures symbols assets',
            'net volume by symbol': 'Net Summary Net Volume dealing desk Exposures symbols',
            'where is net volume': 'Net Summary Net Volume dealing desk Exposures section',
            
            // P&L
            'статистика p&l': 'Current Session P&L reporting dashboards accounts symbols groups',
            'p&l по клиентам': 'Winners Losers reporting P&L accounts profit',
            // English - P&L
            'p&l statistics': 'Current Session P&L reporting dashboards accounts symbols groups Winners Losers',
            'p&l by clients': 'Winners Losers reporting P&L accounts profit',
            'p&l by assets': 'P&L reporting symbols assets groups Current Session',
            'p&l breakdown': 'P&L reporting accounts symbols groups Winners Losers Current Session',
            'cumulative loss': 'P&L reporting loss profit Equity Exposure Net Volume',
            'why did the cumulative loss': 'P&L Equity Exposure Net Volume discrepancy loss profit formula',
            
            // Позиции
            'открытые позиции': 'Current Session positions orders dealing desk Net Summary',
            'позиции клиентов': 'positions orders accounts dealing desk exposure',
            // English - positions
            'open positions': 'Current Session positions orders dealing desk Net Summary',
            'open positions of all clients': 'positions orders accounts dealing desk Current Session real-time',
            'see current position': 'positions orders accounts dealing desk Current Session',
            'view open trades': 'positions orders trades dealing desk Current Session',
            'positions in real time': 'positions orders dealing desk Current Session real-time accounts',
            'real-time positions': 'positions orders dealing desk Current Session real-time accounts',
            
            // Zero exposure but risk
            'zero net-exposure': 'Equity Exposure Net Volume zero risk discrepancy Actual Leverage',
            'zero exposure but risk': 'Equity Exposure Net Volume zero risk discrepancy margin',
            'net volume remained zero': 'Net Volume zero Equity Exposure discrepancy P&L loss',
        };
        
        let expandedQuery = query;
        const queryLower = query.toLowerCase();
        
        // Check for special queries first (more specific)
        for (const [key, expansion] of Object.entries(specialQueries)) {
            if (queryLower.includes(key)) {
                expandedQuery = `${query} ${expansion}`;
                break;
            }
        }
        
        // Check for trigger-related queries and expand with English terms
        if (expandedQuery === query) {
            for (const [key, expansion] of Object.entries(triggerTranslations)) {
                if (queryLower.includes(key)) {
                    expandedQuery = `${query} ${expansion}`;
                    break;
                }
            }
        }
        
        // Handle Russian trigger questions
        if (/триггер|срабатыва|работает.*trigger/i.test(query)) {
            // Extract trigger name if mentioned
            const triggerMatch = query.match(/триггер[а]?\s+(\w+[\s\w]*)/i);
            if (triggerMatch) {
                const triggerName = triggerMatch[1].toLowerCase();
                for (const [key, expansion] of Object.entries(triggerTranslations)) {
                    if (key.includes(triggerName) || triggerName.includes(key.split(' ')[0])) {
                        expandedQuery = `${query} ${expansion} trigger logic how works`;
                        break;
                    }
                }
            }
        }
        
        // Simple rule-based rewriting for common patterns
        const rules = [
            // Where questions
            { pattern: /где\s+(\w+)/i, rewrite: 'Где находится раздел или настройка $1 в платформе' },
            { pattern: /where\s+is\s+(\w+)/i, rewrite: 'Where to find $1 settings in the platform' },
            
            // What questions
            { pattern: /что\s+такое\s+(\w+)/i, rewrite: 'Что означает термин $1 в платформе $1 description' },
            { pattern: /what\s+is\s+(\w+)/i, rewrite: 'What does $1 mean in the platform' },
            
            // How questions
            { pattern: /как\s+(\w+)/i, rewrite: 'Как настроить или использовать $1 в платформе how $1' },
            { pattern: /how\s+to\s+(\w+)/i, rewrite: 'How to configure or use $1 in the platform' },
        ];
        
        for (const rule of rules) {
            if (rule.pattern.test(expandedQuery)) {
                return expandedQuery.replace(rule.pattern, rule.rewrite);
            }
        }
        
        return expandedQuery;
    }

    /**
     * Direct lookup for known triggers by name
     * This bypasses the search when user asks about a specific trigger
     */
    findKnownTriggerSection(query) {
        const queryLower = query.toLowerCase();
        
        // Map of trigger keywords to section heading patterns
        const triggerPatterns = {
            'cid control': /^#*\s*\**CID Control\**$/mi,
            'cid': /^#*\s*\**CID Control\**$/mi,
            'ip control': /^#*\s*\**IP Control\**$/mi,
            'achieved profit': /^#*\s*\**Achieved Profit\**$/mi,
            'latency arbitrage': /^#*\s*\**Latency Arbitrage\**$/mi,
            'bad rates': /^#*\s*\**Bad Rates\**$/mi,
            'churning': /^#*\s*\**Churning\**$/mi,
            'overdue credits': /^#*\s*\**Overdue Credits\**$/mi,
            'insiders': /^#*\s*\**Insiders\**$/mi,
            'stop out': /^#*\s*\**(Failed )?Stop Out(s)?\**$/mi,
            'large volume': /^#*\s*\**Large Volume\**$/mi,
            'unusual pnl': /^#*\s*\**Unusual PnL\**$/mi,
            'margin level': /^#*\s*\**Margin Level\**$/mi,
            'trader activity': /^#*\s*\**Trader Activity\**$/mi,
            'affiliate': /^#*\s*\**Affiliate (Cheating)?\**$/mi,
        };
        
        // Check if query mentions any known trigger
        for (const [keyword, pattern] of Object.entries(triggerPatterns)) {
            if (queryLower.includes(keyword)) {
                // Search all documents for the trigger section
                for (const doc of this.documents) {
                    // Check in full content for the section
                    const match = doc.content.match(pattern);
                    if (match) {
                        // Find the section starting from this heading
                        const startIndex = doc.content.indexOf(match[0]);
                        
                        // Find next major heading (## or # followed by **)
                        const nextSectionMatch = doc.content.substring(startIndex + match[0].length).match(/\n#{1,2}\s+\*?\*?[A-Z]/);
                        const endIndex = nextSectionMatch 
                            ? startIndex + match[0].length + nextSectionMatch.index 
                            : Math.min(startIndex + 5000, doc.content.length);
                        
                        const sectionContent = doc.content.substring(startIndex, endIndex).trim();
                        
                        return {
                            doc,
                            section: {
                                heading: match[0].replace(/[#*]/g, '').trim(),
                                content: sectionContent,
                                level: 2
                            },
                            score: 100, // High score for direct match
                            method: 'DirectLookup'
                        };
                    }
                }
            }
        }
        
        return null;
    }

    /**
     * Direct lookup for troubleshooting sections
     * This handles common support questions with direct answers
     */
    findTroubleshootingSection(query) {
        const queryLower = query.toLowerCase();
        
        // Map of troubleshooting keywords to section patterns
        // Keywords should match common user questions
        const troubleshootingPatterns = {
            // Data issues - multiple variations
            'данные не поступают': /^##\s*Данные по сделкам/mi,
            'не поступают данные': /^##\s*Данные по сделкам/mi,
            'данные по сделкам': /^##\s*Данные по сделкам/mi,
            'данные по позициям': /^##\s*Данные по сделкам/mi,
            'задержка данных': /^##\s*Данные по сделкам/mi,
            'нет данных': /^##\s*Данные по сделкам/mi,
            'данные с задержкой': /^##\s*Данные по сделкам/mi,
            'отображаются с задержкой': /^##\s*Данные по сделкам/mi,
            'что делать, если данные': /^##\s*Данные по сделкам/mi,
            'что делать если данные': /^##\s*Данные по сделкам/mi,
            'data not showing': /^##\s*Данные по сделкам/mi,
            'data delay': /^##\s*Данные по сделкам/mi,
            
            // Alerts - multiple variations  
            'alerts по': /^##\s*Алерты и уведомления/mi,
            'алерты по': /^##\s*Алерты и уведомления/mi,
            'настроить alert': /^##\s*Алерты и уведомления/mi,
            'настроить алерт': /^##\s*Алерты и уведомления/mi,
            'превышению лимита': /^##\s*Алерты и уведомления/mi,
            'превышение лимита': /^##\s*Алерты и уведомления/mi,
            'уведомления по объему': /^##\s*Алерты и уведомления/mi,
            'уведомления по плечу': /^##\s*Алерты и уведомления/mi,
            'уведомления по убыткам': /^##\s*Алерты и уведомления/mi,
            
            // Dealing desk BI
            'dealing desk bi': /^##\s*Dealing Desk BI/mi,
            'раздел bi': /^##\s*Dealing Desk BI/mi,
            'исторические отчеты': /^##\s*Dealing Desk BI/mi,
            'исторических отчетов': /^##\s*Dealing Desk BI/mi,
            'историческими отчетами': /^##\s*Dealing Desk BI/mi,
            
            // A-Book B-Book cost
            'a-book vs b-book': /^##\s*A-Book vs B-Book/mi,
            'a-book b-book': /^##\s*A-Book vs B-Book/mi,
            'дороже обслуживания': /^##\s*A-Book vs B-Book/mi,
            'стоимость a-book': /^##\s*A-Book vs B-Book/mi,
            'стоимость хеджирования': /^##\s*A-Book vs B-Book/mi,
            'a-book поток стал дороже': /^##\s*A-Book vs B-Book/mi,
            'a-book стал дороже': /^##\s*A-Book vs B-Book/mi,
            
            // Hedge issues
            'хедж не закрылся': /^##\s*Hedge не закрылся/mi,
            'hedge не закрылся': /^##\s*Hedge не закрылся/mi,
            'проблемы с хеджем': /^##\s*Hedge не закрылся/mi,
            'хедж не закрылся полностью': /^##\s*Hedge не закрылся/mi,
            
            // Расхождения Net-Volume
            'расхождение net-volume': /^##\s*Расхождение между Net-Volume/mi,
            'расхождение между net': /^##\s*Расхождение между Net-Volume/mi,
            'расхождение net volume': /^##\s*Расхождение между Net-Volume/mi,
            'реальным net-volume и отображаемым': /^##\s*Расхождение между Net-Volume/mi,
            'реальным и отображаемым net': /^##\s*Расхождение между Net-Volume/mi,
            'условия приводят к расхождению': /^##\s*Расхождение между Net-Volume/mi,
            
            // Расхождения Equity/Exposure  
            'расхождение equity': /^##\s*Расхождение между Equity и Exposure/mi,
            'equity и exposure': /^##\s*Расхождение между Equity и Exposure/mi,
            'расхождение между equity': /^##\s*Расхождение между Equity и Exposure/mi,
            'equity и calculated exposure': /^##\s*Расхождение между Equity и Exposure/mi,
            'расхождение при высоком количестве': /^##\s*Расхождение между Equity и Exposure/mi,
            
            // Triggers not working
            'триггеры не срабатывают': /^##\s*Триггеры не срабатывают/mi,
            'триггер не работает': /^##\s*Триггеры не срабатывают/mi,
            'триггер не срабатывает': /^##\s*Триггеры не срабатывают/mi,
            
            // Открытые позиции - где посмотреть
            'открытые позиции всех клиентов': /^##\s*Где посмотреть открытые позиции/mi,
            'увидеть текущую позицию': /^##\s*Где посмотреть открытые позиции/mi,
            'открытые сделки всех клиентов': /^##\s*Где посмотреть открытые позиции/mi,
            'позиции в реальном времени': /^##\s*Где посмотреть открытые позиции/mi,
            'где посмотреть позиции': /^##\s*Где посмотреть открытые позиции/mi,
            // English variants
            'open positions of all clients': /^##\s*Где посмотреть открытые позиции/mi,
            'see current position': /^##\s*Где посмотреть открытые позиции/mi,
            'view open trades': /^##\s*Где посмотреть открытые позиции/mi,
            'positions in real time': /^##\s*Где посмотреть открытые позиции/mi,
            'real-time positions': /^##\s*Где посмотреть открытые позиции/mi,
            
            // Чистый объем - где отображается
            'чистый объем по активу': /^##\s*Где отображается чистый объем/mi,
            'чистый объём по активу': /^##\s*Где отображается чистый объем/mi,
            'net volume по символу': /^##\s*Где отображается чистый объем/mi,
            'где отображается чистый': /^##\s*Где отображается чистый объем/mi,
            'net exposure по символам': /^##\s*Где отображается чистый объем/mi,
            // English variants
            'net volume by asset': /^##\s*Где отображается чистый объем/mi,
            'net volume by symbol': /^##\s*Где отображается чистый объем/mi,
            'where is net volume': /^##\s*Где отображается чистый объем/mi,
            'net exposure by symbols': /^##\s*Где отображается чистый объем/mi,
            
            // P&L статистика
            'статистика p&l': /^##\s*Как просмотреть статистику P&L/mi,
            'статистику p&l': /^##\s*Как просмотреть статистику P&L/mi,
            'p&l с разбивкой': /^##\s*Как просмотреть статистику P&L/mi,
            'p&l по клиентам': /^##\s*Как просмотреть статистику P&L/mi,
            'p&l по активам': /^##\s*Как просмотреть статистику P&L/mi,
            'p&l по группам': /^##\s*Как просмотреть статистику P&L/mi,
            'просмотреть статистику': /^##\s*Как просмотреть статистику P&L/mi,
            // English variants
            'p&l statistics': /^##\s*Как просмотреть статистику P&L/mi,
            'p&l by clients': /^##\s*Как просмотреть статистику P&L/mi,
            'p&l by assets': /^##\s*Как просмотреть статистику P&L/mi,
            'p&l by groups': /^##\s*Как просмотреть статистику P&L/mi,
            'p&l breakdown': /^##\s*Как просмотреть статистику P&L/mi,
            'view p&l statistics': /^##\s*Как просмотреть статистику P&L/mi,
            
            // ===== ENGLISH VARIANTS FOR ALL SECTIONS =====
            
            // Data issues - English
            'data not received': /^##\s*Данные по сделкам/mi,
            'data is delayed': /^##\s*Данные по сделкам/mi,
            'trades not showing': /^##\s*Данные по сделкам/mi,
            'positions not showing': /^##\s*Данные по сделкам/mi,
            'what to do if data': /^##\s*Данные по сделкам/mi,
            
            // Alerts - English
            'configure alerts': /^##\s*Алерты и уведомления/mi,
            'set up alerts': /^##\s*Алерты и уведомления/mi,
            'alerts for volume': /^##\s*Алерты и уведомления/mi,
            'alerts for leverage': /^##\s*Алерты и уведомления/mi,
            'alerts for losses': /^##\s*Алерты и уведомления/mi,
            'limit exceeded': /^##\s*Алерты и уведомления/mi,
            'volume limit': /^##\s*Алерты и уведомления/mi,
            'leverage limit': /^##\s*Алерты и уведомления/mi,
            
            // Dealing desk BI - English
            'historical reports': /^##\s*Dealing Desk BI/mi,
            'bi section': /^##\s*Dealing Desk BI/mi,
            'business intelligence': /^##\s*Dealing Desk BI/mi,
            'where are historical reports': /^##\s*Dealing Desk BI/mi,
            
            // A-Book B-Book cost - English
            'a-book cost': /^##\s*A-Book vs B-Book/mi,
            'b-book cost': /^##\s*A-Book vs B-Book/mi,
            'a-book more expensive': /^##\s*A-Book vs B-Book/mi,
            'hedging cost': /^##\s*A-Book vs B-Book/mi,
            'a-book became more expensive': /^##\s*A-Book vs B-Book/mi,
            'cost of hedging': /^##\s*A-Book vs B-Book/mi,
            
            // Hedge issues - English
            'hedge did not close': /^##\s*Hedge не закрылся/mi,
            'hedge not closed': /^##\s*Hedge не закрылся/mi,
            'hedge problems': /^##\s*Hedge не закрылся/mi,
            'hedge didn\'t close completely': /^##\s*Hedge не закрылся/mi,
            'why hedge not closed': /^##\s*Hedge не закрылся/mi,
            
            // Net-Volume discrepancy - English
            'net-volume discrepancy': /^##\s*Расхождение между Net-Volume/mi,
            'net volume discrepancy': /^##\s*Расхождение между Net-Volume/mi,
            'discrepancy between real net-volume': /^##\s*Расхождение между Net-Volume/mi,
            'real net-volume and displayed': /^##\s*Расхождение между Net-Volume/mi,
            'conditions lead to discrepancy': /^##\s*Расхождение между Net-Volume/mi,
            
            // Equity/Exposure discrepancy - English
            'equity discrepancy': /^##\s*Расхождение между Equity и Exposure/mi,
            'equity and exposure': /^##\s*Расхождение между Equity и Exposure/mi,
            'discrepancy between equity': /^##\s*Расхождение между Equity и Exposure/mi,
            'equity and calculated exposure': /^##\s*Расхождение между Equity и Exposure/mi,
            'discrepancy with high number of positions': /^##\s*Расхождение между Equity и Exposure/mi,
            
            // P&L report questions - English
            'cumulative loss increased': /^##\s*Почему увеличился cumulative loss/mi,
            'p&l report loss increased': /^##\s*Почему увеличился cumulative loss/mi,
            'why did the cumulative loss': /^##\s*Почему увеличился cumulative loss/mi,
            'net volume remained zero': /^##\s*Почему увеличился cumulative loss/mi,
            'cumulative loss': /^##\s*Почему увеличился cumulative loss/mi,
            'loss increased': /^##\s*Почему увеличился cumulative loss/mi,
            'loss on gbpusd': /^##\s*Почему увеличился cumulative loss/mi,
            'loss on eurusd': /^##\s*Почему увеличился cumulative loss/mi,
            'p&l report': /^##\s*Как просмотреть статистику P&L/mi,
            'pnl report': /^##\s*Как просмотреть статистику P&L/mi,
            'remained at zero': /^##\s*Почему увеличился cumulative loss/mi,
            'volume remained': /^##\s*Почему увеличился cumulative loss/mi,
            'volume zero': /^##\s*Почему увеличился cumulative loss/mi,
            
            // Zero exposure but critical risk - English  
            'zero net-exposure': /^##\s*Расхождение между Equity и Exposure/mi,
            'zero exposure but risk': /^##\s*Расхождение между Equity и Exposure/mi,
            'net-exposure but risk remains': /^##\s*Расхождение между Equity и Exposure/mi,
        };
        
        // Find troubleshooting.md document
        const troubleshootingDoc = this.documents.find(doc => 
            doc.filename.toLowerCase().includes('troubleshooting')
        );
        
        if (!troubleshootingDoc) {
            return null;
        }
        
        // Check if query matches any known troubleshooting topic
        for (const [keyword, pattern] of Object.entries(troubleshootingPatterns)) {
            if (queryLower.includes(keyword)) {
                const match = troubleshootingDoc.content.match(pattern);
                if (match) {
                    const startIndex = troubleshootingDoc.content.indexOf(match[0]);
                    
                    // Find next section heading (## or ---)
                    const restContent = troubleshootingDoc.content.substring(startIndex + match[0].length);
                    const nextSectionMatch = restContent.match(/\n---\n|^\n##\s+/m);
                    const endIndex = nextSectionMatch 
                        ? startIndex + match[0].length + nextSectionMatch.index 
                        : Math.min(startIndex + 5000, troubleshootingDoc.content.length);
                    
                    const sectionContent = troubleshootingDoc.content.substring(startIndex, endIndex).trim();
                    
                    return {
                        doc: troubleshootingDoc,
                        section: {
                            heading: match[0].replace(/[#*]/g, '').trim(),
                            content: sectionContent,
                            level: 2
                        },
                        score: 100,
                        method: 'TroubleshootingLookup'
                    };
                }
            }
        }
        
        return null;
    }

    /**
     * BM25 keyword search
     */
    bm25Search(query, docs = this.documents) {
        const results = [];
        const queryLower = query.toLowerCase();
        const queryTerms = queryLower.split(/\s+/).filter(t => t.length > 2);
        
        this.tfidf.tfidfs(query, (docIndex, score) => {
            if (docIndex < docs.length && score > 0) {
                const doc = docs[docIndex];
                
                // Find the best matching section within the document
                // instead of just returning the first section
                let bestSection = null;
                let bestSectionScore = 0;
                
                for (const section of doc.sections) {
                    // Skip Table of Contents and similar index sections
                    if (/table of contents|оглавление|содержание|index$/i.test(section.heading)) {
                        continue;
                    }
                    
                    const sectionText = `${section.heading} ${section.content}`.toLowerCase();
                    
                    // Score based on query term matches in section
                    let sectionScore = 0;
                    for (const term of queryTerms) {
                        // Escape special regex characters in term
                        const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                        try {
                            const matches = (sectionText.match(new RegExp(escapedTerm, 'gi')) || []).length;
                            sectionScore += matches;
                        } catch (e) {
                            // Fallback to simple includes if regex fails
                            if (sectionText.includes(term)) sectionScore += 1;
                        }
                        
                        // Bonus for term in heading
                        if (section.heading.toLowerCase().includes(term)) {
                            sectionScore += 5;
                        }
                    }
                    
                    // Extra bonus if section heading matches a known trigger name
                    if (/achieved profit|latency arbitrage|cid control|ip control|bad rates|churning|overdue credits|insiders|stop out|large volume|unusual pnl|margin level|trader activity|affiliate/i.test(section.heading)) {
                        // Check if query is asking about this trigger
                        for (const term of queryTerms) {
                            if (section.heading.toLowerCase().includes(term)) {
                                sectionScore += 20; // Big bonus for matching trigger section
                            }
                        }
                    }
                    
                    if (sectionScore > bestSectionScore) {
                        bestSectionScore = sectionScore;
                        bestSection = section;
                    }
                }
                
                // If no good section found, skip "Table of Contents" and use next section
                if (!bestSection && doc.sections.length > 1) {
                    for (const section of doc.sections) {
                        if (!/table of contents|оглавление|содержание/i.test(section.heading)) {
                            bestSection = section;
                            break;
                        }
                    }
                }
                
                if (!bestSection) {
                    bestSection = doc.sections[0];
                }
                
                results.push({
                    doc,
                    section: bestSection,
                    score: score + bestSectionScore * 0.1, // Boost score based on section match
                    method: 'BM25'
                });
            }
        });
        
        return results.sort((a, b) => b.score - a.score);
    }

    /**
     * Vector semantic search
     */
    async vectorSearch(query, docs = this.documents) {
        if (!process.env.OPENAI_API_KEY) {
            return [];
        }
        
        try {
            // Generate query embedding
            const response = await this.openai.embeddings.create({
                model: this.config.embeddingModel,
                input: query,
            });
            
            const queryVector = response.data[0].embedding;
            
            // Calculate cosine similarity with all document embeddings
            const results = [];
            
            for (const [key, embData] of this.embeddings.entries()) {
                const doc = this.documents.find(d => d.id === embData.docId);
                if (!doc || !docs.includes(doc)) continue;
                
                const similarity = this.cosineSimilarity(queryVector, embData.vector);
                
                if (similarity > this.config.minScore) {
                    results.push({
                        doc,
                        section: doc.sections[embData.sectionIndex],
                        score: similarity,
                        method: 'Vector'
                    });
                }
            }
            
            return results.sort((a, b) => b.score - a.score);
            
        } catch (error) {
            logger.warn('Vector search failed:', error.message);
            return [];
        }
    }

    /**
     * Merge BM25 and Vector results with weighted scoring
     */
    mergeResults(bm25Results, vectorResults) {
        const merged = new Map();
        
        // Normalize BM25 scores (0-1)
        const maxBM25 = bm25Results[0]?.score || 1;
        for (const result of bm25Results) {
            const normalizedScore = result.score / maxBM25;
            const key = `${result.doc.id}_${result.section.heading}`;
            
            merged.set(key, {
                ...result,
                bm25Score: normalizedScore,
                vectorScore: 0,
                hybridScore: normalizedScore * this.config.bm25Weight
            });
        }
        
        // Add vector scores (already 0-1 from cosine similarity)
        for (const result of vectorResults) {
            const key = `${result.doc.id}_${result.section.heading}`;
            
            if (merged.has(key)) {
                const existing = merged.get(key);
                existing.vectorScore = result.score;
                existing.hybridScore = 
                    (existing.bm25Score * this.config.bm25Weight) +
                    (result.score * this.config.vectorWeight);
                existing.method = 'Hybrid';
            } else {
                merged.set(key, {
                    ...result,
                    bm25Score: 0,
                    vectorScore: result.score,
                    hybridScore: result.score * this.config.vectorWeight
                });
            }
        }
        
        // Convert to array and sort by hybrid score
        const results = Array.from(merged.values())
            .sort((a, b) => b.hybridScore - a.hybridScore)
            .slice(0, this.config.maxResults);
        
        // Log search stats
        logger.info('Search results:', {
            bm25Count: bm25Results.length,
            vectorCount: vectorResults.length,
            hybridCount: results.length,
            topScore: results[0]?.hybridScore.toFixed(3),
            topMethod: results[0]?.method
        });
        
        return results;
    }

    /**
     * Format context with citations
     */
    formatContextWithCitations(results, options = {}) {
        if (results.length === 0) {
            return { context: '', sources: [] };
        }
        
        let context = '📚 RELEVANT DOCUMENTATION:\n\n';
        const sources = [];
        
        for (let i = 0; i < results.length; i++) {
            const { doc, section, hybridScore, method } = results[i];
            
            // Add document info WITHOUT citation markers
            context += `### 📄 ${doc.title}\n`;
            context += `**Section:** ${section.heading}\n`;
            
            if (options.showScores) {
                context += `*Relevance: ${(hybridScore * 100).toFixed(1)}% (${method})*\n`;
            }
            
            // Add section content (up to 800 chars)
            context += `${section.content.substring(0, 800)}\n\n`;
            
            // No citation markers - they cause AI to add (Source: [N]) in responses
            
            context += '---\n\n';
            
            // Store source for internal reference (without citation id)
            sources.push({
                filename: doc.filename,
                title: doc.title,
                section: section.heading,
                category: doc.metadata.category,
                score: hybridScore
            });
        }
        
        return { context, sources };
    }

    /**
     * Filter documents by category
     */
    filterByCategory(category) {
        return this.documents.filter(doc => 
            doc.metadata.category.toLowerCase() === category.toLowerCase()
        );
    }

    /**
     * Cosine similarity between two vectors
     */
    cosineSimilarity(vecA, vecB) {
        let dotProduct = 0;
        let normA = 0;
        let normB = 0;
        
        for (let i = 0; i < vecA.length; i++) {
            dotProduct += vecA[i] * vecB[i];
            normA += vecA[i] * vecA[i];
            normB += vecB[i] * vecB[i];
        }
        
        return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
    }

    /**
     * Fallback to simple search if hybrid fails
     */
    fallbackSearch(query) {
        logger.warn('Using fallback keyword search');
        const results = this.bm25Search(query);
        return this.formatContextWithCitations(results.slice(0, 5));
    }

    /**
     * Get available categories
     */
    getCategories() {
        const categories = new Set();
        for (const doc of this.documents) {
            categories.add(doc.metadata.category);
        }
        return Array.from(categories).sort();
    }

    /**
     * Reload documentation
     */
    async reload() {
        this.documents = [];
        this.embeddings.clear();
        this.metadata.clear();
        this.tfidf = new natural.TfIdf();
        this.documentsLoaded = false;
        await this.initialize();
    }
}

// Export singleton instance
module.exports = new HybridRAGService();

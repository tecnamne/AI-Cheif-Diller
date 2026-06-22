const fs = require('fs').promises;
const path = require('path');
const logger = require('../utils/logger');

/**
 * RAG (Retrieval-Augmented Generation) Service
 * Loads and searches through platform documentation
 */
class RAGService {
    constructor() {
        this.documents = [];
        this.documentsLoaded = false;
        this.docsPath = path.join(__dirname, '../docs');
    }

    /**
     * Initialize and load all documentation
     */
    async initialize() {
        try {
            logger.info('Loading documentation for RAG...');
            await this.loadDocuments();
            this.documentsLoaded = true;
            logger.info(`RAG initialized with ${this.documents.length} documents`);
        } catch (error) {
            logger.logError(error, { context: 'RAG initialization' });
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
                
                // Parse document
                const doc = this.parseDocument(file, content);
                this.documents.push(doc);
            }
        } catch (error) {
            logger.logError(error, { context: 'Loading documents' });
            // If docs don't exist yet, create empty array
            this.documents = [];
        }
    }

    /**
     * Parse markdown document into structured format
     */
    parseDocument(filename, content) {
        // Extract title from first heading or filename
        const titleMatch = content.match(/^#\s+(.+)$/m);
        const title = titleMatch ? titleMatch[1] : filename.replace('.md', '');
        
        // Split into sections by headings
        const sections = [];
        const sectionRegex = /^##\s+(.+)$/gm;
        let lastIndex = 0;
        let match;
        
        while ((match = sectionRegex.exec(content)) !== null) {
            if (lastIndex > 0) {
                const prevMatch = content.substring(lastIndex, match.index);
                sections.push({
                    heading: sections[sections.length - 1]?.heading || '',
                    content: prevMatch.trim(),
                });
            }
            sections.push({ heading: match[1], content: '' });
            lastIndex = match.index + match[0].length;
        }
        
        // Add last section
        if (lastIndex > 0 && sections.length > 0) {
            sections[sections.length - 1].content = content.substring(lastIndex).trim();
        }
        
        return {
            filename,
            title,
            content: content,
            sections: sections.length > 0 ? sections : [{ heading: title, content }],
        };
    }

    /**
     * Search for relevant documentation based on user query
     * Smart scoring algorithm that searches across ALL documents
     */
    searchRelevantContext(query, maxResults = 10) {
        if (!this.documentsLoaded || this.documents.length === 0) {
            return '';
        }
        
        const queryLower = query.toLowerCase();
        // Extract keywords (words longer than 2 chars for multilingual support)
        const keywords = queryLower.split(/\s+/).filter(word => word.length > 2);
        
        // Score each document section
        const scoredSections = [];
        
        for (const doc of this.documents) {
            const docTitleLower = doc.title.toLowerCase();
            
            for (const section of doc.sections) {
                const sectionHeadingLower = section.heading.toLowerCase();
                const sectionContentLower = section.content.toLowerCase();
                const fullText = `${docTitleLower} ${sectionHeadingLower} ${sectionContentLower}`;
                let score = 0;
                
                // 1. EXACT PHRASE MATCH (highest priority)
                if (queryLower.length > 5 && fullText.includes(queryLower)) {
                    score += 100; // Massive boost for exact phrase anywhere
                }
                
                // 2. TITLE MATCHING (document is about this topic)
                for (const keyword of keywords) {
                    if (docTitleLower.includes(keyword)) {
                        score += 20; // Document title match = very relevant
                    }
                }
                
                // 3. HEADING MATCHING (section is about this topic)
                for (const keyword of keywords) {
                    if (sectionHeadingLower.includes(keyword)) {
                        score += 15; // Section heading match = relevant
                    }
                }
                
                // 4. CONTENT KEYWORD DENSITY
                for (const keyword of keywords) {
                    // Count occurrences in content
                    const regex = new RegExp(keyword, 'gi');
                    const matches = (fullText.match(regex) || []).length;
                    score += matches * 2; // Each mention adds to relevance
                }
                
                // 5. MULTI-KEYWORD BONUS (all keywords present)
                const allKeywordsPresent = keywords.every(kw => fullText.includes(kw));
                if (allKeywordsPresent && keywords.length > 1) {
                    score += 30; // Bonus if all keywords found
                }
                
                // 6. BASIC TRANSLATION SUPPORT (Russian ↔ English common terms)
                const translations = {
                    'свопы': 'swap', 'своп': 'swap',
                    'счет': 'account', 'счета': 'account',
                    'символ': 'symbol', 'символы': 'symbol',
                    'настройки': 'settings', 'настройка': 'settings',
                    'тема': 'theme', 'темная': 'dark', 'светлая': 'light',
                    'где': 'where', 'как': 'how', 'что': 'what',
                    // Trigger-related translations
                    'триггер': 'trigger', 'триггеры': 'trigger',
                    'профит': 'profit', 'прибыль': 'profit',
                    'арбитраж': 'arbitrage', 'латенси': 'latency',
                    'алерт': 'alert', 'уведомление': 'notification',
                    'срабатывает': 'trigger', 'срабатывание': 'activation',
                    'работает': 'works', 'делает': 'does',
                    'логика': 'logic', 'условие': 'condition'
                };
                
                for (const [rus, eng] of Object.entries(translations)) {
                    if (queryLower.includes(rus) && fullText.includes(eng)) {
                        score += 10; // Translation match bonus
                    }
                }
                
                if (score > 0) {
                    scoredSections.push({
                        doc,
                        section,
                        score,
                    });
                }
            }
        }
        
        // Sort by score and get top results
        scoredSections.sort((a, b) => b.score - a.score);
        
        // Log top 10 results for debugging
        logger.info('RAG search results:', {
            query: query.substring(0, 50),
            totalFound: scoredSections.length,
            topResults: scoredSections.slice(0, 10).map(s => ({
                title: s.doc.title.substring(0, 30),
                heading: s.section.heading.substring(0, 40),
                score: s.score
            }))
        });
        
        const topSections = scoredSections.slice(0, maxResults);
        
        // Format context
        if (topSections.length === 0) {
            return '';
        }
        
        let context = 'RELEVANT DOCUMENTATION (multiple sources):\n\n';
        
        for (const { doc, section } of topSections) {
            context += `### 📄 ${doc.title}\n**Section:** ${section.heading}\n`;
            // Show more content (800 chars instead of 500)
            context += `${section.content.substring(0, 800)}\n\n`;
            context += '---\n\n';
        }
        
        return context;
    }

    /**
     * Get all available documentation titles
     */
    getAvailableTopics() {
        return this.documents.map(doc => doc.title);
    }

    /**
     * Reload documentation (useful for updates)
     */
    async reload() {
        this.documents = [];
        this.documentsLoaded = false;
        await this.initialize();
    }
}

// Export singleton instance
module.exports = new RAGService();

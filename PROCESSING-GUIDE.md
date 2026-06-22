# 📚 Documentation Processing Guide

## Current Status

✅ **Local documentation processed successfully!**
- **90 markdown files** from `docs-main/docs/`
- **11 category files** generated
- **RAG system loaded** with all documentation

## 📁 Generated Files

The following files are now available for the AI bot:

1. **bonuses-&-challenges.md** - Bonus system documentation
2. **current-session.md** - Real-time session monitoring (12 sections)
3. **dashboards.md** - Dashboard features
4. **dealing-desk.md** - Dealing desk operations (12 sections)
5. **dealing-operations.md** - Trading operations (4 sections)
6. **directory-&-data.md** - Data management (3 sections)
7. **general-information.md** - Platform basics (11 sections)
8. **general.md** - General overview
9. **reporting-system.md** - Reporting features
10. **risk-management.md** - Risk management tools (44 sections!)
11. **platform-complete-guide.md** - Complete documentation in one file

## 🔄 Adding Azure Wiki Documentation

To add documentation from Azure DevOps Wiki:

### Step 1: Clone the Wiki

```powershell
cd ai-support-bot/scripts
.\clone-azure-wiki.ps1
```

**You will need:**
- Azure DevOps credentials
- Access to the Trading Platform project

### Step 2: Process All Documentation

After cloning, run the processing script:

```powershell
cd ai-support-bot
node scripts/process-docs.js
```

This will:
- ✅ Process local `docs-main/docs/`
- ✅ Process Azure wiki `azure-wiki/`
- ✅ Combine all into category files
- ✅ Generate complete guide

### Step 3: Restart Backend

```powershell
cd backend
node server.js
```

The RAG system will automatically load all updated documentation!

## 🛠️ Manual Processing

If you need to reprocess documentation:

```bash
# Process all available documentation sources
node scripts/process-docs.js

# Restart backend to reload RAG
cd backend
node server.js
```

## 📊 Documentation Statistics

**Current (Local only):**
- Total files: 90
- Categories: 10
- Risk Management: 44 sections
- Dealing Desk: 12 sections
- Current Session: 12 sections

**After Azure Wiki:**
- Will include additional wiki pages
- Combined with local documentation
- All in RAG-optimized format

## 🎯 How RAG Uses Documentation

The RAG (Retrieval-Augmented Generation) system:

1. **Loads** all `.md` files from `docs/` directory
2. **Indexes** content with keyword-based search
3. **Searches** relevant sections when user asks a question
4. **Provides context** to Gemini AI for accurate answers

## 🔧 Troubleshooting

### Azure Clone Fails

If authentication fails:
1. Generate Personal Access Token (PAT) in Azure DevOps
2. Use format: `https://PAT@dev.azure.com/...`

### Documentation Not Loading

Check backend logs:
```
[info]: RAG initialized with X documents
```

If X is low, reprocess documentation.

### Want to Update Docs

1. Edit/add files in `docs-main/docs/` or `azure-wiki/`
2. Run `node scripts/process-docs.js`
3. Restart backend server

## 📝 File Structure

```
ai-support-bot/
├── docs/
│   ├── docs-main/          # Original Docusaurus docs
│   ├── azure-wiki/         # Azure DevOps Wiki (after cloning)
│   ├── *.md               # Generated RAG-ready files
│   └── platform-complete-guide.md
├── scripts/
│   ├── process-docs.js    # Documentation processor
│   └── clone-azure-wiki.ps1
└── backend/
    └── services/
        └── rag.service.js  # RAG loader
```

## ✅ Next Steps

1. **Test the bot** - Ask questions about features
2. **Clone Azure wiki** - Get additional documentation
3. **Reprocess** - Combine all sources
4. **Enjoy** - Full-featured AI support bot!

# 🎯 TafHub AI Training Guide

> **Train your AI model with TafHub website content to understand their business, brand voice, and communication style**

## 🚀 Quick Start

### **1. Run TafHub Training**
```bash
# Method 1: Using npm script
npm run train:tafhub

# Method 2: Direct script execution
node train-tafhub.js

# Method 3: After building
npm run build
node build/Agent/training/TafHubTraining.js
```

### **2. What Happens During Training**
1. **🌐 Website Scraping**: Crawls TafHub website pages
2. **🧹 Content Cleaning**: Removes HTML and extracts clean text
3. **🤖 AI Learning**: Trains the model with extracted content
4. **💾 Data Storage**: Saves training data for future use

## 📋 Training Process

### **Phase 1: Content Discovery**
- Starts with `https://tafhub.com/`
- Discovers all internal links
- Identifies relevant content pages
- Respects robots.txt and rate limits

### **Phase 2: Content Extraction**
- Scrapes text content from each page
- Removes navigation, headers, footers
- Focuses on main content areas
- Cleans and normalizes text

### **Phase 3: AI Training**
- Combines all extracted content
- Creates training prompts
- Runs AI model training
- Learns brand voice and style

## ⚙️ Configuration

### **Training Parameters**
```json
{
  "maxContentLength": 5000,        // Max characters per training prompt
  "minContentLength": 100,         // Min content to consider valid
  "delayBetweenRequests": 2000,    // Delay between page requests (ms)
  "timeout": 30000,                // Page load timeout (ms)
  "maxPages": 20                   // Maximum pages to scrape
}
```

### **Content Selectors**
```json
{
  "contentSelectors": [
    "main",        // Main content area
    "#main",       // Main content ID
    ".main",       // Main content class
    "article",     // Article content
    ".content",    // Content class
    "#content"     // Content ID
  ],
  "excludeSelectors": [
    "nav",         // Navigation
    "header",      // Header
    "footer",      // Footer
    ".sidebar",    // Sidebar
    ".navigation"  // Navigation class
  ]
}
```

## 🎯 What the AI Learns

### **Business Understanding**
- Company services and offerings
- Target audience and market
- Value propositions
- Industry positioning

### **Brand Voice & Style**
- Communication tone
- Professional language
- Technical terminology
- Customer approach

### **Content Patterns**
- Writing style
- Key messaging themes
- Service descriptions
- Problem-solution framing

## 📊 Training Results

### **Expected Output**
```
🚀 Starting TafHub AI Training Process...

📡 Step 1: Scraping TafHub website content...
Processing: https://tafhub.com/
Processing: https://tafhub.com/about
Processing: https://tafhub.com/services
Processing: https://tafhub.com/contact

✅ Successfully scraped 15 pages from TafHub

🧠 Step 2: Training AI model with scraped content...
AI training completed successfully!

🎉 TafHub AI training completed successfully!
```

### **Training Data Location**
- **Scraped Content**: `logs/` directory
- **Training Results**: Console output
- **AI Model**: Updated with new knowledge

## 🔧 Customization

### **Modify Target Pages**
Edit `tafhub-training-config.json`:
```json
{
  "targetPages": [
    "https://tafhub.com/",
    "https://tafhub.com/custom-page",
    "https://tafhub.com/another-page"
  ]
}
```

### **Adjust Content Selectors**
```json
{
  "contentSelectors": [
    ".your-custom-content",
    "#specific-content-area",
    "div[data-content='main']"
  ]
}
```

### **Change Training Parameters**
```json
{
  "trainingParameters": {
    "maxPages": 50,
    "delayBetweenRequests": 5000,
    "maxContentLength": 10000
  }
}
```

## 🚨 Important Notes

### **Rate Limiting**
- Built-in 2-second delays between requests
- Respects website server capacity
- Avoids overwhelming the target site

### **Content Quality**
- Only processes meaningful content (>100 characters)
- Filters out navigation and boilerplate
- Focuses on business-relevant information

### **Error Handling**
- Graceful failure for inaccessible pages
- Continues processing other pages
- Comprehensive logging for debugging

### **Debug Mode**
Enable detailed logging:
```typescript
// In TafHubTraining.ts
logger.setLevel('debug');
```

## 📈 Advanced Usage

### **Batch Training**
Train multiple websites:
```bash
npm run train:tafhub
npm run train:link  # Generic website training
npm run train:audio # Audio file training
```

### **Incremental Training**
- Run training periodically
- Update content as websites change
- Maintain fresh AI knowledge

### **Custom Training Prompts**
Modify the training prompt in `TafHubTraining.ts`:
```typescript
const trainingPrompt = `
Your custom training prompt here...
${combinedContent}
`;
```

## 🌟 Best Practices

1. **Start Small**: Begin with main pages
2. **Monitor Results**: Check training output quality
3. **Respect Limits**: Don't overwhelm target websites
4. **Regular Updates**: Retrain periodically
5. **Validate Content**: Review scraped content quality

## 🎉 Success Metrics

- **Content Pages**: 15+ pages scraped
- **Content Quality**: Meaningful business information
- **AI Training**: Successful model updates
- **Performance**: Fast, reliable training process

---

**Transform your AI model with TafHub's business intelligence! 🚀**

*Your AI will now understand TafHub's business model, brand voice, and communication style* 
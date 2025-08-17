# Instagram AI Agent 🤖📱

> An intelligent, AI-powered Instagram automation tool that combines web scraping, browser automation, and artificial intelligence to create engaging social media interactions.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

## 🌟 Features

### 🤖 **AI-Powered Content Generation**
- **Google Gemini AI Integration**: Uses Google's latest AI model for intelligent content creation
- **Smart Caption Generation**: Creates engaging, contextually relevant Instagram captions
- **Personalized Comments**: Generates thoughtful, human-like responses to posts
- **Multi-format Training**: Learns from YouTube transcripts, audio files, PDFs, and websites

### 📱 **Instagram Automation**
- **Automatic Login**: Secure credential management with cookie persistence
- **Smart Post Interaction**: Automatically likes and comments on relevant posts
- **Rate Limiting**: Built-in delays to avoid Instagram detection
- **Stealth Mode**: Advanced anti-detection techniques using Puppeteer

### 🎯 **Niche Targeting & Lead Generation**
- **Intelligent User Discovery**: Finds people in your specific niche using hashtags and keywords
- **AI-Powered Analysis**: Analyzes user profiles to identify pain points and needs
- **Service Matching**: Automatically matches user needs with your business services
- **Personalized Outreach**: Generates custom messages for each prospect

### 🛡️ **Safety & Security**
- **Proxy Support**: IP rotation and proxy management
- **Error Handling**: Graceful failure recovery and comprehensive logging
- **Session Management**: Persistent login sessions with cookie management
- **Rate Limiting**: Configurable delays to maintain natural behavior

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB (local or cloud)
- Google Gemini API key
- Instagram account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/Instagram-AI-Agent.git
   cd Instagram-AI-Agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

4. **Configure your business services**
   ```env
   # Instagram Credentials
   IGusername=your_instagram_username
   IGpassword=your_instagram_password
   
   # Google Gemini AI
   GEMINI_API_KEY=your_gemini_api_key
   
   # MongoDB
   MONGODB_URI=mongodb://localhost:27017/instagram-ai-agent
   
   # Business Services (JSON format)
   BUSINESS_SERVICES=[
     {
       "name": "Your Service Name",
       "description": "What you do for clients",
       "targetNiche": ["small business", "startup", "entrepreneur"],
       "painPoints": ["problem 1", "problem 2"],
       "valueProposition": "How you solve their problems"
     }
   ]
   
   # Niche Targeting
   NICHE_TARGETING={
     "targetNiche": ["small business", "startup", "entrepreneur"],
     "keywords": ["business owner", "entrepreneur", "startup"],
     "hashtags": ["#smallbusiness", "#entrepreneur", "#startup"],
     "minFollowers": 1000,
     "maxFollowers": 50000
   }
   ```

5. **Start the application**
   ```bash
   # Run Instagram automation
   npm start
   
   # Run niche hunting
   npm run niche-hunt
   
   # Run with custom settings
   npm run niche-hunt:custom
   ```

## 📋 Available Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start the main Instagram automation |
| `npm run niche-hunt` | Run niche hunting with default settings |
| `npm run niche-hunt:custom` | Run niche hunting with custom configuration |
| `npm run train-model` | Train the AI model with custom data |
| `npm run train:link` | Train with website content |
| `npm run train:audio` | Train with audio files |

## 🏗️ Project Structure

```
src/
├── Agent/                 # AI agent logic and training
│   ├── characters/        # AI personality configurations
│   ├── schema/           # AI response schemas
│   ├── script/           # AI training scripts
│   └── training/         # Training data processors
├── client/               # Platform-specific bots
│   ├── IG-bot/          # Instagram bot implementation
│   ├── X-bot/           # Twitter bot (planned)
│   └── Github/          # GitHub bot (planned)
├── config/               # Configuration files
│   ├── db.ts            # Database connection
│   └── logger.ts        # Logging configuration
├── services/             # Core business logic
├── utils/                # Helper functions
├── types/                # TypeScript type definitions
└── index.ts              # Main entry point
```

## 🎯 Use Cases

### **Social Media Management**
- Automate routine Instagram interactions
- Generate engaging content with AI
- Maintain consistent posting schedule
- Engage with followers automatically

### **Lead Generation**
- Find prospects in your target niche
- Analyze user needs and pain points
- Generate personalized outreach messages
- Automate initial contact process

### **Content Creation**
- AI-powered caption generation
- Smart hashtag suggestions
- Content optimization recommendations
- Brand voice consistency

### **Business Development**
- Identify potential clients
- Research market opportunities
- Monitor competitor activity
- Generate business insights

## ⚙️ Configuration

### **Business Services**
Define what you offer in the `BUSINESS_SERVICES` array:

```json
{
  "name": "Service Name",
  "description": "Service description",
  "targetNiche": ["niche1", "niche2"],
  "painPoints": ["problem1", "problem2"],
  "valueProposition": "How you solve problems"
}
```

### **Niche Targeting**
Configure your target audience in `NICHE_TARGETING`:

```json
{
  "targetNiche": ["small business", "startup"],
  "keywords": ["entrepreneur", "business owner"],
  "hashtags": ["#smallbusiness", "#entrepreneur"],
  "minFollowers": 1000,
  "maxFollowers": 50000
}
```

### **AI Training**
Train the AI with your specific content:

```bash
# Train with YouTube video
npm run train:youtube

# Train with website content
npm run train:link

# Train with audio files
npm run train:audio
```

## 🔧 Advanced Features

### **Multi-Platform Support**
- Instagram (fully implemented)
- Twitter (planned)
- GitHub (planned)

### **AI Training Sources**
- YouTube video transcripts
- Audio files (MP3, WAV)
- PDF documents
- Website content
- Text files

### **Custom AI Personalities**
Create custom AI personalities in `src/Agent/characters/`:

```json
{
  "name": "Your Brand Voice",
  "style": "professional",
  "tone": "friendly",
  "keywords": ["your", "brand", "terms"]
}
```

## 🛡️ Safety & Best Practices

### **Rate Limiting**
- Built-in delays between actions
- Random timing variations
- Configurable interaction limits

### **Anti-Detection**
- Stealth browser plugins
- User agent rotation
- Cookie management
- Proxy support

### **Instagram Compliance**
- Respects community guidelines
- Avoids spam-like behavior
- Natural interaction patterns
- Error handling and recovery

## 📊 Monitoring & Analytics

### **Logging**
- Comprehensive activity logs
- Error tracking and reporting
- Performance metrics
- User interaction history

### **Database Storage**
- User analysis results
- Interaction history
- Performance metrics
- Configuration backups

## 🚨 Important Notes

- **Terms of Service**: Always comply with Instagram's terms
- **Rate Limits**: Respect platform rate limits
- **Privacy**: Handle user data responsibly
- **Testing**: Test with small numbers first
- **Monitoring**: Regularly check for issues

## 🔍 Troubleshooting

### **Common Issues**

1. **Login Failed**
   - Check Instagram credentials
   - Verify 2FA settings
   - Clear cookies and retry

2. **No Users Found**
   - Adjust targeting criteria
   - Check hashtag relevance
   - Verify API key validity

3. **Messages Not Sending**
   - Check Instagram limits
   - Verify account status
   - Review message content

### **Performance Tips**
- Start with small user counts
- Use specific, relevant hashtags
- Monitor response rates
- Adjust confidence thresholds

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### **Development Setup**
```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run tests
npm test

# Build project
npm run build
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Google Generative AI](https://ai.google.dev/) for AI capabilities
- [Puppeteer](https://github.com/puppeteer/puppeteer) for browser automation
- [MongoDB](https://www.mongodb.com/) for data persistence
- [Express.js](https://expressjs.com/) for web framework

## 📞 Support

- **Documentation**: [Wiki](https://github.com/yourusername/Instagram-AI-Agent/wiki)
- **Issues**: [GitHub Issues](https://github.com/yourusername/Instagram-AI-Agent/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/Instagram-AI-Agent/discussions)

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/Instagram-AI-Agent&type=Date)](https://star-history.com/#yourusername/Instagram-AI-Agent&Date)

---

**Made with ❤️ by the Instagram AI Agent Team**

*Transform your Instagram presence with the power of AI*

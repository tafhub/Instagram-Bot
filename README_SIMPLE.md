# Instagram AI Agent 🚀

> **AI-powered Instagram automation for smart social media management and lead generation**

## ✨ What It Does

- 🤖 **AI Content Generation**: Creates engaging captions and comments using Google Gemini AI
- 📱 **Instagram Automation**: Automatically likes posts and leaves thoughtful comments
- 🎯 **Lead Generation**: Finds people in your niche and sends personalized outreach messages
- 🧠 **Smart Learning**: Trains on your content to match your brand voice

## 🚀 Quick Start

### 1. Install
```bash
git clone https://github.com/yourusername/Instagram-AI-Agent.git
cd Instagram-AI-Agent
npm install
```

### 2. Configure
Create a `.env` file with:
```env
# Instagram Login
IGusername=your_username
IGpassword=your_password

# AI API Key
GEMINI_API_KEY=your_gemini_api_key

# Business Info
BUSINESS_SERVICES=[
  {
    "name": "Your Service",
    "description": "What you do",
    "targetNiche": ["small business", "entrepreneur"],
    "painPoints": ["problem 1", "problem 2"],
    "valueProposition": "How you help"
  }
]
```

### 3. Run
```bash
# Start Instagram automation
npm start

# Find leads in your niche
npm run niche-hunt

# Custom settings
npm run niche-hunt:custom
```

## 🎯 Key Features

| Feature | Description |
|---------|-------------|
| **AI Content** | Generate captions and comments with Google Gemini AI |
| **Auto Engagement** | Like and comment on posts automatically |
| **Lead Discovery** | Find prospects in your target niche |
| **Smart Analysis** | AI analyzes user needs and pain points |
| **Personalized Outreach** | Send custom messages to qualified leads |
| **Stealth Mode** | Advanced anti-detection techniques |

## 📱 Commands

- `npm start` - Run Instagram automation
- `npm run niche-hunt` - Find leads (default: 20 users)
- `npm run niche-hunt:custom` - Custom settings
- `npm run train:link` - Train AI with website content
- `npm run train:audio` - Train AI with audio files

## 🛡️ Safety Features

- ✅ Rate limiting to avoid detection
- ✅ Stealth browser automation
- ✅ Cookie management for sessions
- ✅ Error handling and recovery
- ✅ Proxy support for IP rotation

## 🔧 Configuration

### Business Services
Define what you offer and who you help:
```json
{
  "name": "Social Media Management",
  "targetNiche": ["small business", "startup"],
  "painPoints": ["no time for social media", "low engagement"],
  "valueProposition": "We handle your social media so you can focus on business"
}
```

### Niche Targeting
Set your target audience:
```json
{
  "keywords": ["business owner", "entrepreneur"],
  "hashtags": ["#smallbusiness", "#entrepreneur"],
  "minFollowers": 1000,
  "maxFollowers": 50000
}
```

## 📊 Example Results

```
🎯 Found 15 potential leads in your niche!

📊 Results:
   High Confidence (80%+): 10 users
   Medium Confidence (60-79%): 3 users
   Low Confidence (<60%): 2 users

📤 Sent 13 personalized outreach messages
```

## 🚨 Important Notes

- **Start Small**: Begin with 10-20 users to test
- **Monitor Results**: Check which messages get responses
- **Stay Compliant**: Follow Instagram's terms of service
- **Rate Limits**: Built-in delays prevent detection

## 🆘 Need Help?

1. **Check Logs**: Look in the `logs/` directory
2. **Verify Config**: Ensure your `.env` file is set up correctly
3. **Test First**: Use `npm run niche-hunt:custom` with small numbers
4. **Check API Key**: Verify your Gemini API key is valid

## 🌟 Pro Tips

- Use specific, relevant hashtags for better targeting
- Regularly update your business service descriptions
- Monitor Instagram's terms of service changes
- Start with conservative settings and scale up

---

**Transform your Instagram presence with AI-powered automation! 🚀**

*Built with TypeScript, Node.js, and Google Gemini AI* 
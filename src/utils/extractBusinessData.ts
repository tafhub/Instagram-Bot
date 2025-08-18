import { promises as fs } from 'fs';
import path from 'path';
import logger from '../config/logger';

interface BusinessData {
    companyName: string;
    brandVoice: string;
    targetAudience: string;
    keyServices: string[];
    communicationStyle: string;
    businessModel: string;
    valuePropositions: string[];
    industry: string;
}

interface ScrapedDataEntry {
    link: string;
    content: string;
}

export async function extractBusinessData(): Promise<BusinessData> {
    try {
        const scrapedDataPath = path.join(__dirname, '../data/scrapedData.json');
        
        // Check if file exists
        try {
            await fs.access(scrapedDataPath);
        } catch {
            logger.warn('scrapedData.json not found, returning default business data');
            return getDefaultBusinessData();
        }

        // Read the large scraped data file
        const rawData = await fs.readFile(scrapedDataPath, 'utf-8');
        const scrapedData: ScrapedDataEntry[] = JSON.parse(rawData);

        logger.info(`Processing ${scrapedData.length} scraped entries...`);

        // Extract business information using AI-like pattern matching
        const businessData = await processScrapedData(scrapedData);
        
        // Save the extracted business data to a clean file
        await saveBusinessData(businessData);
        
        return businessData;
    } catch (error) {
        logger.error('Error extracting business data:', error);
        return getDefaultBusinessData();
    }
}

async function processScrapedData(scrapedData: ScrapedDataEntry[]): Promise<BusinessData> {
    // Focus on main business pages first
    const priorityPages = [
        'tafhub.com/',
        'tafhub.com/about',
        'tafhub.com/services',
        'tafhub.com/contact'
    ];

    let combinedContent = '';
    
    // Process priority pages first
    for (const page of priorityPages) {
        const entry = scrapedData.find(e => e.link.includes(page));
        if (entry) {
            combinedContent += ' ' + entry.content;
            logger.info(`Processed priority page: ${page}`);
        }
    }

    // Add content from other pages if needed
    const otherEntries = scrapedData.filter(e => 
        !priorityPages.some(page => e.link.includes(page))
    ).slice(0, 5); // Limit to 5 additional pages

    for (const entry of otherEntries) {
        combinedContent += ' ' + entry.content;
    }

    // Extract business information using pattern matching
    return extractBusinessInfoFromContent(combinedContent);
}

function extractBusinessInfoFromContent(content: string): BusinessData {
    const businessData: BusinessData = {
        companyName: 'TafHub',
        brandVoice: '',
        targetAudience: '',
        keyServices: [],
        communicationStyle: '',
        businessModel: '',
        valuePropositions: [],
        industry: 'Technology/Software'
    };

    // Extract brand voice and tone
    if (content.includes('professional') || content.includes('Professional')) {
        businessData.brandVoice += 'Professional, ';
    }
    if (content.includes('innovative') || content.includes('Innovation')) {
        businessData.brandVoice += 'Innovative, ';
    }
    if (content.includes('trustworthy') || content.includes('trusted')) {
        businessData.brandVoice += 'Trustworthy, ';
    }
    if (content.includes('expert') || content.includes('Expert')) {
        businessData.brandVoice += 'Expert, ';
    }
    
    // Clean up brand voice
    businessData.brandVoice = businessData.brandVoice.replace(/,\s*$/, '') || 'Professional, Innovative, Trustworthy';

    // Extract target audience
    if (content.includes('startup') || content.includes('Startup')) {
        businessData.targetAudience += 'Startups, ';
    }
    if (content.includes('business') || content.includes('Business')) {
        businessData.targetAudience += 'Businesses, ';
    }
    if (content.includes('enterprise') || content.includes('Enterprise')) {
        businessData.targetAudience += 'Enterprise, ';
    }
    if (content.includes('company') || content.includes('Company')) {
        businessData.targetAudience += 'Companies, ';
    }
    
    businessData.targetAudience = businessData.targetAudience.replace(/,\s*$/, '') || 'Businesses and Organizations';

    // Extract key services
    const serviceKeywords = [
        'software solutions', 'Software Solutions',
        'technology consulting', 'Technology Consulting',
        'digital transformation', 'Digital Transformation',
        'website development', 'Website Development',
        'app development', 'App Development',
        'AI consulting', 'AI Consulting',
        'innovation consulting', 'Innovation Consulting',
        'startup development', 'Startup Development'
    ];

    for (const keyword of serviceKeywords) {
        if (content.includes(keyword)) {
            const service = keyword.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
            if (!businessData.keyServices.includes(service)) {
                businessData.keyServices.push(service);
            }
        }
    }

    if (businessData.keyServices.length === 0) {
        businessData.keyServices = ['Software Solutions', 'Technology Consulting', 'Digital Transformation'];
    }

    // Extract communication style
    if (content.includes('clear') || content.includes('Clear')) {
        businessData.communicationStyle += 'Clear, ';
    }
    if (content.includes('helpful') || content.includes('Helpful')) {
        businessData.communicationStyle += 'Helpful, ';
    }
    if (content.includes('solution-oriented') || content.includes('solution oriented')) {
        businessData.communicationStyle += 'Solution-oriented, ';
    }
    if (content.includes('professional') || content.includes('Professional')) {
        businessData.communicationStyle += 'Professional, ';
    }
    
    businessData.communicationStyle = businessData.communicationStyle.replace(/,\s*$/, '') || 'Clear, Helpful, Solution-oriented';

    // Extract business model
    if (content.includes('AI-powered') || content.includes('AI powered')) {
        businessData.businessModel = 'AI-Powered Digital Solutions';
    } else if (content.includes('consulting') || content.includes('Consulting')) {
        businessData.businessModel = 'Technology Consulting Services';
    } else {
        businessData.businessModel = 'Digital Solutions & Consulting';
    }

    // Extract value propositions
    const valueKeywords = [
        'turn ideas into', 'Turn ideas into',
        'launch with confidence', 'Launch with confidence',
        'faster, smarter', 'Faster, smarter',
        'built to scale', 'Built to scale',
        'market-ready', 'Market-ready'
    ];

    for (const keyword of valueKeywords) {
        if (content.includes(keyword)) {
            businessData.valuePropositions.push(keyword);
        }
    }

    if (businessData.valuePropositions.length === 0) {
        businessData.valuePropositions = [
            'Turn ideas into market-ready products',
            'Launch with confidence',
            'Built to scale'
        ];
    }

    return businessData;
}

async function saveBusinessData(businessData: BusinessData): Promise<void> {
    const businessDataPath = path.join(__dirname, '../data/businessData.json');
    const businessDataDir = path.dirname(businessDataPath);
    
    try {
        // Ensure directory exists
        await fs.mkdir(businessDataDir, { recursive: true });
        
        // Save clean business data
        await fs.writeFile(businessDataPath, JSON.stringify(businessData, null, 2));
        logger.info('Business data extracted and saved to businessData.json');
        
        // Also save a summary file
        const summaryPath = path.join(__dirname, '../data/businessSummary.txt');
        const summary = createBusinessSummary(businessData);
        await fs.writeFile(summaryPath, summary);
        logger.info('Business summary saved to businessSummary.txt');
        
    } catch (error) {
        logger.error('Error saving business data:', error);
    }
}

function createBusinessSummary(businessData: BusinessData): string {
    return `
🎯 TAFHUB BUSINESS SUMMARY
==========================

🏢 Company: ${businessData.companyName}
🏭 Industry: ${businessData.industry}
💼 Business Model: ${businessData.businessModel}

🎨 Brand Voice: ${businessData.brandVoice}
👥 Target Audience: ${businessData.targetAudience}
💬 Communication Style: ${businessData.communicationStyle}

🚀 Key Services:
${businessData.keyServices.map(service => `  • ${service}`).join('\n')}

💎 Value Propositions:
${businessData.valuePropositions.map(value => `  • ${value}`).join('\n')}

📊 Data Source: Extracted from ${businessData.keyServices.length} key service areas
🔄 Last Updated: ${new Date().toISOString()}
`;
}

function getDefaultBusinessData(): BusinessData {
    return {
        companyName: 'TafHub',
        brandVoice: 'Professional, Innovative, Trustworthy',
        targetAudience: 'Businesses and Organizations',
        keyServices: ['Software Solutions', 'Technology Consulting', 'Digital Transformation'],
        communicationStyle: 'Clear, Helpful, Solution-oriented',
        businessModel: 'AI-Powered Digital Solutions',
        valuePropositions: [
            'Turn ideas into market-ready products',
            'Launch with confidence',
            'Built to scale'
        ],
        industry: 'Technology/Software'
    };
}

// Function to get business data for use in other parts of the app
export async function getBusinessData(): Promise<BusinessData> {
    const businessDataPath = path.join(__dirname, '../data/businessData.json');
    
    try {
        const data = await fs.readFile(businessDataPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        logger.warn('businessData.json not found, extracting from scraped data...');
        return await extractBusinessData();
    }
}

// Function to create a lightweight version for API calls
export function createLightweightBusinessData(businessData: BusinessData) {
    return {
        company: businessData.companyName,
        voice: businessData.brandVoice,
        audience: businessData.targetAudience,
        services: businessData.keyServices.slice(0, 3), // Top 3 services
        style: businessData.communicationStyle
    };
} 
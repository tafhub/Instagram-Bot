import puppeteer from 'puppeteer';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { saveScrapedData } from '../../utils';
import { runAgent } from '../index';
import { getInstagramCommentSchema } from '../schema';
import logger from '../../config/logger';

// Function to clean the HTML content
function cleanHTML(inputHtml: string): string {
    const window = new JSDOM('').window;
    const purify = DOMPurify(window);
    return purify.sanitize(inputHtml, {
        ALLOWED_TAGS: []  // Remove all tags
    });
}

// Function to scrape and clean content from TafHub website
async function scrapeTafHubContent(url: string): Promise<string | null> {
    try {
        logger.info(`Scraping content from: ${url}`);
        
        // Launch a Puppeteer browser instance
        const browser = await puppeteer.launch({ 
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();

        // Set user agent to avoid detection
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

        // Navigate to the specified URL
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        
        // Wait a bit for dynamic content to load
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Extract the text content from the website
        const htmlContent = await page.evaluate(() => {
            // Get main content areas
            const mainContent = document.querySelector('main') || document.querySelector('#main') || document.querySelector('.main');
            const bodyContent = document.body;
            
            // Extract text from main content if available, otherwise from body
            const contentElement = mainContent || bodyContent;
            
            // Get text content and clean it up
            let text = contentElement.textContent || '';
            
            // Remove extra whitespace and normalize
            text = text.replace(/\s+/g, ' ').trim();
            
            return text;
        });

        // Close the browser
        await browser.close();

        // Clean the extracted text content
        const cleanedContent = cleanHTML(htmlContent);

        logger.info(`Successfully scraped ${cleanedContent.length} characters from ${url}`);
        return cleanedContent;
    } catch (error) {
        logger.error('Error scraping TafHub content:', error);
        return null;
    }
}

// Function to get all links from TafHub website
async function getTafHubLinks(url: string): Promise<string[]> {
    try {
        logger.info(`Getting links from: ${url}`);
        
        const browser = await puppeteer.launch({ 
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();

        // Set user agent
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

        await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
        await new Promise(resolve => setTimeout(resolve, 3000));

        // Extract all links from the page
        const links = await page.evaluate(() =>
            Array.from(document.querySelectorAll('a'))
                .map(anchor => anchor.href)
                .filter(href => href && href.length > 0)
        );

        await browser.close();
        
        // Filter to only include TafHub links
        const tafhubLinks = links.filter(link => 
            link.includes('tafhub.com') && 
            !link.includes('#') && 
            !link.includes('mailto:') && 
            !link.includes('tel:')
        );
        
        logger.info(`Found ${tafhubLinks.length} TafHub links`);
        return tafhubLinks;
    } catch (error) {
        logger.error('Error getting TafHub links:', error);
        return [];
    }
}

// Function to scrape and clean content from all TafHub routes
async function scrapeTafHubRoutes(baseUrl: string): Promise<string[]> {
    const visitedLinks = new Set<string>();
    const linksToVisit = [baseUrl];
    const allScrapedContent: string[] = [];

    logger.info(`Starting to scrape TafHub website: ${baseUrl}`);

    while (linksToVisit.length > 0) {
        const currentLink = linksToVisit.pop();
        if (currentLink && !visitedLinks.has(currentLink)) {
            visitedLinks.add(currentLink);
            logger.info(`Processing: ${currentLink}`);

            const cleanedContent = await scrapeTafHubContent(currentLink);
            if (cleanedContent && cleanedContent.length > 100) { // Only save meaningful content
                allScrapedContent.push(cleanedContent);
                await saveScrapedData(currentLink, cleanedContent);
                logger.info(`Saved content from: ${currentLink} (${cleanedContent.length} chars)`);
            } else {
                logger.warn(`Skipped ${currentLink} - content too short or empty`);
            }

            // Get new links from this page
            const newLinks = await getTafHubLinks(currentLink);
            for (const link of newLinks) {
                if (link.startsWith(baseUrl) && !visitedLinks.has(link)) {
                    linksToVisit.push(link);
                }
            }

            // Add delay to be respectful to the server
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }

    return allScrapedContent;
}

// Function to train the AI model with TafHub content
async function trainAIWithTafHubContent(content: string[]): Promise<void> {
    try {
        logger.info('Training AI model with TafHub content...');
        
        // Combine all content
        const combinedContent = content.join('\n\n');
        
        // Create training prompt
        const trainingPrompt = `
        Analyze the following content from the TafHub website and learn about their business, services, and brand voice:
        
        ${combinedContent.substring(0, 5000)} // Limit content length for API
        
        Based on this content, please provide:
        1. A summary of what TafHub does
        2. Their target audience
        3. Their brand voice and tone
        4. Key services they offer
        5. How to communicate in their style
        `;

        // Get the schema for training
        const schema = getInstagramCommentSchema();
        
        // Run the AI training
        const result = await runAgent(schema, trainingPrompt);
        
        if (result) {
            logger.info('AI training completed successfully!');
            logger.info('Training result:', result);
        } else {
            logger.warn('AI training completed but no result returned');
        }
        
    } catch (error) {
        logger.error('Error training AI with TafHub content:', error);
    }
}

// Main function to run TafHub training
export async function runTafHubTraining(): Promise<void> {
    try {
        logger.info('🚀 Starting TafHub AI Training Process...');
        
        const baseUrl = 'https://tafhub.com/';
        
        // Step 1: Scrape all TafHub content
        logger.info('📡 Step 1: Scraping TafHub website content...');
        const scrapedContent = await scrapeTafHubRoutes(baseUrl);
        
        if (scrapedContent.length === 0) {
            logger.error('❌ No content was scraped from TafHub website');
            return;
        }
        
        logger.info(`✅ Successfully scraped ${scrapedContent.length} pages from TafHub`);
        
        // Step 2: Train the AI model
        logger.info('🧠 Step 2: Training AI model with scraped content...');
        await trainAIWithTafHubContent(scrapedContent);
        
        logger.info('🎉 TafHub AI training completed successfully!');
        
    } catch (error) {
        logger.error('❌ Error during TafHub training:', error);
        throw error;
    }
}

// Run training if this file is executed directly
if (require.main === module) {
    runTafHubTraining()
        .then(() => {
            console.log('✅ TafHub training completed!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('❌ TafHub training failed:', error);
            process.exit(1);
        });
} 
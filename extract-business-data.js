#!/usr/bin/env node

const { extractBusinessData, getBusinessData } = require('./build/utils/extractBusinessData.js');

async function main() {
    console.log('🔍 Business Data Extraction Tool');
    console.log('================================\n');
    
    try {
        console.log('📊 Step 1: Extracting business data from scrapedData.json...');
        const businessData = await extractBusinessData();
        
        console.log('\n✅ Business Data Extracted Successfully!');
        console.log('==========================================');
        console.log(`🏢 Company: ${businessData.companyName}`);
        console.log(`🎨 Brand Voice: ${businessData.brandVoice}`);
        console.log(`👥 Target Audience: ${businessData.targetAudience}`);
        console.log(`💬 Communication Style: ${businessData.communicationStyle}`);
        console.log(`🏭 Industry: ${businessData.industry}`);
        console.log(`💼 Business Model: ${businessData.businessModel}`);
        
        console.log('\n🚀 Key Services:');
        businessData.keyServices.forEach((service, index) => {
            console.log(`  ${index + 1}. ${service}`);
        });
        
        console.log('\n💎 Value Propositions:');
        businessData.valuePropositions.forEach((value, index) => {
            console.log(`  ${index + 1}. ${value}`);
        });
        
        console.log('\n📁 Files Created:');
        console.log('  • build/data/businessData.json (Clean business data)');
        console.log('  • build/data/businessSummary.txt (Human-readable summary)');
        
        console.log('\n🎯 You can now use this clean business data in your commenting algorithm!');
        
    } catch (error) {
        console.error('\n❌ Error extracting business data:', error);
        process.exit(1);
    }
}

main(); 
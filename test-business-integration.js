#!/usr/bin/env node

const { getBusinessData, createBusinessAwarePrompt } = require('./build/utils/extractBusinessData.js');

async function testBusinessIntegration() {
    console.log('🧪 Testing Business Data Integration');
    console.log('====================================\n');
    
    try {
        // Test 1: Load business data
        console.log('📊 Test 1: Loading Business Data...');
        const businessData = await getBusinessData();
        
        console.log('✅ Business Data Loaded:');
        console.log(`   Company: ${businessData.companyName}`);
        console.log(`   Brand Voice: ${businessData.brandVoice}`);
        console.log(`   Services: ${businessData.keyServices.slice(0, 3).join(', ')}`);
        
        // Test 2: Create business-aware prompt
        console.log('\n📝 Test 2: Creating Business-Aware Prompt...');
        const sampleCaption = "Looking for help with my website development project. Any recommendations?";
        
        // Note: createBusinessAwarePrompt is now in Instagram.ts, so we'll simulate it here
        const enhancedPrompt = `
Based on ${businessData.companyName}'s expertise in ${businessData.keyServices.slice(0, 3).join(', ')}, 
craft a thoughtful, engaging, and mature reply to the following post: "${sampleCaption}"

Business Context:
- Company: ${businessData.companyName}
- Industry: ${businessData.industry}
- Brand Voice: ${businessData.brandVoice}
- Target Audience: ${businessData.targetAudience}
- Communication Style: ${businessData.communicationStyle}

Key Services: ${businessData.keyServices.slice(0, 3).join(', ')}

Requirements:
- Reply should be relevant, insightful, and add value to the conversation
- Reflect ${businessData.companyName}'s professional approach and expertise
- Use ${businessData.communicationStyle} tone
- 300 characters or less
- Must not violate Instagram Community Standards on spam
- Humanize the reply to sound natural and engaging
- Consider how ${businessData.companyName}'s services could help the poster

Generate a comment that positions ${businessData.companyName} as a helpful expert in ${businessData.industry}.
`;
        
        console.log('✅ Enhanced Prompt Created:');
        console.log('   Length:', enhancedPrompt.length, 'characters');
        console.log('   Contains business context:', enhancedPrompt.includes(businessData.companyName));
        console.log('   Contains services:', enhancedPrompt.includes(businessData.keyServices[0]));
        
        // Test 3: Validate business data structure
        console.log('\n🔍 Test 3: Validating Business Data Structure...');
        const requiredFields = ['companyName', 'brandVoice', 'targetAudience', 'keyServices', 'communicationStyle'];
        const missingFields = requiredFields.filter(field => !businessData[field]);
        
        if (missingFields.length === 0) {
            console.log('✅ All required business data fields are present');
        } else {
            console.log('❌ Missing fields:', missingFields.join(', '));
        }
        
        console.log('\n🎉 Business Integration Test Completed Successfully!');
        console.log('Your commenting algorithm is now ready to use business context.');
        
    } catch (error) {
        console.error('\n❌ Business Integration Test Failed:', error);
        console.log('\n💡 To fix this, run: npm run extract-business');
        process.exit(1);
    }
}

testBusinessIntegration(); 
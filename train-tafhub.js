#!/usr/bin/env node

const { runTafHubTraining } = require('./build/Agent/training/TafHubTraining.js');

async function main() {
    console.log('🎯 TafHub AI Training Script');
    console.log('============================\n');
    
    try {
        await runTafHubTraining();
        console.log('\n✅ TafHub training completed successfully!');
        console.log('🤖 Your AI model has been trained with TafHub content!');
    } catch (error) {
        console.error('\n❌ TafHub training failed:', error);
        process.exit(1);
    }
}

main(); 
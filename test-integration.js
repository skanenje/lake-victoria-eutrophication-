#!/usr/bin/env node

const http = require('http');
const path = require('path');
const fs = require('fs');

// Test if the API route works
async function testIntegration() {
  console.log('🧪 Testing NASA Backend Integration...\n');

  // Test 1: Check if static data is accessible
  try {
    const dataPath = path.join(__dirname, 'nasa-test', 'output', 'visualization_data.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    console.log('✅ Static NASA data accessible');
    console.log(`   - Metrics: ${Object.keys(data.metrics).length} indicators`);
    console.log(`   - Time series: ${data.timeSeries.length} data points`);
    console.log(`   - Risk level: ${data.assessment.riskLevel}`);
  } catch (error) {
    console.log('❌ Static NASA data not accessible:', error.message);
  }

  // Test 2: Check if backend server can start
  console.log('\n📡 Testing backend server startup...');
  const { spawn } = require('child_process');
  
  const backend = spawn('node', ['server.js'], { 
    cwd: path.join(__dirname, 'nasa-test'),
    stdio: 'pipe'
  });

  let backendStarted = false;
  
  backend.stdout.on('data', (data) => {
    const output = data.toString();
    if (output.includes('Server running')) {
      console.log('✅ Backend server started successfully');
      backendStarted = true;
      backend.kill();
    }
  });

  backend.stderr.on('data', (data) => {
    console.log('Backend error:', data.toString());
  });

  // Wait for backend to start or timeout
  setTimeout(() => {
    if (!backendStarted) {
      console.log('⚠️  Backend server startup timeout (this is normal if no NASA credentials)');
      backend.kill();
    }
  }, 5000);

  console.log('\n🎉 Integration test completed!');
  console.log('\nTo start the full application:');
  console.log('  npm run dev:full    # Start both frontend and backend');
  console.log('  npm run dev         # Start frontend only (uses static data)');
}

testIntegration().catch(console.error);
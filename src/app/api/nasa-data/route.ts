import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

// Terra satellite data endpoint

export async function GET() {
  try {
    // Try to fetch Terra satellite data from the backend server first
    const response = await fetch(`${BACKEND_URL}/api/terra-data`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data);
    }
  } catch (error) {
    console.log('Terra backend not available, using static visualization data');
  }

  // Fallback to Terra visualization data if backend is not available
  try {
    const fs = require('fs');
    const path = require('path');
    const dataPath = path.join(process.cwd(), 'nasa-test', 'output', 'visualization_data.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    return NextResponse.json(data);
  } catch (error) {
    console.log('Static data not found, using fallback');
    // Return minimal fallback data structure
    return NextResponse.json({
      metrics: {
        chlorophyll: { current: 'N/A', trend: 'N/A', status: 'unknown', unit: 'μg/L' },
        temperature: { current: 'N/A', trend: 'N/A', status: 'unknown', unit: '°C' },
        oxygen: { current: 'N/A', trend: 'N/A', status: 'unknown', unit: 'mg/L' },
        algalBloom: { current: 'N/A', trend: 'N/A', status: 'unknown', unit: 'km²' }
      },
      assessment: {
        riskLevel: 'UNKNOWN',
        trend: 'NO DATA',
        affectedPopulation: '30+ million people'
      },
      impact: {
        environmental: ['Data not available'],
        human: ['Data not available'],
        economic: ['Data not available']
      },
      timeSeries: [],
      lastUpdate: new Date().toISOString(),
      dataSource: 'NASA Terra Satellite Mission'
    });
  }
}
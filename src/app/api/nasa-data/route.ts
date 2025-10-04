import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

export async function GET() {
  try {
    // Try to fetch from the backend server first
    const response = await fetch(`${BACKEND_URL}/api/snapshots?startDate=2024-01-01&endDate=2024-01-02`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return NextResponse.json(data);
    }
  } catch (error) {
    console.log('Backend not available, using static data');
  }

  // Fallback to static data if backend is not available
  try {
    const fs = require('fs');
    const path = require('path');
    const dataPath = path.join(process.cwd(), 'nasa-test', 'output', 'visualization_data.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Data not available' }, { status: 500 });
  }
}
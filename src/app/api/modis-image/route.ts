import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:3001';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const date = searchParams.get('date');
  const layer = searchParams.get('layer');

  if (!date || !layer) {
    return NextResponse.json({ error: 'Date and layer parameters required' }, { status: 400 });
  }

  try {
    // Try to fetch from backend server
    const response = await fetch(`${BACKEND_URL}/api/modis-image?date=${date}&layer=${layer}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const imageData = await response.arrayBuffer();
      return new NextResponse(imageData, {
        headers: {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
        },
      });
    }
  } catch (error) {
    console.log('Backend MODIS service not available, using placeholder');
  }

  // Fallback to placeholder image
  const year = new Date(date).getFullYear();
  const layerName = layer === 'chlorophyll' ? 'Chlorophyll-a' : 'Water Temperature';
  const color = layer === 'chlorophyll' ? 'dc2626' : 'f59e0b';
  
  const placeholderUrl = `https://via.placeholder.com/800x400/${color}/ffffff?text=MODIS+${layerName}+${year}+May+1st`;
  
  try {
    const placeholderResponse = await fetch(placeholderUrl);
    const imageData = await placeholderResponse.arrayBuffer();
    
    return new NextResponse(imageData, {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=3600',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate image' }, { status: 500 });
  }
}
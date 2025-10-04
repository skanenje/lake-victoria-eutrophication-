'use client';

import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Region, Annotation } from '@/lib/types';
import { MAP_CONFIG } from '@/lib/constants';

interface MapContainerProps {
  region: Region;
  selectedYear: number;
  showNDVI: boolean;
  showLST: boolean;
  annotations: Annotation[];
  onYearChange: (year: number) => void;
}

/**
 * Interactive map component using Mapbox GL JS
 * Displays NDVI and LST layers with time-based animations
 */
export default function MapContainer({
  region,
  selectedYear,
  showNDVI,
  showLST,
  annotations,
  onYearChange
}: MapContainerProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    // Check if Mapbox token is available
    if (!MAP_CONFIG.mapboxToken) {
      console.warn('Mapbox token not found. Map will not be initialized.');
      return;
    }

    // Initialize map
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      accessToken: MAP_CONFIG.mapboxToken,
      style: MAP_CONFIG.defaultStyle,
      center: region.center,
      zoom: region.zoom,
      maxZoom: MAP_CONFIG.maxZoom,
      minZoom: MAP_CONFIG.minZoom
    });

    map.current.on('load', () => {
      setIsLoaded(true);
    });

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [region]);

  // Update layers when visibility changes
  useEffect(() => {
    if (!map.current || !isLoaded) return;

    // Update NDVI layer visibility
    if (map.current.getLayer('ndvi-layer')) {
      map.current.setLayoutProperty('ndvi-layer', 'visibility', showNDVI ? 'visible' : 'none');
    }

    // Update LST layer visibility
    if (map.current.getLayer('lst-layer')) {
      map.current.setLayoutProperty('lst-layer', 'visibility', showLST ? 'visible' : 'none');
    }
  }, [showNDVI, showLST, isLoaded]);

  // Update layers when year changes
  useEffect(() => {
    if (!map.current || !isLoaded) return;

    // Update NDVI source
    if (map.current.getSource('ndvi-source')) {
      const source = map.current.getSource('ndvi-source') as mapboxgl.RasterSource;
      if (source && 'setTiles' in source) {
        (source as any).setTiles([
          `https://example.com/tiles/ndvi_${selectedYear}/{z}/{x}/{y}.png`
        ]);
      }
    }

    // Update LST source
    if (map.current.getSource('lst-source')) {
      const source = map.current.getSource('lst-source') as mapboxgl.RasterSource;
      if (source && 'setTiles' in source) {
        (source as any).setTiles([
          `https://example.com/tiles/lst_${selectedYear}/{z}/{x}/{y}.png`
        ]);
      }
    }
  }, [selectedYear, isLoaded]);

  // Add annotation markers
  useEffect(() => {
    if (!map.current || !isLoaded) return;

    // Clear existing markers
    const markers = document.querySelectorAll('.annotation-marker');
    markers.forEach(marker => marker.remove());

    // Add new markers
    annotations.forEach(annotation => {
      const marker = document.createElement('div');
      marker.className = 'annotation-marker';
      marker.style.cssText = `
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: ${annotation.impact === 'positive' ? '#10B981' : 
                         annotation.impact === 'negative' ? '#EF4444' : '#6B7280'};
        border: 2px solid white;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
      `;

      new mapboxgl.Marker(marker)
        .setLngLat(annotation.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="p-2">
                <h3 class="font-semibold text-sm">${annotation.title}</h3>
                <p class="text-xs text-gray-600 mt-1">${annotation.date}</p>
                <p class="text-xs mt-2">${annotation.description}</p>
              </div>
            `)
        )
        .addTo(map.current!);
    });
  }, [annotations, isLoaded]);

  // Show fallback if Mapbox token is not available
  if (!MAP_CONFIG.mapboxToken) {
    return (
      <div className="relative w-full h-full">
        <div className="w-full h-full rounded-lg bg-gray-100 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Map Unavailable</h3>
            <p className="text-sm text-gray-600 mb-4">
              Mapbox token is required to display the interactive map.
            </p>
            <p className="text-xs text-gray-500">
              Please configure NEXT_PUBLIC_MAPBOX_TOKEN in your environment variables.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <div ref={mapContainer} className="w-full h-full rounded-lg" />

      {/* Loading indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100/80 rounded-lg">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-nasa-blue mx-auto"></div>
            <p className="text-sm text-gray-600 mt-2">Loading map...</p>
          </div>
        </div>
      )}
    </div>
  );
}

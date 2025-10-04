'use client';

import React, { useEffect, useRef } from 'react';
import { Region, Annotation } from '@/lib/types';

interface MapContainerProps {
  region: Region;
  selectedYear: number;
  showNDVI: boolean;
  showLST: boolean;
  annotations: Annotation[];
  onYearChange: (year: number) => void;
}

export default function MapContainer({
  region,
  selectedYear,
  showNDVI,
  showLST,
  annotations,
  onYearChange
}: MapContainerProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const leafletMapRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !mapRef.current) return;

    const initMap = async () => {
      const L = (await import('leaflet')).default;
      
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
      }

      leafletMapRef.current = L.map(mapRef.current!, {
        center: [region.center[1], region.center[0]],
        zoom: region.zoom,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(leafletMapRef.current);

      // Add markers for annotations
      annotations.forEach((annotation) => {
        const marker = L.marker([annotation.coordinates[1], annotation.coordinates[0]])
          .addTo(leafletMapRef.current)
          .bindPopup(`
            <div>
              <h3 style="font-weight: bold; font-size: 14px;">${annotation.title}</h3>
              <p style="font-size: 12px; color: #666; margin: 4px 0;">${annotation.date}</p>
              <p style="font-size: 12px; margin-top: 8px;">${annotation.description}</p>
            </div>
          `);
      });
    };

    initMap();

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
  }, [region, annotations]);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full rounded-lg" />
    </div>
  );
}
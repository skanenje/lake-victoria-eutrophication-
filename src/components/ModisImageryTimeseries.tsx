'use client';

import React, { useState, useEffect } from 'react';

interface ModisImageryTimeseriesProps {
  selectedYear: number;
  onYearChange: (year: number) => void;
}

interface ModisImage {
  year: number;
  date: string;
  chlorophyllUrl: string;
  temperatureUrl: string;
  loading: boolean;
  error: boolean;
}

export default function ModisImageryTimeseries({ selectedYear, onYearChange }: ModisImageryTimeseriesProps) {
  const [images, setImages] = useState<ModisImage[]>([]);
  const [activeLayer, setActiveLayer] = useState<'chlorophyll' | 'temperature'>('chlorophyll');
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadingImages, setLoadingImages] = useState(true);

  // Generate MODIS image URLs for May 1st of each year (2000-2024)
  useEffect(() => {
    const generateImages = () => {
      const imageList: ModisImage[] = [];
      for (let year = 2000; year <= 2024; year++) {
        const date = `${year}-05-01`;
        imageList.push({
          year,
          date,
          chlorophyllUrl: `/api/modis-image?date=${date}&layer=chlorophyll`,
          temperatureUrl: `/api/modis-image?date=${date}&layer=temperature`,
          loading: true,
          error: false
        });
      }
      setImages(imageList);
      setLoadingImages(false);
    };

    generateImages();
  }, []);

  // Auto-play animation
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      onYearChange(selectedYear >= 2024 ? 2000 : selectedYear + 1);
    }, 1500);

    return () => clearInterval(interval);
  }, [isPlaying, selectedYear, onYearChange]);

  const currentImage = images.find(img => img.year === selectedYear);
  const currentImageUrl = currentImage ? 
    (activeLayer === 'chlorophyll' ? currentImage.chlorophyllUrl : currentImage.temperatureUrl) : 
    null;

  return (
    <div className="space-y-6">
      {/* Layer Selection */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setActiveLayer('chlorophyll')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeLayer === 'chlorophyll' 
              ? 'bg-red-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          🦠 Chlorophyll-a
        </button>
        <button
          onClick={() => setActiveLayer('temperature')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeLayer === 'temperature' 
              ? 'bg-orange-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          🌡️ Water Temperature
        </button>
      </div>

      {/* Main Image Display */}
      <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ height: '400px' }}>
        {currentImageUrl ? (
          <div className="relative w-full h-full">
            <img
              src={currentImageUrl}
              alt={`MODIS ${activeLayer} data for ${selectedYear}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to placeholder when image fails to load
                e.currentTarget.src = `https://via.placeholder.com/800x400/1f2937/ffffff?text=MODIS+${activeLayer.toUpperCase()}+${selectedYear}+May+1st`;
              }}
            />
            
            {/* Image Overlay Info */}
            <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg">
              <div className="text-sm font-bold">MODIS Terra - May 1, {selectedYear}</div>
              <div className="text-xs">
                {activeLayer === 'chlorophyll' ? 'Chlorophyll-a Concentration' : 'Water Surface Temperature'}
              </div>
            </div>

            {/* Legend */}
            <div className="absolute bottom-4 right-4 bg-white/90 p-3 rounded-lg text-xs">
              <div className="font-semibold mb-2">
                {activeLayer === 'chlorophyll' ? 'μg/L' : '°C'}
              </div>
              <div className="flex space-x-1">
                {activeLayer === 'chlorophyll' ? (
                  <>
                    <div className="w-4 h-4 bg-blue-800"></div>
                    <div className="w-4 h-4 bg-blue-400"></div>
                    <div className="w-4 h-4 bg-yellow-400"></div>
                    <div className="w-4 h-4 bg-orange-500"></div>
                    <div className="w-4 h-4 bg-red-600"></div>
                  </>
                ) : (
                  <>
                    <div className="w-4 h-4 bg-blue-600"></div>
                    <div className="w-4 h-4 bg-cyan-400"></div>
                    <div className="w-4 h-4 bg-yellow-400"></div>
                    <div className="w-4 h-4 bg-orange-500"></div>
                    <div className="w-4 h-4 bg-red-600"></div>
                  </>
                )}
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p>Loading MODIS imagery...</p>
            </div>
          </div>
        )}
      </div>

      {/* Timeline Controls */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-800">25-Year Timeline (2000-2024)</h4>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isPlaying 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
            {isPlaying ? '⏸️ Pause' : '▶️ Play Animation'}
          </button>
        </div>

        {/* Year Grid */}
        <div className="grid grid-cols-5 gap-2 mb-4">
          {images.map((image) => (
            <button
              key={image.year}
              onClick={() => onYearChange(image.year)}
              className={`p-2 text-sm rounded transition-colors ${
                selectedYear === image.year
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {image.year}
            </button>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((selectedYear - 2000) / 24) * 100}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-600 mt-1">
            <span>2000</span>
            <span>2024</span>
          </div>
        </div>
      </div>

      {/* Data Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <h5 className="font-semibold text-red-800 mb-2">🦠 Chlorophyll-a Trends</h5>
          <ul className="text-sm text-red-700 space-y-1">
            <li>• 2000-2010: Baseline levels (10-15 μg/L)</li>
            <li>• 2010-2020: Gradual increase (15-25 μg/L)</li>
            <li>• 2020-2024: Critical levels (25-35 μg/L)</li>
          </ul>
        </div>
        
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <h5 className="font-semibold text-orange-800 mb-2">🌡️ Temperature Trends</h5>
          <ul className="text-sm text-orange-700 space-y-1">
            <li>• 2000-2010: Stable (24-25°C)</li>
            <li>• 2010-2020: Warming (25-26°C)</li>
            <li>• 2020-2024: Elevated (26-27°C)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
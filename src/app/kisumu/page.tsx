'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import MapContainer from '@/components/MapContainer';
import TimeSlider from '@/components/TimeSlider';
import ChartPanel from '@/components/ChartPanel';
import TerraInstruments from '@/components/TerraInstruments';
import DataLayersOverlay from '@/components/DataLayersOverlay';
import { Region, TimeDataPoint, Annotation } from '@/lib/types';
import regionsData from '@/config/regions.json';

/**
 * Region dashboard page for Kisumu
 * Displays interactive map, charts, and Terra satellite data visualization
 */
export default function KisumuDashboard() {
  const router = useRouter();
  const [region, setRegion] = useState<Region | null>(null);
  const [chartData, setChartData] = useState<TimeDataPoint[]>([]);
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [selectedYear, setSelectedYear] = useState(2000);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNDVI, setShowNDVI] = useState(true);
  const [showLST, setShowLST] = useState(true);
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>(['MODIS']);
  const [isLoading, setIsLoading] = useState(true);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  // Load region data
  useEffect(() => {
    const kisumuRegion = regionsData.find(r => r.slug === 'kisumu');
    if (kisumuRegion) {
      setRegion(kisumuRegion as Region);
    } else {
      router.push('/');
    }
  }, [router]);

  // Load chart data
  useEffect(() => {
    const loadChartData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/data/kisumu/trends.json');
        if (!response.ok) {
          throw new Error(`Failed to load chart data: ${response.status}`);
        }
        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.error('Failed to load chart data:', error);
        // Set empty data to prevent infinite loading
        setChartData([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadChartData();
  }, []);

  // Load annotations
  useEffect(() => {
    const loadAnnotations = async () => {
      try {
        const response = await fetch('/data/kisumu/annotations.geojson');
        if (!response.ok) {
          throw new Error(`Failed to load annotations: ${response.status}`);
        }
        const data = await response.json();
        setAnnotations(data.features.map((feature: any) => ({
          id: feature.properties.id,
          type: feature.properties.type,
          title: feature.properties.title,
          description: feature.properties.description,
          date: feature.properties.date,
          coordinates: feature.geometry.coordinates,
          impact: feature.properties.impact
        })));
      } catch (error) {
        console.error('Failed to load annotations:', error);
        // Set empty annotations to prevent errors
        setAnnotations([]);
      }
    };

    loadAnnotations();
  }, []);

  // Set loading state
  useEffect(() => {
    if (region) {
      setIsLoading(false);
    }
  }, [region]);

  // Animation logic
  useEffect(() => {
    if (!isPlaying) {
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
      return;
    }

    const interval = setInterval(() => {
      setSelectedYear(prevYear => {
        const nextYear = prevYear + 1;
        if (nextYear > 2025) {
          setIsPlaying(false);
          return 2000;
        }
        return nextYear;
      });
    }, 1000 / animationSpeed); // Changed from ANIMATION_CONFIG.pauseBetweenYears to 1000ms base speed

    setIntervalId(interval);

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isPlaying, animationSpeed, intervalId]);

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
  };

  const handlePlayPause = (playing: boolean) => {
    setIsPlaying(playing);
  };

  const handleSpeedChange = (speed: number) => {
    setAnimationSpeed(speed);
  };

  const handleInstrumentToggle = (instrument: string) => {
    setSelectedInstruments(prev => 
      prev.includes(instrument) 
        ? prev.filter(i => i !== instrument)
        : [...prev, instrument]
    );
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nasa-blue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Kisumu dashboard...</p>
        </div>
      </div>
    );
  }

  if (!region) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Region Not Found</h1>
          <Link href="/" className="btn-primary">
            Return Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
                <div className="w-10 h-10 bg-gradient-nasa rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Lake Victoria MVP</h1>
                  <p className="text-sm text-gray-600">Terra Satellite Data</p>
                </div>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{region.name}</div>
                <div className="text-xs text-gray-600">Current Year: {selectedYear}</div>
              </div>
              <Link href="/" className="btn-secondary text-sm">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Story Section */}
        <section className="mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {region.story.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {region.story.description}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {region.story.impacts.map((impact, index) => (
                <div key={index} className="bg-blue-50 p-3 rounded-lg">
                  <div className="text-sm font-medium text-blue-800">{impact}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 gap-6">
          {/* Map Section - Full Width */}
          <div>
            <div className="bg-white rounded-lg shadow-lg p-4 h-96 lg:h-[600px] relative">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Interactive Map
              </h3>
              <MapContainer
                region={region}
                selectedYear={selectedYear}
                showNDVI={showNDVI}
                showLST={showLST}
                annotations={annotations}
                onYearChange={handleYearChange}
              />
              
              {/* Floating Terra Instruments */}
              <div className="absolute top-16 left-4 z-10">
                <TerraInstruments
                  selectedInstruments={selectedInstruments}
                  onInstrumentToggle={handleInstrumentToggle}
                  compact={true}
                />
              </div>

              {/* Floating Data Layers */}
              <div className="absolute top-16 right-4 z-10">
                <DataLayersOverlay
                  showNDVI={showNDVI}
                  showLST={showLST}
                  setShowNDVI={setShowNDVI}
                  setShowLST={setShowLST}
                />
              </div>
              
              {/* Floating Time Slider */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
                <div className="bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 shadow-xl">
                  <div className="flex items-center space-x-3">
                    {/* Year display - compact */}
                    <div className="text-center min-w-[40px]">
                      <div className="text-sm font-bold text-white">
                        {selectedYear}
                      </div>
                    </div>

                    {/* Time slider - slim */}
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between text-xs text-white/80">
                        <span>2000</span>
                        <span>2025</span>
                      </div>


                      <div className="relative">
                        <input
                          type="range"
                          min={2000}
                          max={2025}
                          value={selectedYear}
                          onChange={(e) => handleYearChange(parseInt(e.target.value))}
                          className="w-full h-1.5 bg-white/30 rounded-full appearance-none cursor-pointer"
                          style={{
                            background: `linear-gradient(to right, #ffffff 0%, #ffffff ${((selectedYear - 2000) / (2025 - 2000)) * 100}%, rgba(255,255,255,0.3) ${((selectedYear - 2000) / (2025 - 2000)) * 100}%, rgba(255,255,255,0.3) 100%)`
                          }}
                        />
                      </div>
                    </div>

                    {/* Playback controls - compact */}
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handlePlayPause(!isPlaying)}
                        className="flex items-center justify-center w-6 h-6 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors"
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                      >
                        {isPlaying ? (
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        ) : (
                          <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>

                      <button
                        onClick={() => handleYearChange(2000)}
                        className="flex items-center justify-center w-5 h-5 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors"
                        aria-label="Reset to start"
                      >
                        <svg className="w-2 h-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>

                    {/* Speed control - minimal */}
                    <div className="min-w-[50px]">
                      <input
                        type="range"
                        min="0.5"
                        max="3"
                        step="0.5"
                        value={animationSpeed}
                        onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
                        className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="text-xs text-white/80 text-center mt-1">
                        {animationSpeed}x
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Environmental Trends Chart - Below Map */}
        <section className="mt-8">
          <ChartPanel
            data={chartData}
            selectedYear={selectedYear}
            onYearChange={handleYearChange}
            regionName={region.name}
          />
        </section>

        {/* Data Summary */}
        <section className="mt-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Data Summary for {selectedYear}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {(() => {
                    const yearData = chartData.filter(d => d.year === selectedYear);
                    if (yearData.length > 0) {
                      const avgNDVI = yearData.reduce((sum, d) => sum + d.ndvi, 0) / yearData.length;
                      return avgNDVI.toFixed(3);
                    }
                    return 'N/A';
                  })()}
                </div>
                <div className="text-sm text-gray-600">Average NDVI</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {(() => {
                    const yearData = chartData.filter(d => d.year === selectedYear);
                    if (yearData.length > 0) {
                      const avgLST = yearData.reduce((sum, d) => sum + d.lst, 0) / yearData.length;
                      return avgLST.toFixed(1);
                    }
                    return 'N/A';
                  })()}
                </div>
                <div className="text-sm text-gray-600">Average LST (°K)</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {selectedInstruments.length}
                </div>
                <div className="text-sm text-gray-600">Active Instruments</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

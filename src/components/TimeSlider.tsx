'use client';

import React, { useState, useEffect } from 'react';
import { ANIMATION_CONFIG } from '@/lib/constants';

interface TimeSliderProps {
  startYear: number;
  endYear: number;
  currentYear: number;
  onYearChange: (year: number) => void;
  isPlaying: boolean;
  onPlayPause: (playing: boolean) => void;
  onSpeedChange: (speed: number) => void;
}

/**
 * Interactive time slider component for controlling temporal animations
 * Supports play/pause, speed control, and manual year selection
 */
export default function TimeSlider({
  startYear,
  endYear,
  currentYear,
  onYearChange,
  isPlaying,
  onPlayPause,
  onSpeedChange
}: TimeSliderProps) {
  const [speed, setSpeed] = useState(1);
  const [isDragging, setIsDragging] = useState(false);

  // Animation logic
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      onYearChange(prevYear => {
        const nextYear = prevYear + 1;
        if (nextYear > endYear) {
          onPlayPause(false);
          return startYear;
        }
        return nextYear;
      });
    }, ANIMATION_CONFIG.pauseBetweenYears / speed);

    return () => clearInterval(interval);
  }, [isPlaying, speed, startYear, endYear, onYearChange, onPlayPause]);

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const year = parseInt(event.target.value);
    onYearChange(year);
  };

  const handleSpeedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = parseFloat(event.target.value);
    setSpeed(newSpeed);
    onSpeedChange(newSpeed);
  };

  const formatYear = (year: number) => {
    return year.toString();
  };

  const getProgress = () => {
    return ((currentYear - startYear) / (endYear - startYear)) * 100;
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-xl">
      <div className="flex items-center space-x-4">
        {/* Year display */}
        <div className="text-center min-w-[60px]">
          <div className="text-lg font-bold text-nasa-blue">
            {formatYear(currentYear)}
          </div>
          <div className="text-xs text-gray-600">
            Terra Data
          </div>
        </div>

        {/* Time slider */}
        <div className="flex-1 space-y-1">
          <div className="flex justify-between text-xs text-gray-600">
            <span>{startYear}</span>
            <span>{endYear}</span>
          </div>
          
          <div className="relative">
            <input
              type="range"
              min={startYear}
              max={endYear}
              value={currentYear}
              onChange={handleSliderChange}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #0B3D91 0%, #0B3D91 ${getProgress()}%, #E5E7EB ${getProgress()}%, #E5E7EB 100%)`
              }}
            />
          </div>
          
          <div className="text-xs text-gray-600 text-center">
            {Math.round(getProgress())}%
          </div>
        </div>

        {/* Playback controls */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onPlayPause(!isPlaying)}
            className="flex items-center justify-center w-8 h-8 bg-nasa-blue text-white rounded-full hover:bg-blue-700 transition-colors"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          <button
            onClick={() => onYearChange(startYear)}
            className="flex items-center justify-center w-7 h-7 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors"
            aria-label="Reset to start"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Speed control - compact */}
        <div className="min-w-[100px]">
          <label className="text-xs font-medium text-gray-700 block mb-1">
            Speed: {speed}x
          </label>
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.5"
            value={speed}
            onChange={handleSpeedChange}
            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #0B3D91;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #0B3D91;
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}

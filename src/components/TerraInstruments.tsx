'use client';

import React, { useState } from 'react';
import { TERRA_INSTRUMENTS } from '@/lib/constants';

interface TerraInstrumentsProps {
  selectedInstruments: string[];
  onInstrumentToggle: (instrument: string) => void;
  compact?: boolean;
}

/**
 * Component displaying Terra satellite instruments and their capabilities
 * Allows users to learn about the data sources and toggle instrument visibility
 */
export default function TerraInstruments({
  selectedInstruments,
  onInstrumentToggle,
  compact = false
}: TerraInstrumentsProps) {
  const [expandedInstrument, setExpandedInstrument] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleInstrumentClick = (instrument: string) => {
    setExpandedInstrument(expandedInstrument === instrument ? null : instrument);
  };

  const handleToggle = (e: React.MouseEvent, instrument: string) => {
    e.stopPropagation();
    onInstrumentToggle(instrument);
  };

  if (compact) {
    return (
      <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border-white/20 overflow-hidden">
        {/* Header with collapse/expand button */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <h3 className="text-sm font-semibold text-gray-800">
              Terra Instruments
            </h3>
          </div>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <svg
              className={`w-4 h-4 text-gray-500 transition-transform ${
                isCollapsed ? '' : 'rotate-180'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Collapsible content */}
        {!isCollapsed && (
          <div className="p-3 space-y-2 max-h-96 overflow-y-auto">
            {Object.entries(TERRA_INSTRUMENTS).map(([key, instrument]) => (
              <div
                key={key}
                className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${
                    selectedInstruments.includes(key) ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                  <span className="text-xs font-medium text-gray-700">
                    {instrument.name}
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedInstruments.includes(key)}
                    onChange={(e) => onInstrumentToggle(key)}
                    className="sr-only peer"
                  />
                  <div className="w-7 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-3 peer-checked:after:border-white after:content-[''] after:absolute after:top-[0px] after:left-[0px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
            
            {/* Compact summary */}
            <div className="pt-2 border-t border-gray-200">
              <div className="text-xs text-gray-600 text-center">
                {selectedInstruments.length}/5 active
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Original full layout for sidebar use
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
      <div className="space-y-4">
        {/* Header */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800">
            Terra Satellite Instruments
          </h3>
          <p className="text-sm text-gray-600">
            25 years of continuous Earth observation
          </p>
        </div>

        {/* Instruments grid */}
        <div className="grid grid-cols-1 gap-3">
          {Object.entries(TERRA_INSTRUMENTS).map(([key, instrument]) => (
            <div
              key={key}
              className={`border rounded-lg p-3 cursor-pointer transition-all duration-200 ${
                expandedInstrument === key
                  ? 'border-nasa-blue bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleInstrumentClick(key)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className={`w-3 h-3 rounded-full ${
                      selectedInstruments.includes(key) ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">
                      {instrument.name}
                    </div>
                    <div className="text-xs text-gray-600">
                      {instrument.fullName}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => handleToggle(e, key)}
                    className={`px-2 py-1 text-xs rounded ${
                      selectedInstruments.includes(key)
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {selectedInstruments.includes(key) ? 'Active' : 'Inactive'}
                  </button>
                  <svg
                    className={`w-4 h-4 text-gray-400 transition-transform ${
                      expandedInstrument === key ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Expanded content */}
              {expandedInstrument === key && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="space-y-2">
                    <p className="text-sm text-gray-700">
                      {instrument.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 text-xs">
                      <div>
                        <span className="font-medium text-gray-600">Data Types:</span>
                        <div className="mt-1">
                          {instrument.dataTypes.map((type, index) => (
                            <span
                              key={type}
                              className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded mr-1 mb-1"
                            >
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <div>
                          <span className="font-medium text-gray-600">Resolution:</span>
                          <span className="ml-1 text-gray-700">{instrument.resolution}</span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-600">Swath:</span>
                          <span className="ml-1 text-gray-700">{instrument.swath}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="text-sm text-gray-700">
            <div className="font-medium mb-1">Active Instruments: {selectedInstruments.length}/5</div>
            <div className="text-xs text-gray-600">
              {selectedInstruments.length > 0 ? (
                `Currently viewing data from: ${selectedInstruments.join(', ')}`
              ) : (
                'Select instruments to view their data layers'
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

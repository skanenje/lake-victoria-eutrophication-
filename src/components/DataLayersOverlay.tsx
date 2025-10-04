'use client';

import React, { useState } from 'react';

interface DataLayersOverlayProps {
  showNDVI: boolean;
  showLST: boolean;
  setShowNDVI: (show: boolean) => void;
  setShowLST: (show: boolean) => void;
}

/**
 * Collapsible data layers overlay component
 * Matches the format of the Terra Instruments compact overlay
 */
export default function DataLayersOverlay({
  showNDVI,
  showLST,
  setShowNDVI,
  setShowLST
}: DataLayersOverlayProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const dataLayers = [
    {
      key: 'ndvi',
      label: 'NDVI',
      fullLabel: 'Vegetation Health',
      color: 'green',
      checked: showNDVI,
      onChange: setShowNDVI
    },
    {
      key: 'lst',
      label: 'LST',
      fullLabel: 'Surface Temperature',
      color: 'red',
      checked: showLST,
      onChange: setShowLST
    }
  ];

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl border-white/20 overflow-hidden">
      {/* Header with collapse/expand button */}
      <div className="flex items-center justify-between p-3 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <h3 className="text-sm font-semibold text-gray-800">
            Data Layers
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
        <div className="p-3 space-y-2">
          {dataLayers.map((layer) => (
            <div
              key={layer.key}
              className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  layer.checked 
                    ? (layer.color === 'green' ? 'bg-green-500' : 'bg-red-500')
                    : 'bg-gray-300'
                }`} />
                <span className="text-xs font-medium text-gray-700">
                  {layer.label}
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={layer.checked}
                  onChange={(e) => layer.onChange(e.target.checked)}
                  className="sr-only peer"
                />
                <div className={`w-7 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 ${
                  layer.color === 'green' 
                    ? 'peer-focus:ring-green-300 peer-checked:bg-green-600' 
                    : 'peer-focus:ring-red-300 peer-checked:bg-red-600'
                } rounded-full peer peer-checked:after:translate-x-3 peer-checked:after:border-white after:content-[''] after:absolute after:top-[0px] after:left-[0px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all`}></div>
              </label>
            </div>
          ))}
          
          {/* Compact summary */}
          <div className="pt-2 border-t border-gray-200">
            <div className="text-xs text-gray-600 text-center">
              {dataLayers.filter(layer => layer.checked).length}/2 active
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

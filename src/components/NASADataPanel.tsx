'use client';

import React from 'react';
import { NASAData } from '@/lib/types';

interface NASADataPanelProps {
  data: NASAData | null;
  isLoading: boolean;
}

export default function NASADataPanel({ data, isLoading }: NASADataPanelProps) {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!data || !data.metrics) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-2">🛰️</div>
          <p className="font-medium">NASA Terra satellite data not available</p>
          <p className="text-sm mt-1">Using fallback data from static sources</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-green-600 bg-green-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">🛰️ NASA Terra Mission Data</h3>
          <p className="text-sm text-gray-600">25 Years of Satellite Monitoring (2000-2024)</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">
            Last updated: {new Date(data.lastUpdate).toLocaleDateString()}
          </div>
          <div className="text-xs text-gray-400">
            Source: {data.dataSource}
          </div>
        </div>
      </div>

      {/* Terra Instruments Data */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 rounded-lg border border-red-200 bg-red-50">
          <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(data.metrics.chlorophyll.status)}`}>
            {data.metrics.chlorophyll.status.toUpperCase()}
          </div>
          <div className="text-2xl font-bold text-red-800 mt-2">
            {data.metrics.chlorophyll.current}
          </div>
          <div className="text-sm text-red-700">
            Chlorophyll-a ({data.metrics.chlorophyll.unit})
          </div>
          <div className="text-xs text-red-600 mt-1">
            {data.metrics.chlorophyll.trend}
          </div>
          <div className="text-xs text-gray-500 mt-1 font-medium">
            📡 MODIS Terra
          </div>
        </div>

        <div className="text-center p-4 rounded-lg border border-orange-200 bg-orange-50">
          <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(data.metrics.temperature.status)}`}>
            {data.metrics.temperature.status.toUpperCase()}
          </div>
          <div className="text-2xl font-bold text-orange-800 mt-2">
            {data.metrics.temperature.current}
          </div>
          <div className="text-sm text-orange-700">
            Water Temperature ({data.metrics.temperature.unit})
          </div>
          <div className="text-xs text-orange-600 mt-1">
            {data.metrics.temperature.trend}
          </div>
          <div className="text-xs text-gray-500 mt-1 font-medium">
            🌡️ ASTER
          </div>
        </div>

        <div className="text-center p-4 rounded-lg border border-blue-200 bg-blue-50">
          <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(data.metrics.oxygen.status)}`}>
            {data.metrics.oxygen.status.toUpperCase()}
          </div>
          <div className="text-2xl font-bold text-blue-800 mt-2">
            {data.metrics.oxygen.current}
          </div>
          <div className="text-sm text-blue-700">
            Dissolved O₂ ({data.metrics.oxygen.unit})
          </div>
          <div className="text-xs text-blue-600 mt-1">
            {data.metrics.oxygen.trend}
          </div>
          <div className="text-xs text-gray-500 mt-1 font-medium">
            🧮 Multi-instrument
          </div>
        </div>

        <div className="text-center p-4 rounded-lg border border-green-200 bg-green-50">
          <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(data.metrics.algalBloom.status)}`}>
            {data.metrics.algalBloom.status.toUpperCase()}
          </div>
          <div className="text-2xl font-bold text-green-800 mt-2">
            {data.metrics.algalBloom.current}
          </div>
          <div className="text-sm text-green-700">
            Algal Bloom Area ({data.metrics.algalBloom.unit})
          </div>
          <div className="text-xs text-green-600 mt-1">
            {data.metrics.algalBloom.trend}
          </div>
          <div className="text-xs text-gray-500 mt-1 font-medium">
            🔬 MISR + MODIS
          </div>
        </div>
      </div>

      {/* Terra Mission Assessment */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-6 border border-blue-200">
        <div className="flex items-center mb-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
            <span className="text-white text-sm font-bold">T</span>
          </div>
          <h4 className="font-semibold text-gray-900">Terra Mission Assessment (25 Years)</h4>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center">
            <span className="text-gray-600">🚨 Risk Level:</span>
            <span className={`ml-2 px-3 py-1 rounded-full text-xs font-bold ${
              data.assessment.riskLevel === 'CRITICAL' ? 'bg-red-500 text-white animate-pulse' : 
              data.assessment.riskLevel === 'HIGH' ? 'bg-orange-500 text-white' : 'bg-yellow-500 text-white'
            }`}>
              {data.assessment.riskLevel}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600">📈 Trend:</span>
            <span className={`ml-2 font-bold ${
              data.assessment.trend === 'DETERIORATING' ? 'text-red-600' : 'text-green-600'
            }`}>
              {data.assessment.trend}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600">👥 Affected:</span>
            <span className="ml-2 font-bold text-blue-800">{data.assessment.affectedPopulation}</span>
          </div>
        </div>
      </div>

      {/* Terra Data Impact Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="flex items-center mb-2">
            <span className="text-red-600 text-lg mr-2">🌍</span>
            <h5 className="font-semibold text-red-800">Environmental Impact</h5>
          </div>
          <ul className="text-sm text-red-700 space-y-2">
            {data.impact.environmental.slice(0, 2).map((impact, index) => (
              <li key={index} className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">▸</span>
                <span>{impact}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="flex items-center mb-2">
            <span className="text-orange-600 text-lg mr-2">👥</span>
            <h5 className="font-semibold text-orange-800">Human Impact</h5>
          </div>
          <ul className="text-sm text-orange-700 space-y-2">
            {data.impact.human.slice(0, 2).map((impact, index) => (
              <li key={index} className="flex items-start">
                <span className="text-orange-500 mr-2 mt-1">▸</span>
                <span>{impact}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center mb-2">
            <span className="text-blue-600 text-lg mr-2">💰</span>
            <h5 className="font-semibold text-blue-800">Economic Impact</h5>
          </div>
          <ul className="text-sm text-blue-700 space-y-2">
            {data.impact.economic.slice(0, 2).map((impact, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-500 mr-2 mt-1">▸</span>
                <span>{impact}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
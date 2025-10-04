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

  if (!data) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center text-gray-500">
          <p>NASA data not available</p>
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
        <h3 className="text-xl font-bold text-gray-900">NASA Terra Data Analysis</h3>
        <div className="text-sm text-gray-500">
          Last updated: {new Date(data.lastUpdate).toLocaleDateString()}
        </div>
      </div>

      {/* Current Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center p-4 rounded-lg border">
          <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(data.metrics.chlorophyll.status)}`}>
            {data.metrics.chlorophyll.status.toUpperCase()}
          </div>
          <div className="text-2xl font-bold text-gray-900 mt-2">
            {data.metrics.chlorophyll.current}
          </div>
          <div className="text-sm text-gray-600">
            Chlorophyll ({data.metrics.chlorophyll.unit})
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {data.metrics.chlorophyll.trend}
          </div>
        </div>

        <div className="text-center p-4 rounded-lg border">
          <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(data.metrics.temperature.status)}`}>
            {data.metrics.temperature.status.toUpperCase()}
          </div>
          <div className="text-2xl font-bold text-gray-900 mt-2">
            {data.metrics.temperature.current}
          </div>
          <div className="text-sm text-gray-600">
            Temperature ({data.metrics.temperature.unit})
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {data.metrics.temperature.trend}
          </div>
        </div>

        <div className="text-center p-4 rounded-lg border">
          <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(data.metrics.oxygen.status)}`}>
            {data.metrics.oxygen.status.toUpperCase()}
          </div>
          <div className="text-2xl font-bold text-gray-900 mt-2">
            {data.metrics.oxygen.current}
          </div>
          <div className="text-sm text-gray-600">
            Dissolved O₂ ({data.metrics.oxygen.unit})
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {data.metrics.oxygen.trend}
          </div>
        </div>

        <div className="text-center p-4 rounded-lg border">
          <div className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(data.metrics.algalBloom.status)}`}>
            {data.metrics.algalBloom.status.toUpperCase()}
          </div>
          <div className="text-2xl font-bold text-gray-900 mt-2">
            {data.metrics.algalBloom.current}
          </div>
          <div className="text-sm text-gray-600">
            Algal Bloom ({data.metrics.algalBloom.unit})
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {data.metrics.algalBloom.trend}
          </div>
        </div>
      </div>

      {/* Assessment */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-gray-900 mb-2">Current Assessment</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Risk Level:</span>
            <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${
              data.assessment.riskLevel === 'CRITICAL' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {data.assessment.riskLevel}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Trend:</span>
            <span className="ml-2 font-medium">{data.assessment.trend}</span>
          </div>
          <div>
            <span className="text-gray-600">Affected Population:</span>
            <span className="ml-2 font-medium">{data.assessment.affectedPopulation}</span>
          </div>
        </div>
      </div>

      {/* Impact Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <h5 className="font-medium text-gray-900 mb-2">Environmental Impact</h5>
          <ul className="text-sm text-gray-600 space-y-1">
            {data.impact.environmental.slice(0, 2).map((impact, index) => (
              <li key={index} className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                {impact}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h5 className="font-medium text-gray-900 mb-2">Human Impact</h5>
          <ul className="text-sm text-gray-600 space-y-1">
            {data.impact.human.slice(0, 2).map((impact, index) => (
              <li key={index} className="flex items-start">
                <span className="text-orange-500 mr-2">•</span>
                {impact}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h5 className="font-medium text-gray-900 mb-2">Economic Impact</h5>
          <ul className="text-sm text-gray-600 space-y-1">
            {data.impact.economic.slice(0, 2).map((impact, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                {impact}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
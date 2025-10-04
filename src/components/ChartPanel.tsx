'use client';

import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { TimeDataPoint } from '@/lib/types';

interface ChartPanelProps {
  data: TimeDataPoint[];
  selectedYear: number;
  onYearChange: (year: number) => void;
  regionName: string;
}

/**
 * Interactive chart panel showing NDVI vs LST trends over time
 * Uses Plotly.js for rich interactivity and animations
 */
export default function ChartPanel({
  data,
  selectedYear,
  onYearChange,
  regionName
}: ChartPanelProps) {
  const [plotData, setPlotData] = useState<any[]>([]);
  const [layout, setLayout] = useState<any>({});

  useEffect(() => {
    if (!data.length) return;

    // Prepare data for Plotly
    const ndviData = {
      x: data.map(d => d.date),
      y: data.map(d => d.ndvi),
      type: 'scatter',
      mode: 'lines+markers',
      name: 'NDVI',
      line: { color: '#10B981', width: 3 },
      marker: { size: 6 },
      hovertemplate: '<b>NDVI</b><br>Date: %{x}<br>Value: %{y:.3f}<extra></extra>'
    };

    const lstData = {
      x: data.map(d => d.date),
      y: data.map(d => d.lst),
      type: 'scatter',
      mode: 'lines+markers',
      name: 'LST (°K)',
      yaxis: 'y2',
      line: { color: '#EF4444', width: 3 },
      marker: { size: 6 },
      hovertemplate: '<b>LST</b><br>Date: %{x}<br>Value: %{y:.1f}°K<extra></extra>'
    };

    // Highlight current year
    const currentYearData = data.filter(d => d.year === selectedYear);
    const highlightData = {
      x: currentYearData.map(d => d.date),
      y: currentYearData.map(d => d.ndvi),
      type: 'scatter',
      mode: 'markers',
      name: `${selectedYear} NDVI`,
      marker: { 
        color: '#0B3D91', 
        size: 12, 
        symbol: 'diamond',
        line: { color: 'white', width: 2 }
      },
      hovertemplate: '<b>Current Year</b><br>Date: %{x}<br>NDVI: %{y:.3f}<extra></extra>'
    };

    setPlotData([ndviData, lstData, highlightData]);

    // Layout configuration
    setLayout({
      title: {
        text: `Environmental Trends in ${regionName} (2000-2025)`,
        font: { size: 16, color: '#1F2937' }
      },
      xaxis: {
        title: 'Year',
        showgrid: true,
        gridcolor: '#E5E7EB',
        tickformat: '%Y'
      },
      yaxis: {
        title: 'NDVI',
        titlefont: { color: '#10B981' },
        tickfont: { color: '#10B981' },
        showgrid: true,
        gridcolor: '#E5E7EB',
        range: [-0.2, 1.0]
      },
      yaxis2: {
        title: 'LST (°K)',
        titlefont: { color: '#EF4444' },
        tickfont: { color: '#EF4444' },
        anchor: 'x',
        overlaying: 'y',
        side: 'right',
        range: [280, 320]
      },
      legend: {
        x: 0.02,
        y: 0.98,
        bgcolor: 'rgba(255,255,255,0.8)',
        bordercolor: '#E5E7EB',
        borderwidth: 1
      },
      margin: { l: 60, r: 60, t: 60, b: 60 },
      plot_bgcolor: 'rgba(0,0,0,0)',
      paper_bgcolor: 'rgba(0,0,0,0)',
      hovermode: 'x unified',
      showlegend: true
    });
  }, [data, selectedYear, regionName]);

  const handlePlotClick = (event: any) => {
    if (event.points && event.points.length > 0) {
      const point = event.points[0];
      const date = point.x;
      const year = new Date(date).getFullYear();
      onYearChange(year);
    }
  };

  const handlePlotHover = (event: any) => {
    // Add hover effects or tooltips
  };

  if (!data.length) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg">
        <div className="text-center text-gray-500">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-nasa-blue mx-auto mb-4"></div>
          <p>Loading chart data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
      <div className="space-y-4">
        {/* Chart header */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800">
            Environmental Trends
          </h3>
          <p className="text-sm text-gray-600">
            NDVI (vegetation health) vs LST (surface temperature)
          </p>
        </div>

        {/* Plotly chart */}
        <div className="w-full h-80">
          <Plot
            data={plotData}
            layout={layout}
            config={{
              displayModeBar: true,
              displaylogo: false,
              modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d'],
              responsive: true
            }}
            style={{ width: '100%', height: '100%' }}
            onClick={handlePlotClick}
            onHover={handlePlotHover}
          />
        </div>

        {/* Chart insights */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="font-medium text-green-800">NDVI Trend</div>
            <div className="text-green-600">
              {data.length > 1 ? (
                data[data.length - 1].ndvi > data[0].ndvi ? 
                  '↗ Increasing vegetation' : 
                  '↘ Decreasing vegetation'
              ) : 'No trend data'}
            </div>
          </div>
          <div className="bg-red-50 p-3 rounded-lg">
            <div className="font-medium text-red-800">LST Trend</div>
            <div className="text-red-600">
              {data.length > 1 ? (
                data[data.length - 1].lst > data[0].lst ? 
                  '↗ Warming trend' : 
                  '↘ Cooling trend'
              ) : 'No trend data'}
            </div>
          </div>
        </div>

        {/* Current year summary */}
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="font-medium text-blue-800">Current Year ({selectedYear})</div>
          <div className="text-blue-600 text-sm">
            {(() => {
              const yearData = data.filter(d => d.year === selectedYear);
              if (yearData.length > 0) {
                const avgNDVI = yearData.reduce((sum, d) => sum + d.ndvi, 0) / yearData.length;
                const avgLST = yearData.reduce((sum, d) => sum + d.lst, 0) / yearData.length;
                return `Avg NDVI: ${avgNDVI.toFixed(3)}, Avg LST: ${avgLST.toFixed(1)}°K`;
              }
              return 'No data available';
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}

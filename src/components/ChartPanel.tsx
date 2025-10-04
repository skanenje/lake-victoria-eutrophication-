'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { TimeDataPoint } from '@/lib/types';

const Plot = dynamic(() => import('react-plotly.js'), { ssr: false });

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

    // Prepare Terra satellite eutrophication data for Plotly
    const chlorophyllData = {
      x: data.map(d => d.date),
      y: data.map(d => d.chlorophyll || d.ndvi * 30), // Use chlorophyll or convert NDVI
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Chlorophyll-a (μg/L)',
      line: { color: '#DC2626', width: 3 },
      marker: { size: 6 },
      hovertemplate: '<b>Chlorophyll-a</b><br>Date: %{x}<br>Value: %{y:.1f} μg/L<extra></extra>'
    };

    const temperatureData = {
      x: data.map(d => d.date),
      y: data.map(d => d.temperature || (d.lst - 273.15)), // Use temperature or convert LST
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Water Temperature (°C)',
      yaxis: 'y2',
      line: { color: '#F59E0B', width: 3 },
      marker: { size: 6 },
      hovertemplate: '<b>Water Temperature</b><br>Date: %{x}<br>Value: %{y:.1f}°C<extra></extra>'
    };

    const oxygenData = {
      x: data.map(d => d.date),
      y: data.map(d => d.dissolvedOxygen || 8 - (d.chlorophyll || d.ndvi * 30) * 0.1), // Use oxygen or estimate
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Dissolved Oxygen (mg/L)',
      yaxis: 'y3',
      line: { color: '#2563EB', width: 3 },
      marker: { size: 6 },
      hovertemplate: '<b>Dissolved Oxygen</b><br>Date: %{x}<br>Value: %{y:.1f} mg/L<extra></extra>'
    };

    // Highlight current year
    const currentYearData = data.find(d => d.year === selectedYear);
    const highlightData = currentYearData ? {
      x: [currentYearData.date],
      y: [currentYearData.chlorophyll || currentYearData.ndvi * 30],
      type: 'scatter',
      mode: 'markers',
      name: `${selectedYear} Current`,
      marker: { 
        color: '#7C3AED', 
        size: 15, 
        symbol: 'star',
        line: { color: 'white', width: 2 }
      },
      hovertemplate: '<b>Current Year</b><br>Date: %{x}<br>Chlorophyll: %{y:.1f} μg/L<extra></extra>'
    } : null;

    const plotDataArray = [chlorophyllData, temperatureData, oxygenData];
    if (highlightData) plotDataArray.push(highlightData);
    setPlotData(plotDataArray);

    // Layout configuration for Terra eutrophication data
    setLayout({
      title: {
        text: `Lake Victoria Eutrophication Trends - Terra Satellite Data (2000-2024)`,
        font: { size: 16, color: '#1F2937' }
      },
      xaxis: {
        title: 'Year',
        showgrid: true,
        gridcolor: '#E5E7EB',
        tickformat: '%Y'
      },
      yaxis: {
        title: 'Chlorophyll-a (μg/L)',
        titlefont: { color: '#DC2626' },
        tickfont: { color: '#DC2626' },
        showgrid: true,
        gridcolor: '#E5E7EB',
        range: [0, 40]
      },
      yaxis2: {
        title: 'Water Temperature (°C)',
        titlefont: { color: '#F59E0B' },
        tickfont: { color: '#F59E0B' },
        anchor: 'x',
        overlaying: 'y',
        side: 'right',
        range: [23, 29]
      },
      yaxis3: {
        title: 'Dissolved Oxygen (mg/L)',
        titlefont: { color: '#2563EB' },
        tickfont: { color: '#2563EB' },
        anchor: 'free',
        overlaying: 'y',
        side: 'right',
        position: 0.95,
        range: [4, 9]
      },
      legend: {
        x: 0.02,
        y: 0.98,
        bgcolor: 'rgba(255,255,255,0.9)',
        bordercolor: '#E5E7EB',
        borderwidth: 1
      },
      margin: { l: 60, r: 100, t: 80, b: 60 },
      plot_bgcolor: 'rgba(0,0,0,0)',
      paper_bgcolor: 'rgba(0,0,0,0)',
      hovermode: 'x unified',
      showlegend: true,
      annotations: [
        {
          text: 'Critical Threshold: 25 μg/L',
          x: 0.5,
          y: 25,
          xref: 'paper',
          yref: 'y',
          showarrow: false,
          font: { color: '#DC2626', size: 10 },
          bgcolor: 'rgba(220, 38, 38, 0.1)',
          bordercolor: '#DC2626',
          borderwidth: 1
        }
      ],
      shapes: [
        {
          type: 'line',
          x0: 0,
          x1: 1,
          y0: 25,
          y1: 25,
          xref: 'paper',
          yref: 'y',
          line: { color: '#DC2626', width: 2, dash: 'dash' }
        }
      ]
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
            Lake Victoria Eutrophication Monitoring
          </h3>
          <p className="text-sm text-gray-600">
            25 Years of NASA Terra Satellite Data (MODIS, ASTER, MISR)
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
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="bg-red-50 p-3 rounded-lg">
            <div className="font-medium text-red-800">Chlorophyll-a Trend</div>
            <div className="text-red-600">
              {data.length > 1 ? (
                (data[data.length - 1].chlorophyll || data[data.length - 1].ndvi * 30) > 
                (data[0].chlorophyll || data[0].ndvi * 30) ? 
                  '↗ Increasing algal blooms' : 
                  '↘ Decreasing algal blooms'
              ) : 'No trend data'}
            </div>
          </div>
          <div className="bg-orange-50 p-3 rounded-lg">
            <div className="font-medium text-orange-800">Temperature Trend</div>
            <div className="text-orange-600">
              {data.length > 1 ? (
                (data[data.length - 1].temperature || data[data.length - 1].lst - 273.15) > 
                (data[0].temperature || data[0].lst - 273.15) ? 
                  '↗ Warming waters' : 
                  '↘ Cooling waters'
              ) : 'No trend data'}
            </div>
          </div>
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="font-medium text-blue-800">Oxygen Trend</div>
            <div className="text-blue-600">
              {data.length > 1 ? (
                (data[data.length - 1].dissolvedOxygen || 8 - (data[data.length - 1].chlorophyll || data[data.length - 1].ndvi * 30) * 0.1) > 
                (data[0].dissolvedOxygen || 8 - (data[0].chlorophyll || data[0].ndvi * 30) * 0.1) ? 
                  '↗ Improving oxygen' : 
                  '↘ Declining oxygen'
              ) : 'No trend data'}
            </div>
          </div>
        </div>

        {/* Current year summary */}
        <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
          <div className="font-medium text-purple-800">Terra Data Summary ({selectedYear})</div>
          <div className="text-purple-600 text-sm">
            {(() => {
              const yearData = data.find(d => d.year === selectedYear);
              if (yearData) {
                const chlorophyll = yearData.chlorophyll || yearData.ndvi * 30;
                const temperature = yearData.temperature || yearData.lst - 273.15;
                const oxygen = yearData.dissolvedOxygen || 8 - chlorophyll * 0.1;
                const riskLevel = chlorophyll > 25 ? 'CRITICAL' : chlorophyll > 15 ? 'HIGH' : 'MODERATE';
                return `Chlorophyll: ${chlorophyll.toFixed(1)} μg/L • Temperature: ${temperature.toFixed(1)}°C • Oxygen: ${oxygen.toFixed(1)} mg/L • Risk: ${riskLevel}`;
              }
              return 'No data available for selected year';
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}

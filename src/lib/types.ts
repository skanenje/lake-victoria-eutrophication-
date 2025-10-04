/**
 * Type definitions for the Lake Victoria MVP project
 */

export interface Region {
  name: string;
  slug: string;
  description: string;
  boundingBox: [number, number, number, number]; // [west, south, east, north]
  center: [number, number]; // [longitude, latitude]
  zoom: number;
  datasets: {
    ndvi: string;
    lst: string;
    annotations: string;
  };
  chartData: string;
  timeRange: {
    start: string;
    end: string;
  };
  instruments: string[];
  story: {
    title: string;
    description: string;
    impacts: string[];
  };
}

export interface TimeDataPoint {
  date: string;
  ndvi: number;
  lst: number;
  year: number;
  month: number;
}

export interface Annotation {
  id: string;
  type: 'event' | 'milestone' | 'impact';
  title: string;
  description: string;
  date: string;
  coordinates: [number, number];
  impact: 'positive' | 'negative' | 'neutral';
}

export interface MapLayer {
  id: string;
  name: string;
  type: 'raster' | 'vector';
  url: string;
  visible: boolean;
  opacity: number;
}

export interface ChartConfig {
  type: 'line' | 'scatter' | 'bar';
  xAxis: string;
  yAxis: string;
  title: string;
  colors: string[];
}

export interface TerraInstrument {
  name: string;
  fullName: string;
  description: string;
  dataTypes: string[];
  resolution: string;
  swath: string;
}

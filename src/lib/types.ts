export interface Region {
  slug: string;
  name: string;
  description: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  instruments: string[];
  timeRange: {
    start: string;
    end: string;
  };
  story: {
    title: string;
    description: string;
    impacts: string[];
  };
}

export interface TimeDataPoint {
  year: number;
  month?: number;
  date: string;
  ndvi: number;
  lst: number;
  precipitation?: number;
  temperature?: number;
}

export interface Annotation {
  id: string;
  type: 'event' | 'observation' | 'milestone';
  title: string;
  description: string;
  date: string;
  coordinates: [number, number];
  impact: 'low' | 'medium' | 'high';
}

// NASA Backend Data Types
export interface NASAMetrics {
  chlorophyll: {
    current: number;
    trend: string;
    status: 'normal' | 'warning' | 'critical';
    unit: string;
    threshold: number;
  };
  temperature: {
    current: number;
    trend: string;
    status: 'normal' | 'warning' | 'critical';
    unit: string;
    threshold: number;
  };
  oxygen: {
    current: number;
    trend: string;
    status: 'normal' | 'warning' | 'critical';
    unit: string;
    threshold: number;
  };
  algalBloom: {
    current: number;
    trend: string;
    status: 'normal' | 'warning' | 'critical';
    unit: string;
    threshold: number;
  };
}

export interface NASATimeSeriesPoint {
  date: string;
  year: number;
  chlorophyll: number;
  temperature: number;
  dissolvedOxygen: number;
  algalBloom: number;
  riskScore: number;
}

export interface NASAData {
  metrics: NASAMetrics;
  timeSeries: NASATimeSeriesPoint[];
  monthlyData: Array<{
    month: string;
    monthNum: number;
    chlorophyll: number;
    temperature: number;
    dissolvedOxygen: number;
    rainfall: number;
  }>;
  location: {
    lat: number;
    lon: number;
    minLat: number;
    maxLat: number;
    minLon: number;
    maxLon: number;
  };
  assessment: {
    year: number;
    chlorophyll: number;
    temperature: number;
    riskLevel: string;
    trend: string;
    affectedPopulation: string;
  };
  impact: {
    environmental: string[];
    human: string[];
    economic: string[];
  };
  recommendations: string[];
  lastUpdate: string;
  dataSource: string;
}
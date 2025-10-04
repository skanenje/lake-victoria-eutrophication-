/**
 * Constants for the Lake Victoria Eutrophication Monitor
 * NASA Terra Satellite Mission - 25 Years of Data (2000-2024)
 */

export const TERRA_INSTRUMENTS = {
  MODIS: {
    name: 'MODIS',
    fullName: 'Moderate Resolution Imaging Spectroradiometer',
    description: 'Primary instrument for chlorophyll-a detection and water quality monitoring in Lake Victoria',
    dataTypes: ['Chlorophyll-a', 'Water Turbidity', 'Algal Blooms', 'Surface Reflectance'],
    resolution: '250m-1km',
    swath: '2330km',
    eutrophicationUse: 'Detects algal blooms through red/NIR band ratios'
  },
  ASTER: {
    name: 'ASTER',
    fullName: 'Advanced Spaceborne Thermal Emission and Reflection Radiometer',
    description: 'High-resolution water temperature monitoring for thermal stress assessment',
    dataTypes: ['Water Temperature', 'Thermal Anomalies', 'Surface Kinetic Temperature'],
    resolution: '90m thermal',
    swath: '60km',
    eutrophicationUse: 'Monitors water temperature changes affecting oxygen levels'
  },
  MISR: {
    name: 'MISR',
    fullName: 'Multi-angle Imaging SpectroRadiometer',
    description: 'Multi-angle observations for atmospheric correction and aerosol monitoring',
    dataTypes: ['Atmospheric Correction', 'Aerosol Optical Depth', 'Haze Removal'],
    resolution: '275m-1.1km',
    swath: '360km',
    eutrophicationUse: 'Improves water quality retrievals through atmospheric correction'
  },
  CERES: {
    name: 'CERES',
    fullName: 'Clouds and Earth\'s Radiant Energy System',
    description: 'Radiation budget measurements for climate impact assessment',
    dataTypes: ['Solar Radiation', 'Cloud Effects', 'Energy Balance'],
    resolution: '20km',
    swath: 'Global',
    eutrophicationUse: 'Assesses climate factors affecting lake ecosystem'
  },
  MOPITT: {
    name: 'MOPITT',
    fullName: 'Measurements of Pollution in the Troposphere',
    description: 'Atmospheric pollution monitoring affecting water quality',
    dataTypes: ['Carbon Monoxide', 'Atmospheric Pollution', 'Air Quality'],
    resolution: '22km',
    swath: '640km',
    eutrophicationUse: 'Tracks pollution sources contributing to nutrient loading'
  }
};

export const COLOR_SCALES = {
  chlorophyll: {
    min: 0,
    max: 40,
    colors: ['#000080', '#0066CC', '#00CCFF', '#FFFF00', '#FF6600', '#CC0000'],
    unit: 'μg/L',
    thresholds: { low: 10, moderate: 15, high: 25, critical: 35 }
  },
  waterTemperature: {
    min: 23,
    max: 29,
    colors: ['#000080', '#0066CC', '#00CCFF', '#FFFF00', '#FF6600', '#CC0000'],
    unit: '°C',
    thresholds: { normal: 25, elevated: 26, high: 27, critical: 28 }
  },
  dissolvedOxygen: {
    min: 4,
    max: 9,
    colors: ['#CC0000', '#FF6600', '#FFFF00', '#00CCFF', '#0066CC', '#000080'],
    unit: 'mg/L',
    thresholds: { critical: 5, low: 6, moderate: 7, healthy: 8 }
  },
  ndvi: {
    min: -0.2,
    max: 1.0,
    colors: ['#8B0000', '#FF0000', '#FFFF00', '#00FF00', '#006400']
  },
  lst: {
    min: 280,
    max: 320,
    colors: ['#000080', '#0000FF', '#00FFFF', '#FFFF00', '#FF0000']
  }
};

export const ANIMATION_CONFIG = {
  frameRate: 2, // frames per second
  duration: 25, // seconds for full animation (25 years of Terra data)
  pauseBetweenYears: 1000, // milliseconds
  transitionDuration: 500, // milliseconds
  yearRange: { start: 2000, end: 2024 } // Terra mission timeline
};

// Eutrophication risk assessment thresholds
export const RISK_THRESHOLDS = {
  chlorophyll: {
    low: 15,      // μg/L
    moderate: 25, // μg/L
    high: 35,     // μg/L
    critical: 40  // μg/L
  },
  temperature: {
    normal: 25,   // °C
    elevated: 26, // °C
    high: 27,     // °C
    critical: 28  // °C
  },
  oxygen: {
    healthy: 7,   // mg/L
    moderate: 6,  // mg/L
    low: 5,       // mg/L
    critical: 4   // mg/L
  }
};

export const MAP_CONFIG = {
  maxZoom: 18,
  minZoom: 6,
  defaultTileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  satelliteTileLayer: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  lakeVictoria: {
    center: [-1.0, 33.0],
    bounds: [[-3.0, 31.0], [1.0, 35.0]],
    zoom: 8
  }
};

// Terra mission information
export const TERRA_MISSION = {
  launchDate: '1999-12-18',
  missionDuration: '25+ years',
  orbitAltitude: '705 km',
  orbitType: 'Sun-synchronous polar',
  equatorCrossingTime: '10:30 AM local time',
  revisitTime: '16 days (ASTER), 1-2 days (MODIS)',
  dataArchive: 'NASA Earthdata',
  primaryObjective: 'Understanding climate change and human impacts on environment'
};

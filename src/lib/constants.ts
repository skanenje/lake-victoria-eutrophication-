/**
 * Constants for the Lake Victoria MVP project
 */

export const TERRA_INSTRUMENTS = {
  MODIS: {
    name: 'MODIS',
    fullName: 'Moderate Resolution Imaging Spectroradiometer',
    description: 'Provides daily global observations of land, ocean, and atmosphere',
    dataTypes: ['NDVI', 'LST', 'Cloud Cover', 'Aerosols'],
    resolution: '250m-1km',
    swath: '2330km'
  },
  ASTER: {
    name: 'ASTER',
    fullName: 'Advanced Spaceborne Thermal Emission and Reflection Radiometer',
    description: 'High-resolution imaging of land surface temperature and elevation',
    dataTypes: ['LST', 'DEM', 'Surface Reflectance'],
    resolution: '15-90m',
    swath: '60km'
  },
  MISR: {
    name: 'MISR',
    fullName: 'Multi-angle Imaging SpectroRadiometer',
    description: 'Multi-angle observations for atmospheric and surface studies',
    dataTypes: ['Aerosols', 'Cloud Properties', 'Surface BRDF'],
    resolution: '275m-1.1km',
    swath: '360km'
  },
  CERES: {
    name: 'CERES',
    fullName: 'Clouds and the Earth\'s Radiant Energy System',
    description: 'Measures Earth\'s radiation budget and cloud properties',
    dataTypes: ['Radiation Budget', 'Cloud Properties', 'Aerosol Effects'],
    resolution: '20km',
    swath: 'Global'
  },
  MOPITT: {
    name: 'MOPITT',
    fullName: 'Measurements of Pollution in the Troposphere',
    description: 'Monitors carbon monoxide and methane in the atmosphere',
    dataTypes: ['CO', 'CH4', 'Atmospheric Chemistry'],
    resolution: '22km',
    swath: '640km'
  }
};

export const COLOR_SCALES = {
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
  duration: 25, // seconds for full animation
  pauseBetweenYears: 1000, // milliseconds
  transitionDuration: 500 // milliseconds
};

export const MAP_CONFIG = {
  mapboxToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '',
  defaultStyle: 'mapbox://styles/mapbox/satellite-v9',
  maxZoom: 18,
  minZoom: 6,
  // Fallback style if Mapbox token is not available
  fallbackStyle: 'mapbox://styles/mapbox/streets-v12'
};

/**
 * Environment configuration for the Lake Victoria MVP
 * Copy this file to .env.local and fill in your actual values
 */

export const ENV_CONFIG = {
  // Mapbox Configuration
  MAPBOX_TOKEN: process.env.NEXT_PUBLIC_MAPBOX_TOKEN || '',
  
  // Application Configuration
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Lake Victoria MVP',
  APP_DESCRIPTION: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Terra Satellite Data Visualization',
  
  // API Configuration (for future data sources)
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  API_KEY: process.env.NEXT_PUBLIC_API_KEY || '',
  
  // Environment
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
};

// Validation function
export const validateEnvironment = () => {
  const errors: string[] = [];
  
  if (!ENV_CONFIG.MAPBOX_TOKEN) {
    errors.push('NEXT_PUBLIC_MAPBOX_TOKEN is required');
  }
  
  if (errors.length > 0) {
    console.error('Environment validation failed:', errors);
    if (ENV_CONFIG.IS_PRODUCTION) {
      throw new Error(`Missing required environment variables: ${errors.join(', ')}`);
    }
  }
  
  return errors.length === 0;
};


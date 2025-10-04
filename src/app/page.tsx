'use client';

import React from 'react';
import Link from 'next/link';
import { Region } from '@/lib/types';
import regionsData from '@/config/regions.json';

/**
 * Home page component showcasing the Terra satellite data visualization project
 * Features region selection and project introduction
 */
export default function HomePage() {
  const regions: Region[] = regionsData;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-nasa rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Lake Victoria MVP</h1>
                <p className="text-sm text-gray-600">Terra Satellite Data Visualization</p>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-6">
              <a href="#about" className="text-gray-600 hover:text-nasa-blue transition-colors">
                About
              </a>
              <a href="#instruments" className="text-gray-600 hover:text-nasa-blue transition-colors">
                Instruments
              </a>
              <a href="#regions" className="text-gray-600 hover:text-nasa-blue transition-colors">
                Regions
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fadeInUp">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              <span className="text-gradient">25 Years of</span>
              <br />
              Earth Observation
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Explore the changing face of Lake Victoria using NASA's Terra satellite data. 
              Discover environmental trends, community impacts, and scientific insights from 2000-2025.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#regions" className="btn-primary">
                Explore Regions
              </Link>
              <a href="#about" className="btn-secondary">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About Terra Satellite
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              NASA's Terra satellite has been observing Earth for over 25 years, providing 
              invaluable data about our planet's changing environment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-hover text-center">
              <div className="w-16 h-16 bg-nasa-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">5 Instruments</h3>
              <p className="text-gray-600">
                MODIS, ASTER, MISR, CERES, and MOPITT work together to provide comprehensive Earth observations.
              </p>
            </div>

            <div className="card-hover text-center">
              <div className="w-16 h-16 bg-nasa-red rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">25+ Years</h3>
              <p className="text-gray-600">
                Continuous daily observations since 1999, providing long-term environmental data.
              </p>
            </div>

            <div className="card-hover text-center">
              <div className="w-16 h-16 bg-earth-green rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Global Impact</h3>
              <p className="text-gray-600">
                Data used for climate research, disaster monitoring, and environmental protection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Regions Section */}
      <section id="regions" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Regions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Select a region to explore environmental changes over time using Terra satellite data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regions.map((region) => (
              <Link
                key={region.slug}
                href={`/${region.slug}`}
                className="card-hover group"
              >
                <div className="relative">
                  <div className="w-full h-48 bg-gradient-to-br from-blue-400 to-green-500 rounded-lg mb-4 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="text-2xl font-bold">{region.name}</div>
                      <div className="text-sm opacity-90">Lake Victoria Region</div>
                    </div>
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                      <svg className="w-5 h-5 text-nasa-blue" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-nasa-blue transition-colors">
                    {region.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {region.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {region.instruments.slice(0, 3).map((instrument) => (
                      <span
                        key={instrument}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {instrument}
                      </span>
                    ))}
                    {region.instruments.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{region.instruments.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="pt-2">
                    <div className="text-sm text-gray-500">
                      Data Range: {region.timeRange.start} - {region.timeRange.end}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Lake Victoria MVP</h3>
              <p className="text-gray-400 text-sm">
                Exploring environmental change using NASA Terra satellite data from 2000-2025.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Data Sources</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>NASA Terra MODIS</li>
                <li>NASA Terra ASTER</li>
                <li>NASA Terra MISR</li>
                <li>NASA Terra CERES</li>
                <li>NASA Terra MOPITT</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Project Info</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>Built with Next.js & Mapbox</li>
                <li>Visualization with Plotly.js</li>
                <li>Styling with TailwindCSS</li>
                <li>Deployed on Vercel</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 NASA SAC Team. Built for educational and research purposes.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

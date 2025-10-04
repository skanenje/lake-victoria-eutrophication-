import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Lake Victoria MVP - Terra Satellite Data Visualization',
  description: 'Explore 25 years of environmental change in Lake Victoria using NASA Terra satellite data. Interactive visualization of NDVI and LST trends in Kisumu, Kenya.',
  keywords: ['NASA', 'Terra', 'satellite', 'Lake Victoria', 'Kisumu', 'NDVI', 'LST', 'environmental change', 'earth observation', 'climate data'],
  authors: [{ name: 'NASA SAC Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.ico',
    apple: '/favicon.svg',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Lake Victoria MVP - Terra Satellite Data Visualization',
    description: 'Explore 25 years of environmental change in Lake Victoria using NASA Terra satellite data.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Lake Victoria MVP',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Lake Victoria MVP - Terra Satellite Data Visualization',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lake Victoria MVP - Terra Satellite Data Visualization',
    description: 'Explore 25 years of environmental change in Lake Victoria using NASA Terra satellite data.',
    images: ['/og-image.png'],
  },
  other: {
    'theme-color': '#0B3D91',
    'msapplication-TileColor': '#0B3D91',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
          {children}
        </div>
      </body>
    </html>
  );
}

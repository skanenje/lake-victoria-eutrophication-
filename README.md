# Lake Victoria MVP - Terra Satellite Data Visualization

A Next.js application for visualizing 25 years of environmental change in Lake Victoria using NASA Terra satellite data.

## Features

- Interactive map visualization with Mapbox GL JS
- Time-based animation of NDVI and LST data
- Environmental trend charts with Plotly.js
- Terra satellite instrument information
- Responsive design with Tailwind CSS
- PWA support with web app manifest

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Maps**: Mapbox GL JS
- **Charts**: Plotly.js
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+ 
- npm 8+
- Mapbox account and access token

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
BACKEND_URL=http://localhost:3001
```

Get your Mapbox token from [https://account.mapbox.com/access-tokens/](https://account.mapbox.com/access-tokens/)

### Backend Environment Variables

For the NASA backend (in `nasa-test/.env`):

```env
EARTHDATA_USERNAME=your_nasa_earthdata_username
EARTHDATA_PASSWORD=your_nasa_earthdata_password
```

Get NASA Earthdata credentials from [https://urs.earthdata.nasa.gov/](https://urs.earthdata.nasa.gov/)

## Development

### Option 1: Full Stack Development (Frontend + Backend)

1. Install dependencies for both frontend and backend:
   ```bash
   # Frontend dependencies
   npm install
   
   # Backend dependencies
   cd nasa-test
   npm install
   cd ..
   ```

2. Start both servers:
   ```bash
   ./start-dev.sh
   ```
   This will start:
   - Backend server at [http://localhost:3001](http://localhost:3001)
   - Frontend server at [http://localhost:3000](http://localhost:3000)

### Option 2: Frontend Only Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

   Note: Without the backend, the app will use static NASA data from the `nasa-test/output/` folder.

## Available Scripts

### Frontend Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run type-check` - Run TypeScript type checking
- `npm run clean` - Clean build artifacts

### Backend Scripts (in nasa-test/ folder)
- `npm run server` - Start NASA data backend server
- `npm run test` - Test NASA API connections
- `npm run verify` - Verify data sources

### Full Stack
- `./start-dev.sh` - Start both frontend and backend servers

## Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

4. Set environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_MAPBOX_TOKEN`: Your Mapbox token

### Option 2: Deploy via GitHub Integration

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Environment Variables for Production

In your Vercel dashboard, add:
- `NEXT_PUBLIC_MAPBOX_TOKEN`: Your Mapbox access token

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── kisumu/         # Kisumu region page
├── components/          # React components
│   ├── MapContainer.tsx
│   ├── TimeSlider.tsx
│   ├── ChartPanel.tsx
│   ├── TerraInstruments.tsx
│   └── DataLayersOverlay.tsx
├── lib/                # Utilities and configuration
│   ├── constants.ts
│   ├── types.ts
│   └── env.ts
└── config/             # Configuration files
    └── regions.json
```

## Data Sources

The application uses static JSON data files located in `public/data/kisumu/`:
- `trends.json` - Time series data for charts
- `annotations.geojson` - Map annotations
- `ndvi_tiles.json` - NDVI tile configuration
- `lst_tiles.json` - LST tile configuration

## Performance Optimizations

- Static generation for better performance
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Compression and caching headers
- PWA manifest for offline support

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is built for educational and research purposes as part of the NASA SAC program.

## Support

For issues and questions, please create an issue in the GitHub repository.
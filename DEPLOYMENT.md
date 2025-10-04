# Deployment Guide for Lake Victoria MVP

## Prerequisites

1. **Mapbox Account**: Get a free Mapbox account at [mapbox.com](https://mapbox.com)
2. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
3. **GitHub Account**: For code repository hosting

## Step 1: Prepare Your Mapbox Token

1. Go to [Mapbox Account](https://account.mapbox.com/access-tokens/)
2. Create a new access token or use the default public token
3. Copy the token for use in deployment

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel CLI (Recommended)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Navigate to your project directory and deploy:
   ```bash
   vercel
   ```

4. Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? **Your account**
   - Link to existing project? **No**
   - Project name: **lake-victoria-mvp** (or your preferred name)
   - Directory: **./** (current directory)

5. Set environment variables:
   ```bash
   vercel env add NEXT_PUBLIC_MAPBOX_TOKEN
   ```
   - Enter your Mapbox token when prompted

6. Redeploy with environment variables:
   ```bash
   vercel --prod
   ```

### Option B: Deploy via GitHub Integration

1. Push your code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your GitHub repository
5. Configure project settings:
   - Framework Preset: **Next.js**
   - Root Directory: **./**
   - Build Command: **npm run build**
   - Output Directory: **.next**
6. Add environment variables:
   - `NEXT_PUBLIC_MAPBOX_TOKEN`: Your Mapbox token
7. Click "Deploy"

## Step 3: Verify Deployment

1. Visit your deployed URL
2. Check that the map loads correctly
3. Test the interactive features
4. Verify responsive design on mobile

## Step 4: Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Domains" tab
3. Add your custom domain
4. Update DNS records as instructed

## Environment Variables

Required environment variables:

- `NEXT_PUBLIC_MAPBOX_TOKEN`: Your Mapbox access token

Optional environment variables:

- `NEXT_PUBLIC_APP_NAME`: Application name (defaults to "Lake Victoria MVP")
- `NEXT_PUBLIC_APP_DESCRIPTION`: Application description

## Troubleshooting

### Map Not Loading
- Verify `NEXT_PUBLIC_MAPBOX_TOKEN` is set correctly
- Check Mapbox token permissions
- Ensure token is not expired

### Build Failures
- Check Node.js version (requires 18+)
- Verify all dependencies are installed
- Check for TypeScript errors

### Performance Issues
- Enable Vercel's Edge Network
- Check bundle size with `npm run build:analyze`
- Optimize images and assets

## Production Checklist

- [ ] Mapbox token configured
- [ ] Environment variables set
- [ ] Build completes without errors
- [ ] Map loads and functions correctly
- [ ] Charts render properly
- [ ] Responsive design works
- [ ] PWA features enabled
- [ ] SEO meta tags configured
- [ ] Analytics tracking (if needed)

## Monitoring

- Use Vercel Analytics for performance monitoring
- Set up error tracking with Sentry (optional)
- Monitor Core Web Vitals
- Check Mapbox usage limits

## Support

For deployment issues:
1. Check Vercel documentation
2. Review build logs in Vercel dashboard
3. Test locally with `npm run build && npm run start`
4. Contact support if needed


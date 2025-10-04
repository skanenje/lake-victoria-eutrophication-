"""Analysis and animation pipeline for Lake Victoria Chl-a

This script expects GEE exports placed next to the repo or will create
sample data for demonstration. It performs time-series analysis, creates
synthetic spatial frames (if no GeoTIFFs are present), and can produce a
stitched video using the frames.
"""

import os
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime


def load_or_create_sample(csv_path='LakeVictoria_Monthly_Chla_TimeSeries.csv'):
    if os.path.exists(csv_path):
        print(f'Loading CSV: {csv_path}')
        df = pd.read_csv(csv_path)
        df['date'] = pd.to_datetime(df['date'])
        return df

    print(f'File not found: {csv_path}. Creating sample data for demo...')
    dates = pd.date_range('2000-01-01', '2025-10-01', freq='MS')
    np.random.seed(42)
    trend = np.linspace(8, 15, len(dates))
    seasonal = 3 * np.sin(np.arange(len(dates)) * 2 * np.pi / 12)
    noise = np.random.normal(0, 1.5, len(dates))
    blooms = np.random.choice([0, 10], len(dates), p=[0.92, 0.08])
    chla = np.clip(trend + seasonal + noise + blooms, 2, 45)

    df = pd.DataFrame({'date': dates, 'mean_chla': chla})
    df.to_csv(csv_path, index=False)
    print(f'Sample CSV written: {csv_path}')
    return df


def plot_trend(df, out='outputs/figures/trend_plot.png'):
    os.makedirs(os.path.dirname(out), exist_ok=True)
    plt.figure(figsize=(10, 4))
    plt.plot(df['date'], df['mean_chla'], label='Monthly mean')
    plt.plot(df['date'], df['mean_chla'].rolling(12).mean(), label='12-month MA', linewidth=2)
    plt.axhline(20, color='orange', linestyle='--', label='Eutrophic threshold')
    plt.xlabel('Year')
    plt.ylabel('Chlorophyll-a (mg/m^3)')
    plt.title('Lake Victoria Chl-a Trend (2000-2025)')
    plt.legend()
    plt.tight_layout()
    plt.savefig(out, dpi=200)
    print(f'Saved trend plot to {out}')


class SpatialFrameGenerator:
    """Create simple synthetic spatial frames centered on Winam Gulf.

    The frames are synthetic (Gaussian bloom centered in Winam Gulf). If
    you have GeoTIFFs exported from GEE in `frames/` or `spatial_frames/`
    this generator will skip creating samples.
    """

    def __init__(self, out_dir='spatial_frames'):
        self.out_dir = out_dir
        os.makedirs(self.out_dir, exist_ok=True)

    def create_sample_frames(self, dates, n_x=200, n_y=200):
        print('Creating synthetic spatial frames in', self.out_dir)
        lon_min, lon_max = 31.0, 35.0
        lat_min, lat_max = -3.0, 1.0

        X = np.linspace(lon_min, lon_max, n_x)
        Y = np.linspace(lat_min, lat_max, n_y)
        XX, YY = np.meshgrid(X, Y)

        # Winam Gulf center (approx)
        cx, cy = 34.4, -0.3

        for i, date in enumerate(dates):
            # Bloom amplitude increases slightly over time for demo
            time_frac = i / max(1, len(dates) - 1)
            amp = 8 + 15 * time_frac
            dist2 = (XX - cx)**2 + (YY - cy)**2
            Z = amp * np.exp(-dist2 / 0.05) + 2 * np.sin((XX + YY) * 3) + np.random.normal(0, 0.6, XX.shape)
            Z = np.clip(Z, 0, 50)

            fig, ax = plt.subplots(figsize=(10, 6))
            im = ax.imshow(Z, extent=(lon_min, lon_max, lat_min, lat_max), cmap='RdYlGn_r', vmin=0, vmax=30)
            ax.set_title(date.strftime('%B %Y'))
            ax.set_xlabel('Longitude')
            ax.set_ylabel('Latitude')
            cbar = fig.colorbar(im, ax=ax, fraction=0.036, pad=0.04)
            cbar.set_label('Chlorophyll-a (mg/m³)')

            out_path = os.path.join(self.out_dir, f'spatial_{i:04d}.png')
            plt.tight_layout()
            fig.savefig(out_path, dpi=150)
            plt.close(fig)
            if (i + 1) % 10 == 0:
                print(f'  Created {i+1}/{len(dates)} frames')


def try_make_video(frames_dir='spatial_frames', out='output/lake_victoria_eutrophication.mp4', fps=6):
    try:
        # moviepy.editor may not be present in some installs; import directly
        from moviepy.video.io.ImageSequenceClip import ImageSequenceClip
    except Exception as e:
        print('MoviePy not available or failed to import ImageSequenceClip:', e)
        print('Skipping video creation. Install moviepy to enable video output.')
        return None

    # collect frames
    if not os.path.exists(frames_dir):
        print('Frames directory does not exist:', frames_dir)
        return None

    frames = sorted([os.path.join(frames_dir, f) for f in os.listdir(frames_dir) if f.lower().endswith('.png')])
    if not frames:
        print('No PNG frames found in', frames_dir)
        return None

    os.makedirs(os.path.dirname(out), exist_ok=True)
    clip = ImageSequenceClip(frames, fps=fps)
    clip.write_videofile(out, codec='libx264', audio=False, threads=2)
    print('Video written to', out)
    return out


def main():
    df = load_or_create_sample()
    plot_trend(df)

    # Create synthetic spatial frames if none exist
    frames_dir = 'spatial_frames'
    if not os.path.exists(frames_dir) or not any(f.lower().endswith('.png') for f in os.listdir(frames_dir)):
        # sample dates every 6 months to keep frame count low
        dates = pd.date_range(df['date'].min(), df['date'].max(), freq='6MS')
        gen = SpatialFrameGenerator(out_dir=frames_dir)
        gen.create_sample_frames(dates)
    else:
        print('Using existing frames in', frames_dir)

    # Try to make a video from frames
    try_make_video(frames_dir=frames_dir, out='output/lake_victoria_eutrophication.mp4', fps=6)


if __name__ == '__main__':
    main()

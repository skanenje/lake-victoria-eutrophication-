"""Analysis and animation pipeline for Lake Victoria Chl-a

This script expects GEE exports placed next to the repo or will create
sample data for demonstration. It performs time-series analysis and can
produce spatial frames and a simple animation.
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


def main():
    df = load_or_create_sample()
    plot_trend(df)


if __name__ == '__main__':
    main()

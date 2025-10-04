# Lake Victoria Eutrophication — GEE → Animation Pipeline

This repository holds code and guidance to run the full pipeline described in the project guide: acquire MODIS chlorophyll-a from Google Earth Engine (GEE), analyze trends and hotspots, export products, and create a final animation/video highlighting eutrophication in Lake Victoria (Winam Gulf focus).

Project layout (added files):

- `scripts/gee/lake_victoria_gee_chla.js` — Google Earth Engine (JS) script to create monthly composites, compute trends and bloom frequency, and export CSVs and rasters to Google Drive. Paste into the GEE Code Editor and run exports via the Tasks panel.

- `scripts/python/analysis_and_animation.py` — Python script to load the GEE CSV (or create sample data), run time-series analysis, and create a trend plot saved to `outputs/figures`.

- `scripts/python/video_production.py` — Simple MoviePy-based helper to stitch PNG frames from `spatial_frames/` into an MP4 video in `output/`.

- `notebooks/Lake_Victoria_Eutrophication.ipynb` — Notebook scaffold showing how to run the Python analysis using the scripts.

- `requirements.txt` — Suggested Python dependencies for local processing, geemap for GEE-Python bridge, plus rasterio and moviepy for visualization/animation.

Quick start

1. Run the GEE script:
   - Open `scripts/gee/lake_victoria_gee_chla.js` in the Earth Engine Code Editor (code.earthengine.google.com).
   - Update `CONFIG.exportFolder` if you want a custom Google Drive folder.
   - Run the script and in the Tasks tab start the exports. Download the CSV `LakeVictoria_Monthly_Chla_TimeSeries.csv` and any raster frames you exported into the repo root or `scripts/python/`.

2. Local setup (Linux / zsh):
   - Create and activate a Python environment (recommended):

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

3. Run analysis and produce a trend plot:

```bash
python scripts/python/analysis_and_animation.py
```

4. Create spatial frames (place GeoTIFFs into `frames/` or `spatial_frames/`), then stitch into a video:

```bash
python scripts/python/video_production.py
```

Notes & next steps

- The notebook `notebooks/Lake_Victoria_Eutrophication.ipynb` demonstrates running the analysis inside Jupyter/Colab.
- For production animations, export 30–60 GeoTIFF frames from GEE (e.g., every 6 months or quarterly), place them into `spatial_frames/` and run `video_production.py`.
- Consider editing `scripts/python/video_composer.py` (or enhancing `video_production.py`) to add overlays, captions, and audio.

If you'd like, I can:
- wire up a small test that validates the CSV schema and plots a quick sanity-check,
- extend the notebook to generate spatial sample frames automatically,
- or create a Makefile / task runner to automate environment setup and runs.

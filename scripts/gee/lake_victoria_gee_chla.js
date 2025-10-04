// Lake Victoria MODIS Chlorophyll-a (Chl-a) analysis for GEE
// Place this script into the Earth Engine Code Editor (code.earthengine.google.com)
// Edit CONFIG as needed and run. Use Tasks tab to run exports.

var CONFIG = {
  startDate: '2000-01-01',
  endDate: '2025-10-04',
  cloudThreshold: 50,
  eutrophicThreshold: 20, // mg/m^3
  exportScale: 1000, // meters
  exportFolder: 'LakeVictoria_Eutro'
};

// Region of interest: Lake Victoria basin (focus: Winam Gulf)
var roi = ee.Geometry.Rectangle([31.0, -3.0, 35.0, 1.0]);
var winamGulf = ee.Geometry.Polygon([
  [[34.0, -0.5], [34.8, -0.5], [34.8, 0.5], [34.0, 0.5]]
]);

Map.centerObject(roi, 8);
Map.addLayer(roi, {color: 'blue'}, 'Study Region', false);
Map.addLayer(winamGulf, {color: 'red'}, 'Winam Gulf', false);

// Load MODIS Aqua ocean color L3S MI product and select chlor_a
var modisChla = ee.ImageCollection('NASA/OCEANDATA/MODIS-Aqua/L3SMI')
  .filterDate(CONFIG.startDate, CONFIG.endDate)
  .filterBounds(roi)
  .select('chlor_a')
  .filter(ee.Filter.lt('CLOUD_COVERAGE_OCEAN', CONFIG.cloudThreshold));

print('Raw image count:', modisChla.size());

// Create monthly mean composites
var startDate = ee.Date(CONFIG.startDate);
var endDate = ee.Date(CONFIG.endDate);
var nMonths = endDate.difference(startDate, 'month').round();

var monthlyChla = ee.ImageCollection(
  ee.List.sequence(0, nMonths.subtract(1)).map(function(monthOffset) {
    var start = startDate.advance(monthOffset, 'month');
    var end = start.advance(1, 'month');
    var monthly = modisChla.filterDate(start, end).mean().clip(roi)
      .set({'system:time_start': start.millis(), 'month': start.format('YYYY-MM'), 'month_num': start.get('month')});
    return monthly;
  })
);

print('Monthly composite count:', monthlyChla.size());

// Visualization parameters
var chlaVis = {min: 0, max: 25, palette: ['#000033', '#0066ff', '#00ff00', '#ffff00', '#ff6600', '#cc0000']};
Map.addLayer(monthlyChla.mean(), chlaVis, 'Mean Chl-a (2000-2025)');

// Temporal trend (linear fit)
var withTime = monthlyChla.map(function(img) {
  var years = ee.Date(img.get('system:time_start')).difference(startDate, 'year');
  return img.addBands(ee.Image(years).float().rename('time'));
});

var trend = withTime.select(['time', 'chlor_a']).reduce(ee.Reducer.linearFit());
var slope = trend.select('scale');
Map.addLayer(slope, {min: -0.5, max: 0.5, palette: ['#0000ff', '#ffffff', '#ff0000']}, 'Chl-a Trend (mg/m^3/yr)');

// Bloom frequency
var bloomFreq = monthlyChla.map(function(img) { return img.gt(CONFIG.eutrophicThreshold).rename('bloom'); }).sum().divide(monthlyChla.size()).multiply(100);
Map.addLayer(bloomFreq, {min: 0, max: 50, palette: ['#00ff00', '#ffff00', '#ff6600', '#ff0000']}, 'Bloom Frequency (%)');

// Time series export (monthly basin mean)
var monthlyTimeSeries = monthlyChla.map(function(img) {
  var stats = img.reduceRegion({reducer: ee.Reducer.mean().combine({reducer2: ee.Reducer.stdDev(), sharedInputs: true}), geometry: roi, scale: CONFIG.exportScale, maxPixels: 1e9});
  return ee.Feature(null, {'date': img.get('month'), 'mean_chla': stats.get('chlor_a_mean'), 'std_chla': stats.get('chlor_a_stdDev')});
});

Export.table.toDrive({collection: ee.FeatureCollection(monthlyTimeSeries), description: 'LakeVictoria_Monthly_Chla_TimeSeries', folder: CONFIG.exportFolder, fileFormat: 'CSV'});

// Export summary rasters (mean, trend slope, bloom frequency)
var meanChla = monthlyChla.mean();
Export.image.toDrive({image: meanChla, description: 'LakeVictoria_Mean_Chla_2000_2025', folder: CONFIG.exportFolder, region: roi, scale: CONFIG.exportScale, maxPixels: 1e9, crs: 'EPSG:4326'});
Export.image.toDrive({image: slope, description: 'LakeVictoria_Chla_Trend_Slope', folder: CONFIG.exportFolder, region: roi, scale: CONFIG.exportScale, maxPixels: 1e9, crs: 'EPSG:4326'});
Export.image.toDrive({image: bloomFreq, description: 'LakeVictoria_Bloom_Frequency', folder: CONFIG.exportFolder, region: roi, scale: CONFIG.exportScale, maxPixels: 1e9, crs: 'EPSG:4326'});

print('Script ready. Open Tasks to run exports.');

/**
 * Multi-Layer 3D Map for Looker - Expanded & Combined Layers
 * * IMPORTANT: Add these to your manifest dependencies:
 * - https://unpkg.com/topojson-client@3
 * * Manifest example:
 * {
 * "dependencies": {
 * "deck.gl": "https://unpkg.com/deck.gl@latest/dist.min.js",
 * "mapbox-gl": "https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js",
 * "mapbox-gl-css": "https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css",
 * "topojson": "https://unpkg.com/topojson-client@3"
 * }
 * }
 */

looker.plugins.visualizations.add({
  id: "combo_map_3d",
  label: "Combo Map 3D (Expanded)",
  options: {
    // MAP
    mapbox_token: {
      type: "string",
      label: "Mapbox Token",
      section: "Map",
      placeholder: "Get free token at mapbox.com"
    },
    map_style: {
      type: "string",
      label: "Map Style",
      display: "select",
      values: [
        {"Dark": "mapbox://styles/mapbox/dark-v11"},
        {"Light": "mapbox://styles/mapbox/light-v11"},
        {"Streets": "mapbox://styles/mapbox/streets-v12"},
        {"Satellite": "mapbox://styles/mapbox/satellite-streets-v12"}
      ],
      default: "mapbox://styles/mapbox/dark-v11",
      section: "Map"
    },
    center_lat: {
      type: "number",
      label: "Center Latitude",
      default: 20,
      section: "Map"
    },
    center_lng: {
      type: "number",
      label: "Center Longitude",
      default: 0,
      section: "Map"
    },
    zoom: {
      type: "number",
      label: "Zoom",
      default: 2,
      section: "Map"
    },
    pitch: {
      type: "number",
      label: "3D Tilt (0-60)",
      default: 45,
      min: 0,
      max: 60,
      section: "Map"
    },

    // DATA MODE
    data_mode: {
      type: "string",
      label: "Data Mode",
      display: "select",
      values: [
        {"Point Data (Lat/Lng)": "points"},
        {"Region Data (Choropleth)": "regions"}
      ],
      default: "points",
      section: "Data"
    },

    // LAYER 1
    layer1_enabled: {
      type: "boolean",
      label: "Enable Layer 1",
      default: true,
      section: "Layer 1"
    },
    layer1_type: {
      type: "string",
      label: "Type",
      display: "select",
      values: [
        {"Heatmap": "heatmap"},
        {"Hexagon Grid": "hexagon"},
        {"Choropleth (GeoJSON)": "geojson"}
      ],
      default: "hexagon",
      section: "Layer 1"
    },

    // Region/GeoJSON Settings
    layer1_map_layer: {
      type: "string",
      label: "Built-in Map Layer",
      display: "select",
      values: [
        {"Custom (URL below)": "custom"},
        // Global
        {"World Countries": "world_countries"},
        // Americas
        {"USA - States": "us_states"},
        {"USA - Counties": "us_counties"},
        {"Canada - Provinces": "canada_provinces"},
        {"Mexico - States": "mexico_states"},
        {"Brazil - States": "brazil_states"},
        // Europe
        {"France - Departments": "france_departments"},
        {"France - Regions": "france_regions"},
        {"UK - Regions": "uk_regions"},
        {"UK - Sub-units": "uk_subunits"},
        {"Germany - States (Bundesländer)": "germany_states"},
        {"Spain - Autonomous Communities": "spain_communities"},
        {"Italy - Regions": "italy_regions"},
        {"Netherlands - Provinces": "netherlands_provinces"},
        {"Switzerland - Cantons": "switzerland_cantons"},
        // Asia & Oceania
        {"Australia - States": "australia_states"},
        {"Japan - Prefectures": "japan_prefectures"},
        {"China - Provinces": "china_provinces"},
        {"India - States": "india_states"},
        // Combined / Super Layers
        {"COMBINED: North America (US/Can/Mex)": "combined_north_america"},
        {"COMBINED: Europe Major (Fr/De/Uk/Es/It)": "combined_europe_major"},
        {"COMBINED: UK & Ireland": "combined_uk_ireland"},
        {"COMBINED: DACH (De/Au/Ch)": "combined_dach"}
      ],
      default: "custom",
      section: "Layer 1"
    },
    layer1_geojson_url: {
      type: "string",
      label: "Custom GeoJSON/TopoJSON URL",
      section: "Layer 1",
      placeholder: "https://example.com/regions.json"
    },
    layer1_geojson_property: {
      type: "string",
      label: "GeoJSON Property to Match",
      default: "name",
      section: "Layer 1",
      placeholder: "Property name in GeoJSON (e.g., 'name', 'id', 'NAME')"
    },
    layer1_region_dimension: {
      type: "string",
      label: "Region Dimension Name",
      section: "Layer 1",
      placeholder: "Leave empty to auto-detect"
    },
    layer1_color_start: {
      type: "string",
      label: "Color Low",
      default: "#E8F5E9",
      display: "color",
      section: "Layer 1"
    },
    layer1_color_end: {
      type: "string",
      label: "Color High",
      default: "#1B5E20",
      display: "color",
      section: "Layer 1"
    },
    layer1_opacity: {
      type: "number",
      label: "Opacity",
      default: 0.7,
      min: 0,
      max: 1,
      step: 0.1,
      section: "Layer 1"
    },

    // LAYER 2
    layer2_enabled: {
      type: "boolean",
      label: "Enable 3D Columns",
      default: true,
      section: "Layer 2"
    },
    layer2_height_scale: {
      type: "number",
      label: "Height Scale",
      default: 1000,
      section: "Layer 2"
    },
    layer2_radius: {
      type: "number",
      label: "Column Radius",
      default: 50000,
      section: "Layer 2"
    },
    layer2_color: {
      type: "string",
      label: "Color",
      default: "#4285F4",
      display: "color",
      section: "Layer 2"
    },

    // LAYER 3
    layer3_enabled: {
      type: "boolean",
      label: "Enable Points",
      default: false,
      section: "Layer 3"
    },
    layer3_radius: {
      type: "number",
      label: "Point Size",
      default: 5000,
      section: "Layer 3"
    },
    layer3_color: {
      type: "string",
      label: "Color",
      default: "#EA4335",
      display: "color",
      section: "Layer 3"
    }
  },

  create: function(element, config) {
    console.log('[MAP] Creating');
    element.innerHTML = '<div id="map" style="width:100%;height:100%;"></div>';
    this._container = element.querySelector('#map');
    this._geojsonCache = {};
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    console.log('[MAP] ========== UPDATE ==========');

    this.clearErrors();

    // Check dependencies
    if (typeof deck === 'undefined' || typeof mapboxgl === 'undefined') {
      this.addError({ title: "Missing Dependencies", message: "Deck.gl or Mapbox GL not loaded" });
      done();
      return;
    }

    if (!config.mapbox_token) {
      this.addError({ title: "Mapbox Token Required", message: "Add token in Map settings" });
      done();
      return;
    }

    try {
      if (config.data_mode === 'regions') {
        this._updateRegionMode(data, config, queryResponse, done);
      } else {
        this._updatePointMode(data, config, queryResponse, done);
      }

    } catch (error) {
      console.error('[MAP] Error:', error);
      this.addError({ title: "Error", message: error.message });
      done();
    }
  },

  _updatePointMode: function(data, config, queryResponse, done) {
    const dims = queryResponse.fields.dimension_like;
    const measures = queryResponse.fields.measure_like;

    const latF = dims.find(d => d.type === 'latitude' || d.name.toLowerCase().includes('lat'));
    const lngF = dims.find(d => d.type === 'longitude' || d.name.toLowerCase().includes('lon'));

    if (!latF || !lngF) {
      this.addError({ title: "Need Lat/Lng", message: "Add latitude/longitude dimensions" });
      done();
      return;
    }

    const points = data.map(row => ({
      position: [parseFloat(row[lngF.name].value), parseFloat(row[latF.name].value)],
      values: measures.map(m => parseFloat(row[m.name]?.value) || 0)
    })).filter(p => !isNaN(p.position[0]) && !isNaN(p.position[1]));

    const layers = this._buildPointLayers(points, config, measures);
    this._renderMap(layers, config, done);
  },

  _updateRegionMode: function(data, config, queryResponse, done) {
    console.log('[MAP] Region mode');

    const dims = queryResponse.fields.dimension_like;
    const measures = queryResponse.fields.measure_like;

    // Find region dimension
    let regionDim = config.layer1_region_dimension ?
      dims.find(d => d.name === config.layer1_region_dimension) :
      dims.find(d => d.type === 'string');

    if (!regionDim) {
      this.addError({ title: "No Region Dimension", message: "Add a location dimension" });
      done();
      return;
    }

    console.log('[MAP] Region dimension:', regionDim.name);

    const geojsonSource = this._getGeoJSONUrl(config);

    if (!geojsonSource) {
      this.addError({ title: "GeoJSON Required", message: "Select map layer or provide URL" });
      done();
      return;
    }

    console.log('[MAP] Loading source(s)...');

    // _loadGeoJSON now handles both single URL strings AND arrays of URLs
    this._loadGeoJSON(geojsonSource).then(geojson => {
      console.log('[MAP] GeoJSON loaded, features:', geojson.features.length);
      const layers = this._buildRegionLayers(data, geojson, config, queryResponse, regionDim, measures);
      this._renderMap(layers, config, done);
    }).catch(error => {
      console.error('[MAP] Load error:', error);
      this.addError({ title: "Load Error", message: error.message });
      done();
    });
  },

  _getGeoJSONUrl: function(config) {
    if (config.layer1_map_layer === 'custom') {
      return config.layer1_geojson_url;
    }

    // URL CONSTANTS
    const URLS = {
        world: 'https://unpkg.com/world-atlas@2/countries-110m.json',
        us_states: 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json',
        us_counties: 'https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json',

        // France
        fr_dept: 'https://france-geojson.gregoiredavid.fr/repo/departements.geojson',
        fr_region: 'https://france-geojson.gregoiredavid.fr/repo/regions.geojson',

        // Americas
        canada: 'https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/canada.geojson',
        mexico: 'https://raw.githubusercontent.com/angelnmara/geojson/master/mexico/mexico.geojson',
        brazil: 'https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson',

        // Europe
        uk_regions: 'https://martinjc.github.io/UK-GeoJSON/json/eng/topo_eer.json', // English Regions
        uk_subunits: 'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/united-kingdom/uk-subunits.json', // Scotland, Wales, etc
        germany: 'https://raw.githubusercontent.com/isellsoap/deutschlandGeoJSON/main/2_bundeslaender/3_mittel.geo.json',
        spain: 'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/spain/spain-comunidad-with-canary-islands.json',
        italy: 'https://raw.githubusercontent.com/openpolis/geojson-italy/master/geojson/limits_IT_regions.geojson',
        netherlands: 'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/netherlands/nl-provinces.json',
        switzerland: 'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/switzerland/switzerland-cantons.json',
        austria: 'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/austria/austria-states.json',
        ireland: 'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/ireland/ireland-counties.json',

        // Asia / Oceania
        australia: 'https://raw.githubusercontent.com/tonywr71/GeoJson-Data/master/australian-states.json',
        japan: 'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/japan/jp-prefectures.json',
        china: 'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/china/china-provinces.json',
        india: 'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/india/india-states.json'
    };

    const builtInMaps = {
      'world_countries': URLS.world,

      'us_states': URLS.us_states,
      'us_counties': URLS.us_counties,
      'canada_provinces': URLS.canada,
      'mexico_states': URLS.mexico,
      'brazil_states': URLS.brazil,

      'france_departments': URLS.fr_dept,
      'france_regions': URLS.fr_region,
      'uk_regions': URLS.uk_regions,
      'uk_subunits': URLS.uk_subunits,
      'germany_states': URLS.germany,
      'spain_communities': URLS.spain,
      'italy_regions': URLS.italy,
      'netherlands_provinces': URLS.netherlands,
      'switzerland_cantons': URLS.switzerland,

      'australia_states': URLS.australia,
      'japan_prefectures': URLS.japan,
      'china_provinces': URLS.china,
      'india_states': URLS.india,

      // --- COMBINED GROUPS (Arrays) ---
      'combined_north_america': [URLS.us_states, URLS.canada, URLS.mexico],
      'combined_europe_major': [URLS.fr_region, URLS.germany, URLS.uk_regions, URLS.spain, URLS.italy],
      'combined_uk_ireland': [URLS.uk_subunits, URLS.ireland],
      'combined_dach': [URLS.germany, URLS.austria, URLS.switzerland]
    };

    return builtInMaps[config.layer1_map_layer] || config.layer1_geojson_url;
  },

  // UPDATED: Handles both string URLs and Arrays of URLs
  _loadGeoJSON: async function(urlOrList) {

    // 1. Handle Array of URLs (Combined Layers)
    if (Array.isArray(urlOrList)) {
      console.log('[MAP] Loading combined layer group...');

      // Fetch all sequentially or parallel (parallel is faster)
      const promises = urlOrList.map(url => this._loadGeoJSON(url));
      const results = await Promise.all(promises);

      // Merge all FeatureCollections into one
      const combinedFeatures = [];
      results.forEach(geo => {
        if (geo && geo.features) {
          combinedFeatures.push(...geo.features);
        }
      });

      return {
        type: "FeatureCollection",
        features: combinedFeatures
      };
    }

    // 2. Handle Single URL
    const url = urlOrList;
    if (this._geojsonCache[url]) {
      return this._geojsonCache[url];
    }

    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}: ${url}`);

    const data = await response.json();
    let geojson = data;

    // Handle TopoJSON conversion
    if (data.type === 'Topology') {
      if (typeof topojson === 'undefined') {
        throw new Error('TopoJSON library not loaded - add to manifest');
      }
      // Try to find the main object
      const keys = Object.keys(data.objects);
      const objectKey = keys[0]; // Default to first
      console.log('[MAP] Converting TopoJSON object:', objectKey);
      geojson = topojson.feature(data, data.objects[objectKey]);
    }

    this._geojsonCache[url] = geojson;
    return geojson;
  },

  _buildPointLayers: function(points, config, measures) {
    const layers = [];

    if (config.layer1_enabled && config.layer1_type !== 'geojson') {
      if (config.layer1_type === 'heatmap') {
        layers.push(new deck.HeatmapLayer({
          id: 'heatmap',
          data: points,
          getPosition: d => d.position,
          getWeight: d => d.values[0] || 1,
          radiusPixels: 60
        }));
      } else {
        layers.push(new deck.HexagonLayer({
          id: 'hexagon',
          data: points,
          getPosition: d => d.position,
          getElevationWeight: d => d.values[0] || 1,
          elevationScale: 0,
          radius: 10000,
          colorRange: this._getColorRange(config.layer1_color_start, config.layer1_color_end),
          opacity: config.layer1_opacity,
          pickable: true
        }));
      }
    }

    if (config.layer2_enabled) {
      const idx = measures.length > 1 ? 1 : 0;
      layers.push(new deck.ColumnLayer({
        id: 'columns',
        data: points,
        diskResolution: 12,
        radius: config.layer2_radius,
        extruded: true,
        pickable: true,
        elevationScale: config.layer2_height_scale,
        getPosition: d => d.position,
        getFillColor: this._hexToRgb(config.layer2_color),
        getLineColor: [255, 255, 255, 80],
        getElevation: d => d.values[idx] || 0,
        opacity: 0.8
      }));
    }

    if (config.layer3_enabled) {
      const idx = measures.length > 2 ? 2 : 0;
      layers.push(new deck.ScatterplotLayer({
        id: 'points',
        data: points,
        getPosition: d => d.position,
        getRadius: config.layer3_radius,
        getFillColor: this._hexToRgb(config.layer3_color),
        opacity: 0.7,
        pickable: true
      }));
    }

    return layers;
  },

  _buildRegionLayers: function(data, geojson, config, queryResponse, regionDim, measures) {
    const layers = [];

    // Build data lookup
    const dataMap = {};
    data.forEach(row => {
      const region = row[regionDim.name].value;
      const values = measures.map(m => parseFloat(row[m.name]?.value) || 0);
      dataMap[region] = values;
    });

    console.log('[MAP] Data regions (first 10):', Object.keys(dataMap).slice(0, 10));
    // Safety check for features
    if(!geojson.features) return [];

    // Get value range
    const measureIdx = 0;
    const allValues = Object.values(dataMap).map(v => v[measureIdx] || 0);
    const minValue = Math.min(...allValues);
    const maxValue = Math.max(...allValues);

    // Property matching function
    const property = config.layer1_geojson_property || 'name';
    const getDataForFeature = (feature) => {
      const props = feature.properties;
      if (!props) return null;

      // Try exact match on specified property
      if (props[property] && dataMap[props[property]]) {
        return dataMap[props[property]];
      }

      // Try case-insensitive match on all data keys
      const propValue = (props[property] || '').toLowerCase();
      for (let key in dataMap) {
        if (key.toLowerCase() === propValue) {
          return dataMap[key];
        }
      }

      // Try all properties in GeoJSON
      for (let prop in props) {
        if (dataMap[props[prop]]) {
          return dataMap[props[prop]];
        }
        const lowerProp = (props[prop] || '').toString().toLowerCase();
        for (let key in dataMap) {
          if (key.toLowerCase() === lowerProp) {
            return dataMap[key];
          }
        }
      }

      return null;
    };

    // Layer 1: Choropleth
    if (config.layer1_enabled && config.layer1_type === 'geojson') {
      let matchCount = 0;

      layers.push(new deck.GeoJsonLayer({
        id: 'geojson',
        data: geojson,
        filled: true,
        stroked: true,
        pickable: true,
        opacity: config.layer1_opacity,
        getLineColor: [255, 255, 255, 100],
        getLineWidth: 1,
        getFillColor: f => {
          const values = getDataForFeature(f);

          if (!values) return [200, 200, 200, 100];

          matchCount++;
          const value = values[measureIdx] || 0;
          const ratio = maxValue > minValue ? (value - minValue) / (maxValue - minValue) : 0;

          return this._interpolateColorRgb(
            config.layer1_color_start,
            config.layer1_color_end,
            ratio
          );
        }
      }));

      console.log('[MAP] Matched', matchCount, 'of', geojson.features.length, 'regions');
    }

    // Centroids for layers 2 & 3
    const centroids = [];
    geojson.features.forEach(feature => {
      const values = getDataForFeature(feature);
      if (!values) return;

      let centroid;
      // Simple centroid calculation
      if (feature.geometry) {
          if (feature.geometry.type === 'Polygon') {
            centroid = this._polygonCentroid(feature.geometry.coordinates[0]);
          } else if (feature.geometry.type === 'MultiPolygon') {
            // Just take the first polygon of the multipolygon for speed
            centroid = this._polygonCentroid(feature.geometry.coordinates[0][0]);
          }
      }

      if (centroid) {
        centroids.push({ position: centroid, values });
      }
    });

    if (config.layer2_enabled && centroids.length > 0) {
      const idx = measures.length > 1 ? 1 : 0;
      layers.push(new deck.ColumnLayer({
        id: 'columns',
        data: centroids,
        diskResolution: 12,
        radius: config.layer2_radius,
        extruded: true,
        pickable: true,
        elevationScale: config.layer2_height_scale,
        getPosition: d => d.position,
        getFillColor: this._hexToRgb(config.layer2_color),
        getLineColor: [255, 255, 255, 80],
        getElevation: d => d.values[idx] || 0,
        opacity: 0.8
      }));
    }

    if (config.layer3_enabled && centroids.length > 0) {
      const idx = measures.length > 2 ? 2 : 0;
      layers.push(new deck.ScatterplotLayer({
        id: 'points',
        data: centroids,
        getPosition: d => d.position,
        getRadius: config.layer3_radius,
        getFillColor: this._hexToRgb(config.layer3_color),
        opacity: 0.7,
        pickable: true
      }));
    }

    return layers;
  },

  _polygonCentroid: function(coordinates) {
    let x = 0, y = 0;
    if(!coordinates || coordinates.length === 0) return [0,0];

    coordinates.forEach(coord => {
      x += coord[0];
      y += coord[1];
    });
    return [x / coordinates.length, y / coordinates.length];
  },

  _renderMap: function(layers, config, done) {
    console.log('[MAP] Config mapbox_token:', config.mapbox_token ? 'Present (length: ' + config.mapbox_token.length + ')' : 'MISSING');

    const viewState = {
      longitude: config.center_lng,
      latitude: config.center_lat,
      zoom: config.zoom,
      pitch: config.pitch,
      bearing: 0
    };

    console.log('[MAP] Creating Deck.gl with', layers.length, 'layers');

    if (!this._deck) {
      this._deck = new deck.DeckGL({
        container: this._container,
        mapStyle: config.map_style,
        mapboxApiAccessToken: config.mapbox_token,  // Pass token directly to Deck.gl
        initialViewState: viewState,
        controller: true,
        layers
      });
      console.log('[MAP] Deck.gl instance created');
    } else {
      this._deck.setProps({
        layers,
        initialViewState: viewState,
        mapboxApiAccessToken: config.mapbox_token  // Also on update
      });
      console.log('[MAP] Deck.gl instance updated');
    }

    done();
  },

  _getColorRange: function(start, end) {
    const range = [];
    for (let i = 0; i < 6; i++) {
      range.push(this._interpolateColorRgb(start, end, i / 5));
    }
    return range;
  },

  _interpolateColorRgb: function(color1, color2, ratio) {
    const c1 = this._hexToRgb(color1);
    const c2 = this._hexToRgb(color2);
    return [
      Math.round(c1[0] + (c2[0] - c1[0]) * ratio),
      Math.round(c1[1] + (c2[1] - c1[1]) * ratio),
      Math.round(c1[2] + (c2[2] - c1[2]) * ratio)
    ];
  },

  _hexToRgb: function(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : [128, 128, 128];
  },

  destroy: function() {
    if (this._deck) {
      this._deck.finalize();
    }
  }
});

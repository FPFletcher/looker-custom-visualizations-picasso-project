/**
 * Multi-Layer 3D Map for Looker - v6 Stable (Crash Proof)
 * * * DEPENDENCIES (Add to manifest.lkml):
 * {
 * "dependencies": {
 * "deck.gl": "https://unpkg.com/deck.gl@latest/dist.min.js",
 * "mapbox-gl": "https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js",
 * "mapbox-gl-css": "https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css",
 * "topojson": "https://unpkg.com/topojson-client@3"
 * }
 * }
 */

// --- HELPER TO GENERATE REPETITIVE LAYER OPTIONS ---
const getLayerOptions = (n) => {
  const defaults = [
    { type: 'geojson', color: '#2E7D32', radius: 1000, height: 1000 }, // L1
    { type: 'column', color: '#1565C0', radius: 20000, height: 2000 },  // L2
    { type: 'point', color: '#C62828', radius: 5000, height: 0 },       // L3
    { type: 'icon', color: '#F9A825', radius: 10000, height: 0 }        // L4
  ];
  const def = defaults[n-1];

  return {
    [`layer${n}_divider`]: {
      type: "string",
      label: `────────── LAYER ${n} ──────────`,
      display: "divider",
      section: "Layers",
      order: n * 10
    },
    [`layer${n}_enabled`]: {
      type: "boolean",
      label: `Enable Layer ${n}`,
      default: n <= 2,
      section: "Layers",
      order: n * 10 + 1
    },
    [`layer${n}_type`]: {
      type: "string",
      label: `Layer ${n} Type`,
      display: "select",
      values: [
        {"Choropleth (Region Only)": "geojson"},
        {"3D Columns": "column"},
        {"Points (Fixed Size)": "point"},
        {"Bubbles (Value Size)": "bubble"},
        {"Icon (Custom Image)": "icon"},
        {"Heatmap": "heatmap"},
        {"Hexagon Grid": "hexagon"}
      ],
      default: def.type,
      section: "Layers",
      order: n * 10 + 2
    },
    [`layer${n}_icon_url`]: {
      type: "string",
      label: `L${n} Icon URL`,
      default: "https://static.vecteezy.com/system/resources/thumbnails/044/570/540/small_2x/single-water-drop-on-transparent-background-free-png.png",
      placeholder: "https://...",
      section: "Layers",
      order: n * 10 + 3
    },
    [`layer${n}_measure_idx`]: {
      type: "number",
      label: `L${n} Measure Index`,
      default: n-1,
      section: "Layers",
      placeholder: "0 = 1st Measure",
      order: n * 10 + 4
    },
    [`layer${n}_radius`]: {
      type: "number",
      label: `L${n} Radius/Size`,
      default: def.radius,
      section: "Layers",
      order: n * 10 + 5
    },
    [`layer${n}_height`]: {
      type: "number",
      label: `L${n} Height (3D)`,
      default: def.height,
      section: "Layers",
      order: n * 10 + 6
    },
    [`layer${n}_color`]: {
      type: "string",
      label: `L${n} Color`,
      display: "color",
      default: def.color,
      section: "Layers",
      order: n * 10 + 7
    },
    [`layer${n}_opacity`]: {
      type: "number",
      label: `L${n} Opacity`,
      default: 0.7,
      min: 0,
      max: 1,
      step: 0.1,
      section: "Layers",
      order: n * 10 + 8
    }
  };
};

looker.plugins.visualizations.add({
  id: "combo_map_ultimate_v6",
  label: "Combo Map 3D (Stable)",
  options: {
    // --- MAP SETTINGS ---
    mapbox_token: {
      type: "string",
      label: "Mapbox Token",
      section: "Map",
      placeholder: "pk.eyJ1..."
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
    center_lat: { type: "number", label: "Latitude", default: 46, section: "Map" },
    center_lng: { type: "number", label: "Longitude", default: 2, section: "Map" },
    zoom: { type: "number", label: "Zoom", default: 4, section: "Map" },
    pitch: { type: "number", label: "3D Tilt (0-60)", default: 45, section: "Map" },

    // --- DATA CONFIG ---
    data_mode: {
      type: "string",
      label: "Data Mode",
      display: "select",
      values: [
        {"Region Data (Names)" : "regions"},
        {"Point Data (Lat/Lng)": "points"}
      ],
      default: "regions",
      section: "Data"
    },

    // --- LAYERS ---
    ...getLayerOptions(1),
    ...getLayerOptions(2),
    ...getLayerOptions(3),
    ...getLayerOptions(4),

    // --- REGION SETTINGS ---
    region_settings_div: { type: "string", label: "─── REGION MAPPING ───", display: "divider", section: "Data" },
    map_layer_source: {
      type: "string",
      label: "Region Map Source",
      display: "select",
      values: [
        {"Custom URL": "custom"},
        {"World Countries": "world_countries"},
        {"USA States": "us_states"},
        {"USA Counties": "us_counties"},
        {"Europe Major Combined": "combined_europe_major"},
        {"France Regions": "france_regions"},
        {"Germany States": "germany_states"},
        {"UK Regions": "uk_regions"},
        {"Spain Communities": "spain_communities"}
      ],
      default: "combined_europe_major",
      section: "Data"
    },
    custom_geojson_url: {
      type: "string",
      label: "Custom URL",
      section: "Data",
      placeholder: "https://..."
    },
    region_dim_name: {
      type: "string",
      label: "Region Dimension Name",
      section: "Data",
      placeholder: "Auto-detect if empty"
    },

    // --- COLORS ---
    color_range_start: {
      type: "string",
      label: "Gradient Start",
      display: "color",
      default: "#E8F5E9",
      section: "Colors"
    },
    color_range_end: {
      type: "string",
      label: "Gradient End",
      display: "color",
      default: "#1B5E20",
      section: "Colors"
    }
  },

  create: function(element, config) {
    // 1. Force Load Mapbox CSS (Prevents Shaking)
    if (!document.getElementById('mapbox-css-fix')) {
      const link = document.createElement('link');
      link.id = 'mapbox-css-fix';
      link.rel = 'stylesheet';
      link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
      document.head.appendChild(link);
    }

    // 2. Set up container
    element.innerHTML = `
      <style>
        #map-wrapper { width: 100%; height: 100%; position: relative; overflow: hidden; background: #000; }
        #map { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
        .deck-tooltip { font-family: sans-serif; font-size: 12px; }
      </style>
      <div id="map-wrapper">
        <div id="map"></div>
      </div>`;
    this._container = element.querySelector('#map');
    this._geojsonCache = {};

    // 3. Initialize View State Storage
    this._viewState = null;
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    this.clearErrors();

    // 1. Dependency Check
    if (typeof deck === 'undefined' || typeof mapboxgl === 'undefined') {
      this.addError({ title: "Missing Dependencies", message: "Add deck.gl and mapbox-gl to manifest." });
      done(); return;
    }
    if (!config.mapbox_token) {
      this.addError({ title: "Mapbox Token Required", message: "Enter token in Map settings." });
      done(); return;
    }

    // 2. Prepare Data
    this._prepareData(data, config, queryResponse).then(processedData => {
      this._render(processedData, config, queryResponse, details);
      done();
    }).catch(err => {
      console.error("Data Prep Error:", err);
      this.addError({ title: "Error", message: err.message });
      done();
    });
  },

  _prepareData: async function(data, config, queryResponse) {
    const measures = queryResponse.fields.measure_like;

    // A. POINT MODE
    if (config.data_mode === 'points') {
      const dims = queryResponse.fields.dimension_like;
      const latF = dims.find(d => d.type === 'latitude' || d.name.toLowerCase().includes('lat'));
      const lngF = dims.find(d => d.type === 'longitude' || d.name.toLowerCase().includes('lon'));

      if (!latF || !lngF) throw new Error("Latitude/Longitude dimensions missing.");

      const points = data.map(row => ({
        position: [parseFloat(row[lngF.name].value), parseFloat(row[latF.name].value)],
        values: measures.map(m => row[m.name].value),
        formattedValues: measures.map(m => row[m.name].rendered || row[m.name].value),
        name: "Point"
      })).filter(p => !isNaN(p.position[0]) && !isNaN(p.position[1]));

      return { type: 'points', data: points, measures };
    }

    // B. REGION MODE
    const url = this._getGeoJSONUrl(config);
    let geojson = null;

    try {
        geojson = await this._loadGeoJSON(url);
    } catch (error) {
        throw new Error(`Failed to load Map Data. Check network/CORS.`);
    }

    const dims = queryResponse.fields.dimension_like;
    const regionDim = config.region_dim_name
      ? dims.find(d => d.name === config.region_dim_name)
      : dims.find(d => d.type === 'string');

    if (!regionDim) throw new Error("No Region Name dimension found.");

    const dataMap = {};
    data.forEach(row => {
      const rawName = row[regionDim.name].value;
      if (rawName) {
        const clean = this._normalizeName(rawName);
        dataMap[clean] = {
          values: measures.map(m => row[m.name].value),
          formattedValues: measures.map(m => row[m.name].rendered || row[m.name].value),
          rawName: rawName
        };
      }
    });

    const matchedFeatures = [];
    if (geojson && geojson.features) {
        geojson.features.forEach(feature => {
            const props = feature.properties;
            let match = null;

            for (let key in props) {
                if (props[key]) {
                  const cleanProp = this._normalizeName(props[key]);
                  if (dataMap[cleanProp]) {
                      match = dataMap[cleanProp];
                      break;
                  }
                }
            }

            if (match) {
                feature.properties._values = match.values;
                feature.properties._formatted = match.formattedValues;
                feature.properties._name = match.rawName;
                const centroid = this._getCentroid(feature.geometry);

                matchedFeatures.push({
                    feature: feature,
                    centroid: centroid,
                    values: match.values,
                    formattedValues: match.formattedValues,
                    name: match.rawName
                });
            }
        });
    }

    return { type: 'regions', data: matchedFeatures, geojson: geojson, measures };
  },

  _render: function(processed, config, queryResponse, details) {
    const layers = [];

    // Loop through Layer 1, 2, 3, 4
    for (let i = 1; i <= 4; i++) {
      if (config[`layer${i}_enabled`]) {
        const layer = this._buildSingleLayer(i, config, processed);
        if (layer) layers.push(layer);
      }
    }

    const getTooltip = ({object}) => {
      if (!object) return null;
      let name, values, formatted;
      if (object.properties && object.properties._name) {
        name = object.properties._name;
        values = object.properties._values;
        formatted = object.properties._formatted;
      } else if (object.name && object.values) {
        name = object.name;
        values = object.values;
        formatted = object.formattedValues;
      } else {
        return null;
      }

      let html = `<div style="font-weight:bold; border-bottom:1px solid #ccc; margin-bottom:5px;">${name}</div>`;
      queryResponse.fields.measure_like.forEach((m, idx) => {
        html += `<div style="display:flex; justify-content:space-between; gap:10px;">
          <span>${m.label_short || m.label}:</span>
          <span style="font-weight:bold;">${formatted[idx]}</span>
        </div>`;
      });
      return { html, style: { backgroundColor: '#fff', color: '#000', fontSize: '0.8em', padding: '8px', borderRadius: '4px' } };
    };

    // --- VIEW STATE LOGIC (CRASH FIX) ---
    // 1. Ensure config values are valid Numbers
    const cfgLat = Number(config.center_lat) || 46;
    const cfgLng = Number(config.center_lng) || 2;
    const cfgZoom = Number(config.zoom) || 4;
    const cfgPitch = Number(config.pitch) || 45;

    // 2. Initialize view state if null
    if (!this._viewState) {
      this._viewState = {
        longitude: cfgLng,
        latitude: cfgLat,
        zoom: cfgZoom,
        pitch: cfgPitch,
        bearing: 0
      };
    }
    // 3. Optional: Sync viewstate if config changes significantly?
    // For now, we respect the user's manual navigation.

    // 4. Update the stored view state when user interacts
    const onViewStateChange = ({viewState}) => {
      this._viewState = viewState;
      // Re-render to update the camera position
      this._deck.setProps({ viewState: this._viewState });
    };

    const isPrint = details && details.print;

    if (!this._deck) {
      // INITIAL RENDER
      this._deck = new deck.DeckGL({
        container: this._container,
        mapStyle: config.map_style,
        mapboxApiAccessToken: config.mapbox_token,
        viewState: this._viewState, // Controlled Mode
        onViewStateChange: onViewStateChange,
        controller: true,
        layers: layers,
        getTooltip: getTooltip,
        glOptions: { preserveDrawingBuffer: true }
      });
    } else {
      // UPDATE RENDER
      this._deck.setProps({
        layers: layers,
        mapStyle: config.map_style,
        mapboxApiAccessToken: config.mapbox_token,
        getTooltip: getTooltip,
        viewState: this._viewState, // Maintain current view
        onViewStateChange: onViewStateChange
      });
    }
  },

  _buildSingleLayer: function(idx, config, processed) {
    const type = config[`layer${idx}_type`];
    const measureIdx = config[`layer${idx}_measure_idx`] || 0;
    const color = this._hexToRgb(config[`layer${idx}_color`]);
    const radius = config[`layer${idx}_radius`];
    const heightScale = config[`layer${idx}_height`];
    const opacity = config[`layer${idx}_opacity`];
    const iconUrl = config[`layer${idx}_icon_url`];

    // SKIP EMPTY DATA LAYERS TO PREVENT CRASH
    if (!processed.data || processed.data.length === 0) return null;

    const getValue = (d) => {
      const arr = d.values || (d.properties && d.properties._values);
      return arr && arr[measureIdx] ? parseFloat(arr[measureIdx]) : 0;
    };

    let pointData = [];
    if (processed.type === 'regions') {
      pointData = processed.data.map(d => ({
        position: d.centroid,
        values: d.values,
        formattedValues: d.formattedValues,
        name: d.name
      }));
    } else {
      pointData = processed.data;
    }

    const id = `layer-${idx}`;

    switch (type) {
      case 'geojson':
        if (processed.type !== 'regions') return null;
        const allVals = processed.data.map(d => d.values[measureIdx] || 0);
        const maxVal = Math.max(...allVals, 0.1);

        return new deck.GeoJsonLayer({
          id: id,
          data: { type: "FeatureCollection", features: processed.data.map(d => d.feature) },
          pickable: true,
          stroked: true,
          filled: true,
          getLineWidth: 1,
          getLineColor: [255,255,255],
          opacity: opacity,
          getFillColor: d => {
            const val = getValue(d);
            const ratio = val / maxVal;
            return this._interpolateColor(config.color_range_start, config.color_range_end, ratio);
          },
          updateTriggers: {
            getFillColor: [measureIdx, config.color_range_start, config.color_range_end]
          }
        });

      case 'column':
        return new deck.ColumnLayer({
          id: id,
          data: pointData,
          diskResolution: 6,
          radius: radius,
          extruded: true,
          pickable: true,
          elevationScale: heightScale,
          getPosition: d => d.position,
          getFillColor: color,
          getLineColor: [255, 255, 255],
          getElevation: d => getValue(d),
          opacity: opacity
        });

      case 'point':
        return new deck.ScatterplotLayer({
          id: id,
          data: pointData,
          pickable: true,
          opacity: opacity,
          stroked: true,
          filled: true,
          radiusScale: 1,
          radiusMinPixels: 2,
          getPosition: d => d.position,
          getRadius: radius,
          getFillColor: color,
          getLineColor: [255,255,255]
        });

      case 'bubble':
        const bVals = pointData.map(d => getValue(d));
        const bMax = Math.max(...bVals, 1);
        return new deck.ScatterplotLayer({
          id: id,
          data: pointData,
          pickable: true,
          opacity: opacity,
          stroked: true,
          filled: true,
          radiusScale: 1,
          radiusMinPixels: 2,
          getPosition: d => d.position,
          getRadius: d => Math.sqrt(getValue(d) / bMax) * radius,
          getFillColor: color,
          getLineColor: [255,255,255]
        });

      case 'icon':
        if (!iconUrl || iconUrl.length < 5) return null;
        return new deck.IconLayer({
            id: id,
            data: pointData,
            pickable: true,
            opacity: opacity,
            iconAtlas: iconUrl,
            iconMapping: {
                marker: { x: 0, y: 0, width: 512, height: 512, mask: false }
            },
            getIcon: d => 'marker',
            getPosition: d => d.position,
            getSize: d => radius,
            sizeScale: 1,
            sizeMinPixels: 20,
            onIconError: (err) => console.warn("Icon error", err)
        });

      case 'heatmap':
        return new deck.HeatmapLayer({
          id: id,
          data: pointData,
          pickable: false,
          getPosition: d => d.position,
          getWeight: d => getValue(d),
          radiusPixels: radius / 500
        });

      case 'hexagon':
        return new deck.HexagonLayer({
          id: id,
          data: pointData,
          pickable: true,
          extruded: true,
          radius: radius,
          elevationScale: heightScale,
          getPosition: d => d.position,
          getElevationWeight: d => getValue(d)
        });

      default:
        return null;
    }
  },

  // --- UTILITIES ---

  _getGeoJSONUrl: function(config) {
    if (config.map_layer_source === 'custom') return config.custom_geojson_url;

    // CORS-COMPATIBLE SOURCES
    const URLS = {
        world_countries: 'https://unpkg.com/world-atlas@2/countries-110m.json',
        us_states: 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json',
        us_counties: 'https://cdn.jsdelivr.net/npm/us-atlas@3/counties-10m.json',
        france_regions: 'https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/regions.geojson',
        uk_regions: 'https://martinjc.github.io/UK-GeoJSON/json/eng/topo_eer.json',
        germany_states: 'https://raw.githubusercontent.com/isellsoap/deutschlandGeoJSON/main/2_bundeslaender/3_mittel.geo.json',
        spain_communities: 'https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/spain-communities.geojson',
    };

    const COMBOS = {
      combined_europe_major: [
        URLS.france_regions,
        URLS.germany_states,
        URLS.uk_regions,
        URLS.spain_communities,
        'https://raw.githubusercontent.com/openpolis/geojson-italy/master/geojson/limits_IT_regions.geojson'
      ]
    };

    if (COMBOS[config.map_layer_source]) return COMBOS[config.map_layer_source];
    return URLS[config.map_layer_source];
  },

  _loadGeoJSON: async function(urlOrList) {
    if (Array.isArray(urlOrList)) {
      const promises = urlOrList.map(u => this._loadSingleGeoJSON(u));
      const results = await Promise.all(promises);
      const features = [];
      results.forEach(r => { if(r && r.features) features.push(...r.features); });
      return { type: "FeatureCollection", features };
    }
    return this._loadSingleGeoJSON(urlOrList);
  },

  _loadSingleGeoJSON: async function(url) {
    if (!url) return { type: "FeatureCollection", features: [] };
    if (this._geojsonCache[url]) return this._geojsonCache[url];

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
    const data = await res.json();

    let geojson = data;
    if (data.type === 'Topology') {
      if (typeof topojson === 'undefined') throw new Error("TopoJSON lib missing");
      const key = Object.keys(data.objects)[0];
      geojson = topojson.feature(data, data.objects[key]);
    }

    this._geojsonCache[url] = geojson;
    return geojson;
  },

  _getCentroid: function(geometry) {
    if (!geometry) return [0,0];
    const coords = geometry.coordinates;
    if (geometry.type === 'Polygon') {
      return this._polyAvg(coords[0]);
    } else if (geometry.type === 'MultiPolygon') {
      return this._polyAvg(coords[0][0]);
    }
    return [0,0];
  },

  _polyAvg: function(ring) {
    let x=0, y=0;
    if(!ring.length) return [0,0];
    ring.forEach(p => {x+=p[0]; y+=p[1];});
    return [x/ring.length, y/ring.length];
  },

  _normalizeName: function(name) {
    if (!name) return "";
    return name.toString().toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  },

  _hexToRgb: function(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : [0,0,0];
  },

  _interpolateColor: function(c1, c2, factor) {
    const rgb1 = this._hexToRgb(c1);
    const rgb2 = this._hexToRgb(c2);
    const f = Math.min(Math.max(factor, 0), 1);
    return [
      Math.round(rgb1[0] + (rgb2[0] - rgb1[0]) * f),
      Math.round(rgb1[1] + (rgb2[1] - rgb1[1]) * f),
      Math.round(rgb1[2] + (rgb2[2] - rgb1[2]) * f)
    ];
  }
});

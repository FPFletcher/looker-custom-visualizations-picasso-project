/**
 * Multi-Layer 3D Map for Looker - v8 Ultimate (Crash Proof + UI Overhaul)
 * Features:
 * - "Plot" Tab consolidates all settings.
 * - Per-Layer Gradient vs Solid Color toggles.
 * - Unique Layer IDs to prevent Shader crashes.
 */

// --- HELPER: GENERATE LAYER OPTIONS (With Per-Layer Colors) ---
const getLayerOptions = (n) => {
  const defaults = [
    { type: 'geojson', color: '#2E7D32', radius: 1000, height: 1000 },
    { type: 'column', color: '#1565C0', radius: 20000, height: 2000 },
    { type: 'point', color: '#C62828', radius: 5000, height: 0 },
    { type: 'icon', color: '#F9A825', radius: 10000, height: 0 }
  ];
  const def = defaults[n-1];

  // Order base: Layer 1 = 100, Layer 2 = 200...
  const baseOrder = n * 100;

  return {
    [`layer${n}_divider`]: {
      type: "string",
      label: `────────── LAYER ${n} ──────────`,
      display: "divider",
      section: "Plot",
      order: baseOrder
    },
    [`layer${n}_enabled`]: {
      type: "boolean",
      label: `Enable Layer ${n}`,
      default: n <= 2,
      section: "Plot",
      order: baseOrder + 1
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
      section: "Plot",
      order: baseOrder + 2
    },
    [`layer${n}_measure_idx`]: {
      type: "number",
      label: `Measure Index (0, 1...)`,
      default: n-1,
      section: "Plot",
      order: baseOrder + 3
    },
    // --- COLOR SETTINGS PER LAYER ---
    [`layer${n}_use_gradient`]: {
      type: "boolean",
      label: "Use Color Gradient?",
      default: false,
      section: "Plot",
      order: baseOrder + 4
    },
    [`layer${n}_color`]: {
      type: "string",
      label: "Solid Color",
      display: "color",
      default: def.color,
      section: "Plot",
      order: baseOrder + 5
    },
    [`layer${n}_gradient_start`]: {
      type: "string",
      label: "Gradient Start",
      display: "color",
      default: "#E8F5E9",
      section: "Plot",
      order: baseOrder + 6
    },
    [`layer${n}_gradient_end`]: {
      type: "string",
      label: "Gradient End",
      display: "color",
      default: "#1B5E20",
      section: "Plot",
      order: baseOrder + 7
    },
    // --- SIZE SETTINGS ---
    [`layer${n}_radius`]: {
      type: "number",
      label: "Radius / Size",
      default: def.radius,
      section: "Plot",
      order: baseOrder + 8
    },
    [`layer${n}_height`]: {
      type: "number",
      label: "Height (3D)",
      default: def.height,
      section: "Plot",
      order: baseOrder + 9
    },
    [`layer${n}_opacity`]: {
      type: "number",
      label: "Opacity (0-1)",
      default: 0.7,
      min: 0, max: 1, step: 0.1,
      section: "Plot",
      order: baseOrder + 10
    },
    [`layer${n}_icon_url`]: {
      type: "string",
      label: "Icon URL (for Icon type)",
      default: "",
      placeholder: "https://...",
      section: "Plot",
      order: baseOrder + 11
    }
  };
};

looker.plugins.visualizations.add({
  id: "combo_map_ultimate_v8",
  label: "Combo Map 3D (Ultimate)",
  options: {
    // --- 1. REGION DATA SETTINGS (Top of Plot) ---
    region_header: { type: "string", label: "─── DATA & REGIONS ───", display: "divider", section: "Plot", order: 1 },

    data_mode: {
      type: "string",
      label: "Data Mode",
      display: "select",
      values: [
        {"Region Data (Names)" : "regions"},
        {"Point Data (Lat/Lng)": "points"}
      ],
      default: "regions",
      section: "Plot",
      order: 2
    },
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
      section: "Plot",
      order: 3
    },
    custom_geojson_url: {
      type: "string",
      label: "Custom GeoJSON URL",
      section: "Plot",
      placeholder: "https://...",
      order: 4
    },
    region_dim_name: {
      type: "string",
      label: "Region Dimension Name",
      section: "Plot",
      placeholder: "Auto-detect if empty",
      order: 5
    },

    // --- 2. BASE MAP SETTINGS ---
    map_header: { type: "string", label: "─── BASE MAP ───", display: "divider", section: "Plot", order: 10 },

    mapbox_token: {
      type: "string",
      label: "Mapbox Token",
      section: "Plot",
      placeholder: "pk.eyJ1...",
      order: 11
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
      section: "Plot",
      order: 12
    },
    center_lat: { type: "number", label: "Latitude", default: 46, section: "Plot", order: 13 },
    center_lng: { type: "number", label: "Longitude", default: 2, section: "Plot", order: 14 },
    zoom: { type: "number", label: "Zoom", default: 4, section: "Plot", order: 15 },
    pitch: { type: "number", label: "3D Tilt (0-60)", default: 45, section: "Plot", order: 16 },

    // --- 3. LAYERS (Generated) ---
    ...getLayerOptions(1),
    ...getLayerOptions(2),
    ...getLayerOptions(3),
    ...getLayerOptions(4),
  },

  create: function(element, config) {
    // 1. Force Load Mapbox CSS
    if (!document.getElementById('mapbox-css-fix')) {
      const link = document.createElement('link');
      link.id = 'mapbox-css-fix';
      link.rel = 'stylesheet';
      link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
      document.head.appendChild(link);
    }

    // 2. Container
    element.innerHTML = `
      <style>
        #map-wrapper { width: 100%; height: 100%; position: relative; overflow: hidden; background: #111; }
        #map { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
        .deck-tooltip { font-family: sans-serif; font-size: 12px; }
      </style>
      <div id="map-wrapper">
        <div id="map"></div>
      </div>`;
    this._container = element.querySelector('#map');
    this._geojsonCache = {};

    // 3. View State Init
    this._viewState = null;
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    this.clearErrors();

    if (typeof deck === 'undefined' || typeof mapboxgl === 'undefined') {
      this.addError({ title: "Missing Dependencies", message: "Add deck.gl and mapbox-gl to manifest." });
      done(); return;
    }
    if (!config.mapbox_token) {
      this.addError({ title: "Mapbox Token Required", message: "Enter token in Plot settings." });
      done(); return;
    }

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
        console.warn("GeoJSON Load Fail", error);
        geojson = { type: "FeatureCollection", features: [] };
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

    for (let i = 1; i <= 4; i++) {
      if (config[`layer${i}_enabled`]) {
        try {
          const layer = this._buildSingleLayer(i, config, processed);
          if (layer) layers.push(layer);
        } catch(e) {
          console.error(`Layer ${i} failed`, e);
        }
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

    const cfgLat = Number(config.center_lat) || 46;
    const cfgLng = Number(config.center_lng) || 2;
    const cfgZoom = Number(config.zoom) || 4;
    const cfgPitch = Number(config.pitch) || 45;

    if (!this._viewState) {
      this._viewState = {
        longitude: cfgLng,
        latitude: cfgLat,
        zoom: cfgZoom,
        pitch: cfgPitch,
        bearing: 0
      };
    }

    const onViewStateChange = ({viewState}) => {
      this._viewState = viewState;
      this._deck.setProps({ viewState: this._viewState });
    };

    if (!this._deck) {
      this._deck = new deck.DeckGL({
        container: this._container,
        mapStyle: config.map_style,
        mapboxApiAccessToken: config.mapbox_token,
        viewState: this._viewState,
        onViewStateChange: onViewStateChange,
        controller: true,
        layers: layers,
        getTooltip: getTooltip,
        glOptions: { preserveDrawingBuffer: true },
        onError: (err) => console.warn("DeckGL Error:", err)
      });
    } else {
      this._deck.setProps({
        layers: layers,
        mapStyle: config.map_style,
        mapboxApiAccessToken: config.mapbox_token,
        getTooltip: getTooltip,
        viewState: this._viewState,
        onViewStateChange: onViewStateChange
      });
    }
  },

  // --- Strict Data Validator ---
  _validateLayerData: function(data) {
    if(!data || !Array.isArray(data) || data.length === 0) return [];
    return data.filter(d =>
        d.position &&
        d.position.length === 2 &&
        !isNaN(d.position[0]) &&
        !isNaN(d.position[1]) &&
        d.position[1] >= -90 && d.position[1] <= 90
    );
  },

  _buildSingleLayer: function(idx, config, processed) {
    const type = config[`layer${idx}_type`];
    const measureIdx = config[`layer${idx}_measure_idx`] || 0;

    // COLOR LOGIC
    const useGradient = config[`layer${idx}_use_gradient`];
    const solidColor = this._hexToRgb(config[`layer${idx}_color`]);
    const gradStart = config[`layer${idx}_gradient_start`];
    const gradEnd = config[`layer${idx}_gradient_end`];

    const radius = config[`layer${idx}_radius`];
    const heightScale = config[`layer${idx}_height`];
    const opacity = config[`layer${idx}_opacity`];
    const iconUrl = config[`layer${idx}_icon_url`];

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

    const safePointData = this._validateLayerData(pointData);

    // CRASH FIX: Unique ID per type to prevent Shader corruption
    const id = `layer-${idx}-${type}`;

    // Helper for gradient calc
    const allVals = safePointData.map(d => getValue(d));
    const maxVal = Math.max(...allVals, 0.1);

    const getMyColor = (d) => {
        if (!useGradient) return solidColor;
        const val = getValue(d);
        const ratio = val / maxVal;
        return this._interpolateColor(gradStart, gradEnd, ratio);
    };

    switch (type) {
      case 'geojson':
        if (processed.type !== 'regions') return null;
        if (!processed.data || processed.data.length === 0) return null;

        // Recalc max for GeoJSON specifically
        const geoVals = processed.data.map(d => d.values[measureIdx] || 0);
        const geoMax = Math.max(...geoVals, 0.1);

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
             if (!useGradient) return solidColor;
             const val = getValue(d);
             return this._interpolateColor(gradStart, gradEnd, val / geoMax);
          },
          updateTriggers: {
            getFillColor: [measureIdx, useGradient, solidColor, gradStart, gradEnd]
          }
        });

      case 'column':
        if (safePointData.length === 0) return null;
        return new deck.ColumnLayer({
          id: id,
          data: safePointData,
          diskResolution: 6,
          radius: radius,
          extruded: true,
          pickable: true,
          elevationScale: heightScale,
          getPosition: d => d.position,
          getFillColor: d => getMyColor(d),
          getLineColor: [255, 255, 255],
          getElevation: d => getValue(d),
          opacity: opacity,
          updateTriggers: {
            getFillColor: [measureIdx, useGradient, solidColor, gradStart, gradEnd]
          }
        });

      case 'point':
        if (safePointData.length === 0) return null;
        return new deck.ScatterplotLayer({
          id: id,
          data: safePointData,
          pickable: true,
          opacity: opacity,
          stroked: true,
          filled: true,
          radiusScale: 1,
          radiusMinPixels: 2,
          getPosition: d => d.position,
          getRadius: radius,
          getFillColor: d => getMyColor(d),
          getLineColor: [255,255,255],
          updateTriggers: {
            getFillColor: [measureIdx, useGradient, solidColor, gradStart, gradEnd]
          }
        });

      case 'bubble':
        if (safePointData.length === 0) return null;
        return new deck.ScatterplotLayer({
          id: id, // Different ID from 'point' type
          data: safePointData,
          pickable: true,
          opacity: opacity,
          stroked: true,
          filled: true,
          radiusScale: 1,
          radiusMinPixels: 2,
          getPosition: d => d.position,
          getRadius: d => Math.sqrt(getValue(d) / maxVal) * radius,
          getFillColor: d => getMyColor(d),
          getLineColor: [255,255,255],
          updateTriggers: {
            getFillColor: [measureIdx, useGradient, solidColor, gradStart, gradEnd]
          }
        });

      case 'icon':
        if (safePointData.length === 0) return null;
        if (!iconUrl || iconUrl.length < 5) return null;
        return new deck.IconLayer({
            id: id,
            data: safePointData,
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
            autoHighlight: false,
            onIconError: (err) => console.warn("Icon error", err)
        });

      case 'heatmap':
        if (safePointData.length === 0) return null;
        return new deck.HeatmapLayer({
          id: id,
          data: safePointData,
          pickable: false,
          getPosition: d => d.position,
          getWeight: d => getValue(d),
          radiusPixels: radius / 500
        });

      case 'hexagon':
        if (safePointData.length === 0) return null;
        return new deck.HexagonLayer({
          id: id,
          data: safePointData,
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

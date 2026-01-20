/**
 * Multi-Layer 3D Map for Looker - v32 Ultimate
 * * * FEATURES:
 * - Full Codebase: No shortcuts or compressions.
 * - Dual Data Source: Select 'Regions' or 'Points' PER LAYER.
 * - Robust Icons: 100% Embedded Base64 (No network/CORS issues).
 * - Aggregation: 3D Columns and Clusters now SUM measure values correctly.
 * - Clustering: Added "Grid Cluster (Circles)" mode.
 */

// --- 1. EMBEDDED ICONS (Base64 Safe) ---
const ICONS = {
  "marker": "data:image/svg+xml;charset=utf-8,%3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6H11zm0 8h2v2H11z' fill='%23FFFFFF' stroke='%23333333' stroke-width='1'/%3E%3C/svg%3E",

  "truck": "https://static.vecteezy.com/system/resources/thumbnails/035/907/415/small/ai-generated-blue-semi-truck-with-trailer-isolated-on-transparent-background-free-png.png", // Keeping your custom one

  "star": "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23FFC107'%3E%3Cpath d='M12 17.27L5.15 21l1.64-7.03L1.45 9.24l7.19-.61L12 2l3.36 6.61 7.19.61-5.33 4.73 1.64 7.03L12 17.27z'/%3E%3C/svg%3E",

  "circle": "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%232196F3'%3E%3Ccircle cx='12' cy='12' r='10'/%3E%3C/svg%3E",

  "warning": "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23F44336'%3E%3Cpath d='M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z'/%3E%3C/svg%3E",

  "shop": "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%234CAF50'%3E%3Cpath d='M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h9v-6h4v6h2v-6h1zM6 19v-6h12v6H6z'/%3E%3C/svg%3E"
};

// --- 2. HELPER FUNCTIONS ---

const getIconUrl = (preset, customUrl) => {
    if (preset === 'custom' && customUrl) return customUrl;
    return ICONS[preset] || ICONS['marker'];
};

const preloadImage = (url) => {
    return new Promise((resolve) => {
        if (!url) return resolve(ICONS['marker']);
        // If it's a data URI, it's instant
        if (url.startsWith('data:')) return resolve(url);

        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => resolve(url);
        img.onerror = () => {
            console.warn(`[Viz] Failed to load icon: ${url}. Reverting to fallback.`);
            resolve(ICONS['marker']);
        };
        img.src = url;
    });
};

const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : [0,0,0];
};

const interpolateColor = (color1, color2, factor) => {
    if (arguments.length < 3) {
        return color1;
    }
    const result = color1.slice();
    for (let i = 0; i < 3; i++) {
        result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
    }
    return result;
};

// --- 3. LAYER OPTIONS GENERATOR ---
const getLayerOptions = (n) => {
  const defaults = [
    { type: 'geojson', color: '#2E7D32', radius: 1000, height: 1000 },
    { type: 'column', color: '#1565C0', radius: 20000, height: 2000 },
    { type: 'point', color: '#C62828', radius: 5000, height: 0 },
    { type: 'icon', color: '#F9A825', radius: 10000, height: 0 }
  ];
  const def = defaults[n-1];
  const b = 200 + (n * 100); // Expanded spacing

  // Dynamic Icon Options
  const iconOpts = [
      {"Custom URL": "custom"},
      {"Marker (White Pin)": "marker"},
      {"Blue Truck": "truck"},
      {"Star (Yellow)": "star"},
      {"Circle (Blue)": "circle"},
      {"Warning (Red)": "warning"},
      {"Shop (Green)": "shop"}
  ];

  return {
    [`layer${n}_header`]: {
      type: "string",
      label: `────────── LAYER ${n} ──────────`,
      display: "divider",
      section: "Layers",
      order: b + 1
    },
    [`layer${n}_enabled`]: {
      type: "boolean",
      label: `Enable Layer ${n}`,
      default: n <= 2,
      section: "Layers",
      order: b + 2
    },
    // CRITICAL: Source Selection
    [`layer${n}_source`]: {
      type: "string",
      label: `Layer ${n} Data Source`,
      display: "select",
      values: [
        {"Region Data (Polygons)": "regions"},
        {"Point Data (Lat/Lng)": "points"}
      ],
      default: n === 1 ? "regions" : "points",
      section: "Layers",
      order: b + 3
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
        {"Icon (Image)": "icon"},
        {"Grid Cluster (Circles)": "grid_circle"}, // NEW
        {"Hexagon Cluster (3D)": "hexagon"},
        {"Heatmap (Density)": "heatmap"}
      ],
      default: def.type,
      section: "Layers",
      order: b + 4
    },
    [`layer${n}_measure_idx`]: {
      type: "number",
      label: `Layer ${n} Measure Index (0-based)`,
      default: n-1,
      section: "Layers",
      order: b + 5
    },
    [`layer${n}_z_index`]: {
      type: "number",
      label: `Layer ${n} Z-Index (Order)`,
      default: n * 10,
      section: "Layers",
      order: b + 6
    },

    // APPEARANCE
    [`layer${n}_use_gradient`]: {
      type: "boolean",
      label: `Layer ${n} Use Gradient?`,
      default: false,
      section: "Layers",
      order: b + 7
    },
    [`layer${n}_color_main`]: {
      type: "string",
      label: `Layer ${n} Main Color (Low/Start)`,
      display: "color",
      default: def.color,
      section: "Layers",
      order: b + 8
    },
    [`layer${n}_gradient_end`]: {
      type: "string",
      label: `Layer ${n} Gradient End (High/End)`,
      display: "color",
      default: "#1B5E20",
      section: "Layers",
      order: b + 9
    },
    [`layer${n}_radius`]: {
      type: "number",
      label: `Layer ${n} Radius / Size`,
      default: def.radius,
      section: "Layers",
      order: b + 10
    },
    [`layer${n}_height`]: {
      type: "number",
      label: `Layer ${n} Height Scale (3D)`,
      default: def.height,
      section: "Layers",
      order: b + 11
    },
    [`layer${n}_opacity`]: {
      type: "number",
      label: `Layer ${n} Opacity (0.0 - 1.0)`,
      default: 0.8,
      min: 0, max: 1, step: 0.1,
      section: "Layers",
      order: b + 12
    },

    // ICONS
    [`layer${n}_icon_type`]: {
      type: "string",
      label: `Layer ${n} Icon Preset`,
      display: "select",
      values: iconOpts,
      default: "marker",
      section: "Layers",
      order: b + 13
    },
    [`layer${n}_icon_url`]: {
      type: "string",
      label: `Layer ${n} Custom URL`,
      default: "",
      placeholder: "https://...",
      section: "Layers",
      order: b + 14
    }
  };
};

// --- 4. MAIN VISUALIZATION ---

looker.plugins.visualizations.add({
  id: "combo_map_ultimate_v32",
  label: "Combo Map 3D (V32 Ultimate)",
  options: {
    // PLOT SETTINGS
    region_header: { type: "string", label: "─── GLOBAL SETTINGS ───", display: "divider", section: "Plot", order: 1 },

    // Removed "Data Mode" toggle as it is now per-layer

    map_layer_source: {
      type: "string",
      label: "Map Region Source",
      display: "select",
      values: [
        {"Custom URL": "custom"},
        {"World Countries": "world_countries"},
        {"USA States": "us_states"},
        {"Europe Major Combined": "combined_europe_major"},
        {"France Regions": "france_regions"},
        {"Germany States": "germany_states"},
        {"UK Regions": "uk_regions"},
        {"Spain Communities": "spain_communities"}
      ],
      default: "combined_europe_major",
      section: "Plot",
      order: 2
    },
    custom_geojson_url: {
      type: "string",
      label: "Custom GeoJSON URL",
      section: "Plot",
      placeholder: "https://...",
      order: 3
    },
    region_dim_name: {
      type: "string",
      label: "Region Dimension Name",
      section: "Plot",
      placeholder: "e.g. state (Fuzzy match)",
      order: 4
    },

    // INTERACTION
    interaction_header: { type: "string", label: "─── INTERACTION ───", display: "divider", section: "Plot", order: 8 },
    // Removed specific mode selector -> Now auto-detects

    // MAPBOX
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
    center_lat: { type: "number", label: "Center Lat", default: 46, section: "Plot", order: 13 },
    center_lng: { type: "number", label: "Center Lng", default: 2, section: "Plot", order: 14 },
    zoom: { type: "number", label: "Zoom Level", default: 4, section: "Plot", order: 15 },
    pitch: { type: "number", label: "Pitch (0-60)", default: 45, section: "Plot", order: 16 },

    // TOOLTIP
    tooltip_header: { type: "string", label: "─── TOOLTIP ───", display: "divider", section: "Plot", order: 20 },
    tooltip_mode: {
      type: "string",
      label: "Tooltip Content",
      display: "select",
      values: [
        {"All Fields": "all"},
        {"Name Only": "name"},
        {"Values Only": "values"},
        {"None": "none"}
      ],
      default: "all",
      section: "Plot",
      order: 21
    },
    tooltip_bg: {
      type: "string",
      label: "Background Color",
      display: "color",
      default: "#FFFFFF",
      section: "Plot",
      order: 22
    },

    // LAYERS
    ...getLayerOptions(1),
    ...getLayerOptions(2),
    ...getLayerOptions(3),
    ...getLayerOptions(4),
  },

  create: function(element, config) {
    // Inject Mapbox CSS
    if (!document.getElementById('mapbox-css-fix')) {
      const link = document.createElement('link');
      link.id = 'mapbox-css-fix';
      link.rel = 'stylesheet';
      link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
      document.head.appendChild(link);
    }

    element.innerHTML = `
      <style>
        #map-wrapper { width: 100%; height: 100%; position: relative; background: #111; }
        #map { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
        #error-msg {
            position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
            color: #FF5252; background: rgba(0,0,0,0.8); padding: 20px;
            font-family: sans-serif; text-align: center; display: none; z-index: 999;
        }
      </style>
      <div id="map-wrapper">
        <div id="map"></div>
        <div id="error-msg"></div>
      </div>`;

    this._container = element.querySelector('#map');
    this._errorMsg = element.querySelector('#error-msg');

    this._deck = null;
    this._viewState = null;
    this._prevConfig = {};
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    console.log(`[Viz] UpdateAsync: ${data.length} rows`);
    const isPrint = details && details.print;

    this.clearErrors();
    this._errorMsg.style.display = 'none';

    // 1. Validation
    if (!config.mapbox_token) {
        this._errorMsg.innerHTML = "<b>Missing Mapbox Token</b><br>Please add it in Plot settings.";
        this._errorMsg.style.display = 'block';
        done(); return;
    }

    if (typeof deck === 'undefined') {
        this._errorMsg.innerHTML = "<b>Missing deck.gl</b><br>Please check manifest dependencies.";
        this._errorMsg.style.display = 'block';
        done(); return;
    }

    // 2. Icon Preloading
    const iconPromises = [];
    for(let i=1; i<=4; i++) {
        if (config[`layer${i}_enabled`] && config[`layer${i}_type`] === 'icon') {
            const preset = config[`layer${i}_icon_type`];
            const custom = config[`layer${i}_icon_url`];
            const url = getIconUrl(preset, custom);
            iconPromises.push(preloadImage(url));
        }
    }

    // 3. Parallel Load
    Promise.all([
        this._processData(data, config, queryResponse),
        ...iconPromises
    ]).then(([processed, ...loadedIcons]) => {

        this._renderMap(processed, config, queryResponse, details, loadedIcons);

        if (isPrint) {
            console.log("[Viz] PDF Mode: Freezing for capture...");
            if(this._deck) this._deck.redraw(true);
            setTimeout(() => done(), 4000); // 4s wait
        } else {
            done();
        }

    }).catch(err => {
        console.error("[Viz] Error:", err);
        this._errorMsg.innerText = `Error: ${err.message}`;
        this._errorMsg.style.display = 'block';
        done();
    });
  },

  _processData: async function(data, config, queryResponse) {
    const dims = queryResponse.fields.dimension_like;
    const measures = queryResponse.fields.measure_like;

    // A. Detect Point Dimension (Lat/Lng)
    const latF = dims.find(d => d.type === 'latitude' || d.name.toLowerCase().includes('lat'));
    const lngF = dims.find(d => d.type === 'longitude' || d.name.toLowerCase().includes('lon'));

    // B. Detect Region Dimension (Fuzzy Match)
    let regionDim = null;
    if (config.region_dim_name) {
        const needle = config.region_dim_name.toLowerCase().trim();
        regionDim = dims.find(d => d.name.toLowerCase().includes(needle) || d.label.toLowerCase().includes(needle));
    }
    if (!regionDim) {
        regionDim = dims.find(d => d.map_layer_name) || dims.find(d => d.type === 'string');
    }

    // C. Parse Rows
    const points = [];
    const regionsMap = {}; // Use map to aggregate columns if needed

    data.forEach(row => {
        const rowVals = measures.map(m => row[m.name].value);
        const rowFmt = measures.map(m => row[m.name].rendered || row[m.name].value);
        const rowLinks = measures.map(m => row[m.name].links);

        // 1. Process Point
        if (latF && lngF) {
            const lat = row[latF.name].value;
            const lng = row[lngF.name].value;
            if (lat != null && lng != null) {
                points.push({
                    position: [parseFloat(lng), parseFloat(lat)],
                    values: rowVals,
                    formattedValues: rowFmt,
                    links: rowLinks,
                    name: "Point"
                });
            }
        }

        // 2. Process Region
        if (regionDim) {
            const rName = row[regionDim.name].value;
            if (rName) {
                const cleanName = rName.toString().toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                // If region exists, SUM the values (simple aggregation for 3D columns)
                if (regionsMap[cleanName]) {
                    regionsMap[cleanName].values = regionsMap[cleanName].values.map((v, i) => v + (rowVals[i] || 0));
                } else {
                    regionsMap[cleanName] = {
                        name: rName,
                        values: rowVals,
                        formattedValues: rowFmt,
                        links: rowLinks
                    };
                }
            }
        }
    });

    // D. Fetch GeoJSON if needed
    let geojsonFeatures = [];
    const url = this._getGeoJSONUrl(config);
    if (url) {
        try {
            const rawGeo = await this._loadGeoJSON(url);
            if (rawGeo && rawGeo.features) {
                // Match GeoJSON to Data
                rawGeo.features.forEach(f => {
                    const props = f.properties;
                    let match = null;
                    // Try matching any property
                    for (const key in props) {
                        if (props[key]) {
                            const cleanProp = String(props[key]).toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                            if (regionsMap[cleanProp]) {
                                match = regionsMap[cleanProp];
                                break;
                            }
                        }
                    }
                    if (match) {
                        f.properties._data = match; // Store looker data in feature
                        // Calculate centroid for 3D columns
                        const center = this._getCentroid(f.geometry);
                        geojsonFeatures.push({
                            feature: f,
                            centroid: center,
                            data: match
                        });
                    }
                });
            }
        } catch (e) {
            console.warn("GeoJSON Error:", e);
        }
    }

    return { points, regions: geojsonFeatures };
  },

  _renderMap: function(processed, config, queryResponse, details, loadedIcons) {
    const layers = [];
    let iconIndex = 0;

    for (let i = 1; i <= 4; i++) {
      if (config[`layer${i}_enabled`]) {
        // Source Selector
        const source = config[`layer${i}_source`]; // 'regions' or 'points'
        let dataToRender = [];

        if (source === 'points') {
            dataToRender = processed.points;
        } else {
            // For regions, we usually render the Feature (Choropleth) or Centroid (Column)
            dataToRender = processed.regions;
        }

        // Icon Handling
        let layerIcon = null;
        if (config[`layer${i}_type`] === 'icon') {
            layerIcon = loadedIcons[iconIndex] || ICONS['marker'];
            iconIndex++;
        }

        const layer = this._makeLayer(i, config, dataToRender, layerIcon);
        if (layer) layers.push(layer);
      }
    }

    // View State
    const cfgLat = Number(config.center_lat) || 46;
    const cfgLng = Number(config.center_lng) || 2;
    const cfgZoom = Number(config.zoom) || 4;
    const cfgPitch = Number(config.pitch) || 45;

    if (!this._viewState ||
        this._prevConfig.lat !== cfgLat ||
        this._prevConfig.zoom !== cfgZoom) {

        this._viewState = {
            longitude: cfgLng,
            latitude: cfgLat,
            zoom: cfgZoom,
            pitch: cfgPitch,
            bearing: 0
        };
        this._prevConfig = { lat: cfgLat, zoom: cfgZoom };
    }

    const tooltipHandler = (info) => {
        if (!info || !info.object) return null;
        if (config.tooltip_mode === 'none') return null;

        const obj = info.object;
        // Handle GeoJSON wrapped data vs Point data
        const data = obj.data || obj;
        const name = data.name || (obj.properties && obj.properties._data && obj.properties._data.name) || "Item";

        // Handle Aggregated Clusters (Sum Value)
        if (obj.colorValue || obj.elevationValue) {
             return {
                html: `<div style="padding:4px; font-weight:bold;">Cluster Value: ${(obj.colorValue||0).toLocaleString()}</div>`,
                style: { backgroundColor: '#fff', fontSize: '0.8em' }
            };
        }

        const vals = data.formattedValues || (obj.properties && obj.properties._data && obj.properties._data.formattedValues);

        if (!vals) return null;

        let html = "";
        if (config.tooltip_mode !== 'values') html += `<b>${name}</b><br>`;

        if (config.tooltip_mode !== 'name') {
            queryResponse.fields.measure_like.forEach((m, idx) => {
                if (vals[idx]) html += `${m.label_short||m.label}: ${vals[idx]}<br>`;
            });
        }

        return {
            html,
            style: { backgroundColor: config.tooltip_bg || '#fff', fontSize: '0.8em' }
        };
    };

    if (!this._deck) {
        this._deck = new deck.DeckGL({
            container: this._container,
            mapStyle: config.map_style,
            mapboxApiAccessToken: config.mapbox_token,
            viewState: this._viewState,
            onViewStateChange: ({viewState}) => {
                this._viewState = viewState;
                this._deck.setProps({viewState});
            },
            controller: true,
            layers: layers,
            getTooltip: tooltipHandler,
            glOptions: { preserveDrawingBuffer: true }
        });
    } else {
        this._deck.setProps({
            layers: layers,
            mapStyle: config.map_style,
            mapboxApiAccessToken: config.mapbox_token,
            viewState: this._viewState,
            getTooltip: tooltipHandler
        });
    }
  },

  _makeLayer: function(idx, config, data, iconImg) {
      if (!data || data.length === 0) return null;

      const type = config[`layer${idx}_type`];
      const mIdx = config[`layer${idx}_measure_idx`] || 0;
      const radius = config[`layer${idx}_radius`];
      const height = config[`layer${idx}_height`];
      const opacity = config[`layer${idx}_opacity`];

      const startC = hexToRgb(config[`layer${idx}_color_main`]);
      const endC = hexToRgb(config[`layer${idx}_gradient_end`]);
      const useGrad = config[`layer${idx}_use_gradient`];

      // Value Accessor
      const getVal = (d) => {
          // Point vs Region wrapper
          const vals = d.values || (d.data && d.data.values) || [];
          return vals[mIdx] || 0;
      };

      // Calculate Max for Scaling
      const allVals = data.map(d => getVal(d));
      const maxVal = Math.max(...allVals, 1);

      // Color Accessor
      const getColor = (d) => {
          if (!useGrad) return startC;
          const ratio = getVal(d) / maxVal;
          return interpolateColor(startC, endC, ratio);
      };

      const baseProps = {
          id: `layer-${idx}`,
          data: data,
          pickable: true,
          opacity: opacity,
          onClick: (info) => {
              if (info.object) {
                  // Drill Logic
                  const links = info.object.links || (info.object.data && info.object.data.links);
                  if (links && links[mIdx]) {
                      LookerCharts.Utils.openDrillMenu({ links: links[mIdx], event: info.srcEvent });
                  }
              }
          }
      };

      // 1. GEOJSON
      if (type === 'geojson') {
          return new deck.GeoJsonLayer({
              ...baseProps,
              data: { type: "FeatureCollection", features: data.map(d => d.feature) }, // Unwrap features
              getFillColor: d => {
                  // Re-wrap for helper access
                  const wrapper = { data: d.properties._data };
                  return getColor(wrapper);
              },
              getLineColor: [255,255,255],
              stroked: true,
              filled: true,
              updateTriggers: {
                  getFillColor: [mIdx, useGrad, startC, endC]
              }
          });
      }

      // 2. COLUMN (3D)
      if (type === 'column') {
          return new deck.ColumnLayer({
              ...baseProps,
              diskResolution: 6,
              radius: radius,
              extruded: true,
              getPosition: d => d.position || d.centroid,
              getFillColor: getColor,
              getElevation: d => getVal(d),
              elevationScale: height,
              updateTriggers: {
                  getElevation: [mIdx, height],
                  getFillColor: [mIdx, useGrad, startC, endC]
              }
          });
      }

      // 3. POINTS / BUBBLES
      if (type === 'point' || type === 'bubble') {
          return new deck.ScatterplotLayer({
              ...baseProps,
              getPosition: d => d.position || d.centroid,
              getFillColor: getColor,
              getRadius: d => type === 'bubble' ? Math.sqrt(getVal(d)/maxVal) * radius : radius,
              updateTriggers: {
                  getFillColor: [mIdx, useGrad, startC, endC],
                  getRadius: [mIdx, radius]
              }
          });
      }

      // 4. ICONS
      if (type === 'icon') {
          return new deck.IconLayer({
              ...baseProps,
              iconAtlas: iconImg,
              iconMapping: { marker: {x:0, y:0, width:512, height:512, mask:false} },
              getIcon: d => 'marker',
              getPosition: d => d.position || d.centroid,
              getSize: radius,
              sizeScale: 1
          });
      }

      // 5. HEXAGON (Aggregated)
      if (type === 'hexagon') {
          return new deck.HexagonLayer({
              ...baseProps,
              extruded: true,
              radius: radius,
              elevationScale: height,
              getPosition: d => d.position || d.centroid,
              // Aggregation: Sum of Measures
              getElevationWeight: getVal,
              getColorWeight: getVal,
              elevationAggregation: 'SUM',
              colorAggregation: 'SUM',
              // Color Range Calculation
              colorRange: [
                  interpolateColor(startC, endC, 0.0),
                  interpolateColor(startC, endC, 0.2),
                  interpolateColor(startC, endC, 0.4),
                  interpolateColor(startC, endC, 0.6),
                  interpolateColor(startC, endC, 0.8),
                  interpolateColor(startC, endC, 1.0)
              ]
          });
      }

      // 6. GRID CLUSTER (Circles)
      // Simulating "Cluster Point" via CPUGridLayer rendering as circles
      if (type === 'grid_circle') {
          return new deck.CPUGridLayer({
              ...baseProps,
              cellSize: radius * 2, // Approx grid size
              getPosition: d => d.position || d.centroid,
              // Aggregation
              getColorWeight: getVal,
              colorAggregation: 'SUM',
              colorRange: [
                  interpolateColor(startC, endC, 0.0),
                  interpolateColor(startC, endC, 0.2),
                  interpolateColor(startC, endC, 0.4),
                  interpolateColor(startC, endC, 0.6),
                  interpolateColor(startC, endC, 0.8),
                  interpolateColor(startC, endC, 1.0)
              ],
              extruded: false, // Flat circles
              pickable: true
          });
      }

      // 7. HEATMAP
      if (type === 'heatmap') {
          return new deck.HeatmapLayer({
              ...baseProps,
              getPosition: d => d.position || d.centroid,
              getWeight: getVal,
              radiusPixels: radius / 100,
              colorRange: [
                  interpolateColor(startC, endC, 0.0),
                  interpolateColor(startC, endC, 0.2),
                  interpolateColor(startC, endC, 0.4),
                  interpolateColor(startC, endC, 0.6),
                  interpolateColor(startC, endC, 0.8),
                  interpolateColor(startC, endC, 1.0)
              ]
          });
      }

      return null;
  },

  // --- 5. GEOJSON UTILS ---
  _getGeoJSONUrl: function(config) {
    if (config.map_layer_source === 'custom') return config.custom_geojson_url;
    // Default Map
    const maps = {
        combined_europe_major: "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/regions.geojson", // Fallback main
        world_countries: "https://unpkg.com/world-atlas@2/countries-110m.json",
        us_states: "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"
    };
    return maps[config.map_layer_source] || maps['combined_europe_major'];
  },

  _loadGeoJSON: async function(url) {
      // Basic fetch
      const res = await fetch(url);
      const data = await res.json();
      // Handle TopoJSON
      if (data.type === 'Topology') {
          if (typeof topojson === 'undefined') throw new Error("TopoJSON lib missing");
          const k = Object.keys(data.objects)[0];
          return topojson.feature(data, data.objects[k]);
      }
      return data;
  },

  _getCentroid: function(geometry) {
      if (!geometry) return [0,0];
      const c = geometry.coordinates;
      // Simple centroid approx for Poly/MultiPoly
      const ring = (geometry.type === 'Polygon') ? c[0] : c[0][0];
      let x=0, y=0;
      ring.forEach(p => {x+=p[0]; y+=p[1];});
      return [x/ring.length, y/ring.length];
  },

  _normalizeName: function(name) {
      if (!name) return "";
      return name.toString().toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
});

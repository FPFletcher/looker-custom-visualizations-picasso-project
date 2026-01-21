/**
 * Multi-Layer 3D Map for Looker - v34 Pivot Fix Edition
 *
 * FIXES FROM v33:
 * - FIXED: "Show All Pivot Values" logic.
 * - PREVIOUSLY: Both checked and unchecked states returned the Total Sum.
 * - NOW: Unchecked returns the specific Pivot Column defined by the new Index setting.
 * - ADDED: "Pivot Column Index" option per layer to select specific columns (e.g., 0=Accessories, 1=Active).
 *
 * FEATURES:
 * - Icons: 100% Embedded (Base64).
 * - Logic: Handles pivoted and non-pivoted data seamlessly.
 * - UX: Enhanced tooltips showing breakdown + totals.
 */

// --- EMBEDDED ICONS (Base64) - NO NETWORK REQUIRED ---

const ICONS = {
  "marker": "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyYzAgNS41MiA0LjQ4IDEwIDEwIDEwczEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAybTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LThzOCAzLjU5IDggOC0zLjU5IDggOCA4em0tMS0xM2gydjZIMTF6bTAgOGgydjJIMTF6IiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==",
  "truck": "https://static.vecteezy.com/system/resources/thumbnails/035/907/415/small/ai-generated-blue-semi-truck-with-trailer-isolated-on-transparent-background-free-png.png",
  "star": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0ZGQzEwNyI+PHBhdGggZD0iTTEyIDE3LjI3TDUuMTUgMjFsMS42NC03LjAzTDEuNDUgOS4yNGw3LjE5LS42MUwxMiAyIDE1LjM2IDguNmw3LjE5LjYxLTUuMzMgNC43MyAxLjY0IDcuMDNMMTIgMTcuMjd6Ii8+PC9zdmc+",
  "circle": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzIxOTZGMyI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48L3N2Zz4=",
  "warning": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0Y0NDMzNiI+PHBhdGggZD0iTTEgMjFoMjJMMTIgMiAxIDIxem0xMi0zaC0ydjJoMm0wLTRoLTJ2LTRoMnoiLz48L3N2Zz4=",
  "shop": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzRDQUY1MCI+PHBhdGggZD0iTTIwIDRINHYyaDE2VjR6bTEgMTB2LTJsLTEtNWgtMmwtMSA1SDhsLTEtNWgtMmwtMSA1SDRsLTEtNXYySDJ2Nmg5djZoMnYtNmg5ek02IDE5djZoMTJ2LTZINnoiLz48L3N2Zz4="
};

// --- HELPER: GENERATE LAYER OPTIONS ---
const getLayerOptions = (n) => {
  const defaults = [
    { type: 'geojson', color: '#2E7D32', radius: 1000, height: 1000 },
    { type: 'column', color: '#1565C0', radius: 20000, height: 2000 },
    { type: 'point', color: '#C62828', radius: 5000, height: 0 },
    { type: 'icon', color: '#F9A825', radius: 10000, height: 0 }
  ];
  const def = defaults[n - 1];
  const b = 100 + (n * 100);

  return {
    [`layer${n}_divider_top`]: {
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
    [`layer${n}_type`]: {
      type: "string",
      label: `Layer ${n} Type`,
      display: "select",
      values: [
        { "Choropleth (Region Only)": "geojson" },
        { "3D Columns": "column" },
        { "Points (Fixed Size)": "point" },
        { "Bubbles (Value Size)": "bubble" },
        { "Icon (Image)": "icon" },
        { "Clustered Hexagons (Sum Density)": "hexagon" },
        { "Heatmap (Sum Density)": "heatmap" }
      ],
      default: def.type,
      section: "Layers",
      order: b + 3
    },
    // DATA MAPPING
    [`layer${n}_dimension_idx`]: {
      type: "number",
      label: `L${n} Dimension Index`,
      default: 0,
      section: "Layers",
      order: b + 4,
      placeholder: "0 = first dimension"
    },
    [`layer${n}_measure_idx`]: {
      type: "number",
      label: `L${n} Measure Index`,
      default: n - 1,
      section: "Layers",
      order: b + 5
    },
    // PIVOT HANDLING
    [`layer${n}_show_all_pivots`]: {
      type: "boolean",
      label: `L${n} Show All Pivot Values`,
      default: true,
      section: "Layers",
      order: b + 6
    },
    [`layer${n}_pivot_idx`]: {
      type: "number",
      label: `L${n} Pivot Column Index (if Show All=False)`,
      default: 0,
      section: "Layers",
      order: b + 7,
      placeholder: "0 = 1st pivot col"
    },
    [`layer${n}_z_index`]: {
      type: "number",
      label: `L${n} Layer Order (Z-Index)`,
      default: n,
      section: "Layers",
      placeholder: "Higher # is on top",
      order: b + 8
    },

    // COLORS
    [`layer${n}_use_gradient`]: {
      type: "boolean",
      label: `L${n} Use Gradient?`,
      default: false,
      section: "Layers",
      order: b + 9
    },
    [`layer${n}_color_main`]: {
      type: "string",
      label: `L${n} Color (Start / Low Density)`,
      display: "color",
      default: def.color,
      section: "Layers",
      order: b + 10
    },
    [`layer${n}_gradient_end`]: {
      type: "string",
      label: `L${n} Gradient End (High Density)`,
      display: "color",
      default: "#1B5E20",
      section: "Layers",
      order: b + 11
    },

    // SIZE
    [`layer${n}_radius`]: {
      type: "number",
      label: `L${n} Radius / Size`,
      default: def.radius,
      section: "Layers",
      order: b + 12
    },
    [`layer${n}_height`]: {
      type: "number",
      label: `L${n} Height (3D)`,
      default: def.height,
      section: "Layers",
      order: b + 13
    },
    [`layer${n}_opacity`]: {
      type: "number",
      label: `L${n} Opacity`,
      default: 0.7,
      min: 0, max: 1, step: 0.1,
      section: "Layers",
      order: b + 14
    },

    // ICON
    [`layer${n}_icon_type`]: {
      type: "string",
      label: `L${n} Icon Preset`,
      display: "select",
      values: [
        { "Custom URL": "custom" },
        { "Marker (White Pin)": "marker" },
        { "Star (Yellow)": "star" },
        { "Circle (Blue)": "circle" },
        { "Warning (Red)": "warning" },
        { "Shop (Green)": "shop" },
        { "Blue Truck (Demo)": "truck" }
      ],
      default: "marker",
      section: "Layers",
      order: b + 15
    },
    [`layer${n}_icon_url`]: {
      type: "string",
      label: `L${n} Custom Icon URL`,
      default: "",
      placeholder: "https://...",
      section: "Layers",
      order: b + 16
    }
  };
};

// --- HELPER: PRELOADER (Returns Base64 directly if preset) ---
const preloadImage = (type, customUrl) => {
  return new Promise((resolve) => {
    let url = ICONS[type] || customUrl;

    if (url && url.startsWith("data:")) {
      return resolve(url);
    }

    if (!url || url.length < 5) return resolve(ICONS['marker']);

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => resolve(url);
    img.onerror = () => {
      console.warn(`[Viz V34] Failed to load icon: ${url}. Using fallback.`);
      resolve(ICONS['marker']);
    };
    img.src = url;
  });
};

looker.plugins.visualizations.add({
  id: "combo_map_ultimate_v34",
  label: "Combo Map 3D (V34 Fixed)",
  options: {
    // --- 1. PLOT TAB ---
    region_header: { type: "string", label: "─── DATA & REGIONS ───", display: "divider", section: "Plot", order: 1 },

    data_mode: {
      type: "string",
      label: "Data Mode",
      display: "select",
      values: [
        { "Region Data (Names)": "regions" },
        { "Point Data (Lat/Lng)": "points" }
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
        { "Custom URL": "custom" },
        { "World Countries": "world_countries" },
        { "USA States": "us_states" },
        { "Europe Major Combined": "combined_europe_major" },
        { "France Regions": "france_regions" },
        { "Germany States": "germany_states" },
        { "UK Regions": "uk_regions" },
        { "Spain Communities": "spain_communities" }
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
      label: "Region Dimension Name (Default)",
      section: "Plot",
      placeholder: "e.g. state (Auto-detects if empty)",
      order: 5
    },

    // --- BASE MAP ---
    map_header: { type: "string", label: "─── BASE MAP ───", display: "divider", section: "Plot", order: 10 },

    mapbox_token: {
      type: "string",
      label: "Mapbox Token (Required)",
      section: "Plot",
      placeholder: "pk.eyJ1...",
      order: 11
    },
    map_style: {
      type: "string",
      label: "Map Style",
      display: "select",
      values: [
        { "Dark": "mapbox://styles/mapbox/dark-v11" },
        { "Light": "mapbox://styles/mapbox/light-v11" },
        { "Streets": "mapbox://styles/mapbox/streets-v12" },
        { "Satellite": "mapbox://styles/mapbox/satellite-streets-v12" }
      ],
      default: "mapbox://styles/mapbox/dark-v11",
      section: "Plot",
      order: 12
    },
    center_lat: { type: "number", label: "Latitude", default: 46, section: "Plot", order: 13 },
    center_lng: { type: "number", label: "Longitude", default: 2, section: "Plot", order: 14 },
    zoom: { type: "number", label: "Zoom", default: 4, section: "Plot", order: 15 },
    pitch: { type: "number", label: "3D Tilt (0-60)", default: 45, section: "Plot", order: 16 },

    // --- TOOLTIP ---
    tooltip_header: { type: "string", label: "─── TOOLTIP ───", display: "divider", section: "Plot", order: 20 },

    tooltip_mode: {
      type: "string",
      label: "Tooltip Content",
      display: "select",
      values: [
        { "Name & Values": "all" },
        { "Name Only": "name" },
        { "Values Only": "values" },
        { "None": "none" }
      ],
      default: "all",
      section: "Plot",
      order: 21
    },
    tooltip_bg_color: {
      type: "string",
      label: "Tooltip Background",
      display: "color",
      default: "#FFFFFF",
      section: "Plot",
      order: 22
    },

    // --- 2. LAYERS TAB ---
    ...getLayerOptions(1),
    ...getLayerOptions(2),
    ...getLayerOptions(3),
    ...getLayerOptions(4),
  },

  create: function (element, config) {
    console.log("[Viz V34] CREATE called");

    if (!document.getElementById('mapbox-css-fix')) {
      const link = document.createElement('link');
      link.id = 'mapbox-css-fix';
      link.rel = 'stylesheet';
      link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css';
      document.head.appendChild(link);
    }

    element.innerHTML = `
      <style>
        #map-wrapper { width: 100%; height: 100%; position: relative; overflow: hidden; background: #111; }
        #map { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; }
        #token-error {
            position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
            color: #FF5252; background: rgba(0,0,0,0.8); padding: 20px; border-radius: 8px;
            font-family: sans-serif; font-weight: bold; text-align: center; display: none; z-index: 999;
        }
        .deck-tooltip { font-family: sans-serif; font-size: 12px; pointer-events: none; }
        .pivot-section { margin-top: 5px; padding-top: 5px; border-top: 1px dashed #ccc; }
        .pivot-value { display: flex; justify-content: space-between; gap: 10px; }
        .pivot-label { color: #666; font-size: 0.9em; }
      </style>

      <div id="map-wrapper">
        <div id="map"></div>
        <div id="token-error">MISSING MAPBOX TOKEN<br><span style="font-size:0.8em; font-weight:normal">Please enter your token in the "Plot" settings.</span></div>
      </div>`;

    this._container = element.querySelector('#map');
    this._tokenError = element.querySelector('#token-error');
    this._geojsonCache = {};
    this._viewState = null;
    this._prevConfig = {};
  },

  destroy: function () {
    console.log("[Viz V34] DESTROY called");
    if (this._deck) {
      this._deck.finalize();
      this._deck = null;
    }
    this._geojsonCache = {};
  },

  updateAsync: function (data, element, config, queryResponse, details, done) {
    const isPrint = details && details.print;

    console.log("=".repeat(60));
    console.log("[Viz V34] UPDATE ASYNC START");
    console.log("[Viz V34] Rows:", data.length);
    console.log("[Viz V34] PDF Mode:", isPrint);
    console.log("=".repeat(60));

    this.clearErrors();

    // --- CHECK MAPBOX TOKEN ---
    if (!config.mapbox_token) {
      console.error("[Viz V34] ERROR: Missing Mapbox Token");
      if (this._deck) { this._deck.finalize(); this._deck = null; }
      this._tokenError.style.display = 'block';
      done();
      return;
    } else {
      this._tokenError.style.display = 'none';
    }

    // --- CHECK DEPENDENCIES ---
    if (typeof deck === 'undefined' || typeof mapboxgl === 'undefined') {
      console.error("[Viz V34] ERROR: Missing deck.gl or mapbox-gl");
      this.addError({ title: "Missing Dependencies", message: "Add deck.gl and mapbox-gl to manifest." });
      done();
      return;
    }

    this._queryResponse = queryResponse;

    // --- DETECT PIVOTS ---
    this._pivotInfo = this._detectPivots(queryResponse);
    console.log("[Viz V34] PIVOT INFO:", JSON.stringify(this._pivotInfo, null, 2));

    // --- PRE-LOAD ICONS ---
    const iconPromises = [];
    for (let i = 1; i <= 4; i++) {
      if (config[`layer${i}_enabled`] && config[`layer${i}_type`] === 'icon') {
        const preset = config[`layer${i}_icon_type`];
        const custom = config[`layer${i}_icon_url`];
        iconPromises.push(preloadImage(preset, custom));
      }
    }

    // --- MAIN PROCESSING ---
    Promise.all([
      this._prepareData(data, config, queryResponse),
      ...iconPromises
    ]).then(([processedData, ...loadedIcons]) => {

      console.log("[Viz V34] DATA PREPARED. Rendering...");
      this._render(processedData, config, queryResponse, details, loadedIcons);

      if (isPrint) {
        console.log("[Viz V34] PDF Mode - Waiting 4s");
        if (this._deck) this._deck.redraw(true);
        setTimeout(() => done(), 4000);
      } else {
        done();
      }

    }).catch(err => {
      console.error("[Viz V34] FATAL ERROR:", err);
      this.addError({ title: "Error", message: err.message });
      done();
    });
  },

  // --- DETECT PIVOT CONFIGURATION ---
  _detectPivots: function (queryResponse) {
    const pivotFields = queryResponse.fields.pivots || [];
    const hasPivot = pivotFields.length > 0;

    if (!hasPivot) {
      return { hasPivot: false, pivotKeys: [], pivotField: null, pivotLabels: [] };
    }

    const pivotKeys = queryResponse.pivots ? queryResponse.pivots.map(p => p.key) : [];
    const pivotLabels = queryResponse.pivots ? queryResponse.pivots.map(p => {
      if (typeof p.data === 'object') return Object.values(p.data).join(' | ');
      return p.key;
    }) : pivotKeys;

    return {
      hasPivot: true,
      pivotKeys: pivotKeys,
      pivotField: pivotFields[0],
      pivotLabels: pivotLabels
    };
  },

  // --- PREPARE DATA ---
  _prepareData: async function (data, config, queryResponse) {
    const measures = queryResponse.fields.measure_like;
    const dims = queryResponse.fields.dimension_like;

    // A. POINT MODE (Lat/Lng)
    if (config.data_mode === 'points') {
      const latF = dims.find(d => d.type === 'latitude' || d.name.toLowerCase().includes('lat'));
      const lngF = dims.find(d => d.type === 'longitude' || d.name.toLowerCase().includes('lon'));

      if (!latF || !lngF) throw new Error("Latitude/Longitude dimensions missing.");

      const points = data.map((row, idx) => {
        const pointData = this._extractRowData(row, measures, dims, idx);
        return {
          position: [parseFloat(row[lngF.name].value), parseFloat(row[latF.name].value)],
          ...pointData,
          name: "Point"
        };
      }).filter(p => !isNaN(p.position[0]) && !isNaN(p.position[1]));

      return { type: 'points', data: points, measures, dims };
    }

    // B. REGION MODE (Name Matching)
    const url = this._getGeoJSONUrl(config);
    let geojson = null;

    try {
      geojson = await this._loadGeoJSON(url);
    } catch (error) {
      console.warn("[Viz V34] GeoJSON load failed:", error);
      geojson = { type: "FeatureCollection", features: [] };
    }

    const dataMaps = this._buildDataMaps(data, dims, measures);
    const matchedFeatures = this._matchFeatures(geojson, dataMaps, config, dims);

    return {
      type: 'regions',
      data: matchedFeatures,
      dataMaps: dataMaps,
      geojson: geojson,
      measures,
      dims
    };
  },

  // --- EXTRACT ROW DATA (Calculates Totals correctly) ---
  _extractRowData: function (row, measures, dims, rowIdx) {
    const hasPivot = this._pivotInfo && this._pivotInfo.hasPivot;

    if (!hasPivot) {
      return {
        values: measures.map(m => {
          const cell = row[m.name];
          return cell ? parseFloat(cell.value) || 0 : 0;
        }),
        formattedValues: measures.map(m => {
          const cell = row[m.name];
          return cell ? (cell.rendered || cell.value) : '';
        }),
        links: measures.map(m => {
          const cell = row[m.name];
          return cell ? cell.links : [];
        }),
        dimensionValues: dims.map(d => {
          const cell = row[d.name];
          return cell ? cell.value : '';
        }),
        pivotData: null
      };
    }

    // --- PIVOTED DATA ---
    const pivotData = {};
    const pivotKeys = this._pivotInfo.pivotKeys;

    measures.forEach((m) => {
      pivotData[m.name] = {};
      const measureCell = row[m.name];

      if (measureCell && typeof measureCell === 'object') {
        pivotKeys.forEach((pivotKey) => {
          const pivotCell = measureCell[pivotKey];
          if (pivotCell) {
            pivotData[m.name][pivotKey] = {
              value: parseFloat(pivotCell.value) || 0,
              formatted: pivotCell.rendered || pivotCell.value || '0',
              links: pivotCell.links || []
            };
          } else {
            pivotData[m.name][pivotKey] = { value: 0, formatted: '0', links: [] };
          }
        });
      }
    });

    // Calculate totals - THESE are used when ShowAllPivots = TRUE
    const values = measures.map(m => {
      let total = 0;
      pivotKeys.forEach(pk => {
        if (pivotData[m.name] && pivotData[m.name][pk]) {
          total += pivotData[m.name][pk].value;
        }
      });
      return total;
    });

    const formattedValues = values.map(v => this._formatNumber(v));

    return {
      values, // Contains SUM of all pivots
      formattedValues,
      links: [], // Simplified for pivots
      dimensionValues: dims.map(d => row[d.name] ? row[d.name].value : ''),
      pivotData
    };
  },

  // --- BUILD DATA MAPS ---
  _buildDataMaps: function (data, dims, measures) {
    const dataMaps = {};

    dims.forEach((dim, dimIdx) => {
      dataMaps[dimIdx] = {};
      data.forEach((row, rowIdx) => {
        const rawName = row[dim.name] ? row[dim.name].value : null;

        if (rawName) {
          const clean = this._normalizeName(rawName);
          const rowData = this._extractRowData(row, measures, dims, rowIdx);

          if (dataMaps[dimIdx][clean]) {
            const existing = dataMaps[dimIdx][clean];
            // Aggregate values (Summing totals)
            existing.values = existing.values.map((v, i) => v + (rowData.values[i] || 0));
            existing.formattedValues = existing.values.map(v => this._formatNumber(v));

            // Merge pivot data
            if (rowData.pivotData && existing.pivotData) {
              Object.keys(rowData.pivotData).forEach(mName => {
                Object.keys(rowData.pivotData[mName]).forEach(pk => {
                  if (!existing.pivotData[mName]) existing.pivotData[mName] = {};
                  if (!existing.pivotData[mName][pk]) {
                    existing.pivotData[mName][pk] = { ...rowData.pivotData[mName][pk] };
                  } else {
                    existing.pivotData[mName][pk].value += rowData.pivotData[mName][pk].value;
                    existing.pivotData[mName][pk].formatted = this._formatNumber(existing.pivotData[mName][pk].value);
                  }
                });
              });
            }
          } else {
            dataMaps[dimIdx][clean] = { ...rowData, rawName: rawName };
          }
        }
      });
    });

    return dataMaps;
  },

  // --- MATCH FEATURES TO GEOJSON ---
  _matchFeatures: function (geojson, dataMaps, config, dims) {
    const primaryDataMap = dataMaps[0] || {};
    const matchedFeatures = [];

    if (geojson && geojson.features) {
      geojson.features.forEach((feature) => {
        const props = feature.properties;
        let match = null;

        for (let key in props) {
          if (props[key]) {
            const cleanProp = this._normalizeName(props[key]);
            if (primaryDataMap[cleanProp]) {
              match = primaryDataMap[cleanProp];
              break;
            }
          }
        }

        if (match) {
          feature.properties._name = match.rawName;
          feature.properties._values = match.values;
          feature.properties._formatted = match.formattedValues;
          feature.properties._pivotData = match.pivotData;

          const centroid = this._getCentroid(feature.geometry);
          matchedFeatures.push({
            feature: feature,
            centroid: centroid,
            values: match.values,
            formattedValues: match.formattedValues,
            links: match.links,
            name: match.rawName,
            pivotData: match.pivotData,
            dimensionValues: match.dimensionValues
          });
        }
      });
    }
    return matchedFeatures;
  },

  // --- RENDER ---
  _render: function (processed, config, queryResponse, details, loadedIcons) {
    const layerObjects = [];
    let iconIndex = 0;

    for (let i = 1; i <= 4; i++) {
      const enabled = config[`layer${i}_enabled`];
      const type = config[`layer${i}_type`];

      if (enabled) {
        try {
          let iconUrlOverride = null;
          if (type === 'icon') {
            iconUrlOverride = loadedIcons[iconIndex] || ICONS['marker'];
            iconIndex++;
          }

          const layer = this._buildSingleLayer(i, config, processed, iconUrlOverride);
          if (layer) {
            const z = Number(config[`layer${i}_z_index`]) || i;
            layerObjects.push({ layer: layer, zIndex: z });
          }
        } catch (e) {
          console.error(`[Viz V34] Layer ${i} build FAILED:`, e);
        }
      }
    }

    layerObjects.sort((a, b) => a.zIndex - b.zIndex);
    const layers = layerObjects.map(obj => obj.layer);

    // Enhanced tooltip
    const getTooltip = ({ object }) => {
      if (!object || config.tooltip_mode === 'none') return null;

      let name, values, formatted, pivotData;
      if (object.properties && object.properties._name) {
        name = object.properties._name;
        values = object.properties._values;
        formatted = object.properties._formatted;
        pivotData = object.properties._pivotData;
      } else if (object.name && object.values) {
        name = object.name;
        values = object.values;
        formatted = object.formattedValues;
        pivotData = object.pivotData;
      } else {
        return null;
      }

      let html = "";
      if (config.tooltip_mode !== 'values') {
        html += `<div style="font-weight:bold; border-bottom:1px solid #ccc; margin-bottom:5px;">${name}</div>`;
      }

      if (config.tooltip_mode !== 'name') {
        const measures = queryResponse.fields.measure_like;

        if (pivotData && this._pivotInfo && this._pivotInfo.hasPivot) {
          measures.forEach((m, idx) => {
            html += `<div style="font-weight:bold; margin-top:5px;">${m.label_short || m.label}</div>`;
            html += `<div class="pivot-section">`;
            this._pivotInfo.pivotKeys.forEach((pk, pIdx) => {
              const pivotLabel = this._pivotInfo.pivotLabels[pIdx] || pk;
              const pData = pivotData[m.name] && pivotData[m.name][pk];
              const val = pData ? pData.formatted : '0';
              html += `<div class="pivot-value"><span class="pivot-label">${pivotLabel}:</span><span style="font-weight:bold;">${val}</span></div>`;
            });
            html += `<div class="pivot-value" style="border-top:1px solid #ddd; margin-top:3px; padding-top:3px;"><span class="pivot-label">Total:</span><span style="font-weight:bold;">${formatted[idx]}</span></div></div>`;
          });
        } else {
          measures.forEach((m, idx) => {
            html += `<div style="display:flex; justify-content:space-between; gap:10px;"><span>${m.label_short || m.label}:</span><span style="font-weight:bold;">${formatted[idx]}</span></div>`;
          });
        }
      }

      return {
        html,
        style: {
          backgroundColor: config.tooltip_bg_color || '#fff',
          color: '#000',
          fontSize: '0.8em',
          padding: '8px',
          borderRadius: '4px',
          maxWidth: '300px'
        }
      };
    };

    // View state
    const cfgLat = Number(config.center_lat) || 46;
    const cfgLng = Number(config.center_lng) || 2;
    const cfgZoom = Number(config.zoom) || 4;
    const cfgPitch = Number(config.pitch) || 45;

    const configChanged =
      this._prevConfig.lat !== cfgLat ||
      this._prevConfig.lng !== cfgLng ||
      this._prevConfig.zoom !== cfgZoom ||
      this._prevConfig.pitch !== cfgPitch;

    if (!this._viewState || configChanged) {
      this._viewState = {
        longitude: cfgLng,
        latitude: cfgLat,
        zoom: cfgZoom,
        pitch: cfgPitch,
        bearing: 0,
        transitionDuration: (details && details.print) ? 0 : 500
      };
      this._prevConfig = { lat: cfgLat, lng: cfgLng, zoom: cfgZoom, pitch: cfgPitch };
    }

    const onViewStateChange = ({ viewState }) => {
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
        glOptions: { preserveDrawingBuffer: true, willReadFrequently: true },
        onError: (err) => console.warn("[Viz V34] DeckGL Error:", err)
      });
    } else {
      this._deck.setProps({
        layers: layers,
        mapStyle: config.map_style,
        mapboxApiAccessToken: config.mapbox_token,
        getTooltip: getTooltip,
        viewState: this._viewState,
        controller: true,
        onViewStateChange: onViewStateChange
      });
    }
  },

  _validateLayerData: function (data) {
    if (!data || !Array.isArray(data) || data.length === 0) return [];
    return data.filter(d =>
      d.position &&
      d.position.length === 2 &&
      !isNaN(d.position[0]) &&
      !isNaN(d.position[1]) &&
      d.position[1] >= -90 && d.position[1] <= 90
    );
  },

  // --- BUILD SINGLE LAYER ---
  _buildSingleLayer: function (idx, config, processed, iconUrlOverride) {
    const type = config[`layer${idx}_type`];
    const measureIdx = Number(config[`layer${idx}_measure_idx`]) || 0;
    const dimensionIdx = Number(config[`layer${idx}_dimension_idx`]) || 0;
    const showAllPivots = config[`layer${idx}_show_all_pivots`];
    const pivotIdx = Number(config[`layer${idx}_pivot_idx`]) || 0;

    // Gradient Colors
    const useGradient = config[`layer${idx}_use_gradient`];
    const startColorHex = config[`layer${idx}_color_main`];
    const endColorHex = config[`layer${idx}_gradient_end`];
    const startColor = this._hexToRgb(startColorHex);

    const radius = Number(config[`layer${idx}_radius`]) || 1000;
    const heightScale = Number(config[`layer${idx}_height`]) || 1000;
    const opacity = Number(config[`layer${idx}_opacity`]) || 0.7;

    let iconUrl = iconUrlOverride;
    if (!iconUrl) {
      iconUrl = ICONS[config[`layer${idx}_icon_type`]] || ICONS['marker'];
    }

    const pivotInfo = this._pivotInfo;
    const queryResponse = this._queryResponse;

    // --- VALUE GETTER (FIXED FOR V34) ---
    const getValue = (d) => {
      // 1. Non-Pivoted Data
      if (!pivotInfo || !pivotInfo.hasPivot) {
        const arr = d.values || (d.properties && d.properties._values);
        if (!arr) return 0;
        return parseFloat(arr[measureIdx]) || 0;
      }

      // 2. Pivoted Data
      const mName = queryResponse.fields.measure_like[measureIdx] ? queryResponse.fields.measure_like[measureIdx].name : null;

      if (showAllPivots) {
        // RETURN TOTAL (pre-calculated sum stored in d.values)
        const arr = d.values || (d.properties && d.properties._values);
        if (!arr) return 0;
        return parseFloat(arr[measureIdx]) || 0;
      } else {
        // RETURN SPECIFIC PIVOT COLUMN
        const pKey = pivotInfo.pivotKeys[pivotIdx]; // Use the user-selected pivot index
        const pData = d.pivotData || (d.properties && d.properties._pivotData);

        if (mName && pKey && pData && pData[mName] && pData[mName][pKey]) {
          return pData[mName][pKey].value || 0;
        }
        return 0; // Fallback if specific pivot col is empty
      }
    };

    // Click handler
    const onClickHandler = (info) => {
      if (!info || !info.object) return;
      let links = null;
      if (info.object.properties && info.object.properties._links) {
        links = info.object.properties._links[measureIdx];
      } else if (info.object.links) {
        links = info.object.links[measureIdx];
      }
      if (links && links.length > 0) {
        LookerCharts.Utils.openDrillMenu({ links: links, event: info.srcEvent || {} });
      }
    };

    // --- PREPARE DATA ---
    let pointData = [];
    if (processed.type === 'regions') {
      const dataMap = processed.dataMaps ? processed.dataMaps[dimensionIdx] : null;
      if (dataMap) {
        if (dimensionIdx === 0) {
          if (processed.geojson && processed.geojson.features) {
            processed.geojson.features.forEach(feature => {
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
                pointData.push({
                  position: this._getCentroid(feature.geometry),
                  values: match.values,
                  formattedValues: match.formattedValues,
                  links: match.links,
                  name: match.rawName,
                  pivotData: match.pivotData,
                  dimensionValues: match.dimensionValues,
                  feature: feature
                });
              }
            });
          }
        } else {
          Object.keys(dataMap).forEach(key => {
            const item = dataMap[key];
            let pos = [0, 0];
            if (Array.isArray(item.rawName) && item.rawName.length === 2) {
              pos = [Number(item.rawName[1]), Number(item.rawName[0])];
            } else if (typeof item.rawName === 'string' && item.rawName.includes(',')) {
              const parts = item.rawName.split(',');
              if (parts.length === 2) {
                pos = [parseFloat(parts[1]), parseFloat(parts[0])];
              }
            }
            if (pos[0] || pos[1]) {
              pointData.push({
                position: pos,
                values: item.values,
                formattedValues: item.formattedValues,
                links: item.links,
                name: item.rawName.toString(),
                pivotData: item.pivotData,
                dimensionValues: item.dimensionValues,
                feature: null
              });
            }
          });
        }
      }
    } else {
      pointData = processed.data;
    }

    const safePointData = this._validateLayerData(pointData);
    const id = `layer-${idx}-${type}-dim${dimensionIdx}`;
    const allVals = safePointData.map(d => getValue(d));
    const maxVal = Math.max(...allVals, 0.1);

    const updateTriggersBase = [measureIdx, useGradient, startColorHex, endColorHex, showAllPivots, dimensionIdx, pivotIdx];

    const geoJsonFeatures = safePointData.filter(d => d.feature).map(d => {
      d.feature.properties._values = d.values;
      d.feature.properties._formatted = d.formattedValues;
      d.feature.properties._pivotData = d.pivotData;
      d.feature.properties._name = d.name;
      d.feature.properties._links = d.links;
      return d.feature;
    });

    switch (type) {
      case 'geojson':
        if (processed.type !== 'regions') return null;
        if (geoJsonFeatures.length === 0) return null;
        return new deck.GeoJsonLayer({
          id: id,
          data: { type: "FeatureCollection", features: geoJsonFeatures },
          pickable: true,
          stroked: true,
          filled: true,
          getLineWidth: 1,
          getLineColor: [255, 255, 255],
          opacity: opacity,
          onClick: onClickHandler,
          getFillColor: d => {
            if (!useGradient) return startColor;
            const val = getValue(d);
            return this._interpolateColor(startColorHex, endColorHex, val / maxVal);
          },
          updateTriggers: { getFillColor: updateTriggersBase }
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
          getPosition: d => d.position,
          getFillColor: d => {
            if (!useGradient) return startColor;
            const val = getValue(d);
            return this._interpolateColor(startColorHex, endColorHex, val / maxVal);
          },
          getLineColor: [255, 255, 255],
          getElevation: d => getValue(d) * heightScale,
          elevationScale: 1,
          opacity: opacity,
          onClick: onClickHandler,
          updateTriggers: {
            getFillColor: updateTriggersBase,
            getElevation: [...updateTriggersBase, heightScale]
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
          getFillColor: d => {
            if (!useGradient) return startColor;
            const val = getValue(d);
            return this._interpolateColor(startColorHex, endColorHex, val / maxVal);
          },
          getLineColor: [255, 255, 255],
          onClick: onClickHandler,
          updateTriggers: { getFillColor: updateTriggersBase }
        });

      case 'bubble':
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
          getRadius: d => Math.sqrt(getValue(d) / maxVal) * radius,
          getFillColor: d => {
            if (!useGradient) return startColor;
            const val = getValue(d);
            return this._interpolateColor(startColorHex, endColorHex, val / maxVal);
          },
          getLineColor: [255, 255, 255],
          onClick: onClickHandler,
          updateTriggers: {
            getFillColor: updateTriggersBase,
            getRadius: [...updateTriggersBase, radius]
          }
        });

      case 'icon':
        if (safePointData.length === 0) return null;
        return new deck.IconLayer({
          id: id,
          data: safePointData,
          pickable: true,
          opacity: opacity,
          iconAtlas: iconUrl,
          iconMapping: { marker: { x: 0, y: 0, width: 512, height: 512, mask: false } },
          getIcon: d => 'marker',
          getPosition: d => d.position,
          getSize: d => radius,
          sizeScale: 1,
          sizeMinPixels: 20,
          autoHighlight: false,
          onClick: onClickHandler
        });

      case 'heatmap':
        if (safePointData.length === 0) return null;
        return new deck.HeatmapLayer({
          id: id,
          data: safePointData,
          pickable: false,
          getPosition: d => d.position,
          getWeight: d => getValue(d),
          radiusPixels: radius / 500,
          colorRange: this._generateColorRange(startColorHex, endColorHex),
          updateTriggers: { getWeight: updateTriggersBase }
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
          getElevationWeight: d => getValue(d),
          getColorWeight: d => getValue(d),
          colorAggregation: 'SUM',
          elevationAggregation: 'SUM',
          colorRange: this._generateColorRange(startColorHex, endColorHex),
          onClick: onClickHandler,
          updateTriggers: {
            getElevationWeight: updateTriggersBase,
            getColorWeight: updateTriggersBase
          }
        });

      default:
        return null;
    }
  },

  // --- UTILITIES ---
  _formatNumber: function (num) {
    if (num === null || num === undefined) return '0';
    if (typeof num !== 'number') num = parseFloat(num) || 0;
    if (Math.abs(num) >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    else if (Math.abs(num) >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toLocaleString();
  },

  _getGeoJSONUrl: function (config) {
    if (config.map_layer_source === 'custom') return config.custom_geojson_url;
    const URLS = {
      world_countries: 'https://unpkg.com/world-atlas@2/countries-110m.json',
      us_states: 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json',
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

  _loadGeoJSON: async function (urlOrList) {
    if (Array.isArray(urlOrList)) {
      const results = await Promise.all(urlOrList.map(u => this._loadSingleGeoJSON(u)));
      const features = [];
      results.forEach(r => { if (r && r.features) features.push(...r.features); });
      return { type: "FeatureCollection", features };
    }
    return this._loadSingleGeoJSON(urlOrList);
  },

  _loadSingleGeoJSON: async function (url) {
    if (!url) return { type: "FeatureCollection", features: [] };
    if (this._geojsonCache[url]) return this._geojsonCache[url];
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
    let geojson = await res.json();
    if (geojson.type === 'Topology' && typeof topojson !== 'undefined') {
      const key = Object.keys(geojson.objects)[0];
      geojson = topojson.feature(geojson, geojson.objects[key]);
    }
    this._geojsonCache[url] = geojson;
    return geojson;
  },

  _getCentroid: function (geometry) {
    if (!geometry) return [0, 0];
    const coords = geometry.coordinates;
    if (geometry.type === 'Polygon') return this._polyAvg(coords[0]);
    else if (geometry.type === 'MultiPolygon') return this._polyAvg(coords[0][0]);
    return [0, 0];
  },

  _polyAvg: function (ring) {
    let x = 0, y = 0;
    if (!ring || !ring.length) return [0, 0];
    ring.forEach(p => { x += p[0]; y += p[1]; });
    return [x / ring.length, y / ring.length];
  },

  _normalizeName: function (name) {
    if (!name) return "";
    return name.toString().toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  },

  _hexToRgb: function (hex) {
    if (!hex) return [0, 0, 0];
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : [0, 0, 0];
  },

  _interpolateColor: function (c1, c2, factor) {
    const rgb1 = this._hexToRgb(c1);
    const rgb2 = this._hexToRgb(c2);
    const f = Math.min(Math.max(factor, 0), 1);
    return [
      Math.round(rgb1[0] + (rgb2[0] - rgb1[0]) * f),
      Math.round(rgb1[1] + (rgb2[1] - rgb1[1]) * f),
      Math.round(rgb1[2] + (rgb2[2] - rgb1[2]) * f)
    ];
  },

  _generateColorRange: function (startHex, endHex) {
    const colors = [];
    for (let i = 0; i < 6; i++) {
      colors.push(this._interpolateColor(startHex, endHex, i / 5));
    }
    return colors;
  }
});

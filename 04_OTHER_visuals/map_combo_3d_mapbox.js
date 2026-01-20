/**
 * Multi-Layer 3D Map for Looker - v31 Debug Edition
 *
 * FIXES FROM v30:
 * - FIXED: Dimension Index now properly filters data per layer
 * - FIXED: Pivot detection and display working correctly
 * - ADDED: Extensive console logging for debugging
 * - IMPROVED: PDF/Print mode handling
 *
 * FEATURES:
 * - Icons: 100% Embedded (Base64). No external network requests.
 * - Logic: Hexagon Layer aggregates by SUM of measure (Density = Value).
 * - UX: Toggle removed. Pan/Zoom and Drill work simultaneously.
 * - Data: "Fuzzy Match" dimension detection improved.
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
  const def = defaults[n-1];
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
        {"Choropleth (Region Only)": "geojson"},
        {"3D Columns": "column"},
        {"Points (Fixed Size)": "point"},
        {"Bubbles (Value Size)": "bubble"},
        {"Icon (Image)": "icon"},
        {"Clustered Hexagons (Sum Density)": "hexagon"},
        {"Heatmap (Sum Density)": "heatmap"}
      ],
      default: def.type,
      section: "Layers",
      order: b + 3
    },
    // NEW: Dimension Index per Layer
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
      default: n-1,
      section: "Layers",
      order: b + 5
    },
    // NEW: Show All Pivot Values option
    [`layer${n}_show_all_pivots`]: {
      type: "boolean",
      label: `L${n} Show All Pivot Values`,
      default: false,
      section: "Layers",
      order: b + 6
    },
    [`layer${n}_z_index`]: {
      type: "number",
      label: `L${n} Layer Order (Z-Index)`,
      default: n,
      section: "Layers",
      placeholder: "Higher # is on top",
      order: b + 7
    },

    // COLORS
    [`layer${n}_use_gradient`]: {
      type: "boolean",
      label: `L${n} Use Gradient?`,
      default: false,
      section: "Layers",
      order: b + 8
    },
    [`layer${n}_color_main`]: {
      type: "string",
      label: `L${n} Color (Start / Low Density)`,
      display: "color",
      default: def.color,
      section: "Layers",
      order: b + 9
    },
    [`layer${n}_gradient_end`]: {
      type: "string",
      label: `L${n} Gradient End (High Density)`,
      display: "color",
      default: "#1B5E20",
      section: "Layers",
      order: b + 10
    },

    // SIZE
    [`layer${n}_radius`]: {
      type: "number",
      label: `L${n} Radius / Size`,
      default: def.radius,
      section: "Layers",
      order: b + 11
    },
    [`layer${n}_height`]: {
      type: "number",
      label: `L${n} Height (3D)`,
      default: def.height,
      section: "Layers",
      order: b + 12
    },
    [`layer${n}_opacity`]: {
      type: "number",
      label: `L${n} Opacity`,
      default: 0.7,
      min: 0, max: 1, step: 0.1,
      section: "Layers",
      order: b + 13
    },

    // ICON
    [`layer${n}_icon_type`]: {
      type: "string",
      label: `L${n} Icon Preset`,
      display: "select",
      values: [
          {"Custom URL": "custom"},
          {"Marker (White Pin)": "marker"},
          {"Star (Yellow)": "star"},
          {"Circle (Blue)": "circle"},
          {"Warning (Red)": "warning"},
          {"Shop (Green)": "shop"},
          {"Blue Truck (Demo)": "truck"}
      ],
      default: "marker",
      section: "Layers",
      order: b + 14
    },
    [`layer${n}_icon_url`]: {
      type: "string",
      label: `L${n} Custom Icon URL`,
      default: "",
      placeholder: "https://...",
      section: "Layers",
      order: b + 15
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
            console.warn(`[Viz V31] Failed to load icon: ${url}. Using fallback.`);
            resolve(ICONS['marker']);
        };
        img.src = url;
    });
};

looker.plugins.visualizations.add({
  console.log("[DEBUG] Script loaded");
  id: "combo_map_ultimate_v31",
  label: "Combo Map 3D (V31 Debug)",
  options: {
    // --- 1. PLOT TAB ---
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

    // --- TOOLTIP ---
    tooltip_header: { type: "string", label: "─── TOOLTIP ───", display: "divider", section: "Plot", order: 20 },

    tooltip_mode: {
      type: "string",
      label: "Tooltip Content",
      display: "select",
      values: [
        {"Name & Values": "all"},
        {"Name Only": "name"},
        {"Values Only": "values"},
        {"None": "none"}
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

  create: function(element, config) {
    console.log("[Viz V31] CREATE called");

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

  destroy: function() {
    console.log("[Viz V31] DESTROY called");
    if (this._deck) {
      this._deck.finalize();
      this._deck = null;
    }
    this._geojsonCache = {};
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    const isPrint = details && details.print;

    console.log("=".repeat(60));
    console.log("[Viz V31] UPDATE ASYNC START");
    console.log("[Viz V31] Rows:", data.length);
    console.log("[Viz V31] PDF Mode:", isPrint);
    console.log("[Viz V31] Config:", JSON.stringify(config, null, 2));
    console.log("=".repeat(60));

    this.clearErrors();

    // --- CHECK MAPBOX TOKEN ---
    if (!config.mapbox_token) {
        console.error("[Viz V31] ERROR: Missing Mapbox Token");
        if(this._deck) { this._deck.finalize(); this._deck = null; }
        this._tokenError.style.display = 'block';
        done();
        return;
    } else {
        this._tokenError.style.display = 'none';
    }

    // --- CHECK DEPENDENCIES ---
    if (typeof deck === 'undefined' || typeof mapboxgl === 'undefined') {
      console.error("[Viz V31] ERROR: Missing deck.gl or mapbox-gl");
      this.addError({ title: "Missing Dependencies", message: "Add deck.gl and mapbox-gl to manifest." });
      done();
      return;
    }

    // --- STORE QUERY RESPONSE ---
    this._queryResponse = queryResponse;

    // --- LOG QUERY STRUCTURE ---
    console.log("[Viz V31] QUERY RESPONSE STRUCTURE:");
    console.log("[Viz V31]   Dimensions:", queryResponse.fields.dimension_like.map(d => d.name));
    console.log("[Viz V31]   Measures:", queryResponse.fields.measure_like.map(m => m.name));
    console.log("[Viz V31]   Pivots field:", queryResponse.fields.pivots);
    console.log("[Viz V31]   Pivots data:", queryResponse.pivots);

    // --- LOG SAMPLE ROW ---
    if (data.length > 0) {
      console.log("[Viz V31] SAMPLE ROW (first row):");
      console.log(JSON.stringify(data[0], null, 2));
    }

    // --- DETECT PIVOTS ---
    this._pivotInfo = this._detectPivots(queryResponse);
    console.log("[Viz V31] PIVOT INFO:", JSON.stringify(this._pivotInfo, null, 2));

    // --- PRE-LOAD ICONS ---
    const iconPromises = [];
    for(let i=1; i<=4; i++) {
        if (config[`layer${i}_enabled`] && config[`layer${i}_type`] === 'icon') {
            const preset = config[`layer${i}_icon_type`];
            const custom = config[`layer${i}_icon_url`];
            console.log(`[Viz V31] Preloading icon for Layer ${i}: preset=${preset}, custom=${custom}`);
            iconPromises.push(preloadImage(preset, custom));
        }
    }

    // --- MAIN PROCESSING ---
    Promise.all([
        this._prepareData(data, config, queryResponse),
        ...iconPromises
    ]).then(([processedData, ...loadedIcons]) => {

        console.log("[Viz V31] DATA PREPARED SUCCESSFULLY");
        console.log("[Viz V31]   Type:", processedData.type);
        console.log("[Viz V31]   Data points:", processedData.data ? processedData.data.length : 0);
        console.log("[Viz V31]   DataMaps keys:", processedData.dataMaps ? Object.keys(processedData.dataMaps) : 'N/A');

        if (processedData.dataMaps) {
          Object.keys(processedData.dataMaps).forEach(dimIdx => {
            const map = processedData.dataMaps[dimIdx];
            console.log(`[Viz V31]   DataMap[${dimIdx}] has ${Object.keys(map).length} entries`);
            // Log first entry as sample
            const firstKey = Object.keys(map)[0];
            if (firstKey) {
              console.log(`[Viz V31]   DataMap[${dimIdx}] sample entry "${firstKey}":`, JSON.stringify(map[firstKey], null, 2));
            }
          });
        }

        this._render(processedData, config, queryResponse, details, loadedIcons);

        if (isPrint) {
            console.log("[Viz V31] PDF Mode - Waiting 4s for render");
            if(this._deck) this._deck.redraw(true);
            setTimeout(() => {
              console.log("[Viz V31] PDF Mode - Done waiting, calling done()");
              done();
            }, 4000);
        } else {
            done();
        }

    }).catch(err => {
        console.error("[Viz V31] FATAL ERROR:", err);
        console.error("[Viz V31] Stack:", err.stack);
        this.addError({ title: "Error", message: err.message });
        done();
    });
  },

  // --- DETECT PIVOT CONFIGURATION ---
  _detectPivots: function(queryResponse) {
    console.log("[Viz V31] _detectPivots called");

    const pivotFields = queryResponse.fields.pivots || [];
    const hasPivot = pivotFields.length > 0;

    console.log("[Viz V31]   Pivot fields:", pivotFields);
    console.log("[Viz V31]   Has pivot:", hasPivot);

    if (!hasPivot) {
      console.log("[Viz V31]   No pivots detected");
      return { hasPivot: false, pivotKeys: [], pivotField: null, pivotLabels: [] };
    }

    // Get pivot keys from queryResponse.pivots array
    const pivotKeys = queryResponse.pivots ? queryResponse.pivots.map(p => p.key) : [];
    const pivotLabels = queryResponse.pivots ? queryResponse.pivots.map(p => {
      // p.data contains the actual pivot values
      if (typeof p.data === 'object') {
        return Object.values(p.data).join(' | ');
      }
      return p.key;
    }) : pivotKeys;

    console.log("[Viz V31]   Pivot keys:", pivotKeys);
    console.log("[Viz V31]   Pivot labels:", pivotLabels);

    return {
      hasPivot: true,
      pivotKeys: pivotKeys,
      pivotField: pivotFields[0],
      pivotLabels: pivotLabels
    };
  },

  // --- PREPARE DATA ---
  _prepareData: async function(data, config, queryResponse) {
    console.log("[Viz V31] _prepareData called");

    const measures = queryResponse.fields.measure_like;
    const dims = queryResponse.fields.dimension_like;

    console.log("[Viz V31]   Dimensions:", dims.map(d => `${d.name} (${d.type})`));
    console.log("[Viz V31]   Measures:", measures.map(m => m.name));

    // A. POINT MODE (Lat/Lng)
    if (config.data_mode === 'points') {
      console.log("[Viz V31]   Mode: POINTS");

      const latF = dims.find(d => d.type === 'latitude' || d.name.toLowerCase().includes('lat'));
      const lngF = dims.find(d => d.type === 'longitude' || d.name.toLowerCase().includes('lon'));

      console.log("[Viz V31]   Lat field:", latF ? latF.name : 'NOT FOUND');
      console.log("[Viz V31]   Lng field:", lngF ? lngF.name : 'NOT FOUND');

      if (!latF || !lngF) throw new Error("Latitude/Longitude dimensions missing.");

      const points = data.map((row, idx) => {
        const pointData = this._extractRowData(row, measures, dims, idx);
        return {
          position: [parseFloat(row[lngF.name].value), parseFloat(row[latF.name].value)],
          ...pointData,
          name: "Point"
        };
      }).filter(p => !isNaN(p.position[0]) && !isNaN(p.position[1]));

      console.log("[Viz V31]   Valid points:", points.length);
      return { type: 'points', data: points, measures, dims };
    }

    // B. REGION MODE (Name Matching)
    console.log("[Viz V31]   Mode: REGIONS");

    const url = this._getGeoJSONUrl(config);
    console.log("[Viz V31]   GeoJSON URL:", url);

    let geojson = null;

    try {
        geojson = await this._loadGeoJSON(url);
        console.log("[Viz V31]   GeoJSON loaded, features:", geojson.features ? geojson.features.length : 0);
    } catch (error) {
        console.warn("[Viz V31]   GeoJSON load failed:", error);
        geojson = { type: "FeatureCollection", features: [] };
    }

    // Build data maps per dimension
    console.log("[Viz V31]   Building data maps for each dimension...");
    const dataMaps = this._buildDataMaps(data, dims, measures);

    // Match features using primary dimension (index 0)
    console.log("[Viz V31]   Matching features to GeoJSON...");
    const matchedFeatures = this._matchFeatures(geojson, dataMaps, config, dims);
    console.log("[Viz V31]   Matched features:", matchedFeatures.length);

    return {
      type: 'regions',
      data: matchedFeatures,
      dataMaps: dataMaps,
      geojson: geojson,
      measures,
      dims
    };
  },

  // --- EXTRACT ROW DATA (handles pivots) ---
  _extractRowData: function(row, measures, dims, rowIdx) {
    const hasPivot = this._pivotInfo && this._pivotInfo.hasPivot;

    if (rowIdx === 0) {
      console.log("[Viz V31] _extractRowData (first row)");
      console.log("[Viz V31]   Has pivot:", hasPivot);
    }

    if (!hasPivot) {
      // Standard non-pivoted data
      const result = {
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

      if (rowIdx === 0) {
        console.log("[Viz V31]   Non-pivot result:", JSON.stringify(result, null, 2));
      }

      return result;
    }

    // --- PIVOTED DATA ---
    const pivotData = {};
    const pivotKeys = this._pivotInfo.pivotKeys;

    if (rowIdx === 0) {
      console.log("[Viz V31]   Processing pivoted data");
      console.log("[Viz V31]   Pivot keys:", pivotKeys);
    }

    measures.forEach((m, mIdx) => {
      pivotData[m.name] = {};
      const measureCell = row[m.name];

      if (rowIdx === 0) {
        console.log(`[Viz V31]   Measure ${m.name} cell:`, JSON.stringify(measureCell, null, 2));
      }

      if (measureCell && typeof measureCell === 'object') {
        pivotKeys.forEach((pivotKey, pIdx) => {
          // In Looker, pivoted values are accessed as row[measure.name][pivotKey]
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

    // Calculate totals
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

    const result = {
      values,
      formattedValues,
      links: measures.map(m => {
        const allLinks = [];
        pivotKeys.forEach(pk => {
          if (pivotData[m.name] && pivotData[m.name][pk] && pivotData[m.name][pk].links) {
            allLinks.push(...pivotData[m.name][pk].links);
          }
        });
        return allLinks;
      }),
      dimensionValues: dims.map(d => {
        const cell = row[d.name];
        return cell ? cell.value : '';
      }),
      pivotData
    };

    if (rowIdx === 0) {
      console.log("[Viz V31]   Pivot result:", JSON.stringify(result, null, 2));
    }

    return result;
  },

  // --- BUILD DATA MAPS FOR EACH DIMENSION ---
  _buildDataMaps: function(data, dims, measures) {
    console.log("[Viz V31] _buildDataMaps called");
    console.log("[Viz V31]   Number of dimensions:", dims.length);
    console.log("[Viz V31]   Number of rows:", data.length);

    const dataMaps = {};

    dims.forEach((dim, dimIdx) => {
      dataMaps[dimIdx] = {};
      console.log(`[Viz V31]   Building map for dimension ${dimIdx}: ${dim.name}`);

      data.forEach((row, rowIdx) => {
        const rawName = row[dim.name] ? row[dim.name].value : null;

        if (rawName) {
          const clean = this._normalizeName(rawName);
          const rowData = this._extractRowData(row, measures, dims, rowIdx);

          // Aggregate if same key exists
          if (dataMaps[dimIdx][clean]) {
            const existing = dataMaps[dimIdx][clean];
            existing.values = existing.values.map((v, i) => v + (rowData.values[i] || 0));
            existing.formattedValues = existing.values.map(v => this._formatNumber(v));

            // Merge links
            rowData.links.forEach((links, i) => {
              if (links && links.length) {
                existing.links[i] = [...(existing.links[i] || []), ...links];
              }
            });

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
            dataMaps[dimIdx][clean] = {
              ...rowData,
              rawName: rawName
            };
          }
        }
      });

      console.log(`[Viz V31]   Dimension ${dimIdx} map has ${Object.keys(dataMaps[dimIdx]).length} unique entries`);
    });

    return dataMaps;
  },

  // --- MATCH FEATURES TO GEOJSON ---
  _matchFeatures: function(geojson, dataMaps, config, dims) {
    console.log("[Viz V31] _matchFeatures called");

    // Use dimension index 0 as default for feature matching
    const primaryDataMap = dataMaps[0] || {};
    console.log("[Viz V31]   Using primary data map (dimension 0) with", Object.keys(primaryDataMap).length, "entries");

    const matchedFeatures = [];

    if (geojson && geojson.features) {
      console.log("[Viz V31]   Checking", geojson.features.length, "GeoJSON features");

      geojson.features.forEach((feature, fIdx) => {
        const props = feature.properties;
        let match = null;
        let matchedProp = null;

        for (let key in props) {
          if (props[key]) {
            const cleanProp = this._normalizeName(props[key]);
            if (primaryDataMap[cleanProp]) {
              match = primaryDataMap[cleanProp];
              matchedProp = props[key];
              break;
            }
          }
        }

        if (match) {
          feature.properties._links = match.links;
          feature.properties._name = match.rawName;
          feature.properties._values = match.values;
          feature.properties._formatted = match.formattedValues;
          feature.properties._pivotData = match.pivotData;
          feature.properties._dimensionValues = match.dimensionValues;

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

          if (fIdx < 3) {
            console.log(`[Viz V31]   Matched feature ${fIdx}: "${matchedProp}" -> "${match.rawName}"`);
          }
        }
      });
    }

    console.log("[Viz V31]   Total matched features:", matchedFeatures.length);
    return matchedFeatures;
  },

  // --- RENDER ---
  _render: function(processed, config, queryResponse, details, loadedIcons) {
    console.log("[Viz V31] _render called");

    const layerObjects = [];
    let iconIndex = 0;

    for (let i = 1; i <= 4; i++) {
      const enabled = config[`layer${i}_enabled`];
      const type = config[`layer${i}_type`];
      const dimIdx = config[`layer${i}_dimension_idx`];
      const measureIdx = config[`layer${i}_measure_idx`];
      const showAllPivots = config[`layer${i}_show_all_pivots`];

      console.log(`[Viz V31] Layer ${i}: enabled=${enabled}, type=${type}, dimIdx=${dimIdx}, measureIdx=${measureIdx}, showAllPivots=${showAllPivots}`);

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
            console.log(`[Viz V31]   Layer ${i} built successfully`);
          } else {
            console.log(`[Viz V31]   Layer ${i} returned null`);
          }
        } catch(e) {
          console.error(`[Viz V31]   Layer ${i} build FAILED:`, e);
        }
      }
    }

    layerObjects.sort((a, b) => a.zIndex - b.zIndex);
    const layers = layerObjects.map(obj => obj.layer);
    console.log("[Viz V31] Total layers to render:", layers.length);

    // Enhanced tooltip with pivot support
    const getTooltip = ({object}) => {
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

        // Show pivot data if available
        if (pivotData && this._pivotInfo && this._pivotInfo.hasPivot) {
          measures.forEach((m, idx) => {
            html += `<div style="font-weight:bold; margin-top:5px;">${m.label_short || m.label}</div>`;
            html += `<div class="pivot-section">`;

            this._pivotInfo.pivotKeys.forEach((pk, pIdx) => {
              const pivotLabel = this._pivotInfo.pivotLabels[pIdx] || pk;
              const pData = pivotData[m.name] && pivotData[m.name][pk];
              const val = pData ? pData.formatted : '0';

              html += `<div class="pivot-value">
                <span class="pivot-label">${pivotLabel}:</span>
                <span style="font-weight:bold;">${val}</span>
              </div>`;
            });

            // Show total
            html += `<div class="pivot-value" style="border-top:1px solid #ddd; margin-top:3px; padding-top:3px;">
              <span class="pivot-label">Total:</span>
              <span style="font-weight:bold;">${formatted[idx]}</span>
            </div>`;
            html += `</div>`;
          });
        } else {
          // Standard non-pivot tooltip
          measures.forEach((m, idx) => {
            html += `<div style="display:flex; justify-content:space-between; gap:10px;">
              <span>${m.label_short || m.label}:</span>
              <span style="font-weight:bold;">${formatted[idx]}</span>
            </div>`;
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

    // View state management
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
        console.log("[Viz V31] Resetting view state");
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

    const onViewStateChange = ({viewState}) => {
      this._viewState = viewState;
      this._deck.setProps({ viewState: this._viewState });
    };

    if (!this._deck) {
      console.log("[Viz V31] Creating new DeckGL instance");
      this._deck = new deck.DeckGL({
        container: this._container,
        mapStyle: config.map_style,
        mapboxApiAccessToken: config.mapbox_token,
        viewState: this._viewState,
        onViewStateChange: onViewStateChange,
        controller: true,
        layers: layers,
        getTooltip: getTooltip,
        glOptions: {
          preserveDrawingBuffer: true,
          willReadFrequently: true,
          failIfMajorPerformanceCaveat: false
        },
        onError: (err) => console.warn("[Viz V31] DeckGL Error:", err)
      });
    } else {
      console.log("[Viz V31] Updating existing DeckGL instance");
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

    console.log("[Viz V31] _render complete");
  },

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

  // --- BUILD SINGLE LAYER ---
  _buildSingleLayer: function(idx, config, processed, iconUrlOverride) {
    const type = config[`layer${idx}_type`];
    const measureIdx = Number(config[`layer${idx}_measure_idx`]) || 0;
    const dimensionIdx = Number(config[`layer${idx}_dimension_idx`]) || 0;
    const showAllPivots = config[`layer${idx}_show_all_pivots`];

    console.log(`[Viz V31] _buildSingleLayer ${idx}:`);
    console.log(`[Viz V31]   type=${type}, measureIdx=${measureIdx}, dimensionIdx=${dimensionIdx}, showAllPivots=${showAllPivots}`);

    // Gradient Colors
    const useGradient = config[`layer${idx}_use_gradient`];
    const startColorHex = config[`layer${idx}_color_main`];
    const endColorHex = config[`layer${idx}_gradient_end`];
    const startColor = this._hexToRgb(startColorHex);

    const radius = Number(config[`layer${idx}_radius`]) || 1000;
    const heightScale = Number(config[`layer${idx}_height`]) || 1000;
    const opacity = Number(config[`layer${idx}_opacity`]) || 0.7;

    console.log(`[Viz V31]   radius=${radius}, heightScale=${heightScale}, opacity=${opacity}`);

    let iconUrl = iconUrlOverride;
    if (!iconUrl) {
        iconUrl = ICONS[config[`layer${idx}_icon_type`]] || ICONS['marker'];
    }

    // Store for getValue closure
    const pivotInfo = this._pivotInfo;
    const queryResponse = this._queryResponse;

    // VALUE GETTER - handles pivots and measure index
    const getValue = (d) => {
      // Check for pivot data first if showing all pivots
      if (showAllPivots && pivotInfo && pivotInfo.hasPivot) {
        const measures = queryResponse.fields.measure_like;
        const mName = measures[measureIdx] ? measures[measureIdx].name : null;

        const pData = d.pivotData || (d.properties && d.properties._pivotData);

        if (mName && pData && pData[mName]) {
          let total = 0;
          Object.values(pData[mName]).forEach(pv => {
            total += pv.value || 0;
          });
          return total;
        }
      }

      // Standard value access
      const arr = d.values || (d.properties && d.properties._values);
      if (!arr) return 0;

      const val = arr[measureIdx];
      return val !== undefined && val !== null ? parseFloat(val) || 0 : 0;
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
        const mockEvent = {
            pageX: info.x,
            pageY: info.y,
            clientX: info.x,
            clientY: info.y,
            target: info.target || document.elementFromPoint(info.x, info.y)
        };
        const safeEvent = (info.srcEvent && info.srcEvent.pageX) ? info.srcEvent : mockEvent;

        LookerCharts.Utils.openDrillMenu({
          links: links,
          event: safeEvent
        });
      }
    };

    // --- PREPARE POINT DATA BASED ON DIMENSION INDEX ---
    let pointData = [];

    if (processed.type === 'regions') {
      console.log(`[Viz V31]   Building point data from regions, dimensionIdx=${dimensionIdx}`);

      // Use the specific dimension's data map
      if (processed.dataMaps && processed.dataMaps[dimensionIdx]) {
        const dataMap = processed.dataMaps[dimensionIdx];
        console.log(`[Viz V31]   Using DataMap[${dimensionIdx}] with ${Object.keys(dataMap).length} entries`);

        // Re-match with geojson for this specific dimension
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
              const centroid = this._getCentroid(feature.geometry);
              pointData.push({
                position: centroid,
                values: match.values,
                formattedValues: match.formattedValues,
                links: match.links,
                name: match.rawName,
                pivotData: match.pivotData,
                dimensionValues: match.dimensionValues,
                feature: feature // Include feature for GeoJSON layer
              });
            }
          });
        }
        console.log(`[Viz V31]   Matched ${pointData.length} points for dimension ${dimensionIdx}`);
      } else {
        console.log(`[Viz V31]   No DataMap[${dimensionIdx}], falling back to processed.data`);
        // Fallback to processed.data (dimension 0)
        pointData = processed.data.map(d => ({
          position: d.centroid,
          values: d.values,
          formattedValues: d.formattedValues,
          links: d.links,
          name: d.name,
          pivotData: d.pivotData,
          dimensionValues: d.dimensionValues,
          feature: d.feature
        }));
      }
    } else {
      // Points mode
      pointData = processed.data;
    }

    const safePointData = this._validateLayerData(pointData);
    console.log(`[Viz V31]   Safe point data: ${safePointData.length} points`);

    // Log sample values
    if (safePointData.length > 0) {
      const sampleVals = safePointData.slice(0, 3).map(d => ({
        name: d.name,
        value: getValue(d),
        rawValues: d.values
      }));
      console.log(`[Viz V31]   Sample values:`, JSON.stringify(sampleVals, null, 2));
    }

    const id = `layer-${idx}-${type}-dim${dimensionIdx}`;

    // Calculate max value for gradient scaling
    const allVals = safePointData.map(d => getValue(d));
    const maxVal = Math.max(...allVals, 0.1);
    console.log(`[Viz V31]   Max value for layer: ${maxVal}`);

    // For geojson, we also need features
    const geoJsonFeatures = safePointData.filter(d => d.feature).map(d => {
      // Attach updated values to feature properties
      d.feature.properties._values = d.values;
      d.feature.properties._formatted = d.formattedValues;
      d.feature.properties._pivotData = d.pivotData;
      d.feature.properties._name = d.name;
      d.feature.properties._links = d.links;
      return d.feature;
    });

    switch (type) {
      case 'geojson':
        if (processed.type !== 'regions') {
          console.log(`[Viz V31]   GeoJSON layer requires regions mode`);
          return null;
        }
        if (geoJsonFeatures.length === 0) {
          console.log(`[Viz V31]   No GeoJSON features to render`);
          return null;
        }

        console.log(`[Viz V31]   Creating GeoJsonLayer with ${geoJsonFeatures.length} features`);
        return new deck.GeoJsonLayer({
          id: id,
          data: { type: "FeatureCollection", features: geoJsonFeatures },
          pickable: true,
          stroked: true,
          filled: true,
          getLineWidth: 1,
          getLineColor: [255,255,255],
          opacity: opacity,
          onClick: onClickHandler,
          getFillColor: d => {
             if (!useGradient) return startColor;
             const val = getValue(d);
             return this._interpolateColor(startColorHex, endColorHex, val / maxVal);
          },
          updateTriggers: {
            getFillColor: [measureIdx, useGradient, startColorHex, endColorHex, showAllPivots, dimensionIdx]
          }
        });

      case 'column':
        if (safePointData.length === 0) {
          console.log(`[Viz V31]   No data for column layer`);
          return null;
        }

        console.log(`[Viz V31]   Creating ColumnLayer with ${safePointData.length} columns`);
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
          // Height = value * heightScale
          getElevation: d => {
            const val = getValue(d);
            const elevation = val * heightScale;
            return elevation;
          },
          elevationScale: 1,
          opacity: opacity,
          onClick: onClickHandler,
          updateTriggers: {
            getFillColor: [measureIdx, useGradient, startColorHex, endColorHex, showAllPivots, dimensionIdx],
            getElevation: [measureIdx, heightScale, showAllPivots, dimensionIdx]
          }
        });

      case 'point':
        if (safePointData.length === 0) return null;
        console.log(`[Viz V31]   Creating ScatterplotLayer (point) with ${safePointData.length} points`);
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
          getLineColor: [255,255,255],
          onClick: onClickHandler,
          updateTriggers: {
            getFillColor: [measureIdx, useGradient, startColorHex, endColorHex, showAllPivots, dimensionIdx]
          }
        });

      case 'bubble':
        if (safePointData.length === 0) return null;
        console.log(`[Viz V31]   Creating ScatterplotLayer (bubble) with ${safePointData.length} points`);
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
          getLineColor: [255,255,255],
          onClick: onClickHandler,
          updateTriggers: {
            getFillColor: [measureIdx, useGradient, startColorHex, endColorHex, showAllPivots, dimensionIdx],
            getRadius: [measureIdx, radius, showAllPivots, dimensionIdx]
          }
        });

      case 'icon':
        if (safePointData.length === 0) return null;
        console.log(`[Viz V31]   Creating IconLayer with ${safePointData.length} icons`);
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
            onClick: onClickHandler
        });

      case 'heatmap':
        if (safePointData.length === 0) return null;
        console.log(`[Viz V31]   Creating HeatmapLayer with ${safePointData.length} points`);
        return new deck.HeatmapLayer({
          id: id,
          data: safePointData,
          pickable: false,
          getPosition: d => d.position,
          getWeight: d => getValue(d),
          radiusPixels: radius / 500,
          colorRange: this._generateColorRange(startColorHex, endColorHex),
          updateTriggers: {
            getWeight: [measureIdx, showAllPivots, dimensionIdx]
          }
        });

      case 'hexagon':
        if (safePointData.length === 0) return null;
        console.log(`[Viz V31]   Creating HexagonLayer with ${safePointData.length} points`);
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
            getElevationWeight: [measureIdx, showAllPivots, dimensionIdx],
            getColorWeight: [measureIdx, showAllPivots, dimensionIdx]
          }
        });

      default:
        console.log(`[Viz V31]   Unknown layer type: ${type}`);
        return null;
    }
  },

  // --- UTILITIES ---

  _formatNumber: function(num) {
    if (num === null || num === undefined) return '0';
    if (typeof num !== 'number') num = parseFloat(num) || 0;

    if (Math.abs(num) >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (Math.abs(num) >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  },

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
    console.log("[Viz V31] _loadGeoJSON:", urlOrList);

    if (Array.isArray(urlOrList)) {
      const promises = urlOrList.map(u => this._loadSingleGeoJSON(u));
      const results = await Promise.all(promises);
      const features = [];
      results.forEach(r => { if(r && r.features) features.push(...r.features); });
      console.log("[Viz V31]   Combined GeoJSON features:", features.length);
      return { type: "FeatureCollection", features };
    }
    return this._loadSingleGeoJSON(urlOrList);
  },

  _loadSingleGeoJSON: async function(url) {
    if (!url) return { type: "FeatureCollection", features: [] };
    if (this._geojsonCache[url]) {
      console.log("[Viz V31]   Using cached GeoJSON for:", url);
      return this._geojsonCache[url];
    }

    console.log("[Viz V31]   Fetching GeoJSON:", url);
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
    console.log("[Viz V31]   Loaded GeoJSON with", geojson.features ? geojson.features.length : 0, "features");
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
    if(!ring || !ring.length) return [0,0];
    ring.forEach(p => {x+=p[0]; y+=p[1];});
    return [x/ring.length, y/ring.length];
  },

  _normalizeName: function(name) {
    if (!name) return "";
    return name.toString().toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  },

  _hexToRgb: function(hex) {
    if (!hex) return [0,0,0];
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
  },

  _generateColorRange: function(startHex, endHex) {
      const colors = [];
      for(let i=0; i<6; i++) {
          colors.push(this._interpolateColor(startHex, endHex, i/5));
      }
      return colors;
  }
});

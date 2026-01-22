/**
 * Multi-Layer 3D Map for Looker - v43 (Shotgun Test)
 * * FIXES:
 * 1. Tooltip Pivot Totals: Uses Dimension Aggregation (V42 logic).
 * 2. Icons: "Shotgun" approach. 15 different URL sources to test CORS.
 * 3. Icon Tilt: Fixed with 'billboard: true'.
 * 4. Dimension Indices: Fixed lookup logic in tooltip.
 */

// --- ICONS: SHOTGUN TEST SUITE ---
// We test different CDNs and Formats to see what passes your specific CORS rules.
const ICONS = {
  // 1. KNOWN WORKING (User Provided)
  "truck": "https://static.vecteezy.com/system/resources/thumbnails/035/907/415/small/ai-generated-blue-semi-truck-with-trailer-isolated-on-transparent-background-free-png.png",

  // 2. WIKIMEDIA (Usually CORS Friendly)
  "marker": "https://upload.wikimedia.org/wikipedia/commons/8/88/Map_marker.svg",

  // 3. GITHUB RAW (Usually CORS Friendly)
  "map_pin": "https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/map-pin.svg",

  // 4. CLOUDINARY (Optimized CDN)
  "shop": "https://res.cloudinary.com/demo/image/upload/w_64/shopping_cart.png",

  // 5. ICONS8 (Direct PNG)
  "factory": "https://img.icons8.com/color/96/factory.png",

  // 6. FLATICON (Direct via CDN)
  "warning": "https://cdn-icons-png.flaticon.com/128/179/179386.png",

  // 7. GOOGLE FONTS (Material Symbols SVG)
  "circle": "https://fonts.gstatic.com/s/i/materialicons/circle/v4/24px.svg",

  // 8. PLACEHOLDER (Test Service)
  "star": "https://via.placeholder.com/64/FFFF00/000000?text=*",

  // 9. DATA URI (Base64 - 100% Safe, no Network)
  "check": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADG0lEQVR4nO2bT0gUURzHP2921z+rW0tE2E1CBMMgOewWQRAZdIogCLoE0S136RYdnTq0Q5cIOrgEdQ+dQzqE0CKCiIikJSp2t01/dnbG9+08nZ11d2Z3Vkd94PDezLw37/P9/b6/35sZ7FCHOnScYJqmV0pNKaUmlFJD/6kYyWTuw798wphS6rFS6iVwHzjTqgCmaQ4qpW4rpc45fN0FvAMeK6Xu2badb6Vv1zJASuY6cNOh833AVeC+bds5P336CiCl1KBSasHhcwH4aNt21i9/vgJIyVwFrjl87QLe2rad8dOfZwAppc4Ajxy+FgEfbNvO+u3Tk/ewwSjQrwzD6A0EAn2RSGQwEomMhcPha4FAQE3TFCADZJRSGWAzGo0+T6VSL9Lp9FvbtnPe+rMCuAPM2bY9V8/3XQFIL0g3mFzP990AGaXUDDDTy/ddAewHbgF36v2+K4A5YCbwL5h6AewHrgP3gJv1ft8VwF3gGvAImK33+64A8gN/n3T7y+f7rgDsB64A94GZej9wBWBKqTFgxvXzXQHsB64A94Hper/vCsB0g/R+388A0g3S+30/A0g3SO/3XQFM0xzmD3nXd/0MIL0gvd/3M4D0gvR+388A0g3S+30/A0g3SO/3/QwgvSC93/czgPSC9H7fz74PMAyjNxAI9EUikcFIJDIWDof7A4GANU1T1Nn/AeR/gWw0Gn2eSqVepNPpt7Zt5+r8wN8l0zQHgVEHwfPAoG3b2Vb6di0DAH0Ogv3ANdu2c6306yuAlMwl4JpD51vAB9u2M3769BVASqmjSqmHwBWHr7vAe+Chbdu5Vvr2FcA0TS+wopQ6p5QadPiaB94pZV6zLLvQqtB/36b8t2maXkopTyk1opQadBA4C7wDHjHLyrQywI/x36ZpDvo0/t1/3f8H/wP+B/wP+B/wP+B/wP+A/wH/A/4H/A/4H/A/4H/A/4H/AfqeYJqm10GgG9jP/z5gC8gAy8Cybdv5Vv5/q0L/A4N5y/55Fq+6AAAAAElFTkSuQmCC",

  // 10. WIKIMEDIA PNG
  "euro": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Euro_Symbol.svg/64px-Euro_Symbol.svg.png",

  // 11. WORLD BANK (Test)
  "dollar": "https://data.worldbank.org/assets/images/logo-wb-header-en.svg",

  // 12. CLOUDFRONT (AWS CDN)
  "info": "https://d1.awsstatic.com/serverless/Lambda/lambda_logo.png",

  // 13. IMGUR (Often blocked, but worth a shot)
  "heart": "https://i.imgur.com/gL8mUaR.png",

  // 14. SIMPLE SVG
  "square": "https://upload.wikimedia.org/wikipedia/commons/1/18/Blue_Square.svg",

  // 15. DEFAULT FALLBACK
  "default": "https://static.vecteezy.com/system/resources/thumbnails/035/907/415/small/ai-generated-blue-semi-truck-with-trailer-isolated-on-transparent-background-free-png.png"
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
    [`layer${n}_dimension_idx`]: {
      type: "string",
      label: `L${n} Dimension Indices (Comma sep)`,
      default: "0",
      section: "Layers",
      order: b + 4,
      placeholder: "e.g. 0 or 0,1"
    },
    [`layer${n}_measure_idx`]: {
      type: "string",
      label: `L${n} Measure Indices (Comma sep)`,
      default: `${n - 1}`,
      section: "Layers",
      order: b + 5,
      placeholder: "e.g. 0 or 0,1 (Sums values)"
    },
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
    [`layer${n}_icon_type`]: {
      type: "string",
      label: `L${n} Icon Preset (CORS Test)`,
      display: "select",
      values: [
        { "Custom URL": "custom" },
        { "1. Truck (Vecteezy)": "truck" },
        { "2. Marker (Wiki - SVG)": "marker" },
        { "3. Map Pin (GitHub Raw)": "map_pin" },
        { "4. Shop (Cloudinary)": "shop" },
        { "5. Factory (Icons8)": "factory" },
        { "6. Warning (Flaticon)": "warning" },
        { "7. Circle (Google Fonts)": "circle" },
        { "8. Star (Placeholder)": "star" },
        { "9. Check (Base64 DataURI)": "check" },
        { "10. Euro (Wiki PNG)": "euro" },
        { "11. Dollar (World Bank)": "dollar" },
        { "12. Info (Cloudfront)": "info" },
        { "13. Heart (Imgur)": "heart" },
        { "14. Square (Wiki SVG)": "square" }
      ],
      default: "truck",
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

// --- HELPER: SIMPLE PRELOADER (With CrossOrigin) ---
// Reverted to simple loader to avoid InvalidStateError,
// but keeps crossOrigin set to anonymous.
const preloadImage = (type, customUrl) => {
  return new Promise((resolve) => {
    let url = ICONS[type] || customUrl;
    // Fallback to truck if undefined
    if (!url || url.length < 5) url = ICONS['truck'];

    // Base64 is always safe
    if (url.startsWith("data:")) return resolve(url);

    const img = new Image();
    // This is required for WebGL textures
    img.crossOrigin = "Anonymous";

    img.onload = () => resolve(url);
    img.onerror = () => {
      console.warn(`[Viz V43] CORS/Load Error for: ${url}`);
      // Fallback to Base64 checkmark if fetch fails
      resolve(ICONS['check']);
    };
    img.src = url;
  });
};

looker.plugins.visualizations.add({
  id: "combo_map_ultimate_v43",
  label: "Combo Map 3D (V43 Shotgun)",
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
        .deck-tooltip {
            font-family: "Open Sans", "Helvetica", sans-serif;
            font-size: 12px;
            pointer-events: none;
            line-height: 1.4;
        }
        .tooltip-header {
            font-size: 13px;
            font-weight: 600;
            border-bottom: 1px solid #ddd;
            padding-bottom: 4px;
            margin-bottom: 6px;
            color: #333;
        }
        .pivot-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 4px;
        }
        .pivot-row {
            display: flex;
            justify-content: space-between;
            gap: 12px;
        }
        .pivot-key {
            color: #666;
            text-align: left;
        }
        .pivot-val {
            font-weight: 600;
            text-align: right;
            color: #111;
        }
        .total-row {
            border-top: 1px solid #eee;
            margin-top: 4px;
            padding-top: 4px;
            font-weight: 600;
            color: #333;
        }
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
    this._processedData = null; // Store for tooltip lookup
  },

  destroy: function () {
    if (this._deck) {
      this._deck.finalize();
      this._deck = null;
    }
    this._geojsonCache = {};
  },

  updateAsync: function (data, element, config, queryResponse, details, done) {
    const isPrint = details && details.print;
    console.log(`[Viz V43] Update Start. Rows: ${data.length}`);

    this.clearErrors();

    if (!config.mapbox_token) {
      this._tokenError.style.display = 'block';
      done();
      return;
    } else {
      this._tokenError.style.display = 'none';
    }

    if (typeof deck === 'undefined' || typeof mapboxgl === 'undefined') {
      this.addError({ title: "Missing Dependencies", message: "Add deck.gl and mapbox-gl to manifest." });
      done();
      return;
    }

    this._queryResponse = queryResponse;
    this._pivotInfo = this._detectPivots(queryResponse);

    // --- PRELOAD ICONS (Standard Loader) ---
    const iconPromises = [];
    for (let i = 1; i <= 4; i++) {
      if (config[`layer${i}_enabled`] && config[`layer${i}_type`] === 'icon') {
        const preset = config[`layer${i}_icon_type`];
        const custom = config[`layer${i}_icon_url`];
        iconPromises.push(preloadImage(preset, custom));
      } else {
        iconPromises.push(Promise.resolve(null)); // Placeholder to keep index alignment
      }
    }

    Promise.all([
      this._prepareData(data, config, queryResponse),
      ...iconPromises
    ]).then(([processedData, ...loadedIcons]) => {

      // Save for Tooltip Lookup (V42 Logic)
      this._processedData = processedData;

      console.log(`[Viz V43] Rendering layers...`);
      this._render(processedData, config, queryResponse, details, loadedIcons);

      if (isPrint) {
        if (this._deck) this._deck.redraw(true);
        setTimeout(() => done(), 2000);
      } else {
        done();
      }

    }).catch(err => {
      console.error("[Viz V43] FATAL ERROR:", err);
      this.addError({ title: "Error", message: err.message });
      done();
    });
  },

  // --- DETECT PIVOTS ---
  _detectPivots: function (queryResponse) {
    const pivotFields = queryResponse.fields.pivots || [];
    if (pivotFields.length === 0) {
      return { hasPivot: false, pivotKeys: [], pivotField: null, pivotLabels: [] };
    }
    const pivotKeys = queryResponse.pivots ? queryResponse.pivots.map(p => p.key) : [];
    const pivotLabels = queryResponse.pivots ? queryResponse.pivots.map(p => {
      if (typeof p.data === 'object') return Object.values(p.data).join(' | ');
      return p.key;
    }) : pivotKeys;

    return { hasPivot: true, pivotKeys, pivotField: pivotFields[0], pivotLabels };
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

    // B. REGION MODE
    const url = this._getGeoJSONUrl(config);
    let geojson = null;
    try {
      geojson = await this._loadGeoJSON(url);
    } catch (error) {
      console.warn("[Viz V43] GeoJSON load failed:", error);
      geojson = { type: "FeatureCollection", features: [] };
    }

    const dataMaps = this._buildDataMaps(data, dims, measures);
    return {
      type: 'regions',
      dataMaps: dataMaps,
      geojson: geojson,
      measures,
      dims
    };
  },

  // --- EXTRACT ROW DATA ---
  _extractRowData: function (row, measures, dims, rowIdx) {
    const hasPivot = this._pivotInfo && this._pivotInfo.hasPivot;
    const pivotKeys = this._pivotInfo.pivotKeys;

    // 1. NON-PIVOT
    if (!hasPivot) {
      return {
        values: measures.map(m => row[m.name] ? parseFloat(row[m.name].value) || 0 : 0),
        formattedValues: measures.map(m => row[m.name] ? (row[m.name].rendered || row[m.name].value) : ''),
        drillLinks: measures.map(m => row[m.name] ? row[m.name].links : []),
        dimensionValues: dims.map(d => row[d.name] ? row[d.name].value : ''),
        pivotData: null
      };
    }

    // 2. PIVOTED
    const pivotData = {};
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

    const values = [];
    measures.forEach((m) => {
      let total = 0;
      pivotKeys.forEach(pk => {
        if (pivotData[m.name] && pivotData[m.name][pk]) {
          total += pivotData[m.name][pk].value;
        }
      });
      values.push(total);
    });

    return {
      values,
      formattedValues: values.map(v => v.toString()),
      drillLinks: [],
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
            existing.values = existing.values.map((v, i) => v + (rowData.values[i] || 0));

            if (rowData.pivotData && existing.pivotData) {
              Object.keys(rowData.pivotData).forEach(mName => {
                Object.keys(rowData.pivotData[mName]).forEach(pk => {
                  if (!existing.pivotData[mName]) existing.pivotData[mName] = {};
                  if (!existing.pivotData[mName][pk]) {
                    existing.pivotData[mName][pk] = { ...rowData.pivotData[mName][pk] };
                  } else {
                    existing.pivotData[mName][pk].value += rowData.pivotData[mName][pk].value;
                    if (rowData.pivotData[mName][pk].links) {
                      existing.pivotData[mName][pk].links.push(...rowData.pivotData[mName][pk].links);
                    }
                  }
                });
              });
            }
          } else {
            dataMaps[dimIdx][clean] = {
              ...rowData,
              drillLinks: rowData.drillLinks ? rowData.drillLinks.map(l => [...l]) : [],
              rawName: rawName
            };
          }
        }
      });
    });
    return dataMaps;
  },

  // --- RENDER ---
  _render: function (processed, config, queryResponse, details, loadedIcons) {
    const layerObjects = [];

    // Only map icons to enabled layers to preserve order
    let iconUrlMap = {};
    let iconLoadIdx = 0;
    for(let i=1; i<=4; i++) {
        // loadedIcons array maps 1:1 to layers 1-4 (null if disabled)
        iconUrlMap[i] = loadedIcons[i-1];
    }

    for (let i = 1; i <= 4; i++) {
      const enabled = config[`layer${i}_enabled`];
      const type = config[`layer${i}_type`];

      if (enabled) {
        try {
          const iconUrl = iconUrlMap[i];
          const layer = this._buildSingleLayer(i, config, processed, iconUrl);
          if (layer) {
            const z = Number(config[`layer${i}_z_index`]) || i;
            layerObjects.push({ layer: layer, zIndex: z });
          }
        } catch (e) {
          console.error(`[Viz V43] Layer ${i} Error:`, e);
        }
      }
    }

    layerObjects.sort((a, b) => a.zIndex - b.zIndex);
    const layers = layerObjects.map(obj => obj.layer);

    // --- TOOLTIP (V42 Logic + LookML Formatting) ---
    const getTooltip = ({ object, layer }) => {
      if (!object || config.tooltip_mode === 'none') return null;

      // 1. Identify which layer we are on to get specific Dimension Index
      const layerMatch = layer && layer.id ? layer.id.match(/^layer-(\d+)-/) : null;
      const layerIdx = layerMatch ? parseInt(layerMatch[1]) : null;

      // Fix: Correctly parse the dimension index for this specific layer
      let layerDimIdx = 0;
      if (layerIdx) {
          const dimStr = config[`layer${layerIdx}_dimension_idx`];
          // Handle '0', '0,1', etc.
          if (dimStr !== undefined && dimStr !== null) {
              const parts = String(dimStr).split(',');
              const firstVal = parseInt(parts[0].trim());
              if (!isNaN(firstVal)) layerDimIdx = firstVal;
          }
      }

      // 2. Identify the object name to lookup
      const props = object.properties || object;
      const rawName = props._name || props.name || "Unknown";
      const cleanName = this._normalizeName(rawName);

      // 3. Lookup AGGREGATED pivot totals (The V42 Fix)
      // Use the global map instead of the single feature
      let aggregatedData = null;
      if (this._processedData &&
          this._processedData.dataMaps &&
          this._processedData.dataMaps[layerDimIdx] &&
          this._processedData.dataMaps[layerDimIdx][cleanName]) {
          aggregatedData = this._processedData.dataMaps[layerDimIdx][cleanName];
      }

      // Fallback if aggregation fails
      const source = aggregatedData || props;
      const pivotData = source.pivotData || source._pivotData;
      const values = source.values || source._values || [];
      const allowedMeasures = props._allowedMeasures || props.allowedMeasures;

      let html = "";
      if (config.tooltip_mode !== 'values') {
        html += `<div class="tooltip-header">${source.rawName || rawName}</div>`;
      }

      const measures = queryResponse.fields.measure_like;
      const showAllPivots = layerIdx ? config[`layer${layerIdx}_show_all_pivots`] : true;
      const pivotIdx = layerIdx ? (Number(config[`layer${layerIdx}_pivot_idx`]) || 0) : 0;

      if (config.tooltip_mode !== 'name') {
        measures.forEach((m, idx) => {
          if (allowedMeasures && !allowedMeasures.includes(idx)) return;

          if (pivotData && this._pivotInfo && this._pivotInfo.hasPivot) {
            html += `<div style="font-size:11px; color:#666; margin-top:6px;">${m.label_short || m.label}</div>`;
            html += `<div class="pivot-table">`;

            if (showAllPivots) {
              let dimensionFilteredTotal = 0;
              this._pivotInfo.pivotKeys.forEach((pk, pIdx) => {
                const pivotLabel = this._pivotInfo.pivotLabels[pIdx] || pk;
                const pData = pivotData[m.name] && pivotData[m.name][pk];
                let val = '0';
                if (pData) {
                  dimensionFilteredTotal += pData.value;
                  val = this._applyLookerFormat(pData.value, m.value_format);
                }
                html += `<div class="pivot-row"><span class="pivot-key">${pivotLabel}</span><span class="pivot-val">${val}</span></div>`;
              });

              const totalVal = this._applyLookerFormat(dimensionFilteredTotal, m.value_format);
              html += `<div class="pivot-row total-row"><span class="pivot-key">Total</span><span class="pivot-val">${totalVal}</span></div>`;
            } else {
              const pk = this._pivotInfo.pivotKeys[pivotIdx];
              const pivotLabel = this._pivotInfo.pivotLabels[pivotIdx] || pk;
              const pData = pivotData[m.name] && pivotData[m.name][pk];
              let val = pData ? this._applyLookerFormat(pData.value, m.value_format) : '0';
              html += `<div class="pivot-row"><span class="pivot-key">${pivotLabel}</span><span class="pivot-val">${val}</span></div>`;
            }
            html += `</div>`;
          } else {
            const val = this._applyLookerFormat(values[idx], m.value_format);
            html += `<div class="pivot-row" style="margin-top:2px;"><span class="pivot-key">${m.label_short || m.label}</span><span class="pivot-val">${val}</span></div>`;
          }
        });
      }

      return {
        html,
        style: {
          backgroundColor: config.tooltip_bg_color || '#fff',
          color: '#333',
          padding: '10px',
          borderRadius: '4px',
          boxShadow: '0 3px 10px rgba(0,0,0,0.2)',
          minWidth: '150px'
        }
      };
    };

    // --- VIEW STATE ---
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
        glOptions: { preserveDrawingBuffer: true }
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
      !isNaN(d.position[1])
    );
  },

  // --- BUILD SINGLE LAYER ---
  _buildSingleLayer: function (idx, config, processed, iconUrlOverride) {
    const type = config[`layer${idx}_type`];

    const rawM = config[`layer${idx}_measure_idx`];
    const measureStr = (rawM === undefined || rawM === null) ? String(idx - 1) : String(rawM);
    const measureIndices = measureStr.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
    if (measureIndices.length === 0) measureIndices.push(0);

    const rawD = config[`layer${idx}_dimension_idx`];
    const dimStr = (rawD === undefined || rawD === null) ? "0" : String(rawD);
    const dimIndices = dimStr.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));

    const showAllPivots = config[`layer${idx}_show_all_pivots`];
    const pivotIdx = Number(config[`layer${idx}_pivot_idx`]) || 0;

    const useGradient = config[`layer${idx}_use_gradient`];
    const startColorHex = config[`layer${idx}_color_main`];
    const endColorHex = config[`layer${idx}_gradient_end`];
    const startColor = this._hexToRgb(startColorHex);
    const radius = Number(config[`layer${idx}_radius`]) || 1000;
    const heightScale = Number(config[`layer${idx}_height`]) || 1000;
    const opacity = Number(config[`layer${idx}_opacity`]) || 0.7;

    const pivotInfo = this._pivotInfo;
    const queryResponse = this._queryResponse;
    const measures = queryResponse.fields.measure_like;

    const getValue = (d) => {
      let totalValue = 0;
      measureIndices.forEach(mIdx => {
        if (mIdx < 0) return;
        if (!pivotInfo || !pivotInfo.hasPivot) {
          const arr = d.values || (d.properties && d.properties._values);
          if (arr && arr[mIdx] !== undefined) {
            totalValue += parseFloat(arr[mIdx]) || 0;
          }
        } else {
          const mName = measures[mIdx] ? measures[mIdx].name : null;
          if (showAllPivots) {
            const arr = d.values || (d.properties && d.properties._values);
            if (arr && arr[mIdx] !== undefined) totalValue += parseFloat(arr[mIdx]) || 0;
          } else {
            const pKey = pivotInfo.pivotKeys[pivotIdx];
            const pData = d.pivotData || (d.properties && d.properties._pivotData);
            if (mName && pKey && pData && pData[mName] && pData[mName][pKey]) {
              totalValue += (pData[mName][pKey].value || 0);
            }
          }
        }
      });
      return totalValue;
    };

    const onClickHandler = (info) => {
      if (!info || !info.object) return;

      // Use the global map lookup again for drilling to get aggregated links
      const props = info.object.properties || info.object;
      const cleanName = this._normalizeName(props._name || props.name);

      let aggregatedData = null;
      if (this._processedData &&
          this._processedData.dataMaps &&
          this._processedData.dataMaps[dimIndices[0]] &&
          this._processedData.dataMaps[dimIndices[0]][cleanName]) {
          aggregatedData = this._processedData.dataMaps[dimIndices[0]][cleanName];
      }

      const source = aggregatedData || props;
      const pivotData = source.pivotData || source._pivotData;
      const drillLinks = source.drillLinks || source._drillLinks;

      let finalLinks = [];

      if (!pivotInfo.hasPivot && drillLinks) {
        measureIndices.forEach(mIdx => {
          if (drillLinks[mIdx]) finalLinks.push(...drillLinks[mIdx]);
        });
      }
      else if (pivotInfo.hasPivot && pivotData) {
        measureIndices.forEach(mIdx => {
          const mName = measures[mIdx] ? measures[mIdx].name : null;
          if (!mName || !pivotData[mName]) return;

          if (showAllPivots) {
            Object.values(pivotData[mName]).forEach(pVal => {
              if (pVal.links) finalLinks.push(...pVal.links);
            });
          } else {
            const pKey = pivotInfo.pivotKeys[pivotIdx];
            if (pKey && pivotData[mName][pKey] && pivotData[mName][pKey].links) {
              finalLinks.push(...pivotData[mName][pKey].links);
            }
          }
        });
      }

      finalLinks = finalLinks.map((link, linkIdx) => {
        const measureIdx = measureIndices[Math.floor(linkIdx / (Math.max(1, finalLinks.length) / measureIndices.length))];
        const measure = measures[measureIdx];
        return {
          ...link,
          label: link.label || (measure ? measure.label_short || measure.label : "Show All")
        };
      });

      if (finalLinks.length > 0) {
        LookerCharts.Utils.openDrillMenu({
          links: finalLinks,
          event: { pageX: info.x, pageY: info.y, clientX: info.x, clientY: info.y }
        });
      }
    };

    let pointData = [];
    if (processed.type === 'regions') {
      dimIndices.forEach(dimIdx => {
        const dataMap = processed.dataMaps ? processed.dataMaps[dimIdx] : null;
        if (!dataMap) return;

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
                pivotData: match.pivotData,
                drillLinks: match.drillLinks,
                name: match.rawName,
                feature: feature,
                allowedMeasures: measureIndices
              });
            }
          });
        }
      });
    } else {
      pointData = processed.data.map(p => ({ ...p, allowedMeasures: measureIndices }));
    }

    const safePointData = this._validateLayerData(pointData);
    const id = `layer-${idx}-${type}`;
    const allVals = safePointData.map(d => getValue(d));
    const maxVal = Math.max(...allVals, 0.1);
    const updateTriggersBase = [measureStr, dimStr, useGradient, startColorHex, endColorHex, showAllPivots, pivotIdx];

    const geoJsonFeatures = safePointData.filter(d => d.feature).map(d => {
      d.feature.properties._values = d.values;
      d.feature.properties._pivotData = d.pivotData;
      d.feature.properties._drillLinks = d.drillLinks;
      d.feature.properties._name = d.name;
      d.feature.properties._allowedMeasures = d.allowedMeasures;
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
        return new deck.ColumnLayer({
          id: id,
          data: safePointData,
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
          updateTriggers: { getFillColor: updateTriggersBase }
        });

      case 'point':
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
          onClick: onClickHandler,
          updateTriggers: { getFillColor: updateTriggersBase }
        });

      case 'bubble':
        return new deck.ScatterplotLayer({
          id: id,
          data: safePointData,
          pickable: true,
          opacity: opacity,
          stroked: true,
          filled: true,
          getPosition: d => d.position,
          getRadius: d => Math.sqrt(getValue(d) / maxVal) * radius,
          getFillColor: d => {
            if (!useGradient) return startColor;
            const val = getValue(d);
            return this._interpolateColor(startColorHex, endColorHex, val / maxVal);
          },
          onClick: onClickHandler,
          updateTriggers: { getFillColor: updateTriggersBase, getRadius: [...updateTriggersBase, radius] }
        });

      case 'icon':
        return new deck.IconLayer({
          id: id,
          data: safePointData,
          pickable: true,
          opacity: opacity,
          iconAtlas: iconUrlOverride || ICONS['truck'],
          iconMapping: { marker: { x: 0, y: 0, width: 128, height: 128, mask: false } },
          getIcon: d => 'marker',
          getPosition: d => d.position,
          getSize: d => radius / 100,
          sizeScale: 1,
          sizeMinPixels: 20,
          // FIX: Billboard true keeps icons facing camera (no tilting)
          billboard: true,
          onClick: onClickHandler
        });

      case 'heatmap':
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
          updateTriggers: { getElevationWeight: updateTriggersBase }
        });

      default: return null;
    }
  },

  // --- UTILITIES ---

  _applyLookerFormat: function (value, formatStr) {
    if (value === undefined || value === null) return '0';
    if (!formatStr) return this._formatNumber(value);
    let str = value.toString();
    if (formatStr.includes('$')) str = '$' + this._formatNumber(value);
    else if (formatStr.includes('€')) str = '€' + this._formatNumber(value);
    else if (formatStr.includes('£')) str = '£' + this._formatNumber(value);
    else if (formatStr.includes('%')) str = (value * 100).toFixed(1) + '%';
    else if (formatStr.toLowerCase().includes('"k"')) str = this._formatNumber(value);
    else str = this._formatNumber(value);
    return str;
  },

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

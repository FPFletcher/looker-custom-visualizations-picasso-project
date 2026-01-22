/**
 * Multi-Layer 3D Map for Looker - v42 Critical Fixes
 *
 * UPDATES FROM v41:
 * - FIXED: Icon URLs changed to Vecteezy (CORS-compatible)
 * - FIXED: billboard=true for icons (no tilting)
 * - FIXED: Tooltip dimension aggregation (not first row)
 */

// --- CDN-HOSTED ICONS (PNG ONLY - SVG causes deck.gl errors) ---
const ICONS = {
  // === LOCATION & MAP ICONS ===
  "marker": "https://static.vecteezy.com/system/resources/thumbnails/017/178/337/small/location-pin-icon-map-pointer-marker-on-transparent-background-free-png.png",
  "map_pin": "https://static.vecteezy.com/system/resources/thumbnails/017/178/337/small/location-pin-icon-map-pointer-marker-on-transparent-background-free-png.png",
  "location_pin": "https://em-content.zobj.net/thumbs/120/google/350/round-pushpin_1f4cd.png",
  "location_filled": "https://em-content.zobj.net/thumbs/120/google/350/pushpin_1f4cc.png",

  // === BUSINESS & COMMERCE ===
  "shop": "https://em-content.zobj.net/thumbs/120/google/350/convenience-store_1f3ea.png",
  "shopping_cart": "https://em-content.zobj.net/thumbs/120/google/350/shopping-cart_1f6d2.png",
  "building": "https://em-content.zobj.net/thumbs/120/google/350/office-building_1f3e2.png",
  "warehouse": "https://em-content.zobj.net/thumbs/120/google/350/department-store_1f3ec.png",

  // === TRANSPORTATION ===
  "truck": "https://static.vecteezy.com/system/resources/thumbnails/035/907/415/small/ai-generated-blue-semi-truck-with-trailer-isolated-on-transparent-background-free-png.png",
  "truck_fast": "https://em-content.zobj.net/thumbs/120/google/350/racing-car_1f3ce-fe0f.png",
  "plane": "https://em-content.zobj.net/thumbs/120/google/350/airplane_2708-fe0f.png",
  "ship": "https://em-content.zobj.net/thumbs/120/google/350/ship_1f6a2.png",
  "car": "https://em-content.zobj.net/thumbs/120/google/350/automobile_1f697.png",
  "train": "https://em-content.zobj.net/thumbs/120/google/350/locomotive_1f682.png",

  // === STATUS & ALERTS ===
  "warning": "https://em-content.zobj.net/thumbs/120/google/350/warning_26a0-fe0f.png",
  "warning_triangle": "https://em-content.zobj.net/thumbs/120/google/350/warning_26a0-fe0f.png",
  "alert": "https://em-content.zobj.net/thumbs/120/google/350/exclamation-mark_2757.png",
  "info": "https://em-content.zobj.net/thumbs/120/google/350/information_2139-fe0f.png",
  "check": "https://em-content.zobj.net/thumbs/120/google/350/check-mark_2714-fe0f.png",
  "error": "https://em-content.zobj.net/thumbs/120/google/350/cross-mark_274c.png",

  // === SHAPES & BASIC ===
  "circle": "https://em-content.zobj.net/thumbs/120/google/350/blue-circle_1f535.png",
  "star": "https://em-content.zobj.net/thumbs/120/google/350/star_2b50.png",
  "star_outline": "https://em-content.zobj.net/thumbs/120/google/350/white-medium-star_2b50.png",
  "square": "https://em-content.zobj.net/thumbs/120/google/350/blue-square_1f7e6.png",
  "heart": "https://em-content.zobj.net/thumbs/120/google/350/red-heart_2764-fe0f.png",
  "flag": "https://em-content.zobj.net/thumbs/120/google/350/triangular-flag_1f6a9.png",

  // === INDUSTRY & FACILITIES ===
  "factory": "https://em-content.zobj.net/thumbs/120/google/350/factory_1f3ed.png",
  "hospital": "https://em-content.zobj.net/thumbs/120/google/350/hospital_1f3e5.png",
  "school": "https://em-content.zobj.net/thumbs/120/google/350/school_1f3eb.png",
  "hotel": "https://em-content.zobj.net/thumbs/120/google/350/hotel_1f3e8.png",
  "gas_station": "https://em-content.zobj.net/thumbs/120/google/350/fuel-pump_26fd.png",

  // === PEOPLE & USERS ===
  "user": "https://em-content.zobj.net/thumbs/120/google/350/bust-in-silhouette_1f464.png",
  "users": "https://em-content.zobj.net/thumbs/120/google/350/busts-in-silhouette_1f465.png",
  "person": "https://em-content.zobj.net/thumbs/120/google/350/person_1f9d1.png",

  // === FOOD & DINING ===
  "restaurant": "https://em-content.zobj.net/thumbs/120/google/350/fork-and-knife_1f374.png",
  "coffee": "https://em-content.zobj.net/thumbs/120/google/350/hot-beverage_2615.png",
  "pizza": "https://em-content.zobj.net/thumbs/120/google/350/pizza_1f355.png",

  // === NATURE & ENVIRONMENT ===
  "tree": "https://em-content.zobj.net/thumbs/120/google/350/deciduous-tree_1f333.png",
  "leaf": "https://em-content.zobj.net/thumbs/120/google/350/leaf-fluttering-in-wind_1f343.png",
  "mountain": "https://em-content.zobj.net/thumbs/120/google/350/mountain_26f0-fe0f.png",
  "water": "https://em-content.zobj.net/thumbs/120/google/350/droplet_1f4a7.png",

  // === TECHNOLOGY & DEVICES ===
  "phone": "https://em-content.zobj.net/thumbs/120/google/350/telephone_260e-fe0f.png",
  "computer": "https://em-content.zobj.net/thumbs/120/google/350/desktop-computer_1f5a5-fe0f.png",
  "wifi": "https://em-content.zobj.net/thumbs/120/google/350/antenna-bars_1f4f6.png",
  "signal": "https://em-content.zobj.net/thumbs/120/google/350/mobile-phone_1f4f1.png",

  // === FINANCIAL ===
  "dollar": "https://em-content.zobj.net/thumbs/120/google/350/dollar-banknote_1f4b5.png",
  "euro": "https://em-content.zobj.net/thumbs/120/google/350/euro-banknote_1f4b6.png",
  "bank": "https://em-content.zobj.net/thumbs/120/google/350/bank_1f3e6.png",

  // === WEATHER ===
  "sun": "https://em-content.zobj.net/thumbs/120/google/350/sun_2600-fe0f.png",
  "cloud": "https://em-content.zobj.net/thumbs/120/google/350/cloud_2601-fe0f.png",
  "rain": "https://em-content.zobj.net/thumbs/120/google/350/cloud-with-rain_1f327-fe0f.png",
  "snow": "https://em-content.zobj.net/thumbs/120/google/350/snowflake_2744-fe0f.png"
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
      label: `L${n} Icon Preset`,
      display: "select",
      values: [
        { "Custom URL": "custom" },
        { "Alert": "alert" },
        { "Bank": "bank" },
        { "Building": "building" },
        { "Car": "car" },
        { "Check/Success": "check" },
        { "Circle": "circle" },
        { "Cloud": "cloud" },
        { "Coffee": "coffee" },
        { "Computer": "computer" },
        { "Dollar": "dollar" },
        { "Error": "error" },
        { "Euro": "euro" },
        { "Factory": "factory" },
        { "Flag": "flag" },
        { "Gas Station": "gas_station" },
        { "Heart": "heart" },
        { "Hospital": "hospital" },
        { "Hotel": "hotel" },
        { "Info": "info" },
        { "Leaf": "leaf" },
        { "Location Filled": "location_filled" },
        { "Location Pin": "location_pin" },
        { "Map Pin": "map_pin" },
        { "Marker": "marker" },
        { "Mountain": "mountain" },
        { "Person": "person" },
        { "Phone": "phone" },
        { "Pizza": "pizza" },
        { "Plane": "plane" },
        { "Rain": "rain" },
        { "Restaurant": "restaurant" },
        { "School": "school" },
        { "Ship": "ship" },
        { "Shop/Store": "shop" },
        { "Shopping Cart": "shopping_cart" },
        { "Signal": "signal" },
        { "Snow": "snow" },
        { "Square": "square" },
        { "Star": "star" },
        { "Star Outline": "star_outline" },
        { "Sun": "sun" },
        { "Train": "train" },
        { "Tree": "tree" },
        { "Truck": "truck" },
        { "Truck Fast": "truck_fast" },
        { "User": "user" },
        { "Users": "users" },
        { "Warehouse": "warehouse" },
        { "Warning": "warning" },
        { "Warning Triangle": "warning_triangle" },
        { "Water": "water" },
        { "WiFi": "wifi" }
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

// --- HELPER: PRELOADER ---
const preloadImage = (type, customUrl) => {
  return new Promise((resolve) => {
    let url = ICONS[type] || customUrl;
    if (url && url.startsWith("data:")) return resolve(url);
    if (!url || url.length < 5) return resolve(ICONS['marker']);
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => resolve(url);
    img.onerror = () => {
      console.warn(`[Viz V42] Failed to load icon: ${url}`);
      resolve(ICONS['marker']);
    };
    img.src = url;
  });
};

looker.plugins.visualizations.add({
  id: "combo_map_ultimate_v41",
  label: "Combo Map 3D (V41 Fixed)",
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
    if (this._deck) {
      this._deck.finalize();
      this._deck = null;
    }
    this._geojsonCache = {};
  },

  updateAsync: function (data, element, config, queryResponse, details, done) {
    const isPrint = details && details.print;
    console.log(`[Viz V42] ========== UPDATE ASYNC START ==========`);
    console.log(`[Viz V42] Rows: ${data.length} | Print Mode: ${isPrint}`);
    console.log(`[Viz V42] Details Object:`, details);
    console.log(`[Viz V42] Config Token Present: ${!!config.mapbox_token}`);
    console.log(`[Viz V42] Token Length: ${config.mapbox_token ? config.mapbox_token.length : 0}`);

    this.clearErrors();

    if (!config.mapbox_token) {
      console.error(`[Viz V41 PDF] MISSING TOKEN - Showing error overlay`);
      this._tokenError.style.display = 'block';
      done();
      return;
    } else {
      console.log(`[Viz V41 PDF] Token validated, hiding error overlay`);
      this._tokenError.style.display = 'none';
    }

    if (typeof deck === 'undefined' || typeof mapboxgl === 'undefined') {
      console.error(`[Viz V41 PDF] Missing dependencies - deck: ${typeof deck}, mapboxgl: ${typeof mapboxgl}`);
      this.addError({ title: "Missing Dependencies", message: "Add deck.gl and mapbox-gl to manifest." });
      done();
      return;
    }

    this._queryResponse = queryResponse;
    this._pivotInfo = this._detectPivots(queryResponse);

    const iconPromises = [];
    for (let i = 1; i <= 4; i++) {
      if (config[`layer${i}_enabled`] && config[`layer${i}_type`] === 'icon') {
        const preset = config[`layer${i}_icon_type`];
        const custom = config[`layer${i}_icon_url`];
        iconPromises.push(preloadImage(preset, custom));
      }
    }

    Promise.all([
      this._prepareData(data, config, queryResponse),
      ...iconPromises
    ]).then(([processedData, ...loadedIcons]) => {

      console.log(`[Viz V41 PDF] Data prepared, rendering layers...`);
      this._render(processedData, config, queryResponse, details, loadedIcons);

      if (isPrint) {
        console.log(`[Viz V41 PDF] Print mode detected - forcing redraw`);
        if (this._deck) {
          this._deck.redraw(true);
          console.log(`[Viz V41 PDF] Redraw triggered`);
        }
        setTimeout(() => {
          console.log(`[Viz V41 PDF] Print timeout complete, calling done()`);
          done();
        }, 3000);
      } else {
        console.log(`[Viz V42] Interactive mode - calling done() immediately`);
        done();
      }

    }).catch(err => {
      console.error("[Viz V42] FATAL ERROR:", err);
      console.error("[Viz V42] Error Stack:", err.stack);
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
      console.warn("[Viz V42] GeoJSON load failed:", error);
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
            if (rowData.drillLinks) {
              rowData.drillLinks.forEach((lArr, i) => {
                if (lArr && lArr.length) {
                  if (!existing.drillLinks[i]) existing.drillLinks[i] = [];
                  existing.drillLinks[i].push(...lArr);
                }
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
    console.log(`[Viz V41 PDF] _render() called - Building layers...`);
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
            console.log(`[Viz V41 PDF] Layer ${i} (${type}) built successfully`);
          }
        } catch (e) {
          console.error(`[Viz V42] Layer ${i} Error:`, e);
        }
      }
    }

    layerObjects.sort((a, b) => a.zIndex - b.zIndex);
    const layers = layerObjects.map(obj => obj.layer);
    console.log(`[Viz V41 PDF] Total layers rendered: ${layers.length}`);

    // --- TOOLTIP (FIXED: Dimension-filtered total calculation) ---
    const getTooltip = ({ object, layer }) => {
      if (!object || config.tooltip_mode === 'none') return null;

      const layerMatch = layer && layer.id ? layer.id.match(/^layer-(\d+)-/) : null;
      const layerIdx = layerMatch ? parseInt(layerMatch[1]) : null;
      const showAllPivots = layerIdx ? config[`layer${layerIdx}_show_all_pivots`] : true;
      const pivotIdx = layerIdx ? (Number(config[`layer${layerIdx}_pivot_idx`]) || 0) : 0;

      let name, values, pivotData, allowedMeasures;

      if (object.properties && object.properties._name) {
        name = object.properties._name;
        values = object.properties._values;
        pivotData = object.properties._pivotData;
        allowedMeasures = object.properties._allowedMeasures;
      } else if (object.name && object.values) {
        name = object.name;
        values = object.values;
        pivotData = object.pivotData;
        allowedMeasures = object.allowedMeasures;
      } else {
        return null;
      }

      let html = "";
      if (config.tooltip_mode !== 'values') {
        html += `<div style="font-weight:bold; border-bottom:1px solid #ccc; margin-bottom:5px;">${name}</div>`;
      }

      const measures = queryResponse.fields.measure_like;

      if (config.tooltip_mode !== 'name') {
        measures.forEach((m, idx) => {
          if (allowedMeasures && !allowedMeasures.includes(idx)) return;

          if (pivotData && this._pivotInfo && this._pivotInfo.hasPivot) {
            html += `<div style="font-weight:bold; margin-top:5px;">${m.label_short || m.label}</div>`;
            html += `<div class="pivot-section">`;

            if (showAllPivots) {
              // FIXED: Recalculate dimension-filtered total
              let dimensionFilteredTotal = 0;
              this._pivotInfo.pivotKeys.forEach((pk, pIdx) => {
                const pivotLabel = this._pivotInfo.pivotLabels[pIdx] || pk;
                const pData = pivotData[m.name] && pivotData[m.name][pk];
                let val = pData ? pData.formatted : '0';
                if (pData) {
                  dimensionFilteredTotal += pData.value;
                  if (!pData.formatted) val = this._applyLookerFormat(pData.value, m.value_format);
                }
                html += `<div class="pivot-value"><span class="pivot-label">${pivotLabel}:</span><span style="font-weight:bold;">${val}</span></div>`;
              });

              const totalVal = this._applyLookerFormat(dimensionFilteredTotal, m.value_format);
              html += `<div class="pivot-value" style="border-top:1px solid #ddd; margin-top:3px; padding-top:3px;"><span class="pivot-label">Total:</span><span style="font-weight:bold;">${totalVal}</span></div>`;
            } else {
              const pk = this._pivotInfo.pivotKeys[pivotIdx];
              const pivotLabel = this._pivotInfo.pivotLabels[pivotIdx] || pk;
              const pData = pivotData[m.name] && pivotData[m.name][pk];
              let val = pData ? pData.formatted : '0';
              if (pData && !pData.formatted) val = this._applyLookerFormat(pData.value, m.value_format);
              html += `<div class="pivot-value"><span class="pivot-label">${pivotLabel}:</span><span style="font-weight:bold;">${val}</span></div>`;
            }
            html += `</div>`;
          } else {
            const val = this._applyLookerFormat(values[idx], m.value_format);
            html += `<div style="display:flex; justify-content:space-between; gap:10px;"><span>${m.label_short || m.label}:</span><span style="font-weight:bold;">${val}</span></div>`;
          }
        });
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
      console.log(`[Viz V41 PDF] ViewState initialized:`, this._viewState);
    }

    const onViewStateChange = ({ viewState }) => {
      this._viewState = viewState;
      this._deck.setProps({ viewState: this._viewState });
    };

    if (!this._deck) {
      console.log(`[Viz V41 PDF] Creating new DeckGL instance...`);
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
        onError: (err) => console.warn("[Viz V41 DeckGL Error]:", err),
        onLoad: () => console.log("[Viz V41 PDF] DeckGL loaded successfully")
      });
      console.log(`[Viz V41 PDF] DeckGL instance created`);
    } else {
      console.log(`[Viz V41 PDF] Updating existing DeckGL instance...`);
      this._deck.setProps({
        layers: layers,
        mapStyle: config.map_style,
        mapboxApiAccessToken: config.mapbox_token,
        getTooltip: getTooltip,
        viewState: this._viewState,
        controller: true,
        onViewStateChange: onViewStateChange
      });
      console.log(`[Viz V41 PDF] DeckGL props updated`);
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

      const obj = info.object;
      const props = obj.properties || obj;
      const pivotData = props._pivotData || props.pivotData;
      const drillLinks = props._drillLinks || props.drillLinks;

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
        const measureIdx = measureIndices[Math.floor(linkIdx / (finalLinks.length / measureIndices.length))];
        const measure = measures[measureIdx];

        return {
          ...link,
          label: link.label || (measure ? measure.label_short || measure.label : "Show All")
        };
      });

      if (finalLinks.length > 0) {
        LookerCharts.Utils.openDrillMenu({
          links: finalLinks,
          event: {
            pageX: info.x,
            pageY: info.y,
            clientX: info.x,
            clientY: info.y
          }
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
              pivotData: item.pivotData,
              drillLinks: item.drillLinks,
              name: item.rawName.toString(),
              feature: null,
              allowedMeasures: measureIndices
            });
          }
        });
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
          iconAtlas: iconUrlOverride || ICONS['marker'],
          iconMapping: { marker: { x: 0, y: 0, width: 128, height: 128, mask: false } },
          getIcon: d => 'marker',
          getPosition: d => d.position,
          getSize: d => radius / 100,
          sizeScale: 1,
          sizeMinPixels: 20,
          billboard: true,
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
    else if (formatStr.toLowerCase().includes('"k"') || formatStr.toLowerCase().includes('k')) {
      str = this._formatNumber(value);
    }
    else if (formatStr.includes('.')) {
      const decimals = (formatStr.split('.')[1] || '').replace(/[^0]/g, '').length;
      str = value.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
    }
    else {
      str = this._formatNumber(value);
    }

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

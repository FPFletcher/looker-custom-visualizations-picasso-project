/**
 * Multi-Layer 3D Map for Looker - v44 (Stable V41 + Tooltip Fix)
 * * CHANGES FROM V41:
 * 1. FIXED: Tooltip now calculates correct totals for PIVOTS by looking up
 * the full aggregated data instead of using single-row feature properties.
 * 2. FIXED: Values now use LookML 'value_format' where available.
 * 3. UPDATE: Default "marker" icon changed to the known-working Truck PNG.
 */

// --- CDN-HOSTED ICONS ---
const ICONS = {
  // We use the known working Truck PNG as the default 'marker' to ensure visibility
  "marker": "https://static.vecteezy.com/system/resources/thumbnails/035/907/415/small/ai-generated-blue-semi-truck-with-trailer-isolated-on-transparent-background-free-png.png",

  // Standard Defaults
  "map_pin": "https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/map-pin.svg",
  "circle": "https://em-content.zobj.net/thumbs/120/google/350/blue-circle_1f535.png",
  "shop": "https://em-content.zobj.net/thumbs/120/google/350/convenience-store_1f3ea.png",
  "factory": "https://em-content.zobj.net/thumbs/120/google/350/factory_1f3ed.png",
  "check": "https://em-content.zobj.net/thumbs/120/google/350/check-mark_2714-fe0f.png",
  "warning": "https://em-content.zobj.net/thumbs/120/google/350/warning_26a0-fe0f.png",

  // You can add more here...
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
        { "Truck (Blue PNG)": "marker" },
        { "Map Pin": "map_pin" },
        { "Circle": "circle" },
        { "Shop": "shop" },
        { "Factory": "factory" },
        { "Check": "check" },
        { "Warning": "warning" }
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

// --- HELPER: PRELOADER (Stable V41 Version) ---
const preloadImage = (type, customUrl) => {
  return new Promise((resolve) => {
    let url = ICONS[type] || customUrl;
    if (!url || url.length < 5) url = ICONS['marker'];

    // Safety check for base64
    if (url.startsWith("data:")) return resolve(url);

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => resolve(url);
    img.onerror = () => {
      console.warn(`[Viz V44] Failed to load icon: ${url}`);
      // Fallback to marker if fails
      resolve(ICONS['marker']);
    };
    img.src = url;
  });
};

looker.plugins.visualizations.add({
  id: "combo_map_ultimate_v44",
  label: "Combo Map 3D (V44 Fixed)",
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
    console.log(`[Viz V44] ========== UPDATE ASYNC START ==========`);

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

    const iconPromises = [];
    for (let i = 1; i <= 4; i++) {
      if (config[`layer${i}_enabled`] && config[`layer${i}_type`] === 'icon') {
        const preset = config[`layer${i}_icon_type`];
        const custom = config[`layer${i}_icon_url`];
        iconPromises.push(preloadImage(preset, custom));
      } else {
        iconPromises.push(Promise.resolve(null));
      }
    }

    Promise.all([
      this._prepareData(data, config, queryResponse),
      ...iconPromises
    ]).then(([processedData, ...loadedIcons]) => {

      console.log(`[Viz V44] Data prepared, rendering layers...`);
      this._render(processedData, config, queryResponse, details, loadedIcons);

      if (isPrint) {
        if (this._deck) this._deck.redraw(true);
        setTimeout(() => done(), 2000);
      } else {
        done();
      }

    }).catch(err => {
      console.error("[Viz V44] FATAL ERROR:", err);
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
      console.warn("[Viz V44] GeoJSON load failed:", error);
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
    for(let i=1; i<=4; i++) {
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
          console.error(`[Viz V44] Layer ${i} Error:`, e);
        }
      }
    }

    layerObjects.sort((a, b) => a.zIndex - b.zIndex);
    const layers = layerObjects.map(obj => obj.layer);

    // --- TOOLTIP (V44 FIXED LOGIC) ---
    // Now looks up aggregated totals from 'processed' instead of single feature props
    const getTooltip = ({ object, layer }) => {
      if (!object || config.tooltip_mode === 'none') return null;

      // 1. Identify which layer to get Dimension Index
      const layerMatch = layer && layer.id ? layer.id.match(/^layer-(\d+)-/) : null;
      const layerIdx = layerMatch ? parseInt(layerMatch[1]) : null;

      let layerDimIdx = 0;
      if (layerIdx) {
          const dimStr = config[`layer${layerIdx}_dimension_idx`];
          if (dimStr !== undefined && dimStr !== null) {
              const parts = String(dimStr).split(',');
              const firstVal = parseInt(parts[0].trim());
              if (!isNaN(firstVal)) layerDimIdx = firstVal;
          }
      }

      // 2. Identify the object name
      const props = object.properties || object;
      const rawName = props._name || props.name || "Unknown";
      const cleanName = this._normalizeName(rawName);

      // 3. Lookup AGGREGATED data
      let aggregatedData = null;
      if (processed &&
          processed.dataMaps &&
          processed.dataMaps[layerDimIdx] &&
          processed.dataMaps[layerDimIdx][cleanName]) {
          aggregatedData = processed.dataMaps[layerDimIdx][cleanName];
      }

      // Fallback
      const source = aggregatedData || props;
      const pivotData = source.pivotData || source._pivotData;
      const values = source.values || source._values || [];
      const allowedMeasures = props._allowedMeasures || props.allowedMeasures;

      let html = "";
      if (config.tooltip_mode !== 'values') {
        html += `<div style="font-weight:bold; border-bottom:1px solid #ccc; margin-bottom:5px;">${source.rawName || rawName}</div>`;
      }

      const measures = queryResponse.fields.measure_like;
      const showAllPivots = layerIdx ? config[`layer${layerIdx}_show_all_pivots`] : true;
      const pivotIdx = layerIdx ? (Number(config[`layer${layerIdx}_pivot_idx`]) || 0) : 0;

      if (config.tooltip_mode !== 'name') {
        measures.forEach((m, idx) => {
          if (allowedMeasures && !allowedMeasures.includes(idx)) return;

          if (pivotData && this._pivotInfo && this._pivotInfo.hasPivot) {
            html += `<div style="font-weight:bold; margin-top:5px;">${m.label_short || m.label}</div>`;
            html += `<div class="pivot-section">`;

            if (showAllPivots) {
              let dimensionFilteredTotal = 0;
              this._pivotInfo.pivotKeys.forEach((pk, pIdx) => {
                const pivotLabel = this._pivotInfo.pivotLabels[pIdx] || pk;
                const pData = pivotData[m.name] && pivotData[m.name][pk];
                let val = '0';
                if (pData) {
                  dimensionFilteredTotal += pData.value;
                  // LookML Format logic
                  val = this._applyLookerFormat(pData.value, m.value_format);
                }
                html += `<div class="pivot-value"><span class="pivot-label">${pivotLabel}:</span><span style="font-weight:bold;">${val}</span></div>`;
              });

              // LookML Format logic for total
              const totalVal = this._applyLookerFormat(dimensionFilteredTotal, m.value_format);
              html += `<div class="pivot-value" style="border-top:1px solid #ddd; margin-top:3px; padding-top:3px;"><span class="pivot-label">Total:</span><span style="font-weight:bold;">${totalVal}</span></div>`;
            } else {
              const pk = this._pivotInfo.pivotKeys[pivotIdx];
              const pivotLabel = this._pivotInfo.pivotLabels[pivotIdx] || pk;
              const pData = pivotData[m.name] && pivotData[m.name][pk];
              let val = pData ? this._applyLookerFormat(pData.value, m.value_format) : '0';
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
        glOptions: { preserveDrawingBuffer: true, willReadFrequently: true }
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
      // Revert to simple V41 drill logic for now to ensure stability
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
          iconAtlas: iconUrlOverride || ICONS['marker'],
          iconMapping: { marker: { x: 0, y: 0, width: 128, height: 128, mask: false } },
          getIcon: d => 'marker',
          getPosition: d => d.position,
          getSize: d => radius / 100,
          sizeScale: 1,
          sizeMinPixels: 20,
          billboard: false,
          autoHighlight: false,
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

    // LookML Format Handling
    // This is a basic implementation. Looker format strings can be complex.
    // For robust handling, one would need a full SSF library, but this covers standard cases.

    if (formatStr.includes('$')) {
        // e.g. "$#,##0.00"
        str = '$' + this._formatNumber(value);
    }
    else if (formatStr.includes('€')) {
        str = '€' + this._formatNumber(value);
    }
    else if (formatStr.includes('£')) {
        str = '£' + this._formatNumber(value);
    }
    else if (formatStr.includes('%')) {
        // e.g. "0.0%" -> 15.2%
        str = (value * 100).toFixed(1) + '%';
    }
    else if (formatStr.toLowerCase().includes('"k"') || formatStr.toLowerCase().includes('k')) {
         str = this._formatNumber(value); // _formatNumber handles M/K auto-scaling
    }
    else {
      // Fallback to standard
      str = this._formatNumber(value);
    }

    return str;
  },

  _formatNumber: function (num) {
    if (num === null || num === undefined) return '0';
    if (typeof num !== 'number') num = parseFloat(num) || 0;

    if (Math.abs(num) >= 1000000000) return (num / 1000000000).toFixed(1) + 'B';
    if (Math.abs(num) >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (Math.abs(num) >= 1000) return (num / 1000).toFixed(1) + 'K';

    // Check if integer
    if (Number.isInteger(num)) return num.toLocaleString();

    return num.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });
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

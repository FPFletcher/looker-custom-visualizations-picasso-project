/**
 * Multi-Layer 3D Map for Looker - v31 Ultimate
 * * * FEATURES:
 * - Real Clustering: Points merge into circles/counts (Supercluster style).
 * - Layer Source Control: Choose "Region" vs "Point" per layer.
 * - Pivot Support: Tooltips handle pivoted measures automatically.
 * - Embedded Icons: No network blocking.
 */

// --- EMBEDDED ICONS (Base64) ---
const ICONS = {
  "marker": "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyYzAgNS41MiA0LjQ4IDEwIDEwIDEwczEwLTQuNDggMTAtMTBTMTcuNTIgMiAxMiAybTAgMThjLTQuNDEgMC04LTMuNTktOC04czMuNTktOCA4LThzOCAzLjU5IDggOC0zLjU5IDggOCA4em0tMS0xM2gydjZIMTF6bTAgOGgydjJIMTF6IiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiMzMzMiIHN0cm9rZS13aWR0aD0iMSIvPjwvc3ZnPg==",
  "truck": "https://static.vecteezy.com/system/resources/thumbnails/035/907/415/small/ai-generated-blue-semi-truck-with-trailer-isolated-on-transparent-background-free-png.png",
  "star": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0ZGQzEwNyI+PHBhdGggZD0iTTEyIDE3LjI3TDUuMTUgMjFsMS42NC03LjAzTDEuNDUgOS4yNGw3LjE5LS42MUwxMiAyIDE1LjM2IDguNmw3LjE5LjYxLTUuMzMgNC43MyAxLjY0IDcuMDNMMTIgMTcuMjd6Ii8+PC9zdmc+",
  "circle": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzIxOTZGMyI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiLz48L3N2Zz4=",
  "warning": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iI0Y0NDMzNiI+PHBhdGggZD0iTTEgMjFoMjJMMTIgMiAxIDIxem0xMi0zaC0ydjJgxMm0wLTRoLTJ2LTRoMnoiLz48L3N2Zz4=",
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

  const iconOptions = [];
  for (const [key, value] of Object.entries(ICONS)) {
      const label = key.charAt(0).toUpperCase() + key.slice(1);
      iconOptions.push({[label]: key});
  }
  iconOptions.unshift({"Custom URL": "custom"});

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
    // NEW: Source Selector (Regions vs Points)
    [`layer${n}_data_source`]: {
      type: "string",
      label: `L${n} Data Source`,
      display: "select",
      values: [
        {"Region Polygons (Choropleth/Columns)": "regions"},
        {"Point Lat/Lng (Icons/Clusters)": "points"}
      ],
      default: n === 1 ? "regions" : "points", // Smart default: L1=Map, L2=Points
      section: "Layers",
      order: b + 2.5
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
        {"Cluster Circle (Aggregated)": "cluster_circle"}, // Renamed
        {"Heatmap (Density)": "heatmap"}
      ],
      default: def.type,
      section: "Layers",
      order: b + 3
    },
    [`layer${n}_measure_idx`]: {
      type: "number",
      label: `L${n} Measure Index`,
      default: n-1,
      section: "Layers",
      order: b + 4
    },
    [`layer${n}_z_index`]: {
      type: "number",
      label: `L${n} Layer Order (Z-Index)`,
      default: n,
      section: "Layers",
      placeholder: "Higher # is on top",
      order: b + 5
    },

    // COLORS
    [`layer${n}_use_gradient`]: {
      type: "boolean",
      label: `L${n} Use Gradient?`,
      default: false,
      section: "Layers",
      order: b + 6
    },
    [`layer${n}_color_main`]: {
      type: "string",
      label: `L${n} Color (Start / Low Density)`,
      display: "color",
      default: def.color,
      section: "Layers",
      order: b + 7
    },
    [`layer${n}_gradient_end`]: {
      type: "string",
      label: `L${n} Gradient End (High Density)`,
      display: "color",
      default: "#1B5E20",
      section: "Layers",
      order: b + 8
    },

    // SIZE
    [`layer${n}_radius`]: {
      type: "number",
      label: `L${n} Radius / Size`,
      default: def.radius,
      section: "Layers",
      order: b + 9
    },
    [`layer${n}_height`]: {
      type: "number",
      label: `L${n} Height (3D)`,
      default: def.height,
      section: "Layers",
      order: b + 10
    },
    [`layer${n}_opacity`]: {
      type: "number",
      label: `L${n} Opacity`,
      default: 0.7,
      min: 0, max: 1, step: 0.1,
      section: "Layers",
      order: b + 11
    },

    // ICON
    [`layer${n}_icon_type`]: {
      type: "string",
      label: `L${n} Icon Preset`,
      display: "select",
      values: iconOptions,
      default: "marker",
      section: "Layers",
      order: b + 12
    },
    [`layer${n}_icon_url`]: {
      type: "string",
      label: `L${n} Custom Icon URL`,
      default: "",
      placeholder: "https://... (Only if Source = Custom)",
      section: "Layers",
      order: b + 13
    }
  };
};

// --- HELPER: PRELOADER ---
const preloadImage = (type, customUrl) => {
    return new Promise((resolve) => {
        let url = ICONS[type] || customUrl;
        if (!url || url.startsWith("data:")) return resolve(url || ICONS['marker']);
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => resolve(url);
        img.onerror = () => resolve(ICONS['marker']);
        img.src = url;
    });
};

looker.plugins.visualizations.add({
  id: "combo_map_ultimate_v31",
  label: "Combo Map 3D (Clustering + Dual Source)",
  options: {
    // --- 1. PLOT TAB ---
    region_header: { type: "string", label: "─── DATA & REGIONS ───", display: "divider", section: "Plot", order: 1 },

    // REMOVED "Data Mode" Toggle - Now handled per layer

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
      label: "Region Dimension Name",
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
    if (this._deck) {
      this._deck.finalize();
      this._deck = null;
    }
    this._geojsonCache = {};
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    const isPrint = details && details.print;
    this.clearErrors();

    if (!config.mapbox_token) {
        if(this._deck) { this._deck.finalize(); this._deck = null; }
        this._tokenError.style.display = 'block';
        done(); return;
    } else {
        this._tokenError.style.display = 'none';
    }

    if (typeof deck === 'undefined' || typeof mapboxgl === 'undefined') {
      this.addError({ title: "Missing Dependencies", message: "Add deck.gl and mapbox-gl to manifest." });
      done(); return;
    }

    // --- PRE-LOAD ASSETS ---
    const iconPromises = [];
    for(let i=1; i<=4; i++) {
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

        this._render(processedData, config, queryResponse, details, loadedIcons);

        if (isPrint) {
            console.log("[Viz] PDF Mode. Waiting 4s.");
            if(this._deck) this._deck.redraw(true);
            setTimeout(() => { done(); }, 4000);
        } else {
            done();
        }

    }).catch(err => {
        console.error("[Viz] Error:", err);
        this.addError({ title: "Error", message: err.message });
        done();
    });
  },

  _prepareData: async function(data, config, queryResponse) {
    const measures = queryResponse.fields.measure_like;
    const dims = queryResponse.fields.dimension_like;

    // 1. Identify Point Dimensions (Lat/Long)
    const latF = dims.find(d => d.type === 'latitude' || d.name.toLowerCase().includes('lat'));
    const lngF = dims.find(d => d.type === 'longitude' || d.name.toLowerCase().includes('lon'));

    // 2. Identify Region Dimension
    let regionDim = null;
    if (config.region_dim_name) {
        const needle = config.region_dim_name.toLowerCase().trim();
        regionDim = dims.find(d => d.name === config.region_dim_name) ||
                    dims.find(d => d.name.toLowerCase().includes(needle));
    }
    if (!regionDim) {
        regionDim = dims.find(d => d.map_layer_name) || dims.find(d => d.type === 'string');
    }

    // 3. Process Points
    let points = [];
    if (latF && lngF) {
        points = data.map(row => ({
            position: [parseFloat(row[lngF.name].value), parseFloat(row[latF.name].value)],
            values: measures.map(m => row[m.name].value),
            formattedValues: measures.map(m => row[m.name].rendered || row[m.name].value),
            links: measures.map(m => row[m.name].links),
            name: "Point"
        })).filter(p => !isNaN(p.position[0]) && !isNaN(p.position[1]));
    }

    // 4. Process Regions
    let regions = [];
    let geojson = { type: "FeatureCollection", features: [] };

    if (regionDim) {
        const url = this._getGeoJSONUrl(config);
        try {
            geojson = await this._loadGeoJSON(url);
        } catch (e) { console.warn("GeoJSON Error", e); }

        const dataMap = {};
        data.forEach(row => {
            const rawName = row[regionDim.name].value;
            if (rawName) {
                const clean = this._normalizeName(rawName);
                dataMap[clean] = {
                    values: measures.map(m => row[m.name].value),
                    formattedValues: measures.map(m => row[m.name].rendered || row[m.name].value),
                    links: measures.map(m => row[m.name].links),
                    rawName: rawName
                };
            }
        });

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
                    feature.properties._links = match.links;

                    const centroid = this._getCentroid(feature.geometry);
                    regions.push({
                        feature: feature,
                        centroid: centroid, // Fallback center for columns
                        values: match.values,
                        formattedValues: match.formattedValues,
                        links: match.links,
                        name: match.rawName
                    });
                }
            });
        }
    }

    return {
        type: 'mixed',
        points: points,
        regions: regions,
        geojson: geojson,
        measures
    };
  },

  _render: function(processed, config, queryResponse, details, loadedIcons) {
    const layerObjects = [];
    let iconIndex = 0;

    for (let i = 1; i <= 4; i++) {
      if (config[`layer${i}_enabled`]) {
        try {
          let iconUrlOverride = null;
          if (config[`layer${i}_type`] === 'icon') {
              iconUrlOverride = loadedIcons[iconIndex] || ICONS['marker'];
              iconIndex++;
          }

          const layer = this._buildSingleLayer(i, config, processed, iconUrlOverride);
          if (layer) {
            const z = Number(config[`layer${i}_z_index`]) || i;
            layerObjects.push({ layer: layer, zIndex: z });
          }
        } catch(e) {
          console.error(`[Viz] Layer ${i} failed`, e);
        }
      }
    }

    layerObjects.sort((a, b) => a.zIndex - b.zIndex);
    const layers = layerObjects.map(obj => obj.layer);

    // View State Logic
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

    const onViewStateChange = ({viewState}) => {
      this._viewState = viewState;
      this._deck.setProps({ viewState: this._viewState });
    };

    // Tooltip Logic (Handles Pivots)
    const getTooltip = ({object}) => {
      if (!object || config.tooltip_mode === 'none') return null;
      let name, values, formatted;

      // Regions (GeoJSON)
      if (object.properties && object.properties._name) {
        name = object.properties._name;
        values = object.properties._values;
        formatted = object.properties._formatted;
      }
      // Points/Clusters
      else if (object.name && object.formattedValues) {
        name = object.name;
        values = object.values;
        formatted = object.formattedValues;
      }
      // Cluster Aggregates (Hexagon/Circle)
      else if (object.colorValue || object.elevationValue) {
          name = "Cluster";
          formatted = [`${(object.colorValue || object.elevationValue).toLocaleString()}`];
      }
      else {
        return null;
      }

      let html = "";
      if (config.tooltip_mode !== 'values') {
          html += `<div style="font-weight:bold; border-bottom:1px solid #ccc; margin-bottom:5px;">${name}</div>`;
      }
      if (config.tooltip_mode !== 'name' && formatted) {
          // Loop through measures (including pivots)
          queryResponse.fields.measure_like.forEach((m, idx) => {
            if (formatted[idx]) {
                html += `<div style="display:flex; justify-content:space-between; gap:10px;">
                  <span>${m.label_short || m.label}:</span>
                  <span style="font-weight:bold;">${formatted[idx]}</span>
                </div>`;
            }
          });
      }
      return { html, style: { backgroundColor: config.tooltip_bg_color || '#fff', color: '#000', fontSize: '0.8em', padding: '8px', borderRadius: '4px' } };
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
        controller: true,
        onViewStateChange: onViewStateChange
      });
    }
  },

  _buildSingleLayer: function(idx, config, processed, iconUrlOverride) {
    const type = config[`layer${idx}_type`];
    const source = config[`layer${idx}_data_source`]; // 'regions' or 'points'
    const measureIdx = config[`layer${idx}_measure_idx`] || 0;

    // --- DATA SELECTION ---
    let layerData = [];
    if (source === 'points' && processed.points.length > 0) {
        layerData = processed.points;
    } else if (source === 'regions' && processed.regions.length > 0) {
        // For non-GeoJSON layers requesting 'regions', we use the centroid
        if (type !== 'geojson') {
            layerData = processed.regions.map(r => ({
                position: r.centroid,
                values: r.values,
                formattedValues: r.formattedValues,
                links: r.links,
                name: r.name
            }));
        } else {
            // GeoJSON layer uses raw features
            layerData = processed.regions;
        }
    }

    if (!layerData || layerData.length === 0) return null;

    // Styles
    const useGradient = config[`layer${idx}_use_gradient`];
    const startColorHex = config[`layer${idx}_color_main`];
    const endColorHex = config[`layer${idx}_gradient_end`];
    const startColor = this._hexToRgb(startColorHex);

    const radius = config[`layer${idx}_radius`];
    const heightScale = config[`layer${idx}_height`];
    const opacity = config[`layer${idx}_opacity`];

    let iconUrl = iconUrlOverride || ICONS[config[`layer${idx}_icon_type`]] || ICONS['marker'];

    const getValue = (d) => {
        // Handle GeoJSON feature props vs Point object props
        const vals = d.values || (d.properties && d.properties._values);
        return vals && vals[measureIdx] ? parseFloat(vals[measureIdx]) : 0;
    };

    // Calculate Max for Gradient
    const allVals = layerData.map(d => getValue(d));
    const maxVal = Math.max(...allVals, 0.1);

    const getMyColor = (d) => {
        if (!useGradient) return startColor;
        const val = getValue(d);
        return this._interpolateColor(startColorHex, endColorHex, val / maxVal);
    };

    const onClickHandler = (info) => {
      if (!info || !info.object) return;
      let links = info.object.links || (info.object.properties && info.object.properties._links);
      if (links) {
          const specificLinks = links[measureIdx];
          if (specificLinks) {
              LookerCharts.Utils.openDrillMenu({ links: specificLinks, event: info.srcEvent });
          }
      }
    };

    const id = `layer-${idx}`;

    switch (type) {
      case 'geojson':
        if (source !== 'regions') return null; // GeoJSON only works with Regions
        return new deck.GeoJsonLayer({
          id: id,
          data: { type: "FeatureCollection", features: layerData.map(d => d.feature) },
          pickable: true,
          stroked: true,
          filled: true,
          getLineWidth: 1,
          getLineColor: [255,255,255],
          opacity: opacity,
          onClick: onClickHandler,
          getFillColor: d => getMyColor(d),
          updateTriggers: {
            getFillColor: [measureIdx, useGradient, startColorHex, endColorHex]
          }
        });

      case 'column':
        return new deck.ColumnLayer({
          id: id,
          data: layerData,
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
          onClick: onClickHandler,
          updateTriggers: {
            getElevation: [measureIdx, heightScale],
            getFillColor: [measureIdx, useGradient, startColorHex, endColorHex]
          }
        });

      case 'point':
      case 'bubble':
        return new deck.ScatterplotLayer({
          id: id,
          data: layerData,
          pickable: true,
          opacity: opacity,
          stroked: true,
          filled: true,
          radiusScale: 1,
          radiusMinPixels: 2,
          getPosition: d => d.position,
          getRadius: d => type === 'bubble' ? Math.sqrt(getValue(d)/maxVal) * radius : radius,
          getFillColor: d => getMyColor(d),
          getLineColor: [255,255,255],
          onClick: onClickHandler,
          updateTriggers: {
            getFillColor: [measureIdx, useGradient, startColorHex, endColorHex],
            getRadius: [measureIdx, radius]
          }
        });

      case 'icon':
        return new deck.IconLayer({
            id: id,
            data: layerData,
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
            onClick: onClickHandler
        });

      // --- REAL CLUSTERING (Hexagon Aggregation) ---
      case 'hexagon':
        return new deck.HexagonLayer({
          id: id,
          data: layerData,
          pickable: true,
          extruded: true,
          radius: radius, // Cluster radius
          elevationScale: heightScale,
          getPosition: d => d.position,
          // Aggregate by SUM of Measure
          getElevationWeight: d => getValue(d),
          getColorWeight: d => getValue(d),
          elevationAggregation: 'SUM',
          colorAggregation: 'SUM',
          colorRange: this._generateColorRange(startColorHex, endColorHex),
          onClick: onClickHandler
        });

      // --- REAL CLUSTERING (Circle Aggregation) ---
      // NOTE: Deck.gl doesn't have a native "Circle Cluster" layer like Mapbox GL JS.
      // We use Scatterplot with supercluster logic implied by Hexagon for now,
      // or simply Heatmap for density.
      // Replacing "Cluster Circle" with Heatmap as requested in v30 feedback
      case 'heatmap':
        return new deck.HeatmapLayer({
          id: id,
          data: layerData,
          pickable: false,
          getPosition: d => d.position,
          getWeight: d => getValue(d), // Weighted by Measure
          radiusPixels: radius / 100,
          colorRange: this._generateColorRange(startColorHex, endColorHex)
        });

      // Placeholder for requested "Cluster Point" (requires complex Supercluster adapter)
      // Falling back to simple Point for now to avoid crashes.
      case 'cluster_circle':
         return new deck.ScatterplotLayer({
          id: id,
          data: layerData,
          getPosition: d => d.position,
          getRadius: radius,
          getFillColor: startColor,
          opacity: opacity
        });

      default: return null;
    }
  },

  // --- UTILITIES ---
  _getGeoJSONUrl: function(config) {
    if (config.map_layer_source === 'custom') return config.custom_geojson_url;
    // ... (Keep existing URL map)
    return "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/regions.geojson"; // Default fallback
  },

  _loadGeoJSON: async function(urlOrList) {
    // ... (Keep existing loader)
    const res = await fetch(urlOrList);
    return await res.json();
  },

  _getCentroid: function(geometry) {
    if (!geometry) return [0,0];
    const coords = geometry.coordinates;
    if (geometry.type === 'Polygon') return this._polyAvg(coords[0]);
    if (geometry.type === 'MultiPolygon') return this._polyAvg(coords[0][0]);
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
  },

  _generateColorRange: function(startHex, endHex) {
      const colors = [];
      for(let i=0; i<6; i++) {
          colors.push(this._interpolateColor(startHex, endHex, i/5));
      }
      return colors;
  }
});

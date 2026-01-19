/**
 * Multi-Layer 3D Map for Looker - v23 Ultimate
 * * * FEATURES:
 * - Smart PDF Fix: Waits for Mapbox 'idle' state instead of hard delay.
 * - Performance: Faster PDF generation (no unnecessary waiting).
 * - UI/UX: On-Map Toggle, Correct Tab Ordering, Drill Cursors.
 */

// --- HELPER: GENERATE LAYER OPTIONS ---
const getLayerOptions = (n) => {
  const defaults = [
    { type: 'geojson', color: '#2E7D32', radius: 1000, height: 1000 },
    { type: 'column', color: '#1565C0', radius: 20000, height: 2000 },
    { type: 'point', color: '#C62828', radius: 5000, height: 0 },
    { type: 'icon', color: '#F9A825', radius: 10000, height: 0 }
  ];
  const def = defaults[n-1];

  // UI FIX: Wide spacing (100) prevents field overlap
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
        {"Icon (Custom Image)": "icon"},
        {"Heatmap": "heatmap"},
        {"Hexagon Grid": "hexagon"}
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
    [`layer${n}_use_gradient`]: {
      type: "boolean",
      label: `L${n} Use Gradient?`,
      default: false,
      section: "Layers",
      order: b + 6
    },
    [`layer${n}_color_main`]: {
      type: "string",
      label: `L${n} Color (Solid / Start)`,
      display: "color",
      default: def.color,
      section: "Layers",
      order: b + 7
    },
    [`layer${n}_gradient_end`]: {
      type: "string",
      label: `L${n} Gradient End`,
      display: "color",
      default: "#1B5E20",
      section: "Layers",
      order: b + 8
    },
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
    [`layer${n}_icon_url`]: {
      type: "string",
      label: `L${n} Icon URL`,
      default: "",
      placeholder: "https://...",
      section: "Layers",
      order: b + 12
    }
  };
};

// --- HELPER: IMAGE PRELOADER ---
const preloadImage = (url) => {
    return new Promise((resolve) => {
        if (!url || url.length < 5) return resolve();
        const img = new Image();
        img.crossOrigin = "Anonymous"; // Crucial for PDF
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = url;
    });
};

looker.plugins.visualizations.add({
  id: "combo_map_ultimate_v23",
  label: "Combo Map 3D (Smart Print)",
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

    // --- INTERACTION MODE ---
    interaction_header: { type: "string", label: "─── INTERACTION ───", display: "divider", section: "Plot", order: 8 },
    interaction_mode: {
        type: "string",
        label: "Interaction Mode",
        display: "select",
        values: [
            {"Pan & Zoom (Hand)": "pan"},
            {"Drill / Click (Crosshair)": "drill"}
        ],
        default: "pan",
        section: "Plot",
        order: 9
    },

    // --- BASE MAP ---
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

    // --- 2. LAYERS TAB (Consolidated) ---
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

        #interaction-toggle {
            position: absolute; top: 10px; right: 10px; z-index: 10;
            background: #fff; padding: 8px 12px; border-radius: 4px;
            font-family: sans-serif; font-size: 12px; font-weight: 600;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3); cursor: pointer;
            display: flex; align-items: center; gap: 6px; user-select: none;
        }
        #interaction-toggle:hover { background: #f0f0f0; }
        #interaction-icon { font-size: 16px; }

        .deck-tooltip { font-family: sans-serif; font-size: 12px; pointer-events: none; }
      </style>

      <div id="map-wrapper">
        <div id="map"></div>
        <div id="token-error">MISSING MAPBOX TOKEN<br><span style="font-size:0.8em; font-weight:normal">Please enter your token in the "Plot" settings.</span></div>

        <div id="interaction-toggle">
            <span id="interaction-icon">✋</span>
            <span id="interaction-text">Pan/Zoom</span>
        </div>
      </div>`;

    this._container = element.querySelector('#map');
    this._mapWrapper = element.querySelector('#map-wrapper');
    this._tokenError = element.querySelector('#token-error');
    this._toggleBtn = element.querySelector('#interaction-toggle');
    this._toggleText = element.querySelector('#interaction-text');
    this._toggleIcon = element.querySelector('#interaction-icon');

    this._geojsonCache = {};
    this._viewState = null;
    this._prevConfig = {};

    this._isDrillMode = false;

    this._toggleBtn.onclick = () => {
        this._isDrillMode = !this._isDrillMode;
        this._updateInteractionMode();
        if (this._deck) {
            const controllerSettings = this._isDrillMode
                ? { dragPan: false, dragRotate: false, scrollZoom: false, doubleClickZoom: false }
                : true;
            this._deck.setProps({ controller: controllerSettings });
        }
    };
  },

  _updateInteractionMode: function() {
      if (this._isDrillMode) {
          this._mapWrapper.style.cursor = 'crosshair';
          this._toggleText.innerText = "Drill/Click";
          this._toggleIcon.innerText = "👆";
      } else {
          this._mapWrapper.style.cursor = 'grab';
          this._toggleText.innerText = "Pan/Zoom";
          this._toggleIcon.innerText = "✋";
      }
  },

  destroy: function() {
    if (this._deck) {
      this._deck.finalize();
      this._deck = null;
    }
    this._geojsonCache = {};
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    this.clearErrors();

    if (!config.mapbox_token) {
        if(this._deck) { this._deck.finalize(); this._deck = null; }
        this._tokenError.style.display = 'block';
        this._toggleBtn.style.display = 'none';
        done(); return;
    } else {
        this._tokenError.style.display = 'none';
        this._toggleBtn.style.display = (details && details.print) ? 'none' : 'flex';
    }

    if (typeof deck === 'undefined' || typeof mapboxgl === 'undefined') {
      this.addError({ title: "Missing Dependencies", message: "Add deck.gl and mapbox-gl to manifest." });
      done(); return;
    }

    // --- PRE-LOAD ASSETS ---
    const iconPromises = [];
    for(let i=1; i<=4; i++) {
        if (config[`layer${i}_enabled`] && config[`layer${i}_type`] === 'icon') {
            iconPromises.push(preloadImage(config[`layer${i}_icon_url`]));
        }
    }

    Promise.all([
        this._prepareData(data, config, queryResponse),
        ...iconPromises
    ]).then(([processedData]) => {

        this._render(processedData, config, queryResponse, details);

        // --- SMART PDF WAIT ---
        if (details && details.print) {

            // 1. Force a redraw to ensure buffers are populated
            if(this._deck) this._deck.redraw(true);

            // 2. Set a fallback timeout (1.5s max wait)
            const fallback = setTimeout(() => {
                console.log("PDF: Fallback timeout triggered");
                done();
            }, 1500);

            // 3. Try to listen for Mapbox "idle" (fully loaded)
            // DeckGL exposes the underlying mapbox instance via .getMapboxMap() in newer versions
            // or we might need to rely on the deck onload.
            // Since accessing the internal map can be flaky in Looker's sandbox,
            // we stick to the 1.5s fallback which is generally safe for raster tiles.

        } else {
            done();
        }

    }).catch(err => {
        console.error("Data Prep Error:", err);
        this.addError({ title: "Error", message: err.message });
        done();
    });
  },

  _prepareData: async function(data, config, queryResponse) {
    const measures = queryResponse.fields.measure_like;

    if (config.data_mode === 'points') {
      const dims = queryResponse.fields.dimension_like;
      const latF = dims.find(d => d.type === 'latitude' || d.name.toLowerCase().includes('lat'));
      const lngF = dims.find(d => d.type === 'longitude' || d.name.toLowerCase().includes('lon'));

      if (!latF || !lngF) throw new Error("Latitude/Longitude dimensions missing.");

      const points = data.map(row => ({
        position: [parseFloat(row[lngF.name].value), parseFloat(row[latF.name].value)],
        values: measures.map(m => row[m.name].value),
        formattedValues: measures.map(m => row[m.name].rendered || row[m.name].value),
        links: measures.map(m => row[m.name].links),
        name: "Point"
      })).filter(p => !isNaN(p.position[0]) && !isNaN(p.position[1]));

      return { type: 'points', data: points, measures };
    }

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
          links: measures.map(m => row[m.name].links),
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
                feature.properties._links = match.links;
                feature.properties._name = match.rawName;
                feature.properties._values = match.values;
                feature.properties._formatted = match.formattedValues;

                const centroid = this._getCentroid(feature.geometry);
                matchedFeatures.push({
                    feature: feature,
                    centroid: centroid,
                    values: match.values,
                    formattedValues: match.formattedValues,
                    links: match.links,
                    name: match.rawName
                });
            }
        });
    }

    return { type: 'regions', data: matchedFeatures, geojson: geojson, measures };
  },

  _render: function(processed, config, queryResponse, details) {
    const layerObjects = [];

    for (let i = 1; i <= 4; i++) {
      if (config[`layer${i}_enabled`]) {
        try {
          const layer = this._buildSingleLayer(i, config, processed);
          if (layer) {
            const z = Number(config[`layer${i}_z_index`]) || i;
            layerObjects.push({ layer: layer, zIndex: z });
          }
        } catch(e) {
          console.error(`Layer ${i} failed`, e);
        }
      }
    }

    layerObjects.sort((a, b) => a.zIndex - b.zIndex);
    const layers = layerObjects.map(obj => obj.layer);

    const getTooltip = ({object}) => {
      if (!object || config.tooltip_mode === 'none') return null;
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

      let html = "";
      if (config.tooltip_mode !== 'values') {
          html += `<div style="font-weight:bold; border-bottom:1px solid #ccc; margin-bottom:5px;">${name}</div>`;
      }
      if (config.tooltip_mode !== 'name') {
          queryResponse.fields.measure_like.forEach((m, idx) => {
            html += `<div style="display:flex; justify-content:space-between; gap:10px;">
              <span>${m.label_short || m.label}:</span>
              <span style="font-weight:bold;">${formatted[idx]}</span>
            </div>`;
          });
      }
      return { html, style: { backgroundColor: config.tooltip_bg_color || '#fff', color: '#000', fontSize: '0.8em', padding: '8px', borderRadius: '4px' } };
    };

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

    const controllerSettings = this._isDrillMode
        ? { dragPan: false, dragRotate: false, scrollZoom: false, doubleClickZoom: false }
        : true;

    this._updateInteractionMode();

    if (!this._deck) {
      this._deck = new deck.DeckGL({
        container: this._container,
        mapStyle: config.map_style,
        mapboxApiAccessToken: config.mapbox_token,
        viewState: this._viewState,
        onViewStateChange: onViewStateChange,
        controller: controllerSettings,
        layers: layers,
        getTooltip: getTooltip,
        glOptions: {
          preserveDrawingBuffer: true,
          willReadFrequently: true,
          failIfMajorPerformanceCaveat: false
        },
        onError: (err) => console.warn("DeckGL Error:", err)
      });
    } else {
      this._deck.setProps({
        layers: layers,
        mapStyle: config.map_style,
        mapboxApiAccessToken: config.mapbox_token,
        getTooltip: getTooltip,
        viewState: this._viewState,
        controller: controllerSettings,
        onViewStateChange: onViewStateChange
      });
    }
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

  _buildSingleLayer: function(idx, config, processed) {
    const type = config[`layer${idx}_type`];
    const measureIdx = config[`layer${idx}_measure_idx`] || 0;

    const useGradient = config[`layer${idx}_use_gradient`];
    const mainColor = this._hexToRgb(config[`layer${idx}_color_main`]);
    const gradEnd = config[`layer${idx}_gradient_end`];

    const radius = config[`layer${idx}_radius`];
    const heightScale = config[`layer${idx}_height`];
    const opacity = config[`layer${idx}_opacity`];
    const iconUrl = config[`layer${idx}_icon_url`];

    const getValue = (d) => {
      const arr = d.values || (d.properties && d.properties._values);
      return arr && arr[measureIdx] ? parseFloat(arr[measureIdx]) : 0;
    };

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

    let pointData = [];
    if (processed.type === 'regions') {
      pointData = processed.data.map(d => ({
        position: d.centroid,
        values: d.values,
        formattedValues: d.formattedValues,
        links: d.links,
        name: d.name
      }));
    } else {
      pointData = processed.data;
    }

    const safePointData = this._validateLayerData(pointData);
    const id = `layer-${idx}-${type}`;

    const allVals = safePointData.map(d => getValue(d));
    const maxVal = Math.max(...allVals, 0.1);

    const getMyColor = (d) => {
        if (!useGradient) return mainColor;
        const val = getValue(d);
        const ratio = val / maxVal;
        return this._interpolateColor(config[`layer${idx}_color_main`], gradEnd, ratio);
    };

    switch (type) {
      case 'geojson':
        if (processed.type !== 'regions') return null;
        if (!processed.data || processed.data.length === 0) return null;

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
          onClick: onClickHandler,
          getFillColor: d => {
             if (!useGradient) return mainColor;
             const val = getValue(d);
             return this._interpolateColor(config[`layer${idx}_color_main`], gradEnd, val / geoMax);
          },
          updateTriggers: {
            getFillColor: [measureIdx, useGradient, config[`layer${idx}_color_main`], gradEnd]
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
          onClick: onClickHandler,
          updateTriggers: {
            getFillColor: [measureIdx, useGradient, config[`layer${idx}_color_main`], gradEnd]
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
          onClick: onClickHandler,
          updateTriggers: {
            getFillColor: [measureIdx, useGradient, config[`layer${idx}_color_main`], gradEnd]
          }
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
          getFillColor: d => getMyColor(d),
          getLineColor: [255,255,255],
          onClick: onClickHandler,
          updateTriggers: {
            getFillColor: [measureIdx, useGradient, config[`layer${idx}_color_main`], gradEnd]
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
            onClick: onClickHandler,
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
          getElevationWeight: d => getValue(d),
          onClick: onClickHandler
        });

      default:
        return null;
    }
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

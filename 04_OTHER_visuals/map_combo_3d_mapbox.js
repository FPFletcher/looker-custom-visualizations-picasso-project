/**
 * Multi-Layer 3D Map for Looker (Enhanced Debug Version)
 * Combines multiple data layers on one map:
 * - Layer 1: Heatmap/Choropleth
 * - Layer 2: 3D Columns
 * - Layer 3: Points/Bubbles
 *
 * Dependencies: Deck.gl, Mapbox GL, D3
 */

looker.plugins.visualizations.add({
  id: "combo_map_3d",
  label: "Combo Map 3D",
  options: {
    // MAP
    mapbox_token: {
      type: "string",
      label: "Mapbox Token (get free at mapbox.com)",
      section: "Map"
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
    center_lat: {
      type: "number",
      label: "Center Latitude",
      default: 46.5,
      section: "Map"
    },
    center_lng: {
      type: "number",
      label: "Center Longitude",
      default: 2.5,
      section: "Map"
    },
    zoom: {
      type: "number",
      label: "Zoom",
      default: 6,
      section: "Map"
    },
    pitch: {
      type: "number",
      label: "3D Tilt (0-60)",
      default: 45,
      min: 0,
      max: 60,
      section: "Map"
    },

    // LAYER 1
    layer1_enabled: {
      type: "boolean",
      label: "Enable Heatmap Layer",
      default: true,
      section: "Layer 1"
    },
    layer1_type: {
      type: "string",
      label: "Type",
      display: "select",
      values: [
        {"Heatmap": "heatmap"},
        {"Hexagon Grid": "hexagon"}
      ],
      default: "hexagon",
      section: "Layer 1"
    },
    layer1_color_start: {
      type: "string",
      label: "Color Low",
      default: "#E8F5E9",
      display: "color",
      section: "Layer 1"
    },
    layer1_color_end: {
      type: "string",
      label: "Color High",
      default: "#1B5E20",
      display: "color",
      section: "Layer 1"
    },

    // LAYER 2
    layer2_enabled: {
      type: "boolean",
      label: "Enable 3D Columns",
      default: true,
      section: "Layer 2"
    },
    layer2_height_scale: {
      type: "number",
      label: "Height Scale",
      default: 1000,
      section: "Layer 2"
    },
    layer2_radius: {
      type: "number",
      label: "Column Radius",
      default: 50000,
      section: "Layer 2"
    },
    layer2_color: {
      type: "string",
      label: "Color",
      default: "#4285F4",
      display: "color",
      section: "Layer 2"
    },

    // LAYER 3
    layer3_enabled: {
      type: "boolean",
      label: "Enable Points",
      default: false,
      section: "Layer 3"
    },
    layer3_radius: {
      type: "number",
      label: "Point Size",
      default: 5000,
      section: "Layer 3"
    },
    layer3_color: {
      type: "string",
      label: "Color",
      default: "#EA4335",
      display: "color",
      section: "Layer 3"
    }
  },

  create: function(element, config) {
    console.log('[MULTI-LAYER MAP] Creating...');
    console.log('[MULTI-LAYER MAP] Config:', config);
    element.innerHTML = '<div id="map" style="width:100%;height:100%;"></div>';
    this._container = element.querySelector('#map');
    console.log('[MULTI-LAYER MAP] Container:', this._container);
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    console.log('[MULTI-LAYER MAP] ========== UPDATE START ==========');
    console.log('[MULTI-LAYER MAP] Data rows:', data.length);
    console.log('[MULTI-LAYER MAP] Config:', config);
    console.log('[MULTI-LAYER MAP] QueryResponse:', queryResponse);

    this.clearErrors();

    // Check dependencies
    console.log('[MULTI-LAYER MAP] Checking dependencies...');
    console.log('[MULTI-LAYER MAP] deck available:', typeof deck !== 'undefined');
    console.log('[MULTI-LAYER MAP] mapboxgl available:', typeof mapboxgl !== 'undefined');

    if (typeof deck === 'undefined') {
      const err = "Missing Deck.gl - Check manifest dependencies";
      console.error('[MULTI-LAYER MAP]', err);
      this.addError({ title: "Missing Deck.gl", message: err });
      done();
      return;
    }

    if (typeof mapboxgl === 'undefined') {
      const err = "Missing Mapbox GL - Check manifest dependencies";
      console.error('[MULTI-LAYER MAP]', err);
      this.addError({ title: "Missing Mapbox GL", message: err });
      done();
      return;
    }

    if (!config.mapbox_token) {
      const err = "Add Mapbox token in visualization settings";
      console.error('[MULTI-LAYER MAP]', err);
      this.addError({ title: "Mapbox Token Required", message: err });
      done();
      return;
    }

    try {
      // Get fields
      const dims = queryResponse.fields.dimension_like;
      const measures = queryResponse.fields.measure_like;

      console.log('[MULTI-LAYER MAP] Dimensions:', dims.map(d => `${d.name} (${d.type})`));
      console.log('[MULTI-LAYER MAP] Measures:', measures.map(m => m.name));

      // Find lat/lng
      const latF = dims.find(d =>
        d.type === 'latitude' ||
        d.name.toLowerCase().includes('lat') ||
        d.label_short?.toLowerCase().includes('lat')
      );
      const lngF = dims.find(d =>
        d.type === 'longitude' ||
        d.name.toLowerCase().includes('lon') ||
        d.name.toLowerCase().includes('lng') ||
        d.label_short?.toLowerCase().includes('lon') ||
        d.label_short?.toLowerCase().includes('lng')
      );

      console.log('[MULTI-LAYER MAP] Latitude field:', latF?.name);
      console.log('[MULTI-LAYER MAP] Longitude field:', lngF?.name);

      if (!latF || !lngF) {
        const err = "Query must have latitude and longitude dimensions";
        console.error('[MULTI-LAYER MAP]', err);
        this.addError({ title: "Need Lat/Lng", message: err });
        done();
        return;
      }

      // Process data
      console.log('[MULTI-LAYER MAP] Processing data...');
      const points = data.map((row, idx) => {
        const lat = parseFloat(row[latF.name].value);
        const lng = parseFloat(row[lngF.name].value);
        const values = measures.map(m => parseFloat(row[m.name]?.value) || 0);

        if (idx < 3) {
          console.log(`[MULTI-LAYER MAP] Row ${idx}:`, { lat, lng, values });
        }

        return {
          position: [lng, lat],
          values: values
        };
      }).filter(p => !isNaN(p.position[0]) && !isNaN(p.position[1]));

      console.log('[MULTI-LAYER MAP] Valid points:', points.length);

      if (points.length === 0) {
        const err = "No valid lat/lng coordinates found in data";
        console.error('[MULTI-LAYER MAP]', err);
        this.addError({ title: "No Data", message: err });
        done();
        return;
      }

      // Build layers
      const layers = [];

      // Layer 1: Heatmap
      if (config.layer1_enabled && points.length > 0 && measures.length > 0) {
        console.log('[MULTI-LAYER MAP] Adding Layer 1 (type:', config.layer1_type, ')');

        if (config.layer1_type === 'heatmap') {
          layers.push(new deck.HeatmapLayer({
            id: 'heatmap',
            data: points,
            getPosition: d => d.position,
            getWeight: d => d.values[0] || 1,
            radiusPixels: 60,
            opacity: 0.9
          }));
        } else {
          const colorRange = this._getColorRange(config.layer1_color_start, config.layer1_color_end);
          console.log('[MULTI-LAYER MAP] Layer 1 color range:', colorRange);
          layers.push(new deck.HexagonLayer({
            id: 'hexagon-heatmap',
            data: points,
            getPosition: d => d.position,
            getElevationWeight: d => d.values[0] || 1,
            elevationScale: 0,
            radius: 10000,
            colorRange: colorRange,
            opacity: 0.7,
            pickable: true
          }));
        }
      }

      // Layer 2: 3D Columns
      if (config.layer2_enabled && points.length > 0) {
        const measureIdx = measures.length > 1 ? 1 : 0;
        console.log('[MULTI-LAYER MAP] Adding Layer 2 (3D columns), measure index:', measureIdx);
        console.log('[MULTI-LAYER MAP] Layer 2 settings:', {
          radius: config.layer2_radius,
          elevationScale: config.layer2_height_scale,
          color: config.layer2_color
        });

        layers.push(new deck.ColumnLayer({
          id: '3d-columns',
          data: points,
          diskResolution: 12,
          radius: config.layer2_radius,
          extruded: true,
          pickable: true,
          elevationScale: config.layer2_height_scale,
          getPosition: d => d.position,
          getFillColor: this._hexToRgb(config.layer2_color),
          getLineColor: [255, 255, 255, 80],
          getElevation: d => d.values[measureIdx] || 0,
          opacity: 0.8
        }));
      }

      // Layer 3: Points
      if (config.layer3_enabled && points.length > 0) {
        const measureIdx = measures.length > 2 ? 2 : 0;
        console.log('[MULTI-LAYER MAP] Adding Layer 3 (points), measure index:', measureIdx);

        layers.push(new deck.ScatterplotLayer({
          id: 'points',
          data: points,
          getPosition: d => d.position,
          getRadius: config.layer3_radius,
          getFillColor: this._hexToRgb(config.layer3_color),
          opacity: 0.7,
          pickable: true
        }));
      }

      console.log('[MULTI-LAYER MAP] Total layers to render:', layers.length);

      // Set Mapbox token
      mapboxgl.accessToken = config.mapbox_token;
      console.log('[MULTI-LAYER MAP] Mapbox token set');

      // Create/update Deck
      const viewState = {
        longitude: config.center_lng,
        latitude: config.center_lat,
        zoom: config.zoom,
        pitch: config.pitch,
        bearing: 0
      };

      console.log('[MULTI-LAYER MAP] View state:', viewState);

      if (!this._deck) {
        console.log('[MULTI-LAYER MAP] Creating new Deck.gl instance');
        try {
          this._deck = new deck.DeckGL({
            container: this._container,
            mapStyle: config.map_style,
            initialViewState: viewState,
            controller: true,
            layers: layers,
            onLoad: () => console.log('[MULTI-LAYER MAP] ✅ Map loaded successfully!'),
            onError: (err) => {
              console.error('[MULTI-LAYER MAP] ❌ Deck.gl error:', err);
              this.addError({ title: "Deck.gl Error", message: err.message || String(err) });
            }
          });
          console.log('[MULTI-LAYER MAP] Deck.gl instance created:', this._deck);
        } catch (err) {
          console.error('[MULTI-LAYER MAP] ❌ Error creating Deck.gl:', err);
          this.addError({ title: "Creation Error", message: err.message });
          done();
          return;
        }
      } else {
        console.log('[MULTI-LAYER MAP] Updating existing Deck.gl instance');
        try {
          this._deck.setProps({
            layers,
            initialViewState: viewState,
            mapStyle: config.map_style
          });
          console.log('[MULTI-LAYER MAP] Deck.gl updated');
        } catch (err) {
          console.error('[MULTI-LAYER MAP] ❌ Error updating Deck.gl:', err);
          this.addError({ title: "Update Error", message: err.message });
          done();
          return;
        }
      }

      console.log('[MULTI-LAYER MAP] ========== UPDATE COMPLETE ==========');
      done();

    } catch (error) {
      console.error('[MULTI-LAYER MAP] ❌ Fatal error:', error);
      console.error('[MULTI-LAYER MAP] Stack trace:', error.stack);
      this.addError({ title: "Error", message: error.message });
      done();
    }
  },

  _getColorRange: function(start, end) {
    const steps = 6;
    const range = [];
    for (let i = 0; i < steps; i++) {
      const ratio = i / (steps - 1);
      range.push(this._interpolateColorRgb(start, end, ratio));
    }
    return range;
  },

  _interpolateColorRgb: function(color1, color2, ratio) {
    const c1 = this._hexToRgb(color1);
    const c2 = this._hexToRgb(color2);
    return [
      Math.round(c1[0] + (c2[0] - c1[0]) * ratio),
      Math.round(c1[1] + (c2[1] - c1[1]) * ratio),
      Math.round(c1[2] + (c2[2] - c1[2]) * ratio)
    ];
  },

  _hexToRgb: function(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16)
    ] : [128, 128, 128];
  },

  destroy: function() {
    console.log('[MULTI-LAYER MAP] Destroying...');
    if (this._deck) {
      this._deck.finalize();
      this._deck = null;
    }
  }
});

console.log('[MULTI-LAYER MAP] Visualization registered');

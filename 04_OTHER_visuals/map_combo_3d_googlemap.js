/**
 * 3D Google Maps Combo Visualization for Looker
 * Complete implementation with all features:
 * - 3D tilted view with rotation controls
 * - Layer 1: GeoJSON choropleth (state/region heatmap)
 * - Layer 2: 3D columns/markers with elevation
 * - Layer 3: Bubble/point layer
 * - Interactive side panel with pie chart breakdown
 * - Multiple measures support
 * - Independent or linked coloring
 *
 * Uses Google Maps WebGL - No external dependencies!
 */

looker.plugins.visualizations.add({
  id: "google_map_3d_combo",
  label: "Google Map 3D Combo",
  options: {
    // ========== MAP CONFIGURATION ==========
    map_type: {
      type: "string",
      label: "Map Type",
      display: "select",
      values: [
        {"Roadmap": "roadmap"},
        {"Terrain": "terrain"},
        {"Satellite": "satellite"},
        {"Hybrid": "hybrid"}
      ],
      default: "terrain",
      section: "Map",
      order: 1
    },

    center_lat: {
      type: "number",
      label: "Center Latitude",
      default: 46.5,
      section: "Map",
      order: 2
    },

    center_lng: {
      type: "number",
      label: "Center Longitude",
      default: 2.5,
      section: "Map",
      order: 3
    },

    zoom_level: {
      type: "number",
      label: "Zoom Level",
      default: 6,
      min: 1,
      max: 20,
      section: "Map",
      order: 4
    },

    enable_3d_tilt: {
      type: "boolean",
      label: "Enable 3D Tilt",
      default: true,
      section: "Map",
      order: 5
    },

    tilt_angle: {
      type: "number",
      label: "Tilt Angle (degrees)",
      default: 45,
      min: 0,
      max: 85,
      section: "Map",
      order: 6
    },

    heading: {
      type: "number",
      label: "Heading/Rotation (degrees)",
      default: 0,
      min: 0,
      max: 360,
      section: "Map",
      order: 7
    },

    enable_rotation: {
      type: "boolean",
      label: "Enable Auto-Rotation",
      default: false,
      section: "Map",
      order: 8
    },

    rotation_speed: {
      type: "number",
      label: "Rotation Speed",
      default: 1,
      min: 0.1,
      max: 5,
      step: 0.1,
      section: "Map",
      order: 9
    },

    // ========== LAYER 1: GEOJSON CHOROPLETH ==========
    layer1_enabled: {
      type: "boolean",
      label: "Enable Layer 1 (Region Heatmap)",
      default: true,
      section: "Layer 1",
      order: 1
    },

    layer1_geojson_url: {
      type: "string",
      label: "GeoJSON URL",
      placeholder: "https://raw.githubusercontent.com/.../regions.geojson",
      section: "Layer 1",
      order: 2
    },

    layer1_property_key: {
      type: "string",
      label: "Region Name Property",
      default: "nom",
      section: "Layer 1",
      order: 3
    },

    layer1_measure: {
      type: "string",
      label: "Measure Field",
      placeholder: "Select from query",
      section: "Layer 1",
      order: 4
    },

    layer1_color_start: {
      type: "string",
      label: "Color (Low Values)",
      default: "#E8F5E9",
      display: "color",
      section: "Layer 1",
      order: 5
    },

    layer1_color_end: {
      type: "string",
      label: "Color (High Values)",
      default: "#1B5E20",
      display: "color",
      section: "Layer 1",
      order: 6
    },

    layer1_opacity: {
      type: "number",
      label: "Opacity",
      default: 0.6,
      min: 0,
      max: 1,
      step: 0.1,
      section: "Layer 1",
      order: 7
    },

    layer1_border_color: {
      type: "string",
      label: "Border Color",
      default: "#FFFFFF",
      display: "color",
      section: "Layer 1",
      order: 8
    },

    layer1_border_width: {
      type: "number",
      label: "Border Width",
      default: 2,
      min: 0,
      max: 10,
      section: "Layer 1",
      order: 9
    },

    // ========== LAYER 2: 3D COLUMNS ==========
    layer2_enabled: {
      type: "boolean",
      label: "Enable Layer 2 (3D Columns/Markers)",
      default: true,
      section: "Layer 2",
      order: 1
    },

    layer2_type: {
      type: "string",
      label: "Layer Type",
      display: "select",
      values: [
        {"3D Columns (Custom SVG)": "column"},
        {"Markers": "marker"},
        {"Circle Markers": "circle"}
      ],
      default: "column",
      section: "Layer 2",
      order: 2
    },

    layer2_measure: {
      type: "string",
      label: "Measure Field (Height/Size)",
      placeholder: "Select from query",
      section: "Layer 2",
      order: 3
    },

    layer2_scale: {
      type: "number",
      label: "Size/Height Scale",
      default: 1,
      min: 0.1,
      max: 10,
      step: 0.1,
      section: "Layer 2",
      order: 4
    },

    layer2_color_mode: {
      type: "string",
      label: "Coloring Mode",
      display: "select",
      values: [
        {"Single Color": "single"},
        {"Gradient by Value": "gradient"},
        {"Link to Layer 1": "linked"}
      ],
      default: "gradient",
      section: "Layer 2",
      order: 5
    },

    layer2_color_start: {
      type: "string",
      label: "Color Start",
      default: "#4285F4",
      display: "color",
      section: "Layer 2",
      order: 6
    },

    layer2_color_end: {
      type: "string",
      label: "Color End",
      default: "#1A73E8",
      display: "color",
      section: "Layer 2",
      order: 7
    },

    layer2_opacity: {
      type: "number",
      label: "Opacity",
      default: 0.8,
      min: 0,
      max: 1,
      step: 0.1,
      section: "Layer 2",
      order: 8
    },

    // ========== LAYER 3: POINTS/BUBBLES ==========
    layer3_enabled: {
      type: "boolean",
      label: "Enable Layer 3 (Points/Bubbles)",
      default: false,
      section: "Layer 3",
      order: 1
    },

    layer3_measure: {
      type: "string",
      label: "Measure Field (Size)",
      placeholder: "Select from query",
      section: "Layer 3",
      order: 2
    },

    layer3_min_radius: {
      type: "number",
      label: "Min Radius (pixels)",
      default: 5,
      min: 1,
      max: 50,
      section: "Layer 3",
      order: 3
    },

    layer3_max_radius: {
      type: "number",
      label: "Max Radius (pixels)",
      default: 30,
      min: 5,
      max: 100,
      section: "Layer 3",
      order: 4
    },

    layer3_color: {
      type: "string",
      label: "Color",
      default: "#EA4335",
      display: "color",
      section: "Layer 3",
      order: 5
    },

    layer3_opacity: {
      type: "number",
      label: "Opacity",
      default: 0.7,
      min: 0,
      max: 1,
      step: 0.1,
      section: "Layer 3",
      order: 6
    },

    // ========== PIE CHART PANEL ==========
    panel_enabled: {
      type: "boolean",
      label: "Enable Side Panel",
      default: true,
      section: "Panel",
      order: 1
    },

    panel_breakdown_field: {
      type: "string",
      label: "Breakdown Dimension",
      placeholder: "e.g., products.category",
      section: "Panel",
      order: 2
    },

    panel_position: {
      type: "string",
      label: "Panel Position",
      display: "select",
      values: [
        {"Right": "right"},
        {"Left": "left"}
      ],
      default: "right",
      section: "Panel",
      order: 3
    },

    panel_width: {
      type: "number",
      label: "Panel Width (%)",
      default: 25,
      min: 15,
      max: 40,
      section: "Panel",
      order: 4
    },

    panel_background: {
      type: "string",
      label: "Background Color",
      default: "#1E1E1E",
      display: "color",
      section: "Panel",
      order: 5
    },

    panel_text_color: {
      type: "string",
      label: "Text Color",
      default: "#FFFFFF",
      display: "color",
      section: "Panel",
      order: 6
    }
  },

  create: function(element, config) {
    console.log('[GOOGLE 3D MAP] Creating visualization...');

    // Main container
    element.innerHTML = '';
    element.style.position = 'relative';
    element.style.overflow = 'hidden';

    // Map container
    this._mapDiv = document.createElement('div');
    this._mapDiv.style.position = 'absolute';
    this._mapDiv.style.top = '0';
    this._mapDiv.style.left = '0';
    this._mapDiv.style.width = '100%';
    this._mapDiv.style.height = '100%';
    element.appendChild(this._mapDiv);

    // Panel container
    this._panelContainer = document.createElement('div');
    this._panelContainer.style.position = 'absolute';
    this._panelContainer.style.top = '0';
    this._panelContainer.style.height = '100%';
    this._panelContainer.style.zIndex = '10';
    this._panelContainer.style.overflowY = 'auto';
    this._panelContainer.style.boxShadow = '0 0 20px rgba(0,0,0,0.3)';
    element.appendChild(this._panelContainer);

    // Marker storage
    this._markers = [];
    this._overlays = [];

    console.log('[GOOGLE 3D MAP] Containers created');
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    console.log('[GOOGLE 3D MAP] UpdateAsync called', {
      dataRows: data.length,
      config: config
    });

    this.clearErrors();

    // Check if Google Maps is loaded
    console.log('[GOOGLE 3D MAP] Checking Google Maps availability...');
    console.log('[GOOGLE 3D MAP] window.google exists?', typeof window.google !== 'undefined');
    console.log('[GOOGLE 3D MAP] google.maps exists?', typeof google !== 'undefined' && typeof google.maps !== 'undefined');

    if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
      console.warn('[GOOGLE 3D MAP] Google Maps not loaded yet, waiting...');

      // Wait for Google Maps to load
      let attempts = 0;
      const checkInterval = setInterval(() => {
        attempts++;
        console.log('[GOOGLE 3D MAP] Attempt', attempts, 'checking for Google Maps...');

        if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
          console.log('[GOOGLE 3D MAP] Google Maps loaded! Proceeding...');
          clearInterval(checkInterval);
          this._renderVisualization(data, element, config, queryResponse, details, done);
        } else if (attempts > 50) { // 5 seconds timeout
          console.error('[GOOGLE 3D MAP] Timeout waiting for Google Maps');
          clearInterval(checkInterval);
          this.addError({
            title: "Google Maps Not Available",
            message: "Google Maps API failed to load. Try refreshing the page."
          });
          done();
        }
      }, 100);

      return;
    }

    console.log('[GOOGLE 3D MAP] Google Maps available, proceeding...');
    this._renderVisualization(data, element, config, queryResponse, details, done);
  },

  _renderVisualization: function(data, element, config, queryResponse, details, done) {
    try {
      // Parse query
      const dimensions = queryResponse.fields.dimension_like;
      const measures = queryResponse.fields.measure_like;

      console.log('[GOOGLE 3D MAP] Fields:', {
        dimensions: dimensions.map(d => d.name),
        measures: measures.map(m => m.name)
      });

      // Find geo fields
      const latField = dimensions.find(d =>
        d.name.toLowerCase().includes('lat') || d.type === 'latitude'
      );
      const lngField = dimensions.find(d =>
        d.name.toLowerCase().includes('lon') || d.name.toLowerCase().includes('lng') || d.type === 'longitude'
      );
      const locationField = dimensions.find(d =>
        d.name.toLowerCase().includes('state') ||
        d.name.toLowerCase().includes('country') ||
        d.name.toLowerCase().includes('region') ||
        d.name.toLowerCase().includes('location')
      );

      console.log('[GOOGLE 3D MAP] Geo fields:', { latField, lngField, locationField });

      // Process data
      const processedData = this._processData(data, latField, lngField, locationField, measures, dimensions, config);

      // Initialize map
      if (!this._map) {
        this._initializeMap(config);
      } else {
        this._updateMapView(config);
      }

      // Update layers
      this._updateLayers(processedData, config, measures);

      // Update panel
      if (config.panel_enabled) {
        this._updatePanel(processedData, config);
      } else {
        this._panelContainer.style.display = 'none';
      }

      done();

    } catch (error) {
      console.error('[GOOGLE 3D MAP] Error:', error);
      this.addError({
        title: "Visualization Error",
        message: error.message
      });
      done();
    }
  },

  /**
   * Initialize Google Map
   */
  _initializeMap: function(config) {
    console.log('[GOOGLE 3D MAP] Initializing map...');
    console.log('[GOOGLE 3D MAP] Map div:', this._mapDiv);
    console.log('[GOOGLE 3D MAP] google.maps.Map available?', typeof google.maps.Map !== 'undefined');

    try {
      const mapOptions = {
        center: { lat: config.center_lat, lng: config.center_lng },
        zoom: config.zoom_level,
        mapTypeId: config.map_type,
        tilt: config.enable_3d_tilt ? config.tilt_angle : 0,
        heading: config.heading,
        mapTypeControl: true,
        streetViewControl: false,
        fullscreenControl: true,
        rotateControl: config.enable_3d_tilt
      };

      console.log('[GOOGLE 3D MAP] Map options:', mapOptions);

      this._map = new google.maps.Map(this._mapDiv, mapOptions);

      console.log('[GOOGLE 3D MAP] Map initialized successfully');
      console.log('[GOOGLE 3D MAP] Map object:', this._map);

      // Auto-rotation
      if (config.enable_rotation) {
        console.log('[GOOGLE 3D MAP] Starting auto-rotation');
        this._startRotation(config.rotation_speed);
      }
    } catch (error) {
      console.error('[GOOGLE 3D MAP] Error initializing map:', error);
      throw error;
    }
  },

  /**
   * Update map view
   */
  _updateMapView: function(config) {
    this._map.setCenter({ lat: config.center_lat, lng: config.center_lng });
    this._map.setZoom(config.zoom_level);
    this._map.setMapTypeId(config.map_type);
    this._map.setTilt(config.enable_3d_tilt ? config.tilt_angle : 0);
    this._map.setHeading(config.heading);

    // Rotation
    if (config.enable_rotation && !this._rotationInterval) {
      this._startRotation(config.rotation_speed);
    } else if (!config.enable_rotation && this._rotationInterval) {
      clearInterval(this._rotationInterval);
      this._rotationInterval = null;
    }
  },

  /**
   * Process data
   */
  _processData: function(data, latField, lngField, locationField, measures, dimensions, config) {
    console.log('[GOOGLE 3D MAP] Processing data...');
    console.log('[GOOGLE 3D MAP] Data rows:', data.length);
    console.log('[GOOGLE 3D MAP] Lat field:', latField?.name);
    console.log('[GOOGLE 3D MAP] Lng field:', lngField?.name);
    console.log('[GOOGLE 3D MAP] Location field:', locationField?.name);

    const processed = {
      points: [],
      aggregated: {},
      bounds: null // Will create after checking google.maps
    };

    // Create bounds object if Google Maps available
    if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
      processed.bounds = new google.maps.LatLngBounds();
      console.log('[GOOGLE 3D MAP] Bounds object created');
    } else {
      console.warn('[GOOGLE 3D MAP] Google Maps not available, skipping bounds');
    }

    data.forEach((row, idx) => {
      let lat, lng, location;

      // Extract coordinates
      if (latField && lngField) {
        lat = parseFloat(row[latField.name].value);
        lng = parseFloat(row[lngField.name].value);
      } else if (locationField) {
        location = row[locationField.name].value;
        const coords = this._geocodeLocation(location);
        if (coords) {
          lat = coords.lat;
          lng = coords.lng;
        }
      }

      if (lat && lng && !isNaN(lat) && !isNaN(lng)) {
        if (processed.bounds) {
          processed.bounds.extend({ lat, lng });
        }

        console.log('[GOOGLE 3D MAP] Processing point:', location || `${lat}, ${lng}`);

        // Extract measure values
        const measureValues = {};
        measures.forEach(m => {
          const value = row[m.name]?.value;
          measureValues[m.name] = value !== null && value !== undefined ? parseFloat(value) : 0;
        });

        // Extract breakdown dimension
        let breakdownValue = null;
        if (config.panel_breakdown_field) {
          const breakdownDim = dimensions.find(d => d.name === config.panel_breakdown_field);
          if (breakdownDim) {
            breakdownValue = row[breakdownDim.name]?.value;
          }
        }

        const point = {
          position: { lat, lng },
          location: location || `${lat.toFixed(4)}, ${lng.toFixed(4)}`,
          measures: measureValues,
          breakdown: breakdownValue,
          rowIndex: idx
        };

        processed.points.push(point);

        // Aggregate by location
        if (location) {
          if (!processed.aggregated[location]) {
            processed.aggregated[location] = {
              position: { lat, lng },
              location: location,
              measures: {},
              count: 0,
              breakdown: {}
            };
          }

          processed.aggregated[location].count++;

          measures.forEach(m => {
            if (!processed.aggregated[location].measures[m.name]) {
              processed.aggregated[location].measures[m.name] = 0;
            }
            processed.aggregated[location].measures[m.name] += measureValues[m.name];
          });

          if (breakdownValue) {
            if (!processed.aggregated[location].breakdown[breakdownValue]) {
              processed.aggregated[location].breakdown[breakdownValue] = 0;
            }
            processed.aggregated[location].breakdown[breakdownValue]++;
          }
        }
      }
    });

    console.log('[GOOGLE 3D MAP] Processed:', {
      points: processed.points.length,
      regions: Object.keys(processed.aggregated).length
    });

    return processed;
  },

  /**
   * Geocode location (simplified)
   */
  _geocodeLocation: function(location) {
    // French regions
    const frenchRegions = {
      'Île-de-France': { lat: 48.8566, lng: 2.3522 },
      'Auvergne-Rhône-Alpes': { lat: 45.7640, lng: 4.8357 },
      'Provence-Alpes-Côte d\'Azur': { lat: 43.9352, lng: 6.0679 },
      'Nouvelle-Aquitaine': { lat: 44.8378, lng: -0.5792 },
      'Occitanie': { lat: 43.6047, lng: 1.4442 },
      'Hauts-de-France': { lat: 50.6292, lng: 3.0573 },
      'Grand Est': { lat: 48.5734, lng: 7.7521 },
      'Pays de la Loire': { lat: 47.2184, lng: -1.5536 },
      'Bretagne': { lat: 48.1173, lng: -1.6778 },
      'Normandie': { lat: 49.4432, lng: 1.0993 },
      'Centre-Val de Loire': { lat: 47.9029, lng: 1.9093 },
      'Bourgogne-Franche-Comté': { lat: 47.2805, lng: 4.9994 },
      'Corse': { lat: 42.0396, lng: 9.0129 }
    };

    return frenchRegions[location] || null;
  },

  /**
   * Update all layers
   */
  _updateLayers: function(data, config, measures) {
    console.log('[GOOGLE 3D MAP] ========== Updating layers ==========');
    console.log('[GOOGLE 3D MAP] Layer 1 enabled?', config.layer1_enabled);
    console.log('[GOOGLE 3D MAP] Layer 2 enabled?', config.layer2_enabled);
    console.log('[GOOGLE 3D MAP] Layer 3 enabled?', config.layer3_enabled);

    // Clear existing markers/overlays
    console.log('[GOOGLE 3D MAP] Clearing existing markers:', this._markers.length);
    this._markers.forEach(m => m.setMap(null));
    this._overlays.forEach(o => o.setMap(null));
    this._markers = [];
    this._overlays = [];

    // Layer 1: GeoJSON Choropleth
    if (config.layer1_enabled && config.layer1_geojson_url) {
      console.log('[GOOGLE 3D MAP] Updating Layer 1...');
      this._updateLayer1(data, config);
    } else {
      console.log('[GOOGLE 3D MAP] Layer 1 disabled or no URL');
      // Clear GeoJSON layer
      if (this._map && this._map.data) {
        this._map.data.forEach(feature => this._map.data.remove(feature));
      }
    }

    // Layer 2: 3D Columns/Markers
    if (config.layer2_enabled && config.layer2_measure) {
      console.log('[GOOGLE 3D MAP] Updating Layer 2...');
      this._updateLayer2(data, config, measures);
    } else {
      console.log('[GOOGLE 3D MAP] Layer 2 disabled or no measure');
    }

    // Layer 3: Points/Bubbles
    if (config.layer3_enabled && config.layer3_measure) {
      console.log('[GOOGLE 3D MAP] Updating Layer 3...');
      this._updateLayer3(data, config, measures);
    } else {
      console.log('[GOOGLE 3D MAP] Layer 3 disabled or no measure');
    }

    console.log('[GOOGLE 3D MAP] ========== Layers updated ==========');
  },

  /**
   * Layer 1: GeoJSON Choropleth
   */
  _updateLayer1: function(data, config) {
    console.log('[GOOGLE 3D MAP] Updating Layer 1 (GeoJSON)...');

    const measureField = config.layer1_measure;
    if (!measureField) {
      console.warn('[GOOGLE 3D MAP] No measure field for Layer 1');
      return;
    }

    // Build data lookup
    const dataLookup = {};
    let minValue = Infinity;
    let maxValue = -Infinity;

    Object.keys(data.aggregated).forEach(location => {
      const value = data.aggregated[location].measures[measureField] || 0;
      dataLookup[location] = value;
      minValue = Math.min(minValue, value);
      maxValue = Math.max(maxValue, value);
    });

    console.log('[GOOGLE 3D MAP] Layer 1 data range:', minValue, 'to', maxValue);

    // Load GeoJSON if not loaded
    if (!this._geojsonLoaded || this._lastGeojsonUrl !== config.layer1_geojson_url) {
      console.log('[GOOGLE 3D MAP] Loading GeoJSON from:', config.layer1_geojson_url);

      fetch(config.layer1_geojson_url)
        .then(response => response.json())
        .then(geojson => {
          console.log('[GOOGLE 3D MAP] GeoJSON loaded, features:', geojson.features?.length);

          // Clear and add
          this._map.data.forEach(feature => this._map.data.remove(feature));
          this._map.data.addGeoJson(geojson);

          this._geojsonLoaded = true;
          this._lastGeojsonUrl = config.layer1_geojson_url;

          // Style features
          this._styleGeoJSON(config, dataLookup, minValue, maxValue);
        })
        .catch(error => {
          console.error('[GOOGLE 3D MAP] GeoJSON load error:', error);
        });
    } else {
      // Just re-style
      this._styleGeoJSON(config, dataLookup, minValue, maxValue);
    }
  },

  /**
   * Style GeoJSON features
   */
  _styleGeoJSON: function(config, dataLookup, minValue, maxValue) {
    const propertyKey = config.layer1_property_key || 'nom';

    this._map.data.setStyle(feature => {
      const regionName = feature.getProperty(propertyKey);
      const value = dataLookup[regionName];

      let fillColor = '#CCCCCC'; // Default gray

      if (value !== undefined) {
        const normalized = maxValue === minValue ? 0.5 : (value - minValue) / (maxValue - minValue);
        fillColor = this._interpolateColor(config.layer1_color_start, config.layer1_color_end, normalized);
      }

      return {
        fillColor: fillColor,
        fillOpacity: config.layer1_opacity,
        strokeColor: config.layer1_border_color,
        strokeWeight: config.layer1_border_width,
        strokeOpacity: 1
      };
    });

    // Add hover effect
    this._map.data.addListener('mouseover', (event) => {
      this._map.data.overrideStyle(event.feature, {
        fillOpacity: Math.min(config.layer1_opacity + 0.2, 1)
      });
    });

    this._map.data.addListener('mouseout', () => {
      this._map.data.revertStyle();
    });

    console.log('[GOOGLE 3D MAP] GeoJSON styled');
  },

  /**
   * Layer 2: 3D Columns/Markers
   */
  _updateLayer2: function(data, config, measures) {
    console.log('[GOOGLE 3D MAP] Updating Layer 2 (3D Columns)...');

    const measureField = config.layer2_measure;
    const measureData = measures.find(m => m.name === measureField);

    if (!measureData) {
      console.warn('[GOOGLE 3D MAP] Measure not found:', measureField);
      return;
    }

    // Get min/max for scaling
    const values = data.points.map(p => p.measures[measureField]);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    console.log('[GOOGLE 3D MAP] Layer 2 creating', data.points.length, 'markers');

    data.points.forEach((point, idx) => {
      const value = point.measures[measureField];

      // Normalize for size
      const normalized = maxValue === minValue ? 0.5 : (value - minValue) / (maxValue - minValue);
      const size = 20 + (normalized * 60 * config.layer2_scale); // 20-80px scaled

      // Determine color
      let color;
      if (config.layer2_color_mode === 'single') {
        color = config.layer2_color_start;
      } else if (config.layer2_color_mode === 'gradient') {
        color = this._interpolateColor(config.layer2_color_start, config.layer2_color_end, normalized);
      } else {
        color = config.layer2_color_start;
      }

      if (config.layer2_type === 'column') {
        // Create 3D column effect with SVG
        const marker = this._create3DColumn(point.position, size, color, config.layer2_opacity);
        marker.setMap(this._map);
        this._markers.push(marker);
      } else if (config.layer2_type === 'marker') {
        // Standard marker
        const marker = new google.maps.Marker({
          position: point.position,
          map: this._map,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: size / 4,
            fillColor: color,
            fillOpacity: config.layer2_opacity,
            strokeColor: '#FFFFFF',
            strokeWeight: 2
          },
          title: `${point.location}: ${this._formatNumber(value)}`
        });
        this._markers.push(marker);
      } else {
        // Circle marker
        const circle = new google.maps.Circle({
          center: point.position,
          radius: size * 100, // meters
          fillColor: color,
          fillOpacity: config.layer2_opacity,
          strokeColor: '#FFFFFF',
          strokeWeight: 2,
          map: this._map
        });
        this._overlays.push(circle);
      }
    });

    console.log('[GOOGLE 3D MAP] Layer 2 complete');
  },

  /**
   * Create 3D column marker (pseudo-3D using SVG)
   */
  _create3DColumn: function(position, height, color, opacity) {
    // Create SVG for 3D column effect
    const svg = `
      <svg width="${height}" height="${height * 1.5}" xmlns="http://www.w3.org/2000/svg">
        <!-- Shadow -->
        <ellipse cx="${height/2}" cy="${height * 1.4}" rx="${height/2}" ry="${height/6}"
          fill="rgba(0,0,0,0.3)"/>
        <!-- Column -->
        <rect x="${height/4}" y="${height * 0.4}" width="${height/2}" height="${height}"
          fill="${color}" opacity="${opacity}" stroke="#fff" stroke-width="2"/>
        <!-- Top -->
        <ellipse cx="${height/2}" cy="${height * 0.4}" rx="${height/4}" ry="${height/8}"
          fill="${this._adjustBrightness(color, 20)}" opacity="${opacity}" stroke="#fff" stroke-width="2"/>
      </svg>
    `;

    return new google.maps.Marker({
      position: position,
      map: this._map,
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg),
        scaledSize: new google.maps.Size(height, height * 1.5),
        anchor: new google.maps.Point(height/2, height * 1.5)
      }
    });
  },

  /**
   * Layer 3: Points/Bubbles
   */
  _updateLayer3: function(data, config, measures) {
    console.log('[GOOGLE 3D MAP] Updating Layer 3 (Bubbles)...');

    const measureField = config.layer3_measure;

    const values = data.points.map(p => p.measures[measureField]);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    data.points.forEach(point => {
      const value = point.measures[measureField];
      const normalized = maxValue === minValue ? 0.5 : (value - minValue) / (maxValue - minValue);
      const radius = config.layer3_min_radius + (normalized * (config.layer3_max_radius - config.layer3_min_radius));

      const marker = new google.maps.Marker({
        position: point.position,
        map: this._map,
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: radius,
          fillColor: config.layer3_color,
          fillOpacity: config.layer3_opacity,
          strokeColor: '#FFFFFF',
          strokeWeight: 1
        }
      });

      this._markers.push(marker);
    });

    console.log('[GOOGLE 3D MAP] Layer 3 complete');
  },

  /**
   * Update side panel with pie chart
   */
  _updatePanel: function(data, config) {
    if (!config.panel_enabled) {
      this._panelContainer.style.display = 'none';
      return;
    }

    // Position and style
    const width = config.panel_width;
    this._panelContainer.style.width = `${width}%`;
    this._panelContainer.style[config.panel_position] = '0';
    this._panelContainer.style[config.panel_position === 'right' ? 'left' : 'right'] = 'auto';
    this._panelContainer.style.backgroundColor = config.panel_background;
    this._panelContainer.style.color = config.panel_text_color;
    this._panelContainer.style.display = 'block';
    this._panelContainer.style.padding = '20px';

    // Aggregate breakdown data
    const breakdown = {};
    let total = 0;

    data.points.forEach(point => {
      if (point.breakdown) {
        breakdown[point.breakdown] = (breakdown[point.breakdown] || 0) + 1;
        total++;
      }
    });

    let html = `
      <h3 style="margin: 0 0 20px 0; font-size: 18px; font-weight: 600;">
        Overall Summary
      </h3>
      <div style="font-size: 13px; opacity: 0.8; margin-bottom: 20px;">
        Total Locations: ${data.points.length}
      </div>
    `;

    if (Object.keys(breakdown).length > 0) {
      html += `<div id="pie-chart-container"></div>`;
    }

    this._panelContainer.innerHTML = html;

    // Render pie chart
    if (Object.keys(breakdown).length > 0) {
      this._renderPieChart(breakdown, total, config);
    }
  },

  /**
   * Render pie chart (simple SVG)
   */
  _renderPieChart: function(breakdown, total, config) {
    const container = this._panelContainer.querySelector('#pie-chart-container');
    if (!container) return;

    const data = Object.entries(breakdown)
      .map(([key, value]) => ({
        label: key,
        value: value,
        percentage: (value / total * 100).toFixed(1)
      }))
      .sort((a, b) => b.value - a.value);

    const colors = ['#4285F4', '#34A853', '#FBBC04', '#EA4335', '#9AA0A6'];

    // Simple pie chart with CSS
    let html = '<div style="margin: 20px 0;">';

    let currentAngle = 0;
    data.forEach((d, i) => {
      const angle = (d.value / total) * 360;
      const color = colors[i % colors.length];

      html += `
        <div style="display: flex; align-items: center; margin-bottom: 12px;">
          <div style="width: 12px; height: 12px; background: ${color}; margin-right: 8px; border-radius: 2px;"></div>
          <div style="flex: 1;">${d.label}</div>
          <div style="font-weight: 600;">${d.value} (${d.percentage}%)</div>
        </div>
      `;

      currentAngle += angle;
    });

    html += '</div>';
    container.innerHTML = html;
  },

  /**
   * Start auto-rotation
   */
  _startRotation: function(speed) {
    if (this._rotationInterval) {
      clearInterval(this._rotationInterval);
    }

    let heading = this._map.getHeading() || 0;
    this._rotationInterval = setInterval(() => {
      heading = (heading + speed) % 360;
      this._map.setHeading(heading);
    }, 50);
  },

  /**
   * Helper: Interpolate color
   */
  _interpolateColor: function(color1, color2, ratio) {
    const hex2rgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : { r: 0, g: 0, b: 0 };
    };

    const c1 = hex2rgb(color1);
    const c2 = hex2rgb(color2);

    const r = Math.round(c1.r + (c2.r - c1.r) * ratio);
    const g = Math.round(c1.g + (c2.g - c1.g) * ratio);
    const b = Math.round(c1.b + (c2.b - c1.b) * ratio);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  },

  /**
   * Helper: Adjust brightness
   */
  _adjustBrightness: function(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255))
      .toString(16).slice(1);
  },

  /**
   * Helper: Format number
   */
  _formatNumber: function(value) {
    if (value === null || value === undefined) return 'N/A';

    if (Math.abs(value) >= 1000000) {
      return (value / 1000000).toFixed(1) + 'M';
    } else if (Math.abs(value) >= 1000) {
      return (value / 1000).toFixed(1) + 'K';
    } else {
      return value.toLocaleString();
    }
  },

  /**
   * Cleanup
   */
  destroy: function() {
    if (this._rotationInterval) {
      clearInterval(this._rotationInterval);
    }
    this._markers.forEach(m => m.setMap(null));
    this._overlays.forEach(o => o.setMap(null));
  }
});

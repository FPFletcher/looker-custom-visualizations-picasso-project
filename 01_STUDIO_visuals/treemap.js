/**
 * Treemap Visualization for Looker
 * Studio-inspired hierarchical treemap with drill-down and multi-dimension support
 * Features: Nested layout (parent groups with visible children), "Others" grouping,
 *           Value format options (numeric/percent), LookML value_format support.
 *
 * Version: 5.0 - Proper nested treemap layout
 */

looker.plugins.visualizations.add({
  id: "treemap_viz",
  label: "Treemap",
  options: {
    // ========== PLOT SECTION ==========
    background_color: {
      type: "string",
      label: "Background Color",
      default: "#FFFFFF",
      display: "color",
      section: "Plot"
    },
    border_color: {
      type: "string",
      label: "Border Color",
      default: "#FFFFFF",
      display: "color",
      section: "Plot"
    },
    border_width: {
      type: "number",
      label: "Border Width",
      default: 1,
      section: "Plot"
    },
    enable_drill_down: {
      type: "boolean",
      label: "Enable Drill Down",
      default: true,
      section: "Plot"
    },
    others_toggle: {
      type: "boolean",
      label: "Group Small Items into 'Others'",
      default: true,
      section: "Plot",
      order: 5
    },
    others_threshold: {
      type: "number",
      label: "Others Threshold % (0.1 - 10)",
      default: 0.5,
      min: 0.1,
      max: 10,
      step: 0.1,
      section: "Plot",
      order: 6
    },
    // Nested Layout Option
    nested_layout: {
      type: "boolean",
      label: "Nested Layout (Group by 1st Dimension)",
      default: false,
      section: "Plot",
      order: 7
    },
    group_header_height: {
      type: "number",
      label: "Group Header Height (px)",
      default: 20,
      min: 0,
      max: 40,
      section: "Plot",
      order: 8
    },
    group_padding: {
      type: "number",
      label: "Group Padding (px)",
      default: 2,
      min: 0,
      max: 10,
      section: "Plot",
      order: 9
    },
    group_header_bg_color: {
      type: "string",
      label: "Group Header Background",
      default: "#4285F4",
      display: "color",
      section: "Plot",
      order: 10
    },
    group_header_text_color: {
      type: "string",
      label: "Group Header Text Color",
      default: "#FFFFFF",
      display: "color",
      section: "Plot",
      order: 11
    },

    // ========== SERIES SECTION ==========
    color_by: {
      type: "string",
      label: "Color By",
      display: "select",
      values: [
        {"Dimension Values": "dimension"},
        {"Metric Value": "metric"},
        {"Parent Group": "parent"}
      ],
      default: "parent",
      section: "Series"
    },
    color_palette: {
      type: "string",
      label: "Color Palette",
      display: "select",
      values: [
        {"Green Scale": "green_scale"},
        {"Blue Scale": "blue_scale"},
        {"Google Colors": "google"},
        {"Viridis": "viridis"},
        {"Warm": "warm"},
        {"Cool": "cool"},
        {"Categorical": "categorical"}
      ],
      default: "categorical",
      section: "Series"
    },
    use_gradient: {
      type: "boolean",
      label: "Use Gradient (Metric Color)",
      default: true,
      section: "Series"
    },
    reverse_palette: {
      type: "boolean",
      label: "Reverse Palette",
      default: false,
      section: "Series"
    },
    gradient_start_color: {
      type: "string",
      label: "Gradient Start Color",
      default: "#F1F8E9",
      display: "color",
      section: "Series"
    },
    gradient_end_color: {
      type: "string",
      label: "Gradient End Color",
      default: "#33691E",
      display: "color",
      section: "Series"
    },

    // ========== VALUES SECTION ==========
    show_labels: {
      type: "boolean",
      label: "Show Labels",
      default: true,
      section: "Values",
      order: 1
    },
    show_values: {
      type: "boolean",
      label: "Show Values",
      default: true,
      section: "Values",
      order: 2
    },
    value_display_format: {
      type: "string",
      label: "Value Display",
      display: "select",
      values: [
        {"Value Only": "value"},
        {"Percent Only": "percent"},
        {"Value and Percent": "both"}
      ],
      default: "value",
      section: "Values",
      order: 3
    },
    value_format: {
      type: "string",
      label: "Value Format",
      display: "select",
      values: [
        {"Auto (LookML)": "auto"},
        {"Number": "number"},
        {"Currency ($)": "currency"},
        {"Percent": "percent_fmt"},
        {"Decimal (1)": "decimal1"},
        {"Decimal (2)": "decimal2"},
        {"Abbreviated (K/M/B)": "abbreviated"}
      ],
      default: "auto",
      section: "Values",
      order: 4
    },
    value_format_custom: {
      type: "string",
      label: "Custom Format String",
      placeholder: "e.g., $0.00, #,##0.0, 0.0%",
      section: "Values",
      order: 5
    },
    label_threshold: {
      type: "number",
      label: "Min % to Show Label",
      default: 0.01,
      section: "Values",
      order: 6
    },
    wrap_labels: {
      type: "boolean",
      label: "Wrap Long Labels",
      default: true,
      section: "Values",
      order: 7
    },
    label_font_size: {
      type: "number",
      label: "Label Font Size",
      default: 12,
      section: "Values",
      order: 8
    },
    value_font_size: {
      type: "number",
      label: "Value Font Size",
      default: 12,
      section: "Values",
      order: 9
    },
    label_color: {
      type: "string",
      label: "Label Color",
      default: "#000000",
      display: "color",
      section: "Values",
      order: 10
    },
    value_color: {
      type: "string",
      label: "Value Color",
      default: "#000000",
      display: "color",
      section: "Values",
      order: 11
    }
  },

  create: function(element, config) {
    const style = document.createElement('style');
    style.innerHTML = `
      .treemap-container {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        font-family: 'Roboto', 'Open Sans', Arial, sans-serif;
        overflow: hidden;
        padding: 0;
        margin: 0;
      }
      .treemap-svg {
        width: 100%;
        height: 100%;
        display: block;
      }
      .treemap-rect {
        cursor: pointer;
        transition: opacity 0.1s ease;
        shape-rendering: crispEdges;
      }
      .treemap-rect:hover {
        opacity: 0.85;
      }
      .treemap-group-rect {
        shape-rendering: crispEdges;
      }
      .treemap-label, .treemap-value {
        pointer-events: none;
        user-select: none;
        font-family: inherit;
      }
      .treemap-label {
        font-weight: 500;
      }
      .treemap-value {
        font-weight: 400;
        opacity: 0.8;
      }
      .treemap-group-label {
        pointer-events: none;
        user-select: none;
        font-family: inherit;
        font-weight: 700;
        font-size: 11px;
      }
      .treemap-breadcrumb {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        background: rgba(255, 255, 255, 0.95);
        padding: 8px 12px;
        border-bottom: 1px solid #ddd;
        font-size: 13px;
        z-index: 10;
        display: none;
        box-sizing: border-box;
      }
      .breadcrumb-item {
        cursor: pointer;
        color: #1976D2;
        text-decoration: none;
        font-weight: 500;
      }
      .breadcrumb-item:hover {
        text-decoration: underline;
      }
      .breadcrumb-separator {
        margin: 0 8px;
        color: #999;
      }
      .treemap-tooltip {
        position: absolute;
        background: rgba(33, 33, 33, 0.9);
        color: white;
        padding: 6px 10px;
        border-radius: 4px;
        font-size: 12px;
        pointer-events: none;
        z-index: 1000;
        display: none;
        white-space: nowrap;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      }
    `;

    if (!document.getElementById('treemap-styles-v5')) {
      style.id = 'treemap-styles-v5';
      document.head.appendChild(style);
    }

    element.innerHTML = `
      <div class="treemap-container">
        <div class="treemap-breadcrumb"></div>
        <svg class="treemap-svg"></svg>
        <div class="treemap-tooltip"></div>
      </div>
    `;

    this._container = element.querySelector('.treemap-container');
    this._svg = element.querySelector('.treemap-svg');
    this._tooltip = element.querySelector('.treemap-tooltip');
    this._breadcrumb = element.querySelector('.treemap-breadcrumb');
    this._drillStack = [];
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    this.clearErrors();

    if (!data || data.length === 0) {
      this._svg.innerHTML = '<text x="50%" y="50%" text-anchor="middle" fill="#999">No data to display</text>';
      done();
      return;
    }

    // Handle pivot data transformation
    const hasPivot = queryResponse.pivots && queryResponse.pivots.length > 0;

    if (hasPivot) {
      // Flatten pivoted data into standard format
      const flatData = [];
      const firstDimField = Object.keys(data[0])[0];

      data.forEach(row => {
        Object.keys(row).forEach(key => {
          // Looker pivot format: field$$$pivotValue
          if (key.includes('$$$')) {
            const [fieldName, pivotValue] = key.split('$$$');
            const dimValue = row[firstDimField]?.value || row[firstDimField];

            flatData.push({
              [firstDimField]: { value: `${dimValue} - ${pivotValue}` },
              [fieldName]: row[key]
            });
          }
        });
      });

      data = flatData;
    }

    const dimensions = queryResponse.fields.dimension_like;
    const measures = queryResponse.fields.measure_like;

    if (dimensions.length === 0 || measures.length === 0) {
      this._svg.innerHTML = '<text x="50%" y="50%" text-anchor="middle" fill="#999">Treemap requires 1 Dimension and 1 Measure</text>';
      done();
      return;
    }

    this._container.style.backgroundColor = config.background_color;
    this._queryResponse = queryResponse;
    this._config = config;
    this._allData = data;
    this._measureField = measures[0];
    this._dimensions = dimensions;

    // Reset drill on config changes
    const configChanged =
      this._lastOthersToggle !== config.others_toggle ||
      this._lastOthersThreshold !== config.others_threshold ||
      this._lastNestedLayout !== config.nested_layout ||
      this._lastColorBy !== config.color_by ||
      this._lastColorPalette !== config.color_palette;

    if (configChanged) {
      this._drillStack = [];
      this._lastOthersToggle = config.others_toggle;
      this._lastOthersThreshold = config.others_threshold;
      this._lastNestedLayout = config.nested_layout;
      this._lastColorBy = config.color_by;
      this._lastColorPalette = config.color_palette;
    }

    if (this._lastDimensionCount !== dimensions.length) {
      this._drillStack = [];
      this._lastDimensionCount = dimensions.length;
    }

    this.drawTreemap(data, config, queryResponse);
    done();
  },

  drawTreemap: function(data, config, queryResponse) {
    const dimensions = queryResponse.fields.dimension_like;
    const measures = queryResponse.fields.measure_like;
    const currentLevel = this._drillStack.length;

    // Determine Active Data
    let activeData = data;
    if (!activeData) {
      activeData = this._allData;
      for (let i = 0; i < currentLevel; i++) {
        const dimName = dimensions[i].name;
        const filterVal = this._drillStack[i];
        activeData = activeData.filter(row => row[dimName].value === filterVal);
      }
    }

    const measure = measures[0].name;

    // Check if we should use nested layout
    // Only use nested layout at top level (drillStack empty) and when we have 2+ dimensions
    const useNestedLayout = config.nested_layout &&
                            dimensions.length >= 2 &&
                            currentLevel === 0;

    let treemapData;

    if (useNestedLayout) {
      treemapData = this.buildNestedData(activeData, dimensions, measure, config);
    } else {
      const dimIndex = Math.min(currentLevel, dimensions.length - 1);
      const dimension = dimensions[dimIndex].name;
      treemapData = this.groupData(activeData, dimension, measure, currentLevel, dimensions.length);

      if (config.others_toggle && treemapData.length > 5) {
        const threshold = (config.others_threshold || 0.5) / 100;
        treemapData = this.groupSmallItems(treemapData, threshold);
      }

      treemapData.sort((a, b) => {
        if (a.isOthers) return 1;
        if (b.isOthers) return -1;
        return b.value - a.value;
      });
    }

    this.updateBreadcrumb();

    if (useNestedLayout) {
      this.renderNestedTreemap(treemapData, config, queryResponse);
    } else {
      const dimIndex = Math.min(currentLevel, dimensions.length - 1);
      const dimension = dimensions[dimIndex].name;
      this.renderTreemap(treemapData, config, dimension, queryResponse);
    }
  },

  // Build nested hierarchical data structure
  buildNestedData: function(data, dimensions, measure, config) {
    const parentDim = dimensions[0].name;
    const childDim = dimensions[1].name;

    // Group by parent dimension
    const parentGroups = {};

    data.forEach(row => {
      const parentKey = row[parentDim].value;
      const childKey = row[childDim].value;
      const val = row[measure] && row[measure].value !== null ? Number(row[measure].value) : 0;
      const rendered = row[measure] && row[measure].rendered ? row[measure].rendered : null;

      if (!parentGroups[parentKey]) {
        parentGroups[parentKey] = {
          name: parentKey,
          value: 0,
          rawValue: 0,
          children: {},
          childrenArray: [],
          rows: []
        };
      }

      parentGroups[parentKey].value += Math.max(0, val);
      parentGroups[parentKey].rawValue += val;
      parentGroups[parentKey].rows.push(row);

      // Group children within parent
      if (!parentGroups[parentKey].children[childKey]) {
        parentGroups[parentKey].children[childKey] = {
          name: childKey,
          value: 0,
          rawValue: 0,
          rendered: null,
          rows: [],
          parentName: parentKey
        };
      }

      parentGroups[parentKey].children[childKey].value += Math.max(0, val);
      parentGroups[parentKey].children[childKey].rawValue += val;
      if (!parentGroups[parentKey].children[childKey].rendered && rendered) {
        parentGroups[parentKey].children[childKey].rendered = rendered;
      }
      parentGroups[parentKey].children[childKey].rows.push(row);
    });

    // Convert to array and sort
    const result = Object.values(parentGroups).map(parent => {
      let childrenArray = Object.values(parent.children).filter(c => c.value > 0);

      // Apply "Others" grouping to children if enabled
      if (config.others_toggle && childrenArray.length > 5) {
        const threshold = (config.others_threshold || 0.5) / 100;
        const parentTotal = parent.value;
        const visible = [];
        const others = [];

        childrenArray.forEach(child => {
          if ((child.value / parentTotal) >= threshold) {
            visible.push(child);
          } else {
            others.push(child);
          }
        });

        if (others.length > 1) {
          visible.push({
            name: "Others",
            value: others.reduce((s, c) => s + c.value, 0),
            rawValue: others.reduce((s, c) => s + c.rawValue, 0),
            rows: others.flatMap(c => c.rows),
            isOthers: true,
            parentName: parent.name
          });
        } else if (others.length === 1) {
          visible.push(others[0]);
        }

        childrenArray = visible;
      }

      // Sort children by value
      childrenArray.sort((a, b) => {
        if (a.isOthers) return 1;
        if (b.isOthers) return -1;
        return b.value - a.value;
      });

      return {
        ...parent,
        childrenArray: childrenArray
      };
    }).filter(p => p.value > 0);

    // Sort parent groups by value
    result.sort((a, b) => b.value - a.value);

    return result;
  },

  // Render nested treemap with parent groups and children
  renderNestedTreemap: function(data, config, queryResponse) {
    const svgNS = "http://www.w3.org/2000/svg";
    this._svg.innerHTML = '';

    const rect = this._container.getBoundingClientRect();
    const breadcrumbHeight = this._drillStack.length > 0 ? 36 : 0;
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height - breadcrumbHeight);

    if (width <= 0 || height <= 0) return;

    this._svg.style.marginTop = `${breadcrumbHeight}px`;
    this._svg.style.height = `calc(100% - ${breadcrumbHeight}px)`;
    this._svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    const totalValue = data.reduce((sum, d) => sum + d.value, 0);
    const rootArea = width * height;
    const headerHeight = config.group_header_height || 20;
    const groupPadding = config.group_padding || 2;

    // Calculate parent group areas
    const parentNodes = data.map(d => ({
      ...d,
      area: (d.value / totalValue) * rootArea
    }));

    // Layout parent groups
    const parentLayout = this.squarify(parentNodes, 0, 0, width, height);

    // Get colors for parent groups
    const parentColors = this.getCategoricalColors(data.length, config);

    parentLayout.forEach((parent, parentIndex) => {
      const g = document.createElementNS(svgNS, 'g');

      const px = Math.round(parent.x);
      const py = Math.round(parent.y);
      const pw = Math.round(parent.width);
      const ph = Math.round(parent.height);

      // Draw parent border/background
      const parentRect = document.createElementNS(svgNS, 'rect');
      parentRect.setAttribute('x', px);
      parentRect.setAttribute('y', py);
      parentRect.setAttribute('width', pw);
      parentRect.setAttribute('height', ph);
      parentRect.setAttribute('fill', 'none');
      parentRect.setAttribute('stroke', config.border_color || '#FFFFFF');
      parentRect.setAttribute('stroke-width', Math.max(1, config.border_width || 1));
      parentRect.setAttribute('class', 'treemap-group-rect');
      g.appendChild(parentRect);

      // Draw header background
      if (headerHeight > 0) {
        const headerRect = document.createElementNS(svgNS, 'rect');
        headerRect.setAttribute('x', px);
        headerRect.setAttribute('y', py);
        headerRect.setAttribute('width', pw);
        headerRect.setAttribute('height', Math.min(headerHeight, ph));
        headerRect.setAttribute('fill', config.group_header_bg_color || '#4285F4');
        headerRect.setAttribute('class', 'treemap-group-rect');
        g.appendChild(headerRect);

        // Draw header label
        if (pw > 40) {
          const headerLabel = document.createElementNS(svgNS, 'text');
          headerLabel.setAttribute('x', px + 5);
          headerLabel.setAttribute('y', py + Math.min(headerHeight, ph) - 5);
          headerLabel.setAttribute('fill', config.group_header_text_color || '#FFFFFF');
          headerLabel.setAttribute('class', 'treemap-group-label');

          let labelText = parent.name;
          if (this.estimateTextWidth(labelText, 11) > pw - 10) {
            labelText = this.ellipsize(labelText, pw - 10, 11);
          }
          headerLabel.textContent = labelText;
          g.appendChild(headerLabel);
        }
      }

      // Calculate child area
      const childX = px + groupPadding;
      const childY = py + headerHeight + groupPadding;
      const childW = pw - (groupPadding * 2);
      const childH = ph - headerHeight - (groupPadding * 2);

      if (childW > 0 && childH > 0 && parent.childrenArray && parent.childrenArray.length > 0) {
        const childTotal = parent.childrenArray.reduce((sum, c) => sum + c.value, 0);
        const childArea = childW * childH;

        // Create child nodes
        const childNodes = parent.childrenArray.map(child => ({
          ...child,
          area: (child.value / childTotal) * childArea,
          percent: (child.value / totalValue) * 100,
          parentColor: parentColors[parentIndex % parentColors.length]
        }));

        // Layout children within parent
        const childLayout = this.squarify(childNodes, childX, childY, childW, childH);

        // Get child colors based on config
        let childColors;
        if (config.color_by === 'parent') {
          // Shade variations of parent color
          childColors = this.getShadeVariations(parentColors[parentIndex % parentColors.length], childLayout.length);
        } else if (config.color_by === 'metric' && config.use_gradient) {
          childColors = null; // Will be calculated per-child
        } else {
          childColors = this.getColors(childLayout, config);
        }

        childLayout.forEach((child, childIndex) => {
          const childG = document.createElementNS(svgNS, 'g');

          const cx = Math.round(child.x);
          const cy = Math.round(child.y);
          const cw = Math.max(1, Math.round(child.width));
          const ch = Math.max(1, Math.round(child.height));

          const childRect = document.createElementNS(svgNS, 'rect');
          childRect.setAttribute('x', cx);
          childRect.setAttribute('y', cy);
          childRect.setAttribute('width', cw);
          childRect.setAttribute('height', ch);

          // Determine fill color
          let fillColor;
          if (config.color_by === 'metric' && config.use_gradient) {
            const allValues = parent.childrenArray.map(c => c.value);
            const min = Math.min(...allValues);
            const max = Math.max(...allValues);
            const ratio = (max === min) ? 0.5 : (child.value - min) / (max - min);
            let startColor = config.gradient_start_color || '#F1F8E9';
            let endColor = config.gradient_end_color || '#33691E';
            if (config.reverse_palette) {
              [startColor, endColor] = [endColor, startColor];
            }
            fillColor = this.interpolateColor(startColor, endColor, ratio);
          } else {
            fillColor = childColors[childIndex % childColors.length];
          }

          childRect.setAttribute('fill', fillColor);
          childRect.setAttribute('stroke', config.border_color || '#FFFFFF');
          childRect.setAttribute('stroke-width', Math.max(0.5, (config.border_width || 1) * 0.5));
          childRect.setAttribute('class', 'treemap-rect');

          // Click handler - drill down to this child
          childRect.addEventListener('click', (e) => {
            e.stopPropagation();

            if (this._config.enable_drill_down) {
              if (child.isOthers) {
                // For "Others", show its children as flat list
                this._drillStack.push(parent.name);
                this.drawTreemap(child.rows, this._config, this._queryResponse);
              } else {
                // Drill into this specific item
                this._drillStack.push(parent.name);
                this._drillStack.push(child.name);
                this.drawTreemap(null, this._config, this._queryResponse);
              }
            } else {
              // LookML drill
              let drillLinks = [];
              if (child.rows && child.rows.length > 0) {
                const firstRow = child.rows[0];
                Object.keys(firstRow).forEach(key => {
                  if (firstRow[key] && firstRow[key].links && firstRow[key].links.length > 0) {
                    drillLinks = firstRow[key].links;
                  }
                });
              }
              if (drillLinks.length > 0 && LookerCharts && LookerCharts.Utils) {
                LookerCharts.Utils.openDrillMenu({ links: drillLinks, event: e });
              }
            }
          });

          // Tooltip
          childRect.addEventListener('mouseenter', () => {
            const formattedValue = this.formatValue(child.rawValue, config, child.rendered);
            const pct = child.percent.toFixed(1);
            this._tooltip.innerHTML = `
              <div style="font-weight:600; margin-bottom:2px">${parent.name} › ${child.name}</div>
              <div>${formattedValue} (${pct}%)</div>
              <div style="font-size:10px; opacity:0.8">(Click to drill down)</div>
            `;
            this._tooltip.style.display = 'block';
          });

          childRect.addEventListener('mousemove', (e) => {
            const tooltipRect = this._tooltip.getBoundingClientRect();
            let left = e.pageX + 12;
            let top = e.pageY + 12;
            if (left + tooltipRect.width > window.innerWidth) left = e.pageX - tooltipRect.width - 12;
            if (top + tooltipRect.height > window.innerHeight) top = e.pageY - tooltipRect.height - 12;
            this._tooltip.style.left = left + 'px';
            this._tooltip.style.top = top + 'px';
          });

          childRect.addEventListener('mouseleave', () => {
            this._tooltip.style.display = 'none';
          });

          childG.appendChild(childRect);

          // Add labels if space permits
          if (cw > 25 && ch > 15 && child.percent >= (config.label_threshold || 0)) {
            this.addLabelsToRect(childG, {
              x: cx, y: cy, width: cw, height: ch,
              name: child.name,
              rawValue: child.rawValue,
              value: child.value,
              rendered: child.rendered,
              percent: child.percent
            }, config, svgNS, totalValue);
          }

          g.appendChild(childG);
        });
      }

      this._svg.appendChild(g);
    });
  },

  // Get categorical colors for parent groups
  getCategoricalColors: function(count, config) {
    const palettes = {
      categorical: ['#E07D54', '#7EB77F', '#64B5F6', '#BA68C8', '#FFB74D', '#4FC3F7', '#F06292', '#AED581', '#90A4AE', '#FFD54F'],
      google: ['#4285F4', '#EA4335', '#FBBC04', '#34A853', '#FF6D00', '#46BDC6', '#AB47BC', '#7BAAF7', '#F07B72', '#FCD04F'],
      green_scale: ['#1B5E20', '#2E7D32', '#388E3C', '#43A047', '#4CAF50', '#66BB6A', '#81C784', '#A5D6A7', '#C8E6C9', '#E8F5E9'],
      blue_scale: ['#0D47A1', '#1565C0', '#1976D2', '#1E88E5', '#2196F3', '#42A5F5', '#64B5F6', '#90CAF9', '#BBDEFB', '#E3F2FD'],
      viridis: ['#440154', '#482475', '#414487', '#355F8D', '#2A788E', '#21908C', '#22A884', '#42BE71', '#7AD151', '#FDE725'],
      warm: ['#7F2704', '#A63603', '#D94801', '#F16913', '#FD8D3C', '#FDAE6B', '#FDD0A2', '#FEE6CE', '#FFF5EB'],
      cool: ['#08306B', '#08519C', '#2171B5', '#4292C6', '#6BAED6', '#9ECAE1', '#C6DBEF', '#DEEBF7', '#F0F9FF']
    };

    let palette = palettes[config.color_palette] || palettes.categorical;
    if (config.reverse_palette) {
      palette = [...palette].reverse();
    }

    // Extend palette if needed
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(palette[i % palette.length]);
    }
    return colors;
  },

  // Get shade variations of a color
  getShadeVariations: function(baseColor, count) {
    const shades = [];
    for (let i = 0; i < count; i++) {
      const factor = 0.7 + (0.3 * (i / Math.max(1, count - 1)));
      shades.push(this.adjustBrightness(baseColor, factor));
    }
    return shades;
  },

  adjustBrightness: function(color, factor) {
    let c = color.replace('#', '');
    if (c.length === 3) {
      c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
    }
    const r = Math.min(255, Math.round(parseInt(c.substring(0, 2), 16) * factor));
    const g = Math.min(255, Math.round(parseInt(c.substring(2, 4), 16) * factor));
    const b = Math.min(255, Math.round(parseInt(c.substring(4, 6), 16) * factor));
    return `rgb(${r}, ${g}, ${b})`;
  },

  // Standard flat treemap rendering (existing logic)
  renderTreemap: function(data, config, dimension, queryResponse) {
    const svgNS = "http://www.w3.org/2000/svg";
    this._svg.innerHTML = '';

    const rect = this._container.getBoundingClientRect();
    const breadcrumbHeight = this._drillStack.length > 0 ? 36 : 0;
    const width = Math.floor(rect.width);
    const height = Math.floor(rect.height - breadcrumbHeight);

    if (width <= 0 || height <= 0) return;

    this._svg.style.marginTop = `${breadcrumbHeight}px`;
    this._svg.style.height = `calc(100% - ${breadcrumbHeight}px)`;
    this._svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    const totalValue = data.reduce((sum, d) => sum + d.value, 0);
    const rootArea = width * height;

    const nodes = data.map(d => ({
      ...d,
      area: (d.value / totalValue) * rootArea,
      percent: (d.value / totalValue) * 100,
      drillLinks: (d.children && d.children.length > 0 && dimension && d.children[0][dimension])
        ? (d.children[0][dimension].links || [])
        : [],
      rawData: d.children || []
    }));
    let layout = this.squarify(nodes, 0, 0, width, height);

    if (layout.length > 0) {
      const lastItem = layout[layout.length - 1];
      lastItem.width = width - lastItem.x;
      lastItem.height = height - lastItem.y;
    }

    const colors = this.getColors(data, config);

    layout.forEach((item, i) => {
      const g = document.createElementNS(svgNS, 'g');
      const rectEl = document.createElementNS(svgNS, 'rect');

      const isLast = (i === layout.length - 1);
      const x = Math.round(item.x);
      const y = Math.round(item.y);
      const w = isLast ? (width - x) : (Math.round(item.x + item.width) - x);
      const h = isLast ? (height - y) : (Math.round(item.y + item.height) - y);

      rectEl.setAttribute('x', x);
      rectEl.setAttribute('y', y);
      rectEl.setAttribute('width', Math.max(1, w));
      rectEl.setAttribute('height', Math.max(1, h));

      let fillColor;
      if (config.color_by === 'metric' && config.use_gradient) {
        const allValues = data.map(d => d.value);
        const min = Math.min(...allValues);
        const max = Math.max(...allValues);
        const ratio = (max === min) ? 0.5 : (item.value - min) / (max - min);
        let startColor = config.gradient_start_color || '#F1F8E9';
        let endColor = config.gradient_end_color || '#33691E';
        if (config.reverse_palette) {
          [startColor, endColor] = [endColor, startColor];
        }
        fillColor = this.interpolateColor(startColor, endColor, ratio);
      } else {
        fillColor = colors[i % colors.length];
      }

      rectEl.setAttribute('fill', fillColor);
      rectEl.setAttribute('stroke', config.border_color);
      rectEl.setAttribute('stroke-width', config.border_width);
      rectEl.setAttribute('class', 'treemap-rect');

      rectEl.addEventListener('click', (e) => {
        e.stopPropagation();

        if (this._config.enable_drill_down && (item.isDrillable || item.isOthers)) {
          if (item.isOthers) {
            this.drawTreemap(item.rawData, this._config, this._queryResponse);
          } else {
            this._drillStack.push(item.name);
            this.drawTreemap(null, this._config, this._queryResponse);
          }
        } else {
          let drillLinks = [];
          if (item.rawData && item.rawData.length > 0) {
            const firstRow = item.rawData[0];
            Object.keys(firstRow).forEach(key => {
              if (firstRow[key] && firstRow[key].links && firstRow[key].links.length > 0) {
                drillLinks = firstRow[key].links;
              }
            });
          }
          if (drillLinks.length > 0 && LookerCharts && LookerCharts.Utils) {
            LookerCharts.Utils.openDrillMenu({ links: drillLinks, event: e });
          }
        }
      });

      rectEl.addEventListener('mouseenter', () => {
        const formattedValue = this.formatValue(item.rawValue, config, item.rendered);
        const pct = item.percent.toFixed(1);
        this._tooltip.innerHTML = `
          <div style="font-weight:600; margin-bottom:2px">${item.name}</div>
          <div>${formattedValue} (${pct}%)</div>
          ${item.isDrillable ? '<div style="font-size:10px; opacity:0.8">(Click to drill down)</div>' : ''}
        `;
        this._tooltip.style.display = 'block';
      });

      rectEl.addEventListener('mousemove', (e) => {
        const tooltipRect = this._tooltip.getBoundingClientRect();
        let left = e.pageX + 12;
        let top = e.pageY + 12;
        if (left + tooltipRect.width > window.innerWidth) left = e.pageX - tooltipRect.width - 12;
        if (top + tooltipRect.height > window.innerHeight) top = e.pageY - tooltipRect.height - 12;
        this._tooltip.style.left = left + 'px';
        this._tooltip.style.top = top + 'px';
      });

      rectEl.addEventListener('mouseleave', () => {
        this._tooltip.style.display = 'none';
      });

      g.appendChild(rectEl);

      if (item.percent >= (config.label_threshold || 0)) {
        this.addLabelsToRect(g, {
          x: x, y: y, width: w, height: h,
          name: item.name,
          rawValue: item.rawValue,
          value: item.value,
          rendered: item.rendered,
          percent: item.percent
        }, config, svgNS, totalValue);
      }

      this._svg.appendChild(g);
    });
  },

  // Unified label adding function
  addLabelsToRect: function(g, item, config, svgNS, totalValue) {
    const labelFontSize = config.label_font_size || 12;
    const valueFontSize = config.value_font_size || 12;
    const padding = 4;

    if (item.width < 20 || item.height < 15) return;

    const maxWidth = item.width - (padding * 2);
    const maxHeight = item.height - (padding * 2);

    const showLabel = config.show_labels && (maxWidth >= 30) && (maxHeight >= labelFontSize + 4);
    const showValue = config.show_values && (maxWidth >= 30) && (maxHeight >= valueFontSize + 4);

    if (!showLabel && !showValue) return;

    const labelText = item.name;
    const valueText = this.getValueDisplayText(item, config, totalValue);
    const canFitStacked = showLabel && showValue && (maxHeight >= (labelFontSize + valueFontSize + 8));
    let currentY = item.y + (item.height / 2);

    if (canFitStacked) currentY -= 2;

    if (showLabel) {
      const labelEl = document.createElementNS(svgNS, 'text');
      labelEl.setAttribute('x', item.x + (item.width / 2));
      labelEl.setAttribute('y', canFitStacked ? currentY - (valueFontSize / 2) : currentY + (labelFontSize / 3));
      labelEl.setAttribute('text-anchor', 'middle');
      labelEl.setAttribute('fill', config.label_color);
      labelEl.setAttribute('font-size', labelFontSize);
      labelEl.setAttribute('class', 'treemap-label');

      let finalLabel = labelText;
      if (this.estimateTextWidth(labelText, labelFontSize) > maxWidth) {
        finalLabel = this.ellipsize(labelText, maxWidth, labelFontSize);
      }
      labelEl.textContent = finalLabel;
      g.appendChild(labelEl);
    }

    if (showValue) {
      if (!canFitStacked && showLabel) return;

      const valEl = document.createElementNS(svgNS, 'text');
      valEl.setAttribute('x', item.x + (item.width / 2));
      valEl.setAttribute('y', canFitStacked ? currentY + valueFontSize + 2 : currentY + (valueFontSize / 3));
      valEl.setAttribute('text-anchor', 'middle');
      valEl.setAttribute('fill', config.value_color);
      valEl.setAttribute('font-size', valueFontSize);
      valEl.setAttribute('class', 'treemap-value');
      valEl.textContent = valueText;

      if (this.estimateTextWidth(valueText, valueFontSize) <= maxWidth) {
        g.appendChild(valEl);
      }
    }
  },

  // Grouping functions
  groupSmallItems: function(data, threshold) {
    const total = data.reduce((sum, d) => sum + d.value, 0);
    const visible = [];
    const others = [];

    data.forEach(d => {
      if (d.isOthers || (d.value / total) >= threshold) {
        visible.push(d);
      } else {
        others.push(d);
      }
    });

    if (others.length > 1) {
      const othersNode = {
        name: "Others",
        value: others.reduce((s, d) => s + d.value, 0),
        rawValue: others.reduce((s, d) => s + d.rawValue, 0),
        rawData: others.flatMap(o => o.rawData || o.children || []),
        children: others.flatMap(o => o.rawData || o.children || []),
        isOthers: true,
        level: others[0].level,
        dimension: others[0].dimension
      };
      visible.push(othersNode);
      return visible;
    }

    return data;
  },

  groupData: function(data, dimension, measure, level, maxDepth) {
    const grouped = {};
    data.forEach(row => {
      const key = row[dimension].value;
      const safeKey = "k_" + key;
      if (!grouped[safeKey]) {
        grouped[safeKey] = {
          name: key,
          value: 0,
          rawValue: 0,
          rendered: null,
          children: [],
          level: level,
          isDrillable: level < maxDepth - 1
        };
      }
      const measureField = this._measureField;
      const cell = row[measureField.name];
      const val = cell && cell.value !== null ? Number(cell.value) : 0;
      const rendered = cell && cell.rendered ? cell.rendered : null;

      grouped[safeKey].value += Math.max(0, val);
      grouped[safeKey].rawValue += val;
      if (!grouped[safeKey].rendered && rendered) {
        grouped[safeKey].rendered = rendered;
      }
      grouped[safeKey].children.push(row);
    });

    return Object.values(grouped).filter(d => d.value > 0);
  },

  // Squarify algorithm
  squarify: function(nodes, x, y, width, height) {
    const results = [];
    if (nodes.length === 0) return results;

    let remainingNodes = nodes.slice();
    let container = { x, y, width, height };

    let currentRow = [];
    while (remainingNodes.length > 0) {
      const nextNode = remainingNodes[0];
      if (this.improvesRatio(currentRow, nextNode, container)) {
        currentRow.push(remainingNodes.shift());
      } else {
        this.layoutRow(currentRow, container, results);
        currentRow = [];
      }
    }
    if (currentRow.length > 0) {
      this.layoutLastRow(currentRow, container, results);
    }
    return results;
  },

  improvesRatio: function(currentRow, nextNode, container) {
    if (currentRow.length === 0) return true;
    const newRow = currentRow.concat(nextNode);
    const currentWorst = this.calculateWorstRatio(currentRow, container);
    const nextWorst = this.calculateWorstRatio(newRow, container);
    return nextWorst <= currentWorst;
  },

  calculateWorstRatio: function(row, container) {
    if (row.length === 0) return Infinity;
    const sideLength = Math.min(container.width, container.height);
    const totalArea = row.reduce((sum, node) => sum + node.area, 0);
    const rowThickness = totalArea / sideLength;
    let maxRatio = 0;
    for (let i = 0; i < row.length; i++) {
      const itemLength = row[i].area / rowThickness;
      const ratio = Math.max(rowThickness / itemLength, itemLength / rowThickness);
      if (ratio > maxRatio) maxRatio = ratio;
    }
    return maxRatio;
  },

  layoutRow: function(row, container, results) {
    const totalArea = row.reduce((sum, node) => sum + node.area, 0);
    const useWidth = container.width < container.height;

    if (useWidth) {
      const rowHeight = totalArea / container.width;
      let runningX = container.x;
      row.forEach((node, i) => {
        let nodeWidth;
        if (i === row.length - 1) {
          nodeWidth = Math.max(0, (container.x + container.width) - runningX);
        } else {
          nodeWidth = node.area / rowHeight;
        }
        results.push({ ...node, x: runningX, y: container.y, width: nodeWidth, height: rowHeight });
        runningX += nodeWidth;
      });
      container.y += rowHeight;
      container.height -= rowHeight;
    } else {
      const rowWidth = totalArea / container.height;
      let runningY = container.y;
      row.forEach((node, i) => {
        let nodeHeight;
        if (i === row.length - 1) {
          nodeHeight = Math.max(0, (container.y + container.height) - runningY);
        } else {
          nodeHeight = node.area / rowWidth;
        }
        results.push({ ...node, x: container.x, y: runningY, width: rowWidth, height: nodeHeight });
        runningY += nodeHeight;
      });
      container.x += rowWidth;
      container.width -= rowWidth;
    }
  },

  layoutLastRow: function(row, container, results) {
    const useWidth = container.width < container.height;

    if (useWidth) {
      const totalArea = row.reduce((sum, n) => sum + n.area, 0);
      let runningX = container.x;

      row.forEach((node, i) => {
        let nodeWidth;
        if (i === row.length - 1) {
          nodeWidth = container.x + container.width - runningX;
        } else {
          nodeWidth = (node.area / totalArea) * container.width;
        }

        results.push({
          ...node,
          x: runningX,
          y: container.y,
          width: nodeWidth,
          height: container.height
        });
        runningX += nodeWidth;
      });
    } else {
      const totalArea = row.reduce((sum, n) => sum + n.area, 0);
      let runningY = container.y;

      row.forEach((node, i) => {
        let nodeHeight;
        if (i === row.length - 1) {
          nodeHeight = container.y + container.height - runningY;
        } else {
          nodeHeight = (node.area / totalArea) * container.height;
        }

        results.push({
          ...node,
          x: container.x,
          y: runningY,
          width: container.width,
          height: nodeHeight
        });
        runningY += nodeHeight;
      });
    }
  },

  // Value formatting
  getValueDisplayText: function(item, config, totalValue) {
    const displayFormat = config.value_display_format || 'value';
    const formattedValue = this.formatValue(item.rawValue, config, item.rendered);
    const pct = ((item.value / totalValue) * 100).toFixed(1) + '%';

    switch (displayFormat) {
      case 'percent':
        return pct;
      case 'both':
        return `${formattedValue} (${pct})`;
      case 'value':
      default:
        return formattedValue;
    }
  },

  formatValue: function(value, config, renderedValue) {
    const formatType = config.value_format || 'auto';
    const customFormat = config.value_format_custom || '';
    const field = this._measureField;

    if (customFormat && customFormat.trim() !== '') {
      return this.applyCustomFormat(value, customFormat);
    }

    if (isNaN(value)) return String(value);

    if (formatType === 'auto') {
      if (renderedValue !== null && renderedValue !== undefined) {
        return renderedValue;
      }
      if (field && field.value_format) {
        return this.applyLookMLFormat(value, field.value_format);
      }
    }

    switch (formatType) {
      case 'currency':
        return '$' + (value >= 1000 ? (value / 1000).toFixed(1) + 'K' : value.toFixed(0));
      case 'percent_fmt':
        return (value * 100).toFixed(1) + '%';
      case 'decimal1':
        return value.toFixed(1);
      case 'decimal2':
        return value.toFixed(2);
      case 'number':
        return value.toLocaleString();
      case 'abbreviated':
        return this.abbreviateValue(value);
    }

    return this.abbreviateValue(value);
  },

  applyLookMLFormat: function(value, fmt) {
    const num = Number(value);

    if (fmt.includes('," k"') || fmt.includes(",'k'")) {
      const decimals = (fmt.match(/0\.([0#]+)/) || [])[1]?.length || 0;
      const sign = (num < 0) ? '-' : '';
      const baseVal = Math.abs(num) / 1000;
      const formattedNum = baseVal.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        useGrouping: true
      });
      return `${sign}$${formattedNum} k`;
    }

    if (fmt.startsWith('$')) {
      const decimals = (fmt.match(/0\.([0#]+)/) || [])[1]?.length || 0;
      return '$' + num.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
    }

    if (fmt.includes('#,##0')) {
      const decimals = (fmt.match(/0\.([0#]+)/) || [])[1]?.length || 0;
      return num.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      });
    }

    if (fmt.includes('%')) {
      const decimals = (fmt.match(/0\.([0#]+)/) || [])[1]?.length || 0;
      return (num * 100).toFixed(decimals) + '%';
    }

    return this.abbreviateValue(value);
  },

  applyCustomFormat: function(value, customFormat) {
    if (isNaN(value)) return String(value);

    const num = Number(value);

    if (customFormat.includes('$') || customFormat.includes('€') || customFormat.includes('£')) {
      let currency = customFormat.match(/[$€£]/)?.[0] || '';
      let decimals = (customFormat.match(/0\.([0#]+)/) || [])[1]?.length || 0;
      let scaledValue = num;
      let scaledSuffix = '';

      if (customFormat.includes(',')) {
        if (customFormat.includes('," k"') || customFormat.includes(",'k'")) {
          scaledValue = num / 1000;
          scaledSuffix = ' k';
        }
        else if (customFormat.includes('," M"') || customFormat.includes(",'M'")) {
          scaledValue = num / 1000000;
          scaledSuffix = ' M';
        }
      }

      const formattedNumber = scaledValue.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
        useGrouping: customFormat.includes(',')
      });
      return `${currency}${formattedNumber}${scaledSuffix}`;
    }

    if (customFormat.includes('%')) {
      const decimals = (customFormat.match(/0\.([0#]+)/) || [])[1]?.length || 0;
      return (num * 100).toFixed(decimals) + '%';
    }

    const decimals = (customFormat.match(/0\.([0#]+)/) || [])[1]?.length || 0;
    return num.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  },

  abbreviateValue: function(value) {
    if (value >= 1e9) return (value / 1e9).toFixed(1) + 'B';
    if (value >= 1e6) return (value / 1e6).toFixed(1) + 'M';
    if (value >= 1e3) return (value / 1e3).toFixed(1) + 'K';
    return value.toFixed(0);
  },

  // Utility functions
  ellipsize: function(text, maxWidth, fontSize) {
    const estimatedCharWidth = fontSize * 0.6;
    const maxChars = Math.floor(maxWidth / estimatedCharWidth);
    if (text.length <= maxChars) return text;
    return text.substring(0, Math.max(0, maxChars - 2)) + '..';
  },

  estimateTextWidth: function(text, fontSize) {
    return text.length * (fontSize * 0.6);
  },

  updateBreadcrumb: function() {
    if (this._drillStack.length === 0) {
      this._breadcrumb.style.display = 'none';
      return;
    }
    this._breadcrumb.style.display = 'block';
    let html = '<span class="breadcrumb-item" data-level="-1">All</span>';
    this._drillStack.forEach((item, idx) => {
      html += '<span class="breadcrumb-separator">/</span>';
      html += `<span class="breadcrumb-item" data-level="${idx}">${item}</span>`;
    });
    this._breadcrumb.innerHTML = html;
    this._breadcrumb.querySelectorAll('.breadcrumb-item').forEach(elem => {
      elem.addEventListener('click', (e) => {
        const level = parseInt(e.target.getAttribute('data-level'));
        this._drillStack = (level === -1) ? [] : this._drillStack.slice(0, level + 1);
        this.drawTreemap(null, this._config, this._queryResponse);
      });
    });
  },

  getColors: function(data, config) {
    const palettes = {
      green_scale: ['#F1F8E9', '#DCEDC8', '#C5E1A5', '#AED581', '#9CCC65', '#8BC34A', '#7CB342', '#689F38', '#558B2F', '#33691E', '#1B5E20'],
      blue_scale: ['#E3F2FD', '#BBDEFB', '#90CAF9', '#64B5F6', '#42A5F5', '#2196F3', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1', '#0A3D91'],
      google: ['#4285F4', '#EA4335', '#FBBC04', '#34A853', '#FF6D00', '#46BDC6', '#AB47BC', '#7BAAF7', '#F07B72', '#FCD04F', '#71C287'],
      viridis: ['#440154', '#482475', '#414487', '#355F8D', '#2A788E', '#21908C', '#22A884', '#42BE71', '#7AD151', '#BDDF26', '#FDE725'],
      warm: ['#FFF5EB', '#FEE6CE', '#FDD0A2', '#FDAE6B', '#FD8D3C', '#F16913', '#E6550D', '#D94801', '#A63603', '#7F2704'],
      cool: ['#F0F9FF', '#DEEBF7', '#C6DBEF', '#9ECAE1', '#6BAED6', '#4292C6', '#2171B5', '#08519C', '#08306B', '#041E42'],
      categorical: ['#E07D54', '#7EB77F', '#64B5F6', '#BA68C8', '#FFB74D', '#4FC3F7', '#F06292', '#AED581', '#90A4AE', '#FFD54F']
    };

    let palette = palettes[config.color_palette] || palettes.green_scale;

    if (config.reverse_palette) {
      palette = [...palette].reverse();
    }

    const itemCount = data.length;

    if (itemCount <= palette.length) {
      return palette.slice(0, itemCount);
    }

    const colors = [];
    for (let i = 0; i < itemCount; i++) {
      const position = i / Math.max(1, itemCount - 1);
      const paletteIndex = position * (palette.length - 1);
      const lowerIndex = Math.floor(paletteIndex);
      const upperIndex = Math.min(palette.length - 1, Math.ceil(paletteIndex));
      const blend = paletteIndex - lowerIndex;

      colors.push(this.interpolateColor(palette[lowerIndex], palette[upperIndex], blend));
    }

    return colors;
  },

  interpolateColor: function(color1, color2, ratio) {
    const hex = (c) => {
      c = c.replace('#', '');
      if (c.startsWith('rgb')) {
        const match = c.match(/\d+/g);
        return { r: parseInt(match[0]), g: parseInt(match[1]), b: parseInt(match[2]) };
      }
      return {
        r: parseInt(c.substring(0, 2), 16),
        g: parseInt(c.substring(2, 4), 16),
        b: parseInt(c.substring(4, 6), 16)
      };
    };
    const c1 = hex(color1), c2 = hex(color2);
    const r = Math.round(c1.r + (c2.r - c1.r) * ratio);
    const g = Math.round(c1.g + (c2.g - c1.g) * ratio);
    const b = Math.round(c1.b + (c2.b - c1.b) * ratio);
    return `rgb(${r}, ${g}, ${b})`;
  }
});

/**
 * Custom Bar Chart - Refined Version
 * Translated to English & Optimized with Reference Best Practices
 */

// --- 1. DEPENDENCY LOADER (Required for Admin Panel/CDN) ---
const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === "true") return resolve();
      existing.addEventListener('load', resolve);
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.dataset.loaded = "false";
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () => reject();
    document.head.appendChild(script);
  });
};

// Load D3.js immediately
loadScript("https://d3js.org/d3.v5.min.js");

looker.plugins.visualizations.add({
  options: {
    // ========== Y AXIS SECTION ==========
    y_axis_header: { type: 'string', label: '--- Title ---', display: 'heading', section: 'Y', order: 1 },
    show_y_axis_title: { type: 'boolean', label: 'Show Y-Axis Title', default: true, section: 'Y', order: 2 },
    y_axis_title_custom: { type: 'string', label: 'Custom Title', placeholder: 'Auto', section: 'Y', order: 3 },
    y_axis_title_size: { type: 'number', label: 'Title Font Size', default: 12, section: 'Y', order: 4, display_size: 'half' },
    y_axis_title_bold: { type: 'boolean', label: 'Bold Title', default: false, section: 'Y', order: 5, display_size: 'half' },

    y_scale_header: { type: 'string', label: '--- Scale & Gridlines ---', display: 'heading', section: 'Y', order: 6 },
    y_min_value: { type: 'number', label: 'Min Value', placeholder: 'Auto', section: 'Y', order: 7 },
    y_max_type: {
      type: 'string', label: 'Max Value Mode', display: 'radio', section: 'Y', order: 8,
      values: [{ 'Auto': 'auto' }, { 'Data %': 'percentage' }, { 'Fixed': 'fixed' }], default: 'auto'
    },
    y_max_percentage: { type: 'number', label: 'Percentage of Max', default: 130, section: 'Y', order: 9, display_size: 'half', hidden: true },
    y_max_fixed: { type: 'number', label: 'Fixed Max Value', section: 'Y', order: 10, display_size: 'half', hidden: true },
    y_axis_grid_color: { type: 'string', label: 'Gridline Color', display: 'color', default: '#e0e0e0', section: 'Y', order: 14 },

    // ========== X AXIS SECTION ==========
    x_axis_header: { type: 'string', label: '--- Labels ---', display: 'heading', section: 'X', order: 100 },
    x_axis_label_rotation: { type: 'number', label: 'Label Rotation', default: 0, section: 'X', order: 107, display_size: 'half' },
    x_axis_bottom_margin: { type: 'number', label: 'Bottom Margin (px)', default: 60, section: 'X', order: 108, display_size: 'half' },

    // ========== BARS SECTION ==========
    bar_layout_header: { type: 'string', label: '--- Layout ---', display: 'heading', section: 'Bars', order: 200 },
    stacking: {
      type: 'string', label: 'Stacking Mode', section: 'Bars', order: 210, display: 'radio',
      values: [{ 'Grouped': 'none' }, { 'Stacked': 'normal' }, { '100% Stacked': 'percent' }], default: 'none'
    },
    bar_thickness: { type: 'number', label: 'Bar Width (%)', default: 80, section: 'Bars', order: 230 },

    label_header: { type: 'string', label: '--- Value Labels ---', display: 'heading', section: 'Bars', order: 239 },
    show_value_labels: { type: 'boolean', label: 'Show Value Labels', default: false, section: 'Bars', order: 240 },
    value_label_color: { type: 'string', label: 'Label Color', display: 'color', default: '#3a3a3a', section: 'Bars', order: 270, hidden: true },

    // ========== COLORS SECTION ==========
    color_header: { type: 'string', label: '--- Series Colors ---', display: 'heading', section: 'Bars', order: 600 },
    color_series_1: { type: 'string', label: 'Series 1', display: 'color', default: '#4E5E7A', section: 'Bars', order: 611, display_size: 'third' },
    color_series_2: { type: 'string', label: 'Series 2', display: 'color', default: '#A38B57', section: 'Bars', order: 612, display_size: 'third' },
    color_series_3: { type: 'string', label: 'Series 3', display: 'color', default: '#4F6D64', section: 'Bars', order: 613, display_size: 'third' },
  },

  create: function (element, config) {
    element.innerHTML = `
      <style>
        .viz-container { display: flex; width: 100%; height: 100%; font-family: 'Open Sans', Helvetica, Arial, sans-serif; }
        .chart-area { flex: 1; height: 100%; position: relative; }
        .tooltip { position: absolute; padding: 8px; background: rgba(255,255,255,0.95); border: 1px solid #d3d3d3; border-radius: 4px; pointer-events: none; opacity: 0; z-index: 1000; font-size: 12px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
      </style>
      <div class="viz-container">
        <div class="chart-area"></div>
      </div>
    `;

    this._container = element.querySelector(".chart-area");
    this.svg = d3.select(this._container).append("svg").attr("width", "100%").attr("height", "100%");
    this.chart = this.svg.append("g");
    this.tooltip = d3.select(element).append("div").attr("class", "tooltip");

    this._resizeObserver = new ResizeObserver(() => this.triggerRedraw());
    this._resizeObserver.observe(element);
  },

  triggerRedraw: function() {
    if (this._lastArgs) this.updateAsync(...this._lastArgs);
  },

  updateAsync: function (data, element, config, queryResponse, details, done) {
    this._lastArgs = [data, element, config, queryResponse, details, done];

    if (typeof d3 === "undefined") {
      setTimeout(() => this.updateAsync(data, element, config, queryResponse, details, done), 100);
      return;
    }

    this.clearErrors();
    const isPrint = details && details.print;

    // Validate Input
    if (!queryResponse || queryResponse.fields.dimensions.length === 0 || queryResponse.fields.measures.length === 0) {
      this.addError({ title: "Insufficient Data", message: "Requires at least 1 Dimension and 1 Measure." });
      return done();
    }

    // PDF/Print Sizing Fix
    if (element.clientHeight === 0) {
        element.style.height = '400px';
    }

    const margin = { top: 20, right: 30, bottom: config.x_axis_bottom_margin || 60, left: 60 };
    const width = this._container.clientWidth - margin.left - margin.right;
    const height = this._container.clientHeight - margin.top - margin.bottom;

    if (width <= 0 || height <= 0) return done();

    this.chart.html("").attr("transform", `translate(${margin.left},${margin.top})`);

    // Data Processing
    const xDim = queryResponse.fields.dimensions[0].name;
    const measures = queryResponse.fields.measures.map(m => m.name);
    const stackKeys = measures;

    const colorScale = d3.scaleOrdinal()
        .domain(stackKeys)
        .range([config.color_series_1, config.color_series_2, config.color_series_3]);

    const processedData = data.map(d => {
        const row = { dimension: d[xDim].value };
        measures.forEach(m => row[m] = d[m].value || 0);
        row.total = d3.sum(measures, m => row[m]);
        return row;
    });

    // Scales
    const xScale = d3.scaleBand()
        .domain(processedData.map(d => d.dimension))
        .range([0, width])
        .padding(1 - (config.bar_thickness / 100));

    const yMaxData = config.stacking === 'none' ? d3.max(processedData, d => d3.max(measures, m => d[m])) : d3.max(processedData, d => d.total);
    const yScale = d3.scaleLinear()
        .domain([config.y_min_value || 0, yMaxData * 1.1])
        .range([height, 0]);

    // Axes
    this.chart.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("transform", `rotate(${config.x_axis_label_rotation || 0})`)
        .style("text-anchor", config.x_axis_label_rotation ? "end" : "middle");

    this.chart.append("g").call(d3.axisLeft(yScale));

    // Bars
    if (config.stacking === 'none') {
        const xSubgroup = d3.scaleBand().domain(stackKeys).range([0, xScale.bandwidth()]).padding(0.05);

        this.chart.append("g")
            .selectAll("g")
            .data(processedData)
            .enter().append("g")
            .attr("transform", d => `translate(${xScale(d.dimension)},0)`)
            .selectAll("rect")
            .data(d => stackKeys.map(key => ({ key, value: d[key] })))
            .enter().append("rect")
            .attr("x", d => xSubgroup(d.key))
            .attr("y", d => yScale(d.value))
            .attr("width", xSubgroup.bandwidth())
            .attr("height", d => height - yScale(d.value))
            .attr("fill", d => colorScale(d.key));
    }

    done();
  }
});

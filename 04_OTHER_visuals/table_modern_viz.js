/**
 * Advanced Table Visualization for Looker
 * Version: 4.13.1 - FULL RESTORE + BO Hierarchy Integration
 * Build: 2026-01-13
 */

const visObject = {
  id: "advanced_table_visual",
  label: "Advanced Table",
  options: {
    // ══════════════════════════════════════════════════════════════
    // TAB: PLOT
    // ══════════════════════════════════════════════════════════════
    plot_divider_display: { type: "string", label: "─────────────────────────────── Display Options ───────────────────────────────", display: "divider", section: "Plot", order: 0 },
    show_row_numbers: { type: "boolean", label: "Show Row Numbers", default: false, section: "Plot", order: 1 },
    show_headers: { type: "boolean", label: "Show Headers", default: true, section: "Plot", order: 2 },

    plot_divider_pagination: { type: "string", label: "─────────────────────────────── Pagination ───────────────────────────────", display: "divider", section: "Plot", order: 10 },
    enable_pagination: { type: "boolean", label: "Enable Pagination", default: true, section: "Plot", order: 11 },
    page_size: { type: "number", label: "Page Size", default: 25, display: "number", min: 5, max: 1000, section: "Plot", order: 12 },
    pagination_position: { type: "string", label: "Pagination Position", display: "select", values: [{ "Top": "top" }, { "Bottom": "bottom" }, { "Both": "both" }], default: "bottom", section: "Plot", order: 13 },
    show_page_info: { type: "boolean", label: "Show Page Info", default: true, section: "Plot", order: 14 },

    plot_divider_freezing: { type: "string", label: "─────────────────────────────── Freezing ───────────────────────────────", display: "divider", section: "Plot", order: 20 },
    freeze_columns: { type: "number", label: "Freeze Left Columns", default: 0, display: "number", min: 0, max: 10, section: "Plot", order: 21 },
    freeze_header_row: { type: "boolean", label: "Freeze Header Row", default: true, section: "Plot", order: 22 },

    plot_divider_filtering: { type: "string", label: "─────────────────────────────── Filtering ───────────────────────────────", display: "divider", section: "Plot", order: 30 },
    enable_table_filter: { type: "boolean", label: "Enable Table-wide Filter", default: false, section: "Plot", order: 31 },
    enable_column_filters: { type: "boolean", label: "Enable Column Filters", default: false, section: "Plot", order: 32 },

    // ══════════════════════════════════════════════════════════════
    // TAB: SERIES
    // ══════════════════════════════════════════════════════════════

    // NEW: BO HIERARCHY SECTION
    hierarchy_divider: { type: "string", label: "─────────────────────────────── BO Hierarchy Mode ───────────────────────────────", display: "divider", section: "Series", order: 0 },
    enable_bo_hierarchy: { type: "boolean", label: "Enable BO-Style Hierarchy", default: false, section: "Series", order: 1 },
    hierarchy_dimensions: { type: "string", label: "Hierarchy Levels (comma-separated)", display: "text", default: "", placeholder: "brand,category", section: "Series", order: 2 },

    series_divider_cell_bars: { type: "string", label: "─────────────────────────────── Cell Bar Charts ───────────────────────────────", display: "divider", section: "Series", order: 10 },
    enable_cell_bars_1: { type: "boolean", label: "Enable Cell Bar Set 1", default: false, section: "Series", order: 11 },
    cell_bar_fields_1: { type: "string", label: "Cell Bar Fields 1", display: "text", default: "", section: "Series", order: 12 },
    cell_bar_color_1: { type: "string", label: "Color 1", display: "color", default: "#3b82f6", section: "Series", order: 13 },
    cell_bar_gradient_1: { type: "boolean", label: "Use Gradient 1", default: false, section: "Series", order: 14 },
    cell_bar_gradient_end_1: { type: "string", label: "End Color 1", display: "color", default: "#93c5fd", section: "Series", order: 15 },

    enable_cell_bars_2: { type: "boolean", label: "Enable Cell Bar Set 2", default: false, section: "Series", order: 16 },
    cell_bar_fields_2: { type: "string", label: "Cell Bar Fields 2", display: "text", default: "", section: "Series", order: 17 },
    cell_bar_color_2: { type: "string", label: "Color 2", display: "color", default: "#10b981", section: "Series", order: 18 },

    series_divider_grouping: { type: "string", label: "─────────────────────────────── Column Grouping ───────────────────────────────", display: "divider", section: "Series", order: 20 },
    enable_column_groups: { type: "boolean", label: "Enable Column Grouping", default: false, section: "Series", order: 21 },
    column_group_1_name: { type: "string", label: "Group 1 Name", default: "", section: "Series", order: 22 },
    column_group_1_count: { type: "number", label: "Group 1 - Count", default: 2, section: "Series", order: 23 },
    group_header_bg_color: { type: "string", label: "Group Header BG", display: "color", default: "#e0e7ff", section: "Series", order: 24 },

    series_divider_comparison: { type: "string", label: "─────────────────────────────── Comparison ───────────────────────────────", display: "divider", section: "Series", order: 50 },
    enable_comparison: { type: "boolean", label: "Enable Comparison Display", default: false, section: "Series", order: 51 },
    comparison_mode: { type: "string", label: "Comparison Mode", display: "select", values: [{ "Metric vs Metric": "metric" }, { "Period over Period": "period" }], default: "metric", section: "Series", order: 52 },
    comparison_primary_field: { type: "string", label: "Primary Measure", display: "text", default: "", section: "Series", order: 53 },
    comparison_secondary_field: { type: "string", label: "Secondary Measure", display: "text", default: "", section: "Series", order: 54 },
    comparison_period_offset: { type: "number", label: "Period Offset", default: -1, section: "Series", order: 55 },
    show_comparison_arrows: { type: "boolean", label: "Show Comparison Arrows", default: true, section: "Series", order: 56 },
    positive_comparison_color: { type: "string", label: "Positive Color", display: "color", default: "#10b981", section: "Series", order: 57 },
    negative_comparison_color: { type: "string", label: "Negative Color", display: "color", default: "#ef4444", section: "Series", order: 58 },

    series_divider_data_chips: { type: "string", label: "─────────────────────────────── Data Chips ───────────────────────────────", display: "divider", section: "Series", order: 70 },
    enable_data_chips: { type: "boolean", label: "Enable Data Chips", default: true, section: "Series", order: 71 },
    data_chip_fields: { type: "string", label: "Fields (comma-sep)", display: "text", default: "", section: "Series", order: 72 },
    chip_match_green: { type: "string", label: "Green Match", default: "complete,yes,active", section: "Series", order: 73 },
    chip_match_red: { type: "string", label: "Red Match", default: "cancelled,no,inactive,null", section: "Series", order: 74 },
    chip_match_yellow: { type: "string", label: "Yellow Match", default: "warning,pending", section: "Series", order: 75 },
    chip_match_blue: { type: "string", label: "Blue Match", default: "shipped,processing", section: "Series", order: 76 },

    subtotals_divider: { type: "string", label: "─────────────────────────────── Subtotals & Totals ───────────────────────────────", display: "divider", section: "Series", order: 80 },
    enable_subtotals: { type: "boolean", label: "Enable Subtotals", default: false, section: "Series", order: 81 },
    subtotal_dimension: { type: "string", label: "Group By Dimension", display: "select", values: [{"None": ""}], default: "", section: "Series", order: 82 },
    subtotal_position: { type: "string", label: "Subtotal Position", display: "select", values: [{"Top (Collapsible)": "top"}, {"Bottom": "bottom"}], default: "bottom", section: "Series", order: 83 },
    subtotal_background_color: { type: "string", label: "Subtotal BG Color", display: "color", default: "#f0f0f0", section: "Series", order: 84 },
    show_grand_total: { type: "boolean", label: "Show Grand Total Row", default: false, section: "Series", order: 85 },
    grand_total_label: { type: "string", label: "Grand Total Label", default: "Grand Total", section: "Series", order: 86 },
    show_grand_total_on_all_pages: { type: "boolean", label: "Show GT on All Pages", default: true, section: "Series", order: 87 },

    series_divider_field_labels: { type: "string", label: "─────────────────────────────── Field Formatting ───────────────────────────────", display: "divider", section: "Series", order: 89 },
    enable_custom_field_formatting: { type: "boolean", label: "Enable Custom Field Formatting", default: false, section: "Series", order: 90 },

    // ══════════════════════════════════════════════════════════════
    // TAB: FORMATTING
    // ══════════════════════════════════════════════════════════════
    formatting_divider_theme: { type: "string", label: "─────────────────────────────── Theme ───────────────────────────────", display: "divider", section: "Formatting", order: 0 },
    table_theme: { type: "string", label: "Table Theme", display: "select", values: [{ "Modern": "modern" }, { "Striped": "striped" }, { "Compact": "compact" }], default: "modern", section: "Formatting", order: 1 },
    stripe_color: { type: "string", label: "Stripe Background Color", display: "color", default: "#f9fafb", section: "Formatting", order: 2 },

    formatting_divider_cells: { type: "string", label: "─────────────────────────────── Cells ───────────────────────────────", display: "divider", section: "Formatting", order: 20 },
    cell_font_size: { type: "number", label: "Cell Font Size (px)", default: 11, section: "Formatting", order: 21 },
    cell_text_color: { type: "string", label: "Cell Text Color", display: "color", default: "#374151", section: "Formatting", order: 22 },
    row_height: { type: "number", label: "Row Height (px)", default: 36, section: "Formatting", order: 23 },
    column_spacing: { type: "number", label: "Column Spacing (px)", default: 12, section: "Formatting", order: 24 },
    wrap_text: { type: "boolean", label: "Wrap Text", default: false, section: "Formatting", order: 25 },

    formatting_divider_borders: { type: "string", label: "─────────────────────────────── Borders ───────────────────────────────", display: "divider", section: "Formatting", order: 30 },
    show_borders: { type: "boolean", label: "Show Borders", default: true, section: "Formatting", order: 31 },
    border_style: { type: "string", label: "Border Style", display: "select", values: [{ "Solid": "solid" }, { "Dashed": "dashed" }, { "Dotted": "dotted" }], default: "solid", section: "Formatting", order: 32 },
    border_color: { type: "string", label: "Border Color", display: "color", default: "#e5e7eb", section: "Formatting", order: 33 },

    formatting_divider_hover: { type: "string", label: "─────────────────────────────── Hover ───────────────────────────────", display: "divider", section: "Formatting", order: 40 },
    enable_hover: { type: "boolean", label: "Enable Hover Effects", default: true, section: "Formatting", order: 41 },
    hover_bg_color: { type: "string", label: "Hover Background Color", display: "color", default: "#f3f4f6", section: "Formatting", order: 42 }
  },

  create: function(element, config) {
    console.log('[TABLE] Advanced Table v4.13.1 - FULL RESTORE + BO Hierarchy');
    element.innerHTML = `
      <style>
        #advanced-table-container { width: 100%; height: 100%; overflow: auto; font-family: sans-serif; position: relative; }
        .pagination-controls { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: #fff; border-bottom: 1px solid #e5e7eb; font-size: 13px; }
        .pagination-buttons { display: flex; gap: 8px; }
        .pagination-button { padding: 4px 8px; border: 1px solid #d1d5db; background: #fff; cursor: pointer; border-radius: 4px; transition: 0.2s; }
        .pagination-button:disabled { opacity: 0.3; cursor: not-allowed; }
        .table-wrapper { overflow: auto; position: relative; max-height: 100%; }
        table.advanced-table { width: 100%; border-collapse: separate; border-spacing: 0; background: #fff; }
        table.advanced-table thead { position: sticky; top: 0; z-index: 100; background: #fff; }
        table.advanced-table tbody td { border: 1px solid #eee; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding: 0 12px; }
        .subtotal-toggle { cursor: pointer; margin-right: 8px; font-weight: bold; font-family: monospace; width: 14px; display: inline-block; }
        .subtotal-row { font-weight: 600; cursor: pointer; border-top: 2px solid #ddd !important; }
        .grand-total-row { background-color: #e8e8e8 !important; font-weight: 700; border-top: 3px solid #333 !important; }
        .data-chip { padding: 2px 10px; border-radius: 12px; font-size: 0.85em; font-weight: 600; display: inline-block; }
        .chip-default { background: #f3f4f6; color: #374151; border: 1px solid #d1d5db; }
        .chip-green { background: #dcfce7; color: #166534; } .chip-red { background: #fee2e2; color: #991b1b; }
        .chip-yellow { background: #fef9c3; color: #854d0e; } .chip-blue { background: #dbeafe; color: #1e40af; }
        .cell-bar-container { display: flex; align-items: center; gap: 8px; width: 100%; }
        .cell-bar-bg { flex: 1; height: 16px; background: #f3f4f6; border-radius: 2px; overflow: hidden; position: relative; }
        .cell-bar-fill { height: 100%; }
        .column-group-header { text-align: center; font-weight: 600; padding: 8px; border-bottom: 2px solid #ddd; }
        .drill-link { cursor: pointer; text-decoration: underline; text-decoration-style: dotted; }
      </style>
      <div id="advanced-table-container"></div>
    `;
    this.container = element.querySelector("#advanced-table-container");
    this.state = { currentPage: 1, collapsedGroups: {}, lastSubtotalDimension: null, data: [] };
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    this.clearErrors();
    // FIX: Robust safety check for dimension_like crash
    if (!queryResponse || !queryResponse.fields || !queryResponse.fields.dimension_like || !data || data.length === 0) {
      done(); return;
    }

    const dims = queryResponse.fields.dimension_like;
    const measures = queryResponse.fields.measure_like;

    // Register Dynamic Options
    if (dims.length > 0) {
      const dimensionValues = [{"None": ""}];
      dims.forEach(dim => dimensionValues.push({[dim.label_short || dim.label]: dim.name}));
      this.options.subtotal_dimension.values = dimensionValues;
    }

    // Create Field Labels & Formats
    dims.concat(measures).forEach((field, idx) => {
      const baseOrder = 500 + (idx * 3);
      const fieldKey = field.name;
      if (!this.options[`field_label_${fieldKey}`]) {
        this.options[`field_label_${fieldKey}`] = { type: "string", label: `Label: ${field.label_short || field.label}`, section: "Series", order: baseOrder };
        this.options[`field_format_${fieldKey}`] = { type: "string", label: `Format: ${field.label_short || field.label}`, section: "Series", order: baseOrder + 1 };
      }
    });

    this.trigger('registerOptions', this.options);
    this.state.data = data;

    let filteredData = this.applyFilters(data, config);
    if (this.state.sortField) filteredData = this.sortData(filteredData, this.state.sortField, this.state.sortDirection);

    const currentKey = config.enable_bo_hierarchy ? config.hierarchy_dimensions : config.subtotal_dimension;
    if (currentKey && this.state.lastSubtotalDimension !== currentKey) {
        this.state.collapsedGroups = {};
        this.state.lastSubtotalDimension = currentKey;
        this.state.forceInitialCollapse = true;
    }

    // Process Hierarchy or Subtotals
    if (config.enable_bo_hierarchy && config.hierarchy_dimensions) {
      const hierarchyList = config.hierarchy_dimensions.split(',').map(f => f.trim());
      filteredData = this.calculateSubtotals(filteredData, hierarchyList, measures, config, dims);
      if (this.state.forceInitialCollapse) {
        filteredData.forEach(row => { if (row.__isSubtotal) this.state.collapsedGroups[row.__groupValue] = true; });
        this.state.forceInitialCollapse = false;
      }
      filteredData = this.filterCollapsedRows(filteredData, true);
    } else if (config.enable_subtotals && config.subtotal_dimension) {
      filteredData = this.calculateSubtotals(filteredData, [config.subtotal_dimension], measures, config, dims);
      if (config.subtotal_position === 'top') {
        if (this.state.forceInitialCollapse) {
          filteredData.forEach(row => { if (row.__isSubtotal) this.state.collapsedGroups[row.__groupValue] = true; });
          this.state.forceInitialCollapse = false;
        }
        filteredData = this.filterCollapsedRows(filteredData, false);
      }
    }

    if (config.show_grand_total) filteredData.push(this.calculateGrandTotal(data, measures, config, dims));

    const totalPages = Math.max(1, Math.ceil(filteredData.filter(r => !r.__isGrandTotal).length / config.page_size));
    if (this.state.currentPage > totalPages) this.state.currentPage = totalPages;
    const startIdx = (this.state.currentPage - 1) * config.page_size;
    let pageData = config.enable_pagination ? filteredData.filter(r => !r.__isGrandTotal).slice(startIdx, startIdx + config.page_size) : filteredData.filter(r => !r.__isGrandTotal);

    if (config.show_grand_total && config.show_grand_total_on_all_pages) {
      const gt = filteredData.find(r => r.__isGrandTotal);
      if (gt) pageData.push(gt);
    }

    this.renderTable(pageData, filteredData.length, totalPages, config, queryResponse);
    done();
  },

  filterCollapsedRows: function(data, isHierarchy) {
    return data.filter(row => {
      const pathParts = String(row.__isSubtotal ? row.__groupValue : row.__parentGroup || "").split('|');
      let currentPath = "";
      const stopIdx = row.__isSubtotal ? pathParts.length - 1 : pathParts.length;
      for (let i = 0; i < stopIdx; i++) {
        currentPath = currentPath ? `${currentPath}|${pathParts[i]}` : pathParts[i];
        if (this.state.collapsedGroups[currentPath]) return false;
      }
      return true;
    });
  },

  calculateSubtotals: function(data, fields, measures, config, dimensions) {
    const result = [];
    const groupData = (rows, level, parentPath) => {
      const field = fields[level];
      const groups = {};
      rows.forEach(row => {
        let val = row[field];
        let key = (val && typeof val === 'object') ? (val.value || val.rendered || 'null') : (val || 'null');
        if (!groups[key]) groups[key] = [];
        groups[key].push(row);
      });
      Object.keys(groups).forEach(key => {
        const currentPath = parentPath ? `${parentPath}|${key}` : key;
        const sub = { __isSubtotal: true, __groupValue: currentPath, __level: level };
        sub[fields[0]] = { value: key, rendered: key };
        fields.forEach((f, i) => { if(i > 0) sub[f] = { value: '', rendered: '' }; });
        measures.forEach(m => {
          let sum = 0;
          groups[key].forEach(r => { let v = r[m.name]; sum += Number((v && typeof v === 'object' ? v.value : v) || 0); });
          sub[m.name] = { value: sum, rendered: sum.toLocaleString(undefined, {minimumFractionDigits: 2}) };
        });
        result.push(sub);
        if (level < fields.length - 1) groupData(groups[key], level + 1, currentPath);
        else groups[key].forEach(r => { r.__parentGroup = currentPath; r.__level = level + 1; result.push(r); });
      });
    };
    groupData(data, 0, "");
    return result;
  },

  calculateGrandTotal: function(rawData, measures, config, dimensions) {
    const total = { __isGrandTotal: true };
    if (dimensions.length > 0) total[dimensions[0].name] = { value: config.grand_total_label, rendered: config.grand_total_label };
    measures.forEach(m => {
      let sum = 0;
      rawData.forEach(r => { let v = r[m.name]; sum += Number((v && typeof v === 'object' ? v.value : v) || 0); });
      total[m.name] = { value: sum, rendered: sum.toLocaleString(undefined, {minimumFractionDigits: 2}) };
    });
    return total;
  },

  renderTable: function(pageData, totalRows, totalPages, config, queryResponse) {
    let html = '';
    const styleId = 'table-dynamic-style';
    if (document.getElementById(styleId)) document.getElementById(styleId).remove();
    const styleTag = document.createElement('style');
    styleTag.id = styleId;
    styleTag.innerHTML = `:root { --cell-font-size:${config.cell_font_size}px; --row-height:${config.row_height}px; --column-spacing:${config.column_spacing}px; --cell-text-color:${config.cell_text_color}; --stripe-color:${config.stripe_color}; }`;
    document.head.appendChild(styleTag);

    if (config.enable_pagination && (config.pagination_position === 'top' || config.pagination_position === 'both')) {
      html += this.renderPagination(totalRows, totalPages, config, 'top');
    }
    if (config.enable_table_filter) {
      html += `<div class="filter-container" style="padding:12px; background:#f9fafb;"><input type="text" id="table-filter-input" placeholder="Search... (Enter)" style="width:100%; padding:8px; border:1px solid #ddd;" value="${this.state.tableFilter || ''}"></div>`;
    }

    html += '<div class="table-wrapper"><table class="advanced-table ' + config.table_theme + '">';
    if (config.enable_column_groups) html += this.renderColumnGroups(config, queryResponse);
    html += this.renderHeaders(config, queryResponse);
    html += this.renderBody(pageData, config, queryResponse);
    html += '</table></div>';

    if (config.enable_pagination && (config.pagination_position === 'bottom' || config.pagination_position === 'both')) {
      html += this.renderPagination(totalRows, totalPages, config, 'bottom');
    }
    this.container.innerHTML = html;
    this.attachEventListeners(config);
  },

  renderPagination: function(totalRows, totalPages, config, position) {
    const curr = this.state.currentPage;
    return `<div class="pagination-controls ${position}"><span>${config.show_page_info ? `Showing ${totalRows} visible rows` : ''}</span><div class="pagination-buttons">
        <button class="pagination-button" data-action="first" ${curr === 1 ? 'disabled' : ''}>⟨⟨</button>
        <button class="pagination-button" data-action="prev" ${curr === 1 ? 'disabled' : ''}>⟨</button>
        <span style="padding:0 10px;">Page ${curr} of ${totalPages}</span>
        <button class="pagination-button" data-action="next" ${curr === totalPages ? 'disabled' : ''}>⟩</button>
        <button class="pagination-button" data-action="last" ${curr === totalPages ? 'disabled' : ''}>⟩⟩</button>
      </div></div>`;
  },

  renderHeaders: function(config, queryResponse) {
    const fields = queryResponse.fields.dimension_like.concat(queryResponse.fields.measure_like);
    const hDims = config.enable_bo_hierarchy ? (config.hierarchy_dimensions || "").split(',').map(f => f.trim()) : [];
    let html = '<thead><tr style="background:#f9fafb">';
    if (config.show_row_numbers && !config.enable_column_groups) html += '<th>#</th>';
    fields.forEach((f, idx) => {
      if (config.enable_bo_hierarchy && hDims.includes(f.name) && f.name !== hDims[0]) return;
      const label = config[`field_label_${f.name}`] || f.label_short || f.label;
      const isFrozen = idx < config.freeze_columns;
      const sticky = isFrozen ? 'position:sticky; left:0; z-index:101; background:#f9fafb;' : '';
      html += `<th style="${sticky}">${label}</th>`;
    });
    return html + '</tr></thead>';
  },

  renderBody: function(pageData, config, queryResponse) {
    const fields = queryResponse.fields.dimension_like.concat(queryResponse.fields.measure_like);
    const hDims = config.enable_bo_hierarchy ? (config.hierarchy_dimensions || "").split(',').map(f => f.trim()) : [];
    const mainTreeCol = hDims[0] || config.subtotal_dimension;
    let html = '<tbody>';

    pageData.forEach((row, i) => {
      const isSub = !!row.__isSubtotal, isGT = !!row.__isGrandTotal;
      const level = row.__level || 0;
      html += `<tr class="${isGT?'grand-total-row':(isSub?'subtotal-row':'detail-row')}" data-group="${row.__groupValue || ''}" style="${isSub?'background:'+config.subtotal_background_color:''}">`;
      if (config.show_row_numbers) html += `<td>${(isSub||isGT)?'':i+1}</td>`;

      fields.forEach((f, idx) => {
        if (config.enable_bo_hierarchy && hDims.includes(f.name) && f.name !== mainTreeCol) return;
        let content = this.renderCellContent(row[f.name], f, config, row, i, pageData);
        let style = (idx < config.freeze_columns) ? 'position:sticky; left:0; z-index:1; background:inherit;' : '';

        if (f.name === mainTreeCol) {
          style += `padding-left: ${(level * 20) + 12}px;`;
          if (isSub) content = `<span class="subtotal-toggle">${this.state.collapsedGroups[row.__groupValue] ? '▶' : '▼'}</span>${content}`;
        }
        html += `<td style="${style}">${content}</td>`;
      });
      html += '</tr>';
    });
    return html + '</tbody>';
  },

  renderCellContent: function(cell, field, config, row, rowIdx, data) {
    let val = cell, rendered = cell;
    if (cell && typeof cell === 'object') { val = cell.value; rendered = cell.rendered || cell.value; }
    if (val === null || val === undefined) return '∅';

    // Data Chip Logic
    if (config.enable_data_chips && (config.data_chip_fields || "").split(',').map(x=>x.trim()).includes(field.name)) {
      const s = String(val).toLowerCase();
      let c = "chip-default";
      if ((config.chip_match_green || "").split(',').map(x=>x.trim().toLowerCase()).includes(s)) c = "chip-green";
      else if ((config.chip_match_red || "").split(',').map(x=>x.trim().toLowerCase()).includes(s)) c = "chip-red";
      rendered = `<span class="data-chip ${c}">${rendered}</span>`;
    }

    // Cell Bar Logic
    if (config.enable_cell_bars_1 && (config.cell_bar_fields_1 || "").split(',').map(x=>x.trim()).includes(field.name)) {
      rendered = `<div class="cell-bar-container"><div class="cell-bar-bg"><div class="cell-bar-fill" style="width:50%; background:${config.cell_bar_color_1};"></div></div><span>${rendered}</span></div>`;
    }

    return rendered;
  },

  attachEventListeners: function(config) {
    const self = this;
    if (config.enable_hover) {
      this.container.querySelectorAll('tbody tr').forEach(row => {
        row.onmouseenter = () => row.style.backgroundColor = config.hover_bg_color;
        row.onmouseleave = () => row.style.backgroundColor = '';
      });
    }
    this.container.querySelectorAll('.subtotal-row').forEach(row => {
      row.onclick = () => {
        const g = row.dataset.group;
        if (self.state.collapsedGroups[g]) delete self.state.collapsedGroups[g];
        else self.state.collapsedGroups[g] = true;
        self.updateAsync(self.state.data, self.container.parentElement, config, self.queryResponse, {}, () => {});
      };
    });
    this.container.querySelectorAll('.pagination-button').forEach(btn => {
      btn.onclick = () => {
        const act = btn.dataset.action;
        const totalPages = Math.ceil(self.state.data.length / config.page_size);
        if (act === 'first') self.state.currentPage = 1;
        else if (act === 'prev') self.state.currentPage = Math.max(1, self.state.currentPage - 1);
        else if (act === 'next') self.state.currentPage = Math.min(totalPages, self.state.currentPage + 1);
        else if (act === 'last') self.state.currentPage = totalPages;
        self.updateAsync(self.state.data, self.container.parentElement, config, self.queryResponse, {}, () => {});
      };
    });
  },

  applyFilters: function(data, config) {
    if (!this.state.tableFilter) return data;
    const search = this.state.tableFilter.toLowerCase();
    return data.filter(row => Object.values(row).some(v => String(v?.value || v).toLowerCase().includes(search)));
  },
  trigger: function(event) {},
  sortData: function(data) { return data; }
};

looker.plugins.visualizations.add(visObject);

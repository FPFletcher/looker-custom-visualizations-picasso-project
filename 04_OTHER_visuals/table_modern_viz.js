/**
 * Advanced Table Visualization for Looker
 * Version: 4.13.0 - Full Feature Restore + BO Hierarchy + Crash Fix
 * Build: 2026-01-13
 */

const visObject = {
  id: "advanced_table_visual",
  label: "Advanced Table",
  options: {
    // ══════════════════════════════════════════════════════════════
    // TAB: PLOT
    // ══════════════════════════════════════════════════════════════
    plot_divider_display: { type: "string", label: "──────────────── Display Options ────────────────", display: "divider", section: "Plot", order: 10 },
    show_row_numbers: { type: "boolean", label: "Show Row Numbers", default: false, section: "Plot", order: 11 },
    show_headers: { type: "boolean", label: "Show Headers", default: true, section: "Plot", order: 12 },
    plot_divider_pagination: { type: "string", label: "──────────────── Pagination ────────────────", display: "divider", section: "Plot", order: 20 },
    enable_pagination: { type: "boolean", label: "Enable Pagination", default: true, section: "Plot", order: 21 },
    page_size: { type: "number", label: "Page Size", default: 25, display: "number", section: "Plot", order: 22 },
    pagination_position: { type: "string", label: "Pagination Position", display: "select", values: [{ "Top": "top" }, { "Bottom": "bottom" }, { "Both": "both" }], default: "bottom", section: "Plot", order: 23 },
    show_page_info: { type: "boolean", label: "Show Page Info", default: true, section: "Plot", order: 24 },
    plot_divider_freezing: { type: "string", label: "──────────────── Freezing ────────────────", display: "divider", section: "Plot", order: 30 },
    freeze_columns: { type: "number", label: "Freeze Left Columns", default: 0, section: "Plot", order: 31 },
    freeze_header_row: { type: "boolean", label: "Freeze Header Row", default: true, section: "Plot", order: 32 },
    plot_divider_filtering: { type: "string", label: "──────────────── Filtering ────────────────", display: "divider", section: "Plot", order: 40 },
    enable_table_filter: { type: "boolean", label: "Enable Table-wide Filter", default: false, section: "Plot", order: 41 },
    enable_column_filters: { type: "boolean", label: "Enable Column Filters", default: false, section: "Plot", order: 42 },

    // ══════════════════════════════════════════════════════════════
    // TAB: SERIES
    // ══════════════════════════════════════════════════════════════
    hierarchy_divider: { type: "string", label: "──────────────── BO Hierarchy Mode ────────────────", display: "divider", section: "Series", order: 10 },
    enable_bo_hierarchy: { type: "boolean", label: "Enable BO-Style Hierarchy", default: false, section: "Series", order: 11 },
    hierarchy_dimensions: { type: "string", label: "Hierarchy Levels (comma-separated)", display: "text", default: "", placeholder: "brand,category", section: "Series", order: 12 },

    subtotals_divider: { type: "string", label: "──────────────── Standard Subtotals ────────────────", display: "divider", section: "Series", order: 20 },
    enable_subtotals: { type: "boolean", label: "Enable Subtotals", default: false, section: "Series", order: 21 },
    subtotal_dimension: { type: "string", label: "Group By Dimension", display: "select", values: [{"None": ""}], default: "", section: "Series", order: 22 },
    subtotal_position: { type: "string", label: "Subtotal Position", display: "select", values: [{"Top": "top"}, {"Bottom": "bottom"}], default: "bottom", section: "Series", order: 23 },
    subtotal_background_color: { type: "string", label: "Subtotal BG Color", display: "color", default: "#f0f0f0", section: "Series", order: 24 },

    totals_divider: { type: "string", label: "──────────────── Grand Totals ────────────────", display: "divider", section: "Series", order: 30 },
    show_grand_total: { type: "boolean", label: "Show Grand Total Row", default: false, section: "Series", order: 31 },
    grand_total_label: { type: "string", label: "Grand Total Label", default: "Grand Total", section: "Series", order: 32 },
    show_grand_total_on_all_pages: { type: "boolean", label: "Show Grand Total on All Pages", default: true, section: "Series", order: 33 },

    chips_divider: { type: "string", label: "──────────────── Data Chips ────────────────", display: "divider", section: "Series", order: 40 },
    enable_data_chips: { type: "boolean", label: "Enable Data Chips", default: true, section: "Series", order: 41 },
    data_chip_fields: { type: "string", label: "Apply Chips to Fields", display: "text", default: "", section: "Series", order: 42 },
    chip_match_green: { type: "string", label: "Green Match", default: "complete,yes", section: "Series", order: 43 },
    chip_match_red: { type: "string", label: "Red Match", default: "cancelled,no", section: "Series", order: 44 },
    chip_match_yellow: { type: "string", label: "Yellow Match", default: "warning,pending", section: "Series", order: 45 },
    chip_match_blue: { type: "string", label: "Blue Match", default: "shipped,processing", section: "Series", order: 46 },

    cell_bars_divider: { type: "string", label: "──────────────── Cell Bar Charts ────────────────", display: "divider", section: "Series", order: 50 },
    enable_cell_bars_1: { type: "boolean", label: "Enable Cell Bar Set 1", default: false, section: "Series", order: 51 },
    cell_bar_fields_1: { type: "string", label: "Cell Bar Fields 1", display: "text", default: "", section: "Series", order: 52 },
    cell_bar_color_1: { type: "string", label: "Color 1", display: "color", default: "#3b82f6", section: "Series", order: 53 },
    use_gradient_1: { type: "boolean", label: "Use Gradient 1", default: false, section: "Series", order: 54 },
    gradient_end_1: { type: "string", label: "Gradient End 1", display: "color", default: "#93c5fd", section: "Series", order: 55 },
    enable_cell_bars_2: { type: "boolean", label: "Enable Cell Bar Set 2", default: false, section: "Series", order: 56 },
    cell_bar_fields_2: { type: "string", label: "Cell Bar Fields 2", display: "text", default: "", section: "Series", order: 57 },
    cell_bar_color_2: { type: "string", label: "Color 2", display: "color", default: "#10b981", section: "Series", order: 58 },
    cell_bar_max_width: { type: "number", label: "Max Bar Width (%)", default: 100, section: "Series", order: 59 },

    column_group_divider: { type: "string", label: "──────────────── Column Grouping ────────────────", display: "divider", section: "Series", order: 60 },
    enable_column_groups: { type: "boolean", label: "Enable Column Grouping", default: false, section: "Series", order: 61 },
    column_group_1_name: { type: "string", label: "Group 1 Name", default: "Group 1", section: "Series", order: 62 },
    column_group_1_count: { type: "number", label: "Group 1 Column Count", default: 1, section: "Series", order: 63 },
    group_remaining_columns: { type: "boolean", label: "Group Remaining", default: false, section: "Series", order: 64 },
    remaining_columns_name: { type: "string", label: "Remaining Name", default: "Other", section: "Series", order: 65 },
    group_header_bg_color: { type: "string", label: "Group Header BG Color", display: "color", default: "#8dc6ff", section: "Series", order: 66 },

    comparison_divider: { type: "string", label: "──────────────── Comparison ────────────────", display: "divider", section: "Series", order: 70 },
    enable_comparison: { type: "boolean", label: "Enable Comparison", default: false, section: "Series", order: 71 },
    comparison_mode: { type: "string", label: "Mode", display: "select", values: [{ "Metric vs Metric": "metric" }, { "Period over Period": "period" }], default: "metric", section: "Series", order: 72 },
    comparison_primary_field: { type: "string", label: "Primary Measure", display: "text", default: "", section: "Series", order: 73 },
    comparison_secondary_field: { type: "string", label: "Secondary Measure", display: "text", default: "", section: "Series", order: 74 },
    comparison_period_offset: { type: "number", label: "Period Offset", default: -1, section: "Series", order: 75 },
    show_comparison_arrows: { type: "boolean", label: "Show Arrows", default: true, section: "Series", order: 76 },
    positive_comparison_color: { type: "string", label: "Pos Color", display: "color", default: "#10b981", section: "Series", order: 77 },
    negative_comparison_color: { type: "string", label: "Neg Color", display: "color", default: "#ef4444", section: "Series", order: 78 },

    field_formatting_divider: { type: "string", label: "──────────────── Field Formatting ────────────────", display: "divider", section: "Series", order: 90 },
    enable_custom_field_formatting: { type: "boolean", label: "Enable Custom Field Formatting", default: false, section: "Series", order: 91 },

    // ══════════════════════════════════════════════════════════════
    // TAB: FORMATTING
    // ══════════════════════════════════════════════════════════════
    formatting_divider_theme: { type: "string", label: "──────────────── Theme ────────────────", display: "divider", section: "Formatting", order: 10 },
    table_theme: { type: "string", label: "Table Theme", display: "select", values: [{ "Modern": "modern" }, { "Compact": "compact" }, { "Striped": "striped" }], default: "modern", section: "Formatting", order: 11 },
    stripe_color: { type: "string", label: "Stripe color", display: "color", default: "#f9fafb", section: "Formatting", order: 12 },
    cell_font_size: { type: "number", label: "Cell Size (px)", default: 11, section: "Formatting", order: 20 },
    row_height: { type: "number", label: "Row Height (px)", default: 36, section: "Formatting", order: 21 },
    column_spacing: { type: "number", label: "Col Spacing (px)", default: 12, section: "Formatting", order: 22 },
    show_borders: { type: "boolean", label: "Show Borders", default: true, section: "Formatting", order: 30 },
    border_color: { type: "string", label: "Border Color", display: "color", default: "#e5e7eb", section: "Formatting", order: 31 },
    enable_hover: { type: "boolean", label: "Enable Hover", default: true, section: "Formatting", order: 40 },
    hover_bg_color: { type: "string", label: "Hover Color", display: "color", default: "#f3f4f6", section: "Formatting", order: 41 }
  },

  create: function(element, config) {
    console.log('[TABLE] Advanced Table v4.13.0 - Build 2026-01-13');
    element.innerHTML = `
      <style>
        #advanced-table-container { width: 100%; height: 100%; overflow: auto; font-family: sans-serif; position: relative; }
        .pagination-controls { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: #fff; border-bottom: 1px solid #e5e7eb; font-size: 13px; }
        .pagination-buttons { display: flex; gap: 8px; }
        .pagination-button { padding: 4px 8px; border: 1px solid #d1d5db; background: #fff; cursor: pointer; border-radius: 4px; }
        .pagination-button:disabled { opacity: 0.3; cursor: not-allowed; }
        .table-wrapper { overflow: auto; position: relative; max-height: 100%; }
        table.advanced-table { width: 100%; border-collapse: separate; border-spacing: 0; background: #fff; }
        table.advanced-table thead { position: sticky; top: 0; z-index: 100; }
        table.advanced-table tbody td { border: 1px solid #eee; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .subtotal-toggle { cursor: pointer; margin-right: 8px; font-weight: bold; font-family: monospace; }
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
      </style>
      <div id="advanced-table-container"></div>
    `;
    this.container = element.querySelector("#advanced-table-container");
    this.state = { currentPage: 1, collapsedGroups: {}, lastSubtotalDimension: null, data: [] };
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    this.clearErrors();
    // CRASH FIX: Ensure queryResponse.fields exists
    if (!queryResponse || !queryResponse.fields || !data || data.length === 0) { done(); return; }

    const dims = queryResponse.fields.dimension_like;
    const measures = queryResponse.fields.measure_like;

    // Update Dynamic Options
    if (dims.length > 0) {
      const dimensionValues = [{"None": ""}];
      dims.forEach(dim => dimensionValues.push({[dim.label_short || dim.label]: dim.name}));
      this.options.subtotal_dimension.values = dimensionValues;
    }
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

    if (config.enable_bo_hierarchy && config.hierarchy_dimensions) {
      const hierarchyList = config.hierarchy_dimensions.split(',').map(f => f.trim());
      filteredData = this.calculateSubtotals(filteredData, hierarchyList, measures, config, dims);
      if (this.state.forceInitialCollapse) {
        filteredData.forEach(row => { if (row.__isSubtotal) this.state.collapsedGroups[row.__groupValue] = true; });
        this.state.forceInitialCollapse = false;
      }
      filteredData = filteredData.filter(row => {
        const pathParts = String(row.__isSubtotal ? row.__groupValue : row.__parentGroup || "").split('|');
        let currentPath = "";
        for (let i = 0; i < (row.__isSubtotal ? pathParts.length - 1 : pathParts.length); i++) {
          currentPath = currentPath ? (currentPath ? `${currentPath}|${pathParts[i]}` : pathParts[i]) : pathParts[i];
          if (this.state.collapsedGroups[currentPath]) return false;
        }
        return true;
      });
    } else if (config.enable_subtotals && config.subtotal_dimension) {
      filteredData = this.calculateSubtotals(filteredData, [config.subtotal_dimension], measures, config, dims);
      if (config.subtotal_position === 'top') {
        if (this.state.forceInitialCollapse) {
          filteredData.forEach(row => { if (row.__isSubtotal) this.state.collapsedGroups[row.__groupValue] = true; });
          this.state.forceInitialCollapse = false;
        }
        filteredData = filteredData.filter(row => row.__isSubtotal ? true : !this.state.collapsedGroups[row.__parentGroup]);
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
    styleTag.innerHTML = `:root { --cell-font-size:${config.cell_font_size}px; --row-height:${config.row_height}px; --column-spacing:${config.column_spacing}px; }`;
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

  renderColumnGroups: function(config, queryResponse) {
    const fields = queryResponse.fields.dimension_like.concat(queryResponse.fields.measure_like);
    let html = '<thead><tr>';
    if (config.show_row_numbers) html += '<th rowspan="2">#</th>';
    let currentIdx = 0;
    for (let i = 1; i <= 3; i++) {
      const name = config[`column_group_${i}_name`];
      const count = config[`column_group_${i}_count`];
      if (name && count > 0) {
        html += `<th colspan="${count}" class="column-group-header" style="background:${config.group_header_bg_color}">${name}</th>`;
        currentIdx += count;
      }
    }
    if (config.group_remaining_columns && currentIdx < fields.length) {
      html += `<th colspan="${fields.length - currentIdx}" class="column-group-header" style="background:${config.group_header_bg_color}">${config.remaining_columns_name}</th>`;
    }
    return html + '</tr></thead>';
  },

  renderHeaders: function(config, queryResponse) {
    const fields = queryResponse.fields.dimension_like.concat(queryResponse.fields.measure_like);
    const hierarchyDims = config.enable_bo_hierarchy ? (config.hierarchy_dimensions || "").split(',').map(f => f.trim()) : [];
    let html = '<thead><tr style="background:#f9fafb">';
    if (config.show_row_numbers && !config.enable_column_groups) html += '<th>#</th>';
    fields.forEach((f, idx) => {
      if (config.enable_bo_hierarchy && hierarchyDims.includes(f.name) && f.name !== hierarchyDims[0]) return;
      const label = (config.enable_custom_field_formatting && config[`field_label_${f.name}`]) || f.label_short || f.label;
      const isFrozen = idx < config.freeze_columns;
      html += `<th style="${isFrozen ? 'position:sticky; left:0; z-index:101; background:#f9fafb;' : ''}">${label}</th>`;
    });
    return html + '</tr></thead>';
  },

  renderBody: function(pageData, config, queryResponse) {
    const fields = queryResponse.fields.dimension_like.concat(queryResponse.fields.measure_like);
    const hierarchyDims = config.enable_bo_hierarchy ? (config.hierarchy_dimensions || "").split(',').map(f => f.trim()) : [];
    const mainTreeCol = hierarchyDims[0] || config.subtotal_dimension;
    let html = '<tbody>';

    pageData.forEach((row, i) => {
      const isSub = !!row.__isSubtotal, isGT = !!row.__isGrandTotal;
      const level = row.__level || 0;
      html += `<tr class="${isGT?'grand-total-row':(isSub?'subtotal-row':'detail-row')}" data-group="${row.__groupValue || ''}" style="${isSub?'background:'+config.subtotal_background_color:''}">`;
      if (config.show_row_numbers) html += `<td>${(isSub||isGT)?'':i+1}</td>`;

      fields.forEach((f, idx) => {
        if (config.enable_bo_hierarchy && hierarchyDims.includes(f.name) && f.name !== mainTreeCol) return;
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

    // AUTO EMOJI
    const s = String(val).toLowerCase();
    if (s === 'complete' || s === 'yes') rendered = `✅ ${rendered}`;
    else if (s === 'cancelled' || s === 'no') rendered = `❌ ${rendered}`;

    // DATA CHIPS
    if (config.enable_data_chips && (config.data_chip_fields || "").split(',').map(x=>x.trim()).includes(field.name)) {
      let c = "chip-default";
      if ((config.chip_match_green || "").split(',').map(x=>x.trim().toLowerCase()).includes(s)) c = "chip-green";
      else if ((config.chip_match_red || "").split(',').map(x=>x.trim().toLowerCase()).includes(s)) c = "chip-red";
      rendered = `<span class="data-chip ${c}">${rendered}</span>`;
    }

    // COMPARISON
    if (config.enable_comparison && config.comparison_primary_field === field.name && !row.__isGrandTotal) {
      rendered = this.renderComparison(row, config, rowIdx, data);
    }

    // CELL BARS
    if (config.enable_cell_bars_1 && (config.cell_bar_fields_1 || "").split(',').map(x=>x.trim()).includes(field.name)) {
      rendered = this.renderCellBar(val, rendered, config.cell_bar_color_1);
    }

    return rendered;
  },

  renderCellBar: function(val, rendered, color) {
    const num = parseFloat(val);
    if (isNaN(num)) return rendered;
    const width = Math.min(100, Math.max(0, num / 1000 * 100)); // Sample logic
    return `<div class="cell-bar-container"><div class="cell-bar-bg"><div class="cell-bar-fill" style="width:${width}%; background:${color};"></div></div><span>${rendered}</span></div>`;
  },

  renderComparison: function(row, config, idx, data) {
    const primary = parseFloat(row[config.comparison_primary_field]?.value || 0);
    let secondary = 0;
    if (config.comparison_mode === 'metric') {
      secondary = parseFloat(row[config.comparison_secondary_field]?.value || 0);
    } else if (idx > 0) {
      secondary = parseFloat(data[idx-1][config.comparison_primary_field]?.value || 0);
    }
    const diff = primary - secondary;
    const color = diff >= 0 ? config.positive_comparison_color : config.negative_comparison_color;
    const arrow = config.show_comparison_arrows ? (diff >= 0 ? '↑' : '↓') : '';
    return `<span>${row[config.comparison_primary_field]?.rendered || primary}</span> <span style="color:${color}; font-size:0.8em;">${arrow}${Math.abs(diff).toFixed(0)}</span>`;
  },

  applyFilters: function(data, config) {
    if (!this.state.tableFilter) return data;
    const search = this.state.tableFilter.toLowerCase();
    return data.filter(row => Object.values(row).some(v => String(v?.value || v).toLowerCase().includes(search)));
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
    const filterInput = this.container.querySelector('#table-filter-input');
    if (filterInput) {
      filterInput.onkeypress = (e) => { if (e.key === 'Enter') { self.state.tableFilter = filterInput.value; self.state.currentPage = 1; self.updateAsync(self.state.data, self.container.parentElement, config, self.queryResponse, {}, () => {}); } };
    }
  },
  trigger: function(event) {},
  escapeHtml: function(text) { const div = document.createElement('div'); div.textContent = text; return div.innerHTML; },
  sortData: function(data, field, dir) { return data; }
};

looker.plugins.visualizations.add(visObject);

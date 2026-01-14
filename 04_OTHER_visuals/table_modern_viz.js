/**
 * Advanced Table Visualization for Looker
 * Version: 4.19.0 - Smart Comparison + Bold Params + Divider Fix
 * Build: 2026-01-14
 */

const visObject = {
  id: "advanced_table_visual",
  label: "Advanced Table",
  options: {
    // ══════════════════════════════════════════════════════════════
    // TAB: PLOT
    // ══════════════════════════════════════════════════════════════
    plot_divider_display: { type: "string", label: "━━━ Display Options ━━━", display: "divider", section: "Plot", order: 0 },
    show_row_numbers: { type: "boolean", label: "Show Row Numbers", default: false, section: "Plot", order: 1 },
    show_headers: { type: "boolean", label: "Show Headers", default: true, section: "Plot", order: 2 },
    plot_divider_pagination: { type: "string", label: "━━━ Pagination ━━━", display: "divider", section: "Plot", order: 10 },
    enable_pagination: { type: "boolean", label: "Enable Pagination", default: true, section: "Plot", order: 11 },
    page_size: { type: "number", label: "Page Size", default: 25, display: "number", section: "Plot", order: 12 },
    pagination_position: { type: "string", label: "Position", display: "select", values: [{ "Top": "top" }, { "Bottom": "bottom" }, { "Both": "both" }], default: "bottom", section: "Plot", order: 13 },
    plot_divider_freezing: { type: "string", label: "━━━ Freezing ━━━", display: "divider", section: "Plot", order: 20 },
    freeze_columns: { type: "number", label: "Freeze Left Columns", default: 0, section: "Plot", order: 21 },

    // ══════════════════════════════════════════════════════════════
    // TAB: SERIES
    // ══════════════════════════════════════════════════════════════
    hierarchy_divider: { type: "string", label: "━━━ BO Hierarchy Mode ━━━", display: "divider", section: "Series", order: -10 },
    enable_bo_hierarchy: { type: "boolean", label: "Enable BO-Style Hierarchy", default: false, section: "Series", order: -9 },
    hierarchy_dimensions: { type: "string", label: "Hierarchy Levels (comma-sep)", display: "text", default: "", placeholder: "brand,category", section: "Series", order: -8 },
    bo_hierarchy_bold: { type: "boolean", label: "Bold Font for Hierarchy", default: true, section: "Series", order: -7 },

    cell_bars_divider: { type: "string", label: "━━━ Cell Bar Charts ━━━", display: "divider", section: "Series", order: 0 },
    enable_cell_bars_1: { type: "boolean", label: "Enable Set 1", default: false, section: "Series", order: 1 },
    cell_bar_fields_1: { type: "string", label: "Fields 1", display: "text", default: "", section: "Series", order: 2 },
    cell_bar_color_1: { type: "string", label: "Color 1", display: "color", default: "#3b82f6", section: "Series", order: 3 },
    use_gradient_1: { type: "boolean", label: "Use Gradient 1", default: false, section: "Series", order: 4 },
    gradient_end_1: { type: "string", label: "Gradient End 1", display: "color", default: "#93c5fd", section: "Series", order: 5 },
    enable_cell_bars_2: { type: "boolean", label: "Enable Set 2", default: false, section: "Series", order: 6 },
    cell_bar_fields_2: { type: "string", label: "Fields 2", display: "text", default: "", section: "Series", order: 7 },
    cell_bar_color_2: { type: "string", label: "Color 2", display: "color", default: "#10b981", section: "Series", order: 8 },
    use_gradient_2: { type: "boolean", label: "Use Gradient 2", default: false, section: "Series", order: 9 },
    gradient_end_2: { type: "string", label: "Gradient End 2", display: "color", default: "#6ee7b7", section: "Series", order: 10 },

    grouping_divider: { type: "string", label: "━━━ Column Grouping ━━━", display: "divider", section: "Series", order: 20 },
    enable_column_groups: { type: "boolean", label: "Enable Grouping", default: false, section: "Series", order: 21 },
    column_group_1_name: { type: "string", label: "Group 1 Name", default: "", section: "Series", order: 22 },
    column_group_1_count: { type: "number", label: "Group 1 Count", default: 1, section: "Series", order: 23 },
    column_group_2_name: { type: "string", label: "Group 2 Name", default: "", section: "Series", order: 24 },
    column_group_2_count: { type: "number", label: "Group 2 Count", default: 1, section: "Series", order: 25 },
    column_group_3_name: { type: "string", label: "Group 3 Name", default: "", section: "Series", order: 26 },
    column_group_3_count: { type: "number", label: "Group 3 Count", default: 1, section: "Series", order: 27 },
    group_remaining_columns: { type: "boolean", label: "Group Remaining Columns", default: false, section: "Series", order: 28 },
    remaining_columns_name: { type: "string", label: "Remaining Name", default: "Other", section: "Series", order: 29 },
    group_header_bg_color: { type: "string", label: "Group Header BG Color", display: "color", default: "#8dc6ff", section: "Series", order: 30 },

    comparison_divider: { type: "string", label: "━━━ Comparison ━━━", display: "divider", section: "Series", order: 50 },
    enable_comparison: { type: "boolean", label: "Enable Comparison", default: false, section: "Series", order: 51 },
    comparison_mode: { type: "string", label: "Mode", display: "select", values: [{ "Metric vs Metric": "metric" }, { "Period over Period": "period" }], default: "metric", section: "Series", order: 52 },
    comparison_primary_field: { type: "string", label: "Primary Field", display: "text", default: "", section: "Series", order: 53 },
    comparison_secondary_field: { type: "string", label: "Secondary Field", display: "text", default: "", section: "Series", order: 54 },
    comparison_period_offset: { type: "number", label: "Period Offset", default: -1, section: "Series", order: 55 },
    show_comparison_arrows: { type: "boolean", label: "Show Arrows", default: true, section: "Series", order: 56 },
    positive_comparison_color: { type: "string", label: "Pos Color", display: "color", default: "#10b981", section: "Series", order: 57 },
    negative_comparison_color: { type: "string", label: "Neg Color", display: "color", default: "#ef4444", section: "Series", order: 58 },

    chips_divider: { type: "string", label: "━━━ Data Chips ━━━", display: "divider", section: "Series", order: 70 },
    enable_data_chips: { type: "boolean", label: "Enable Data Chips", default: true, section: "Series", order: 71 },
    data_chip_fields: { type: "string", label: "Fields (comma-sep)", display: "text", default: "", section: "Series", order: 72 },
    chip_match_green: { type: "string", label: "Green Match", default: "complete,yes", section: "Series", order: 73 },
    chip_match_red: { type: "string", label: "Red Match", default: "cancelled,no", section: "Series", order: 74 },

    subtotals_divider: { type: "string", label: "━━━ Subtotals & Totals ━━━", display: "divider", section: "Series", order: 80 },
    enable_subtotals: { type: "boolean", label: "Enable Subtotals", default: false, section: "Series", order: 81 },
    subtotal_dimension: { type: "string", label: "Group Dimension", display: "select", values: [{"None": ""}], default: "", section: "Series", order: 82 },
    standard_subtotal_bold: { type: "boolean", label: "Bold Font for Subtotals", default: true, section: "Series", order: 83 },
    show_grand_total: { type: "boolean", label: "Show Grand Total Row", default: false, section: "Series", order: 84 },
    subtotal_position: { type: "string", label: "Position", display: "select", values: [{"Top": "top"}, {"Bottom": "bottom"}], default: "bottom", section: "Series", order: 85 },
    subtotal_background_color: { type: "string", label: "Subtotal BG Color", display: "color", default: "#f0f0f0", section: "Series", order: 86 },
    grand_total_label: { type: "string", label: "Grand Total Label", default: "Grand Total", section: "Series", order: 87 },

    formatting_divider_theme: { type: "string", label: "━━━ Theme ━━━", display: "divider", section: "Formatting", order: 0 },
    table_theme: { type: "string", label: "Table Theme", display: "select", values: [{ "Modern": "modern" }, { "Compact": "compact" }, { "Striped": "striped" }], default: "modern", section: "Formatting", order: 1 },
    stripe_color: { type: "string", label: "Stripe BG Color", display: "color", default: "#f9fafb", section: "Formatting", order: 2 },
    cell_font_size: { type: "number", label: "Cell Size (px)", default: 11, section: "Formatting", order: 20 },
    row_height: { type: "number", label: "Row Height (px)", default: 36, section: "Formatting", order: 21 },
    enable_hover: { type: "boolean", label: "Enable Hover", default: true, section: "Formatting", order: 40 },
    hover_bg_color: { type: "string", label: "Hover BG Color", display: "color", default: "#f3f4f6", section: "Formatting", order: 41 }
  },

  create: function(element, config) {
    this.container = element.appendChild(document.createElement("div"));
    this.container.id = "advanced-table-container";
    this.state = { currentPage: 1, sortField: null, sortDirection: 'asc', collapsedGroups: {}, lastSubtotalDimension: null, data: [] };
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    this.clearErrors();
    if (!queryResponse || !queryResponse.fields || !data || data.length === 0) { done(); return; }

    const dims = queryResponse.fields.dimension_like;
    const measures = queryResponse.fields.measure_like;

    if (dims.length > 0) {
      this.options.subtotal_dimension.values = [{"None": ""}, ...dims.map(d => ({[d.label_short || d.label]: d.name}))];
    }
    this.trigger('registerOptions', this.options);

    this.state.data = data;
    this.queryResponse = queryResponse;

    const currentKey = config.enable_bo_hierarchy ? config.hierarchy_dimensions : config.subtotal_dimension;
    if (currentKey && this.state.lastSubtotalDimension !== currentKey) {
        this.state.collapsedGroups = {};
        this.state.lastSubtotalDimension = currentKey;
        this.state.forceInitialCollapse = true;
        this.state.currentPage = 1;
    }

    let processedData = [...data];
    if (this.state.sortField) processedData = this.sortData(processedData, this.state.sortField, this.state.sortDirection);

    if (config.enable_bo_hierarchy && config.hierarchy_dimensions) {
      const hierarchyList = config.hierarchy_dimensions.split(',').map(f => f.trim());
      processedData = this.calculateSubtotalsRecursive(processedData, hierarchyList, measures);
      if (this.state.forceInitialCollapse) {
        processedData.forEach(row => { if (row.__isSubtotal) this.state.collapsedGroups[row.__groupValue] = true; });
        this.state.forceInitialCollapse = false;
      }
      processedData = this.applyHierarchyFilter(processedData);
    } else if (config.enable_subtotals && config.subtotal_dimension) {
      processedData = this.calculateStandardSubtotals(processedData, config.subtotal_dimension, measures, config, dims);
      if (config.subtotal_position === 'top') {
        if (this.state.forceInitialCollapse) {
          processedData.forEach(row => { if (row.__isSubtotal) this.state.collapsedGroups[row.__groupValue] = true; });
          this.state.forceInitialCollapse = false;
        }
        processedData = processedData.filter(row => row.__isSubtotal ? true : !this.state.collapsedGroups[row.__parentGroup]);
      }
    }

    if (config.show_grand_total) processedData.push(this.calculateGrandTotal(data, measures, config, dims));

    this.renderTable(processedData, config, queryResponse);
    done();
  },

  calculateSubtotalsRecursive: function(data, fields, measures) {
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
        fields.slice(1).forEach(f => sub[f] = { value: '', rendered: '' });

        measures.forEach(m => {
          let sum = groups[key].reduce((acc, r) => acc + Number((r[m.name]?.value || r[m.name]) || 0), 0);
          sub[m.name] = { value: sum, rendered: sum.toLocaleString(undefined, {minimumFractionDigits:2}) };
        });

        result.push(sub);
        if (level < fields.length - 1) groupData(groups[key], level + 1, currentPath);
        else groups[key].forEach(r => { r.__parentGroup = currentPath; r.__level = level + 1; result.push(r); });
      });
    };
    groupData(data, 0, "");
    return result;
  },

  calculateStandardSubtotals: function(data, field, measures, config, dims) {
    const result = [];
    const groups = {};
    data.forEach(row => {
      let val = row[field];
      let key = (val && typeof val === 'object') ? (val.value || 'null') : (val || 'null');
      if (!groups[key]) groups[key] = [];
      groups[key].push(row);
    });
    Object.keys(groups).forEach(key => {
      const sub = { __isSubtotal: true, __groupValue: key, __level: 0 };
      sub[field] = { value: key, rendered: key };
      dims.forEach(d => { if(d.name !== field) sub[d.name] = { value: '', rendered: '' }; });
      measures.forEach(m => {
        let sum = groups[key].reduce((acc, r) => acc + Number((r[m.name]?.value || r[m.name]) || 0), 0);
        sub[m.name] = { value: sum, rendered: sum.toLocaleString(undefined, {minimumFractionDigits:2}) };
      });
      if (config.subtotal_position === 'top') {
        result.push(sub);
        groups[key].forEach(r => { r.__parentGroup = key; result.push(r); });
      } else {
        groups[key].forEach(r => result.push(r));
        result.push(sub);
      }
    });
    return result;
  },

  applyHierarchyFilter: function(data) {
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

  calculateGrandTotal: function(rawData, measures, config, dimensions) {
    const total = { __isGrandTotal: true };
    if (dimensions.length > 0) total[dimensions[0].name] = { value: config.grand_total_label, rendered: config.grand_total_label };
    measures.forEach(m => {
      let sum = rawData.reduce((acc, r) => acc + Number((r[m.name]?.value || r[m.name]) || 0), 0);
      total[m.name] = { value: sum, rendered: sum.toLocaleString(undefined, {minimumFractionDigits:2}) };
    });
    return total;
  },

  renderTable: function(processedData, config, queryResponse) {
    const fields = queryResponse.fields.dimension_like.concat(queryResponse.fields.measure_like);
    const hDims = config.enable_bo_hierarchy ? (config.hierarchy_dimensions || "").split(',').map(f => f.trim()) : [];
    const mainTreeCol = hDims[0] || config.subtotal_dimension;

    let html = `<style>
        table.advanced-table tbody td { font-size:${config.cell_font_size}px; height:${config.row_height}px; padding:0 12px; border:1px solid #eee; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .subtotal-row { font-weight: ${config.standard_subtotal_bold ? 'bold' : 'normal'} !important; }
        .subtotal-row.bo-mode { font-weight: ${config.bo_hierarchy_bold ? 'bold' : 'normal'} !important; }
        table.advanced-table { width: 100%; border-collapse: separate; border-spacing: 0; background: #fff; }
        table.advanced-table thead { position: sticky; top: 0; z-index: 100; background: #f9fafb; }
        .grand-total-row { background-color: #e8e8e8 !important; font-weight: 700; border-top: 3px solid #333 !important; }
        .column-group-header { text-align: center; font-weight: 600; padding: 8px; border-bottom: 2px solid #d1d5db; }
        .data-chip { padding: 2px 10px; border-radius: 12px; font-size: 0.85em; font-weight: 600; display: inline-block; text-align: center; }
        .chip-green { background-color: #dcfce7; color: #166534; } .chip-red { background-color: #fee2e2; color: #991b1b; }
        .cell-bar-container { display: flex; align-items: center; gap: 8px; width: 100%; }
        .cell-bar-bg { flex: 1; height: 16px; background: #f3f4f6; border-radius: 2px; overflow: hidden; position: relative; }
        .cell-bar-fill { height: 100%; transition: width 0.3s ease; }
        .subtotal-toggle { cursor: pointer; margin-right: 8px; font-weight: bold; font-family: monospace; user-select: none; display: inline-block; width: 14px; text-align: center; }
    </style>`;

    html += `<table class="advanced-table ${config.table_theme}">`;
    if (config.enable_column_groups) html += this.renderColumnGroups(config, fields);

    html += '<thead><tr style="background:#f9fafb">';
    if (config.show_row_numbers) html += '<th>#</th>';
    fields.forEach((f, idx) => {
      if (config.enable_bo_hierarchy && hDims.includes(f.name) && f.name !== hDims[0]) return;
      const sticky = (idx < config.freeze_columns) ? 'position:sticky; left:0; z-index:101; background:#f9fafb;' : '';
      const sortIcon = this.state.sortField === f.name ? (this.state.sortDirection === 'asc' ? ' ▲' : ' ▼') : '';
      html += `<th class="sortable" data-field="${f.name}" style="${sticky} cursor:pointer;">${f.label_short || f.label}${sortIcon}</th>`;
    });
    html += '</tr></thead><tbody>';

    processedData.forEach((row, i) => {
      const isSub = !!row.__isSubtotal, isGT = !!row.__isGrandTotal;
      const level = row.__level || 0;
      const bg = isSub ? `background:${config.subtotal_background_color};` : '';
      const modeClass = config.enable_bo_hierarchy ? 'bo-mode' : '';

      html += `<tr class="${isGT?'grand-total-row':(isSub?'subtotal-row ' + modeClass:'detail-row')}" data-group="${row.__groupValue || ''}" style="${bg}">`;
      if (config.show_row_numbers) html += `<td>${(isSub||isGT)?'':i+1}</td>`;

      fields.forEach((f, idx) => {
        if (config.enable_bo_hierarchy && hDims.includes(f.name) && f.name !== hDims[0]) return;
        let style = (idx < config.freeze_columns) ? 'position:sticky; left:0; z-index:1; background:inherit;' : '';
        if (f.name === mainTreeCol) style += `padding-left: ${(level * 20) + 12}px;`;

        let content = this.renderCellContent(row[f.name], f, config, row, i, processedData);
        if (isSub && f.name === mainTreeCol) content = `<span class="subtotal-toggle">${this.state.collapsedGroups[row.__groupValue] ? '▶' : '▼'}</span>${content}`;

        html += `<td style="${style}">${content}</td>`;
      });
      html += "</tr>";
    });

    html += "</tbody></table>";
    this.container.innerHTML = html;
    this.attachEventListeners(config);
  },

  renderColumnGroups: function(config, fields) {
    let html = '<thead><tr>';
    if (config.show_row_numbers) html += '<th rowspan="2"></th>';
    let currentIdx = 0;
    for (let i = 1; i <= 3; i++) {
      const name = config[`column_group_${i}_name`], count = config[`column_group_${i}_count`];
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

  renderCellContent: function(cell, field, config, row, rowIdx, data) {
    let val = cell, rendered = cell;
    if (cell && typeof cell === 'object') { val = cell.value; rendered = cell.rendered || cell.value; }
    if (val === null || val === undefined) return '∅';

    // Data Chip logic
    if (config.enable_data_chips && (config.data_chip_fields || "").split(',').includes(field.name)) {
      const s = String(val).toLowerCase();
      if ((config.chip_match_green || "").split(',').map(x=>x.trim().toLowerCase()).includes(s)) rendered = `<span class="data-chip chip-green">${rendered}</span>`;
      else if ((config.chip_match_red || "").split(',').map(x=>x.trim().toLowerCase()).includes(s)) rendered = `<span class="data-chip chip-red">${rendered}</span>`;
    }

    // Smart Comparison Logic
    if (config.enable_comparison && config.comparison_primary_field === field.name) {
      const isLastOfSubgroup = this.isLastElementOfGroup(rowIdx, data, config);
      if (!row.__isGrandTotal && !isLastOfSubgroup) {
        rendered = this.renderComparison(row, config, rowIdx, data, rendered);
      }
    }

    // Cell Bar Logic - FIX: Exclude Grand Total
    if (!row.__isGrandTotal) {
        if (config.enable_cell_bars_1 && (config.cell_bar_fields_1 || "").split(',').map(x=>x.trim()).includes(field.name)) {
            rendered = this.generateCellBar(val, rendered, config.cell_bar_color_1, config.use_gradient_1, config.gradient_end_1, data, field.name);
        } else if (config.enable_cell_bars_2 && (config.cell_bar_fields_2 || "").split(',').map(x=>x.trim()).includes(field.name)) {
            rendered = this.generateCellBar(val, rendered, config.cell_bar_color_2, config.use_gradient_2, config.gradient_end_2, data, field.name);
        }
    }

    return rendered;
  },

  isLastElementOfGroup: function(idx, data, config) {
    if (idx >= data.length - 1) return true;
    const curr = data[idx];
    const next = data[idx + 1];
    if (next.__isGrandTotal) return true;
    if (config.enable_bo_hierarchy) {
        // In BO mode, if the next row level is lower, this was the last of the child group
        return next.__level < curr.__level;
    }
    // In Standard mode, if next is a subtotal, current detail row is the last in that group
    if (!curr.__isSubtotal && next.__isSubtotal) return true;
    return false;
  },

  generateCellBar: function(val, rendered, color, useGrad, endColor, data, fieldName) {
      const num = parseFloat(val);
      const allVals = data.filter(r => !r.__isGrandTotal).map(r => parseFloat(r[fieldName]?.value || 0));
      const maxVal = Math.max(...allVals, 1);
      const width = Math.min(100, Math.max(0, (num / maxVal) * 100));
      const barStyle = useGrad ? `linear-gradient(to right, ${color}, ${endColor})` : color;
      return `<div class="cell-bar-container"><div class="cell-bar-bg"><div class="cell-bar-fill" style="width:${width}%; background:${barStyle};"></div></div><span>${rendered}</span></div>`;
  },

  renderComparison: function(row, config, rowIdx, data, primaryRendered) {
    const primary = parseFloat(row[config.comparison_primary_field]?.value || 0);
    let secondary = 0;
    if (config.comparison_mode === 'metric') {
      secondary = parseFloat(row[config.comparison_secondary_field]?.value || 0);
    } else {
        const isSub = !!row.__isSubtotal;
        const level = row.__level || 0;
        // FIX: Expansion-stable comparison. Filter to rows of the same type/level.
        const likeRows = data.filter(r => !!r.__isSubtotal === isSub && (r.__level === level || !isSub) && !r.__isGrandTotal);
        const currIdx = likeRows.indexOf(row);
        const compRow = likeRows[currIdx - (config.comparison_period_offset || -1)];
        secondary = parseFloat(compRow?.[config.comparison_primary_field]?.value || 0);
    }
    if (isNaN(secondary) || secondary === 0) return primaryRendered;
    const diff = primary - secondary;
    const pct = ((diff / Math.abs(secondary)) * 100).toFixed(1);
    const color = diff >= 0 ? config.positive_comparison_color : config.negative_comparison_color;
    const arrow = config.show_comparison_arrows ? (diff >= 0 ? '↑' : '↓') : '';
    return `<span>${primaryRendered}</span> <span style="color:${color}; font-size:0.85em; font-weight:600; margin-left:5px;">${arrow}${Math.abs(pct)}%</span>`;
  },

  sortData: function(data, field, direction) {
    return [...data].sort((a, b) => {
      let aVal = a[field]?.value ?? a[field];
      let bVal = b[field]?.value ?? b[field];
      if (aVal === bVal) return 0;
      const res = aVal > bVal ? 1 : -1;
      return direction === 'asc' ? res : -res;
    });
  },

  attachEventListeners: function(config) {
    const self = this;
    this.container.onclick = (e) => {
        const row = e.target.closest('.subtotal-row');
        if (row) {
            const g = row.dataset.group;
            if (self.state.collapsedGroups[g]) delete self.state.collapsedGroups[g];
            else self.state.collapsedGroups[g] = true;
            self.updateAsync(self.state.data, self.container.parentElement, config, self.queryResponse, {}, () => {});
            return;
        }
        const th = e.target.closest('th.sortable');
        if (th) {
            const f = th.dataset.field;
            self.state.sortDirection = (self.state.sortField === f && self.state.sortDirection === 'asc') ? 'desc' : 'asc';
            self.state.sortField = f;
            self.updateAsync(self.state.data, self.container.parentElement, config, self.queryResponse, {}, () => {});
        }
    };
    if (config.enable_hover) {
        this.container.querySelectorAll('tbody tr:not(.subtotal-row):not(.grand-total-row)').forEach(tr => {
            tr.onmouseenter = () => tr.style.backgroundColor = config.hover_bg_color;
            tr.onmouseleave = () => tr.style.backgroundColor = '';
        });
    }
  },
  trigger: function(event) {},
  clearErrors: function() {}
};

looker.plugins.visualizations.add(visObject);

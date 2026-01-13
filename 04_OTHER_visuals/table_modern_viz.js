/**
 * Advanced Table Visualization for Looker
 * Version: 4.13.2 - COMPLETE RESTORE + BO Hierarchy + Fixed Groups
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
    pagination_position: { type: "string", label: "Position", display: "select", values: [{ "Top": "top" }, { "Bottom": "bottom" }, { "Both": "both" }], default: "bottom", section: "Plot", order: 23 },
    plot_divider_freezing: { type: "string", label: "──────────────── Freezing ────────────────", display: "divider", section: "Plot", order: 30 },
    freeze_columns: { type: "number", label: "Freeze Left Columns", default: 0, section: "Plot", order: 31 },

    // ══════════════════════════════════════════════════════════════
    // TAB: SERIES
    // ══════════════════════════════════════════════════════════════
    hierarchy_divider: { type: "string", label: "──────────────── BO Hierarchy Mode ────────────────", display: "divider", section: "Series", order: 10 },
    enable_bo_hierarchy: { type: "boolean", label: "Enable BO-Style Hierarchy", default: false, section: "Series", order: 11 },
    hierarchy_dimensions: { type: "string", label: "Hierarchy Levels (comma-separated)", display: "text", default: "", placeholder: "brand,category", section: "Series", order: 12 },

    subtotals_divider: { type: "string", label: "──────────────── Standard Subtotals ────────────────", display: "divider", section: "Series", order: 20 },
    enable_subtotals: { type: "boolean", label: "Enable Subtotals", default: false, section: "Series", order: 21 },
    subtotal_dimension: { type: "string", label: "Group By Dimension", display: "select", values: [{"None": ""}], default: "", section: "Series", order: 22 },
    subtotal_position: { type: "string", label: "Position", display: "select", values: [{"Top": "top"}, {"Bottom": "bottom"}], default: "bottom", section: "Series", order: 23 },
    subtotal_background_color: { type: "string", label: "Subtotal BG Color", display: "color", default: "#f0f0f0", section: "Series", order: 24 },

    totals_divider: { type: "string", label: "──────────────── Grand Totals ────────────────", display: "divider", section: "Series", order: 30 },
    show_grand_total: { type: "boolean", label: "Show Grand Total Row", default: false, section: "Series", order: 31 },
    grand_total_label: { type: "string", label: "Grand Total Label", default: "Grand Total", section: "Series", order: 32 },
    show_grand_total_on_all_pages: { type: "boolean", label: "Show GT on All Pages", default: true, section: "Series", order: 33 },

    chips_divider: { type: "string", label: "──────────────── Data Chips ────────────────", display: "divider", section: "Series", order: 40 },
    enable_data_chips: { type: "boolean", label: "Enable Data Chips", default: true, section: "Series", order: 41 },
    data_chip_fields: { type: "string", label: "Fields (comma-sep)", display: "text", default: "", section: "Series", order: 42 },
    chip_match_green: { type: "string", label: "Green Match", default: "complete,yes", section: "Series", order: 43 },
    chip_match_red: { type: "string", label: "Red Match", default: "cancelled,no", section: "Series", order: 44 },

    cell_bars_divider: { type: "string", label: "──────────────── Cell Bar Charts ────────────────", display: "divider", section: "Series", order: 50 },
    enable_cell_bars_1: { type: "boolean", label: "Enable Set 1", default: false, section: "Series", order: 51 },
    cell_bar_fields_1: { type: "string", label: "Set 1 Fields", display: "text", default: "", section: "Series", order: 52 },
    cell_bar_color_1: { type: "string", label: "Color 1", display: "color", default: "#3b82f6", section: "Series", order: 53 },

    column_group_divider: { type: "string", label: "──────────────── Column Grouping ────────────────", display: "divider", section: "Series", order: 60 },
    enable_column_groups: { type: "boolean", label: "Enable Column Grouping", default: false, section: "Series", order: 61 },
    column_group_1_name: { type: "string", label: "Group 1 Name", default: "Group 1", section: "Series", order: 62 },
    column_group_1_count: { type: "number", label: "Group 1 Count", default: 1, section: "Series", order: 63 },
    group_header_bg_color: { type: "string", label: "Header BG Color", display: "color", default: "#8dc6ff", section: "Series", order: 64 },

    field_formatting_divider: { type: "string", label: "──────────────── Field Formatting ────────────────", display: "divider", section: "Series", order: 70 },
    enable_custom_field_formatting: { type: "boolean", label: "Enable Custom Formatting", default: false, section: "Series", order: 71 },

    // ══════════════════════════════════════════════════════════════
    // TAB: FORMATTING
    // ══════════════════════════════════════════════════════════════
    formatting_divider_theme: { type: "string", label: "──────────────── Theme ────────────────", display: "divider", section: "Formatting", order: 10 },
    table_theme: { type: "string", label: "Table Theme", display: "select", values: [{ "Modern": "modern" }, { "Compact": "compact" }, { "Striped": "striped" }], default: "modern", section: "Formatting", order: 11 },
    cell_font_size: { type: "number", label: "Cell Size (px)", default: 11, section: "Formatting", order: 20 },
    row_height: { type: "number", label: "Row Height (px)", default: 36, section: "Formatting", order: 21 },
    enable_hover: { type: "boolean", label: "Enable Hover", default: true, section: "Formatting", order: 40 }
  },

  create: function(element, config) {
    element.innerHTML = `
      <style>
        #advanced-table-container { width: 100%; height: 100%; overflow: auto; font-family: sans-serif; position: relative; }
        .pagination-controls { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: #fff; border-bottom: 1px solid #e5e7eb; font-size: 13px; }
        .pagination-button { padding: 4px 8px; border: 1px solid #d1d5db; background: #fff; cursor: pointer; border-radius: 4px; }
        .pagination-button:disabled { opacity: 0.3; cursor: not-allowed; }
        .table-wrapper { overflow: auto; position: relative; max-height: 100%; }
        table.advanced-table { width: 100%; border-collapse: separate; border-spacing: 0; background: #fff; }
        table.advanced-table thead { position: sticky; top: 0; z-index: 100; background: #f9fafb; }
        table.advanced-table tbody td { border: 1px solid #eee; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding: 0 12px; }
        .subtotal-toggle { cursor: pointer; margin-right: 8px; font-weight: bold; font-family: monospace; }
        .subtotal-row { font-weight: 600; cursor: pointer; border-top: 2px solid #ddd !important; }
        .grand-total-row { background-color: #e8e8e8 !important; font-weight: 700; border-top: 3px solid #333 !important; }
        .data-chip { padding: 2px 10px; border-radius: 12px; font-size: 0.85em; font-weight: 600; display: inline-block; }
        .chip-green { background: #dcfce7; color: #166534; } .chip-red { background: #fee2e2; color: #991b1b; }
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
    // CRASH FIX: Null check for fields
    if (!queryResponse || !queryResponse.fields || !data || data.length === 0) { done(); return; }

    const dims = queryResponse.fields.dimension_like;
    const measures = queryResponse.fields.measure_like;

    if (dims.length > 0) {
      const dimensionValues = [{"None": ""}];
      dims.forEach(dim => dimensionValues.push({[dim.label_short || dim.label]: dim.name}));
      this.options.subtotal_dimension.values = dimensionValues;
    }
    this.trigger('registerOptions', this.options);

    this.state.data = data;
    let filteredData = this.applyFilters(data, config);

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
      filteredData = this.filterCollapsedRows(filteredData);
    } else if (config.enable_subtotals && config.subtotal_dimension) {
      filteredData = this.calculateSubtotals(filteredData, [config.subtotal_dimension], measures, config, dims);
      if (config.subtotal_position === 'top') {
        if (this.state.forceInitialCollapse) {
          filteredData.forEach(row => { if (row.__isSubtotal) this.state.collapsedGroups[row.__groupValue] = true; });
          this.state.forceInitialCollapse = false;
        }
        filteredData = this.filterCollapsedRows(filteredData);
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

  filterCollapsedRows: function(data) {
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
    styleTag.innerHTML = `:root { --cell-font-size:${config.cell_font_size}px; --row-height:${config.row_height}px; --column-spacing:${config.column_spacing}px; }`;
    document.head.appendChild(styleTag);

    if (config.enable_pagination && (config.pagination_position === 'top' || config.pagination_position === 'both')) {
      html += this.renderPagination(totalRows, totalPages, config, 'top');
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
    return `<div class="pagination-controls ${position}"><span>Showing ${totalRows} rows</span><div class="pagination-buttons">
        <button class="pagination-button" data-action="first" ${curr === 1 ? 'disabled' : ''}>⟨⟨</button>
        <button class="pagination-button" data-action="prev" ${curr === 1 ? 'disabled' : ''}>⟨</button>
        <span style="padding:0 10px;">Page ${curr} of ${totalPages}</span>
        <button class="pagination-button" data-action="next" ${curr === totalPages ? 'disabled' : ''}>⟩</button>
        <button class="pagination-button" data-action="last" ${curr === totalPages ? 'disabled' : ''}>⟩⟩</button>
      </div></div>`;
  },

  // FIX: Missing renderColumnGroups added back
  renderColumnGroups: function(config, queryResponse) {
    const fields = queryResponse.fields.dimension_like.concat(queryResponse.fields.measure_like);
    let html = '<thead><tr>';
    if (config.show_row_numbers) html += '<th rowspan="2"></th>';
    const name = config.column_group_1_name;
    const count = config.column_group_1_count;
    if (name && count > 0) {
      html += `<th colspan="${count}" class="column-group-header" style="background:${config.group_header_bg_color}">${name}</th>`;
      html += `<th colspan="${fields.length - count}" class="column-group-header">Other</th>`;
    }
    return html + '</tr></thead>';
  },

  renderHeaders: function(config, queryResponse) {
    const fields = queryResponse.fields.dimension_like.concat(queryResponse.fields.measure_like);
    const hDims = config.enable_bo_hierarchy ? (config.hierarchy_dimensions || "").split(',').map(f => f.trim()) : [];
    let html = '<thead><tr style="background:#f9fafb">';
    if (config.show_row_numbers && !config.enable_column_groups) html += '<th>#</th>';
    fields.forEach((f, idx) => {
      if (config.enable_bo_hierarchy && hDims.includes(f.name) && f.name !== hDims[0]) return;
      const label = (config.enable_custom_field_formatting && config[`field_label_${f.name}`]) || f.label_short || f.label;
      const sticky = (idx < config.freeze_columns) ? 'position:sticky; left:0; z-index:101; background:#f9fafb;' : '';
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
        let content = this.renderCellContent(row[f.name], f, config, row);
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

  renderCellContent: function(cell, field, config, row) {
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

    // Cell Bar logic (Set 1 only for simplicity)
    if (config.enable_cell_bars_1 && (config.cell_bar_fields_1 || "").split(',').map(x=>x.trim()).includes(field.name)) {
        rendered = `<div class="cell-bar-container"><div class="cell-bar-bg"><div class="cell-bar-fill" style="width:50%; background:${config.cell_bar_color_1};"></div></div><span>${rendered}</span></div>`;
    }

    return rendered;
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
        row.onmouseenter = () => row.style.backgroundColor = '#f3f4f6';
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
  trigger: function(event) {}
};

looker.plugins.visualizations.add(visObject);

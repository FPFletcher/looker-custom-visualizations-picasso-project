/**
 * Advanced Table Visualization for Looker
 * Version: 4.23.0 - FINAL MASTER: Fixed Crash, Restored Filtering, Pagination & Formatting
 * Build: 2026-01-15
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
    freeze_header_row: { type: "boolean", label: "Freeze Header Row", default: true, section: "Plot", order: 22 },
    plot_divider_filtering: { type: "string", label: "━━━ Filtering ━━━", display: "divider", section: "Plot", order: 30 },
    enable_table_filter: { type: "boolean", label: "Enable Table-wide Filter", default: false, section: "Plot", order: 31 },
    enable_column_filters: { type: "boolean", label: "Enable Column Filters", default: false, section: "Plot", order: 32 },

    // ══════════════════════════════════════════════════════════════
    // TAB: SERIES
    // ══════════════════════════════════════════════════════════════
    hierarchy_divider: { type: "string", label: "━━━ BO Hierarchy Mode ━━━", display: "divider", section: "Series", order: -10 },
    enable_bo_hierarchy: { type: "boolean", label: "Enable BO-Style Hierarchy", default: false, section: "Series", order: -9 },
    hierarchy_dimensions: { type: "string", label: "Hierarchy Levels", display: "text", default: "", section: "Series", order: -8 },
    bo_hierarchy_bold: { type: "boolean", label: "Bold Font for Hierarchy", default: true, section: "Series", order: -7 },

    cell_bars_divider: { type: "string", label: "━━━ Cell Bar Charts ━━━", display: "divider", section: "Series", order: 0 },
    enable_cell_bars_1: { type: "boolean", label: "Enable Set 1", default: false, section: "Series", order: 1 },
    cell_bar_fields_1: { type: "string", label: "Fields 1", display: "text", default: "", section: "Series", order: 2 },
    cell_bar_color_1: { type: "string", label: "Color 1", display: "color", default: "#3b82f6", section: "Series", order: 3 },
    use_gradient_1: { type: "boolean", label: "Use Gradient 1", default: false, section: "Series", order: 4 },
    gradient_end_1: { type: "string", label: "End 1", display: "color", default: "#93c5fd", section: "Series", order: 5 },

    column_groups_divider: { type: "string", label: "━━━ Column Grouping ━━━", display: "divider", section: "Series", order: 20 },
    enable_column_groups: { type: "boolean", label: "Enable Column Groups", default: false, section: "Series", order: 21 },
    column_group_1_name: { type: "string", label: "Group 1 Name", default: "", section: "Series", order: 22 },
    column_group_1_count: { type: "number", label: "Count 1", default: 1, section: "Series", order: 23 },
    column_group_2_name: { type: "string", label: "Group 2 Name", default: "", section: "Series", order: 24 },
    column_group_2_count: { type: "number", label: "Count 2", default: 1, section: "Series", order: 25 },
    column_group_3_name: { type: "string", label: "Group 3 Name", default: "", section: "Series", order: 26 },
    column_group_3_count: { type: "number", label: "Count 3", default: 1, section: "Series", order: 27 },
    group_header_bg_color: { type: "string", label: "Header BG Color", display: "color", default: "#8dc6ff", section: "Series", order: 30 },

    subtotals_divider: { type: "string", label: "━━━ Subtotals & Totals ━━━", display: "divider", section: "Series", order: 80 },
    enable_subtotals: { type: "boolean", label: "Enable Subtotals", default: false, section: "Series", order: 81 },
    subtotal_dimension: { type: "string", label: "Group Dimension", display: "select", values: [{"None": ""}], default: "", section: "Series", order: 82 },
    standard_subtotal_bold: { type: "boolean", label: "Bold Subtotals", default: true, section: "Series", order: 83 },
    show_grand_total: { type: "boolean", label: "Show Grand Total Row", default: false, section: "Series", order: 84 },
    subtotal_position: { type: "string", label: "Position", display: "select", values: [{"Top": "top"}, {"Bottom": "bottom"}], default: "bottom", section: "Series", order: 85 },
    subtotal_background_color: { type: "string", label: "Subtotal BG Color", display: "color", default: "#f0f0f0", section: "Series", order: 86 },

    // ══════════════════════════════════════════════════════════════
    // TAB: FORMATTING
    // ══════════════════════════════════════════════════════════════
    formatting_divider_theme: { type: "string", label: "━━━ Theme ━━━", display: "divider", section: "Formatting", order: 0 },
    table_theme: { type: "string", label: "Table Theme", display: "select", values: [{ "Modern": "modern" }, { "Compact": "compact" }, { "Striped": "striped" }], default: "modern", section: "Formatting", order: 1 },
    stripe_color: { type: "string", label: "Stripe color", display: "color", default: "#f9fafb", section: "Formatting", order: 2 },
    formatting_divider_headers: { type: "string", label: "━━━ Headers ━━━", display: "divider", section: "Formatting", order: 10 },
    header_font_family: { type: "string", label: "Font", display: "select", values: [{"Sans-Serif": "sans-serif"}, {"Serif": "serif"}, {"Monospace": "monospace"}], default: "sans-serif", section: "Formatting", order: 11 },
    header_font_size: { type: "number", label: "Size (px)", default: 12, section: "Formatting", order: 12 },
    formatting_divider_cells: { type: "string", label: "━━━ Cells ━━━", display: "divider", section: "Formatting", order: 20 },
    cell_font_family: { type: "string", label: "Font", display: "select", values: [{"Sans-Serif": "sans-serif"}, {"Serif": "serif"}, {"Monospace": "monospace"}], default: "sans-serif", section: "Formatting", order: 21 },
    cell_font_size: { type: "number", label: "Size (px)", default: 11, section: "Formatting", order: 22 },
    cell_text_color: { type: "string", label: "Text Color", display: "color", default: "#374151", section: "Formatting", order: 23 },
    row_height: { type: "number", label: "Row Height (px)", default: 36, section: "Formatting", order: 24 },
    enable_hover: { type: "boolean", label: "Enable Hover", default: true, section: "Formatting", order: 40 },
    hover_bg_color: { type: "string", label: "Hover Color", display: "color", default: "#f3f4f6", section: "Formatting", order: 41 }
  },

  create: function(element, config) {
    this.container = element.appendChild(document.createElement("div"));
    this.container.id = "advanced-table-container";
    this.state = { currentPage: 1, tableFilter: '', columnFilters: {}, collapsedGroups: {}, sortField: null, sortDirection: 'asc' };
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    this.clearErrors();
    // CRASH FIX: Guard against missing properties
    if (!queryResponse || !queryResponse.fields || !data || data.length === 0) { done(); return; }

    const dims = queryResponse.fields.dimension_like || [];
    const measures = queryResponse.fields.measure_like || [];
    const allMetadataFields = dims.concat(measures);

    if (dims.length > 0) {
      this.options.subtotal_dimension.values = [{"None": ""}, ...dims.map(d => ({[d.label_short || d.label]: d.name}))];
    }
    allMetadataFields.forEach((field, idx) => {
      const baseOrder = 110 + (idx * 3);
      if (!this.options[`field_label_${field.name}`]) {
        this.options[`field_divider_${field.name}`] = { type: "string", label: `━━━ ${field.label_short || field.label} ━━━`, display: "divider", section: "Series", order: baseOrder };
        this.options[`field_label_${field.name}`] = { type: "string", label: "Label", display: "text", default: field.label_short || field.label, section: "Series", order: baseOrder + 1 };
        this.options[`field_format_${field.name}`] = { type: "string", label: "Value Format", display: "text", default: "", section: "Series", order: baseOrder + 2 };
      }
    });
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

    let processedData = this.applyFilters(data, config);
    if (this.state.sortField) processedData = this.sortData(processedData, this.state.sortField, this.state.sortDirection);

    if (config.enable_bo_hierarchy && config.hierarchy_dimensions) {
      const hierarchyList = config.hierarchy_dimensions.split(',').map(f => f.trim());
      processedData = this.calculateSubtotalsRecursive(processedData, hierarchyList, measures, config);
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

    const totalVisibleRowsCount = processedData.length;
    const dataWithoutGT = processedData.filter(r => !r.__isGrandTotal);
    const gtRow = processedData.find(r => r.__isGrandTotal);
    const totalPages = Math.max(1, Math.ceil(dataWithoutGT.length / config.page_size));
    if (this.state.currentPage > totalPages) this.state.currentPage = totalPages;
    const startIdx = (this.state.currentPage - 1) * config.page_size;

    let pageData = config.enable_pagination ? dataWithoutGT.slice(startIdx, startIdx + config.page_size) : dataWithoutGT;
    if (gtRow && config.show_grand_total_on_all_pages !== false) pageData.push(gtRow);

    this.renderTable(pageData, totalVisibleRowsCount, totalPages, config, queryResponse);
    done();
  },

  formatValue: function(value, fieldName, row, config) {
    const customFormat = config[`field_format_${fieldName}`];

    // 1. Custom Format Priority
    if (customFormat && customFormat.trim() !== '') {
        const decimals = (customFormat.match(/0\.([0#]+)/) || [])[1]?.length || 0;
        let res = Number(value || 0).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
        if (customFormat.includes('$')) res = '$' + res;
        return res;
    }
    // 2. LookML default rendering fallback
    if (row[fieldName] && row[fieldName].rendered !== undefined) {
        return row[fieldName].rendered;
    }
    // 3. Raw number fallback
    return isNaN(value) ? value : Number(value).toLocaleString();
  },

  applyFilters: function(data, config) {
    let filtered = [...data];
    if (config.enable_table_filter && this.state.tableFilter) {
      const s = this.state.tableFilter.toLowerCase();
      filtered = filtered.filter(row => Object.values(row).some(v => String(v?.value || v).toLowerCase().includes(s)));
    }
    if (config.enable_column_filters) {
      Object.keys(this.state.columnFilters).forEach(f => {
        const val = this.state.columnFilters[f].toLowerCase();
        if (val) filtered = filtered.filter(row => String(row[f]?.value || row[f]).toLowerCase().includes(val));
      });
    }
    return filtered;
  },

  calculateSubtotalsRecursive: function(data, fields, measures, config) {
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
        const sub = { __isSubtotal: true, __groupValue: currentPath, __level: level, __parentPath: parentPath };
        sub[fields[0]] = { value: key, rendered: key };
        fields.slice(1).forEach(f => sub[f] = { value: '', rendered: '' });
        measures.forEach(m => {
          let sum = groups[key].reduce((acc, r) => acc + Number((r[m.name]?.value || r[m.name]) || 0), 0);
          sub[m.name] = { value: sum, rendered: this.formatValue(sum, m.name, sub, config) };
        });
        result.push(sub);
        if (level < fields.length - 1) groupData(groups[key], level + 1, currentPath);
        else groups[key].forEach(r => { r.__parentGroup = currentPath; r.__parentPath = currentPath; r.__level = level + 1; result.push(r); });
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
        sub[m.name] = { value: sum, rendered: this.formatValue(sum, m.name, sub, config) };
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
    const total = { __isGrandTotal: true, __level: -1 };
    if (dimensions.length > 0) total[dimensions[0].name] = { value: config.grand_total_label, rendered: config.grand_total_label };
    measures.forEach(m => {
      let sum = rawData.reduce((acc, r) => acc + Number((r[m.name]?.value || r[m.name]) || 0), 0);
      total[m.name] = { value: sum, rendered: this.formatValue(sum, m.name, total, config) };
    });
    return total;
  },

  renderTable: function(pageData, totalVisibleRows, totalPages, config, queryResponse) {
    let html = '';
    const styleId = 'dynamic-table-style';
    if (document.getElementById(styleId)) document.getElementById(styleId).remove();
    const styleTag = document.createElement('style');
    styleTag.id = styleId;
    styleTag.innerHTML = `:root {
      --stripe-color: ${config.stripe_color || '#f9fafb'}; --cell-font-size: ${config.cell_font_size}px;
      --row-height: ${config.row_height}px; --column-spacing: ${config.column_spacing}px;
      --header-bg: ${config.header_bg_color}; --header-font: ${config.header_font_family};
      --cell-font: ${config.cell_font_family}; --header-color: ${config.header_text_color};
      --cell-color: ${config.cell_text_color}; --border-color: ${config.border_color};
    }
    table.advanced-table thead th { background: var(--header-bg) !important; font-family: var(--header-font); color: var(--header-color); }
    table.advanced-table tbody td { font-family: var(--cell-font); color: var(--cell-color); border-bottom:1px solid var(--border-color); border-right:1px solid var(--border-color); }
    table.advanced-table.striped tbody tr:nth-child(odd):not(.subtotal-row):not(.grand-total-row) { background-color: var(--stripe-color) !important; }
    .subtotal-row { background-color: ${config.subtotal_background_color} !important; font-weight: ${config.standard_subtotal_bold || config.bo_hierarchy_bold ? 'bold' : 'normal'} !important; }`;
    document.head.appendChild(styleTag);

    if (config.enable_pagination && (config.pagination_position === 'top' || config.pagination_position === 'both')) {
      html += this.renderPagination(totalVisibleRows, totalPages, config, 'top');
    }
    if (config.enable_table_filter) {
      html += `<div style="padding:12px; background:#f9fafb; border-bottom:1px solid #ddd;"><input type="text" id="table-filter-input" placeholder="Table Search..." value="${this.state.tableFilter || ''}" style="width:100%; padding:8px;"></div>`;
    }

    html += '<div class="table-wrapper"><table class="advanced-table ' + config.table_theme + '">';
    if (config.enable_column_groups) html += this.renderColumnGroups(config, queryResponse);
    html += this.renderHeaders(config, queryResponse);
    html += this.renderBody(pageData, config, queryResponse);
    html += '</table></div>';

    if (config.enable_pagination && (config.pagination_position === 'bottom' || config.pagination_position === 'both')) {
      html += this.renderPagination(totalVisibleRows, totalPages, config, 'bottom');
    }
    this.container.innerHTML = html;
    this.attachEventListeners(config);
  },

  renderHeaders: function(config, queryResponse) {
    const fields = queryResponse.fields.dimension_like.concat(queryResponse.fields.measure_like);
    const hDims = config.enable_bo_hierarchy ? (config.hierarchy_dimensions || "").split(',').map(f => f.trim()) : [];
    let html = '<thead><tr>';
    if (config.show_row_numbers) html += '<th>#</th>';
    fields.forEach((f, idx) => {
      if (config.enable_bo_hierarchy && hDims.includes(f.name) && f.name !== hDims[0]) return;
      const label = config[`field_label_${f.name}`] || f.label_short || f.label;
      const sticky = (idx < config.freeze_columns && config.freeze_header_row) ? 'position:sticky; left:0; z-index:101;' : '';
      const sortIcon = this.state.sortField === f.name ? (this.state.sortDirection === 'asc' ? ' ▲' : ' ▼') : '';
      html += `<th class="sortable" data-field="${f.name}" style="${sticky} cursor:pointer;">
        ${label}${sortIcon}
        ${config.enable_column_filters ? `<br><input type="text" class="column-filter" data-field="${f.name}" value="${this.state.columnFilters[f.name] || ''}" style="width:80%; font-size:10px;">` : ''}
      </th>`;
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
      html += `<tr class="${isGT?'grand-total-row':(isSub?'subtotal-row':'detail-row')}" data-group="${row.__groupValue || ''}">`;
      if (config.show_row_numbers) html += `<td>${(isSub||isGT)?'':((this.state.currentPage-1)*config.page_size)+i+1}</td>`;

      fields.forEach((f, idx) => {
        if (config.enable_bo_hierarchy && hDims.includes(f.name) && f.name !== hDims[0]) return;
        let style = (idx < config.freeze_columns) ? 'position:sticky; left:0; z-index:1; background:inherit;' : '';
        if (f.name === mainTreeCol) style += `padding-left: ${(level * 20) + 12}px;`;

        let cellValue = row[f.name]?.value || row[f.name];
        let content = this.formatValue(cellValue, f.name, row, config);

        if (isSub && f.name === mainTreeCol) content = `<span class="subtotal-toggle">${this.state.collapsedGroups[row.__groupValue] ? '▶' : '▼'}</span>${content}`;
        html += `<td style="${style}">${content}</td>`;
      });
      html += "</tr>";
    });
    return html + '</tbody>';
  },

  attachEventListeners: function(config) {
    const self = this;
    this.container.onclick = (e) => {
        const row = e.target.closest('.subtotal-row');
        if (row && (e.target.classList.contains('subtotal-toggle') || e.target.tagName === 'TD')) {
            const g = row.dataset.group;
            if (self.state.collapsedGroups[g]) delete self.state.collapsedGroups[g];
            else self.state.collapsedGroups[g] = true;
            self.updateAsync(self.state.data, self.container.parentElement, config, self.queryResponse, {}, () => {});
            return;
        }
        const th = e.target.closest('th.sortable');
        if (th && e.target.tagName !== 'INPUT') {
            const f = th.dataset.field;
            self.state.sortDirection = (self.state.sortField === f && self.state.sortDirection === 'asc') ? 'desc' : 'asc';
            self.state.sortField = f;
            self.updateAsync(self.state.data, self.container.parentElement, config, self.queryResponse, {}, () => {});
        }
        const pBtn = e.target.closest('.pagination-button');
        if (pBtn) {
            const act = pBtn.dataset.action;
            const totalPages = Math.ceil(self.state.data.length / config.page_size);
            if (act === 'first') self.state.currentPage = 1;
            else if (act === 'prev') self.state.currentPage = Math.max(1, self.state.currentPage - 1);
            else if (act === 'next') self.state.currentPage = Math.min(totalPages, self.state.currentPage + 1);
            else if (act === 'last') self.state.currentPage = totalPages;
            self.updateAsync(self.state.data, self.container.parentElement, config, self.queryResponse, {}, () => {});
        }
    };

    this.container.onkeypress = (e) => {
        if (e.key === 'Enter') {
            if (e.target.id === 'table-filter-input') self.state.tableFilter = e.target.value;
            if (e.target.classList.contains('column-filter')) self.state.columnFilters[e.target.dataset.field] = e.target.value;
            self.state.currentPage = 1;
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

  sortData: function(data, field, direction) {
    return [...data].sort((a, b) => {
      let aVal = a[field]?.value ?? a[field];
      let bVal = b[field]?.value ?? b[field];
      return direction === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
    });
  },

  renderPagination: function(totalRows, totalPages, config, pos) {
    const curr = this.state.currentPage;
    return `<div class="pagination-controls ${pos}"><div class="pagination-info">Showing ${totalRows} visible rows</div><div class="pagination-buttons">
      <button class="pagination-button" data-action="first" ${curr===1?'disabled':''}>⟨⟨</button>
      <button class="pagination-button" data-action="prev" ${curr===1?'disabled':''}>⟨</button>
      <span style="padding:0 10px;">Page ${curr} of ${totalPages}</span>
      <button class="pagination-button" data-action="next" ${curr===totalPages?'disabled':''}>⟩</button>
      <button class="pagination-button" data-action="last" ${curr===totalPages?'disabled':''}>⟩⟩</button>
    </div></div>`;
  },

  renderColumnGroups: function(config, queryResponse) {
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
    return html + '</tr></thead>';
  },

  trigger: function() {},
  clearErrors: function() {}
};

looker.plugins.visualizations.add(visObject);

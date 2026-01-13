/**
 * Advanced Table Visualization for Looker
 * Version: 4.14.0 - FULL RESTORE + FIXED HIERARCHY STATE + DEBUG LOGS
 * Build: 2026-01-13
 */

const visObject = {
  id: "advanced_table_visual",
  label: "Advanced Table",
  options: {
    // ══════════════════════════════════════════════════════════════
    // TAB: PLOT
    // ══════════════════════════════════════════════════════════════
    plot_divider_display: { type: "string", label: "─────────────────────────────── Display Options ───────────────────────────────", display: "divider", section: "Plot", order: 10 },
    show_row_numbers: { type: "boolean", label: "Show Row Numbers", default: false, section: "Plot", order: 11 },
    show_headers: { type: "boolean", label: "Show Headers", default: true, section: "Plot", order: 12 },
    plot_divider_pagination: { type: "string", label: "─────────────────────────────── Pagination ───────────────────────────────", display: "divider", section: "Plot", order: 20 },
    enable_pagination: { type: "boolean", label: "Enable Pagination", default: true, section: "Plot", order: 21 },
    page_size: { type: "number", label: "Page Size", default: 25, display: "number", section: "Plot", order: 22 },
    pagination_position: { type: "string", label: "Position", display: "select", values: [{ "Top": "top" }, { "Bottom": "bottom" }, { "Both": "both" }], default: "bottom", section: "Plot", order: 23 },
    plot_divider_freezing: { type: "string", label: "─────────────────────────────── Freezing ───────────────────────────────", display: "divider", section: "Plot", order: 30 },
    freeze_columns: { type: "number", label: "Freeze Left Columns", default: 0, section: "Plot", order: 31 },

    // ══════════════════════════════════════════════════════════════
    // TAB: SERIES
    // ══════════════════════════════════════════════════════════════
    hierarchy_divider: { type: "string", label: "─────────────────────────────── BO Hierarchy Mode ───────────────────────────────", display: "divider", section: "Series", order: 10 },
    enable_bo_hierarchy: { type: "boolean", label: "Enable BO-Style Hierarchy", default: false, section: "Series", order: 11 },
    hierarchy_dimensions: { type: "string", label: "Hierarchy Levels (comma-sep)", display: "text", default: "", placeholder: "brand,category", section: "Series", order: 12 },

    subtotals_divider: { type: "string", label: "─────────────────────────────── Standard Subtotals ───────────────────────────────", display: "divider", section: "Series", order: 20 },
    enable_subtotals: { type: "boolean", label: "Enable Subtotals", default: false, section: "Series", order: 21 },
    subtotal_dimension: { type: "string", label: "Group By Dimension", display: "select", values: [{"None": ""}], default: "", section: "Series", order: 22 },
    subtotal_position: { type: "string", label: "Position", display: "select", values: [{"Top": "top"}, {"Bottom": "bottom"}], default: "bottom", section: "Series", order: 23 },
    subtotal_background_color: { type: "string", label: "BG Color", display: "color", default: "#f0f0f0", section: "Series", order: 24 },

    totals_divider: { type: "string", label: "─────────────────────────────── Grand Totals ───────────────────────────────", display: "divider", section: "Series", order: 30 },
    show_grand_total: { type: "boolean", label: "Show Grand Total Row", default: false, section: "Series", order: 31 },
    grand_total_label: { type: "string", label: "Label", default: "Grand Total", section: "Series", order: 32 },

    chips_divider: { type: "string", label: "─────────────────────────────── Data Chips ───────────────────────────────", display: "divider", section: "Series", order: 40 },
    enable_data_chips: { type: "boolean", label: "Enable Data Chips", default: true, section: "Series", order: 41 },
    data_chip_fields: { type: "string", label: "Apply Fields", display: "text", default: "", section: "Series", order: 42 },
    chip_match_green: { type: "string", label: "Green Match", default: "complete,yes", section: "Series", order: 43 },
    chip_match_red: { type: "string", label: "Red Match", default: "cancelled,no", section: "Series", order: 44 },

    formatting_divider_theme: { type: "string", label: "─────────────────────────────── Theme ───────────────────────────────", display: "divider", section: "Formatting", order: 10 },
    table_theme: { type: "string", label: "Table Theme", display: "select", values: [{ "Modern": "modern" }, { "Compact": "compact" }, { "Striped": "striped" }], default: "modern", section: "Formatting", order: 11 },
    cell_font_size: { type: "number", label: "Cell Size (px)", default: 11, section: "Formatting", order: 20 },
    row_height: { type: "number", label: "Row Height (px)", default: 36, section: "Formatting", order: 21 },
    enable_hover: { type: "boolean", label: "Enable Hover Effects", default: true, section: "Formatting", order: 40 }
  },

  create: function(element, config) {
    element.innerHTML = `
      <style>
        #advanced-table-container { width: 100%; height: 100%; overflow: auto; font-family: sans-serif; }
        .pagination-controls { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: #fff; border-bottom: 1px solid #e5e7eb; font-size: 13px; }
        .pagination-button { padding: 4px 8px; border: 1px solid #d1d5db; background: #fff; cursor: pointer; border-radius: 4px; }
        .pagination-button:disabled { opacity: 0.3; cursor: not-allowed; }
        table.advanced-table { width: 100%; border-collapse: separate; border-spacing: 0; }
        table.advanced-table thead th { position: sticky; top: 0; z-index: 10; background: #f9fafb; border-bottom: 2px solid #ddd; padding: 8px 12px; }
        table.advanced-table tbody td { border: 1px solid #eee; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding: 0 12px; }
        .subtotal-toggle { cursor: pointer; margin-right: 8px; font-weight: bold; font-family: monospace; display: inline-block; width: 14px; }
        .subtotal-row { font-weight: 600; cursor: pointer; }
        .grand-total-row { background-color: #e8e8e8 !important; font-weight: 700; border-top: 3px solid #333 !important; }
        .data-chip { padding: 2px 10px; border-radius: 12px; font-size: 0.85em; font-weight: 600; display: inline-block; }
        .chip-green { background: #dcfce7; color: #166534; } .chip-red { background: #fee2e2; color: #991b1b; }
      </style>
      <div id="advanced-table-container"></div>
    `;
    this.container = element.querySelector("#advanced-table-container");
    this.state = { currentPage: 1, collapsedGroups: {}, lastSubtotalDimension: null };
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    this.clearErrors();
    console.log("[TABLE DEBUG] updateAsync Triggered", { rowCount: data.length, config });

    if (!queryResponse || !queryResponse.fields || !data || data.length === 0) {
        console.warn("[TABLE DEBUG] Missing data or fields. Early exit.");
        done(); return;
    }

    const dims = queryResponse.fields.dimension_like;
    const measures = queryResponse.fields.measure_like;

    // Dimension Dropdown sync
    if (dims.length > 0) {
      this.options.subtotal_dimension.values = [{"None": ""}, ...dims.map(d => ({[d.label_short || d.label]: d.name}))];
    }
    this.trigger('registerOptions', this.options);

    this.queryResponse = queryResponse;
    this.state.data = data;

    const currentKey = config.enable_bo_hierarchy ? config.hierarchy_dimensions : config.subtotal_dimension;
    if (currentKey && this.state.lastSubtotalDimension !== currentKey) {
        console.log("[TABLE DEBUG] Grouping changed. Resetting collapse state.");
        this.state.collapsedGroups = {};
        this.state.lastSubtotalDimension = currentKey;
        this.state.forceInitialCollapse = true;
    }

    let processedData = [...data];

    // Hierarchy Logic
    if (config.enable_bo_hierarchy && config.hierarchy_dimensions) {
      const hierarchyList = config.hierarchy_dimensions.split(',').map(f => f.trim());
      processedData = this.calculateSubtotalsRecursive(processedData, hierarchyList, measures);
      if (this.state.forceInitialCollapse) {
          processedData.forEach(row => { if (row.__isSubtotal) this.state.collapsedGroups[row.__groupValue] = true; });
          this.state.forceInitialCollapse = false;
      }
      processedData = this.applyHierarchyFilter(processedData);
    }
    // Standard Subtotal Logic
    else if (config.enable_subtotals && config.subtotal_dimension) {
      processedData = this.calculateStandardSubtotals(processedData, config.subtotal_dimension, measures, config);
      if (config.subtotal_position === 'top') {
          if (this.state.forceInitialCollapse) {
              processedData.forEach(row => { if (row.__isSubtotal) this.state.collapsedGroups[row.__groupValue] = true; });
              this.state.forceInitialCollapse = false;
          }
          processedData = processedData.filter(row => row.__isSubtotal ? true : !this.state.collapsedGroups[row.__parentGroup]);
      }
    }

    if (config.show_grand_total) {
        processedData.push(this.calculateGrandTotal(data, measures, config, dims));
    }

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
          sub[m.name] = { value: sum, rendered: sum.toLocaleString() };
        });

        result.push(sub);
        if (level < fields.length - 1) {
            groupData(groups[key], level + 1, currentPath);
        } else {
            groups[key].forEach(r => { r.__parentGroup = currentPath; r.__level = level + 1; result.push(r); });
        }
      });
    };
    groupData(data, 0, "");
    return result;
  },

  calculateStandardSubtotals: function(data, field, measures, config) {
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
          measures.forEach(m => {
              let sum = groups[key].reduce((acc, r) => acc + Number((r[m.name]?.value || r[m.name]) || 0), 0);
              sub[m.name] = { value: sum, rendered: sum.toLocaleString() };
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

  calculateGrandTotal: function(data, measures, config, dims) {
      const total = { __isGrandTotal: true };
      if (dims.length > 0) total[dims[0].name] = { value: config.grand_total_label, rendered: config.grand_total_label };
      measures.forEach(m => {
          let sum = data.reduce((acc, r) => acc + Number((r[m.name]?.value || r[m.name]) || 0), 0);
          total[m.name] = { value: sum, rendered: sum.toLocaleString() };
      });
      return total;
  },

  renderTable: function(processedData, config, queryResponse) {
    console.log("[TABLE DEBUG] Rendering Table with " + processedData.length + " rows.");
    const fields = queryResponse.fields.dimension_like.concat(queryResponse.fields.measure_like);
    const hDims = config.enable_bo_hierarchy ? (config.hierarchy_dimensions || "").split(',').map(f => f.trim()) : [];
    const mainTreeCol = hDims[0] || config.subtotal_dimension;

    let html = `<table class="advanced-table ${config.table_theme}" style="--cell-font-size:${config.cell_font_size}px; --row-height:${config.row_height}px;">`;

    // Headers
    html += "<thead><tr>";
    if (config.show_row_numbers) html += "<th>#</th>";
    fields.forEach((f, idx) => {
      if (config.enable_bo_hierarchy && hDims.includes(f.name) && f.name !== hDims[0]) return;
      const sticky = (idx < config.freeze_columns) ? 'position:sticky; left:0; z-index:11; background:#f9fafb;' : '';
      html += `<th style="${sticky}">${f.label_short || f.label}</th>`;
    });
    html += "</tr></thead><tbody>";

    // Body
    processedData.forEach((row, i) => {
      const isSub = !!row.__isSubtotal, isGT = !!row.__isGrandTotal;
      const level = row.__level || 0;
      const bg = isSub ? `background:${config.subtotal_background_color};` : (isGT ? '' : '');

      html += `<tr class="${isGT?'grand-total-row':(isSub?'subtotal-row':'detail-row')}" data-group="${row.__groupValue || ''}" style="${bg}">`;
      if (config.show_row_numbers) html += `<td>${(isSub||isGT)?'':i+1}</td>`;

      fields.forEach((f, idx) => {
        if (config.enable_bo_hierarchy && hDims.includes(f.name) && f.name !== hDims[0]) return;

        let val = row[f.name];
        let content = (val && typeof val === 'object') ? (val.rendered || val.value || '∅') : (val || '∅');
        let style = (idx < config.freeze_columns) ? 'position:sticky; left:0; z-index:1; background:inherit;' : '';

        // Data Chip logic
        if (config.enable_data_chips && (config.data_chip_fields || "").split(',').includes(f.name)) {
            const s = String(val?.value || val).toLowerCase();
            const isGreen = (config.chip_match_green || "").split(',').map(x=>x.trim().toLowerCase()).includes(s);
            if (isGreen) content = `<span class="data-chip chip-green">${content}</span>`;
        }

        if (f.name === mainTreeCol) {
          style += `padding-left: ${(level * 20) + 12}px;`;
          if (isSub) content = `<span class="subtotal-toggle">${this.state.collapsedGroups[row.__groupValue] ? '▶' : '▼'}</span>${content}`;
        }
        html += `<td style="${style}">${content}</td>`;
      });
      html += "</tr>";
    });

    html += "</tbody></table>";
    this.container.innerHTML = html;
    this.attachEventListeners(config);
  },

  attachEventListeners: function(config) {
    const self = this;

    // Delegation for Toggles
    this.container.onclick = (e) => {
        const row = e.target.closest('.subtotal-row');
        if (!row) return;

        const g = row.dataset.group;
        console.log("[TABLE DEBUG] Toggle Clicked for Group:", g);

        if (self.state.collapsedGroups[g]) {
            delete self.state.collapsedGroups[g];
        } else {
            self.state.collapsedGroups[g] = true;
        }

        // Re-trigger update logic with the current state
        self.updateAsync(self.state.data, self.container.parentElement, config, self.queryResponse, {}, () => {});
    };

    // Hover
    if (config.enable_hover) {
        this.container.querySelectorAll('tbody tr').forEach(tr => {
            tr.onmouseenter = () => tr.style.backgroundColor = '#f3f4f6';
            tr.onmouseleave = () => tr.style.backgroundColor = '';
        });
    }
  },
  trigger: function(event) {}
};

looker.plugins.visualizations.add(visObject);

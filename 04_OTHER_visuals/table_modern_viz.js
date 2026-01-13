/**
 * Advanced Table Visualization for Looker
 * Version: 4.12.4 - Full Restoration + Auto-Collapse & Pagination Fix
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

    // ══════════════════════════════════════════════════════════════
    // TAB: SERIES
    // ══════════════════════════════════════════════════════════════
    subtotals_divider: { type: "string", label: "────────────────────────── Subtotals & Totals ──────────────────────────", display: "divider", section: "Series", order: 73 },
    enable_subtotals: { type: "boolean", label: "Enable Subtotals", default: false, section: "Series", order: 74 },
    subtotal_dimension: { type: "string", label: "Group By Dimension", display: "select", values: [{"None": ""}], default: "", section: "Series", order: 75 },
    show_grand_total: { type: "boolean", label: "Show Grand Total Row", default: false, section: "Series", order: 76 },
    subtotal_label: { type: "string", label: "Subtotal Format", default: "{value}", section: "Series", order: 77 },
    subtotal_position: { type: "string", label: "Subtotal Position", display: "select", values: [{"Top (Collapsible)": "top"}, {"Bottom": "bottom"}], default: "bottom", section: "Series", order: 78 },
    subtotal_background_color: { type: "string", label: "BG Color", display: "color", default: "#f0f0f0", section: "Series", order: 79 },
    grand_total_label: { type: "string", label: "Grand Total Label", default: "Grand Total", section: "Series", order: 80 },

    // ══════════════════════════════════════════════════════════════
    // TAB: FORMATTING
    // ══════════════════════════════════════════════════════════════
    table_theme: { type: "string", label: "Theme", display: "select", values: [{ "Modern": "modern" }, { "Classic": "classic" }, { "Minimal": "minimal" }, { "Striped": "striped" }, { "Bordered": "bordered" }, { "Compact": "compact" }], default: "modern", section: "Formatting", order: 1 },
    stripe_color: { type: "string", label: "Stripe Color", display: "color", default: "#f9fafb", section: "Formatting", order: 2 },
    header_font_size: { type: "number", label: "Header Size", default: 12, section: "Formatting", order: 12 },
    header_bg_color: { type: "string", label: "Header BG", display: "color", default: "#f9fafb", section: "Formatting", order: 15 },
    cell_font_size: { type: "number", label: "Cell Size", default: 11, section: "Formatting", order: 22 },
    row_height: { type: "number", label: "Row Height", default: 36, section: "Formatting", order: 27 },
    column_spacing: { type: "number", label: "Col Spacing", default: 12, section: "Formatting", order: 36 },
    border_color: { type: "string", label: "Border Color", display: "color", default: "#e5e7eb", section: "Formatting", order: 34 }
  },

  create: function(element, config) {
    element.innerHTML = `
      <style>
        #advanced-table-container { width: 100%; height: 100%; overflow: auto; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; position: relative; }
        .pagination-controls { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: #fff; border-bottom: 1px solid #e5e7eb; }
        .table-wrapper { overflow: auto; position: relative; max-height: 100%; }
        table.advanced-table { width: 100%; border-collapse: separate; border-spacing: 0; background: #fff; }
        table.advanced-table tbody td {
          font-size: var(--cell-font-size, 11px); color: var(--cell-text-color, #374151); height: var(--row-height, 36px);
          padding: 0 var(--column-spacing, 12px); border: 1px solid var(--border-color, #e5e7eb);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        table.advanced-table thead { position: sticky; top: 0; z-index: 100; }
        table.advanced-table thead th { position: sticky; top: 0; background: inherit; border: 1px solid var(--border-color, #e5e7eb); padding: 8px 12px; }
        .subtotal-toggle { cursor: pointer; margin-right: 8px; font-weight: bold; display: inline-block; width: 14px; }
        .subtotal-trigger-cell { display: flex; align-items: center; white-space: nowrap !important; }
        .subtotal-row { font-weight: 600; cursor: pointer; }
        .grand-total-row { background-color: #e8e8e8 !important; font-weight: 700; border-top: 2px solid #333; }
        .row-number-cell { background: #f9fafb; text-align: center; color: #6b7280; width: 40px; border-right: 2px solid #e5e7eb !important; }
        .pagination-button { padding: 4px 8px; cursor: pointer; border: 1px solid #d1d5db; background: #fff; margin: 0 2px; }
        .pagination-button:disabled { opacity: 0.3; cursor: not-allowed; }
      </style>
      <div id="advanced-table-container"></div>
    `;
    this.container = element.querySelector("#advanced-table-container");
    this.state = { currentPage: 1, collapsedGroups: {}, lastSubtotalDimension: null };
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    this.clearErrors();
    // FIX: Add null check for queryResponse to prevent TypeError
    if (!queryResponse || !queryResponse.fields) { done(); return; }

    const dimensions = queryResponse.fields.dimension_like;
    if (dimensions.length > 0) {
      const dimensionValues = [{"None": ""}];
      dimensions.forEach(dim => dimensionValues.push({[dim.label_short || dim.label]: dim.name}));
      this.options.subtotal_dimension.values = dimensionValues;
    }
    this.trigger('registerOptions', this.options);

    // FIX: Auto-collapse on dimension change
    if (config.enable_subtotals && config.subtotal_dimension) {
      if (this.state.lastSubtotalDimension !== config.subtotal_dimension) {
        this.state.collapsedGroups = {};
        this.state.lastSubtotalDimension = config.subtotal_dimension;
        this.state.needsInitialCollapse = true;
      }
    }

    let processedData = [...data];
    const measures = queryResponse.fields.measure_like;

    if (config.enable_subtotals && config.subtotal_dimension) {
      processedData = this.calculateSubtotals(processedData, config.subtotal_dimension, measures, config, dimensions);

      if (this.state.needsInitialCollapse) {
        processedData.forEach(row => { if (row.__isSubtotal) this.state.collapsedGroups[row.__groupValue] = true; });
        this.state.needsInitialCollapse = false;
      }

      if (config.subtotal_position === 'top') {
        processedData = processedData.filter(row => {
          if (row.__isSubtotal) { row.__isCollapsed = this.state.collapsedGroups[row.__groupValue]; return true; }
          return !this.state.collapsedGroups[row.__parentGroup];
        });
      }
    }

    if (config.show_grand_total) {
      processedData.push(this.calculateGrandTotal(processedData, measures, config, dimensions));
    }

    // FIX: Pagination recalcs
    const totalPages = Math.max(1, Math.ceil(processedData.length / config.page_size));
    if (this.state.currentPage > totalPages) this.state.currentPage = totalPages;

    const startIdx = (this.state.currentPage - 1) * config.page_size;
    const pageData = config.enable_pagination ? processedData.slice(startIdx, startIdx + config.page_size) : processedData;

    this.renderTable(pageData, processedData.length, totalPages, config, queryResponse);
    done();
  },

  calculateSubtotals: function(data, groupByField, measures, config, dimensions) {
    const result = [], groups = {};
    data.forEach(row => {
      let val = row[groupByField];
      let key = (val && typeof val === 'object') ? (val.value || val.rendered || 'null') : (val || 'null');
      if (!groups[key]) groups[key] = [];
      groups[key].push(row);
    });

    Object.keys(groups).forEach(key => {
      const subRow = { __isSubtotal: true, __groupValue: key };
      const label = config.subtotal_label.replace('{value}', key === 'null' ? '∅' : key);
      subRow[groupByField] = { value: label, rendered: label };
      dimensions.forEach(d => { if(d.name !== groupByField) subRow[d.name] = { value: '', rendered: '' }; });

      measures.forEach(m => {
        let sum = 0;
        groups[key].forEach(r => {
          let v = r[m.name];
          sum += Number((v && typeof v === 'object' ? v.value : v) || 0);
        });
        subRow[m.name] = { value: sum, rendered: sum.toLocaleString(undefined, {minimumFractionDigits: 2}) };
      });

      if (config.subtotal_position === 'top') {
        result.push(subRow);
        groups[key].forEach(r => { r.__parentGroup = key; result.push(r); });
      } else {
        groups[key].forEach(r => result.push(r));
        result.push(subRow);
      }
    });
    return result;
  },

  calculateGrandTotal: function(data, measures, config, dimensions) {
    const totalRow = { __isGrandTotal: true };
    if (dimensions.length > 0) totalRow[dimensions[0].name] = { value: config.grand_total_label, rendered: config.grand_total_label };
    measures.forEach(m => {
      let sum = 0;
      data.forEach(r => { if(!r.__isSubtotal) { let v = r[m.name]; sum += Number((v && typeof v === 'object' ? v.value : v) || 0); }});
      totalRow[m.name] = { value: sum, rendered: sum.toLocaleString(undefined, {minimumFractionDigits: 2}) };
    });
    return totalRow;
  },

  renderTable: function(pageData, totalRows, totalPages, config, queryResponse) {
    const fields = queryResponse.fields.dimension_like.concat(queryResponse.fields.measure_like);

    // Pagination Controls
    let html = `<div class="pagination-controls"><span>Total Rows: ${totalRows}</span><div>`;
    html += `<button class="pagination-button" data-action="first" ${this.state.currentPage === 1 ? 'disabled':''}>«</button>`;
    html += `<button class="pagination-button" data-action="prev" ${this.state.currentPage === 1 ? 'disabled':''}>‹</button>`;
    html += `<span style="margin: 0 10px;">Page ${this.state.currentPage} of ${totalPages}</span>`;
    html += `<button class="pagination-button" data-action="next" ${this.state.currentPage === totalPages ? 'disabled':''}>›</button>`;
    html += `<button class="pagination-button" data-action="last" ${this.state.currentPage === totalPages ? 'disabled':''}>»</button>`;
    html += `</div></div>`;

    // Modern Table Styling
    html += `<div class="table-wrapper"><table class="advanced-table ${config.table_theme}" style="--cell-font-size:${config.cell_font_size}px; --row-height:${config.row_height}px; --column-spacing:${config.column_spacing}px; --border-color:${config.border_color}; --stripe-color:${config.stripe_color};">`;
    html += `<thead><tr style="background:${config.header_bg_color}; font-size:${config.header_font_size}px;">${config.show_row_numbers ? '<th class="row-number-cell">#</th>':''}${fields.map(f => `<th>${f.label_short || f.label}</th>`).join('')}</tr></thead><tbody>`;

    pageData.forEach((row, i) => {
      const isSub = row.__isSubtotal, isGrand = row.__isGrandTotal;
      const rowStyle = isSub ? `style="background:${config.subtotal_background_color}"` : '';
      html += `<tr class="${isSub?'subtotal-row':''} ${isGrand?'grand-total-row':''}" data-group="${row.__groupValue || ''}" ${rowStyle}>`;

      if (config.show_row_numbers) {
        html += `<td class="row-number-cell">${(isSub||isGrand) ? '' : (this.state.currentPage - 1) * config.page_size + i + 1}</td>`;
      }

      fields.forEach((f, colIdx) => {
        let content = this.renderCellContent(row[f.name], f, config);
        if (isSub && config.subtotal_position === 'top' && colIdx === 0) {
          content = `<span class="subtotal-toggle">${row.__isCollapsed ? '▶' : '▼'}</span>${content}`;
        }
        html += `<td class="${isSub && colIdx === 0 ? 'subtotal-trigger-cell' : ''}">${content}</td>`;
      });
      html += '</tr>';
    });
    this.container.innerHTML = html + '</tbody></table></div>';
    this.attachListeners(config, totalPages);
  },

  renderCellContent: function(cell, field, config) {
    if (cell === null || cell === undefined) return '∅';
    if (typeof cell !== 'object') return cell;
    return cell.rendered || cell.value || '∅';
  },

  attachListeners: function(config, totalPages) {
    const self = this;

    // Subtotal Toggle Click
    this.container.querySelectorAll('.subtotal-row').forEach(row => {
      row.onclick = () => {
        const group = row.dataset.group;
        if (self.state.collapsedGroups[group]) delete self.state.collapsedGroups[group];
        else self.state.collapsedGroups[group] = true;
        // Re-run the data processing to update filtering and pagination
        self.updateAsync(self.state.data, null, config, self.queryResponse, {}, () => {});
      };
    });

    // Pagination Click
    this.container.querySelectorAll('.pagination-button').forEach(btn => {
      btn.onclick = () => {
        const action = btn.dataset.action;
        if (action === 'next') self.state.currentPage++;
        if (action === 'prev') self.state.currentPage--;
        if (action === 'first') self.state.currentPage = 1;
        if (action === 'last') self.state.currentPage = totalPages;
        self.updateAsync(self.state.data, null, config, self.queryResponse, {}, () => {});
      };
    });
  },
  trigger: function(event) {}
};

looker.plugins.visualizations.add(visObject);

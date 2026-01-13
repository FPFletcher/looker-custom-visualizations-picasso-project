/**
 * Advanced Table Visualization for Looker
 * Version: 4.12.6 - NaN Fix + Persistent Element Restoration
 * Build: 2026-01-13
 */

const visObject = {
  id: "advanced_table_visual",
  label: "Advanced Table",
  options: {
    plot_divider_display: { type: "string", label: "──────────────── Display Options ────────────────", display: "divider", section: "Plot", order: 0 },
    show_row_numbers: { type: "boolean", label: "Show Row Numbers", default: false, section: "Plot", order: 1 },
    show_headers: { type: "boolean", label: "Show Headers", default: true, section: "Plot", order: 2 },
    enable_pagination: { type: "boolean", label: "Enable Pagination", default: true, section: "Plot", order: 11 },
    page_size: { type: "number", label: "Page Size", default: 25, display: "number", min: 5, max: 1000, section: "Plot", order: 12 },
    subtotals_divider: { type: "string", label: "──────────────── Subtotals & Totals ────────────────", display: "divider", section: "Series", order: 73 },
    enable_subtotals: { type: "boolean", label: "Enable Subtotals", default: false, section: "Series", order: 74 },
    subtotal_dimension: { type: "string", label: "Group By Dimension", display: "select", values: [{"None": ""}], default: "", section: "Series", order: 75 },
    subtotal_label: { type: "string", label: "Subtotal Format", default: "{value}", section: "Series", order: 77 },
    subtotal_position: { type: "string", label: "Subtotal Position", display: "select", values: [{"Top (Collapsible)": "top"}, {"Bottom": "bottom"}], default: "bottom", section: "Series", order: 78 },
    subtotal_background_color: { type: "string", label: "BG Color", display: "color", default: "#f0f0f0", section: "Series", order: 79 },
    show_grand_total: { type: "boolean", label: "Show Grand Total Row", default: false, section: "Series", order: 76 },
    table_theme: { type: "string", label: "Theme", display: "select", values: [{ "Modern": "modern" }, { "Striped": "striped" }], default: "modern", section: "Formatting", order: 1 },
    header_font_size: { type: "number", label: "Header Size", default: 12, section: "Formatting", order: 12 },
    cell_font_size: { type: "number", label: "Cell Size", default: 11, section: "Formatting", order: 22 },
    row_height: { type: "number", label: "Row Height", default: 36, section: "Formatting", order: 27 },
    column_spacing: { type: "number", label: "Col Spacing", default: 12, section: "Formatting", order: 36 }
  },

  create: function(element, config) {
    element.innerHTML = `
      <style>
        #advanced-table-container { width: 100%; height: 100%; overflow: auto; font-family: sans-serif; position: relative; }
        .pagination-controls { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: #fff; border-bottom: 1px solid #e5e7eb; font-size: 13px; }
        .table-wrapper { overflow: auto; position: relative; max-height: 100%; }
        table.advanced-table { width: 100%; border-collapse: separate; border-spacing: 0; background: #fff; }
        table.advanced-table tbody td { font-size: var(--cell-font-size, 11px); height: var(--row-height, 36px); padding: 0 var(--column-spacing, 12px); border: 1px solid #eee; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .subtotal-toggle { cursor: pointer; margin-right: 8px; font-weight: bold; width: 14px; display: inline-block; text-align: center; }
        .subtotal-trigger-cell { display: flex; align-items: center; white-space: nowrap !important; }
        .subtotal-row { font-weight: 600; cursor: pointer; }
        .grand-total-row { background-color: #e8e8e8 !important; font-weight: 700; border-top: 2px solid #333; }
        .p-btn { padding: 4px 8px; cursor: pointer; border: 1px solid #d1d5db; background: #fff; margin: 0 2px; }
        .p-btn:disabled { opacity: 0.3; cursor: not-allowed; }
      </style>
      <div id="advanced-table-container"></div>
    `;
    this.container = element.querySelector("#advanced-table-container");
    this.targetElement = element; // Save element for re-renders
    this.state = { currentPage: 1, collapsedGroups: {}, lastSubtotalDimension: null };
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    console.log('[LOG] --- Update Start ---');
    if (!queryResponse || !queryResponse.fields) { done(); return; }

    // Update dimension options
    const dimensions = queryResponse.fields.dimension_like;
    if (dimensions.length > 0) {
      const dimensionValues = [{"None": ""}];
      dimensions.forEach(dim => dimensionValues.push({[dim.label_short || dim.label]: dim.name}));
      this.options.subtotal_dimension.values = dimensionValues;
    }
    this.trigger('registerOptions', this.options);

    // Auto-Collapse reset
    const currentDim = config.subtotal_dimension;
    if (config.enable_subtotals && currentDim && this.state.lastSubtotalDimension !== currentDim) {
        console.log('[STATE LOG] Dimension Changed. Resetting to collapsed.');
        this.state.collapsedGroups = {};
        this.state.lastSubtotalDimension = currentDim;
        this.state.forceCollapse = true;
        this.state.currentPage = 1;
    }

    let processedData = [...data];
    const measures = queryResponse.fields.measure_like;

    if (config.enable_subtotals && currentDim) {
      processedData = this.calculateSubtotals(processedData, currentDim, measures, config, dimensions);
      if (this.state.forceCollapse) {
        processedData.forEach(row => { if (row.__isSubtotal) this.state.collapsedGroups[row.__groupValue] = true; });
        this.state.forceCollapse = false;
      }
      if (config.subtotal_position === 'top') {
        processedData = processedData.filter(row => {
          if (row.__isSubtotal) { row.__isCollapsed = this.state.collapsedGroups[row.__groupValue]; return true; }
          return !this.state.collapsedGroups[row.__parentGroup];
        });
      }
    }

    if (config.show_grand_total) processedData.push(this.calculateGrandTotal(processedData, measures, config, dimensions));

    // Fix NaN: Ensure page_size is at least 1
    const pSize = parseInt(config.page_size) || 25;
    const totalPages = Math.max(1, Math.ceil(processedData.length / pSize));
    if (this.state.currentPage > totalPages) this.state.currentPage = totalPages;

    const startIdx = (this.state.currentPage - 1) * pSize;
    const pageData = config.enable_pagination ? processedData.slice(startIdx, startIdx + pSize) : processedData;

    console.log(`[DATA LOG] Visible: ${processedData.length}, Pages: ${totalPages}, Current: ${this.state.currentPage}`);

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
      const sub = { __isSubtotal: true, __groupValue: key };
      const lbl = config.subtotal_label.replace('{value}', key === 'null' ? '∅' : key);
      sub[groupByField] = { value: lbl, rendered: lbl };
      dimensions.forEach(d => { if(d.name !== groupByField) sub[d.name] = { value: '', rendered: '' }; });
      measures.forEach(m => {
        let sum = 0;
        groups[key].forEach(r => { let v = r[m.name]; sum += Number((v && typeof v === 'object' ? v.value : v) || 0); });
        sub[m.name] = { value: sum, rendered: sum.toLocaleString(undefined, {minimumFractionDigits: 2}) };
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

  calculateGrandTotal: function(data, measures, config, dimensions) {
    const total = { __isGrandTotal: true };
    if (dimensions.length > 0) total[dimensions[0].name] = { value: config.grand_total_label, rendered: config.grand_total_label };
    measures.forEach(m => {
      let sum = 0;
      data.forEach(r => { if(!r.__isSubtotal) { let v = r[m.name]; sum += Number((v && typeof v === 'object' ? v.value : v) || 0); }});
      total[m.name] = { value: sum, rendered: sum.toLocaleString(undefined, {minimumFractionDigits: 2}) };
    });
    return total;
  },

  renderTable: function(pageData, totalRows, totalPages, config, queryResponse) {
    const fields = queryResponse.fields.dimension_like.concat(queryResponse.fields.measure_like);
    let html = `<div class="pagination-controls"><span>Rows: ${totalRows}</span><div>
      <button class="p-btn" data-action="first" ${this.state.currentPage===1?'disabled':''}>«</button>
      <button class="p-btn" data-action="prev" ${this.state.currentPage===1?'disabled':''}>‹</button>
      <span style="margin:0 10px;">Page ${this.state.currentPage} of ${totalPages}</span>
      <button class="p-btn" data-action="next" ${this.state.currentPage===totalPages?'disabled':''}>›</button>
      <button class="p-btn" data-action="last" ${this.state.currentPage===totalPages?'disabled':''}>»</button>
    </div></div>`;

    html += `<div class="table-wrapper"><table class="advanced-table ${config.table_theme}" style="--cell-font-size:${config.cell_font_size}px; --row-height:${config.row_height}px; --column-spacing:${config.column_spacing}px;">
      <thead><tr>${config.show_row_numbers ? '<th>#</th>':''}${fields.map(f => `<th>${f.label_short || f.label}</th>`).join('')}</tr></thead><tbody>`;

    pageData.forEach((row, i) => {
      const isSub = !!row.__isSubtotal, isGrand = !!row.__isGrandTotal;
      html += `<tr class="${isSub?'subtotal-row':''} ${isGrand?'grand-total-row':''}" data-group="${row.__groupValue || ''}" style="${isSub?`background:${config.subtotal_background_color}`:''}">`;
      if (config.show_row_numbers) html += `<td>${(isSub||isGrand)?'':(this.state.currentPage-1)*config.page_size+i+1}</td>`;
      fields.forEach((f, idx) => {
        let content = (row[f.name] && typeof row[f.name] === 'object') ? (row[f.name].rendered || row[f.name].value || '∅') : (row[f.name] || '∅');
        if (isSub && config.subtotal_position === 'top' && idx === 0) content = `<span class="subtotal-toggle">${row.__isCollapsed ? '▶' : '▼'}</span>${content}`;
        html += `<td class="${isSub && idx === 0 ? 'subtotal-trigger-cell' : ''}">${content}</td>`;
      });
      html += '</tr>';
    });
    this.container.innerHTML = html + '</tbody></table></div>';
    this.attachListeners(config, totalPages);
  },

  attachListeners: function(config, totalPages) {
    const self = this;
    this.container.querySelectorAll('.subtotal-row').forEach(row => {
      row.onclick = () => {
        const g = row.dataset.group;
        if (self.state.collapsedGroups[g]) delete self.state.collapsedGroups[g];
        else self.state.collapsedGroups[g] = true;
        self.updateAsync(self.state.data, self.targetElement, config, self.queryResponse, {}, () => {});
      };
    });
    this.container.querySelectorAll('.p-btn').forEach(btn => {
      btn.onclick = () => {
        const act = btn.dataset.action;
        if (act === 'next' && self.state.currentPage < totalPages) self.state.currentPage++;
        else if (act === 'prev' && self.state.currentPage > 1) self.state.currentPage--;
        else if (act === 'first') self.state.currentPage = 1;
        else if (act === 'last') self.state.currentPage = totalPages;
        self.updateAsync(self.state.data, self.targetElement, config, self.queryResponse, {}, () => {});
      };
    });
  },
  trigger: function(event) {}
};

looker.plugins.visualizations.add(visObject);

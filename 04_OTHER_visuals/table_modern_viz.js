/**
 * Advanced Table Visualization for Looker
 * Version: 4.30.0 - FIX: Force Custom Formatting on All Rows
 * Build: 2026-01-17
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
    dynamic_pagination: { type: "boolean", label: "Dynamic Pagination", default: true, section: "Plot", order: 14 },
    plot_divider_filtering: { type: "string", label: "━━━ Filtering ━━━", display: "divider", section: "Plot", order: 15 },
    enable_table_filter: { type: "boolean", label: "Enable Table-Level Filter", default: false, section: "Plot", order: 16 },
    enable_column_filters: { type: "boolean", label: "Enable Column Filters", default: false, section: "Plot", order: 17 },
    plot_divider_freezing: { type: "string", label: "━━━ Freezing ━━━", display: "divider", section: "Plot", order: 20 },
    freeze_columns: { type: "number", label: "Freeze Left Columns", default: 0, section: "Plot", order: 21 },
    freeze_header_row: { type: "boolean", label: "Freeze Header Row", default: true, section: "Plot", order: 22 },

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
    group_remaining_columns: { type: "boolean", label: "Group Remaining Columns", default: false, section: "Series", order: 26 },
    remaining_columns_name: { type: "string", label: "Remaining Name", default: "Other", section: "Series", order: 27 },
    group_header_bg_color: { type: "string", label: "Group Header BG Color", display: "color", default: "#8dc6ff", section: "Series", order: 28 },

    subtotals_divider: { type: "string", label: "━━━ Subtotals & Totals ━━━", display: "divider", section: "Series", order: 80 },
    enable_subtotals: { type: "boolean", label: "Enable Subtotals", default: false, section: "Series", order: 81 },
    subtotal_dimension: { type: "string", label: "Group Dimension", display: "select", values: [{ "None": "" }], default: "", section: "Series", order: 82 },
    standard_subtotal_bold: { type: "boolean", label: "Bold Font for Subtotals", default: true, section: "Series", order: 83 },
    show_grand_total: { type: "boolean", label: "Show Grand Total Row", default: false, section: "Series", order: 84 },
    subtotal_background_color: { type: "string", label: "Subtotal BG Color", display: "color", default: "#f0f0f0", section: "Series", order: 86 },
    grand_total_label: { type: "string", label: "Grand Total Label", default: "Grand Total", section: "Series", order: 87 },

    field_formatting_divider: { type: "string", label: "━━━ Field Formatting ━━━", display: "divider", section: "Series", order: 100 },
    enable_custom_field_formatting: { type: "boolean", label: "Enable Custom Field Formatting", default: true, section: "Series", order: 101 },

    data_chips_divider: { type: "string", label: "━━━ Data Chips ━━━", display: "divider", section: "Series", order: 250 },
    enable_data_chips: { type: "boolean", label: "Enable Data Chips", default: false, section: "Series", order: 251 },
    data_chip_fields: { type: "string", label: "Chip Fields (comma-sep)", display: "text", default: "", section: "Series", order: 252 },
    chip_match_green: { type: "string", label: "Green Match (comma-sep)", display: "text", default: "active,completed,yes", section: "Series", order: 253 },
    chip_match_yellow: { type: "string", label: "Yellow Match (comma-sep)", display: "text", default: "pending,warning", section: "Series", order: 254 },
    chip_match_red: { type: "string", label: "Red Match (comma-sep)", display: "text", default: "inactive,error,no", section: "Series", order: 255 },
    chip_default_color: { type: "string", label: "Default Chip Color", display: "color", default: "#e5e7eb", section: "Series", order: 256 },

    // ══════════════════════════════════════════════════════════════
    // TAB: FORMATTING
    // ══════════════════════════════════════════════════════════════
    formatting_divider_theme: { type: "string", label: "━━━ Theme ━━━", display: "divider", section: "Formatting", order: 0 },
    table_theme: { type: "string", label: "Table Theme", display: "select", values: [{ "Modern": "modern" }, { "Compact": "compact" }, { "Striped": "striped" }], default: "modern", section: "Formatting", order: 1 },
    stripe_color: { type: "string", label: "Stripe color", display: "color", default: "#f9fafb", section: "Formatting", order: 2 },
    header_font_size: { type: "number", label: "Header Font Size (px)", default: 12, section: "Formatting", order: 11 },
    header_text_color: { type: "string", label: "Header Text Color", display: "color", default: "#1f2937", section: "Formatting", order: 12 },
    header_bg_color: { type: "string", label: "Header Background Color", display: "color", default: "#f9fafb", section: "Formatting", order: 13 },
    cell_font_size: { type: "number", label: "Cell Size (px)", default: 11, section: "Formatting", order: 21 },
    cell_text_color: { type: "string", label: "Cell Text Color", display: "color", default: "#374151", section: "Formatting", order: 22 },
    row_height: { type: "number", label: "Row Height (px)", default: 36, section: "Formatting", order: 23 },
    column_spacing: { type: "number", label: "Col Spacing (px)", default: 12, section: "Formatting", order: 24 },
    border_color: { type: "string", label: "Border Color", display: "color", default: "#e5e7eb", section: "Formatting", order: 32 },
    enable_hover: { type: "boolean", label: "Enable Hover", default: true, section: "Formatting", order: 41 },
    hover_bg_color: { type: "string", label: "Hover Color", display: "color", default: "#f3f4f6", section: "Formatting", order: 42 },

    formatting_divider_row_formatting: { type: "string", label: "━━━ Row Conditional Formatting ━━━", display: "divider", section: "Formatting", order: 50 },
    enable_row_conditional_formatting: { type: "boolean", label: "Enable Row Formatting", default: false, section: "Formatting", order: 51 },
    row_conditional_field: { type: "string", label: "Trigger Fields (comma-sep)", display: "text", default: "", section: "Formatting", order: 52 },
    row_rule_1_operator: { type: "string", label: "Row Rule 1 Operator", display: "select", values: [{ "None": "" }, { ">": ">" }, { ">=": ">=" }, { "<": "<" }, { "<=": "<=" }, { "=": "=" }, { "≠": "!=" }, { "Contains": "contains" }], default: "", section: "Formatting", order: 53 },
    row_rule_1_value: { type: "string", label: "Row Rule 1 Value", display: "text", default: "", section: "Formatting", order: 54 },
    row_rule_1_bg: { type: "string", label: "Row Rule 1 BG", display: "color", default: "#dcfce7", section: "Formatting", order: 55 },
    row_rule_2_operator: { type: "string", label: "Row Rule 2 Operator", display: "select", values: [{ "None": "" }, { ">": ">" }, { ">=": ">=" }, { "<": "<" }, { "<=": "<=" }, { "=": "=" }, { "≠": "!=" }, { "Contains": "contains" }], default: "", section: "Formatting", order: 56 },
    row_rule_2_value: { type: "string", label: "Row Rule 2 Value", display: "text", default: "", section: "Formatting", order: 57 },
    row_rule_2_bg: { type: "string", label: "Row Rule 2 BG", display: "color", default: "#fee2e2", section: "Formatting", order: 58 },

    formatting_divider_col_formatting: { type: "string", label: "━━━ Column Conditional Formatting ━━━", display: "divider", section: "Formatting", order: 60 },
    enable_conditional_formatting: { type: "boolean", label: "Enable Column Formatting", default: false, section: "Formatting", order: 61 },
    conditional_field: { type: "string", label: "Target Fields (comma-sep)", display: "text", default: "", section: "Formatting", order: 62 },
    conditional_rule_1_operator: { type: "string", label: "Rule 1 Operator", display: "select", values: [{ "None": "" }, { ">": ">" }, { ">=": ">=" }, { "<": "<" }, { "<=": "<=" }, { "=": "=" }, { "≠": "!=" }], default: "", section: "Formatting", order: 63 },
    conditional_rule_1_value: { type: "number", label: "Rule 1 Value", default: 0, section: "Formatting", order: 64 },
    conditional_rule_1_bg: { type: "string", label: "Rule 1 BG Color", display: "color", default: "#dcfce7", section: "Formatting", order: 65 },
    conditional_rule_1_text: { type: "string", label: "Rule 1 Text Color", display: "color", default: "#166534", section: "Formatting", order: 66 },
    conditional_rule_2_operator: { type: "string", label: "Rule 2 Operator", display: "select", values: [{ "None": "" }, { ">": ">" }, { ">=": ">=" }, { "<": "<" }, { "<=": "<=" }, { "=": "=" }, { "≠": "!=" }], default: "", section: "Formatting", order: 67 },
    conditional_rule_2_value: { type: "number", label: "Rule 2 Value", default: 0, section: "Formatting", order: 68 },
    conditional_rule_2_bg: { type: "string", label: "Rule 2 BG Color", display: "color", default: "#fee2e2", section: "Formatting", order: 69 },
    conditional_rule_2_text: { type: "string", label: "Rule 2 Text Color", display: "color", default: "#991b1b", section: "Formatting", order: 70 }
  },

  create: function (element, config) {
    this.container = element.appendChild(document.createElement("div"));
    this.container.id = "advanced-table-container";
    this.state = { currentPage: 1, sortField: null, sortDirection: 'asc', collapsedGroups: {}, lastSubtotalDimension: null, data: [] };
  },

  updateAsync: function (data, element, config, queryResponse, details, done) {
    this.clearErrors();
    if (!queryResponse || !queryResponse.fields || !data || data.length === 0) { done(); return; }

    const dims = queryResponse.fields.dimension_like;
    const measures = queryResponse.fields.measure_like;

    if (dims.length > 0) {
      this.options.subtotal_dimension.values = [{ "None": "" }, ...dims.map(d => ({ [d.label_short || d.label]: d.name }))];
    }
    dims.concat(measures).forEach((field, idx) => {
      const baseOrder = 110 + (idx * 3);
      const fieldKey = field.name;
      if (!this.options[`field_label_${fieldKey}`]) {
        this.options[`field_divider_${fieldKey}`] = { type: "string", label: `━━━ ${field.label_short || field.label} ━━━`, display: "divider", section: "Series", order: baseOrder };
        this.options[`field_label_${fieldKey}`] = { type: "string", label: "Label", display: "text", default: field.label_short || field.label, section: "Series", order: baseOrder + 1 };
        this.options[`field_format_${fieldKey}`] = { type: "string", label: "Value Format", display: "text", default: "", section: "Series", order: baseOrder + 2 };
      }
    });

    this.trigger('registerOptions', this.options);
    this.state.data = data;
    this.queryResponse = queryResponse;

    let processedData = [...data];
    if (this.state.sortField) processedData = this.sortData(processedData, this.state.sortField, this.state.sortDirection);

    if (config.enable_bo_hierarchy && config.hierarchy_dimensions) {
      const hList = config.hierarchy_dimensions.split(',').map(f => f.trim());
      processedData = this.calculateSubtotalsRecursive(processedData, hList, measures, config);
      processedData = this.applyHierarchyFilter(processedData);
    } else if (config.enable_subtotals && config.subtotal_dimension) {
      processedData = this.calculateStandardSubtotals(processedData, config.subtotal_dimension, measures, config, dims);
    }

    if (config.show_grand_total) processedData.push(this.calculateGrandTotal(data, measures, config, dims));

    this.renderTable(processedData, config, queryResponse);
    done();
  },

  calculateStandardSubtotals: function (data, field, measures, config, dims) {
    const result = [];
    const groups = {};
    data.forEach(row => {
      let key = (row[field] && typeof row[field] === 'object') ? (row[field].value || 'null') : (row[field] || 'null');
      if (!groups[key]) groups[key] = [];
      groups[key].push(row);
    });
    Object.keys(groups).forEach(key => {
      groups[key].forEach(r => { r.__level = 1; result.push(r); });
      const sub = { __isSubtotal: true, __level: 0 };
      sub[field] = { value: key, rendered: key };
      measures.forEach(m => {
        let sum = groups[key].reduce((acc, r) => acc + Number(r[m.name]?.value || 0), 0);
        sub[m.name] = { value: sum, rendered: this.formatMeasure(sum, m, config) };
      });
      result.push(sub);
    });
    return result;
  },

  calculateSubtotalsRecursive: function (data, fields, measures, config) {
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
          sub[m.name] = { value: sum, rendered: this.formatMeasure(sum, m, config) };
        });
        result.push(sub);
        if (level < fields.length - 1) { groupData(groups[key], level + 1, currentPath); }
        else { groups[key].forEach(r => { r.__parentGroup = currentPath; r.__parentPath = currentPath; r.__level = level + 1; result.push(r); }); }
      });
    };
    groupData(data, 0, "");
    return result;
  },

  formatMeasure: function (value, field, config) {
    const customFormat = config[`field_format_${field.name}`];
    if (customFormat && config.enable_custom_field_formatting) {
      const res = this.applyCustomFormat(value, customFormat);
      console.log(`[FORMAT-FORCE] ${field.name}: ${value} -> ${res} (Custom)`);
      return res;
    }
    if (field.value_format) {
      const res = this.applyCustomFormat(value, field.value_format);
      console.log(`[FORMAT-LOOKML] ${field.name}: ${value} -> ${res} (LookML)`);
      return res;
    }
    return (typeof value === 'number') ? value.toLocaleString('en-US') : String(value);
  },

  applyCustomFormat: function (value, formatString) {
    if (!formatString || value === null || value === undefined) return String(value);
    const num = parseFloat(value);
    if (isNaN(num)) return String(value);

    const isKMB = formatString.toLowerCase().includes('k') || formatString.toLowerCase().includes('m');
    const decimalMatch = formatString.match(/\.([0#]+)/);
    const decimals = decimalMatch ? decimalMatch[1].length : (isKMB ? 1 : 0);

    let formatted = num;
    let suffix = "";

    // FORCE SCALING: If format has 'k', always scale by 1000 to match LookML behavior
    if (formatString.toLowerCase().includes('k')) {
      formatted = num / 1000;
      suffix = " k";
    }

    let result = formatted.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    if (formatString.includes('$')) result = '$' + result;
    return result + suffix;
  },

  renderTable: function (processedData, config, queryResponse) {
    const fields = queryResponse.fields.dimension_like.concat(queryResponse.fields.measure_like);
    const hDims = (config.hierarchy_dimensions || "").split(',').map(f => f.trim());
    const mainTreeCol = hDims[0] || config.subtotal_dimension;

    let html = `<style>
        table.advanced-table tbody td { font-size:${config.cell_font_size}px; height:${config.row_height}px; padding:0 ${config.column_spacing}px; border-bottom:1px solid ${config.border_color}; border-right:1px solid ${config.border_color}; color:${config.cell_text_color}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        table.advanced-table thead th { font-size:${config.header_font_size}px; color:${config.header_text_color}; background:${config.header_bg_color} !important; border-bottom:2px solid ${config.border_color}; border-right:1px solid ${config.border_color}; padding:8px 12px; }
        .data-chip { padding: 2px 10px; border-radius: 12px; font-size: 0.85em; font-weight: 600; display: inline-block; text-align: center; min-width: 60px; }
        .chip-green { background-color: #dcfce7; color: #166534; } .chip-yellow { background-color: #fef9c3; color: #854d0e; } .chip-red { background-color: #fee2e2; color: #991b1b; }
        .cell-bar-container { display: flex; align-items: center; gap: 8px; width: 100%; }
        .cell-bar-bg { flex: 1; height: 16px; background: #f3f4f6; border-radius: 2px; overflow: hidden; position: relative; }
        .cell-bar-fill { height: 100%; transition: width 0.3s ease; }
        table.advanced-table { width: 100%; border-collapse: separate; border-spacing: 0; background: #fff; }
        table.advanced-table thead { position: sticky; top: 0; z-index: 100; }
        .column-group-header { text-align: center; font-weight: 600; padding: 8px; border-bottom: 2px solid ${config.border_color}; }
    </style>`;

    html += `<table class="advanced-table ${config.table_theme}">`;
    if (config.enable_column_groups) html += this.renderColumnGroups(config, fields);

    html += '<thead><tr>';
    if (config.show_row_numbers) html += `<th>#</th>`;
    fields.forEach((f) => {
      if (config.enable_bo_hierarchy && hDims.includes(f.name) && f.name !== hDims[0]) return;
      html += `<th class="sortable" data-field="${f.name}" style="cursor:pointer;">${config[`field_label_${f.name}`] || f.label_short || f.label}</th>`;
    });
    html += '</tr></thead><tbody>';

    processedData.forEach((row, i) => {
      const isSub = !!row.__isSubtotal, isGT = !!row.__isGrandTotal;
      let rowBg = '';
      if (config.enable_row_conditional_formatting && config.row_conditional_field && !isGT) {
        const triggers = config.row_conditional_field.split(',').map(f => f.trim());
        for (let t of triggers) {
          const val = row[t]?.value || row[t];
          const bg = this.evaluateConditionalRule(val, config, 'row_rule_1', 'bg') || this.evaluateConditionalRule(val, config, 'row_rule_2', 'bg');
          if (bg) { rowBg = bg; break; }
        }
      }
      if (isSub && !rowBg) rowBg = config.subtotal_background_color;

      const bgStyle = rowBg ? `background-color:${rowBg};` : '';
      html += `<tr class="table-row" style="${bgStyle}" data-orig-bg="${rowBg || ''}">`;
      if (config.show_row_numbers) html += `<td>${i + 1}</td>`;

      fields.forEach((f) => {
        if (config.enable_bo_hierarchy && hDims.includes(f.name) && f.name !== hDims[0]) return;
        let cellStyle = (f.name === mainTreeCol) ? `padding-left: ${(row.__level * 20) + 12}px;` : '';

        const targetCols = (config.conditional_field || "").split(',').map(x => x.trim());
        if (config.enable_conditional_formatting && targetCols.includes(f.name)) {
          const cellVal = row[f.name]?.value ?? row[f.name];
          const cBg = this.evaluateConditionalRule(cellVal, config, 'conditional_rule_1', 'bg') || this.evaluateConditionalRule(cellVal, config, 'conditional_rule_2', 'bg');
          const cTxt = this.evaluateConditionalRule(cellVal, config, 'conditional_rule_1', 'text') || this.evaluateConditionalRule(cellVal, config, 'conditional_rule_2', 'text');
          if (cBg) cellStyle += `background-color:${cBg} !important;`;
          if (cTxt) cellStyle += `color:${cTxt};`;
        }

        let content = this.renderCellContent(row[f.name], f, config, row, i, processedData);
        html += `<td style="${cellStyle}" ${row[f.name]?.links?.length ? `class="has-drill" data-links='${JSON.stringify(row[f.name].links)}'` : ''}>${content}</td>`;
      });
      html += "</tr>";
    });

    html += "</tbody></table>";
    this.container.innerHTML = html;
    this.attachEventListeners(config);
  },

  renderCellContent: function (cell, field, config, row, idx, data) {
    let val = (cell && typeof cell === 'object') ? cell.value : cell;
    let rendered = (cell && typeof cell === 'object') ? (cell.rendered || cell.value) : cell;
    if (val === null || val === undefined) return '∅';

    const customFmt = config[`field_format_${field.name}`];
    const hasCustomFmt = !!(config.enable_custom_field_formatting && customFmt && customFmt.trim() !== '');

    // FORCE APPLY: If custom formatting is enabled and exists for this field,
    // apply it to ALL rows (Detail, Subtotal, Grand Total) regardless of field type
    if (hasCustomFmt) {
      rendered = this.formatMeasure(val, field, config);
    }
    // Otherwise, only re-format subtotals/grand totals using LookML format
    else if ((row.__isSubtotal || row.__isGrandTotal) && (field.is_measure || field.type === 'number' || field.type === 'count')) {
      rendered = this.formatMeasure(val, field, config);
    }

    // Data Chips
    if (config.enable_data_chips && (config.data_chip_fields || "").split(',').map(f => f.trim()).includes(field.name)) {
      const s = String(val).toLowerCase();
      const match = (list) => list.split(',').map(x => x.trim().toLowerCase()).includes(s);
      if (match(config.chip_match_green || "")) rendered = `<span class="data-chip chip-green">${rendered}</span>`;
      else if (match(config.chip_match_yellow || "")) rendered = `<span class="data-chip chip-yellow">${rendered}</span>`;
      else if (match(config.chip_match_red || "")) rendered = `<span class="data-chip chip-red">${rendered}</span>`;
      else rendered = `<span class="data-chip" style="background-color:${config.chip_default_color}">${rendered}</span>`;
    }

    // Cell Bars
    const barSet1 = (config.cell_bar_fields_1 || "").split(',').map(x => x.trim());
    const barSet2 = (config.cell_bar_fields_2 || "").split(',').map(x => x.trim());
    if (config.enable_cell_bars_1 && barSet1.includes(field.name)) rendered = this.generateBar(val, rendered, config.cell_bar_color_1, config.use_gradient_1, config.gradient_end_1, data, field.name, row.__level);
    else if (config.enable_cell_bars_2 && barSet2.includes(field.name)) rendered = this.generateBar(val, rendered, config.cell_bar_color_2, config.use_gradient_2, config.gradient_end_2, data, field.name, row.__level);

    return rendered;
  },

  evaluateConditionalRule: function (cellValue, config, rulePrefix, colorType = 'bg') {
    const operator = config[`${rulePrefix}_operator`];
    if (!operator) return null;
    const ruleValue = config[`${rulePrefix}_value`];
    const nCell = parseFloat(cellValue), nRule = parseFloat(ruleValue);
    let matches = false;
    if (operator === 'contains') matches = String(cellValue).toLowerCase().includes(String(ruleValue).toLowerCase());
    else if (!isNaN(nCell) && !isNaN(nRule)) {
      switch (operator) {
        case '>': matches = nCell > nRule; break;
        case '>=': matches = nCell >= nRule; break;
        case '<': matches = nCell < nRule; break;
        case '<=': matches = nCell <= nRule; break;
        case '=': matches = nCell === nRule; break;
        case '!=': matches = nCell !== nRule; break;
      }
    }
    return matches ? config[`${rulePrefix}_${colorType}`] : null;
  },

  generateBar: function (val, rend, col, grad, end, data, fName, lvl) {
    const peers = data.filter(r => r.__level === lvl);
    const max = Math.max(...peers.map(r => parseFloat(r[fName]?.value || 0)), 1);
    const w = Math.min(100, (parseFloat(val) / max) * 100);
    const fill = grad ? `linear-gradient(to right, ${col}, ${end})` : col;
    return `<div class="cell-bar-container"><div class="cell-bar-bg"><div class="cell-bar-fill" style="width:${w}%; background:${fill};"></div></div><span>${rend}</span></div>`;
  },

  renderColumnGroups: function (config, fields) {
    let html = '<thead><tr>';
    let currentIdx = 0;
    for (let i = 1; i <= 2; i++) {
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

  attachEventListeners: function (config) {
    if (config.enable_hover) {
      this.container.querySelectorAll('.table-row').forEach(tr => {
        tr.onmouseenter = () => tr.style.backgroundColor = config.hover_bg_color;
        tr.onmouseleave = () => tr.style.backgroundColor = tr.dataset.origBg || '';
      });
    }
    this.container.querySelectorAll('.has-drill').forEach(td => td.onclick = (e) => {
      LookerCharts.Utils.openDrillMenu({ links: JSON.parse(td.dataset.links), event: e });
    });
  },

  applyHierarchyFilter: function (data) {
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

  sortData: function (data, field, dir) {
    return [...data].sort((a, b) => {
      let av = a[field]?.value ?? a[field], bv = b[field]?.value ?? b[field];
      return dir === 'asc' ? (av > bv ? 1 : -1) : (av > bv ? -1 : 1);
    });
  },

  calculateGrandTotal: function(raw, ms, cfg, ds) {
    const t = { __isGrandTotal: true, __level: -1 };
    ms.forEach(m => {
      let s = raw.reduce((a, r) => a + Number(r[m.name]?.value || 0), 0);
      t[m.name] = { value: s, rendered: this.formatMeasure(s, m, cfg) };
    });
    return t;
  },

  trigger: function (event) { },
  clearErrors: function () { }
};

looker.plugins.visualizations.add(visObject);

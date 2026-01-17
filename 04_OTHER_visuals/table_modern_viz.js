/**
 * Advanced Table Visualization for Looker
 * Version: 4.30.1 - SUBTOTAL FORMATTING FIX
 * Build: 2026-01-17
 *
 * CRITICAL FIX (v4.30.1):
 * ✅ Fixed subtotal formatting to use vis.fieldMetadata (LookML format) instead of custom format config
 * ✅ Subtotals now respect "Enable Custom Field Formatting" toggle properly
 * ✅ When toggle OFF: subtotals use LookML format, details use Looker rendered
 * ✅ When toggle ON + format exists: both use custom format
 * ✅ When toggle ON + no format: subtotals use LookML, details use Looker rendered
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
    dynamic_pagination: { type: "boolean", label: "Dynamic Pagination (Respects Subtotals)", default: true, section: "Plot", order: 14 },
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
    cell_bar_max_width: { type: "number", label: "Max Bar Width (%)", default: 100, section: "Series", order: 10 },

    grouping_divider: { type: "string", label: "━━━ Column Grouping ━━━", display: "divider", section: "Series", order: 20 },
    enable_column_groups: { type: "boolean", label: "Enable Grouping", default: false, section: "Series", order: 21 },
    column_group_1_name: { type: "string", label: "Group 1 Name", default: "", section: "Series", order: 22 },
    column_group_1_count: { type: "number", label: "Group 1 Count", default: 1, section: "Series", order: 23 },
    column_group_2_name: { type: "string", label: "Group 2 Name", default: "", section: "Series", order: 24 },
    column_group_2_count: { type: "number", label: "Group 2 Count", default: 1, section: "Series", order: 25 },
    group_remaining_columns: { type: "boolean", label: "Group Remaining Columns", default: false, section: "Series", order: 26 },
    remaining_columns_name: { type: "string", label: "Remaining Name", default: "Other", section: "Series", order: 27 },
    group_header_bg_color: { type: "string", label: "Group Header BG Color", display: "color", default: "#8dc6ff", section: "Series", order: 28 },

    comparison_divider: { type: "string", label: "━━━ Comparison ━━━", display: "divider", section: "Series", order: 50 },
    enable_comparison: { type: "boolean", label: "Enable Comparison", default: false, section: "Series", order: 51 },
    comparison_mode: { type: "string", label: "Mode", display: "select", values: [{ "Metric vs Metric": "metric" }, { "Period over Period": "period" }], default: "metric", section: "Series", order: 52 },
    comparison_primary_field: { type: "string", label: "Primary Field", display: "text", default: "", section: "Series", order: 53 },
    comparison_secondary_field: { type: "string", label: "Secondary Field", display: "text", default: "", section: "Series", order: 54 },
    comparison_period_offset: { type: "number", label: "Period Offset", default: -1, section: "Series", order: 55 },
    show_comparison_arrows: { type: "boolean", label: "Show Arrows", default: true, section: "Series", order: 56 },
    positive_comparison_color: { type: "string", label: "Pos Color", display: "color", default: "#10b981", section: "Series", order: 57 },
    negative_comparison_color: { type: "string", label: "Neg Color", display: "color", default: "#ef4444", section: "Series", order: 58 },

    subtotals_divider: { type: "string", label: "━━━ Subtotals & Totals ━━━", display: "divider", section: "Series", order: 80 },
    enable_subtotals: { type: "boolean", label: "Enable Subtotals", default: false, section: "Series", order: 81 },
    subtotal_dimension: { type: "string", label: "Group Dimension", display: "select", values: [{ "None": "" }], default: "", section: "Series", order: 82 },
    standard_subtotal_bold: { type: "boolean", label: "Bold Font for Subtotals", default: true, section: "Series", order: 83 },
    show_grand_total: { type: "boolean", label: "Show Grand Total Row", default: false, section: "Series", order: 84 },
    subtotal_position: { type: "string", label: "Position", display: "select", values: [{ "Top": "top" }, { "Bottom": "bottom" }], default: "bottom", section: "Series", order: 85 },
    subtotal_background_color: { type: "string", label: "Subtotal BG Color", display: "color", default: "#f0f0f0", section: "Series", order: 86 },
    grand_total_label: { type: "string", label: "Grand Total Label", default: "Grand Total", section: "Series", order: 87 },

    field_formatting_divider: { type: "string", label: "━━━ Field Formatting ━━━", display: "divider", section: "Series", order: 100 },
    enable_custom_field_formatting: { type: "boolean", label: "Enable Custom Field Formatting", default: true, section: "Series", order: 101 },

    conditional_divider: { type: "string", label: "━━━ Conditional Formatting ━━━", display: "divider", section: "Series", order: 200 },
    enable_conditional_formatting: { type: "boolean", label: "Enable Conditional Formatting", default: false, section: "Series", order: 201 },
    conditional_field: { type: "string", label: "Field to Format", display: "text", default: "", section: "Series", order: 202 },
    condition_type: { type: "string", label: "Condition Type", display: "select", values: [{ "Value": "value" }, { "Range": "range" }], default: "value", section: "Series", order: 203 },
    condition_operator: { type: "string", label: "Operator", display: "select", values: [{ "Equals": "eq" }, { "Not Equals": "neq" }, { "Greater Than": "gt" }, { "Less Than": "lt" }], default: "gt", section: "Series", order: 204 },
    condition_value: { type: "string", label: "Value", display: "text", default: "0", section: "Series", order: 205 },
    range_min: { type: "number", label: "Range Min", default: 0, section: "Series", order: 206 },
    range_max: { type: "number", label: "Range Max", default: 100, section: "Series", order: 207 },
    conditional_bg_color: { type: "string", label: "Background Color", display: "color", default: "#fef3c7", section: "Series", order: 208 },
    conditional_text_color: { type: "string", label: "Text Color", display: "color", default: "#000000", section: "Series", order: 209 },

    data_chips_divider: { type: "string", label: "━━━ Data Chips ━━━", display: "divider", section: "Series", order: 300 },
    enable_data_chips: { type: "boolean", label: "Enable Data Chips", default: false, section: "Series", order: 301 },
    data_chip_fields: { type: "string", label: "Fields (comma-sep)", display: "text", default: "", section: "Series", order: 302 },
    chip_match_green: { type: "string", label: "Green Values", display: "text", default: "approved,complete", section: "Series", order: 303 },
    chip_match_red: { type: "string", label: "Red Values", display: "text", default: "rejected,failed", section: "Series", order: 304 },

    // ══════════════════════════════════════════════════════════════
    // TAB: FORMATTING
    // ══════════════════════════════════════════════════════════════
    formatting_divider_general: { type: "string", label: "━━━ General ━━━", display: "divider", section: "Formatting", order: 0 },
    table_width: { type: "string", label: "Table Width", display: "select", values: [{ "Auto": "auto" }, { "Fit Content": "fit" }, { "100%": "100%" }], default: "100%", section: "Formatting", order: 1 },
    border_style: { type: "string", label: "Border Style", display: "select", values: [{ "All": "all" }, { "Horizontal": "horizontal" }, { "None": "none" }], default: "all", section: "Formatting", order: 2 },
    border_color: { type: "string", label: "Border Color", display: "color", default: "#e0e0e0", section: "Formatting", order: 3 },

    formatting_divider_header: { type: "string", label: "━━━ Header ━━━", display: "divider", section: "Formatting", order: 10 },
    header_background_color: { type: "string", label: "Header BG Color", display: "color", default: "#f5f5f5", section: "Formatting", order: 11 },
    header_text_color: { type: "string", label: "Header Text Color", display: "color", default: "#333333", section: "Formatting", order: 12 },
    header_font_size: { type: "number", label: "Header Font Size", default: 13, section: "Formatting", order: 13 },
    header_bold: { type: "boolean", label: "Header Bold", default: true, section: "Formatting", order: 14 },

    formatting_divider_cell: { type: "string", label: "━━━ Cell ━━━", display: "divider", section: "Formatting", order: 20 },
    cell_text_color: { type: "string", label: "Cell Text Color", display: "color", default: "#333333", section: "Formatting", order: 21 },
    cell_font_size: { type: "number", label: "Cell Font Size", default: 12, section: "Formatting", order: 22 },
    cell_padding: { type: "number", label: "Cell Padding", default: 8, section: "Formatting", order: 23 },
    text_align: { type: "string", label: "Text Align", display: "select", values: [{ "Left": "left" }, { "Center": "center" }, { "Right": "right" }], default: "left", section: "Formatting", order: 24 },

    formatting_divider_zebra: { type: "string", label: "━━━ Zebra Striping ━━━", display: "divider", section: "Formatting", order: 30 },
    enable_zebra: { type: "boolean", label: "Enable Zebra", default: false, section: "Formatting", order: 31 },
    zebra_color: { type: "string", label: "Zebra Color", display: "color", default: "#f9f9f9", section: "Formatting", order: 32 },
  },

  create: function (element, config) {
    element.innerHTML = '<div class="advanced-table-container"></div>';
    this.container = element.querySelector('.advanced-table-container');
  },

  updateAsync: function (data, element, config, queryResponse, details, done) {
    this.clearErrors();

    // Store vis context for accessing fieldMetadata
    this.vis = details;
    this.queryResponse = queryResponse;
    this.config = config;

    // Populate dynamic field selectors
    const fields = queryResponse.fields.dimensions.concat(queryResponse.fields.measures);

    // Update subtotal_dimension dropdown
    const subtotalOptions = [{ "None": "" }];
    queryResponse.fields.dimensions.forEach(dim => {
      subtotalOptions.push({ [dim.label_short || dim.label]: dim.name });
    });
    this.trigger('registerOptions', {
      ...this.options,
      subtotal_dimension: {
        ...this.options.subtotal_dimension,
        values: subtotalOptions
      }
    });

    // Build field formatting options dynamically
    const fieldFormattingOptions = {};
    fields.forEach((field, idx) => {
      fieldFormattingOptions[`field_format_${field.name}`] = {
        type: "string",
        label: `${field.label_short || field.label}`,
        display: "text",
        default: field.value_format || "",
        placeholder: field.value_format || "e.g., $#,##0.00",
        section: "Series",
        order: 102 + idx
      };
    });

    this.trigger('registerOptions', {
      ...this.options,
      ...fieldFormattingOptions
    });

    // STEP 1: Process Data
    let processedData = data.map(row => ({ ...row }));

    // STEP 2: Apply BO Hierarchy (if enabled)
    if (config.enable_bo_hierarchy && config.hierarchy_dimensions) {
      processedData = this.applyBOHierarchy(processedData, config, queryResponse);
    }

    // STEP 3: Subtotal Injection
    if (config.enable_subtotals && config.subtotal_dimension) {
      processedData = this.injectSubtotals(processedData, config, queryResponse);
    }

    // STEP 4: Grand Total
    if (config.show_grand_total) {
      processedData = this.injectGrandTotal(processedData, config, queryResponse);
    }

    // STEP 5: Pagination
    this.currentPage = this.currentPage || 1;
    let paginatedData = processedData;
    let totalPages = 1;

    if (config.enable_pagination) {
      const pageSize = parseInt(config.page_size) || 25;
      totalPages = Math.ceil(processedData.length / pageSize);

      if (config.dynamic_pagination) {
        // Respect subtotal/grand total boundaries
        let pageBreaks = [0];
        let currentPageRows = 0;

        for (let i = 0; i < processedData.length; i++) {
          currentPageRows++;
          const row = processedData[i];
          const nextRow = processedData[i + 1];

          if (currentPageRows >= pageSize) {
            if (!nextRow || nextRow.__isSubtotal || nextRow.__isGrandTotal ||
                (config.enable_bo_hierarchy && nextRow.__level === 0)) {
              pageBreaks.push(i + 1);
              currentPageRows = 0;
            }
          }
        }
        pageBreaks.push(processedData.length);

        totalPages = pageBreaks.length - 1;
        this.currentPage = Math.min(this.currentPage, totalPages);
        const startIdx = pageBreaks[this.currentPage - 1];
        const endIdx = pageBreaks[this.currentPage];
        paginatedData = processedData.slice(startIdx, endIdx);
      } else {
        // Standard pagination
        const startIdx = (this.currentPage - 1) * pageSize;
        const endIdx = startIdx + pageSize;
        paginatedData = processedData.slice(startIdx, endIdx);
      }
    }

    // STEP 6: Render
    this.renderTable(paginatedData, config, queryResponse, this.currentPage, totalPages, processedData);
    done();
  },

  applyBOHierarchy: function (data, config, queryResponse) {
    const hierarchyLevels = (config.hierarchy_dimensions || "").split(',').map(x => x.trim()).filter(Boolean);
    if (hierarchyLevels.length === 0) return data;

    const groupedData = {};
    data.forEach(row => {
      let currentLevel = groupedData;
      let path = [];

      hierarchyLevels.forEach((dimName, levelIdx) => {
        const dimValue = row[dimName]?.value || row[dimName] || '';
        path.push(dimValue);
        const pathKey = path.join('|||');

        if (!currentLevel[pathKey]) {
          currentLevel[pathKey] = {
            __isSubtotal: true,
            __level: levelIdx,
            __parentPath: path.slice(0, -1).join('|||'),
            [dimName]: dimValue,
            children: levelIdx < hierarchyLevels.length - 1 ? {} : []
          };

          // Initialize aggregation for all measures
          queryResponse.fields.measures.forEach(measure => {
            currentLevel[pathKey][measure.name] = 0;
          });
        }

        currentLevel = currentLevel[pathKey].children;
      });

      // Store detail row
      if (Array.isArray(currentLevel)) {
        currentLevel.push({ ...row, __level: hierarchyLevels.length });
      }
    });

    // Flatten and calculate subtotals
    const result = [];
    const flatten = (node, path = []) => {
      Object.keys(node).sort().forEach(key => {
        const item = node[key];

        if (item.__isSubtotal) {
          const subtotalRow = { ...item };
          delete subtotalRow.children;

          // Calculate aggregates
          const allDescendants = this.getAllDescendants(item);
          queryResponse.fields.measures.forEach(measure => {
            const sum = allDescendants.reduce((acc, r) => {
              const val = r[measure.name]?.value ?? r[measure.name] ?? 0;
              return acc + (typeof val === 'number' ? val : 0);
            }, 0);
            subtotalRow[measure.name] = { value: sum, isSubtotal: true };
          });

          if (config.subtotal_position === 'top') {
            result.push(subtotalRow);
            if (typeof item.children === 'object' && !Array.isArray(item.children)) {
              flatten(item.children, [...path, key]);
            } else if (Array.isArray(item.children)) {
              result.push(...item.children);
            }
          } else {
            if (typeof item.children === 'object' && !Array.isArray(item.children)) {
              flatten(item.children, [...path, key]);
            } else if (Array.isArray(item.children)) {
              result.push(...item.children);
            }
            result.push(subtotalRow);
          }
        }
      });
    };

    flatten(groupedData);
    return result;
  },

  getAllDescendants: function (node) {
    let descendants = [];
    if (Array.isArray(node.children)) {
      descendants = [...node.children];
    } else if (typeof node.children === 'object') {
      Object.values(node.children).forEach(child => {
        descendants = descendants.concat(this.getAllDescendants(child));
      });
    }
    return descendants;
  },

  injectSubtotals: function (data, config, queryResponse) {
    const groupDim = config.subtotal_dimension;
    if (!groupDim) return data;

    const groups = {};
    data.forEach(row => {
      const key = row[groupDim]?.value || row[groupDim] || '';
      if (!groups[key]) groups[key] = [];
      groups[key].push(row);
    });

    const result = [];
    Object.keys(groups).forEach(groupKey => {
      const groupRows = groups[groupKey];

      if (config.subtotal_position === 'top') {
        result.push(this.createSubtotalRow(groupRows, config, queryResponse, groupKey, groupDim));
        result.push(...groupRows);
      } else {
        result.push(...groupRows);
        result.push(this.createSubtotalRow(groupRows, config, queryResponse, groupKey, groupDim));
      }
    });

    return result;
  },

  createSubtotalRow: function (rows, config, queryResponse, groupLabel, groupDim) {
    const subtotal = { __isSubtotal: true, __level: 0 };
    subtotal[groupDim] = groupLabel;

    queryResponse.fields.measures.forEach(measure => {
      const sum = rows.reduce((acc, r) => {
        const val = r[measure.name]?.value ?? r[measure.name] ?? 0;
        return acc + (typeof val === 'number' ? val : 0);
      }, 0);
      subtotal[measure.name] = { value: sum, isSubtotal: true };
    });

    return subtotal;
  },

  injectGrandTotal: function (data, config, queryResponse) {
    const grandTotal = { __isGrandTotal: true };
    grandTotal[queryResponse.fields.dimensions[0]?.name] = config.grand_total_label || "Grand Total";

    queryResponse.fields.measures.forEach(measure => {
      const sum = data.reduce((acc, r) => {
        if (r.__isSubtotal || r.__isGrandTotal) return acc;
        const val = r[measure.name]?.value ?? r[measure.name] ?? 0;
        return acc + (typeof val === 'number' ? val : 0);
      }, 0);
      grandTotal[measure.name] = { value: sum, isSubtotal: true };
    });

    return [...data, grandTotal];
  },

  renderTable: function (data, config, queryResponse, currentPage, totalPages, fullData) {
    const fields = queryResponse.fields.dimensions.concat(queryResponse.fields.measures);

    let html = `
      <style>
        .advanced-table-container { width: ${config.table_width}; overflow-x: auto; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
        .advanced-table { border-collapse: collapse; width: 100%; }
        .advanced-table th, .advanced-table td {
          padding: ${config.cell_padding}px;
          text-align: ${config.text_align};
          border: ${config.border_style === 'none' ? 'none' : `1px solid ${config.border_color}`};
          font-size: ${config.cell_font_size}px;
          color: ${config.cell_text_color};
          position: relative;
        }
        .advanced-table th {
          background: ${config.header_background_color};
          color: ${config.header_text_color};
          font-size: ${config.header_font_size}px;
          font-weight: ${config.header_bold ? 'bold' : 'normal'};
          ${config.freeze_header_row ? 'position: sticky; top: 0; z-index: 10;' : ''}
        }
        ${config.border_style === 'horizontal' ? '.advanced-table td { border-left: none; border-right: none; }' : ''}
        ${config.enable_zebra ? `.advanced-table tr:nth-child(even):not(.subtotal-row):not(.grand-total-row) { background: ${config.zebra_color}; }` : ''}
        .subtotal-row { background: ${config.subtotal_background_color} !important; font-weight: ${config.standard_subtotal_bold ? 'bold' : 'normal'}; }
        .grand-total-row { background: ${config.subtotal_background_color} !important; font-weight: bold; }
        .hierarchy-level-0 { font-weight: ${config.bo_hierarchy_bold ? 'bold' : 'normal'}; padding-left: ${config.cell_padding}px; }
        .hierarchy-level-1 { padding-left: ${config.cell_padding * 2}px; }
        .hierarchy-level-2 { padding-left: ${config.cell_padding * 3}px; }
        .hierarchy-level-3 { padding-left: ${config.cell_padding * 4}px; }
        .frozen-column { position: sticky; background: white; z-index: 5; left: 0; }
        .column-group-header { background: ${config.group_header_bg_color}; font-weight: bold; text-align: center; padding: 12px; }
        .cell-bar-container { position: relative; display: flex; align-items: center; justify-content: flex-end; }
        .cell-bar { position: absolute; left: 0; top: 0; bottom: 0; opacity: 0.3; transition: opacity 0.2s; }
        .cell-bar-value { position: relative; z-index: 1; }
        .comparison-indicator { display: inline-flex; align-items: center; gap: 4px; margin-left: 8px; font-size: 0.9em; }
        .data-chip { padding: 4px 12px; border-radius: 12px; font-size: 0.85em; font-weight: 500; display: inline-block; }
        .chip-green { background: #d1fae5; color: #065f46; }
        .chip-red { background: #fee2e2; color: #991b1b; }
        .pagination-container { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; }
        .pagination-info { font-size: 13px; color: #666; }
        .pagination-controls { display: flex; gap: 4px; }
        .pagination-btn { padding: 6px 12px; cursor: pointer; border: 1px solid ${config.border_color}; background: white; border-radius: 4px; font-size: 13px; }
        .pagination-btn:hover:not([disabled]) { background: #f5f5f5; }
        .pagination-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .column-filter-container { padding: 4px; }
        .column-filter-input { width: 100%; padding: 4px; border: 1px solid #ddd; border-radius: 4px; font-size: 12px; }
        .table-filter-container { padding: 12px 0; }
        .table-filter-input { width: 100%; max-width: 400px; padding: 8px; border: 1px solid #ddd; border-radius: 4px; }
        .cell-with-drill { cursor: pointer; }
        .cell-with-drill:hover { background-color: rgba(0, 0, 0, 0.05); }
      </style>
    `;

    // Table Filter
    if (config.enable_table_filter) {
      html += `
        <div class="table-filter-container">
          <input type="text" class="table-filter-input" placeholder="Filter table..." />
        </div>
      `;
    }

    html += '<table class="advanced-table">';

    // Column Groups
    if (config.enable_column_groups) {
      html += this.renderColumnGroups(config, fields);
    }

    // Headers
    if (config.show_headers) {
      html += '<thead><tr>';
      if (config.show_row_numbers) html += '<th>#</th>';
      fields.forEach((field, idx) => {
        const frozenClass = idx < config.freeze_columns ? 'frozen-column' : '';
        html += `<th class="${frozenClass}">${field.label_short || field.label}`;
        if (config.enable_column_filters) {
          html += `<div class="column-filter-container"><input type="text" class="column-filter-input" data-field="${field.name}" placeholder="Filter..." /></div>`;
        }
        html += '</th>';
      });
      html += '</tr></thead>';
    }

    // Body
    html += '<tbody>';
    data.forEach((row, idx) => {
      const rowClass = row.__isGrandTotal ? 'grand-total-row' : (row.__isSubtotal ? 'subtotal-row' : '');
      const levelClass = row.__level !== undefined ? `hierarchy-level-${row.__level}` : '';
      html += `<tr class="${rowClass} ${levelClass}">`;

      if (config.show_row_numbers) {
        html += `<td>${idx + 1}</td>`;
      }

      fields.forEach((field, fieldIdx) => {
        const frozenClass = fieldIdx < config.freeze_columns ? 'frozen-column' : '';
        const cellValue = this.renderCellContent(row[field.name], field, config, row, idx, data);

        // Conditional Formatting
        let cellStyle = '';
        if (config.enable_conditional_formatting && config.conditional_field === field.name) {
          const rawVal = row[field.name]?.value ?? row[field.name];
          if (this.meetsCondition(rawVal, config)) {
            cellStyle = `background: ${config.conditional_bg_color}; color: ${config.conditional_text_color};`;
          }
        }

        // Check for drill links
        const cellData = row[field.name];
        const hasDrill = cellData && cellData.links && cellData.links.length > 0;
        const drillClass = hasDrill ? 'cell-with-drill' : '';
        const drillAttr = hasDrill ? `data-drill='${JSON.stringify(cellData.links)}'` : '';

        html += `<td class="${frozenClass} ${drillClass}" style="${cellStyle}" ${drillAttr}>${cellValue}</td>`;
      });

      html += '</tr>';
    });
    html += '</tbody></table>';

    // Pagination Controls
    if (config.enable_pagination) {
      const paginationHTML = `
        <div class="pagination-container">
          <div class="pagination-info">Page ${currentPage} of ${totalPages} | ${data.length} rows</div>
          <div class="pagination-controls">
            <button class="pagination-btn" data-page="first" ${currentPage === 1 ? 'disabled' : ''} style="padding: 6px 12px; cursor: pointer; border: 1px solid ${config.border_color}; background: white; border-radius: 4px; ${currentPage === 1 ? 'opacity: 0.5; cursor: not-allowed;' : ''}">|◄</button>
            <button class="pagination-btn" data-page="prev" ${currentPage === 1 ? 'disabled' : ''} style="padding: 6px 12px; cursor: pointer; border: 1px solid ${config.border_color}; background: white; border-radius: 4px; ${currentPage === 1 ? 'opacity: 0.5; cursor: not-allowed;' : ''}">◄</button>
            <button class="pagination-btn" data-page="next" ${currentPage === totalPages ? 'disabled' : ''} style="padding: 6px 12px; cursor: pointer; border: 1px solid ${config.border_color}; background: white; border-radius: 4px; ${currentPage === totalPages ? 'opacity: 0.5; cursor: not-allowed;' : ''}">►</button>
            <button class="pagination-btn" data-page="last" ${currentPage === totalPages ? 'disabled' : ''} style="padding: 6px 12px; cursor: pointer; border: 1px solid ${config.border_color}; background: white; border-radius: 4px; ${currentPage === totalPages ? 'opacity: 0.5; cursor: not-allowed;' : ''}">►|</button>
          </div>
        </div>
      `;

      if (config.pagination_position === 'top' || config.pagination_position === 'both') {
        html = paginationHTML + html;
      }
      if (config.pagination_position === 'bottom' || config.pagination_position === 'both') {
        html += paginationHTML;
      }
    }

    this.container.innerHTML = html;
    this.attachEventListeners(config);
  },

  renderColumnGroups: function (config, fields) {
    let html = '<thead><tr>';
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

  renderCellContent: function (cell, field, config, row, rowIdx, data) {
    let val = cell, rendered = cell;
    if (cell && typeof cell === 'object') {
      val = cell.value;
      rendered = cell.rendered || cell.value;
    }
    if (val === null || val === undefined) return '∅';

    // ============================================================
    // FIXED: Use vis.fieldMetadata for LookML format
    // ============================================================
    const isSubtotalOrGrandTotal = row.__isSubtotal || row.__isGrandTotal;
    const fieldMetadata = this.vis?.fieldMetadata?.[field.name];
    const lookmlFormat = fieldMetadata?.number_format || fieldMetadata?.value_format;
    const customFormatEnabled = config.enable_custom_field_formatting === true;
    const customFormat = config[`field_format_${field.name}`];
    const hasCustomFormat = !!(customFormat && customFormat.trim() !== '');

    // Debug logging for first 3 rows and ALL subtotals
    if (rowIdx < 3 || isSubtotalOrGrandTotal) {
      console.log(`[FORMAT-DEBUG] Row ${rowIdx}, Field ${field.name}:`, JSON.stringify({
        fieldType: field.type,
        isMeasure: field.is_measure,
        isSubtotal: row.__isSubtotal,
        isGrandTotal: row.__isGrandTotal,
        customFormatEnabled: customFormatEnabled,
        hasCustomFormat: hasCustomFormat,
        customFormat: customFormat,
        lookmlFormat: lookmlFormat,
        value: val,
        lookerRendered: rendered
      }, null, 2));
    }

    // Apply formatting based on toggle state and custom format availability
    if (customFormatEnabled && hasCustomFormat) {
      // Custom formatting is ON and format exists → apply to ALL rows
      rendered = this.formatWithSSF(val, customFormat);
      if (rowIdx < 3 || isSubtotalOrGrandTotal) {
        console.log(`[FORMAT] ${field.name} - Using CUSTOM format: ${customFormat} → ${rendered}`);
      }
    } else if (isSubtotalOrGrandTotal && lookmlFormat) {
      // Subtotal/Grand Total with no custom format → use LookML format
      rendered = this.formatWithSSF(val, lookmlFormat);
      if (rowIdx < 3 || isSubtotalOrGrandTotal) {
        console.log(`[FORMAT] ${field.name} - Subtotal using LookML format: ${lookmlFormat} → ${rendered}`);
      }
    } else {
      // Detail rows with no custom format → use Looker rendered
      if (rowIdx < 3) {
        console.log(`[FORMAT] ${field.name} - Detail row using Looker rendered: ${rendered}`);
      }
    }

    // Data Chip logic
    if (config.enable_data_chips && (config.data_chip_fields || "").split(',').includes(field.name)) {
      const s = String(val).toLowerCase();
      if ((config.chip_match_green || "").split(',').map(x => x.trim().toLowerCase()).includes(s)) rendered = `<span class="data-chip chip-green">${rendered}</span>`;
      else if ((config.chip_match_red || "").split(',').map(x => x.trim().toLowerCase()).includes(s)) rendered = `<span class="data-chip chip-red">${rendered}</span>`;
    }

    // Smart Peer-Based Comparison Logic
    if (config.enable_comparison && config.comparison_primary_field === field.name) {
      const isLastOfSubgroup = this.isLastElementOfGroup(rowIdx, data, config);
      if (!row.__isGrandTotal && !isLastOfSubgroup) {
        rendered = this.renderComparison(row, config, rowIdx, data, rendered);
      }
    }

    // Level-Aware Cell Bar Logic
    if (!row.__isGrandTotal) {
      if (config.enable_cell_bars_1 && (config.cell_bar_fields_1 || "").split(',').map(x => x.trim()).includes(field.name)) {
        rendered = this.generateCellBar(val, rendered, config.cell_bar_color_1, config.use_gradient_1, config.gradient_end_1, data, field.name, row.__level);
      } else if (config.enable_cell_bars_2 && (config.cell_bar_fields_2 || "").split(',').map(x => x.trim()).includes(field.name)) {
        rendered = this.generateCellBar(val, rendered, config.cell_bar_color_2, false, null, data, field.name, row.__level);
      }
    }

    return rendered;
  },

  formatWithSSF: function(value, format) {
    try {
      if (typeof SSF !== 'undefined' && format) {
        return SSF.format(format, value);
      }
    } catch (e) {
      console.error('[FORMAT-ERROR] SSF formatting failed:', e);
    }
    return value;
  },

  isLastElementOfGroup: function (idx, data, config) {
    if (idx >= data.length - 1) return true;
    const curr = data[idx];
    const next = data[idx + 1];
    if (next.__isGrandTotal) return true;

    // For REGULAR subtotals (non-BO mode)
    if (!config.enable_bo_hierarchy && curr.__isSubtotal) {
      // Check if there's another subtotal at the same level
      // with the same group dimension value
      for (let i = idx + 1; i < data.length; i++) {
        const futureRow = data[i];
        if (futureRow.__isGrandTotal) return true;
        if (futureRow.__isSubtotal) {
          // Found another subtotal - they can be compared
          return false;
        }
      }
      return true; // No more subtotals found
    }

    // For hierarchy mode with subtotals
    if (config.enable_bo_hierarchy) {
      // If current is a subtotal, look ahead to find next subtotal at same level
      if (curr.__isSubtotal) {
        // Find next subtotal at same level with same parent
        for (let i = idx + 1; i < data.length; i++) {
          const futureRow = data[i];
          if (futureRow.__isGrandTotal) return true;
          if (futureRow.__isSubtotal && futureRow.__level === curr.__level) {
            // Found next subtotal at same level - check if same parent
            if (futureRow.__parentPath === curr.__parentPath) {
              return false; // There's another subtotal to compare with
            } else {
              return true; // Different parent, can't compare
            }
          }
        }
        return true; // No more subtotals at this level
      }
    }

    return false;
  },

  renderComparison: function (row, config, rowIdx, data, formattedValue) {
    const primaryField = config.comparison_primary_field;
    const secondaryField = config.comparison_secondary_field;

    let compareValue;
    if (config.comparison_mode === 'metric') {
      compareValue = row[secondaryField]?.value ?? row[secondaryField];
    } else {
      const offset = parseInt(config.comparison_period_offset) || -1;
      const compareRow = data[rowIdx + offset];
      compareValue = compareRow ? (compareRow[primaryField]?.value ?? compareRow[primaryField]) : null;
    }

    const primaryValue = row[primaryField]?.value ?? row[primaryField];
    if (compareValue === null || compareValue === undefined) return formattedValue;

    const diff = primaryValue - compareValue;
    const pct = compareValue !== 0 ? ((diff / compareValue) * 100).toFixed(1) : '0.0';
    const color = diff > 0 ? config.positive_comparison_color : config.negative_comparison_color;
    const arrow = config.show_comparison_arrows ? (diff > 0 ? '▲' : '▼') : '';

    return `${formattedValue}<span class="comparison-indicator" style="color:${color}">${arrow} ${pct}%</span>`;
  },

  generateCellBar: function (value, formattedValue, color, useGradient, gradientEnd, data, fieldName, level) {
    const numericValue = typeof value === 'number' ? value : parseFloat(value);
    if (isNaN(numericValue)) return formattedValue;

    // Filter data by level if hierarchy is active
    const relevantData = data.filter(r => {
      if (level !== undefined && r.__level !== undefined) {
        return r.__level === level;
      }
      return true;
    });

    const values = relevantData.map(r => {
      const val = r[fieldName]?.value ?? r[fieldName];
      return typeof val === 'number' ? val : parseFloat(val);
    }).filter(v => !isNaN(v));

    const maxVal = Math.max(...values, 0);
    const minVal = Math.min(...values, 0);

    let barWidth = 0;
    if (maxVal !== minVal) {
      if (numericValue >= 0) {
        barWidth = (numericValue / maxVal) * 100;
      } else {
        barWidth = (numericValue / minVal) * 100;
      }
    }

    const gradient = useGradient && gradientEnd
      ? `background: linear-gradient(to right, ${color}, ${gradientEnd});`
      : `background: ${color};`;

    return `<div class="cell-bar-container"><div class="cell-bar" style="${gradient} width: ${barWidth}%;"></div><span class="cell-bar-value">${formattedValue}</span></div>`;
  },

  formatMeasure: function (val, field, config) {
    // Use custom format if available
    const customFormat = config[`field_format_${field.name}`];
    if (customFormat && customFormat.trim() !== '') {
      return this.formatWithSSF(val, customFormat);
    }

    // Fall back to LookML format from fieldMetadata
    const fieldMetadata = this.vis?.fieldMetadata?.[field.name];
    const lookmlFormat = fieldMetadata?.number_format || fieldMetadata?.value_format;
    if (lookmlFormat) {
      return this.formatWithSSF(val, lookmlFormat);
    }

    // Final fallback
    return val;
  },

  meetsCondition: function (value, config) {
    const condVal = parseFloat(config.condition_value);
    const numVal = typeof value === 'number' ? value : parseFloat(value);
    if (isNaN(numVal)) return false;

    if (config.condition_type === 'range') {
      return numVal >= config.range_min && numVal <= config.range_max;
    }

    switch (config.condition_operator) {
      case 'eq': return numVal === condVal;
      case 'neq': return numVal !== condVal;
      case 'gt': return numVal > condVal;
      case 'lt': return numVal < condVal;
      default: return false;
    }
  },

  attachEventListeners: function (config) {
    // Pagination
    this.container.querySelectorAll('.pagination-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const page = e.target.dataset.page;
        if (page === 'first') this.currentPage = 1;
        else if (page === 'last') this.currentPage = 999999; // Will be clamped
        else if (page === 'next') this.currentPage++;
        else if (page === 'prev') this.currentPage--;
        this.trigger('updateAsync');
      });
    });

    // Column Filters
    this.container.querySelectorAll('.column-filter-input').forEach(input => {
      input.addEventListener('input', (e) => {
        const fieldName = e.target.dataset.field;
        const filterValue = e.target.value.toLowerCase();
        console.log(`[FILTER] Column ${fieldName}: ${filterValue}`);

        this.container.querySelectorAll('tbody tr').forEach(row => {
          const cells = Array.from(row.querySelectorAll('td'));
          const fieldIdx = Array.from(this.container.querySelectorAll('thead th')).findIndex(th => th.textContent.includes(fieldName));
          if (fieldIdx >= 0) {
            const cellText = (cells[fieldIdx]?.textContent || '').toLowerCase();
            row.style.display = cellText.includes(filterValue) ? '' : 'none';
          }
        });
      });
    });

    // Table Filter
    const tableFilter = this.container.querySelector('.table-filter-input');
    if (tableFilter) {
      tableFilter.addEventListener('input', (e) => {
        const filterValue = e.target.value.toLowerCase();
        this.container.querySelectorAll('tbody tr').forEach(row => {
          const rowText = row.textContent.toLowerCase();
          row.style.display = rowText.includes(filterValue) ? '' : 'none';
        });
      });
    }

    // Drill Links
    this.container.querySelectorAll('.cell-with-drill').forEach(cell => {
      cell.addEventListener('click', (e) => {
        try {
          const drillLinks = JSON.parse(cell.dataset.drill);
          if (drillLinks && drillLinks.length > 0) {
            LookerCharts.Utils.openDrillMenu({
              links: drillLinks,
              event: e
            });
          }
        } catch (err) {
          console.error('[DRILL] Error opening drill menu:', err);
        }
      });
    });
  }
};

looker.plugins.visualizations.add(visObject);

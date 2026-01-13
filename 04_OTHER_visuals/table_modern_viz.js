/**
 * Advanced Table Visualization for Looker
 * Version: 4.15.0 - MASTER INTEGRATION (4.12.7 base + SAP BO Hierarchy)
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
    filter_highlight_color: { type: "string", label: "Filter Highlight Color", display: "color", default: "#fef08a", section: "Plot", order: 33 },

    // ══════════════════════════════════════════════════════════════
    // TAB: SERIES
    // ══════════════════════════════════════════════════════════════

    // NEW: BO HIERARCHY
    hierarchy_divider: { type: "string", label: "─────────────────────────────── BO Hierarchy Mode ───────────────────────────────", display: "divider", section: "Series", order: -10 },
    enable_bo_hierarchy: { type: "boolean", label: "Enable BO-Style Hierarchy", default: false, section: "Series", order: -9 },
    hierarchy_dimensions: { type: "string", label: "Hierarchy Levels (comma-separated)", display: "text", default: "", placeholder: "brand,category", section: "Series", order: -8 },

    series_divider_cell_bars: { type: "string", label: "─────────────────────────────── Cell Bar Charts ───────────────────────────────", display: "divider", section: "Series", order: 0 },
    enable_cell_bars_1: { type: "boolean", label: "Enable Cell Bar Set 1", default: false, section: "Series", order: 1 },
    cell_bar_fields_1: { type: "string", label: "Cell Bar Fields 1 (comma-separated)", display: "text", default: "", placeholder: "measure1,measure2,measure3", section: "Series", order: 2 },
    cell_bar_color_1: { type: "string", label: "Cell Bar Color 1", display: "color", default: "#3b82f6", section: "Series", order: 3 },
    cell_bar_gradient_1: { type: "boolean", label: "Use Gradient for Set 1", default: false, section: "Series", order: 4 },
    cell_bar_gradient_end_1: { type: "string", label: "Gradient End Color 1", display: "color", default: "#93c5fd", section: "Series", order: 5 },
    enable_cell_bars_2: { type: "boolean", label: "Enable Cell Bar Set 2", default: false, section: "Series", order: 6 },
    cell_bar_fields_2: { type: "string", label: "Cell Bar Fields 2 (comma-separated)", display: "text", default: "", placeholder: "measure1,measure2", section: "Series", order: 7 },
    cell_bar_color_2: { type: "string", label: "Cell Bar Color 2", display: "color", default: "#10b981", section: "Series", order: 8 },
    cell_bar_gradient_2: { type: "boolean", label: "Use Gradient for Set 2", default: false, section: "Series", order: 9 },
    cell_bar_gradient_end_2: { type: "string", label: "Gradient End Color 2", display: "color", default: "#6ee7b7", section: "Series", order: 10 },
    enable_cell_bars_3: { type: "boolean", label: "Enable Cell Bar Set 3", default: false, section: "Series", order: 11 },
    cell_bar_fields_3: { type: "string", label: "Cell Bar Fields 3 (comma-separated)", display: "text", default: "", placeholder: "measure1,measure2", section: "Series", order: 12 },
    cell_bar_color_3: { type: "string", label: "Cell Bar Color 3", display: "color", default: "#f59e0b", section: "Series", order: 13 },
    cell_bar_gradient_3: { type: "boolean", label: "Use Gradient for Set 3", default: false, section: "Series", order: 14 },
    cell_bar_gradient_end_3: { type: "string", label: "Gradient End Color 3", display: "color", default: "#fcd34d", section: "Series", order: 15 },
    cell_bar_show_value: { type: "boolean", label: "Show Value on Cell Bars", default: true, section: "Series", order: 16 },
    cell_bar_max_width: { type: "number", label: "Cell Bar Max Width (%)", default: 100, display: "number", min: 20, max: 100, section: "Series", order: 17 },

    series_divider_grouping: { type: "string", label: "─────────────────────────────── Column Grouping ───────────────────────────────", display: "divider", section: "Series", order: 20 },
    enable_column_groups: { type: "boolean", label: "Enable Column Grouping", default: false, section: "Series", order: 21 },
    column_group_1_name: { type: "string", label: "Group 1 Name", default: "", section: "Series", order: 22 },
    column_group_1_count: { type: "number", label: "Group 1 - Number of Columns from Left", display: "number", default: 2, min: 1, max: 20, section: "Series", order: 23 },
    column_group_2_name: { type: "string", label: "Group 2 Name", default: "", section: "Series", order: 24 },
    column_group_2_count: { type: "number", label: "Group 2 - Number of Columns from Left", display: "number", default: 4, min: 1, max: 20, section: "Series", order: 25 },
    column_group_3_name: { type: "string", label: "Group 3 Name", default: "", section: "Series", order: 26 },
    column_group_3_count: { type: "number", label: "Group 3 - Number of Columns from Left", display: "number", default: 6, min: 1, max: 20, section: "Series", order: 27 },
    group_remaining_columns: { type: "boolean", label: "Group All Remaining Columns", default: false, section: "Series", order: 28 },
    remaining_columns_name: { type: "string", label: "Remaining Columns Group Name", default: "Other", section: "Series", order: 29 },
    group_header_bg_color: { type: "string", label: "Group Header Background Color", display: "color", default: "#e0e7ff", section: "Series", order: 30 },

    series_divider_comparison: { type: "string", label: "─────────────────────────────── Comparison ───────────────────────────────", display: "divider", section: "Series", order: 50 },
    enable_comparison: { type: "boolean", label: "Enable Comparison Display", default: false, section: "Series", order: 51 },
    comparison_mode: { type: "string", label: "Comparison Mode", display: "select", values: [{ "Metric vs Metric": "metric" }, { "Period over Period": "period" }], default: "metric", section: "Series", order: 52 },
    comparison_primary_field: { type: "string", label: "Primary Measure", display: "text", default: "", placeholder: "measure_name", section: "Series", order: 53 },
    comparison_secondary_field: { type: "string", label: "Secondary Measure (Metric vs Metric mode)", display: "text", default: "", placeholder: "measure_name", section: "Series", order: 54 },
    comparison_period_offset: { type: "number", label: "Period Offset (use negative for previous, e.g., -1)", display: "number", default: -1, min: -100, max: 100, section: "Series", order: 55 },
    comparison_label: { type: "string", label: "Comparison Label", display: "text", default: "vs Previous", placeholder: "vs Last Year, MoM, YoY, etc.", section: "Series", order: 56 },
    comparison_type: { type: "string", label: "Comparison Display Type", display: "select", values: [{ "Percentage": "percentage" }, { "Absolute": "absolute" }, { "Inline Bar": "bar" }, { "Both": "both" }], default: "percentage", section: "Series", order: 57 },
    show_comparison_arrows: { type: "boolean", label: "Show Comparison Arrows", default: true, section: "Series", order: 58 },
    positive_comparison_color: { type: "string", label: "Positive Comparison Color", display: "color", default: "#10b981", section: "Series", order: 59 },
    negative_comparison_color: { type: "string", label: "Negative Comparison Color", display: "color", default: "#ef4444", section: "Series", order: 60 },

    series_divider_data_chips: { type: "string", label: "─────────────────────────────── Data Chips ───────────────────────────────", display: "divider", section: "Series", order: 70 },
    enable_data_chips: { type: "boolean", label: "Enable Data Chips (Conditional Badges)", default: true, section: "Series", order: 71 },
    data_chip_fields: { type: "string", label: "Apply Chips to Fields (comma-separated)", display: "text", default: "", placeholder: "products.brand,products.category", section: "Series", order: 72 },
    chip_match_green: { type: "string", label: "Green Chip Match (String)", default: "complete,yes,active", placeholder: "Comma-separated values", section: "Series", order: 73 },
    chip_match_red: { type: "string", label: "Red Chip Match (String)", default: "cancelled,no,inactive,null", placeholder: "Comma-separated values", section: "Series", order: 74 },
    chip_match_yellow: { type: "string", label: "Yellow Chip Match (String)", default: "warning,pending", placeholder: "Comma-separated values", section: "Series", order: 75 },
    chip_match_blue: { type: "string", label: "Blue Chip Match (String)", default: "shipped,processing", placeholder: "Comma-separated values", section: "Series", order: 76 },

    subtotals_divider: { type: "string", label: "─────────────────────────────── Subtotals & Totals ───────────────────────────────", display: "divider", section: "Series", order: 80 },
    enable_subtotals: { type: "boolean", label: "Enable Subtotals", default: false, section: "Series", order: 81 },
    subtotal_dimension: { type: "string", label: "Group By Dimension (for Subtotals)", display: "select", values: [{"None": ""}], default: "", section: "Series", order: 82 },
    show_grand_total: { type: "boolean", label: "Show Grand Total Row", default: false, section: "Series", order: 83 },
    subtotal_label: { type: "string", label: "Subtotal Label Format", default: "{value}", placeholder: "Use {value} for dimension value", section: "Series", order: 84 },
    subtotal_position: { type: "string", label: "Subtotal Position", display: "select", values: [{"Top (Collapsible)": "top"}, {"Bottom": "bottom"}], default: "bottom", section: "Series", order: 85 },
    subtotal_background_color: { type: "string", label: "Subtotal Background Color", display: "color", default: "#f0f0f0", section: "Series", order: 86 },
    grand_total_label: { type: "string", label: "Grand Total Label", default: "Grand Total", section: "Series", order: 87 },
    show_grand_total_on_all_pages: { type: "boolean", label: "Show Grand Total on All Pages", default: true, section: "Series", order: 88 },

    series_divider_field_labels: { type: "string", label: "─────────────────────────────── Field Formatting ───────────────────────────────", display: "divider", section: "Series", order: 89 },
    enable_custom_field_formatting: { type: "boolean", label: "Enable Custom Field Formatting", default: false, section: "Series", order: 90 },

    // ══════════════════════════════════════════════════════════════
    // TAB: FORMATTING
    // ══════════════════════════════════════════════════════════════
    formatting_divider_theme: { type: "string", label: "─────────────────────────────── Theme ───────────────────────────────", display: "divider", section: "Formatting", order: 0 },
    table_theme: { type: "string", label: "Table Theme", display: "select", values: [{ "Modern": "modern" }, { "Classic": "classic" }, { "Minimal": "minimal" }, { "Striped": "striped" }, { "Bordered": "bordered" }, { "Compact": "compact" }], default: "modern", section: "Formatting", order: 1 },
    stripe_color: { type: "string", label: "Stripe Background Color", display: "color", default: "#f9fafb", section: "Formatting", order: 2 },
    formatting_divider_headers: { type: "string", label: "─────────────────────────────── Headers ───────────────────────────────", display: "divider", section: "Formatting", order: 10 },
    header_font_family: { type: "string", label: "Header Font Family", display: "select", values: [{ "Default": "default" }, { "Arial": "Arial, sans-serif" }, { "Helvetica": "Helvetica, sans-serif" }, { "Roboto": "Roboto, sans-serif" }], default: "default", section: "Formatting", order: 11 },
    header_font_size: { type: "number", label: "Header Font Size (px)", default: 12, display: "number", min: 8, max: 32, section: "Formatting", order: 12 },
    header_font_weight: { type: "string", label: "Header Font Weight", display: "select", values: [{ "Normal": "normal" }, { "Bold": "bold" }, { "Semi-Bold": "600" }], default: "bold", section: "Formatting", order: 13 },
    header_text_color: { type: "string", label: "Header Text Color", display: "color", default: "#1f2937", section: "Formatting", order: 14 },
    header_bg_color: { type: "string", label: "Header Background Color", display: "color", default: "#f9fafb", section: "Formatting", order: 15 },
    header_alignment: { type: "string", label: "Header Alignment", display: "select", values: [{ "Left": "left" }, { "Center": "center" }, { "Right": "right" }], default: "left", section: "Formatting", order: 16 },
    formatting_divider_cells: { type: "string", label: "─────────────────────────────── Cells ───────────────────────────────", display: "divider", section: "Formatting", order: 20 },
    cell_font_family: { type: "string", label: "Cell Font Family", display: "select", values: [{ "Default": "default" }, { "Arial": "Arial, sans-serif" }, { "Roboto": "Roboto, sans-serif" }], default: "default", section: "Formatting", order: 21 },
    cell_font_size: { type: "number", label: "Cell Font Size (px)", default: 11, display: "number", min: 8, max: 32, section: "Formatting", order: 22 },
    cell_text_color: { type: "string", label: "Cell Text Color", display: "color", default: "#374151", section: "Formatting", order: 23 },
    cell_bg_color: { type: "string", label: "Cell Background Color", display: "color", default: "#ffffff", section: "Formatting", order: 24 },
    cell_alignment: { type: "string", label: "Cell Alignment", display: "select", values: [{ "Auto": "auto" }, { "Left": "left" }, { "Center": "center" }, { "Right": "right" }], default: "auto", section: "Formatting", order: 25 },
    wrap_text: { type: "boolean", label: "Wrap Text in Cells", default: false, section: "Formatting", order: 26 },
    row_height: { type: "number", label: "Row Height (px)", default: 36, display: "number", min: 24, max: 200, section: "Formatting", order: 27 },
    formatting_divider_borders: { type: "string", label: "─────────────────────────────── Borders & Spacing ───────────────────────────────", display: "divider", section: "Formatting", order: 30 },
    show_borders: { type: "boolean", label: "Show Borders", default: true, section: "Formatting", order: 31 },
    border_style: { type: "string", label: "Border Style", display: "select", values: [{ "Solid": "solid" }, { "Dashed": "dashed" }, { "Dotted": "dotted" }], default: "solid", section: "Formatting", order: 32 },
    border_width: { type: "number", label: "Border Width (px)", default: 1, display: "number", min: 0, max: 5, section: "Formatting", order: 33 },
    border_color: { type: "string", label: "Border Color", display: "color", default: "#e5e7eb", section: "Formatting", order: 34 },
    column_spacing: { type: "number", label: "Column Spacing (px)", default: 12, display: "number", min: 0, max: 50, section: "Formatting", order: 36 },
    row_spacing: { type: "number", label: "Row Spacing (px)", default: 0, display: "number", min: 0, max: 20, section: "Formatting", order: 37 },
    formatting_divider_hover: { type: "string", label: "─────────────────────────────── Hover & Interaction ───────────────────────────────", display: "divider", section: "Formatting", order: 40 },
    enable_hover: { type: "boolean", label: "Enable Hover Effects", default: true, section: "Formatting", order: 41 },
    hover_bg_color: { type: "string", label: "Hover Background Color", display: "color", default: "#f3f4f6", section: "Formatting", order: 43 },
    enable_tooltips: { type: "boolean", label: "Enable Tooltips", default: true, section: "Formatting", order: 44 },
    formatting_divider_conditional: { type: "string", label: "─────────────────────────────── Conditional Formatting ───────────────────────────────", display: "divider", section: "Formatting", order: 50 },
    enable_row_conditional: { type: "boolean", label: "Enable Row Conditional Formatting", default: false, section: "Formatting", order: 51 },
    row_condition_field: { type: "string", label: "Row Condition Field", display: "text", default: "", section: "Formatting", order: 52 },
    row_condition_operator: { type: "string", label: "Operator", display: "select", values: [{ "Greater Than": ">" }, { "Less Than": "<" }, { "Equal To": "==" }], default: ">", section: "Formatting", order: 53 },
    row_condition_value: { type: "string", label: "Value", display: "text", default: "", section: "Formatting", order: 54 },
    row_condition_bg_color: { type: "string", label: "BG Color", display: "color", default: "#fef3c7", section: "Formatting", order: 55 },
    row_condition_text_color: { type: "string", label: "Text Color", display: "color", default: "#92400e", section: "Formatting", order: 56 }
  },

  create: function(element, config) {
    console.log('[TABLE] Advanced Table v4.15.0 - Integrated SAP BO Hierarchy');
    element.innerHTML = `
      <style>
        #advanced-table-container { width: 100%; height: 100%; overflow: auto; font-family: -apple-system, sans-serif; position: relative; }
        .pagination-controls { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: #fff; border-bottom: 1px solid #e5e7eb; }
        .pagination-controls.bottom { border-top: 1px solid #e5e7eb; border-bottom: none; }
        .pagination-buttons { display: flex; gap: 8px; }
        .pagination-button { padding: 6px 12px; border: 1px solid #d1d5db; background: #fff; border-radius: 4px; cursor: pointer; font-size: 14px; transition: all 0.2s; }
        .pagination-button:hover:not(:disabled) { background: #f3f4f6; border-color: #9ca3af; }
        .pagination-button:disabled { opacity: 0.5; cursor: not-allowed; }
        .pagination-info { font-size: 14px; color: #6b7280; }
        .filter-container { padding: 12px 16px; background: #f9fafb; border-bottom: 1px solid #e5e7eb; }
        .filter-input { width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 4px; font-size: 14px; }
        .table-wrapper { overflow: auto; position: relative; max-height: 100%; }
        table.advanced-table { width: 100%; border-collapse: separate; border-spacing: 0; background: #fff; }
        table.advanced-table tbody td { font-size: var(--cell-font-size, 11px); color: var(--cell-text-color, #374151); height: var(--row-height, 36px); padding: 0 var(--column-spacing, 12px); border: var(--show-borders, 1px) solid var(--border-color, #e5e7eb); white-space: var(--wrap-text, nowrap); overflow: hidden; text-overflow: ellipsis; }
        .subtotal-toggle { font-family: monospace; font-size: 14px; font-weight: bold; color: #666; cursor: pointer; user-select: none; display: inline-block; width: 16px; text-align: center; margin-right: 4px; }
        .subtotal-trigger-cell { display: flex; align-items: center; white-space: nowrap !important; }
        table.advanced-table thead { position: sticky; top: 0; z-index: 100; }
        table.advanced-table thead th { position: sticky; top: 0; z-index: 100; background: inherit; }
        .column-group-header { text-align: center; font-weight: 600; padding: 8px; border-bottom: 2px solid #d1d5db; }
        .sort-indicator { margin-left: 6px; font-size: 10px; color: #6b7280; }
        .subtotal-row { font-weight: 600; border-top: 2px solid #ddd; border-bottom: 1px solid #ddd; cursor: pointer; }
        .grand-total-row { background-color: #e8e8e8 !important; font-weight: 700; border-top: 3px solid #333; border-bottom: 3px solid #333; }
        .drill-link { cursor: pointer; color: inherit; text-decoration: underline; text-decoration-style: dotted; }
        .data-chip { padding: 2px 10px; border-radius: 12px; font-size: 0.85em; font-weight: 600; display: inline-block; text-align: center; }
        .chip-default { background-color: #f3f4f6; color: #374151; border: 1px solid #d1d5db; }
        .chip-green { background-color: #dcfce7; color: #166534; } .chip-red { background-color: #fee2e2; color: #991b1b; }
        .chip-yellow { background-color: #fef9c3; color: #854d0e; } .chip-blue { background-color: #dbeafe; color: #1e40af; }
        .cell-bar-container { display: flex; align-items: center; gap: 8px; width: 100%; }
        .cell-bar-background { flex: 1; height: 16px; background: #f3f4f6; border-radius: 2px; overflow: hidden; position: relative; }
        .cell-bar-fill { height: 100%; }
      </style>
      <div id="advanced-table-container"></div>
      <div class="tooltip" id="table-tooltip" style="position:fixed; display:none; background:rgba(0,0,0,0.9); color:white; padding:8px; border-radius:4px; z-index:10000; font-size:12px;"></div>
    `;
    this.container = element.querySelector("#advanced-table-container");
    this.tooltip = element.querySelector("#table-tooltip");
    this.state = { currentPage: 1, sortField: null, sortDirection: 'asc', tableFilter: '', columnFilters: {}, collapsedGroups: {}, lastSubtotalDimension: null, data: [] };
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    this.clearErrors();
    if (!queryResponse || !queryResponse.fields || !data || data.length === 0) { done(); return; }

    const allFields = queryResponse.fields.dimension_like.concat(queryResponse.fields.measure_like);
    const dims = queryResponse.fields.dimension_like;

    // Register options (Subtotal dropdown + Field Labels)
    if (dims.length > 0) {
      this.options.subtotal_dimension.values = [{"None": ""}, ...dims.map(d => ({[d.label_short || d.label]: d.name}))];
    }
    allFields.forEach((field, idx) => {
      const baseOrder = 89 + (idx * 3);
      if (!this.options[`field_label_${field.name}`]) {
        this.options[`field_divider_${field.name}`] = { type: "string", label: `━━━ ${field.label_short || field.label} ━━━`, display: "divider", section: "Series", order: baseOrder };
        this.options[`field_label_${field.name}`] = { type: "string", label: "Label", display: "text", default: field.label_short || field.label, section: "Series", order: baseOrder + 1 };
        this.options[`field_format_${field.name}`] = { type: "string", label: "Value Format", display: "text", default: "", section: "Series", order: baseOrder + 2 };
      }
    });

    this.trigger('registerOptions', this.options);
    this.state.data = data;
    this.queryResponse = queryResponse;
    const parsedConfig = this.parseConfig(config);

    // AUTO-COLLAPSE RESET
    const currentKey = parsedConfig.enable_bo_hierarchy ? parsedConfig.hierarchy_dimensions : parsedConfig.subtotal_dimension;
    if (currentKey && this.state.lastSubtotalDimension !== currentKey) {
        this.state.collapsedGroups = {};
        this.state.lastSubtotalDimension = currentKey;
        this.state.forceInitialCollapse = true;
        this.state.currentPage = 1;
    }

    let filteredData = this.applyFilters(data, parsedConfig);
    if (this.state.sortField) filteredData = this.sortData(filteredData, this.state.sortField, this.state.sortDirection);

    // ROUTE: BO HIERARCHY vs STANDARD SUBTOTALS
    if (parsedConfig.enable_bo_hierarchy && parsedConfig.hierarchy_dimensions) {
      const hierarchyList = parsedConfig.hierarchy_dimensions.split(',').map(f => f.trim());
      filteredData = this.calculateSubtotalsRecursive(filteredData, hierarchyList, queryResponse.fields.measure_like);
      if (this.state.forceInitialCollapse) {
        filteredData.forEach(row => { if (row.__isSubtotal) this.state.collapsedGroups[row.__groupValue] = true; });
        this.state.forceInitialCollapse = false;
      }
      filteredData = this.applyHierarchyPathFilter(filteredData);
    } else if (parsedConfig.enable_subtotals && parsedConfig.subtotal_dimension) {
      filteredData = this.calculateStandardSubtotals(filteredData, parsedConfig.subtotal_dimension, queryResponse.fields.measure_like, parsedConfig, dims);
      if (parsedConfig.subtotal_position === 'top') {
        if (this.state.forceInitialCollapse) {
          filteredData.forEach(row => { if (row.__isSubtotal) this.state.collapsedGroups[row.__groupValue] = true; });
          this.state.forceInitialCollapse = false;
        }
        filteredData = filteredData.filter(row => row.__isSubtotal ? true : !this.state.collapsedGroups[row.__parentGroup]);
      }
    }

    if (parsedConfig.show_grand_total) {
      filteredData.push(this.calculateGrandTotal(data, queryResponse.fields.measure_like, parsedConfig, dims));
    }

    // PAGINATION SLICE
    let dataWithoutGT = filteredData.filter(r => !r.__isGrandTotal);
    let gtRow = filteredData.find(r => r.__isGrandTotal);
    const totalPages = Math.max(1, Math.ceil(dataWithoutGT.length / parsedConfig.page_size));
    if (this.state.currentPage > totalPages) this.state.currentPage = totalPages;

    const start = (this.state.currentPage - 1) * parsedConfig.page_size;
    let pageData = parsedConfig.enable_pagination ? dataWithoutGT.slice(start, start + parsedConfig.page_size) : dataWithoutGT;
    if (gtRow && parsedConfig.show_grand_total_on_all_pages) pageData.push(gtRow);

    this.renderTable(pageData, filteredData.length, totalPages, parsedConfig, queryResponse);
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
      const label = (config.subtotal_label || "{value}").replace("{value}", key === 'null' ? '∅' : key);
      sub[field] = { value: label, rendered: label };
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

  applyHierarchyPathFilter: function(data) {
    return data.filter(row => {
      const pathParts = String(row.__isSubtotal ? row.__groupValue : row.__parentGroup || "").split('|');
      let currentPath = "";
      const stop = row.__isSubtotal ? pathParts.length - 1 : pathParts.length;
      for (let i = 0; i < stop; i++) {
        currentPath = currentPath ? `${currentPath}|${pathParts[i]}` : pathParts[i];
        if (this.state.collapsedGroups[currentPath]) return false;
      }
      return true;
    });
  },

  calculateGrandTotal: function(rawData, measures, config, dimensions) {
    const total = { __isGrandTotal: true };
    const label = config.grand_total_label || 'Grand Total';
    if (dimensions.length > 0) total[dimensions[0].name] = { value: label, rendered: label };
    measures.forEach(m => {
      let sum = rawData.reduce((acc, r) => acc + Number((r[m.name]?.value || r[m.name]) || 0), 0);
      total[m.name] = { value: sum, rendered: sum.toLocaleString(undefined, {minimumFractionDigits:2}) };
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
      --cell-text-color: ${config.cell_text_color}; --show-borders: ${config.show_borders ? config.border_width : 0}px;
      --border-color: ${config.border_color}; --wrap-text: ${config.wrap_text ? 'normal' : 'nowrap'};
    } .subtotal-row { background-color: ${config.subtotal_background_color} !important; }`;
    document.head.appendChild(styleTag);

    if (config.enable_pagination && (config.pagination_position === 'top' || config.pagination_position === 'both')) {
      html += this.renderPagination(totalVisibleRows, totalPages, config, 'top');
    }
    if (config.enable_table_filter) {
      html += `<div class="filter-container"><input type="text" id="table-filter-input" class="filter-input" placeholder="Search... (Enter)" value="${this.state.tableFilter || ''}"></div>`;
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

  renderBody: function(pageData, config, queryResponse) {
    const fields = queryResponse.fields.dimension_like.concat(queryResponse.fields.measure_like);
    const hDims = config.enable_bo_hierarchy ? (config.hierarchy_dimensions || "").split(',').map(f => f.trim()) : [];
    const mainTreeCol = hDims[0] || config.subtotal_dimension;
    let html = '<tbody>';

    pageData.forEach((row, i) => {
      const isSub = !!row.__isSubtotal, isGT = !!row.__isGrandTotal;
      const level = row.__level || 0;
      html += `<tr class="${isGT?'grand-total-row':(isSub?'subtotal-row':'detail-row')}" data-group="${row.__groupValue || ''}">`;
      if (config.show_row_numbers) html += `<td class="row-number-cell">${(isSub||isGT)?'':((this.state.currentPage-1)*config.page_size)+i+1}</td>`;

      fields.forEach((f, idx) => {
        if (config.enable_bo_hierarchy && hDims.includes(f.name) && f.name !== mainTreeCol) return;
        let content = this.renderCellContent(row[f.name], f, config, row, i, pageData);
        let style = (idx < config.freeze_columns) ? 'position:sticky; left:0; z-index:1; background:inherit;' : '';

        if (f.name === mainTreeCol) {
          style += `padding-left: ${(level * 20) + 12}px;`;
          if (isSub) content = `<span class="subtotal-toggle">${this.state.collapsedGroups[row.__groupValue] ? '▶' : '▼'}</span>${content}`;
        }
        html += `<td style="${style}" class="${isSub && f.name === mainTreeCol ? 'subtotal-trigger-cell' : ''}">${content}</td>`;
      });
      html += '</tr>';
    });
    return html + '</tbody>';
  },

  renderCellContent: function(cell, field, config, row, rowIdx, data) {
    let val = cell, rendered = cell, links = [];
    if (cell && typeof cell === 'object') { val = cell.value; rendered = cell.rendered || cell.value; links = cell.links || []; }
    if (val === null || val === undefined) return '∅';

    // Data Chip Logic
    if (config.enable_data_chips && (config.data_chip_fields || "").split(',').map(x=>x.trim()).includes(field.name)) {
      const s = String(val).toLowerCase();
      let c = "chip-default";
      if ((config.chip_match_green || "").split(',').map(x=>x.trim().toLowerCase()).includes(s)) c = "chip-green";
      else if ((config.chip_match_red || "").split(',').map(x=>x.trim().toLowerCase()).includes(s)) c = "chip-red";
      else if ((config.chip_match_yellow || "").split(',').map(x=>x.trim().toLowerCase()).includes(s)) c = "chip-yellow";
      else if ((config.chip_match_blue || "").split(',').map(x=>x.trim().toLowerCase()).includes(s)) c = "chip-blue";
      rendered = `<span class="data-chip ${c}">${rendered}</span>`;
    }

    // Cell Bar Logic
    if (config.enable_cell_bars_1 && (config.cell_bar_fields_1 || "").split(',').map(x=>x.trim()).includes(field.name)) {
      rendered = `<div class="cell-bar-container"><div class="cell-bar-background"><div class="cell-bar-fill" style="width:50%; background:${config.cell_bar_color_1};"></div></div><span>${rendered}</span></div>`;
    }

    // Comparison logic
    if (config.enable_comparison && config.comparison_primary_field === field.name) {
       rendered = this.renderComparison(row, config, links, rowIdx, data);
    }

    return rendered;
  },

  renderComparison: function(row, config, links, rowIdx, data) {
    const primaryCell = row[config.comparison_primary_field];
    if (!primaryCell || row.__isGrandTotal) return primaryCell?.rendered || primaryCell || '';
    const primary = parseFloat(primaryCell.value || primaryCell);
    let secondary = 0;
    if (config.comparison_mode === 'metric') {
      const sc = row[config.comparison_secondary_field];
      secondary = parseFloat(sc?.value || sc || 0);
    } else if (data && rowIdx > 0) {
      const isSub = !!row.__isSubtotal;
      const likeRows = data.filter(r => !!r.__isSubtotal === isSub && !r.__isGrandTotal);
      const currIdx = likeRows.indexOf(row);
      const compRow = likeRows[currIdx - config.comparison_period_offset];
      secondary = parseFloat(compRow?.[config.comparison_primary_field]?.value || 0);
    }
    if (isNaN(secondary) || secondary === 0) return primaryCell.rendered || primary;
    const diff = primary - secondary;
    const pct = ((diff / Math.abs(secondary)) * 100).toFixed(1);
    const color = diff >= 0 ? config.positive_comparison_color : config.negative_comparison_color;
    const arrow = config.show_comparison_arrows ? (diff >= 0 ? '↑' : '↓') : '';
    return `<span>${primaryCell.rendered || primary}</span> <span style="color:${color}; font-size:0.85em; margin-left:5px;">${arrow} ${Math.abs(pct)}%</span>`;
  },

  attachEventListeners: function(config) {
    const self = this;

    // Delegation for Hierarchy/Subtotal Toggles
    this.container.onclick = (e) => {
        const toggle = e.target.closest('.subtotal-toggle') || e.target.closest('.subtotal-row');
        if (toggle) {
            const row = toggle.closest('tr');
            const g = row.dataset.group;
            if (self.state.collapsedGroups[g]) delete self.state.collapsedGroups[g];
            else self.state.collapsedGroups[g] = true;
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

    // Filter Enter Key
    const fi = this.container.querySelector('#table-filter-input');
    if (fi) fi.onkeypress = (e) => { if (e.key === 'Enter') { self.state.tableFilter = fi.value; self.state.currentPage = 1; self.updateAsync(self.state.data, self.container.parentElement, config, self.queryResponse, {}, () => {}); } };

    if (config.enable_hover) {
      this.container.querySelectorAll('tbody tr').forEach(tr => {
        tr.onmouseenter = () => tr.style.backgroundColor = config.hover_bg_color;
        tr.onmouseleave = () => tr.style.backgroundColor = '';
      });
    }
  },

  parseConfig: function(config) { return config; },
  applyFilters: function(data, config) {
    if (!this.state.tableFilter) return data;
    const s = this.state.tableFilter.toLowerCase();
    return data.filter(r => Object.values(r).some(v => String(v?.value || v).toLowerCase().includes(s)));
  },
  sortData: function(data) { return data; },
  renderPagination: function(totalRows, totalPages, config, pos) {
    const curr = this.state.currentPage;
    return `<div class="pagination-controls ${pos}"><div class="pagination-info">Showing ${totalRows} rows</div><div class="pagination-buttons">
      <button class="pagination-button" data-action="first" ${curr===1?'disabled':''}>⟨⟨</button>
      <button class="pagination-button" data-action="prev" ${curr===1?'disabled':''}>⟨</button>
      <span style="padding:0 10px;">Page ${curr} of ${totalPages}</span>
      <button class="pagination-button" data-action="next" ${curr===totalPages?'disabled':''}>⟩</button>
      <button class="pagination-button" data-action="last" ${curr===totalPages?'disabled':''}>⟩⟩</button>
    </div></div>`;
  },
  renderHeaders: function(config, queryResponse) {
    const fields = queryResponse.fields.dimension_like.concat(queryResponse.fields.measure_like);
    const hDims = config.enable_bo_hierarchy ? (config.hierarchy_dimensions || "").split(',').map(f => f.trim()) : [];
    let html = '<thead><tr style="background:#f9fafb">';
    if (config.show_row_numbers) html += '<th>#</th>';
    fields.forEach((f, idx) => {
      if (config.enable_bo_hierarchy && hDims.includes(f.name) && f.name !== hDims[0]) return;
      const label = config[`field_label_${f.name}`] || f.label_short || f.label;
      const sticky = (idx < config.freeze_columns) ? 'position:sticky; left:0; z-index:101; background:#f9fafb;' : '';
      html += `<th style="${sticky}">${label}</th>`;
    });
    return html + '</tr></thead>';
  },
  renderColumnGroups: function(config, queryResponse) {
    const fields = queryResponse.fields.dimension_like.concat(queryResponse.fields.measure_like);
    let html = '<thead><tr>';
    if (config.show_row_numbers) html += '<th rowspan="2">#</th>';
    const c1 = config.column_group_1_count;
    if (config.column_group_1_name && c1 > 0) {
      html += `<th colspan="${c1}" class="column-group-header" style="background:${config.group_header_bg_color}">${config.column_group_1_name}</th>`;
      html += `<th colspan="${fields.length - c1}" class="column-group-header">Other</th>`;
    }
    return html + '</tr></thead>';
  },
  trigger: function() {},
  clearErrors: function() {}
};

looker.plugins.visualizations.add(visObject);

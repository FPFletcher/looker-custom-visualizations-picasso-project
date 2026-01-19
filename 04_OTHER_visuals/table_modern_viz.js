/**
 * Advanced Table Visualization for Looker
 * Version: 23.0
 * Base: 22.0 (Stable)
 * Fixes: Frozen Column Striping (Sticky Background Logic)
 */

const visObject = {
  id: "advanced_table_visual_v23_0",
  label: "Advanced Table v23.0",
  options: {
    // ══════════════════════════════════════════════════════════════
    // TAB: PLOT
    // ══════════════════════════════════════════════════════════════
    plot_divider_display: { type: "string", label: "━━━ Display ━━━", display: "divider", section: "Plot", order: 0 },
    show_row_numbers: { type: "boolean", label: "Show Row Numbers", default: false, section: "Plot", order: 1 },
    show_headers: { type: "boolean", label: "Show Headers", default: true, section: "Plot", order: 2 },

    plot_divider_pagination: { type: "string", label: "━━━ Pagination ━━━", display: "divider", section: "Plot", order: 10 },
    enable_pagination: { type: "boolean", label: "Enable Pagination", default: true, section: "Plot", order: 11 },
    page_size: { type: "number", label: "Page Size", default: 25, display: "number", section: "Plot", order: 12 },
    pagination_position: { type: "string", label: "Position", display: "select", values: [{ "Top": "top" }, { "Bottom": "bottom" }, { "Both": "both" }], default: "bottom", section: "Plot", order: 13 },
    dynamic_pagination: { type: "boolean", label: "Dynamic Pagination (Respects Subtotals)", default: true, section: "Plot", order: 14 },

    plot_divider_pivot: { type: "string", label: "━━━ Pivot Settings ━━━", display: "divider", section: "Plot", order: 20 },
    pivot_show_row_totals: { type: "boolean", label: "Show Row Totals", default: false, section: "Plot", order: 23 },
    pivot_row_total_label: { type: "string", label: "Row Total Label", default: "Total", section: "Plot", order: 24 },

    plot_divider_hierarchy: { type: "string", label: "━━━ Hierarchy & Subtotals ━━━", display: "divider", section: "Plot", order: 30 },
    enable_bo_hierarchy: { type: "boolean", label: "Enable BO-Style Hierarchy", default: false, section: "Plot", order: 31 },
    hierarchy_dimensions: { type: "string", label: "Hierarchy Levels (comma-sep)", display: "text", default: "", placeholder: "brand,category", section: "Plot", order: 32 },
    bo_hierarchy_bold: { type: "boolean", label: "Bold Font for Hierarchy", default: true, section: "Plot", order: 33 },
    enable_subtotals: { type: "boolean", label: "Enable Standard Subtotals", default: false, section: "Plot", order: 34 },
    subtotal_dimension: { type: "string", label: "Subtotal Group Dimension", display: "select", values: [{ "None": "" }], default: "", section: "Plot", order: 35 },
    standard_subtotal_bold: { type: "boolean", label: "Bold Font for Subtotals", default: true, section: "Plot", order: 36 },
    show_grand_total: { type: "boolean", label: "Show Grand Total Row", default: false, section: "Plot", order: 37 },
    grand_total_label: { type: "string", label: "Grand Total Label", default: "Grand Total", section: "Plot", order: 39 },

    plot_divider_grouping: { type: "string", label: "━━━ Column Grouping ━━━", display: "divider", section: "Plot", order: 40 },
    enable_column_groups: { type: "boolean", label: "Enable Grouping", default: false, section: "Plot", order: 41 },
    column_group_1_name: { type: "string", label: "Group 1 Name", default: "", section: "Plot", order: 42 },
    column_group_1_count: { type: "number", label: "Group 1 Count", default: 1, section: "Plot", order: 43 },
    column_group_2_name: { type: "string", label: "Group 2 Name", default: "", section: "Plot", order: 44 },
    column_group_2_count: { type: "number", label: "Group 2 Count", default: 1, section: "Plot", order: 45 },
    group_remaining_columns: { type: "boolean", label: "Group Remaining Columns", default: false, section: "Plot", order: 46 },
    remaining_columns_name: { type: "string", label: "Remaining Name", default: "Other", section: "Plot", order: 47 },
    group_header_bg_color: { type: "string", label: "Group Header BG Color", display: "color", default: "#8dc6ff", section: "Plot", order: 48 },

    plot_divider_filtering: { type: "string", label: "━━━ Filtering ━━━", display: "divider", section: "Plot", order: 50 },
    enable_table_filter: { type: "boolean", label: "Enable Table-Level Filter", default: false, section: "Plot", order: 51 },
    enable_column_filters: { type: "boolean", label: "Enable Column Filters", default: false, section: "Plot", order: 52 },

    plot_divider_freezing: { type: "string", label: "━━━ Freezing ━━━", display: "divider", section: "Plot", order: 60 },
    freeze_first_column: { type: "boolean", label: "Freeze First Column", default: true, section: "Plot", order: 61 },
    freeze_header_row: { type: "boolean", label: "Freeze Header Row", default: true, section: "Plot", order: 62 },

    // ══════════════════════════════════════════════════════════════
    // TAB: SERIES (Cell Bars & Heatmaps)
    // ══════════════════════════════════════════════════════════════
    cell_bars_divider: { type: "string", label: "━━━ Cell Bars & Heatmap ━━━", display: "divider", section: "Series", order: 0 },

    heatmap_mode: {
      type: "string",
      label: "Heatmap Scale Mode",
      display: "select",
      values: [
        { "Overall (Global Min/Max)": "overall" },
        { "Per Column (Sensistive to Pivot)": "column" },
        { "Per Peer Group (Hierarchy Sensitive)": "peer" }
      ],
      default: "peer",
      section: "Series",
      order: 0.5
    },

    enable_cell_bars_1: { type: "boolean", label: "Enable Set 1", default: false, section: "Series", order: 1 },
    cell_bar_mode_1: { type: "string", label: "Mode 1", display: "select", values: [{ "Bar Chart": "bar" }, { "Heatmap": "heatmap" }], default: "bar", section: "Series", order: 1.5 },
    cell_bar_fields_1: { type: "string", label: "Fields 1", display: "text", default: "", section: "Series", order: 2 },
    cell_bar_color_1: { type: "string", label: "Color 1 (Start)", display: "color", default: "#3b82f6", section: "Series", order: 3 },
    use_gradient_1: { type: "boolean", label: "Use Gradient 1", default: false, section: "Series", order: 4 },
    gradient_end_1: { type: "string", label: "Gradient End 1 (End)", display: "color", default: "#93c5fd", section: "Series", order: 5 },
    heatmap_text_color_1: { type: "string", label: "Heatmap Text Color 1", display: "color", default: "#ffffff", section: "Series", order: 5.5 },

    enable_cell_bars_2: { type: "boolean", label: "Enable Set 2", default: false, section: "Series", order: 6 },
    cell_bar_mode_2: { type: "string", label: "Mode 2", display: "select", values: [{ "Bar Chart": "bar" }, { "Heatmap": "heatmap" }], default: "bar", section: "Series", order: 6.5 },
    cell_bar_fields_2: { type: "string", label: "Fields 2", display: "text", default: "", section: "Series", order: 7 },
    cell_bar_color_2: { type: "string", label: "Color 2 (Start)", display: "color", default: "#10b981", section: "Series", order: 8 },
    use_gradient_2: { type: "boolean", label: "Use Gradient 2", default: false, section: "Series", order: 8.5 },
    gradient_end_2: { type: "string", label: "Gradient End 2 (End)", display: "color", default: "#6ee7b7", section: "Series", order: 9 },
    heatmap_text_color_2: { type: "string", label: "Heatmap Text Color 2", display: "color", default: "#ffffff", section: "Series", order: 9.5 },

    cell_bar_fit_content: { type: "boolean", label: "Fit Bars to Content (Smart Sizing)", default: true, section: "Series", order: 10 },

    comparison_divider: { type: "string", label: "━━━ Comparison ━━━", display: "divider", section: "Series", order: 50 },
    enable_comparison: { type: "boolean", label: "Enable Comparison", default: false, section: "Series", order: 51 },
    comparison_mode: { type: "string", label: "Mode", display: "select", values: [{ "Metric vs Metric": "metric" }, { "Period over Period": "period" }], default: "metric", section: "Series", order: 52 },
    comparison_primary_field: { type: "string", label: "Primary Field", display: "text", default: "", section: "Series", order: 53 },
    comparison_secondary_field: { type: "string", label: "Secondary Field", display: "text", default: "", section: "Series", order: 54 },
    comparison_period_offset: { type: "number", label: "Period Offset", default: -1, section: "Series", order: 55 },
    show_comparison_arrows: { type: "boolean", label: "Show Arrows", default: true, section: "Series", order: 56 },
    positive_comparison_color: { type: "string", label: "Pos Color", display: "color", default: "#10b981", section: "Series", order: 57 },
    negative_comparison_color: { type: "string", label: "Neg Color", display: "color", default: "#ef4444", section: "Series", order: 58 },

    field_formatting_divider: { type: "string", label: "━━━ Field Formatting ━━━", display: "divider", section: "Series", order: 100 },
    enable_custom_field_formatting: { type: "boolean", label: "Enable Custom Field Formatting", default: true, section: "Series", order: 101 },

    // ══════════════════════════════════════════════════════════════
    // TAB: DATA CHIPS
    // ══════════════════════════════════════════════════════════════
    chips_divider: { type: "string", label: "━━━ Data Chips ━━━", display: "divider", section: "Series", order: 150 },
    enable_data_chips: { type: "boolean", label: "Enable Data Chips", default: false, section: "Series", order: 151 },
    data_chip_fields: { type: "string", label: "Apply to Fields (comma-sep)", default: "", section: "Series", order: 152 },
    chip_default_bg: { type: "string", label: "Default Chip BG", display: "color", default: "#e5e7eb", section: "Series", order: 152.1 },
    chip_default_text: { type: "string", label: "Default Chip Text", display: "color", default: "#1f2937", section: "Series", order: 152.2 },
    chip_match_green: { type: "string", label: "Chip 01 Match Values", default: "Complete,Success,Yes", section: "Series", order: 153 },
    chip_bg_green: { type: "string", label: "Chip 01 BG", display: "color", default: "#dcfce7", section: "Series", order: 154 },
    chip_text_green: { type: "string", label: "Chip 01 Text", display: "color", default: "#166534", section: "Series", order: 155 },
    chip_match_yellow: { type: "string", label: "Chip 02 Match Values", default: "Pending,Warning,Maybe", section: "Series", order: 156 },
    chip_bg_yellow: { type: "string", label: "Chip 02 BG", display: "color", default: "#fef9c3", section: "Series", order: 157 },
    chip_text_yellow: { type: "string", label: "Chip 02 Text", display: "color", default: "#854d0e", section: "Series", order: 158 },
    chip_match_red: { type: "string", label: "Chip 03 Match Values", default: "Failed,Error,No", section: "Series", order: 159 },
    chip_bg_red: { type: "string", label: "Chip 03 BG", display: "color", default: "#fee2e2", section: "Series", order: 160 },
    chip_text_red: { type: "string", label: "Chip 03 Text", display: "color", default: "#991b1b", section: "Series", order: 161 },

    // ══════════════════════════════════════════════════════════════
    // TAB: FORMATTING
    // ══════════════════════════════════════════════════════════════
    formatting_divider_theme: { type: "string", label: "━━━ Theme ━━━", display: "divider", section: "Formatting", order: 0 },
    table_theme: {
      type: "string",
      label: "Table Theme",
      display: "select",
      values: [
        { "Custom": "custom" },
        { "Google (Blue/Gray)": "google" },
        { "Looker (Charcoal/Purple)": "looker" },
        { "Professional (Gray/Blue)": "professional" },
        { "Ocean (Blues)": "ocean" },
        { "Forest (Greens)": "forest" },
        { "Red (Maroon)": "red" },
        { "Yellow (Gold)": "yellow" },
        { "Dark Mode": "dark" }
      ],
      default: "custom",
      section: "Formatting",
      order: 1
    },
    enable_striping: { type: "boolean", label: "Enable Striping", default: true, section: "Formatting", order: 1.5 },
    stripe_color: { type: "string", label: "Stripe color", display: "color", default: "#f9fafb", section: "Formatting", order: 2 },

    formatting_divider_headers: { type: "string", label: "━━━ Headers ━━━", display: "divider", section: "Formatting", order: 10 },
    header_font_family: { type: "string", label: "Header Font Family", display: "text", default: "inherit", section: "Formatting", order: 10.5 },
    header_font_weight: { type: "string", label: "Header Font Weight", display: "select", values: [{ "Normal": "normal" }, { "Bold": "bold" }, { "600": "600" }, { "700": "700" }], default: "bold", section: "Formatting", order: 10.6 },
    header_font_size: { type: "number", label: "Header Font Size (px)", default: 12, section: "Formatting", order: 11 },
    header_text_color: { type: "string", label: "Header Text Color", display: "color", default: "#1f2937", section: "Formatting", order: 12 },
    header_bg_color: { type: "string", label: "Header Background Color", display: "color", default: "#f9fafb", section: "Formatting", order: 13 },

    formatting_divider_totals: { type: "string", label: "━━━ Totals ━━━", display: "divider", section: "Formatting", order: 15 },
    subtotal_background_color: { type: "string", label: "Subtotal BG Color", display: "color", default: "#f0f0f0", section: "Formatting", order: 16 },
    pivot_row_total_bg: { type: "string", label: "Pivot Row Total BG", display: "color", default: "#f3f4f6", section: "Formatting", order: 17 },
    pivot_total_bg_color: { type: "string", label: "Pivot Total BG (Bottom)", display: "color", default: "#e0e7ff", section: "Formatting", order: 18 },
    pivot_total_text_color: { type: "string", label: "Pivot Total Text (Bottom)", display: "color", default: "#3730a3", section: "Formatting", order: 19 },

    formatting_divider_cells: { type: "string", label: "━━━ Cells ━━━", display: "divider", section: "Formatting", order: 20 },
    null_measure_value: { type: "string", label: "Null Measure Value", default: "-", section: "Formatting", order: 20.1 },
    null_dimension_value: { type: "string", label: "Null Dimension Value", default: "", section: "Formatting", order: 20.2 },
    cell_bg_color: { type: "string", label: "Cell Background Color", display: "color", default: "#ffffff", section: "Formatting", order: 20.3 },
    cell_font_family: { type: "string", label: "Cell Font Family", display: "text", default: "inherit", section: "Formatting", order: 20.5 },
    cell_font_size: { type: "number", label: "Cell Size (px)", default: 11, section: "Formatting", order: 21 },
    cell_text_color: { type: "string", label: "Cell Text Color", display: "color", default: "#374151", section: "Formatting", order: 22 },
    row_height: { type: "number", label: "Row Height (px)", default: 36, section: "Formatting", order: 23 },
    column_spacing: { type: "number", label: "Col Spacing (px)", default: 12, section: "Formatting", order: 24 },
    wrap_text: { type: "boolean", label: "Wrap Text", default: false, section: "Formatting", order: 25 },

    formatting_divider_borders: { type: "string", label: "━━━ Borders ━━━", display: "divider", section: "Formatting", order: 30 },
    show_borders: { type: "boolean", label: "Show Borders", default: true, section: "Formatting", order: 31 },
    border_color: { type: "string", label: "Border Color", display: "color", default: "#e5e7eb", section: "Formatting", order: 32 },

    formatting_divider_hover: { type: "string", label: "━━━ Hover ━━━", display: "divider", section: "Formatting", order: 40 },
    enable_hover: { type: "boolean", label: "Enable Hover", default: true, section: "Formatting", order: 41 },
    hover_bg_color: { type: "string", label: "Hover Color", display: "color", default: "#f3f4f6", section: "Formatting", order: 42 },

    formatting_divider_row_formatting: { type: "string", label: "━━━ Row Conditional Formatting ━━━", display: "divider", section: "Formatting", order: 50 },
    enable_row_conditional_formatting: { type: "boolean", label: "Enable Row Formatting", default: false, section: "Formatting", order: 51 },
    row_conditional_field: { type: "string", label: "Row Condition Fields (comma-sep)", display: "text", default: "", section: "Formatting", order: 52 },
    row_rule_1_operator: { type: "string", label: "Row Rule 1 Operator", display: "select", values: [{ "None": "" }, { ">": ">" }, { ">=": ">=" }, { "<": "<" }, { "<=": "<=" }, { "=": "=" }, { "≠": "!=" }, { "Contains": "contains" }], default: "", section: "Formatting", order: 53 },
    row_rule_1_value: { type: "string", label: "Row Rule 1 Value", display: "text", default: "", section: "Formatting", order: 54 },
    row_rule_1_bg: { type: "string", label: "Row Rule 1 BG", display: "color", default: "#dcfce7", section: "Formatting", order: 55 },
    row_rule_2_operator: { type: "string", label: "Row Rule 2 Operator", display: "select", values: [{ "None": "" }, { ">": ">" }, { ">=": ">=" }, { "<": "<" }, { "<=": "<=" }, { "=": "=" }, { "≠": "!=" }, { "Contains": "contains" }], default: "", section: "Formatting", order: 56 },
    row_rule_2_value: { type: "string", label: "Row Rule 2 Value", display: "text", default: "", section: "Formatting", order: 57 },
    row_rule_2_bg: { type: "string", label: "Row Rule 2 BG", display: "color", default: "#fee2e2", section: "Formatting", order: 58 },

    conditional_formatting_divider: { type: "string", label: "━━━ Column Conditional Formatting ━━━", display: "divider", section: "Formatting", order: 60 },
    enable_conditional_formatting: { type: "boolean", label: "Enable Column Formatting", default: false, section: "Formatting", order: 61 },
    conditional_field: { type: "string", label: "Target Fields (comma-sep)", display: "text", default: "", section: "Formatting", order: 62 },
    conditional_rule_1_operator: { type: "string", label: "Col Rule 1 Operator", display: "select", values: [{ "None": "" }, { ">": ">" }, { ">=": ">=" }, { "<": "<" }, { "<=": "<=" }, { "=": "=" }, { "≠": "!=" }, { "Contains": "contains" }], default: "", section: "Formatting", order: 63 },
    conditional_rule_1_value: { type: "string", label: "Col Rule 1 Value", display: "text", default: "", section: "Formatting", order: 64 },
    conditional_rule_1_bg: { type: "string", label: "Col Rule 1 BG Color", display: "color", default: "#dcfce7", section: "Formatting", order: 65 },
    conditional_rule_1_text: { type: "string", label: "Col Rule 1 Text Color", display: "color", default: "#166534", section: "Formatting", order: 66 },

    conditional_rule_2_operator: { type: "string", label: "Col Rule 2 Operator", display: "select", values: [{ "None": "" }, { ">": ">" }, { ">=": ">=" }, { "<": "<" }, { "<=": "<=" }, { "=": "=" }, { "≠": "!=" }, { "Contains": "contains" }], default: "", section: "Formatting", order: 67 },
    conditional_rule_2_value: { type: "string", label: "Col Rule 2 Value", display: "text", default: "", section: "Formatting", order: 68 },
    conditional_rule_2_bg: { type: "string", label: "Col Rule 2 BG Color", display: "color", default: "#fee2e2", section: "Formatting", order: 69 },
    conditional_rule_2_text: { type: "string", label: "Col Rule 2 Text Color", display: "color", default: "#991b1b", section: "Formatting", order: 70 },
  },

  // ══════════════════════════════════════════════════════════════
  // HELPER FUNCTIONS
  // ══════════════════════════════════════════════════════════════
  hexToRgb: function (hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : null;
  },

  componentToHex: function (c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  },

  rgbToHex: function (r, g, b) {
    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  },

  interpolateColor: function (color1, color2, factor) {
    if (factor === undefined) factor = 0.5;
    var c1 = this.hexToRgb(color1) || { r: 0, g: 0, b: 0 };
    var c2 = this.hexToRgb(color2) || { r: 255, g: 255, b: 255 };
    var r = Math.round(c1.r + factor * (c2.r - c1.r));
    var g = Math.round(c1.g + factor * (c2.g - c1.g));
    var b = Math.round(c1.b + factor * (c2.b - c1.b));
    return this.rgbToHex(r, g, b);
  },

  themes: {
    google: { headerBg: '#4285F4', headerText: '#ffffff', pivotTotalBg: '#E8F0FE', pivotTotalText: '#1967D2', border: '#DADCE0', rowBg: '#ffffff', stripe: '#F8F9FA', cellText: '#202124', subtotalBg: '#F1F3F4' },
    looker: { headerBg: '#2d1e59', headerText: '#ffffff', pivotTotalBg: '#592ec2', pivotTotalText: '#ffffff', border: '#e6e6e6', rowBg: '#ffffff', stripe: '#f5f5f5', cellText: '#262d33', subtotalBg: '#e8e8e8' },
    professional: { headerBg: '#e2e8f0', headerText: '#1e293b', pivotTotalBg: '#cbd5e1', pivotTotalText: '#0f172a', border: '#cbd5e1', rowBg: '#ffffff', stripe: '#f8fafc', cellText: '#334155', subtotalBg: '#f1f5f9' },
    ocean: { headerBg: '#dbeafe', headerText: '#1e40af', pivotTotalBg: '#bfdbfe', pivotTotalText: '#172554', border: '#93c5fd', rowBg: '#ffffff', stripe: '#eff6ff', cellText: '#1e3a8a', subtotalBg: '#e0f2fe' },
    forest: { headerBg: '#dcfce7', headerText: '#166534', pivotTotalBg: '#bbf7d0', pivotTotalText: '#14532d', border: '#86efac', rowBg: '#ffffff', stripe: '#f0fdf4', cellText: '#14532d', subtotalBg: '#dcfce7' },
    red: { headerBg: '#fee2e2', headerText: '#991b1b', pivotTotalBg: '#fecaca', pivotTotalText: '#7f1d1d', border: '#fca5a5', rowBg: '#ffffff', stripe: '#fef2f2', cellText: '#7f1d1d', subtotalBg: '#fee2e2' },
    yellow: { headerBg: '#fef9c3', headerText: '#854d0e', pivotTotalBg: '#fde047', pivotTotalText: '#713f12', border: '#fde047', rowBg: '#ffffff', stripe: '#fefce8', cellText: '#713f12', subtotalBg: '#fef9c3' },
    dark: { headerBg: '#1f2937', headerText: '#f9fafb', pivotTotalBg: '#374151', pivotTotalText: '#f3f4f6', border: '#4b5563', rowBg: '#111827', stripe: '#1f2937', cellText: '#f3f4f6', cellBg: '#111827', subtotalBg: '#374151' }
  },

  create: function (element, config) {
    this.container = element.appendChild(document.createElement("div"));
    this.container.id = "advanced-table-container";
    this.state = {
      currentPage: 1,
      sortField: null,
      sortDirection: 'asc',
      sortPivotKey: null,
      collapsedGroups: {},
      lastSubtotalDimension: null,
      data: [],
      grandTotalRow: null,
      fullProcessedData: [],
      columnWidths: {}
    };
  },

  updateAsync: function (data, element, config, queryResponse, details, done) {
    this.clearErrors();
    if (!queryResponse || !queryResponse.fields || !data || data.length === 0) { done(); return; }

    this.currentConfig = config;

    // THEME APPLICATION
    if (config.table_theme !== 'custom') {
      const t = this.themes[config.table_theme];
      if (t) {
        this.currentConfig.header_bg_color = t.headerBg;
        this.currentConfig.header_text_color = t.headerText;
        this.currentConfig.pivot_total_bg_color = t.pivotTotalBg;
        this.currentConfig.pivot_total_text_color = t.pivotTotalText;
        this.currentConfig.subtotal_background_color = t.subtotalBg;
        this.currentConfig.pivot_row_total_bg = t.subtotalBg;
        this.currentConfig.border_color = t.border;
        this.currentConfig.stripe_color = t.stripe;
        if (t.cellText) this.currentConfig.cell_text_color = t.cellText;
        if (t.cellBg) this.currentConfig.cell_bg_color = t.cellBg;
      }
    }

    const dims = queryResponse.fields.dimension_like;
    const measures = queryResponse.fields.measure_like;
    const hasPivot = queryResponse.fields.pivots && queryResponse.fields.pivots.length > 0;

    if (queryResponse.has_totals) config.show_grand_total = true;
    if (queryResponse.has_row_totals) config.pivot_show_row_totals = true;

    this.hasPivot = hasPivot;
    this.pivotValues = hasPivot ? queryResponse.pivots : [];

    if (dims.length > 0) {
      this.options.subtotal_dimension.values = [{ "None": "" }, ...dims.map(d => ({ [d.label_short || d.label]: d.name }))];
    }

    dims.concat(measures).forEach((field, idx) => {
      const baseOrder = 110 + (idx * 4);
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

    const currentKey = config.enable_bo_hierarchy ? config.hierarchy_dimensions : config.subtotal_dimension;
    if (currentKey && this.state.lastSubtotalDimension !== currentKey) {
      this.state.collapsedGroups = {};
      this.state.lastSubtotalDimension = currentKey;
      this.state.forceInitialCollapse = true;
      this.state.currentPage = 1;
    }

    let processedData = [...data];

    // Filter Logic
    if (config.enable_table_filter && this.state.tableFilter) {
      const filterText = this.state.tableFilter;
      const allFields = queryResponse.fields.dimension_like.concat(queryResponse.fields.measure_like);
      processedData = processedData.filter(row => {
        return allFields.some(field => {
          if (hasPivot && field.is_measure) {
            const cellObj = row[field.name];
            if (!cellObj) return false;
            return Object.values(cellObj).some(val => String(val.value || val.rendered || '').toLowerCase().includes(filterText));
          }
          const cellValue = String(row[field.name]?.value || row[field.name] || '').toLowerCase();
          return cellValue.includes(filterText);
        });
      });
    }

    if (config.enable_column_filters && this.state.columnFilters) {
      Object.keys(this.state.columnFilters).forEach(fieldName => {
        const filterText = this.state.columnFilters[fieldName];
        if (filterText) {
          processedData = processedData.filter(row => {
            const cellValue = String(row[fieldName]?.value || row[fieldName] || '').toLowerCase();
            return cellValue.includes(filterText);
          });
        }
      });
    }

    // --- SORTING FIXED (Tree Aware) ---
    if (this.state.sortField) {
        if(config.enable_bo_hierarchy || config.enable_subtotals) {
             let tempProcessed = [...processedData];
             if(config.enable_bo_hierarchy && config.hierarchy_dimensions) {
                const hierarchyList = String(config.hierarchy_dimensions || "").split(',').map(f => f.trim()).filter(f => f);
                tempProcessed = this.calculateSubtotalsRecursive(tempProcessed, hierarchyList, measures, config);
             } else if (config.enable_subtotals && config.subtotal_dimension) {
                tempProcessed = this.calculateStandardSubtotals(tempProcessed, config.subtotal_dimension, measures, config, dims);
             }
             processedData = this.recursiveSort(tempProcessed, this.state.sortField, this.state.sortDirection, this.state.sortPivotKey);

        } else {
            processedData = this.sortData(processedData, this.state.sortField, this.state.sortDirection);
        }
    } else {
         if (config.enable_bo_hierarchy && config.hierarchy_dimensions) {
            const hierarchyList = String(config.hierarchy_dimensions || "").split(',').map(f => f.trim()).filter(f => f);
            processedData = this.calculateSubtotalsRecursive(processedData, hierarchyList, measures, config);
         } else if (config.enable_subtotals && config.subtotal_dimension) {
            processedData = this.calculateStandardSubtotals(processedData, config.subtotal_dimension, measures, config, dims);
         }
    }

    if (this.state.forceInitialCollapse) {
      processedData.forEach(row => { if (row.__isSubtotal) this.state.collapsedGroups[row.__groupValue] = true; });
      this.state.forceInitialCollapse = false;
    }
    if(config.enable_bo_hierarchy || config.enable_subtotals) {
        processedData = this.applyHierarchyFilter(processedData);
    }

    let grandTotalRow = null;
    if (config.show_grand_total) {
      if (hasPivot) {
        grandTotalRow = this.calculatePivotGrandTotal(this.state.data, measures, config, dims);
      } else {
        grandTotalRow = this.calculateGrandTotal(this.state.data, measures, config, dims);
      }
      this.state.grandTotalRow = grandTotalRow;
    } else {
      this.state.grandTotalRow = null;
    }

    this.state.fullProcessedData = [...processedData];
    this.state.totalRowCount = processedData.length + (grandTotalRow ? 1 : 0);

    // PAGINATION LOGIC
    let paginatedData = processedData;
    if (config.enable_pagination) {
      const pageSize = config.page_size || 25;
      const currentPage = this.state.currentPage || 1;

      const totalRows = processedData.length;
      this.state.totalPages = Math.ceil(totalRows / pageSize);

      if (config.dynamic_pagination && (config.enable_subtotals || config.enable_bo_hierarchy)) {
        let chunks = [];
        let currentChunk = [];
        processedData.forEach(row => {
          if (row.__isSubtotal && currentChunk.length > 0) {
            chunks.push(currentChunk);
            currentChunk = [row];
          } else {
            currentChunk.push(row);
          }
        });
        if (currentChunk.length > 0) chunks.push(currentChunk);

        this.state.totalPages = Math.ceil(chunks.length / pageSize);
        const startIdx = (currentPage - 1) * pageSize;
        const endIdx = startIdx + pageSize;
        paginatedData = chunks.slice(startIdx, endIdx).flat();
      } else {
        const startIdx = (currentPage - 1) * pageSize;
        const endIdx = startIdx + pageSize;
        paginatedData = processedData.slice(startIdx, endIdx);
      }
    }

    if (grandTotalRow) paginatedData = [...paginatedData, grandTotalRow];

    this.state.renderData = paginatedData;
    this.renderTable(paginatedData, config, queryResponse);
    done();
  },

  recursiveSort: function(flatData, field, direction, pivotKey) {
      const groups = {};
      flatData.forEach(row => {
          const p = row.__parentPath || "";
          if(!groups[p]) groups[p] = [];
          groups[p].push(row);
      });

      const sorter = (a, b) => {
          if(a.__isSubtotal && !b.__isSubtotal) return -1;
          if(!a.__isSubtotal && b.__isSubtotal) return 1;
          return this.compareValues(a, b, field, direction, pivotKey);
      };

      const processGroup = (parentPath) => {
          let rows = groups[parentPath] || [];
          if(rows.length === 0) return [];
          rows.sort(sorter);

          let result = [];
          rows.forEach(row => {
              result.push(row);
              if(row.__isSubtotal) {
                  const children = processGroup(row.__groupValue);
                  result = result.concat(children);
              }
          });
          return result;
      };

      return processGroup("");
  },

  compareValues: function(rowA, rowB, field, direction, pivotKey) {
      let valA, valB;
      if (this.hasPivot && pivotKey) {
        valA = rowA[field] && rowA[field][pivotKey] ? rowA[field][pivotKey].value : null;
        valB = rowB[field] && rowB[field][pivotKey] ? rowB[field][pivotKey].value : null;
      } else {
        const cellA = rowA[field];
        const cellB = rowB[field];
        valA = (cellA && typeof cellA === 'object' && cellA.value !== undefined) ? cellA.value : cellA;
        valB = (cellB && typeof cellB === 'object' && cellB.value !== undefined) ? cellB.value : cellB;
      }

      if(valA == null) valA = -Infinity;
      if(valB == null) valB = -Infinity;

      if (typeof valA === 'number' && typeof valB === 'number') {
           return direction === 'asc' ? valA - valB : valB - valA;
      }
      return direction === 'asc' ? String(valA).localeCompare(String(valB)) : String(valB).localeCompare(String(valA));
  },

  sortData: function (data, field, direction) {
    return [...data].sort((a, b) => {
        return this.compareValues(a, b, field, direction, this.state.sortPivotKey);
    });
  },

  renderColumnGroups: function (config, fields, hDims) {
    const visibleFields = fields.filter(f => !hDims.includes(f.name) || f.name === hDims[0]);
    let html = '<thead>';

    if (config.show_headers) {
      let totalVisibleCols = 0;
      if (this.hasPivot) {
        const dims = this.queryResponse.fields.dimension_like;
        const measures = this.queryResponse.fields.measure_like;
        let visibleDimsCount = dims.filter(d => !hDims.includes(d.name) || d.name === hDims[0]).length;
        if (config.show_row_numbers) visibleDimsCount += 1;

        totalVisibleCols = visibleDimsCount + (measures.length * this.pivotValues.length);
        if (config.pivot_show_row_totals) totalVisibleCols += measures.length;
      } else {
        totalVisibleCols = visibleFields.length;
        if (config.show_row_numbers) totalVisibleCols += 1;
      }

      html += '<tr>';

      if (config.show_row_numbers) {
        html += `<th style="background:transparent; border-top:1px solid ${config.border_color}; border-left:1px solid ${config.border_color};"></th>`;
        totalVisibleCols -= 1;
      }

      let currentIdx = 0;
      for (let i = 1; i <= 3; i++) {
        const name = config[`column_group_${i}_name`], count = config[`column_group_${i}_count`];
        if (name && count > 0) {
          html += `<th colspan="${count}" class="column-group-header" style="background:${config.group_header_bg_color} !important; color:${config.header_text_color} !important;">${name}</th>`;
          currentIdx += count;
        }
      }

      if (config.group_remaining_columns && currentIdx < totalVisibleCols) {
        html += `<th colspan="${totalVisibleCols - currentIdx}" class="column-group-header" style="background:${config.group_header_bg_color} !important; color:${config.header_text_color} !important;">${config.remaining_columns_name}</th>`;
      }
      html += '</tr>';
    }
    return html;
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
          if (this.hasPivot && this.pivotValues.length > 0) {
            sub[m.name] = {};
            this.pivotValues.forEach(pv => {
              let sum = 0;
              groups[key].forEach(r => {
                const cell = r[m.name] && r[m.name][pv.key];
                if (cell && cell.value) sum += Number(cell.value);
              });
              sub[m.name][pv.key] = { value: sum, rendered: this.formatMeasure(sum, m, config) };
            });
          } else {
            let sum = groups[key].reduce((acc, r) => acc + Number((r[m.name]?.value || r[m.name]) || 0), 0);
            sub[m.name] = { value: sum, rendered: this.formatMeasure(sum, m, config) };
          }
        });

        result.push(sub);
        if (level < fields.length - 1) {
          groupData(groups[key], level + 1, currentPath);
        } else {
          groups[key].forEach(r => { r.__parentGroup = currentPath; r.__parentPath = currentPath; r.__level = level + 1; result.push(r); });
        }
      });
    };
    groupData(data, 0, "");
    return result;
  },

  calculateStandardSubtotals: function (data, field, measures, config, dims) {
    const result = [];
    const groups = {};
    const groupOrder = [];
    data.forEach(row => {
      let val = row[field];
      let key = (val && typeof val === 'object') ? (val.value || 'null') : (val || 'null');
      if (!groups[key]) { groups[key] = []; groupOrder.push(key); }
      groups[key].push(row);
    });
    groupOrder.forEach(key => {
      const sub = { __isSubtotal: true, __groupValue: key, __level: 0, __parentPath: "" };
      sub[field] = { value: key, rendered: key };
      dims.forEach(d => { if (d.name !== field) sub[d.name] = { value: '', rendered: '' }; });

      measures.forEach(m => {
        if (this.hasPivot && this.pivotValues.length > 0) {
          sub[m.name] = {};
          this.pivotValues.forEach(pv => {
            let sum = 0;
            groups[key].forEach(r => {
              const cell = r[m.name] && r[m.name][pv.key];
              if (cell && cell.value) sum += Number(cell.value);
            });
            sub[m.name][pv.key] = { value: sum, rendered: this.formatMeasure(sum, m, config) };
          });
        } else {
          let sum = groups[key].reduce((acc, r) => acc + Number((r[m.name]?.value || r[m.name]) || 0), 0);
          sub[m.name] = { value: sum, rendered: this.formatMeasure(sum, m, config) };
        }
      });

      result.push(sub);
      groups[key].forEach(r => { r.__parentGroup = key; r.__parentPath = key; result.push(r); });
    });
    return result;
  },

  formatMeasure: function (value, field, config) {
    if (config.enable_custom_field_formatting && config[`field_format_${field.name}`]) {
      const customFormat = config[`field_format_${field.name}`];
      if (customFormat && String(customFormat).trim() !== '') return this.applyCustomFormat(value, customFormat);
    }
    if (field.value_format) {
      try {
        if (typeof LookerCharts !== 'undefined' && LookerCharts.Utils && LookerCharts.Utils.formatValue) {
          const ret = LookerCharts.Utils.formatValue(value, field.value_format);
          if (ret) return ret;
        }
      } catch (e) { }
    }
    const isCurrency = (field.value_format && field.value_format.indexOf('$') > -1) ||
      (field.label_short || field.label || '').match(/price|amount|revenue|sales|margin|\$/i);
    return this.applySmartFormat(value, isCurrency);
  },

  applySmartFormat: function (value, isCurrency) {
    const num = Number(value);
    if (isNaN(num)) return String(value);
    const absVal = Math.abs(num);
    let formatted = '', suffix = '';
    if (absVal >= 1000000) { formatted = (num / 1000000).toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }); suffix = ' M'; }
    else if (absVal >= 1000) { formatted = (num / 1000).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }); suffix = ' k'; }
    else { formatted = num.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 }); }
    return isCurrency ? '$' + formatted + suffix : formatted + suffix;
  },

  applyCustomFormat: function (value, formatString) {
    if (!formatString || value === null || value === undefined) return String(value);
    const num = parseFloat(value);
    if (isNaN(num)) return String(value);
    const decimalMatch = String(formatString).match(/\.([0#]+)/);
    const decimals = decimalMatch ? decimalMatch[1].length : 0;
    let formatted = num.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
    if (String(formatString).includes('$') || String(formatString).startsWith('$')) formatted = '$' + formatted;
    if (String(formatString).includes('%')) formatted = formatted + '%';
    return formatted;
  },

  evaluateConditionalRule: function (cellValue, config, rulePrefix, colorType = 'bg') {
    const operator = config[`${rulePrefix}_operator`];
    if (!operator) return null;
    const ruleValue = config[`${rulePrefix}_value`];

    let cleanCellValue = String(cellValue || '').replace(/[$,€£ ]/g, '');
    let cleanRuleValue = String(ruleValue || '').replace(/[$,€£ ]/g, '');

    const numericCell = parseFloat(cleanCellValue);
    const numericRule = parseFloat(cleanRuleValue);

    const stringCell = String(cellValue || '').toLowerCase();
    const stringRule = String(ruleValue || '').toLowerCase();

    let matches = false;
    if (operator === 'contains') {
      const targets = stringRule.split(',').map(s => s.trim()).filter(s => s !== '');
      matches = targets.some(target => stringCell.includes(target));
    } else if (!isNaN(numericCell) && !isNaN(numericRule)) {
      switch (operator) {
        case '>': matches = numericCell > numericRule; break;
        case '>=': matches = numericCell >= numericRule; break;
        case '<': matches = numericCell < numericRule; break;
        case '<=': matches = numericCell <= numericRule; break;
        case '=': matches = numericCell === numericRule; break;
        case '!=': matches = numericCell !== numericRule; break;
      }
    } else {
      switch (operator) {
        case '=': matches = stringCell === stringRule; break;
        case '!=': matches = stringCell !== stringRule; break;
      }
    }
    if (matches) {
      if (rulePrefix.startsWith('row_rule')) return config[`${rulePrefix}_bg`];
      return config[`${rulePrefix}_${colorType}`];
    }
    return null;
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

  calculateGrandTotal: function (rawData, measures, config, dimensions) {
    const total = { __isGrandTotal: true, __level: -1 };
    if (dimensions.length > 0) total[dimensions[0].name] = { value: config.grand_total_label, rendered: config.grand_total_label };
    measures.forEach(m => {
      let sum = rawData.reduce((acc, r) => acc + Number((r[m.name]?.value || r[m.name]) || 0), 0);
      total[m.name] = { value: sum, rendered: this.formatMeasure(sum, m, config) };
    });
    return total;
  },

  calculatePivotGrandTotal: function (rawData, measures, config, dimensions) {
    const total = { __isGrandTotal: true, __level: -1 };
    if (dimensions.length > 0) total[dimensions[0].name] = { value: config.grand_total_label, rendered: config.grand_total_label };

    measures.forEach(m => {
      total[m.name] = {};
      this.pivotValues.forEach(pv => {
        let sum = 0;
        rawData.forEach(r => {
          const cell = r[m.name] && r[m.name][pv.key];
          if (cell && cell.value) sum += Number(cell.value);
        });
        total[m.name][pv.key] = { value: sum, rendered: this.formatMeasure(sum, m, config) };
      });
    });
    return total;
  },

  renderTable: function (processedData, config, queryResponse) {
    const dims = queryResponse.fields.dimension_like;
    const measures = queryResponse.fields.measure_like;
    const hasPivot = this.hasPivot;
    const pivotValues = this.pivotValues || [];
    const hDims = config.enable_bo_hierarchy ? String(config.hierarchy_dimensions || "").split(',').map(f => f.trim()).filter(f => f) : [];
    const mainTreeCol = config.enable_bo_hierarchy && hDims.length > 0 ? hDims[0] : config.subtotal_dimension;

    const getColumnWidth = (key) => {
      if (this.state.columnWidths[key]) return `${this.state.columnWidths[key]}px`;
      return 'auto';
    };

    const headerPosition = config.freeze_header_row ? 'sticky' : 'relative';
    const headerFontSize = Number(config.header_font_size) || 12;
    const cellFontSize = Number(config.cell_font_size) || 11;
    const rowHeight = Number(config.row_height) || 36;
    const colSpacing = Number(config.column_spacing) || 12;

    let html = `<style>
        table.advanced-table { width: 100%; border-collapse: separate; border-spacing: 0; background: ${config.cell_bg_color}; border-top:1px solid ${config.border_color}; border-left:1px solid ${config.border_color}; table-layout: fixed; }
        table.advanced-table tbody td {
           font-family:${config.cell_font_family || 'inherit'};
           font-size:${cellFontSize}px;
           height:${rowHeight}px;
           padding: 0 ${colSpacing}px;
           border-bottom:1px solid ${config.border_color};
           border-right:1px solid ${config.border_color};
           color:${config.cell_text_color};
           white-space:${config.wrap_text ? 'normal' : 'nowrap'};
           overflow:hidden;
           text-overflow:ellipsis;
           position: relative;
        }
        table.advanced-table thead { position: ${headerPosition}; top: 0; z-index: 120; }
        table.advanced-table thead th { position: relative; font-family:${config.header_font_family || 'inherit'}; font-weight:${config.header_font_weight || 'bold'}; font-size:${headerFontSize}px; color:${config.header_text_color}; background:${config.header_bg_color} !important; border-bottom:2px solid ${config.border_color}; border-right:1px solid ${config.border_color}; padding: 6px 8px; vertical-align: bottom; }

        .header-content-wrapper { display: flex; flex-direction: column; justify-content: flex-end; height: 100%; width: 100%; overflow: hidden; }
        .header-label { display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 4px; }

        .subtotal-row { font-weight: ${config.standard_subtotal_bold ? 'bold' : 'normal'} !important; }
        .subtotal-row.bo-mode { font-weight: ${config.bo_hierarchy_bold ? 'bold' : 'normal'} !important; }

        .grand-total-row > td { background-color: ${config.pivot_total_bg_color} !important; color: ${config.pivot_total_text_color} !important; font-weight: 700; border-top: 2px solid ${config.border_color} !important; }

        .column-group-header { text-align: center; font-weight: 600; padding: 8px; border-bottom: 2px solid ${config.border_color}; background:${config.group_header_bg_color} !important; color:${config.header_text_color} !important; }

        .pivot-header { text-align: center; font-weight: 600; padding: 8px; background: ${config.pivot_header_bg_color || config.header_bg_color} !important; color: ${config.header_text_color} !important; border-bottom: 2px solid ${config.border_color}; }

        .data-chip { padding: 2px 10px; border-radius: 12px; font-size: 0.85em; font-weight: 600; display: inline-block; text-align: center; min-width: 60px; }
        .chip-green { background-color: ${config.chip_bg_green}; color: ${config.chip_text_green}; }
        .chip-red { background-color: ${config.chip_bg_red}; color: ${config.chip_text_red}; }
        .chip-yellow { background-color: ${config.chip_bg_yellow}; color: ${config.chip_text_yellow}; }

        .cell-bar-container { display: flex; align-items: center; gap: 4px; width: 100%; min-width: 80px; }
        .cell-bar-bg { flex: 1; min-width: 40px; height: 16px; background: #f3f4f6; border-radius: 2px; overflow: hidden; position: relative; }
        .cell-bar-fill { height: 100%; transition: width 0.3s ease; }
        .cell-bar-value { flex-shrink: 0; min-width: 45px; text-align: right; font-size: 0.9em; }
        .subtotal-toggle { cursor: pointer; margin-right: 8px; font-weight: bold; font-family: monospace; user-select: none; display: inline-block; width: 14px; text-align: center; }
        .column-filter { width: 100%; padding: 4px; font-size: 11px; border: 1px solid #ccc; border-radius: 3px; box-sizing: border-box; display: block; }
        .table-filter-container { padding: 8px; background: #f5f5f5; border-bottom: 1px solid #ddd; display: flex; align-items: center; gap: 12px; }
        .table-filter-input { padding: 6px 12px; border: 1px solid #ccc; border-radius: 4px; width: 250px; }
        .pagination-btn { padding: 6px 12px; border: 1px solid ${config.border_color}; background: white; border-radius: 4px; cursor: pointer; font-size: 12px; }
        .pagination-btn:hover:not(:disabled) { background: #f3f4f6; }
        .pagination-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .expand-collapse-btn { padding: 4px 10px; border: 1px solid ${config.border_color}; background: white; border-radius: 4px; cursor: pointer; font-size: 11px; margin-left: auto; }
        .resize-handle { position: absolute; right: 0; top: 0; bottom: 0; width: 5px; cursor: col-resize; z-index: 1000; user-select: none; }
        .resize-handle:hover { background: #3b82f6; }
        .cell-content-wrapper { display: flex; align-items: center; width: 100%; height: 100%; gap: 6px; position: relative; z-index: 10; }
        .cell-bar-flex { flex: 1 1 auto; min-width: 0; }
        .cell-value-flex { flex: 0 0 auto; white-space: nowrap; }
    `;

    if (config.enable_striping) {
      html += `table.advanced-table tbody tr:nth-child(even):not(.subtotal-row):not(.grand-total-row) > td { background-color: ${config.stripe_color}; }`;
    }

    if (config.enable_hover) {
      html += `table.advanced-table tbody tr:not(.subtotal-row):not(.grand-total-row):hover > td { background-color: ${config.hover_bg_color} !important; }`;
    }

    html += `</style>`;

    if (config.enable_table_filter || Object.keys(this.state.collapsedGroups).length > 0 || config.enable_bo_hierarchy || config.enable_subtotals) {
      html += `<div class="table-filter-container">`;
      if (config.enable_table_filter) {
        const filterValue = this.state.tableFilter || '';
        html += `<input type="text" class="table-filter-input" placeholder="Filter table..." value="${filterValue}">`;
      }
      if (config.enable_bo_hierarchy || config.enable_subtotals) {
        const allCollapsed = Object.keys(this.state.collapsedGroups).length > 0;
        html += `<button class="expand-collapse-btn" data-action="toggle-all">${allCollapsed ? '▼ Expand All' : '▶ Collapse All'}</button>`;
      }
      html += `</div>`;
    }

    html += `<table class="advanced-table ${config.table_theme}">`;

    // ═══════════════════════════════════════════════════════════════
    // PIVOT TABLE RENDERING
    // ═══════════════════════════════════════════════════════════════
    if (hasPivot && pivotValues.length > 0) {
      let pivotDims = [...dims];
      if (config.enable_bo_hierarchy && hDims.length > 0) {
        const mainField = dims.find(d => d.name === hDims[0]);
        if (mainField) {
          pivotDims = [mainField, ...dims.filter(d => d.name !== hDims[0])];
        }
      }

      // CONDITIONAL HEADER RENDER
      if (config.show_headers) {
        html += '<thead>';
        if (config.enable_column_groups) html += this.renderColumnGroups(config, [...dims, ...measures], hDims);

        html += '<tr>';

        if (config.show_row_numbers) {
          html += `<th rowspan="2" style="width:40px; min-width:40px; max-width:40px; text-align:center;">#</th>`;
        }

        pivotDims.forEach((d, idx) => {
          if (config.enable_bo_hierarchy && hDims.includes(d.name) && d.name !== hDims[0]) return;

          const w = getColumnWidth(d.name);

          const label = config[`field_label_${d.name}`] || d.label_short || d.label;
          const filterValue = (this.state.columnFilters && this.state.columnFilters[d.name]) || '';
          const columnFilter = config.enable_column_filters ? `<br/><input type="text" class="column-filter" data-field="${d.name}" value="${filterValue}" placeholder="Filter...">` : '';

          let stickyStyle = '';
          if (idx === 0 && config.freeze_first_column) {
            let leftPos = config.show_row_numbers ? 40 : 0;
            stickyStyle = `position:sticky; left:${leftPos}px; z-index:122; background:inherit; border-right: 2px solid #ccc;`;
          }

          html += `<th rowspan="2" class="sortable" data-field="${d.name}" style="width:${w}; min-width:${w}; max-width:${w}; ${stickyStyle}">
              <div class="header-content-wrapper"><span class="header-label">${label}</span>${columnFilter}</div>
              <div class="resize-handle" data-col="${d.name}"></div>
            </th>`;
        });

        pivotValues.forEach(pv => {
          html += `<th colspan="${measures.length}" class="pivot-header">${pv.key}</th>`;
        });
        if (config.pivot_show_row_totals) {
          html += `<th colspan="${measures.length}" class="pivot-header" style="background: ${config.pivot_total_bg_color} !important; color: ${config.pivot_total_text_color} !important;">${config.pivot_row_total_label || 'Total'}</th>`;
        }
        html += '</tr><tr>';

        pivotValues.forEach(pv => {
          measures.forEach(m => {
            const colKey = `${m.name}_${pv.key}`;
            const w = getColumnWidth(colKey) || getColumnWidth(m.name);
            const label = config[`field_label_${m.name}`] || m.label_short || m.label;
            html += `<th style="width:${w}; min-width:${w}; max-width:${w}" class="sortable" data-field="${m.name}" data-pivot-key="${pv.key}">
                <div class="header-content-wrapper"><span class="header-label">${label}</span></div>
                <div class="resize-handle" data-col="${colKey}"></div>
              </th>`;
          });
        });
        if (config.pivot_show_row_totals) {
          measures.forEach(m => {
            html += `<th style="background: ${config.pivot_total_bg_color} !important; color: ${config.pivot_total_text_color} !important;">${config[`field_label_${m.name}`] || m.label_short || m.label}</th>`;
          });
        }
        html += '</tr></thead>';
      }

      html += '<tbody>';
      processedData.forEach((row, i) => {
        const isSub = !!row.__isSubtotal, isGT = !!row.__isGrandTotal;
        const level = row.__level || 0;
        let bg = '';
        const modeClass = config.enable_bo_hierarchy ? 'bo-mode' : '';

        // FIXED: Force Row Condition background to !important to prevent striping overlap
        if (config.enable_row_conditional_formatting && !isSub && !isGT && config.row_conditional_field) {
          const rowFields = String(config.row_conditional_field).split(',').map(s => s.trim());
          let ruleMatched = false;
          for (const fieldName of rowFields) {
            let val = row[fieldName];
            if (val && typeof val === 'object' && val.value === undefined && pivotValues.length > 0) {
              let rowSum = 0;
              pivotValues.forEach(pv => {
                if (val[pv.key] && val[pv.key].value) rowSum += Number(val[pv.key].value);
              });
              val = rowSum;
            } else if (val && typeof val === 'object' && val.value !== undefined) {
              val = val.value;
            }

            const r1Bg = this.evaluateConditionalRule(val, config, 'row_rule_1', 'bg');
            if (r1Bg) { bg = `background:${r1Bg} !important;`; ruleMatched = true; break; }
          }
          if (!ruleMatched) {
            for (const fieldName of rowFields) {
              let val = row[fieldName];
              if (val && typeof val === 'object' && val.value === undefined && pivotValues.length > 0) {
                let rowSum = 0;
                pivotValues.forEach(pv => {
                  if (val[pv.key] && val[pv.key].value) rowSum += Number(val[pv.key].value);
                });
                val = rowSum;
              } else if (val && typeof val === 'object' && val.value !== undefined) {
                val = val.value;
              }
              const r2Bg = this.evaluateConditionalRule(val, config, 'row_rule_2', 'bg');
              if (r2Bg) { bg = `background:${r2Bg} !important;`; break; }
            }
          }
        }

        if (isSub && !bg) bg = `background:${config.subtotal_background_color};`;

        html += `<tr class="${isGT ? 'grand-total-row' : (isSub ? 'subtotal-row ' + modeClass : 'detail-row')}" data-group="${row.__groupValue || ''}" style="${bg}">`;

        if (config.show_row_numbers) {
          html += `<td style="text-align:center;">${(isSub || isGT) ? '' : i + 1}</td>`;
        }

        pivotDims.forEach((d, idx) => {
          if (config.enable_bo_hierarchy && hDims.includes(d.name) && d.name !== hDims[0]) return;

          const w = getColumnWidth(d.name);

          let stickyStyle = '';
          if (idx === 0 && config.freeze_first_column) {
            let leftPos = config.show_row_numbers ? 40 : 0;
            // FIX: Explicitly set background for sticky column (Stripe vs Default)
            let stickyBg = config.cell_bg_color;
            if (config.enable_striping && !isSub && !isGT && (i % 2 !== 0)) { // i starts at 0 (odd row), 1 (even row)
                stickyBg = config.stripe_color;
            }
            stickyStyle = `position:sticky; left:${leftPos}px; z-index:100; background:${stickyBg}; border-right: 2px solid ${config.border_color};`;
          }

          let style = `width:${w}; min-width:${w}; max-width:${w}; ${stickyStyle}`;
          if (d.name === mainTreeCol) style += `padding-left: ${(level * 20) + 12}px;`;

          const cell = row[d.name];
          let content = this.renderCellContent(cell, d, config, row, i, processedData, dims, hDims, mainTreeCol, false, null, config.cell_bar_fit_content);

          if (isSub && d.name === mainTreeCol) {
            content = `<span class="subtotal-toggle">${this.state.collapsedGroups[row.__groupValue] ? '▶' : '▼'}</span>${content}`;
          }

          let cellBg = '';
          if (config.enable_conditional_formatting && config.conditional_field) {
            const targetFields = String(config.conditional_field).split(',').map(s => s.trim());
            if (targetFields.includes(d.name)) {
              const cellVal = cell && typeof cell === 'object' ? cell.value : cell;
              const bgRule = this.evaluateConditionalRule(cellVal, config, 'conditional_rule_1', 'bg') || this.evaluateConditionalRule(cellVal, config, 'conditional_rule_2', 'bg');
              const txtRule = this.evaluateConditionalRule(cellVal, config, 'conditional_rule_1', 'text') || this.evaluateConditionalRule(cellVal, config, 'conditional_rule_2', 'text');
              if (bgRule) cellBg = `background-color:${bgRule} !important;`;
              if (txtRule) style += `color:${txtRule} !important;`;
            }
          }

          if (bg && !cellBg) style += `${bg}`;

          html += `<td style="${style} ${cellBg}">${content || ''}</td>`;
        });

        pivotValues.forEach(pv => {
          measures.forEach(m => {
            const colKey = `${m.name}_${pv.key}`;
            const w = getColumnWidth(colKey) || getColumnWidth(m.name);
            const pivotCell = row[m.name] && row[m.name][pv.key];
            let cellContent = '';
            let style = `width:${w}; min-width:${w}; max-width:${w}; text-align: right;`;
            let cellBg = '';

            if (pivotCell) {
              cellContent = this.renderCellContent(pivotCell, m, config, row, i, processedData, dims, hDims, mainTreeCol, true, pv.key, config.cell_bar_fit_content);

              if (config.enable_conditional_formatting && config.conditional_field) {
                const targetFields = String(config.conditional_field).split(',').map(s => s.trim());
                if (targetFields.includes(m.name)) {
                  const cellVal = pivotCell.value !== undefined ? pivotCell.value : pivotCell;
                  const bgRule = this.evaluateConditionalRule(cellVal, config, 'conditional_rule_1', 'bg') || this.evaluateConditionalRule(cellVal, config, 'conditional_rule_2', 'bg');
                  const txtRule = this.evaluateConditionalRule(cellVal, config, 'conditional_rule_1', 'text') || this.evaluateConditionalRule(cellVal, config, 'conditional_rule_2', 'text');
                  if (bgRule) cellBg = `background-color:${bgRule} !important;`;
                  if (txtRule) style += `color:${txtRule} !important;`;
                }
              }
            } else {
              cellContent = config.null_measure_value || '-';
            }

            let drillAttr = '';
            if (bg && !cellBg) style += `${bg}`;

            if (pivotCell && pivotCell.links && pivotCell.links.length > 0) {
              drillAttr = `class="has-drill-links" data-links='${JSON.stringify(pivotCell.links)}' style="${style} cursor:pointer; ${cellBg}"`;
            } else {
              drillAttr = `style="${style} ${cellBg}"`;
            }

            html += `<td ${drillAttr}>${cellContent}</td>`;
          });
        });

        if (config.pivot_show_row_totals) {
          measures.forEach(m => {
            let total = 0;
            pivotValues.forEach(pv => {
              const pivotCell = row[m.name] && row[m.name][pv.key];
              if (pivotCell && pivotCell.value !== null) total += Number(pivotCell.value) || 0;
            });
            let rendered = this.formatMeasure(total, m, config);
            html += `<td style="text-align: right; font-weight: 600; background: ${config.pivot_row_total_bg} !important;">${rendered}</td>`;
          });
        }
        html += '</tr>';
      });
      html += '</tbody>';

    } else {
      // ═══════════════════════════════════════════════════════════════
      // STANDARD TABLE RENDERING
      // ═══════════════════════════════════════════════════════════════
      let orderedFields = [...dims, ...measures];
      if (config.enable_bo_hierarchy && hDims.length > 0) {
        const mainField = dims.find(f => f.name === hDims[0]);
        if (mainField) orderedFields = [mainField, ...dims.filter(f => f.name !== hDims[0]), ...measures];
      }

      if (config.show_headers) {
        html += '<thead>';
        if (config.enable_column_groups) html += this.renderColumnGroups(config, orderedFields, hDims);

        html += '<tr>';
        if (config.show_row_numbers) html += `<th ${config.enable_column_groups ? 'rowspan="2"' : ''} style="width: 40px;">#</th>`;

        let currentLeftOffset = 0;

        orderedFields.forEach((f, idx) => {
          if (config.enable_bo_hierarchy && hDims.includes(f.name) && f.name !== hDims[0]) return;
          const w = getColumnWidth(f.name);
          const numericWidth = parseInt(w) || 150;

          let stickyStyle = '';
          if (idx === 0 && config.freeze_first_column) {
            stickyStyle = `position:sticky; left:${currentLeftOffset}px; z-index:102; background:inherit; border-right: 2px solid #ccc;`;
            currentLeftOffset += numericWidth;
          }

          const sortIcon = this.state.sortField === f.name ? (this.state.sortDirection === 'asc' ? ' ▲' : ' ▼') : '';
          const label = config[`field_label_${f.name}`] || f.label_short || f.label;
          const filterValue = (this.state.columnFilters && this.state.columnFilters[f.name]) || '';
          const columnFilter = config.enable_column_filters ? `<br/><input type="text" class="column-filter" data-field="${f.name}" value="${filterValue}" placeholder="Filter...">` : '';

          html += `<th class="sortable" data-field="${f.name}" style="width:${w}; min-width:${w}; max-width:${w}; ${stickyStyle} cursor:pointer;">
              <div class="header-content-wrapper"><span class="header-label">${label}${sortIcon}</span>${columnFilter}</div>
              <div class="resize-handle" data-col="${f.name}"></div>
            </th>`;
        });
        html += '</tr></thead>';
      }

      html += '<tbody>';
      processedData.forEach((row, i) => {
        const isSub = !!row.__isSubtotal, isGT = !!row.__isGrandTotal;
        const level = row.__level || 0;
        let bg = '';
        const modeClass = config.enable_bo_hierarchy ? 'bo-mode' : '';

        if (config.enable_row_conditional_formatting && !isSub && !isGT && config.row_conditional_field) {
          const rowFields = String(config.row_conditional_field).split(',').map(s => s.trim());
          let ruleMatched = false;
          for (const fieldName of rowFields) {
            const val = row[fieldName]?.value || row[fieldName];
            const r1Bg = this.evaluateConditionalRule(val, config, 'row_rule_1', 'bg');
            if (r1Bg) { bg = `background:${r1Bg} !important;`; ruleMatched = true; break; }
          }
          if (!ruleMatched) {
            for (const fieldName of rowFields) {
              const val = row[fieldName]?.value || row[fieldName];
              const r2Bg = this.evaluateConditionalRule(val, config, 'row_rule_2', 'bg');
              if (r2Bg) { bg = `background:${r2Bg} !important;`; break; }
            }
          }
        }

        if (isSub && !bg) bg = `background:${config.subtotal_background_color};`;

        html += `<tr class="${isGT ? 'grand-total-row' : (isSub ? 'subtotal-row ' + modeClass : 'detail-row')}" data-group="${row.__groupValue || ''}" style="${bg}">`;
        if (config.show_row_numbers) html += `<td style="width: 40px;">${(isSub || isGT) ? '' : i + 1}</td>`;

        let currentCellLeftOffset = 0;
        orderedFields.forEach((f, idx) => {
          if (config.enable_bo_hierarchy && hDims.includes(f.name) && f.name !== hDims[0]) return;

          const w = getColumnWidth(f.name);
          const numericWidth = parseInt(w) || 150;

          let stickyStyle = '';
          if (idx === 0 && config.freeze_first_column) {
            let leftPos = currentCellLeftOffset;
            // FIX: Explicitly set background for sticky column (Stripe vs Default)
            let stickyBg = config.cell_bg_color;
            if (config.enable_striping && !isSub && !isGT && (i % 2 !== 0)) {
                stickyBg = config.stripe_color;
            }
            stickyStyle = `position:sticky; left:${leftPos}px; z-index:100; background:${stickyBg}; border-right: 2px solid ${config.border_color};`;
            currentCellLeftOffset += numericWidth;
          }

          let style = `width:${w}; min-width:${w}; max-width:${w}; ${stickyStyle}`;
          if (f.name === mainTreeCol) style += `padding-left: ${(level * 20) + 12}px;`;

          if (config.enable_conditional_formatting && config.conditional_field) {
            const targetFields = String(config.conditional_field).split(',').map(s => s.trim());
            if (targetFields.includes(f.name)) {
              const cellData = row[f.name];
              const cellValue = cellData?.value !== undefined ? cellData.value : cellData;
              const bgColor = this.evaluateConditionalRule(cellValue, config, 'conditional_rule_1', 'bg') || this.evaluateConditionalRule(cellValue, config, 'conditional_rule_2', 'bg');
              const textColor = this.evaluateConditionalRule(cellValue, config, 'conditional_rule_1', 'text') || this.evaluateConditionalRule(cellValue, config, 'conditional_rule_2', 'text');
              if (bgColor) style += `background:${bgColor} !important;`;
              if (textColor) style += `color:${textColor} !important;`;
            }
          }

          let content = this.renderCellContent(row[f.name], f, config, row, i, processedData, dims, hDims, mainTreeCol, false, null, config.cell_bar_fit_content);
          if (isSub && f.name === mainTreeCol) content = `<span class="subtotal-toggle">${this.state.collapsedGroups[row.__groupValue] ? '▶' : '▼'}</span>${content}`;

          const cellData = row[f.name];
          let drillAttr = '';

          if (bg && style.indexOf('background') === -1) style += `${bg}`;

          if (cellData && cellData.links && cellData.links.length > 0) {
            drillAttr = `class="has-drill-links" data-links='${JSON.stringify(cellData.links)}' style="${style} cursor:pointer;"`;
          } else {
            drillAttr = `style="${style}"`;
          }

          html += `<td ${drillAttr}>${content}</td>`;
        });
        html += "</tr>";
      });
      html += "</tbody>";
    }
    html += "</table>";

    // Pagination
    if (config.enable_pagination && this.state.totalPages > 1) {
      const currentPage = this.state.currentPage || 1;
      const totalRows = this.state.totalRowCount || processedData.length;
      const paginationHTML = `
        <div class="pagination-container" style="margin-top: 12px; display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: #f9fafb; border-radius: 4px;">
          <span style="font-size: 13px; color: ${config.cell_text_color}; font-weight: 600;">Total: ${totalRows} rows</span>
          <div style="display: flex; gap: 8px; align-items: center;">
             <button class="pagination-btn" data-page="first" ${currentPage === 1 ? 'disabled' : ''}>|◄</button>
             <button class="pagination-btn" data-page="prev" ${currentPage === 1 ? 'disabled' : ''}>◄ Prev</button>
             <span style="font-size: 13px; color: ${config.cell_text_color}; padding: 0 8px;">Page ${currentPage} of ${this.state.totalPages}</span>
             <button class="pagination-btn" data-page="next" ${currentPage === this.state.totalPages ? 'disabled' : ''}>Next ►</button>
             <button class="pagination-btn" data-page="last" ${currentPage === this.state.totalPages ? 'disabled' : ''}>►|</button>
          </div>
        </div>`;
      if (config.pagination_position === 'top' || config.pagination_position === 'both') html = paginationHTML + html;
      if (config.pagination_position === 'bottom' || config.pagination_position === 'both') html += paginationHTML;
    }

    this.container.innerHTML = html;
    this.attachEventListeners(config);
    this.attachResizeListeners();
  },

  renderCellContent: function (cell, field, config, row, rowIdx, data, dims, hDims, mainTreeCol, isPivot, pivotKey, fitContent) {
    const isDimensionField = dims.some(d => d.name === field.name);
    const isSubtotalOrGrandTotal = row.__isSubtotal || row.__isGrandTotal;

    if (row.__isGrandTotal && field.name === mainTreeCol) return config.grand_total_label || "Grand Total";
    if (row.__isGrandTotal && isDimensionField && field.name !== mainTreeCol) return '';

    if (config.enable_bo_hierarchy && isDimensionField && !isPivot) {
      if (row.__isSubtotal && field.name !== mainTreeCol) return '';
      const cellVal = cell && typeof cell === 'object' ? cell.value : cell;
      if (cellVal === null || cellVal === undefined || cellVal === '' || cellVal === 'null') return '';
    }

    let val = cell, rendered = cell;
    if (cell && typeof cell === 'object') { val = cell.value; rendered = cell.rendered || cell.value; }

    // CUSTOM NULL HANDLING
    if (val === null || val === undefined) {
      if (isSubtotalOrGrandTotal) return '';
      if (isDimensionField) return config.null_dimension_value || '';
      return config.null_measure_value || '-';
    }

    const customFormat = config[`field_format_${field.name}`];
    const hasCustomFormat = !!(config.enable_custom_field_formatting && customFormat && String(customFormat).trim() !== '');
    if (hasCustomFormat) {
      rendered = this.formatMeasure(val, field, config);
    } else if (isSubtotalOrGrandTotal && (field.is_measure || field.type === 'number' || field.type === 'count')) {
      rendered = this.formatMeasure(val, field, config);
    }

    const chipFields = String(config.data_chip_fields || "").split(',').map(s => s.trim()).filter(s => s);
    const shouldApplyChips = config.enable_data_chips && chipFields.includes(field.name) && (!isSubtotalOrGrandTotal || !isDimensionField);
    if (shouldApplyChips) {
      const s = String(val).toLowerCase();
      const green = String(config.chip_match_green || "").toLowerCase().split(',');
      const yellow = String(config.chip_match_yellow || "").toLowerCase().split(',');
      const red = String(config.chip_match_red || "").toLowerCase().split(',');
      if (green.includes(s)) rendered = `<span class="data-chip chip-green">${rendered}</span>`;
      else if (yellow.includes(s)) rendered = `<span class="data-chip chip-yellow">${rendered}</span>`;
      else if (red.includes(s)) rendered = `<span class="data-chip chip-red">${rendered}</span>`;
      else rendered = `<span class="data-chip" style="background-color: ${config.chip_default_bg}; color: ${config.chip_default_text};">${rendered}</span>`;
    }

    const compFields = String(config.comparison_primary_field || "").split(',').map(s => s.trim()).filter(s => s);
    if (config.enable_comparison && compFields.includes(field.name) && !row.__isGrandTotal) {
      const fullData = this.state.fullProcessedData || data;
      const isLastOfSubgroup = this.isLastElementOfGroup(row, fullData, config);
      if (!isLastOfSubgroup) {
        rendered = this.renderComparison(row, config, fullData, rendered, field.name, pivotKey);
      } else {
        rendered = `<div class="cell-content-wrapper"><span class="cell-value-flex" style="margin-left: auto;">${rendered}</span><span style="width:55px;"></span></div>`;
      }
    }

    if ((!row.__isGrandTotal && !row.__isSubtotal) || (row.__isSubtotal && true)) {
      const barFields1 = String(config.cell_bar_fields_1 || "").split(',').map(x => x.trim());
      const barFields2 = String(config.cell_bar_fields_2 || "").split(',').map(x => x.trim());

      let mode = 'bar';
      let isSet1 = false;
      let isSet2 = false;

      if (config.enable_cell_bars_1 && barFields1.includes(field.name)) {
        mode = config.cell_bar_mode_1;
        isSet1 = true;
      } else if (config.enable_cell_bars_2 && barFields2.includes(field.name)) {
        mode = config.cell_bar_mode_2;
        isSet2 = true;
      }

      if (isSet1 || isSet2) {
        if (mode === 'heatmap') {
          const color = isSet1 ? config.cell_bar_color_1 : config.cell_bar_color_2;
          const endColor = isSet1 ? config.gradient_end_1 : config.gradient_end_2;
          const textColor = isSet1 ? config.heatmap_text_color_1 : config.heatmap_text_color_2;

          let maxVal = 1;
          let minVal = 0;
          const heatMode = config.heatmap_mode || 'peer';

          if (isPivot) {
             if(heatMode === 'overall') {
                 let allVals = [];
                 this.state.fullProcessedData.forEach(r => {
                     if(!r.__isGrandTotal && r[field.name]) {
                         Object.values(r[field.name]).forEach(v => {
                             if(v && v.value !== undefined) allVals.push(Number(v.value));
                         });
                     }
                 });
                 maxVal = Math.max(...allVals);
                 minVal = Math.min(...allVals);
             } else if(heatMode === 'column') {
                 const colValues = this.state.fullProcessedData.filter(r => !r.__isGrandTotal)
                                       .map(r => r[field.name] && r[field.name][pivotKey] ? parseFloat(r[field.name][pivotKey].value) : null)
                                       .filter(n => !isNaN(n));
                 maxVal = Math.max(...colValues);
                 minVal = Math.min(...colValues);
             } else {
                 const peers = this.state.fullProcessedData.filter(r => !r.__isGrandTotal && r.__parentPath === row.__parentPath && r.__level === row.__level);
                 const colValues = peers.map(r => r[field.name] && r[field.name][pivotKey] ? parseFloat(r[field.name][pivotKey].value) : null).filter(n => !isNaN(n));
                 maxVal = Math.max(...colValues);
                 minVal = Math.min(...colValues);
             }
          } else {
            if(heatMode === 'overall') {
                const peers = this.state.fullProcessedData.filter(r => !r.__isGrandTotal);
                const colValues = peers.map(r => parseFloat(r[field.name]?.value || 0));
                maxVal = Math.max(...colValues);
                minVal = Math.min(...colValues);
            } else {
                const peers = this.state.fullProcessedData.filter(r => !r.__isGrandTotal && r.__parentPath === row.__parentPath && r.__level === row.__level);
                const colValues = peers.map(r => parseFloat(r[field.name]?.value || 0));
                maxVal = Math.max(...colValues);
                minVal = Math.min(...colValues);
            }
          }

          if (maxVal === minVal) maxVal = minVal + 1;

          const ratio = Math.max(0, Math.min(1, (parseFloat(val) - minVal) / (maxVal - minVal)));

          let finalColor = color;
          if (config.use_gradient_1 && isSet1) finalColor = this.interpolateColor(color, endColor, ratio);
          if (config.use_gradient_2 && isSet2) finalColor = this.interpolateColor(color, endColor, ratio);

          rendered = `<div style="background-color: ${finalColor}; width:100%; height:100%; position:absolute; top:0; left:0; z-index:0;"></div>
                         <span style="position:relative; z-index:1; font-weight:600; color: ${textColor};">${rendered}</span>`;
        } else {
          const color = isSet1 ? config.cell_bar_color_1 : config.cell_bar_color_2;
          const useGrad = isSet1 ? config.use_gradient_1 : config.use_gradient_2;
          const endColor = isSet1 ? config.gradient_end_1 : config.gradient_end_2;
          rendered = this.generateCellBar(val, rendered, color, useGrad, endColor, data, field.name, row.__level, isPivot, fitContent, pivotKey);
        }
      }
    }

    return rendered;
  },

  isLastElementOfGroup: function (row, data, config) {
    const idx = data.indexOf(row);
    if (idx === -1 || idx >= data.length - 1) return true;
    const curr = row;
    const next = data[idx + 1];
    if (next.__isGrandTotal) return true;
    if (!config.enable_bo_hierarchy && curr.__isSubtotal) {
      for (let i = idx + 1; i < data.length; i++) {
        const futureRow = data[i];
        if (futureRow.__isGrandTotal) return true;
        if (futureRow.__isSubtotal) return false;
      }
      return true;
    }
    if (config.enable_bo_hierarchy) {
      if (curr.__isSubtotal) {
        for (let i = idx + 1; i < data.length; i++) {
          const futureRow = data[i];
          if (futureRow.__isGrandTotal) return true;
          if (futureRow.__isSubtotal && futureRow.__level === curr.__level) {
            if (futureRow.__parentPath === curr.__parentPath) return false;
            else return true;
          }
        }
        return true;
      }
      if (next.__level !== curr.__level) return true;
      if (next.__parentPath !== curr.__parentPath) return true;
      return false;
    }
    if (config.enable_subtotals) {
      if (!curr.__isSubtotal && next.__isSubtotal) return true;
      if (curr.__isSubtotal && next.__isSubtotal && curr.__groupValue !== next.__groupValue) return true;
      return false;
    }
    return false;
  },

  renderComparison: function (row, config, fullData, primaryRendered, fieldName, pivotKey) {
    const targetField = fieldName || config.comparison_primary_field;
    let primary = 0;
    if (pivotKey && row[targetField] && row[targetField][pivotKey]) {
      primary = parseFloat(row[targetField][pivotKey].value || 0);
    } else if (row[targetField]) {
      primary = parseFloat(row[targetField].value || 0);
    }

    const isSub = !!row.__isSubtotal;
    const level = row.__level;
    const parentPath = row.__parentPath;
    const peers = fullData.filter(r => !!r.__isSubtotal === isSub && r.__level === level && r.__parentPath === parentPath);
    const currPeerIdx = peers.indexOf(row);
    const offset = config.comparison_period_offset || -1;
    const compRow = peers[currPeerIdx - offset];

    if (!compRow) return `<div class="cell-content-wrapper"><span class="cell-value-flex" style="margin-left: auto;">${primaryRendered}</span><span style="width:55px;"></span></div>`;

    let secondary = 0;
    if (pivotKey && compRow[targetField] && compRow[targetField][pivotKey]) {
      secondary = parseFloat(compRow[targetField][pivotKey].value || 0);
    } else if (compRow[targetField]) {
      secondary = parseFloat(compRow[targetField].value || 0);
    }

    if (isNaN(secondary) || secondary === 0) return `<div class="cell-content-wrapper"><span class="cell-value-flex" style="margin-left: auto;">${primaryRendered}</span><span style="width:55px;"></span></div>`;

    const diff = primary - secondary;
    const pct = ((diff / Math.abs(secondary)) * 100).toFixed(1);
    const color = diff >= 0 ? config.positive_comparison_color : config.negative_comparison_color;
    const arrow = config.show_comparison_arrows ? (diff >= 0 ? '↑' : '↓') : '';

    return `<div class="cell-content-wrapper">
              <span class="cell-value-flex" style="margin-left: auto;">${primaryRendered}</span>
              <span style="color:${color}; font-size:0.85em; font-weight:600; flex: 0 0 55px; text-align:left; margin-left:4px;">${arrow}${Math.abs(pct)}%</span>
            </div>`;
  },

  generateCellBar: function (val, rendered, color, useGrad, endColor, data, fieldName, level, isPivot, fitContent, pivotKey) {
    const num = parseFloat(val);

    // If the value itself is not a number, just return the text/content without a bar
    if (isNaN(num)) return rendered;

    let maxVal = 1;

    if (isPivot) {
      // Find max only in this column (Pivot Key)
      // FIX: Filter out rows that don't have data for this pivot key to avoid NaNs
      const colValues = data.filter(r => !r.__isGrandTotal && !r.__isSubtotal)
                            .map(r => {
                                if (r[fieldName] && r[fieldName][pivotKey] && r[fieldName][pivotKey].value !== null) {
                                    return parseFloat(r[fieldName][pivotKey].value);
                                }
                                return null;
                            })
                            .filter(n => n !== null && !isNaN(n)); // Strict number check

      if (colValues.length > 0) maxVal = Math.max(...colValues);
    } else {
      // Standard Table peers
      const peers = data.filter(r => !r.__isGrandTotal && r.__level === level);
      const colValues = peers.map(r => parseFloat(r[fieldName]?.value || 0))
                             .filter(n => !isNaN(n));

      if (colValues.length > 0) maxVal = Math.max(...colValues);
    }

    // Prevent division by zero
    if (maxVal === 0) maxVal = 1;

    // Calculate Width
    const width = Math.min(100, Math.max(0, (num / maxVal) * 100));

    // Style Generation
    const barStyle = useGrad ? `linear-gradient(to right, ${color}, ${endColor})` : color;
    const flexClass = fitContent ? "cell-bar-flex" : "cell-bar-fixed";
    const fixedStyle = fitContent ? "" : "width: 100%; flex: 1 0 auto;";

    return `<div class="cell-content-wrapper">
              <div class="${flexClass}" style="background: #f3f4f6; border-radius: 2px; height: 16px; position: relative; overflow: hidden; ${fixedStyle}">
                 <div style="width:${width}%; height:100%; background:${barStyle}; transition: width 0.3s ease;"></div>
              </div>
              <span class="cell-value-flex">${rendered}</span>
            </div>`;
  },

  attachResizeListeners: function () {
    const headers = this.container.querySelectorAll('th');
    let startX, startWidth, resizingCol;
    const onMouseMove = (e) => {
      if (resizingCol) {
        const diff = e.pageX - startX;
        const newWidth = Math.max(50, startWidth + diff);
        const colKey = resizingCol.dataset.col;
        this.state.columnWidths[colKey] = newWidth;
        resizingCol.parentElement.style.width = `${newWidth}px`;
        resizingCol.parentElement.style.minWidth = `${newWidth}px`;
        resizingCol.parentElement.style.maxWidth = `${newWidth}px`;
      }
    };
    const onMouseUp = () => {
      if (resizingCol) {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        resizingCol = null;
        this.renderTable(this.state.renderData, this.currentConfig, this.queryResponse);
      }
    };
    headers.forEach(th => {
      const handle = th.querySelector('.resize-handle');
      if (handle) {
        handle.addEventListener('mousedown', (e) => {
          e.stopPropagation();
          resizingCol = handle;
          startX = e.pageX;
          startWidth = th.offsetWidth;
          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener('mouseup', onMouseUp);
        });
      }
    });
  },

  attachEventListeners: function (config) {
    const self = this;
    this.container.onclick = (e) => {
      const toggleAllBtn = e.target.closest('.expand-collapse-btn');
      if (toggleAllBtn) {
        const hasCollapsed = Object.keys(self.state.collapsedGroups).length > 0;
        if (hasCollapsed) self.state.collapsedGroups = {};
        else self.state.fullProcessedData.forEach(row => { if (row.__isSubtotal) self.state.collapsedGroups[row.__groupValue] = true; });
        self.updateAsync(self.state.data, self.container.parentElement, config, self.queryResponse, {}, () => { });
        return;
      }
      const row = e.target.closest('.subtotal-row');
      if (row) {
        const g = row.dataset.group;
        if (self.state.collapsedGroups[g]) delete self.state.collapsedGroups[g];
        else self.state.collapsedGroups[g] = true;
        self.updateAsync(self.state.data, self.container.parentElement, config, self.queryResponse, {}, () => { });
        return;
      }
      const th = e.target.closest('th.sortable');
      if (th) {
        if (e.target.classList.contains('column-filter') || e.target.classList.contains('resize-handle')) return;
        const f = th.dataset.field;
        self.state.sortDirection = (self.state.sortField === f && self.state.sortDirection === 'asc') ? 'desc' : 'asc';
        self.state.sortField = f;
        self.state.sortPivotKey = th.dataset.pivotKey || null; // Capture pivot key
        self.updateAsync(self.state.data, self.container.parentElement, config, self.queryResponse, {}, () => { });
      }
    };
    if (config.enable_column_filters) {
      this.container.querySelectorAll('.column-filter').forEach(input => {
        input.addEventListener('click', (e) => e.stopPropagation());
        input.addEventListener('mousedown', (e) => e.stopPropagation());
        input.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            e.stopPropagation();
            const field = e.target.dataset.field;
            if (!self.state.columnFilters) self.state.columnFilters = {};
            const filterValue = e.target.value.toLowerCase().trim();
            if (filterValue) self.state.columnFilters[field] = filterValue;
            else delete self.state.columnFilters[field];
            self.updateAsync(self.state.data, self.container.parentElement, config, self.queryResponse, {}, () => { });
          }
        });
      });
    }
    if (config.enable_table_filter) {
      const input = this.container.querySelector('.table-filter-input');
      if (input) {
        input.addEventListener('keypress', (e) => {
          if (e.key === 'Enter') {
            self.state.tableFilter = e.target.value.toLowerCase();
            self.updateAsync(self.state.data, self.container.parentElement, config, self.queryResponse, {}, () => { });
          }
        });
      }
    }
    // Pagination Controls
    if (config.enable_pagination) {
      this.container.querySelectorAll('.pagination-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const action = e.target.dataset.page;
          if (action === 'first') self.state.currentPage = 1;
          else if (action === 'prev' && self.state.currentPage > 1) self.state.currentPage--;
          else if (action === 'next' && self.state.currentPage < self.state.totalPages) self.state.currentPage++;
          else if (action === 'last') self.state.currentPage = self.state.totalPages;
          self.updateAsync(self.state.data, self.container.parentElement, config, self.queryResponse, {}, () => { });
        });
      });
    }
    // Drill Links
    this.container.querySelectorAll('td.has-drill-links').forEach(td => {
      td.addEventListener('click', (e) => {
        try {
          const linksJson = td.dataset.links;
          if (linksJson) {
            const links = JSON.parse(linksJson);
            if (links && links.length > 0) {
              LookerCharts.Utils.openDrillMenu({ links: links, event: e });
            }
          }
        } catch (err) { console.error('[DRILL] Error opening drill menu:', err); }
      });
    });
  },
  trigger: function (event) { },
  clearErrors: function () { }
};

looker.plugins.visualizations.add(visObject);

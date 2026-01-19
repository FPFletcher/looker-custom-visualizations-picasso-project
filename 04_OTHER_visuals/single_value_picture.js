/**
 * Advanced Table Visualization for Looker
 * Version: 18.1 - Enhanced Menu Structure
 * Build: 2026-01-18
 * * CHANGE LOG:
 * ✅ MENU: Reorganized 'Plot' tab for better flow (Layout -> Pagination -> Structure -> Interactivity).
 * ✅ MENU: Consolidated 'Formatting' tab (Global -> Headers -> Cells -> Conditionals).
 * ✅ MENU: Standardized divider styles and ordering.
 */

const visObject = {
  id: "advanced_table_visual_v18_1",
  label: "Advanced Table v18.1",
  options: {
    // ══════════════════════════════════════════════════════════════
    // TAB: PLOT (Layout, Structure, Data Flow)
    // ══════════════════════════════════════════════════════════════

    // --- Section: General Layout ---
    div_plot_layout: { type: "string", label: "━━━ Layout & Freezing ━━━", display: "divider", section: "Plot", order: 10 },
    show_headers: { type: "boolean", label: "Show Headers", default: true, section: "Plot", order: 11 },
    show_row_numbers: { type: "boolean", label: "Show Row Numbers", default: false, section: "Plot", order: 12 },
    freeze_header_row: { type: "boolean", label: "Freeze Header Row", default: true, section: "Plot", order: 13 },
    freeze_first_column: { type: "boolean", label: "Freeze First Column", default: true, section: "Plot", order: 14 },

    // --- Section: Pagination ---
    div_plot_pagination: { type: "string", label: "━━━ Pagination ━━━", display: "divider", section: "Plot", order: 20 },
    enable_pagination: { type: "boolean", label: "Enable Pagination", default: true, section: "Plot", order: 21 },
    page_size: { type: "number", label: "Page Size", default: 25, display: "number", section: "Plot", order: 22 },
    pagination_position: { type: "string", label: "Position", display: "select", values: [{ "Top": "top" }, { "Bottom": "bottom" }, { "Both": "both" }], default: "bottom", section: "Plot", order: 23 },
    dynamic_pagination: { type: "boolean", label: "Dynamic Pagination (Smart Subtotals)", default: true, section: "Plot", order: 24 },

    // --- Section: Grouping & Structure ---
    div_plot_structure: { type: "string", label: "━━━ Grouping & Structure ━━━", display: "divider", section: "Plot", order: 30 },
    enable_column_groups: { type: "boolean", label: "Enable Column Grouping", default: false, section: "Plot", order: 31 },
    column_group_1_name: { type: "string", label: "Group 1 Name", default: "", section: "Plot", order: 32 },
    column_group_1_count: { type: "number", label: "Group 1 Count", default: 1, section: "Plot", order: 33 },
    column_group_2_name: { type: "string", label: "Group 2 Name", default: "", section: "Plot", order: 34 },
    column_group_2_count: { type: "number", label: "Group 2 Count", default: 1, section: "Plot", order: 35 },
    group_remaining_columns: { type: "boolean", label: "Group Remaining Columns", default: false, section: "Plot", order: 36 },
    remaining_columns_name: { type: "string", label: "Remaining Group Name", default: "Other", section: "Plot", order: 37 },
    group_header_bg_color: { type: "string", label: "Group Header BG Color", display: "color", default: "#8dc6ff", section: "Plot", order: 38 },

    // --- Section: Pivots & Totals ---
    div_plot_pivot: { type: "string", label: "━━━ Pivots, Totals & Hierarchy ━━━", display: "divider", section: "Plot", order: 40 },
    pivot_show_row_totals: { type: "boolean", label: "Show Pivot Row Totals", default: false, section: "Plot", order: 41 },
    pivot_row_total_label: { type: "string", label: "Row Total Label", default: "Total", section: "Plot", order: 42 },
    pivot_row_total_bg: { type: "string", label: "Row Total Background", display: "color", default: "#f3f4f6", section: "Plot", order: 43 },

    enable_bo_hierarchy: { type: "boolean", label: "Enable Multi-Level Hierarchy", default: false, section: "Plot", order: 44 },
    hierarchy_dimensions: { type: "string", label: "Hierarchy Levels (comma-sep)", display: "text", default: "", placeholder: "brand,category", section: "Plot", order: 45 },
    bo_hierarchy_bold: { type: "boolean", label: "Bold Hierarchy Rows", default: true, section: "Plot", order: 46 },

    enable_subtotals: { type: "boolean", label: "Enable Standard Subtotals", default: false, section: "Plot", order: 47 },
    subtotal_dimension: { type: "string", label: "Subtotal Group Dimension", display: "select", values: [{ "None": "" }], default: "", section: "Plot", order: 48 },
    standard_subtotal_bold: { type: "boolean", label: "Bold Subtotal Rows", default: true, section: "Plot", order: 49 },
    subtotal_background_color: { type: "string", label: "Subtotal Row Background", display: "color", default: "#f0f0f0", section: "Plot", order: 50 },

    show_grand_total: { type: "boolean", label: "Show Grand Total Row", default: false, section: "Plot", order: 51 },
    grand_total_label: { type: "string", label: "Grand Total Label", default: "Grand Total", section: "Plot", order: 52 },

    // --- Section: Interactivity ---
    div_plot_interactivity: { type: "string", label: "━━━ Interactivity ━━━", display: "divider", section: "Plot", order: 60 },
    enable_table_filter: { type: "boolean", label: "Enable Global Search", default: false, section: "Plot", order: 61 },
    enable_column_filters: { type: "boolean", label: "Enable Column Filters", default: false, section: "Plot", order: 62 },

    // ══════════════════════════════════════════════════════════════
    // TAB: SERIES (Visualizations inside cells)
    // ══════════════════════════════════════════════════════════════

    // --- Section: Cell Visualizations ---
    div_series_vis: { type: "string", label: "━━━ Cell Bars & Heatmaps ━━━", display: "divider", section: "Series", order: 10 },
    enable_cell_bars_1: { type: "boolean", label: "Enable Visualization Set 1", default: false, section: "Series", order: 11 },
    cell_bar_mode_1: { type: "string", label: "Mode 1", display: "select", values: [{ "Bar Chart": "bar" }, { "Heatmap": "heatmap" }], default: "bar", section: "Series", order: 12 },
    cell_bar_fields_1: { type: "string", label: "Fields to Visualize 1", display: "text", default: "", section: "Series", order: 13 },
    cell_bar_color_1: { type: "string", label: "Color 1 (Start)", display: "color", default: "#3b82f6", section: "Series", order: 14 },
    use_gradient_1: { type: "boolean", label: "Use Gradient 1", default: false, section: "Series", order: 15 },
    gradient_end_1: { type: "string", label: "Gradient End 1", display: "color", default: "#93c5fd", section: "Series", order: 16 },
    heatmap_text_color_1: { type: "string", label: "Heatmap Text Color 1", display: "color", default: "#ffffff", section: "Series", order: 17 },

    enable_cell_bars_2: { type: "boolean", label: "Enable Visualization Set 2", default: false, section: "Series", order: 20 },
    cell_bar_mode_2: { type: "string", label: "Mode 2", display: "select", values: [{ "Bar Chart": "bar" }, { "Heatmap": "heatmap" }], default: "bar", section: "Series", order: 21 },
    cell_bar_fields_2: { type: "string", label: "Fields to Visualize 2", display: "text", default: "", section: "Series", order: 22 },
    cell_bar_color_2: { type: "string", label: "Color 2 (Start)", display: "color", default: "#10b981", section: "Series", order: 23 },
    use_gradient_2: { type: "boolean", label: "Use Gradient 2", default: false, section: "Series", order: 24 },
    gradient_end_2: { type: "string", label: "Gradient End 2", display: "color", default: "#6ee7b7", section: "Series", order: 25 },
    heatmap_text_color_2: { type: "string", label: "Heatmap Text Color 2", display: "color", default: "#ffffff", section: "Series", order: 26 },

    cell_bar_fit_content: { type: "boolean", label: "Fit Bars to Cell Width", default: true, section: "Series", order: 27 },

    // --- Section: Comparison ---
    div_series_comp: { type: "string", label: "━━━ Comparison Logic ━━━", display: "divider", section: "Series", order: 30 },
    enable_comparison: { type: "boolean", label: "Enable Comparison", default: false, section: "Series", order: 31 },
    comparison_mode: { type: "string", label: "Mode", display: "select", values: [{ "Metric vs Metric": "metric" }, { "Period over Period": "period" }], default: "metric", section: "Series", order: 32 },
    comparison_primary_field: { type: "string", label: "Primary Field", display: "text", default: "", section: "Series", order: 33 },
    comparison_secondary_field: { type: "string", label: "Secondary Field", display: "text", default: "", section: "Series", order: 34 },
    comparison_period_offset: { type: "number", label: "Period Offset (Rows)", default: -1, section: "Series", order: 35 },
    show_comparison_arrows: { type: "boolean", label: "Show Directional Arrows", default: true, section: "Series", order: 36 },
    positive_comparison_color: { type: "string", label: "Positive Color", display: "color", default: "#10b981", section: "Series", order: 37 },
    negative_comparison_color: { type: "string", label: "Negative Color", display: "color", default: "#ef4444", section: "Series", order: 38 },

    // --- Section: Data Chips ---
    div_series_chips: { type: "string", label: "━━━ Data Chips (Tags) ━━━", display: "divider", section: "Series", order: 40 },
    enable_data_chips: { type: "boolean", label: "Enable Data Chips", default: false, section: "Series", order: 41 },
    data_chip_fields: { type: "string", label: "Apply to Fields", default: "", section: "Series", order: 42 },
    chip_default_bg: { type: "string", label: "Default Chip BG", display: "color", default: "#e5e7eb", section: "Series", order: 43 },
    chip_default_text: { type: "string", label: "Default Chip Text", display: "color", default: "#1f2937", section: "Series", order: 44 },

    chip_match_green: { type: "string", label: "Group 1 Values (Green)", default: "Complete,Success,Yes", section: "Series", order: 45 },
    chip_bg_green: { type: "string", label: "Group 1 BG", display: "color", default: "#dcfce7", section: "Series", order: 46 },
    chip_text_green: { type: "string", label: "Group 1 Text", display: "color", default: "#166534", section: "Series", order: 47 },

    chip_match_yellow: { type: "string", label: "Group 2 Values (Yellow)", default: "Pending,Warning,Maybe", section: "Series", order: 48 },
    chip_bg_yellow: { type: "string", label: "Group 2 BG", display: "color", default: "#fef9c3", section: "Series", order: 49 },
    chip_text_yellow: { type: "string", label: "Group 2 Text", display: "color", default: "#854d0e", section: "Series", order: 50 },

    chip_match_red: { type: "string", label: "Group 3 Values (Red)", default: "Failed,Error,No", section: "Series", order: 51 },
    chip_bg_red: { type: "string", label: "Group 3 BG", display: "color", default: "#fee2e2", section: "Series", order: 52 },
    chip_text_red: { type: "string", label: "Group 3 Text", display: "color", default: "#991b1b", section: "Series", order: 53 },

    // --- Section: Formatting ---
    div_series_fmt: { type: "string", label: "━━━ Field Formatting ━━━", display: "divider", section: "Series", order: 60 },
    enable_custom_field_formatting: { type: "boolean", label: "Enable Custom Field Formatting", default: true, section: "Series", order: 61 },


    // ══════════════════════════════════════════════════════════════
    // TAB: FORMATTING (Styles & Conditionals)
    // ══════════════════════════════════════════════════════════════

    // --- Section: Global Theme ---
    div_fmt_theme: { type: "string", label: "━━━ Theme & Global ━━━", display: "divider", section: "Formatting", order: 10 },
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
        { "Dark Mode": "dark" }
      ],
      default: "custom",
      section: "Formatting",
      order: 11
    },
    enable_striping: { type: "boolean", label: "Enable Row Striping", default: true, section: "Formatting", order: 12 },
    stripe_color: { type: "string", label: "Stripe Color", display: "color", default: "#f9fafb", section: "Formatting", order: 13 },
    show_borders: { type: "boolean", label: "Show Borders", default: true, section: "Formatting", order: 14 },
    border_color: { type: "string", label: "Border Color", display: "color", default: "#e5e7eb", section: "Formatting", order: 15 },
    enable_hover: { type: "boolean", label: "Enable Hover Effect", default: true, section: "Formatting", order: 16 },
    hover_bg_color: { type: "string", label: "Hover Background Color", display: "color", default: "#f3f4f6", section: "Formatting", order: 17 },

    // --- Section: Headers ---
    div_fmt_header: { type: "string", label: "━━━ Header Styling ━━━", display: "divider", section: "Formatting", order: 20 },
    header_bg_color: { type: "string", label: "Header Background", display: "color", default: "#f9fafb", section: "Formatting", order: 21 },
    header_text_color: { type: "string", label: "Header Text", display: "color", default: "#1f2937", section: "Formatting", order: 22 },
    header_font_size: { type: "number", label: "Header Font Size (px)", default: 12, section: "Formatting", order: 23 },
    header_font_family: { type: "string", label: "Header Font Family", display: "text", default: "inherit", section: "Formatting", order: 24 },
    header_font_weight: { type: "string", label: "Header Font Weight", display: "select", values: [{ "Normal": "normal" }, { "Bold": "bold" }, { "600": "600" }, { "700": "700" }], default: "bold", section: "Formatting", order: 25 },

    pivot_header_bg_color: { type: "string", label: "Pivot Header Background", display: "color", default: "#e0e7ff", section: "Formatting", order: 26 },
    pivot_header_text_color: { type: "string", label: "Pivot Header Text", display: "color", default: "#3730a3", section: "Formatting", order: 27 },

    // --- Section: Body/Cells ---
    div_fmt_body: { type: "string", label: "━━━ Body & Cell Styling ━━━", display: "divider", section: "Formatting", order: 30 },
    cell_bg_color: { type: "string", label: "Cell Background", display: "color", default: "#ffffff", section: "Formatting", order: 31 },
    cell_text_color: { type: "string", label: "Cell Text", display: "color", default: "#374151", section: "Formatting", order: 32 },
    cell_font_size: { type: "number", label: "Cell Font Size (px)", default: 11, section: "Formatting", order: 33 },
    cell_font_family: { type: "string", label: "Cell Font Family", display: "text", default: "inherit", section: "Formatting", order: 34 },
    row_height: { type: "number", label: "Row Height (px)", default: 36, section: "Formatting", order: 35 },
    column_spacing: { type: "number", label: "Column Spacing (px)", default: 12, section: "Formatting", order: 36 },
    wrap_text: { type: "boolean", label: "Wrap Text", default: false, section: "Formatting", order: 37 },
    null_measure_value: { type: "string", label: "Null Measure Value", default: "-", section: "Formatting", order: 38 },
    null_dimension_value: { type: "string", label: "Null Dimension Value", default: "", section: "Formatting", order: 39 },

    // --- Section: Row Conditionals ---
    div_fmt_cond_row: { type: "string", label: "━━━ Row Conditional Formatting ━━━", display: "divider", section: "Formatting", order: 40 },
    enable_row_conditional_formatting: { type: "boolean", label: "Enable Row Formatting", default: false, section: "Formatting", order: 41 },
    row_conditional_field: { type: "string", label: "Trigger Fields (comma-sep)", display: "text", default: "", section: "Formatting", order: 42 },

    row_rule_1_operator: { type: "string", label: "Row Rule 1 Operator", display: "select", values: [{ "None": "" }, { ">": ">" }, { ">=": ">=" }, { "<": "<" }, { "<=": "<=" }, { "=": "=" }, { "≠": "!=" }, { "Contains": "contains" }], default: "", section: "Formatting", order: 43 },
    row_rule_1_value: { type: "string", label: "Row Rule 1 Value", display: "text", default: "", section: "Formatting", order: 44 },
    row_rule_1_bg: { type: "string", label: "Row Rule 1 BG", display: "color", default: "#dcfce7", section: "Formatting", order: 45 },

    row_rule_2_operator: { type: "string", label: "Row Rule 2 Operator", display: "select", values: [{ "None": "" }, { ">": ">" }, { ">=": ">=" }, { "<": "<" }, { "<=": "<=" }, { "=": "=" }, { "≠": "!=" }, { "Contains": "contains" }], default: "", section: "Formatting", order: 46 },
    row_rule_2_value: { type: "string", label: "Row Rule 2 Value", display: "text", default: "", section: "Formatting", order: 47 },
    row_rule_2_bg: { type: "string", label: "Row Rule 2 BG", display: "color", default: "#fee2e2", section: "Formatting", order: 48 },

    // --- Section: Column Conditionals ---
    div_fmt_cond_col: { type: "string", label: "━━━ Column Conditional Formatting ━━━", display: "divider", section: "Formatting", order: 50 },
    enable_conditional_formatting: { type: "boolean", label: "Enable Column Formatting", default: false, section: "Formatting", order: 51 },
    conditional_field: { type: "string", label: "Target Fields (comma-sep)", display: "text", default: "", section: "Formatting", order: 52 },

    conditional_rule_1_operator: { type: "string", label: "Col Rule 1 Operator", display: "select", values: [{ "None": "" }, { ">": ">" }, { ">=": ">=" }, { "<": "<" }, { "<=": "<=" }, { "=": "=" }, { "≠": "!=" }, { "Contains": "contains" }], default: "", section: "Formatting", order: 53 },
    conditional_rule_1_value: { type: "string", label: "Col Rule 1 Value", display: "text", default: "", section: "Formatting", order: 54 },
    conditional_rule_1_bg: { type: "string", label: "Col Rule 1 BG", display: "color", default: "#dcfce7", section: "Formatting", order: 55 },
    conditional_rule_1_text: { type: "string", label: "Col Rule 1 Text", display: "color", default: "#166534", section: "Formatting", order: 56 },

    conditional_rule_2_operator: { type: "string", label: "Col Rule 2 Operator", display: "select", values: [{ "None": "" }, { ">": ">" }, { ">=": ">=" }, { "<": "<" }, { "<=": "<=" }, { "=": "=" }, { "≠": "!=" }, { "Contains": "contains" }], default: "", section: "Formatting", order: 57 },
    conditional_rule_2_value: { type: "string", label: "Col Rule 2 Value", display: "text", default: "", section: "Formatting", order: 58 },
    conditional_rule_2_bg: { type: "string", label: "Col Rule 2 BG", display: "color", default: "#fee2e2", section: "Formatting", order: 59 },
    conditional_rule_2_text: { type: "string", label: "Col Rule 2 Text", display: "color", default: "#991b1b", section: "Formatting", order: 60 },
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
    google: { headerBg: '#4285F4', headerText: '#ffffff', pivotBg: '#E8F0FE', pivotText: '#1967D2', border: '#DADCE0', rowBg: '#ffffff', stripe: '#F8F9FA', cellText: '#202124' },
    looker: { headerBg: '#2d1e59', headerText: '#ffffff', pivotBg: '#592ec2', pivotText: '#ffffff', border: '#e6e6e6', rowBg: '#ffffff', stripe: '#f5f5f5', cellText: '#262d33' },
    professional: { headerBg: '#e2e8f0', headerText: '#1e293b', pivotBg: '#cbd5e1', pivotText: '#0f172a', border: '#cbd5e1', rowBg: '#ffffff', stripe: '#f8fafc', cellText: '#334155' },
    ocean: { headerBg: '#dbeafe', headerText: '#1e40af', pivotBg: '#bfdbfe', pivotText: '#172554', border: '#93c5fd', rowBg: '#ffffff', stripe: '#eff6ff', cellText: '#1e3a8a' },
    forest: { headerBg: '#dcfce7', headerText: '#166534', pivotBg: '#bbf7d0', pivotText: '#14532d', border: '#86efac', rowBg: '#ffffff', stripe: '#f0fdf4', cellText: '#14532d' },
    dark: { headerBg: '#1f2937', headerText: '#f9fafb', pivotBg: '#374151', pivotText: '#f3f4f6', border: '#4b5563', rowBg: '#111827', stripe: '#1f2937', cellText: '#f3f4f6', cellBg: '#111827' }
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
        this.currentConfig.pivot_header_bg_color = t.pivotBg;
        this.currentConfig.pivot_header_text_color = t.pivotText;
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

    if (this.state.sortField) processedData = this.sortData(processedData, this.state.sortField, this.state.sortDirection);

    // Subtotal / Hierarchy Logic
    if (config.enable_bo_hierarchy && config.hierarchy_dimensions) {
      const hierarchyList = String(config.hierarchy_dimensions || "").split(',').map(f => f.trim()).filter(f => f);
      if (hierarchyList.length > 0) {
        processedData = this.calculateSubtotalsRecursive(processedData, hierarchyList, measures, config);
        if (this.state.forceInitialCollapse) {
          processedData.forEach(row => { if (row.__isSubtotal) this.state.collapsedGroups[row.__groupValue] = true; });
          this.state.forceInitialCollapse = false;
        }
        processedData = this.applyHierarchyFilter(processedData);
      }
    } else if (config.enable_subtotals && config.subtotal_dimension) {
      processedData = this.calculateStandardSubtotals(processedData, config.subtotal_dimension, measures, config, dims);
      if (this.state.forceInitialCollapse) {
        processedData.forEach(row => { if (row.__isSubtotal) this.state.collapsedGroups[row.__groupValue] = true; });
        this.state.forceInitialCollapse = false;
      }
      processedData = processedData.filter(row => row.__isSubtotal ? true : !this.state.collapsedGroups[row.__parentGroup]);
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
      const sub = { __isSubtotal: true, __groupValue: key, __level: 0 };
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
      groups[key].forEach(r => { r.__parentGroup = key; result.push(r); });
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
    const headerZIndex = config.freeze_header_row ? '100' : 'auto';

    let html = `<style>
        table.advanced-table { width: 100%; border-collapse: separate; border-spacing: 0; background: ${config.cell_bg_color}; border-top:1px solid ${config.border_color}; border-left:1px solid ${config.border_color}; table-layout: fixed; }
        table.advanced-table tbody td {
           font-family:${config.cell_font_family || 'inherit'};
           font-size:${config.cell_font_size}px;
           height:${config.row_height}px;
           padding: 0 ${config.column_spacing}px;
           border-bottom:1px solid ${config.border_color};
           border-right:1px solid ${config.border_color};
           color:${config.cell_text_color};
           white-space:${config.wrap_text ? 'normal' : 'nowrap'};
           overflow:hidden;
           text-overflow:ellipsis;
           position: relative;
        }
        table.advanced-table thead { position: ${headerPosition}; top: 0; z-index: 120; }
        table.advanced-table thead th { position: relative; font-family:${config.header_font_family || 'inherit'}; font-weight:${config.header_font_weight || 'bold'}; font-size:${config.header_font_size}px; color:${config.header_text_color}; background:${config.header_bg_color} !important; border-bottom:2px solid ${config.border_color}; border-right:1px solid ${config.border_color}; padding: 6px 8px; vertical-align: bottom; }

        .header-content-wrapper { display: flex; flex-direction: column; justify-content: flex-end; height: 100%; width: 100%; overflow: hidden; }
        .header-label { display: block; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 4px; }

        .subtotal-row { font-weight: ${config.standard_subtotal_bold ? 'bold' : 'normal'} !important; }
        .subtotal-row.bo-mode { font-weight: ${config.bo_hierarchy_bold ? 'bold' : 'normal'} !important; }
        .grand-total-row { background-color: #e8e8e8 !important; font-weight: 700; border-top: 3px solid #333 !important; }

        .column-group-header { text-align: center; font-weight: 600; padding: 8px; border-bottom: 2px solid ${config.border_color}; background:${config.group_header_bg_color} !important; color:${config.header_text_color} !important; }

        /* FIXED PIVOT HEADERS */
        .pivot-header { text-align: center; font-weight: 600; padding: 8px; background: ${config.pivot_header_bg_color} !important; color: ${config.pivot_header_text_color} !important; border-bottom: 2px solid ${config.border_color}; }

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
      html += `table.advanced-table tbody tr:nth-child(even):not(.subtotal-row):not(.grand-total-row) > td { background-color: ${config.stripe_color} !important; }`;
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

        let currentLeftOffset = 0;

        pivotDims.forEach((d, idx) => {
          if (config.enable_bo_hierarchy && hDims.includes(d.name) && d.name !== hDims[0]) return;

          const w = getColumnWidth(d.name);
          const numericWidth = parseInt(w) || 150;

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
          html += `<th colspan="${measures.length}" class="pivot-header" style="background: ${config.pivot_header_bg_color} !important; color: ${config.pivot_header_text_color} !important;">${config.pivot_row_total_label || 'Total'}</th>`;
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
            html += `<th style="background: ${config.pivot_header_bg_color} !important; color: ${config.pivot_header_text_color} !important;">${config[`field_label_${m.name}`] || m.label_short || m.label}</th>`;
          });
        }
        html += '</tr></thead>';
      }

      html += '<tbody>';
      processedData.forEach((row, i) => {
        const isSub = !!row.__isSubtotal,

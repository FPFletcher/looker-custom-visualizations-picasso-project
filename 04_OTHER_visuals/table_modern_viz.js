/**
 * Advanced Table Visualization for Looker
 * Version: 4.12.7 - Full Feature Restore + Auto-Collapse + Pagination Fix
 * Build: 2026-01-13
 */

const visObject = {
  id: "advanced_table_visual",
  label: "Advanced Table",
  options: {
    // ══════════════════════════════════════════════════════════════
    // TAB: PLOT
    // ══════════════════════════════════════════════════════════════

    plot_divider_display: {
      type: "string",
      label: "─────────────────────────────── Display Options ───────────────────────────────",
      display: "divider",
      section: "Plot",
      order: 0
    },

    show_row_numbers: {
      type: "boolean",
      label: "Show Row Numbers",
      default: false,
      section: "Plot",
      order: 1
    },

    show_headers: {
      type: "boolean",
      label: "Show Headers",
      default: true,
      section: "Plot",
      order: 2
    },

    plot_divider_pagination: {
      type: "string",
      label: "─────────────────────────────── Pagination ───────────────────────────────",
      display: "divider",
      section: "Plot",
      order: 10
    },

    enable_pagination: {
      type: "boolean",
      label: "Enable Pagination",
      default: true,
      section: "Plot",
      order: 11
    },

    page_size: {
      type: "number",
      label: "Page Size",
      default: 25,
      display: "number",
      min: 5,
      max: 1000,
      section: "Plot",
      order: 12
    },

    pagination_position: {
      type: "string",
      label: "Pagination Position",
      display: "select",
      values: [
        { "Top": "top" },
        { "Bottom": "bottom" },
        { "Both": "both" }
      ],
      default: "bottom",
      section: "Plot",
      order: 13
    },

    show_page_info: {
      type: "boolean",
      label: "Show Page Info",
      default: true,
      section: "Plot",
      order: 14
    },

    plot_divider_freezing: {
      type: "string",
      label: "─────────────────────────────── Freezing ───────────────────────────────",
      display: "divider",
      section: "Plot",
      order: 20
    },

    freeze_columns: {
      type: "number",
      label: "Freeze Left Columns",
      default: 0,
      display: "number",
      min: 0,
      max: 10,
      section: "Plot",
      order: 21
    },

    freeze_header_row: {
      type: "boolean",
      label: "Freeze Header Row",
      default: true,
      section: "Plot",
      order: 22
    },

    plot_divider_filtering: {
      type: "string",
      label: "─────────────────────────────── Filtering ───────────────────────────────",
      display: "divider",
      section: "Plot",
      order: 30
    },

    enable_table_filter: {
      type: "boolean",
      label: "Enable Table-wide Filter",
      default: false,
      section: "Plot",
      order: 31
    },

    enable_column_filters: {
      type: "boolean",
      label: "Enable Column Filters",
      default: false,
      section: "Plot",
      order: 32
    },

    filter_highlight_color: {
      type: "string",
      label: "Filter Highlight Color",
      display: "color",
      default: "#fef08a",
      section: "Plot",
      order: 33
    },

    // ══════════════════════════════════════════════════════════════
    // TAB: SERIES
    // ══════════════════════════════════════════════════════════════

    series_divider_cell_bars: {
      type: "string",
      label: "─────────────────────────────── Cell Bar Charts ───────────────────────────────",
      display: "divider",
      section: "Series",
      order: 0
    },

    enable_cell_bars_1: {
      type: "boolean",
      label: "Enable Cell Bar Set 1",
      default: false,
      section: "Series",
      order: 1
    },

    cell_bar_fields_1: {
      type: "string",
      label: "Cell Bar Fields 1 (comma-separated)",
      display: "text",
      default: "",
      placeholder: "measure1,measure2,measure3",
      section: "Series",
      order: 2
    },

    cell_bar_color_1: {
      type: "string",
      label: "Cell Bar Color 1",
      display: "color",
      default: "#3b82f6",
      section: "Series",
      order: 3
    },

    cell_bar_gradient_1: {
      type: "boolean",
      label: "Use Gradient for Set 1",
      default: false,
      section: "Series",
      order: 4
    },

    cell_bar_gradient_end_1: {
      type: "string",
      label: "Gradient End Color 1",
      display: "color",
      default: "#93c5fd",
      section: "Series",
      order: 5
    },

    enable_cell_bars_2: {
      type: "boolean",
      label: "Enable Cell Bar Set 2",
      default: false,
      section: "Series",
      order: 6
    },

    cell_bar_fields_2: {
      type: "string",
      label: "Cell Bar Fields 2 (comma-separated)",
      display: "text",
      default: "",
      placeholder: "measure1,measure2",
      section: "Series",
      order: 7
    },

    cell_bar_color_2: {
      type: "string",
      label: "Cell Bar Color 2",
      display: "color",
      default: "#10b981",
      section: "Series",
      order: 8
    },

    cell_bar_gradient_2: {
      type: "boolean",
      label: "Use Gradient for Set 2",
      default: false,
      section: "Series",
      order: 9
    },

    cell_bar_gradient_end_2: {
      type: "string",
      label: "Gradient End Color 2",
      display: "color",
      default: "#6ee7b7",
      section: "Series",
      order: 10
    },

    enable_cell_bars_3: {
      type: "boolean",
      label: "Enable Cell Bar Set 3",
      default: false,
      section: "Series",
      order: 11
    },

    cell_bar_fields_3: {
      type: "string",
      label: "Cell Bar Fields 3 (comma-separated)",
      display: "text",
      default: "",
      placeholder: "measure1,measure2",
      section: "Series",
      order: 12
    },

    cell_bar_color_3: {
      type: "string",
      label: "Cell Bar Color 3",
      display: "color",
      default: "#f59e0b",
      section: "Series",
      order: 13
    },

    cell_bar_gradient_3: {
      type: "boolean",
      label: "Use Gradient for Set 3",
      default: false,
      section: "Series",
      order: 14
    },

    cell_bar_gradient_end_3: {
      type: "string",
      label: "Gradient End Color 3",
      display: "color",
      default: "#fcd34d",
      section: "Series",
      order: 15
    },

    cell_bar_show_value: {
      type: "boolean",
      label: "Show Value on Cell Bars",
      default: true,
      section: "Series",
      order: 16
    },

    cell_bar_max_width: {
      type: "number",
      label: "Cell Bar Max Width (%)",
      default: 100,
      display: "number",
      min: 20,
      max: 100,
      section: "Series",
      order: 17
    },

    series_divider_grouping: {
      type: "string",
      label: "─────────────────────────────── Column Grouping ───────────────────────────────",
      display: "divider",
      section: "Series",
      order: 20
    },

    enable_column_groups: {
      type: "boolean",
      label: "Enable Column Grouping",
      default: false,
      section: "Series",
      order: 21
    },

    column_group_1_name: {
      type: "string",
      label: "Group 1 Name",
      default: "",
      section: "Series",
      order: 22
    },

    column_group_1_count: {
      type: "number",
      label: "Group 1 - Number of Columns from Left",
      display: "number",
      default: 2,
      min: 1,
      max: 20,
      section: "Series",
      order: 23
    },

    column_group_2_name: {
      type: "string",
      label: "Group 2 Name",
      default: "",
      section: "Series",
      order: 24
    },

    column_group_2_count: {
      type: "number",
      label: "Group 2 - Number of Columns from Left",
      display: "number",
      default: 4,
      min: 1,
      max: 20,
      section: "Series",
      order: 25
    },

    column_group_3_name: {
      type: "string",
      label: "Group 3 Name",
      default: "",
      section: "Series",
      order: 26
    },

    column_group_3_count: {
      type: "number",
      label: "Group 3 - Number of Columns from Left",
      display: "number",
      default: 6,
      min: 1,
      max: 20,
      section: "Series",
      order: 27
    },

    group_remaining_columns: {
      type: "boolean",
      label: "Group All Remaining Columns",
      default: false,
      section: "Series",
      order: 28
    },

    remaining_columns_name: {
      type: "string",
      label: "Remaining Columns Group Name",
      default: "Other",
      section: "Series",
      order: 29
    },

    group_header_bg_color: {
      type: "string",
      label: "Group Header Background Color",
      display: "color",
      default: "#e0e7ff",
      section: "Series",
      order: 30
    },

    series_divider_comparison: {
      type: "string",
      label: "─────────────────────────────── Comparison ───────────────────────────────",
      display: "divider",
      section: "Series",
      order: 50
    },

    enable_comparison: {
      type: "boolean",
      label: "Enable Comparison Display",
      default: false,
      section: "Series",
      order: 51
    },

    comparison_mode: {
      type: "string",
      label: "Comparison Mode",
      display: "select",
      values: [
        { "Metric vs Metric": "metric" },
        { "Period over Period": "period" }
      ],
      default: "metric",
      section: "Series",
      order: 52
    },

    comparison_primary_field: {
      type: "string",
      label: "Primary Measure",
      display: "text",
      default: "",
      placeholder: "measure_name",
      section: "Series",
      order: 53
    },

    comparison_secondary_field: {
      type: "string",
      label: "Secondary Measure (Metric vs Metric mode)",
      display: "text",
      default: "",
      placeholder: "measure_name",
      section: "Series",
      order: 54
    },

    comparison_period_offset: {
      type: "number",
      label: "Period Offset (use negative for previous, e.g., -1)",
      display: "number",
      default: -1,
      min: -100,
      max: 100,
      section: "Series",
      order: 55
    },

    comparison_label: {
      type: "string",
      label: "Comparison Label",
      display: "text",
      default: "vs Previous",
      placeholder: "vs Last Year, MoM, YoY, etc.",
      section: "Series",
      order: 56
    },

    comparison_type: {
      type: "string",
      label: "Comparison Display Type",
      display: "select",
      values: [
        { "Percentage": "percentage" },
        { "Absolute": "absolute" },
        { "Inline Bar": "bar" },
        { "Both": "both" }
      ],
      default: "percentage",
      section: "Series",
      order: 57
    },

    show_comparison_arrows: {
      type: "boolean",
      label: "Show Comparison Arrows",
      default: true,
      section: "Series",
      order: 58
    },

    positive_comparison_color: {
      type: "string",
      label: "Positive Comparison Color",
      display: "color",
      default: "#10b981",
      section: "Series",
      order: 59
    },

    negative_comparison_color: {
      type: "string",
      label: "Negative Comparison Color",
      display: "color",
      default: "#ef4444",
      section: "Series",
      order: 60
    },

    series_divider_emojis: {
      type: "string",
      label: "─────────────────────────────── Emojis ───────────────────────────────",
      display: "divider",
      section: "Series",
      order: 70
    },

    enable_emojis: {
      type: "boolean",
      label: "Enable Emoji Rendering",
      default: false,
      section: "Series",
      order: 71
    },

    emoji_mapping: {
      type: "string",
      label: "Emoji Mapping (JSON)",
      display: "textarea",
      default: '{"positive": "✅", "negative": "❌", "warning": "⚠️", "star": "⭐"}',
      placeholder: '{"keyword": "emoji"}',
      section: "Series",
      order: 72
    },

    // ========== SUBTOTALS & TOTALS ==========
    subtotals_divider: {
      type: "string",
      label: "─────────────────────────────── Subtotals & Totals ───────────────────────────────",
      display: "divider",
      section: "Series",
      order: 73
    },

    enable_subtotals: {
      type: "boolean",
      label: "Enable Subtotals",
      default: false,
      section: "Series",
      order: 74
    },

    subtotal_dimension: {
      type: "string",
      label: "Group By Dimension (for Subtotals)",
      display: "select",
      values: [{"None": ""}],
      default: "",
      section: "Series",
      order: 75
    },

    show_grand_total: {
      type: "boolean",
      label: "Show Grand Total Row",
      default: false,
      section: "Series",
      order: 76
    },

    subtotal_label: {
      type: "string",
      label: "Subtotal Label Format",
      default: "{value}",
      placeholder: "Use {value} for dimension value",
      section: "Series",
      order: 77
    },

    subtotal_position: {
      type: "string",
      label: "Subtotal Position",
      display: "select",
      values: [
        {"Top (Collapsible)": "top"},
        {"Bottom": "bottom"}
      ],
      default: "bottom",
      section: "Series",
      order: 78
    },

    subtotal_background_color: {
      type: "string",
      label: "Subtotal Background Color",
      display: "color",
      default: "#f0f0f0",
      section: "Series",
      order: 79
    },

    grand_total_label: {
      type: "string",
      label: "Grand Total Label",
      default: "Grand Total",
      section: "Series",
      order: 80
    },

    show_grand_total_on_all_pages: {
      type: "boolean",
      label: "Show Grand Total on All Pages",
      default: true,
      section: "Series",
      order: 81
    },

    series_divider_field_labels: {
      type: "string",
      label: "─────────────────────────────── Field Formatting ───────────────────────────────",
      display: "divider",
      section: "Series",
      order: 80
    },

    enable_custom_field_formatting: {
      type: "boolean",
      label: "Enable Custom Field Formatting",
      default: false,
      section: "Series",
      order: 81
    },

    // ══════════════════════════════════════════════════════════════
    // TAB: FORMATTING
    // ══════════════════════════════════════════════════════════════

    formatting_divider_theme: {
      type: "string",
      label: "─────────────────────────────── Theme ───────────────────────────────",
      display: "divider",
      section: "Formatting",
      order: 0
    },

    table_theme: {
      type: "string",
      label: "Table Theme",
      display: "select",
      values: [
        { "Modern": "modern" },
        { "Classic": "classic" },
        { "Minimal": "minimal" },
        { "Striped": "striped" },
        { "Bordered": "bordered" },
        { "Compact": "compact" }
      ],
      default: "modern",
      section: "Formatting",
      order: 1
    },

    stripe_color: {
      type: "string",
      label: "Stripe Background Color",
      display: "color",
      default: "#f9fafb",
      section: "Formatting",
      order: 2
    },

    formatting_divider_headers: {
      type: "string",
      label: "─────────────────────────────── Headers ───────────────────────────────",
      display: "divider",
      section: "Formatting",
      order: 10
    },

    header_font_family: {
      type: "string",
      label: "Header Font Family",
      display: "select",
      values: [
        { "Default": "default" },
        { "Arial": "Arial, sans-serif" },
        { "Helvetica": "Helvetica, sans-serif" },
        { "Times New Roman": "Times New Roman, serif" },
        { "Courier": "Courier, monospace" },
        { "Georgia": "Georgia, serif" },
        { "Verdana": "Verdana, sans-serif" },
        { "Roboto": "Roboto, sans-serif" }
      ],
      default: "default",
      section: "Formatting",
      order: 11
    },

    header_font_size: {
      type: "number",
      label: "Header Font Size (px)",
      default: 12,
      display: "number",
      min: 8,
      max: 32,
      section: "Formatting",
      order: 12
    },

    header_font_weight: {
      type: "string",
      label: "Header Font Weight",
      display: "select",
      values: [
        { "Normal": "normal" },
        { "Bold": "bold" },
        { "Light": "300" },
        { "Semi-Bold": "600" }
      ],
      default: "bold",
      section: "Formatting",
      order: 13
    },

    header_text_color: {
      type: "string",
      label: "Header Text Color",
      display: "color",
      default: "#1f2937",
      section: "Formatting",
      order: 14
    },

    header_bg_color: {
      type: "string",
      label: "Header Background Color",
      display: "color",
      default: "#f9fafb",
      section: "Formatting",
      order: 15
    },

    header_alignment: {
      type: "string",
      label: "Header Alignment",
      display: "select",
      values: [
        { "Left": "left" },
        { "Center": "center" },
        { "Right": "right" }
      ],
      default: "left",
      section: "Formatting",
      order: 16
    },

    formatting_divider_cells: {
      type: "string",
      label: "─────────────────────────────── Cells ───────────────────────────────",
      display: "divider",
      section: "Formatting",
      order: 20
    },

    cell_font_family: {
      type: "string",
      label: "Cell Font Family",
      display: "select",
      values: [
        { "Default": "default" },
        { "Arial": "Arial, sans-serif" },
        { "Helvetica": "Helvetica, sans-serif" },
        { "Times New Roman": "Times New Roman, serif" },
        { "Courier": "Courier, monospace" },
        { "Georgia": "Georgia, serif" },
        { "Verdana": "Verdana, sans-serif" },
        { "Roboto": "Roboto, sans-serif" }
      ],
      default: "default",
      section: "Formatting",
      order: 21
    },

    cell_font_size: {
      type: "number",
      label: "Cell Font Size (px)",
      default: 11,
      display: "number",
      min: 8,
      max: 32,
      section: "Formatting",
      order: 22
    },

    cell_text_color: {
      type: "string",
      label: "Cell Text Color",
      display: "color",
      default: "#374151",
      section: "Formatting",
      order: 23
    },

    cell_bg_color: {
      type: "string",
      label: "Cell Background Color",
      display: "color",
      default: "#ffffff",
      section: "Formatting",
      order: 24
    },

    cell_alignment: {
      type: "string",
      label: "Cell Alignment",
      display: "select",
      values: [
        { "Auto": "auto" },
        { "Left": "left" },
        { "Center": "center" },
        { "Right": "right" }
      ],
      default: "auto",
      section: "Formatting",
      order: 25
    },

    wrap_text: {
      type: "boolean",
      label: "Wrap Text in Cells",
      default: false,
      section: "Formatting",
      order: 26
    },

    row_height: {
      type: "number",
      label: "Row Height (px)",
      default: 36,
      display: "number",
      min: 24,
      max: 200,
      section: "Formatting",
      order: 27
    },

    formatting_divider_borders: {
      type: "string",
      label: "─────────────────────────────── Borders & Spacing ───────────────────────────────",
      display: "divider",
      section: "Formatting",
      order: 30
    },

    show_borders: {
      type: "boolean",
      label: "Show Borders",
      default: true,
      section: "Formatting",
      order: 31
    },

    border_style: {
      type: "string",
      label: "Border Style",
      display: "select",
      values: [
        { "Solid": "solid" },
        { "Dashed": "dashed" },
        { "Dotted": "dotted" },
        { "None": "none" }
      ],
      default: "solid",
      section: "Formatting",
      order: 32
    },

    border_width: {
      type: "number",
      label: "Border Width (px)",
      default: 1,
      display: "number",
      min: 0,
      max: 5,
      section: "Formatting",
      order: 33
    },

    border_color: {
      type: "string",
      label: "Border Color",
      display: "color",
      default: "#e5e7eb",
      section: "Formatting",
      order: 34
    },

    show_gridlines: {
      type: "boolean",
      label: "Show Gridlines",
      default: true,
      section: "Formatting",
      order: 35
    },

    column_spacing: {
      type: "number",
      label: "Column Spacing (px)",
      default: 12,
      display: "number",
      min: 0,
      max: 50,
      section: "Formatting",
      order: 36
    },

    row_spacing: {
      type: "number",
      label: "Row Spacing (px)",
      default: 0,
      display: "number",
      min: 0,
      max: 20,
      section: "Formatting",
      order: 37
    },

    formatting_divider_hover: {
      type: "string",
      label: "─────────────────────────────── Hover & Interaction ───────────────────────────────",
      display: "divider",
      section: "Formatting",
      order: 40
    },

    enable_hover: {
      type: "boolean",
      label: "Enable Hover Effects",
      default: true,
      section: "Formatting",
      order: 41
    },

    hover_highlight_type: {
      type: "string",
      label: "Hover Highlight Type",
      display: "select",
      values: [
        { "Cell": "cell" },
        { "Row": "row" },
        { "Column": "column" },
        { "Row & Column": "cross" }
      ],
      default: "row",
      section: "Formatting",
      order: 42
    },

    hover_bg_color: {
      type: "string",
      label: "Hover Background Color",
      display: "color",
      default: "#f3f4f6",
      section: "Formatting",
      order: 43
    },

    enable_tooltips: {
      type: "boolean",
      label: "Enable Tooltips",
      default: true,
      section: "Formatting",
      order: 44
    },

    tooltip_show_label: {
      type: "boolean",
      label: "Show Field Label in Tooltip",
      default: true,
      section: "Formatting",
      order: 45
    },

    formatting_divider_conditional: {
      type: "string",
      label: "─────────────────────────────── Conditional Formatting ───────────────────────────────",
      display: "divider",
      section: "Formatting",
      order: 50
    },

    enable_row_conditional: {
      type: "boolean",
      label: "Enable Row Conditional Formatting",
      default: false,
      section: "Formatting",
      order: 51
    },

    row_condition_field: {
      type: "string",
      label: "Row Condition Field",
      display: "text",
      default: "",
      placeholder: "field_name",
      section: "Formatting",
      order: 52
    },

    row_condition_operator: {
      type: "string",
      label: "Row Condition Operator",
      display: "select",
      values: [
        { "Greater Than": ">" },
        { "Less Than": "<" },
        { "Equal To": "==" },
        { "Greater or Equal": ">=" },
        { "Less or Equal": "<=" },
        { "Not Equal": "!=" },
        { "Contains": "contains" }
      ],
      default: ">",
      section: "Formatting",
      order: 53
    },

    row_condition_value: {
      type: "string",
      label: "Row Condition Value",
      display: "text",
      default: "",
      section: "Formatting",
      order: 54
    },

    row_condition_bg_color: {
      type: "string",
      label: "Row Condition Background Color",
      display: "color",
      default: "#fef3c7",
      section: "Formatting",
      order: 55
    },

    row_condition_text_color: {
      type: "string",
      label: "Row Condition Text Color",
      display: "color",
      default: "#92400e",
      section: "Formatting",
      order: 56
    },

    enable_column_conditional: {
      type: "boolean",
      label: "Enable Column Conditional Formatting",
      default: false,
      section: "Formatting",
      order: 57
    },

    column_condition_field: {
      type: "string",
      label: "Column Condition Field",
      display: "text",
      default: "",
      placeholder: "field_name",
      section: "Formatting",
      order: 58
    },

    column_condition_operator: {
      type: "string",
      label: "Column Condition Operator",
      display: "select",
      values: [
        { "Greater Than": ">" },
        { "Less Than": "<" },
        { "Equal To": "==" },
        { "Greater or Equal": ">=" },
        { "Less or Equal": "<=" },
        { "Not Equal": "!=" }
      ],
      default: ">",
      section: "Formatting",
      order: 59
    },

    column_condition_value: {
      type: "string",
      label: "Column Condition Value",
      display: "text",
      default: "",
      section: "Formatting",
      order: 60
    },

    column_condition_bg_color: {
      type: "string",
      label: "Column Condition Background Color",
      display: "color",
      default: "#dbeafe",
      section: "Formatting",
      order: 61
    },

    column_condition_text_color: {
      type: "string",
      label: "Column Condition Text Color",
      display: "color",
      default: "#1e40af",
      section: "Formatting",
      order: 62
    }
  },

  create: function(element, config) {
    console.log('[TABLE] ========================================');
    console.log('[TABLE] Advanced Table v4.12.7 - Build 2026-01-13');
    console.log('[TABLE] ✅ FIXED: Auto-collapse on dim change');
    console.log('[TABLE] ✅ FIXED: Recalculate pagination links');
    console.log('[TABLE] ========================================');

    element.innerHTML = `
      <style>
        #advanced-table-container {
          width: 100%;
          height: 100%;
          overflow: auto;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          position: relative;
        }

        .pagination-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background: #ffffff;
          border-bottom: 1px solid #e5e7eb;
        }

        .pagination-controls.bottom {
          border-top: 1px solid #e5e7eb;
          border-bottom: none;
        }

        .pagination-buttons {
          display: flex;
          gap: 8px;
        }

        .pagination-button {
          padding: 6px 12px;
          border: 1px solid #d1d5db;
          background: #ffffff;
          border-radius: 4px;
          cursor: pointer;
          font-size: 14px;
          transition: all 0.2s;
        }

        .pagination-button:hover:not(:disabled) {
          background: #f3f4f6;
          border-color: #9ca3af;
        }

        .pagination-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .pagination-info {
          font-size: 14px;
          color: #6b7280;
        }

        .filter-container {
          padding: 12px 16px;
          background: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
        }

        .filter-input {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 4px;
          font-size: 14px;
        }

        .filter-input:focus {
          outline: none;
          border-color: #3b82f6;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }

        .table-wrapper {
          overflow: auto;
          position: relative;
          max-height: 100%;
        }

        table.advanced-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          background: #ffffff;
        }

        table.advanced-table tbody td {
          font-size: var(--cell-font-size, 11px);
          color: var(--cell-text-color, #374151);
          height: var(--row-height, 36px);
          padding: var(--row-spacing, 0px) var(--column-spacing, 12px);
          white-space: var(--wrap-text, nowrap);
          overflow: hidden;
          text-overflow: ellipsis;
          border: var(--show-borders, 1px) var(--border-style, solid) var(--border-color, #e5e7eb);
        }

        .subtotal-toggle {
          font-family: monospace;
          font-size: 14px;
          font-weight: bold;
          color: #666;
          cursor: pointer;
          user-select: none;
          display: inline-block;
          width: 16px;
          text-align: center;
          margin-right: 4px;
        }

        .subtotal-trigger-cell {
          display: flex;
          align-items: center;
          white-space: nowrap !important;
        }

        table.advanced-table thead {
          position: sticky;
          top: 0;
          z-index: 100;
        }

        table.advanced-table thead th {
          position: sticky;
          top: 0;
          z-index: 100;
          background: inherit;
        }

        table.advanced-table thead th.frozen-column {
          z-index: 101;
        }

        table.advanced-table.striped tbody tr:nth-child(odd) {
          background: var(--stripe-color, #f9fafb) !important;
        }

        table.advanced-table.striped tbody tr:nth-child(even) {
          background: #ffffff !important;
        }

        table.advanced-table.striped tbody tr td {
          background: inherit !important;
        }

        .column-group-header {
          text-align: center;
          font-weight: 600;
          padding: 8px;
          border-bottom: 2px solid #d1d5db;
        }

        .frozen-column {
          position: sticky;
          z-index: 2;
          background: inherit;
        }

        th, td {
          padding: 8px 12px;
          text-align: left;
        }

        th.sortable {
          cursor: pointer;
          user-select: none;
        }

        th.sortable:hover {
          background: rgba(0, 0, 0, 0.05);
        }

        .sort-indicator {
          margin-left: 6px;
          font-size: 10px;
          color: #6b7280;
        }

        .column-filter {
          margin-top: 4px;
          width: 100%;
          padding: 4px 8px;
          border: 1px solid #d1d5db;
          border-radius: 3px;
          font-size: 12px;
        }

        .cell-bar-container {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
        }

        .cell-bar-background {
          flex: 1;
          height: 20px;
          background: #f3f4f6;
          border-radius: 3px;
          overflow: hidden;
          position: relative;
        }

        .cell-bar-fill {
          height: 100%;
          transition: width 0.3s ease;
          border-radius: 3px;
        }

        .cell-bar-value {
          font-weight: 500;
          white-space: nowrap;
          min-width: 50px;
          text-align: right;
        }

        .hierarchy-cell {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .hierarchy-toggle {
          cursor: pointer;
          width: 16px;
          height: 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          color: #6b7280;
          user-select: none;
          flex-shrink: 0;
        }

        .comparison-container {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .comparison-value {
          font-size: 0.85em;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .highlight-match {
          background-color: #fef08a;
          font-weight: 500;
        }

        .tooltip {
          position: fixed;
          background: rgba(0, 0, 0, 0.9);
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 12px;
          pointer-events: none;
          z-index: 10000;
          max-width: 300px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          display: none;
        }

        .tooltip.visible {
          display: block;
        }

        .row-number-cell {
          background: #f9fafb;
          font-weight: 500;
          color: #6b7280;
          text-align: center;
          border-right: 2px solid #e5e7eb;
        }

        .advanced-table tbody tr.subtotal-row {
          font-weight: 600;
          border-top: 2px solid #ddd;
          border-bottom: 1px solid #ddd;
          cursor: pointer;
        }

        .advanced-table tbody tr.grand-total-row {
          background-color: #e8e8e8 !important;
          font-weight: 700;
          border-top: 3px solid #333;
          border-bottom: 3px solid #333;
        }

        .advanced-table.modern tbody tr.grand-total-row {
          background-color: #bbdefb !important;
        }

        .drill-link {
          cursor: pointer;
          color: inherit;
          text-decoration: underline;
          text-decoration-style: dotted;
        }

        .drill-link:hover {
          text-decoration-style: solid;
        }

        @media print {
          .pagination-controls,
          .filter-container {
            display: none;
          }
        }
      </style>
      <div id="advanced-table-container"></div>
      <div class="tooltip" id="table-tooltip">
        <div class="tooltip-label"></div>
        <div class="tooltip-value"></div>
      </div>
    `;

    this.container = element.querySelector("#advanced-table-container");
    this.tooltip = element.querySelector("#table-tooltip");
    this.state = {
      currentPage: 1,
      sortField: null,
      sortDirection: 'asc',
      tableFilter: '',
      columnFilters: {},
      expandedRows: new Set(),
      collapsedGroups: {},
      lastSubtotalDimension: null,
      data: []
    };
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    this.clearErrors();
    if (!queryResponse || !data || data.length === 0) {
      this.addError({ title: "No Data", message: "No data available to display" });
      done();
      return;
    }

    const allFields = queryResponse.fields.dimension_like.concat(queryResponse.fields.measure_like);
    const dimensions = queryResponse.fields.dimension_like;
    if (dimensions.length > 0) {
      const dimensionValues = [{"None": ""}];
      dimensions.forEach(dim => {
        dimensionValues.push({[dim.label_short || dim.label]: dim.name});
      });
      this.options.subtotal_dimension.values = dimensionValues;
    }

    allFields.forEach((field, idx) => {
      const fieldKey = field.name;
      const baseOrder = 82 + (idx * 3);
      const fieldLabel = field.label_short || field.label;
      const dividerKey = `field_divider_${fieldKey}`;
      if (!this.options[dividerKey]) {
        this.options[dividerKey] = {
          type: "string",
          label: `━━━ ${fieldLabel} ━━━`,
          display: "divider",
          section: "Series",
          order: baseOrder
        };
      }
      const labelKey = `field_label_${fieldKey}`;
      if (!this.options[labelKey]) {
        this.options[labelKey] = {
          type: "string",
          label: "Label",
          display: "text",
          default: fieldLabel,
          placeholder: fieldLabel,
          section: "Series",
          order: baseOrder + 1
        };
      }
      const formatKey = `field_format_${fieldKey}`;
      if (!this.options[formatKey]) {
        this.options[formatKey] = {
          type: "string",
          label: "Value Format",
          display: "text",
          default: "",
          placeholder: field.is_numeric
            ? "$0,0.00 | 0.0% | 0,0 | $0.0,'k'"
            : "%Y-%m-%d | %b %d, %Y | %m/%d/%y",
          section: "Series",
          order: baseOrder + 2
        };
      }
    });

    this.trigger('registerOptions', this.options);
    this.state.data = data;
    this.config = config;
    this.queryResponse = queryResponse;

    if (details) {
      if (details.totals_enabled && queryResponse.totals_data) {
        config.show_grand_total = true;
      }
      if (details.subtotals_enabled && queryResponse.subtotals_data) {
        config.enable_subtotals = true;
      }
    }

    const parsedConfig = this.parseConfig(config);

    // AUTO-COLLAPSE ON DIMENSION CHANGE
    if (parsedConfig.subtotal_dimension && this.state.lastSubtotalDimension !== parsedConfig.subtotal_dimension) {
        this.state.collapsedGroups = {};
        this.state.lastSubtotalDimension = parsedConfig.subtotal_dimension;
        this.state.forceCollapseAll = true;
    }

    let filteredData = this.applyFilters(data, parsedConfig);

    if (this.state.sortField) {
      filteredData = this.sortData(filteredData, this.state.sortField, this.state.sortDirection);
    }

    if (parsedConfig.enable_subtotals && parsedConfig.subtotal_dimension) {
      const measures = queryResponse.fields.measure_like;
      const dimensions = queryResponse.fields.dimension_like;
      filteredData = this.calculateSubtotals(filteredData, parsedConfig.subtotal_dimension, measures, parsedConfig, dimensions);

      if (parsedConfig.subtotal_position === 'top') {
        // Initial state or Dimension Change: collapse everything
        if (!this.state.collapsedGroups || this.state.forceCollapseAll) {
          this.state.collapsedGroups = {};
          filteredData.forEach(row => {
            if (row.__isSubtotal) {
              this.state.collapsedGroups[row.__groupValue] = true;
            }
          });
          this.state.forceCollapseAll = false;
        }

        filteredData = filteredData.filter(row => {
          if (row.__isSubtotal) {
            row.__isCollapsed = this.state.collapsedGroups[row.__groupValue] || false;
            return true;
          }
          if (row.__parentGroup !== undefined) {
            return !this.state.collapsedGroups[row.__parentGroup];
          }
          return true;
        });
      }
    }

    if (parsedConfig.show_grand_total) {
      const measures = queryResponse.fields.measure_like;
      const dimensions = queryResponse.fields.dimension_like;
      const grandTotal = this.calculateGrandTotal(filteredData, measures, parsedConfig, dimensions);
      filteredData.push(grandTotal);
    }

    let grandTotalRow = null;
    let dataWithoutGrandTotal = filteredData;

    if (parsedConfig.show_grand_total && parsedConfig.show_grand_total_on_all_pages) {
      const grandTotalIdx = filteredData.findIndex(row => row.__isGrandTotal);
      if (grandTotalIdx >= 0) {
        grandTotalRow = filteredData[grandTotalIdx];
        dataWithoutGrandTotal = filteredData.filter(row => !row.__isGrandTotal);
      }
    }

    // Total pages calculation based on CURRENT visible rows
    const totalPages = Math.ceil(dataWithoutGrandTotal.length / parsedConfig.page_size);
    if (this.state.currentPage > totalPages && totalPages > 0) this.state.currentPage = totalPages;

    const startIdx = (this.state.currentPage - 1) * parsedConfig.page_size;
    const endIdx = startIdx + parsedConfig.page_size;
    let pageData = parsedConfig.enable_pagination ?
      dataWithoutGrandTotal.slice(startIdx, endIdx) : dataWithoutGrandTotal;

    if (grandTotalRow && parsedConfig.show_grand_total_on_all_pages) {
      pageData = [...pageData, grandTotalRow];
    }

    this.renderTable(pageData, filteredData, totalPages, parsedConfig, queryResponse);
    done();
  },

  parseConfig: function(config) {
    const parsed = { ...config };
    try {
      if (config.emoji_mapping) {
        parsed.emojis = JSON.parse(config.emoji_mapping);
      }
    } catch (e) {
      parsed.emojis = {};
    }

    parsed.fieldFormatting = {};
    if (config.enable_custom_field_formatting) {
      Object.keys(config).forEach(key => {
        if (key.startsWith('field_label_')) {
          const fieldName = key.replace('field_label_', '');
          if (!parsed.fieldFormatting[fieldName]) parsed.fieldFormatting[fieldName] = {};
          if (config[key] && config[key].trim() !== '') parsed.fieldFormatting[fieldName].label = config[key];
        } else if (key.startsWith('field_format_')) {
          const fieldName = key.replace('field_format_', '');
          if (!parsed.fieldFormatting[fieldName]) parsed.fieldFormatting[fieldName] = {};
          if (config[key] && config[key].trim() !== '') parsed.fieldFormatting[fieldName].format = config[key];
        }
      });
    }

    parsed.cellBarSets = [];
    for (let i = 1; i <= 3; i++) {
      if (config[`enable_cell_bars_${i}`] && config[`cell_bar_fields_${i}`]) {
        parsed.cellBarSets.push({
          fields: config[`cell_bar_fields_${i}`].split(',').map(f => f.trim()).filter(f => f),
          color: config[`cell_bar_color_${i}`],
          gradient: config[`cell_bar_gradient_${i}`],
          gradientEnd: config[`cell_bar_gradient_end_${i}`]
        });
      }
    }

    parsed.column_groups = [];
    const fields = this.queryResponse ?
      this.queryResponse.fields.dimension_like.concat(this.queryResponse.fields.measure_like) : [];

    let currentIndex = 0;
    for (let i = 1; i <= 3; i++) {
      const name = config[`column_group_${i}_name`];
      const count = config[`column_group_${i}_count`];
      if (name && count > 0) {
        const groupFields = fields.slice(currentIndex, currentIndex + count).map(f => f.name);
        if (groupFields.length > 0) {
          parsed.column_groups.push({ name, fields: groupFields });
          currentIndex += count;
        }
      }
    }

    if (config.group_remaining_columns && currentIndex < fields.length) {
      const remainingFields = fields.slice(currentIndex).map(f => f.name);
      parsed.column_groups.push({
        name: config.remaining_columns_name || 'Other',
        fields: remainingFields
      });
    }
    return parsed;
  },

  calculateSubtotals: function(data, groupByField, measures, config, dimensions) {
    if (!data || data.length === 0) return data;
    const result = [];
    const groups = {};
    const subtotalPosition = config.subtotal_position || 'bottom';

    data.forEach(row => {
      let groupValue = row[groupByField];
      if (groupValue && typeof groupValue === 'object') {
        groupValue = groupValue.value || groupValue.rendered || 'null';
      }
      groupValue = groupValue || 'null';
      if (!groups[groupValue]) groups[groupValue] = [];
      groups[groupValue].push(row);
    });

    Object.keys(groups).forEach(groupValue => {
      const groupRows = groups[groupValue];
      const subtotalRow = {
        __isSubtotal: true,
        __groupValue: groupValue,
        __groupField: groupByField,
        __isCollapsed: false
      };

      const labelTemplate = config.subtotal_label || '{value}';
      const subtotalLabel = labelTemplate.replace('{value}', groupValue === 'null' ? '∅' : groupValue);
      subtotalRow[groupByField] = { value: subtotalLabel, rendered: subtotalLabel };

      dimensions.forEach(dim => {
        if (dim.name !== groupByField) subtotalRow[dim.name] = { value: '', rendered: '' };
      });

      measures.forEach(measure => {
        let sum = 0;
        groupRows.forEach(row => {
          let value = row[measure.name];
          if (value && typeof value === 'object') value = value.value;
          if (value !== null && value !== undefined && !isNaN(value)) sum += Number(value);
        });
        subtotalRow[measure.name] = {
          value: sum,
          rendered: sum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
        };
      });

      if (subtotalPosition === 'top') {
        result.push(subtotalRow);
        groupRows.forEach(row => {
          row.__parentGroup = groupValue;
          row.__parentField = groupByField;
          result.push(row);
        });
      } else {
        groupRows.forEach(row => result.push(row));
        result.push(subtotalRow);
      }
    });
    return result;
  },

  calculateGrandTotal: function(data, measures, config, dimensions) {
    const totalRow = { __isGrandTotal: true };
    const label = config.grand_total_label || 'Grand Total';
    if (dimensions.length > 0) {
      const firstDimField = dimensions[0].name;
      totalRow[firstDimField] = { value: label, rendered: label };
      dimensions.forEach((dim, idx) => {
        if (idx > 0) totalRow[dim.name] = { value: '', rendered: '' };
      });
    }
    measures.forEach(measure => {
      let sum = 0;
      data.forEach(row => {
        if (row.__isSubtotal) return;
        let value = row[measure.name];
        if (value && typeof value === 'object') value = value.value;
        if (value !== null && value !== undefined && !isNaN(value)) sum += Number(value);
      });
      totalRow[measure.name] = {
        value: sum,
        rendered: sum.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      };
    });
    return totalRow;
  },

  applyFilters: function(data, config) {
    let filtered = [...data];
    if (config.enable_table_filter && this.state.tableFilter) {
      const filterLower = this.state.tableFilter.toLowerCase();
      filtered = filtered.filter(row => Object.values(row).some(value => {
        const val = value && value.value !== undefined ? String(value.value) : String(value);
        return val.toLowerCase().includes(filterLower);
      }));
    }
    if (config.enable_column_filters) {
      Object.keys(this.state.columnFilters).forEach(field => {
        const filterValue = this.state.columnFilters[field];
        if (filterValue) {
          const filterLower = filterValue.toLowerCase();
          filtered = filtered.filter(row => {
            const cellValue = row[field];
            const value = cellValue && cellValue.value !== undefined ? cellValue.value : cellValue;
            return String(value).toLowerCase().includes(filterLower);
          });
        }
      });
    }
    return filtered;
  },

  sortData: function(data, field, direction) {
    return [...data].sort((a, b) => {
      let aVal = a[field];
      let bVal = b[field];
      if (aVal && aVal.value !== undefined) aVal = aVal.value;
      if (bVal && bVal.value !== undefined) bVal = bVal.value;
      if (aVal === null || aVal === undefined) return direction === 'asc' ? 1 : -1;
      if (bVal === null || bVal === undefined) return direction === 'asc' ? -1 : 1;
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return direction === 'asc' ? aVal - bVal : bVal - aVal;
      }
      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();
      return direction === 'asc' ? (aStr < bStr ? -1 : aStr > bStr ? 1 : 0) : (aStr > bStr ? -1 : aStr < bStr ? 1 : 0);
    });
  },

  renderTable: function(pageData, allFilteredData, totalPages, config, queryResponse) {
    let html = '';
    const existingStyle = document.getElementById('table-stripe-style');
    if (existingStyle) existingStyle.remove();
    const style = document.createElement('style');
    style.id = 'table-stripe-style';
    style.innerHTML = `:root {
      --stripe-color: ${config.stripe_color || '#f9fafb'};
      --cell-font-size: ${config.cell_font_size || 11}px;
      --cell-text-color: ${config.cell_text_color || '#374151'};
      --row-height: ${config.row_height || 36}px;
      --row-spacing: ${config.row_spacing || 0}px;
      --column-spacing: ${config.column_spacing || 12}px;
      --wrap-text: ${config.wrap_text ? 'normal' : 'nowrap'};
      --show-borders: ${config.show_borders ? config.border_width || 1 : 0}px;
      --border-style: ${config.border_style || 'solid'};
      --border-color: ${config.border_color || '#e5e7eb'};
      --column-condition-bg-color: ${config.column_condition_bg_color || '#dbeafe'};
      --column-condition-text-color: ${config.column_condition_text_color || '#1e40af'};
      --row-condition-bg-color: ${config.row_condition_bg_color || '#fef3c7'};
      --row-condition-text-color: ${config.row_condition_text_color || '#92400e'};
      --subtotal-bg-color: ${config.subtotal_background_color || '#f0f0f0'};
    }
    .advanced-table tbody tr.subtotal-row { background-color: var(--subtotal-bg-color) !important; }`;
    document.head.appendChild(style);

    if (config.enable_pagination && (config.pagination_position === 'top' || config.pagination_position === 'both')) {
      html += this.renderPagination(allFilteredData.length, totalPages, config, 'top');
    }

    if (config.enable_table_filter) {
      html += `<div class="filter-container"><input type="text" class="filter-input" placeholder="Search... (Enter)" value="${this.escapeHtml(this.state.tableFilter)}" id="table-filter-input" /></div>`;
    }

    html += '<div class="table-wrapper">';
    html += `<table class="advanced-table ${config.table_theme}" style="${this.getTableStyles(config)}">`;
    if (config.enable_column_groups && config.column_groups.length > 0) html += this.renderColumnGroups(config, queryResponse);
    if (config.show_headers) html += this.renderHeaders(config, queryResponse);
    html += this.renderBody(pageData, allFilteredData, config, queryResponse);
    html += '</table></div>';

    if (config.enable_pagination && (config.pagination_position === 'bottom' || config.pagination_position === 'both')) {
      html += this.renderPagination(allFilteredData.length, totalPages, config, 'bottom');
    }

    this.container.innerHTML = html;
    this.attachEventListeners(config);
  },

  renderPagination: function(totalRows, totalPages, config, position) {
    const { currentPage } = this.state;
    return `<div class="pagination-controls ${position}">
      ${config.show_page_info ? `<div class="pagination-info">Showing ${(currentPage-1)*config.page_size+1}-${Math.min(currentPage*config.page_size, totalRows)} of ${totalRows}</div>` : ''}
      <div class="pagination-buttons">
        <button class="pagination-button" data-action="first" ${currentPage === 1 ? 'disabled' : ''}>⟨⟨</button>
        <button class="pagination-button" data-action="prev" ${currentPage === 1 ? 'disabled' : ''}>⟨</button>
        <span style="padding: 0 12px; display: flex; align-items: center;">Page ${currentPage} of ${totalPages}</span>
        <button class="pagination-button" data-action="next" ${currentPage === totalPages ? 'disabled' : ''}>⟩</button>
        <button class="pagination-button" data-action="last" ${currentPage === totalPages ? 'disabled' : ''}>⟩⟩</button>
      </div></div>`;
  },

  renderColumnGroups: function(config, queryResponse) {
    const fields = queryResponse.fields.dimension_like.concat(queryResponse.fields.measure_like);
    let html = '<thead><tr>';
    if (config.show_row_numbers) html += '<th rowspan="2" class="row-number-cell">#</th>';
    const groupedFields = new Set();
    config.column_groups.forEach(group => {
      html += `<th colspan="${group.fields.length}" class="column-group-header" style="background: ${config.group_header_bg_color};">${this.escapeHtml(group.name)}</th>`;
      group.fields.forEach(f => groupedFields.add(f));
    });
    fields.forEach(field => { if (!groupedFields.has(field.name)) html += '<th rowspan="2"></th>'; });
    html += '</tr></thead>';
    return html;
  },

  renderHeaders: function(config, queryResponse) {
    const fields = queryResponse.fields.dimension_like.concat(queryResponse.fields.measure_like);
    let html = `<thead><tr style="${this.getHeaderStyles(config)}">`;
    if (config.show_row_numbers) html += `<th class="row-number-cell">#</th>`;
    let leftOffset = 0;
    fields.forEach((field, idx) => {
      const isFrozen = idx < config.freeze_columns;
      const displayLabel = (config.fieldFormatting && config.fieldFormatting[field.name]?.label) || (field.label_short || field.label);
      html += `<th class="sortable ${isFrozen ? 'frozen-column' : ''}" data-field="${field.name}" style="${isFrozen ? `left: ${leftOffset}px;` : ''}">
        ${this.escapeHtml(displayLabel)}
        ${this.state.sortField === field.name ? `<span class="sort-indicator">${this.state.sortDirection === 'asc' ? '▲' : '▼'}</span>` : ''}
        ${config.enable_column_filters ? `<input type="text" class="column-filter" data-field="${field.name}" value="${this.escapeHtml(this.state.columnFilters[field.name] || '')}"/>` : ''}
      </th>`;
      if (isFrozen) leftOffset += 150;
    });
    return html + '</tr></thead>';
  },

  renderBody: function(pageData, allFilteredData, config, queryResponse) {
    const fields = queryResponse.fields.dimension_like.concat(queryResponse.fields.measure_like);
    const pageOffset = (this.state.currentPage - 1) * config.page_size;
    let html = '<tbody>';

    pageData.forEach((row, pageRowIdx) => {
      const actualRowIdx = pageOffset + pageRowIdx;
      const isSubtotalRow = !!row.__isSubtotal;
      const isGrandTotalRow = !!row.__isGrandTotal;
      const isCollapsed = !!row.__isCollapsed;
      const rowClass = isGrandTotalRow ? 'grand-total-row' : (isSubtotalRow ? `subtotal-row position-${config.subtotal_position}${isCollapsed ? ' collapsed' : ''}` : 'detail-row');

      const dataAttrs = [`data-row="${pageRowIdx}"`, `class="${rowClass}"`, isSubtotalRow ? `data-group="${row.__groupValue}"` : ''].filter(Boolean).join(' ');
      html += `<tr ${dataAttrs}>`;

      if (config.show_row_numbers) {
        html += `<td class="row-number-cell">${(isSubtotalRow || isGrandTotalRow) ? '' : actualRowIdx + 1}</td>`;
      }

      let leftOffset = 0;
      fields.forEach((field, colIdx) => {
        const cellValue = row[field.name];
        let cellContent = this.renderCellContent(cellValue, field, config, row, actualRowIdx, allFilteredData);

        if (isSubtotalRow && config.subtotal_position === 'top' && colIdx === 0) {
          const icon = isCollapsed ? '▶' : '▼';
          cellContent = `<span class="subtotal-toggle">${icon}</span>${cellContent}`;
        }

        const isFrozen = colIdx < config.freeze_columns;
        html += `<td class="${isFrozen ? 'frozen-column' : ''} ${isSubtotalRow && colIdx === 0 ? 'subtotal-trigger-cell' : ''}" style="${isFrozen ? `left: ${leftOffset}px;` : ''}">
          ${cellContent}
        </td>`;
        if (isFrozen) leftOffset += 150;
      });
      html += '</tr>';
    });
    return html + '</tbody>';
  },

  formatValue: function(value, customFormat, field, renderedValue) {
    if (value === null || value === undefined) return '';
    if (customFormat && customFormat.trim() !== '') {
        if (!isNaN(value)) {
          const num = Number(value);
          const decimals = (customFormat.match(/0\.([0#]+)/) || [])[1]?.length || 0;
          return num.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals, useGrouping: customFormat.includes(',') });
        }
        return String(value);
    }
    return renderedValue !== null ? renderedValue : String(value);
  },

  renderCellContent: function(cellValue, field, config, row, rowIdx, data) {
    let value = cellValue, rendered = cellValue, drillLinks = [];
    if (cellValue && typeof cellValue === 'object') {
      value = cellValue.value;
      rendered = cellValue.rendered || cellValue.value;
      drillLinks = cellValue.links || [];
    }
    if (value === null || value === undefined) return '∅';

    const fieldFormat = config.fieldFormatting && config.fieldFormatting[field.name];
    if (fieldFormat && fieldFormat.format && value !== '') {
      rendered = this.formatValue(value, fieldFormat.format, field, rendered);
    }

    if (config.enable_comparison && config.comparison_primary_field === field.name) {
       return this.renderComparison(row, config, drillLinks, rowIdx, data);
    }

    if (drillLinks.length > 0) {
      const drillId = `drill-${Math.random().toString(36).substr(2, 9)}`;
      rendered = `<span class="drill-link" data-drill-id="${drillId}">${rendered}</span>`;
      setTimeout(() => {
        const elem = document.querySelector(`[data-drill-id="${drillId}"]`);
        if (elem) elem.addEventListener('click', (e) => LookerCharts.Utils.openDrillMenu({ links: drillLinks, event: e }));
      }, 0);
    }
    return rendered;
  },

  renderComparison: function(row, config, drillLinks, rowIdx, data) {
    const primaryCell = row[config.comparison_primary_field];
    if (!primaryCell) return '';
    const primary = parseFloat(primaryCell.value !== undefined ? primaryCell.value : primaryCell);
    const primaryRendered = primaryCell.rendered || primary;
    if (isNaN(primary)) return String(primaryRendered);

    let secondary = 0;
    if (config.comparison_mode === 'metric') {
      const secondaryCell = row[config.comparison_secondary_field];
      if (secondaryCell) secondary = parseFloat(secondaryCell.value !== undefined ? secondaryCell.value : secondaryCell);
    } else if (config.comparison_mode === 'period' && data && rowIdx !== undefined) {
      const compareRow = data[rowIdx - config.comparison_period_offset];
      if (compareRow && compareRow[config.comparison_primary_field]) {
        secondary = parseFloat(compareRow[config.comparison_primary_field].value || compareRow[config.comparison_primary_field]);
      }
    }

    if (isNaN(secondary) || secondary === 0) return String(primaryRendered);
    const diff = primary - secondary;
    const isPos = diff >= 0;
    const color = isPos ? config.positive_comparison_color : config.negative_comparison_color;
    return `<div class="comparison-container"><span>${primaryRendered}</span><span style="color:${color}; font-size:0.85em;">${config.show_comparison_arrows ? (isPos?'↑':'↓') : ''} ${Math.abs((diff/Math.abs(secondary))*100).toFixed(1)}%</span></div>`;
  },

  getTableStyles: function(config) { return (config.table_theme !== 'minimal' && config.show_borders) ? `border: ${config.border_width}px ${config.border_style} ${config.border_color};` : ''; },
  getHeaderStyles: function(config) { return `font-size:${config.header_font_size}px; font-weight:${config.header_font_weight}; color:${config.header_text_color}; background-color:${config.header_bg_color}; text-align:${config.header_alignment};`; },

  evaluateCondition: function(value, operator, compareValue) {
    const numValue = parseFloat(value), numCompare = parseFloat(compareValue);
    if (!isNaN(numValue) && !isNaN(numCompare)) {
      switch (operator) {
        case '>': return numValue > numCompare; case '<': return numValue < numCompare;
        case '==': return numValue === numCompare;
      }
    }
    return operator === '==' ? String(value).toLowerCase() === String(compareValue).toLowerCase() : false;
  },

  attachEventListeners: function(config) {
    const self = this;
    if (config.subtotal_position === 'top') {
      this.container.querySelectorAll('tr.subtotal-row.position-top').forEach(row => {
        row.addEventListener('click', function() {
          const groupValue = this.dataset.group;
          if (!self.state.collapsedGroups) self.state.collapsedGroups = {};
          if (this.classList.contains('collapsed')) delete self.state.collapsedGroups[groupValue];
          else self.state.collapsedGroups[groupValue] = true;
          self.state.currentPage = 1; // Recalculate paging on sub total adjustments
          self.updateAsync(self.state.data, self.container.parentElement, self.config, self.queryResponse, {}, () => {});
        });
      });
    }
    this.container.querySelectorAll('.pagination-button').forEach(btn => {
      btn.addEventListener('click', function() {
        const totalPages = Math.ceil(self.state.data.length / config.page_size);
        switch (this.dataset.action) {
          case 'first': self.state.currentPage = 1; break;
          case 'prev': self.state.currentPage = Math.max(1, self.state.currentPage - 1); break;
          case 'next': self.state.currentPage = Math.min(totalPages, self.state.currentPage + 1); break;
          case 'last': self.state.currentPage = totalPages; break;
        }
        self.updateAsync(self.state.data, self.container.parentElement, self.config, self.queryResponse, {}, () => {});
      });
    });
    const filterInput = this.container.querySelector('#table-filter-input');
    if (filterInput) filterInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') { self.state.tableFilter = filterInput.value; self.state.currentPage = 1; self.updateAsync(self.state.data, self.container.parentElement, self.config, self.queryResponse, {}, () => {}); } });
    this.container.querySelectorAll('.column-filter').forEach(input => {
      input.addEventListener('keypress', (e) => { if (e.key === 'Enter') { self.state.columnFilters[input.dataset.field] = input.value; self.state.currentPage = 1; self.updateAsync(self.state.data, self.container.parentElement, self.config, self.queryResponse, {}, () => {}); } });
      input.addEventListener('click', (e) => e.stopPropagation());
    });
    this.container.querySelectorAll('th.sortable').forEach(th => {
      th.addEventListener('click', (e) => {
        if (e.target.classList.contains('column-filter')) return;
        const field = th.dataset.field;
        self.state.sortDirection = (self.state.sortField === field && self.state.sortDirection === 'asc') ? 'desc' : 'asc';
        self.state.sortField = field;
        self.updateAsync(self.state.data, self.container.parentElement, self.config, self.queryResponse, {}, () => {});
      });
    });
  },

  escapeHtml: function(text) { const div = document.createElement('div'); div.textContent = text; return div.innerHTML; },
  trigger: function(event) {}
};

looker.plugins.visualizations.add(visObject);

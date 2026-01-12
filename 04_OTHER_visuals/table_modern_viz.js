/**
 * Advanced Table Visualization for Looker
 * Version: 4.3.0 - Filter Fix + Field Formatting
 * Build: 2026-01-12-v5
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

    series_divider_hierarchy: {
      type: "string",
      label: "─────────────────────────────── Hierarchical Data ───────────────────────────────",
      display: "divider",
      section: "Series",
      order: 40
    },

    enable_hierarchy: {
      type: "boolean",
      label: "Enable Hierarchical Display",
      default: false,
      section: "Series",
      order: 41
    },

    hierarchy_mode: {
      type: "string",
      label: "Hierarchy Mode",
      display: "select",
      values: [
        { "Inline (Single Column Indent)": "inline" },
        { "Tree View (SAP BO Style)": "tree" }
      ],
      default: "inline",
      section: "Series",
      order: 42
    },

    hierarchy_fields: {
      type: "string",
      label: "Hierarchy Fields (comma-separated, left to right)",
      display: "text",
      default: "",
      placeholder: "continent,country,city,plant_id",
      section: "Series",
      order: 43
    },

    hierarchy_indent: {
      type: "number",
      label: "Hierarchy Indent (px)",
      default: 20,
      display: "number",
      min: 0,
      max: 100,
      section: "Series",
      order: 44
    },

    show_hierarchy_icons: {
      type: "boolean",
      label: "Show Hierarchy Expand/Collapse Icons",
      default: true,
      section: "Series",
      order: 45
    },

    hierarchy_collapse_by_default: {
      type: "boolean",
      label: "Collapse All by Default",
      default: true,
      section: "Series",
      order: 46
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

    // Dynamic field formatting options will be added here in updateAsync
    // Each field gets: label, alignment, width, font options

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
    console.log('[TABLE] Advanced Table v4.3.0 - Build 2026-01-12-v5');
    console.log('[TABLE] Filter fix + Field formatting');
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

        /* Apply cell styles via CSS instead of inline */
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

        table.advanced-table tbody td[data-column-conditional="true"] {
          background-color: var(--column-condition-bg-color, #dbeafe) !important;
          color: var(--column-condition-text-color, #1e40af) !important;
        }

        table.advanced-table tbody tr[data-row-conditional="true"] td {
          background-color: var(--row-condition-bg-color, #fef3c7) !important;
          color: var(--row-condition-text-color, #92400e) !important;
        }

        /* FROZEN HEADER - Critical positioning */
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

        /* Frozen columns within header have higher z-index */
        table.advanced-table thead th.frozen-column {
          z-index: 101;
        }

        /* STRIPED THEME - Use CSS custom property with !important to override inline styles */
        table.advanced-table.striped tbody tr:nth-child(odd) {
          background: var(--stripe-color, #f9fafb) !important;
        }

        table.advanced-table.striped tbody tr:nth-child(even) {
          background: #ffffff !important;
        }

        /* Override cell background in striped mode */
        table.advanced-table.striped tbody tr td {
          background: inherit !important;
        }

        /* MINIMAL THEME */
        table.advanced-table.minimal {
          border: none;
        }

        table.advanced-table.minimal th,
        table.advanced-table.minimal td {
          border: none;
          border-bottom: 1px solid #f3f4f6;
        }

        /* CLASSIC THEME */
        table.advanced-table.classic {
          border: 2px solid #d1d5db;
        }

        table.advanced-table.classic th {
          background: #e5e7eb;
          border: 1px solid #d1d5db;
        }

        table.advanced-table.classic td {
          border: 1px solid #e5e7eb;
        }

        /* BORDERED THEME */
        table.advanced-table.bordered {
          border: 2px solid #374151;
        }

        table.advanced-table.bordered th {
          background: #1f2937;
          color: #ffffff;
          border: 1px solid #4b5563;
        }

        table.advanced-table.bordered td {
          border: 1px solid #d1d5db;
        }

        /* COMPACT THEME */
        table.advanced-table.compact th,
        table.advanced-table.compact td {
          padding: 4px 8px !important;
          font-size: 10px;
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

        .hierarchy-toggle:hover {
          color: #374151;
        }

        .hierarchy-content {
          flex: 1;
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

        .comparison-arrow {
          font-size: 0.9em;
        }

        .comparison-bar {
          height: 6px;
          border-radius: 3px;
          transition: width 0.3s ease;
          margin-top: 4px;
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

        .tooltip-label {
          font-weight: 600;
          margin-bottom: 4px;
        }

        .row-number-cell {
          background: #f9fafb;
          font-weight: 500;
          color: #6b7280;
          text-align: center;
          border-right: 2px solid #e5e7eb;
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
      data: []
    };
  },

  updateAsync: function(data, element, config, queryResponse, details, done) {
    console.log('[TABLE] Starting updateAsync');
    this.clearErrors();

    // Validate data
    if (!queryResponse || !data || data.length === 0) {
      this.addError({ title: "No Data", message: "No data available to display" });
      done();
      return;
    }

    // Dynamically add field formatting options
    const allFields = queryResponse.fields.dimension_like.concat(queryResponse.fields.measure_like);
    console.log('[TABLE] Adding dynamic field formatting options for', allFields.length, 'fields');

    allFields.forEach((field, idx) => {
      const fieldKey = field.name.replace(/\./g, '_');
      const baseOrder = 82 + (idx * 3); // 3 options per field

      // Label
      if (!this.options[`field_label_${fieldKey}`]) {
        this.options[`field_label_${fieldKey}`] = {
          type: "string",
          label: `${field.label_short || field.label} - Label`,
          display: "text",
          default: field.label_short || field.label,
          placeholder: field.label_short || field.label,
          section: "Series",
          order: baseOrder
        };
      }

      // Alignment
      if (!this.options[`field_align_${fieldKey}`]) {
        this.options[`field_align_${fieldKey}`] = {
          type: "string",
          label: `${field.label_short || field.label} - Alignment`,
          display: "select",
          values: [
            { "Auto": "auto" },
            { "Left": "left" },
            { "Center": "center" },
            { "Right": "right" }
          ],
          default: "auto",
          section: "Series",
          order: baseOrder + 1
        };
      }

      // Width
      if (!this.options[`field_width_${fieldKey}`]) {
        this.options[`field_width_${fieldKey}`] = {
          type: "number",
          label: `${field.label_short || field.label} - Width (px)`,
          display: "number",
          default: 150,
          min: 50,
          max: 500,
          section: "Series",
          order: baseOrder + 2
        };
      }
    });

    // Trigger options update
    this.trigger('registerOptions', this.options);

    // Store data and config
    this.state.data = data;
    this.config = config;
    this.queryResponse = queryResponse;

    // Parse configuration
    const parsedConfig = this.parseConfig(config);

    console.log('[TABLE] Config parsed, freeze_header_row:', parsedConfig.freeze_header_row);
    console.log('[TABLE] Table theme:', parsedConfig.table_theme);
    console.log('[TABLE] Stripe color:', parsedConfig.stripe_color);

    // Apply filters
    let filteredData = this.applyFilters(data, parsedConfig);

    // Apply sorting
    if (this.state.sortField) {
      filteredData = this.sortData(filteredData, this.state.sortField, this.state.sortDirection);
    }

    // Process hierarchical data if enabled
    if (parsedConfig.enable_hierarchy && parsedConfig.hierarchy_field) {
      filteredData = this.processHierarchicalData(filteredData, parsedConfig, queryResponse);
    }

    // Calculate pagination
    const totalPages = Math.ceil(filteredData.length / parsedConfig.page_size);
    const startIdx = (this.state.currentPage - 1) * parsedConfig.page_size;
    const endIdx = startIdx + parsedConfig.page_size;
    const pageData = parsedConfig.enable_pagination ?
      filteredData.slice(startIdx, endIdx) : filteredData;

    // Render table
    this.renderTable(pageData, filteredData, totalPages, parsedConfig, queryResponse);

    console.log('[TABLE] Render complete');
    done();
  },

  parseConfig: function(config) {
    const parsed = { ...config };

    // Parse JSON configurations
    try {
      if (config.emoji_mapping) {
        parsed.emojis = JSON.parse(config.emoji_mapping);
      }
    } catch (e) {
      parsed.emojis = {};
    }

    // Extract custom field formatting (labels, alignment, width)
    parsed.fieldFormatting = {};
    if (config.enable_custom_field_formatting) {
      Object.keys(config).forEach(key => {
        if (key.startsWith('field_label_')) {
          const fieldName = key.replace('field_label_', '').replace(/_/g, '.');
          if (!parsed.fieldFormatting[fieldName]) {
            parsed.fieldFormatting[fieldName] = {};
          }
          if (config[key] && config[key].trim() !== '') {
            parsed.fieldFormatting[fieldName].label = config[key];
          }
        } else if (key.startsWith('field_align_')) {
          const fieldName = key.replace('field_align_', '').replace(/_/g, '.');
          if (!parsed.fieldFormatting[fieldName]) {
            parsed.fieldFormatting[fieldName] = {};
          }
          parsed.fieldFormatting[fieldName].alignment = config[key];
        } else if (key.startsWith('field_width_')) {
          const fieldName = key.replace('field_width_', '').replace(/_/g, '.');
          if (!parsed.fieldFormatting[fieldName]) {
            parsed.fieldFormatting[fieldName] = {};
          }
          parsed.fieldFormatting[fieldName].width = config[key];
        }
      });
    }
    console.log('[TABLE] Field formatting:', parsed.fieldFormatting);

    // Parse cell bar sets
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

    // Parse column groups based on counts
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

    // Handle remaining columns
    if (config.group_remaining_columns && currentIndex < fields.length) {
      const remainingFields = fields.slice(currentIndex).map(f => f.name);
      parsed.column_groups.push({
        name: config.remaining_columns_name || 'Other',
        fields: remainingFields
      });
    }

    return parsed;
  },

  applyFilters: function(data, config) {
    let filtered = [...data];

    // Apply table-wide filter
    if (config.enable_table_filter && this.state.tableFilter) {
      const filterLower = this.state.tableFilter.toLowerCase();
      filtered = filtered.filter(row => {
        return Object.values(row).some(value => {
          if (value && value.value !== undefined) {
            return String(value.value).toLowerCase().includes(filterLower);
          }
          return String(value).toLowerCase().includes(filterLower);
        });
      });
    }

    // Apply column filters
    if (config.enable_column_filters) {
      Object.keys(this.state.columnFilters).forEach(field => {
        const filterValue = this.state.columnFilters[field];
        if (filterValue) {
          const filterLower = filterValue.toLowerCase();
          filtered = filtered.filter(row => {
            const cellValue = row[field];
            const value = cellValue && cellValue.value !== undefined ?
              cellValue.value : cellValue;
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

      // Extract values from Looker cell objects
      if (aVal && aVal.value !== undefined) aVal = aVal.value;
      if (bVal && bVal.value !== undefined) bVal = bVal.value;

      // Handle null/undefined
      if (aVal === null || aVal === undefined) return direction === 'asc' ? 1 : -1;
      if (bVal === null || bVal === undefined) return direction === 'asc' ? -1 : 1;

      // Numeric comparison
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return direction === 'asc' ? aVal - bVal : bVal - aVal;
      }

      // String comparison
      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();

      if (direction === 'asc') {
        return aStr < bStr ? -1 : aStr > bStr ? 1 : 0;
      } else {
        return aStr > bStr ? -1 : aStr < bStr ? 1 : 0;
      }
    });
  },

  processHierarchicalData: function(data, config, queryResponse) {
    if (!config.hierarchy_field) return data;

    // Find hierarchy levels
    const hierarchyField = config.hierarchy_field;
    const childrenMap = new Map();

    data.forEach((row, idx) => {
      const value = row[hierarchyField];
      const strValue = value && value.value !== undefined ? String(value.value) : String(value);
      row._hierarchy_id = strValue;

      // For date hierarchy
      if (config.detect_date_hierarchy) {
        const dateMatch = strValue.match(/(\d{4})-?(\d{2})?-?(\d{2})?/);
        if (dateMatch) {
          const year = dateMatch[1];
          const month = dateMatch[2];
          const day = dateMatch[3];

          if (day) {
            row._hierarchy_level = 2;
            row._hierarchy_parent = `${year}-${month}`;
            if (!childrenMap.has(`${year}-${month}`)) {
              childrenMap.set(`${year}-${month}`, []);
            }
            childrenMap.get(`${year}-${month}`).push(strValue);
          } else if (month) {
            row._hierarchy_level = 1;
            row._hierarchy_parent = year;
            if (!childrenMap.has(year)) {
              childrenMap.set(year, []);
            }
            childrenMap.get(year).push(strValue);
          } else {
            row._hierarchy_level = 0;
            row._hierarchy_parent = null;
          }
        }
      }
    });

    // Mark rows that have children
    data.forEach(row => {
      row._has_children = childrenMap.has(row._hierarchy_id);
      row._children = childrenMap.get(row._hierarchy_id) || [];
    });

    return data;
  },

  renderTable: function(pageData, allFilteredData, totalPages, config, queryResponse) {
    console.log('[TABLE] renderTable called');
    console.log('[TABLE] - freeze_header_row:', config.freeze_header_row);
    console.log('[TABLE] - table_theme:', config.table_theme);
    console.log('[TABLE] - stripe_color:', config.stripe_color);

    let html = '';

    // Set CSS variables for stripe color and cell styling
    const existingStyle = document.getElementById('table-stripe-style');
    if (existingStyle) {
      existingStyle.remove();
    }
    const style = document.createElement('style');
    style.id = 'table-stripe-style';

    // Build CSS with all variables
    let cssVars = `:root {
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
    }`;

    style.innerHTML = cssVars;
    document.head.appendChild(style);
    console.log('[TABLE] Injected CSS variables');

    // Top pagination
    if (config.enable_pagination && (config.pagination_position === 'top' || config.pagination_position === 'both')) {
      html += this.renderPagination(allFilteredData.length, totalPages, config, 'top');
    }

    // Table-wide filter
    if (config.enable_table_filter) {
      html += `
        <div class="filter-container">
          <input
            type="text"
            class="filter-input"
            placeholder="Search across all columns... (Press Enter)"
            value="${this.escapeHtml(this.state.tableFilter)}"
            id="table-filter-input"
          />
        </div>
      `;
    }

    // Table
    html += '<div class="table-wrapper">';
    html += `<table class="advanced-table ${config.table_theme}" style="${this.getTableStyles(config)}">`;
    console.log('[TABLE] Table classes:', `advanced-table ${config.table_theme}`);

    // Column groups
    if (config.enable_column_groups && config.column_groups.length > 0) {
      html += this.renderColumnGroups(config, queryResponse);
    }

    // Headers
    if (config.show_headers) {
      html += this.renderHeaders(config, queryResponse);
    }

    // Body
    html += this.renderBody(pageData, allFilteredData, config, queryResponse);

    html += '</table></div>';

    // Bottom pagination
    if (config.enable_pagination && (config.pagination_position === 'bottom' || config.pagination_position === 'both')) {
      html += this.renderPagination(allFilteredData.length, totalPages, config, 'bottom');
    }

    this.container.innerHTML = html;
    console.log('[TABLE] HTML rendered, checking for frozen headers...');

    // Check if headers are properly frozen
    setTimeout(() => {
      const thead = this.container.querySelector('thead');
      if (thead) {
        const computedStyle = window.getComputedStyle(thead);
        console.log('[TABLE] thead computed position:', computedStyle.position);
        console.log('[TABLE] thead computed top:', computedStyle.top);
        console.log('[TABLE] thead computed z-index:', computedStyle.zIndex);
      }

      const stripeCheck = this.container.querySelector('tbody tr:nth-child(odd)');
      if (stripeCheck) {
        const stripeStyle = window.getComputedStyle(stripeCheck);
        console.log('[TABLE] First odd row background:', stripeStyle.backgroundColor);
        console.log('[TABLE] First odd row inline style:', stripeCheck.getAttribute('style'));
      }

      const stripeCheckEven = this.container.querySelector('tbody tr:nth-child(even)');
      if (stripeCheckEven) {
        const evenStyle = window.getComputedStyle(stripeCheckEven);
        console.log('[TABLE] First even row background:', evenStyle.backgroundColor);
      }

      // Check if table has striped class
      const table = this.container.querySelector('table');
      console.log('[TABLE] Table classList:', table.className);
      console.log('[TABLE] Has striped class:', table.classList.contains('striped'));

      // Check CSS variable
      const root = document.querySelector(':root');
      const rootStyle = window.getComputedStyle(root);
      console.log('[TABLE] CSS variable --stripe-color:', rootStyle.getPropertyValue('--stripe-color'));
    }, 100);

    // Attach event listeners
    this.attachEventListeners(config);
  },

  renderPagination: function(totalRows, totalPages, config, position) {
    const { currentPage } = this.state;

    let html = `<div class="pagination-controls ${position}">`;

    if (config.show_page_info) {
      const startRow = (currentPage - 1) * config.page_size + 1;
      const endRow = Math.min(currentPage * config.page_size, totalRows);
      html += `<div class="pagination-info">Showing ${startRow}-${endRow} of ${totalRows} rows</div>`;
    }

    html += '<div class="pagination-buttons">';
    html += `
      <button class="pagination-button" data-action="first" ${currentPage === 1 ? 'disabled' : ''}>⟨⟨</button>
      <button class="pagination-button" data-action="prev" ${currentPage === 1 ? 'disabled' : ''}>⟨</button>
      <span style="padding: 0 12px; display: flex; align-items: center;">Page ${currentPage} of ${totalPages}</span>
      <button class="pagination-button" data-action="next" ${currentPage === totalPages ? 'disabled' : ''}>⟩</button>
      <button class="pagination-button" data-action="last" ${currentPage === totalPages ? 'disabled' : ''}>⟩⟩</button>
    `;
    html += '</div></div>';

    return html;
  },

  renderColumnGroups: function(config, queryResponse) {
    const fields = queryResponse.fields.dimension_like.concat(queryResponse.fields.measure_like);
    const groups = config.column_groups;

    let html = '<thead><tr>';

    if (config.show_row_numbers) {
      html += '<th rowspan="2" class="row-number-cell">#</th>';
    }

    const groupedFields = new Set();
    groups.forEach(group => {
      html += `<th colspan="${group.fields.length}" class="column-group-header" style="background: ${config.group_header_bg_color};">${this.escapeHtml(group.name)}</th>`;
      group.fields.forEach(f => groupedFields.add(f));
    });

    // Ungrouped fields
    fields.forEach(field => {
      if (!groupedFields.has(field.name)) {
        html += '<th rowspan="2"></th>';
      }
    });

    html += '</tr></thead>';
    return html;
  },

  renderHeaders: function(config, queryResponse) {
    const fields = queryResponse.fields.dimension_like.concat(queryResponse.fields.measure_like);
    const styles = this.getHeaderStyles(config);

    let html = `<thead><tr style="${styles}">`;

    if (config.show_row_numbers) {
      html += `<th class="row-number-cell">#</th>`;
    }

    let leftOffset = 0;
    fields.forEach((field, idx) => {
      const isFrozen = idx < config.freeze_columns;
      const frozenClass = isFrozen ? 'frozen-column' : '';
      const sortIndicator = this.state.sortField === field.name ?
        (this.state.sortDirection === 'asc' ? '▲' : '▼') : '';

      // Get custom formatting if available
      const fieldFormat = config.fieldFormatting && config.fieldFormatting[field.name]
        ? config.fieldFormatting[field.name]
        : {};

      const displayLabel = fieldFormat.label || (field.label_short || field.label);
      const customWidth = fieldFormat.width || 150;
      const customAlign = fieldFormat.alignment || config.header_alignment || 'left';

      if (fieldFormat.label) {
        console.log(`[TABLE] Using custom label for ${field.name}: "${displayLabel}"`);
      }

      html += `
        <th
          class="sortable ${frozenClass}"
          data-field="${field.name}"
          style="${isFrozen ? `left: ${leftOffset}px;` : ''} width: ${customWidth}px; text-align: ${customAlign};"
        >
          ${this.escapeHtml(displayLabel)}
          ${sortIndicator ? `<span class="sort-indicator">${sortIndicator}</span>` : ''}
          ${config.enable_column_filters ? `
            <input
              type="text"
              class="column-filter"
              data-field="${field.name}"
              placeholder="Filter... (Enter)"
              value="${this.escapeHtml(this.state.columnFilters[field.name] || '')}"
            />
          ` : ''}
        </th>
      `;

      if (isFrozen) {
        leftOffset += customWidth;
      }
    });

    html += '</tr></thead>';
    return html;
  },

  renderBody: function(pageData, allFilteredData, config, queryResponse) {
    const fields = queryResponse.fields.dimension_like.concat(queryResponse.fields.measure_like);

    // Get the index offset for the current page
    const pageOffset = (this.state.currentPage - 1) * config.page_size;

    let html = '<tbody>';

    pageData.forEach((row, pageRowIdx) => {
      const actualRowIdx = pageOffset + pageRowIdx; // Actual index in allFilteredData
      const hierarchyLevel = row._hierarchy_level || 0;

      // Check row conditional formatting but don't apply inline styles
      const hasRowConditional = config.enable_row_conditional &&
        config.row_condition_field &&
        this.evaluateCondition(
          row[config.row_condition_field],
          config.row_condition_operator,
          config.row_condition_value
        );

      html += `<tr
        data-row="${pageRowIdx}"
        data-hierarchy-level="${hierarchyLevel}"
        ${hasRowConditional ? `data-row-conditional="true"` : ''}
      >`;

      if (config.show_row_numbers) {
        const globalRowNum = actualRowIdx + 1;
        html += `<td class="row-number-cell">${globalRowNum}</td>`;
      }

      let leftOffset = 0;
      fields.forEach((field, colIdx) => {
        const cellValue = row[field.name];
        const isFrozen = colIdx < config.freeze_columns;
        const frozenClass = isFrozen ? 'frozen-column' : '';

        // Get custom formatting for this field
        const fieldFormat = config.fieldFormatting && config.fieldFormatting[field.name]
          ? config.fieldFormatting[field.name]
          : {};
        const customWidth = fieldFormat.width || 150;
        const customAlign = fieldFormat.alignment || 'auto';

        // Check column conditional formatting
        const hasColumnConditional = config.enable_column_conditional &&
          config.column_condition_field === field.name &&
          this.evaluateCondition(
            cellValue,
            config.column_condition_operator,
            config.column_condition_value
          );

        // Check if this is the hierarchy field
        const isHierarchyField = config.enable_hierarchy && field.name === config.hierarchy_field;

        html += `
          <td
            class="${frozenClass}"
            data-field="${field.name}"
            data-row="${pageRowIdx}"
            data-col="${colIdx}"
            ${hasColumnConditional ? `data-column-conditional="true"` : ''}
            style="${isFrozen ? `left: ${leftOffset}px;` : ''} width: ${customWidth}px; text-align: ${customAlign === 'auto' ? (field.is_numeric ? 'right' : 'left') : customAlign};"
          >
            ${isHierarchyField ?
              this.renderHierarchyCell(cellValue, field, config, row, hierarchyLevel) :
              this.renderCellContent(cellValue, field, config, row, actualRowIdx, allFilteredData)}
          </td>
        `;

        if (isFrozen) {
          leftOffset += customWidth;
        }
      });

      html += '</tr>';
    });

    html += '</tbody>';
    return html;
  },

  renderHierarchyCell: function(cellValue, field, config, row, level) {
    const indent = level * config.hierarchy_indent;
    const hasChildren = row._has_children || false;
    const rowId = row._hierarchy_id || '';
    const isExpanded = this.state.expandedRows.has(rowId);

    let content = '';
    if (config.show_hierarchy_icons && hasChildren) {
      const icon = isExpanded ? '▼' : '▶';
      content = `
        <div class="hierarchy-cell" style="padding-left: ${indent}px;">
          <span class="hierarchy-toggle" data-row-id="${this.escapeHtml(rowId)}">${icon}</span>
          <span class="hierarchy-content">${this.renderCellContent(cellValue, field, config, row, undefined, undefined)}</span>
        </div>
      `;
    } else {
      content = `
        <div class="hierarchy-cell" style="padding-left: ${indent + (config.show_hierarchy_icons ? 22 : 0)}px;">
          <span class="hierarchy-content">${this.renderCellContent(cellValue, field, config, row, undefined, undefined)}</span>
        </div>
      `;
    }

    return content;
  },

  renderCellContent: function(cellValue, field, config, row, rowIdx, data) {
    // Extract actual value and drill links
    let value = cellValue;
    let rendered = cellValue;
    let drillLinks = [];

    if (cellValue && typeof cellValue === 'object') {
      value = cellValue.value !== undefined ? cellValue.value : cellValue;
      rendered = cellValue.rendered || cellValue.value || cellValue;
      drillLinks = cellValue.links || [];
    }

    // PRIORITY 1: Check for comparison first (generates its own HTML with value)
    let isComparisonField = config.enable_comparison && config.comparison_primary_field === field.name;
    let comparisonHtml = null;

    if (isComparisonField) {
      comparisonHtml = this.renderComparison(row, config, drillLinks, rowIdx, data);
      console.log('[TABLE] Rendering comparison for', field.name, '- HTML length:', comparisonHtml ? comparisonHtml.length : 0);
    }

    // PRIORITY 2: Check for cell bars (can wrap comparison or regular value)
    let isCellBarField = false;
    let cellBarSet = null;
    for (let i = 0; i < config.cellBarSets.length; i++) {
      if (config.cellBarSets[i].fields.includes(field.name)) {
        isCellBarField = true;
        cellBarSet = config.cellBarSets[i];
        console.log('[TABLE] Field', field.name, 'has cell bar from set', i + 1);
        break;
      }
    }

    if (isCellBarField) {
      // If it's also a comparison field, use the comparison HTML as the "rendered" value
      const displayValue = isComparisonField ? comparisonHtml : rendered;
      console.log('[TABLE] Rendering cell bar for', field.name, 'with comparison:', isComparisonField);
      // Don't apply filter highlighting to cell bars - it breaks the HTML
      return this.renderCellBar(value, displayValue, config, drillLinks, cellBarSet, field.name);
    }

    // If comparison but no cell bar, return comparison
    if (isComparisonField) {
      console.log('[TABLE] Rendering comparison only for', field.name);
      // Don't apply filter highlighting to comparison HTML - it breaks the structure
      return comparisonHtml;
    }

    // Check for emojis
    if (config.enable_emojis && config.emojis[value]) {
      rendered = `${config.emojis[value]} ${rendered}`;
    }

    // Wrap with drill links if available
    if (drillLinks && drillLinks.length > 0) {
      const drillId = `drill-${Math.random().toString(36).substr(2, 9)}`;
      rendered = `<span class="drill-link" data-drill-id="${drillId}">${rendered}</span>`;

      setTimeout(() => {
        const elem = document.querySelector(`[data-drill-id="${drillId}"]`);
        if (elem) {
          elem.addEventListener('click', (e) => {
            LookerCharts.Utils.openDrillMenu({ links: drillLinks, event: e });
          });
        }
      }, 0);
    }

    // Highlight filter matches - ONLY for plain text cells (not comparison/cell bars)
    if (this.state.tableFilter && config.enable_table_filter) {
      const regex = new RegExp(`(${this.escapeRegex(this.state.tableFilter)})`, 'gi');
      rendered = String(rendered).replace(regex, '<span class="highlight-match">$1</span>');
    }

    return rendered;
  },

  renderCellBar: function(value, rendered, config, drillLinks, barSet, fieldName) {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return rendered;

    // Find min/max values for THIS field across the dataset
    const allValues = this.state.data.map(row => {
      const cell = row[fieldName];
      const val = cell && cell.value !== undefined ? cell.value : cell;
      return parseFloat(val);
    }).filter(v => !isNaN(v));

    const maxValue = Math.max(...allValues);
    const minValue = Math.min(...allValues, 0);
    const range = maxValue - minValue;

    const widthPercent = range > 0 ? ((numValue - minValue) / range) * config.cell_bar_max_width : 0;

    const drillId = drillLinks && drillLinks.length > 0 ? `drill-${Math.random().toString(36).substr(2, 9)}` : null;

    // Create gradient or solid color
    let barColor;
    if (barSet.gradient) {
      barColor = `linear-gradient(90deg, ${barSet.color}, ${barSet.gradientEnd})`;
    } else {
      barColor = barSet.color;
    }

    // Use rendered value which could be comparison HTML
    const html = `
      <div class="cell-bar-container">
        <div class="cell-bar-background">
          <div class="cell-bar-fill" style="width: ${widthPercent}%; background: ${barColor};"></div>
        </div>
        ${config.cell_bar_show_value ?
          `<div class="cell-bar-value${drillId ? ' drill-link' : ''}" ${drillId ? `data-drill-id="${drillId}"` : ''}>${rendered}</div>` :
          ''}
      </div>
    `;

    if (drillId) {
      setTimeout(() => {
        const elem = document.querySelector(`[data-drill-id="${drillId}"]`);
        if (elem) {
          elem.addEventListener('click', (e) => {
            LookerCharts.Utils.openDrillMenu({ links: drillLinks, event: e });
          });
        }
      }, 0);
    }

    return html;
  },

  renderComparison: function(row, config, drillLinks, rowIdx, data) {
    const primaryCell = row[config.comparison_primary_field];

    if (!primaryCell) {
      return '';
    }

    const primaryValue = primaryCell.value !== undefined ? primaryCell.value : primaryCell;
    const primaryRendered = primaryCell.rendered || primaryValue;
    const primary = parseFloat(primaryValue);

    if (isNaN(primary)) {
      return String(primaryRendered);
    }

    let secondary, comparisonLabel;

    // METRIC VS METRIC MODE
    if (config.comparison_mode === 'metric') {
      const secondaryCell = row[config.comparison_secondary_field];

      if (!secondaryCell) {
        return String(primaryRendered);
      }

      const secondaryValue = secondaryCell.value !== undefined ? secondaryCell.value : secondaryCell;
      secondary = parseFloat(secondaryValue);
      comparisonLabel = config.comparison_label || 'vs Metric';
    }
    // PERIOD OVER PERIOD MODE
    else if (config.comparison_mode === 'period') {
      if (rowIdx === undefined || !data) {
        return String(primaryRendered);
      }

      // Handle negative offset (previous rows)
      const offset = config.comparison_period_offset;
      const compareRowIdx = rowIdx - offset;

      if (compareRowIdx < 0 || compareRowIdx >= data.length) {
        // Out of bounds
        return String(primaryRendered);
      }

      const compareRow = data[compareRowIdx];

      if (!compareRow) {
        return String(primaryRendered);
      }

      const compareCell = compareRow[config.comparison_primary_field];
      if (!compareCell) {
        return String(primaryRendered);
      }

      const compareValue = compareCell.value !== undefined ? compareCell.value : compareCell;
      secondary = parseFloat(compareValue);
      comparisonLabel = config.comparison_label || `vs ${offset > 0 ? '+' : ''}${offset}`;
    }

    if (isNaN(secondary) || secondary === 0) {
      return String(primaryRendered);
    }

    const diff = primary - secondary;
    const percentDiff = (diff / Math.abs(secondary)) * 100;
    const isPositive = diff >= 0;
    const color = isPositive ? config.positive_comparison_color : config.negative_comparison_color;
    const arrow = config.show_comparison_arrows ? (isPositive ? '↑' : '↓') : '';

    let comparisonText = '';
    if (config.comparison_type === 'percentage' || config.comparison_type === 'both') {
      comparisonText = `${diff > 0 ? '+' : ''}${percentDiff.toFixed(1)}%`;
    }
    if (config.comparison_type === 'absolute' || config.comparison_type === 'both') {
      if (comparisonText) comparisonText += ` (${diff > 0 ? '+' : ''}${diff.toFixed(0)})`;
      else comparisonText = `${diff > 0 ? '+' : ''}${diff.toFixed(0)}`;
    }

    const drillId = primaryCell.links && primaryCell.links.length > 0 ? `drill-${Math.random().toString(36).substr(2, 9)}` : null;
    const links = primaryCell.links || [];

    let html = `
      <div class="comparison-container">
        <span${drillId ? ` class="drill-link" data-drill-id="${drillId}"` : ''}>${primaryRendered}</span>
        <span class="comparison-value" style="color: ${color};" title="${comparisonLabel}">
          ${arrow} ${comparisonText}
        </span>
    `;

    if (config.comparison_type === 'bar' || config.comparison_type === 'both') {
      const barWidth = Math.min(Math.abs(percentDiff), 100);
      html += `
        <div style="width: 100%; max-width: 60px;">
          <div class="comparison-bar" style="width: ${barWidth}%; background-color: ${color};"></div>
        </div>
      `;
    }

    html += '</div>';

    if (drillId) {
      setTimeout(() => {
        const elem = document.querySelector(`[data-drill-id="${drillId}"]`);
        if (elem) {
          elem.addEventListener('click', (e) => {
            LookerCharts.Utils.openDrillMenu({ links: links, event: e });
          });
        }
      }, 0);
    }

    return html;
  },

  getTableStyles: function(config) {
    let styles = '';

    if (config.table_theme !== 'minimal' && config.show_borders) {
      styles += `border: ${config.border_width}px ${config.border_style} ${config.border_color};`;
    }

    return styles;
  },

  getHeaderStyles: function(config) {
    let styles = '';

    if (config.header_font_family !== 'default') {
      styles += `font-family: ${config.header_font_family};`;
    }
    styles += `font-size: ${config.header_font_size}px;`;
    styles += `font-weight: ${config.header_font_weight};`;
    styles += `color: ${config.header_text_color};`;
    styles += `background-color: ${config.header_bg_color};`;
    styles += `text-align: ${config.header_alignment};`;
    styles += `padding: ${config.row_spacing}px ${config.column_spacing}px;`;

    if (config.table_theme !== 'minimal' && config.show_borders) {
      styles += `border: ${config.border_width}px ${config.border_style} ${config.border_color};`;
    }

    return styles;
  },

  getCellStyles: function(config) {
    let styles = '';

    if (config.cell_font_family !== 'default') {
      styles += `font-family: ${config.cell_font_family};`;
    }
    styles += `font-size: ${config.cell_font_size}px;`;
    styles += `color: ${config.cell_text_color};`;
    styles += `background-color: ${config.cell_bg_color};`;
    styles += `height: ${config.row_height}px;`;
    styles += `padding: ${config.row_spacing}px ${config.column_spacing}px;`;

    if (config.wrap_text) {
      styles += 'white-space: normal; word-wrap: break-word;';
    } else {
      styles += 'white-space: nowrap; overflow: hidden; text-overflow: ellipsis;';
    }

    if (config.cell_alignment !== 'auto') {
      styles += `text-align: ${config.cell_alignment};`;
    }

    if (config.table_theme !== 'minimal' && config.show_gridlines && config.show_borders) {
      styles += `border: ${config.border_width}px ${config.border_style} ${config.border_color};`;
    }

    return styles;
  },

  getRowConditionalStyles: function(row, config, baseStyles) {
    if (!config.enable_row_conditional || !config.row_condition_field) {
      return baseStyles;
    }

    const cellValue = row[config.row_condition_field];
    const value = cellValue && cellValue.value !== undefined ? cellValue.value : cellValue;

    if (this.evaluateCondition(value, config.row_condition_operator, config.row_condition_value)) {
      return `${baseStyles}; background-color: ${config.row_condition_bg_color}; color: ${config.row_condition_text_color};`;
    }

    return baseStyles;
  },

  getColumnConditionalStyles: function(row, fieldName, config, baseStyles) {
    if (!config.enable_column_conditional || !config.column_condition_field ||
        config.column_condition_field !== fieldName) {
      return baseStyles;
    }

    const cellValue = row[fieldName];
    const value = cellValue && cellValue.value !== undefined ? cellValue.value : cellValue;

    if (this.evaluateCondition(value, config.column_condition_operator, config.column_condition_value)) {
      return `${baseStyles}; background-color: ${config.column_condition_bg_color}; color: ${config.column_condition_text_color};`;
    }

    return baseStyles;
  },

  evaluateCondition: function(value, operator, compareValue) {
    const numValue = parseFloat(value);
    const numCompare = parseFloat(compareValue);

    if (!isNaN(numValue) && !isNaN(numCompare)) {
      switch (operator) {
        case '>': return numValue > numCompare;
        case '<': return numValue < numCompare;
        case '>=': return numValue >= numCompare;
        case '<=': return numValue <= numCompare;
        case '==': return numValue === numCompare;
        case '!=': return numValue !== numCompare;
      }
    }

    const strValue = String(value).toLowerCase();
    const strCompare = String(compareValue).toLowerCase();

    switch (operator) {
      case '==': return strValue === strCompare;
      case '!=': return strValue !== strCompare;
      case 'contains': return strValue.includes(strCompare);
      default: return false;
    }
  },

  attachEventListeners: function(config) {
    const self = this;

    // Pagination buttons
    this.container.querySelectorAll('.pagination-button').forEach(btn => {
      btn.addEventListener('click', function() {
        const action = this.dataset.action;
        const totalPages = Math.ceil(self.state.data.length / config.page_size);

        switch (action) {
          case 'first': self.state.currentPage = 1; break;
          case 'prev': self.state.currentPage = Math.max(1, self.state.currentPage - 1); break;
          case 'next': self.state.currentPage = Math.min(totalPages, self.state.currentPage + 1); break;
          case 'last': self.state.currentPage = totalPages; break;
        }

        console.log('[TABLE] Pagination clicked, re-rendering...');
        // Direct call to updateAsync
        self.updateAsync(self.state.data, self.container.parentElement, self.config, self.queryResponse, {}, () => {});
      });
    });

    // Table filter with Enter key
    const tableFilterInput = this.container.querySelector('#table-filter-input');

    const applyTableFilter = function() {
      console.log('[TABLE] Applying table filter:', tableFilterInput.value);
      self.state.tableFilter = tableFilterInput.value;
      self.state.currentPage = 1;
      console.log('[TABLE] Table filter state updated, calling updateAsync directly...');
      // Direct call to updateAsync
      self.updateAsync(self.state.data, self.container.parentElement, self.config, self.queryResponse, {}, () => {
        console.log('[TABLE] Filter update complete');
      });
    };

    if (tableFilterInput) {
      console.log('[TABLE] Table filter input found, attaching Enter key listener');
      tableFilterInput.addEventListener('keypress', function(e) {
        console.log('[TABLE] Key pressed in table filter:', e.key);
        if (e.key === 'Enter') {
          e.preventDefault();
          console.log('[TABLE] Enter pressed, applying filter...');
          applyTableFilter();
        }
      });
    } else {
      console.warn('[TABLE] Table filter input NOT found');
    }

    // Column filters with Enter key
    this.container.querySelectorAll('.column-filter').forEach(input => {
      const field = input.dataset.field;
      console.log('[TABLE] Attaching column filter listener for:', field);

      const applyColumnFilter = function() {
        console.log('[TABLE] Applying column filter for', field, ':', input.value);
        self.state.columnFilters[field] = input.value;
        self.state.currentPage = 1;
        console.log('[TABLE] Column filter applied for', field, ':', input.value);
        console.log('[TABLE] Current filter state:', self.state.columnFilters);
        // Direct call to updateAsync
        self.updateAsync(self.state.data, self.container.parentElement, self.config, self.queryResponse, {}, () => {
          console.log('[TABLE] Column filter update complete');
        });
      };

      // Enter key
      input.addEventListener('keypress', function(e) {
        console.log('[TABLE] Key pressed in column filter for', field, ':', e.key);
        if (e.key === 'Enter') {
          e.preventDefault();
          e.stopPropagation();
          console.log('[TABLE] Enter pressed in column filter, applying...');
          applyColumnFilter();
        }
      });

      // Stop propagation on click to prevent header sorting
      input.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    });

    // Sortable headers - use addEventListener instead of onclick
    this.container.querySelectorAll('th.sortable').forEach(th => {
      th.addEventListener('click', function(e) {
        // Don't sort if clicking on filter input
        if (e.target.classList.contains('column-filter')) {
          return;
        }

        const field = this.dataset.field;
        console.log('[TABLE] Sort clicked on field:', field);

        if (self.state.sortField === field) {
          self.state.sortDirection = self.state.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
          self.state.sortField = field;
          self.state.sortDirection = 'asc';
        }

        console.log('[TABLE] New sort state:', self.state.sortField, self.state.sortDirection);
        // Direct call to updateAsync
        self.updateAsync(self.state.data, self.container.parentElement, self.config, self.queryResponse, {}, () => {
          console.log('[TABLE] Sort update complete');
        });
      });
    });

    // Hover effects
    if (config.enable_hover) {
      this.container.querySelectorAll('tbody td').forEach(td => {
        td.addEventListener('mouseenter', function() {
          const row = this.dataset.row;
          const col = this.dataset.col;

          if (config.hover_highlight_type === 'row' || config.hover_highlight_type === 'cross') {
            self.container.querySelectorAll(`td[data-row="${row}"]`).forEach(cell => {
              cell.style.backgroundColor = config.hover_bg_color;
            });
          }

          if (config.hover_highlight_type === 'column' || config.hover_highlight_type === 'cross') {
            self.container.querySelectorAll(`td[data-col="${col}"]`).forEach(cell => {
              cell.style.backgroundColor = config.hover_bg_color;
            });
          }

          if (config.hover_highlight_type === 'cell') {
            this.style.backgroundColor = config.hover_bg_color;
          }
        });

        td.addEventListener('mouseleave', function() {
          self.container.querySelectorAll('tbody td').forEach(cell => {
            cell.style.backgroundColor = '';
          });
        });
      });
    }

    // Tooltips
    if (config.enable_tooltips) {
      this.container.querySelectorAll('tbody td').forEach(td => {
        td.addEventListener('mouseenter', function(e) {
          const field = this.dataset.field;
          const fieldObj = self.queryResponse.fields.dimension_like.concat(self.queryResponse.fields.measure_like)
            .find(f => f.name === field);

          if (fieldObj && config.tooltip_show_label) {
            const rect = this.getBoundingClientRect();
            self.tooltip.querySelector('.tooltip-label').textContent = fieldObj.label_short || fieldObj.label;
            self.tooltip.querySelector('.tooltip-value').textContent = this.textContent.trim();
            self.tooltip.style.left = rect.left + 'px';
            self.tooltip.style.top = (rect.bottom + 5) + 'px';
            self.tooltip.classList.add('visible');
          }
        });

        td.addEventListener('mouseleave', function() {
          self.tooltip.classList.remove('visible');
        });
      });
    }

    // Hierarchy toggles
    this.container.querySelectorAll('.hierarchy-toggle').forEach(toggle => {
      toggle.addEventListener('click', function(e) {
        e.stopPropagation();
        const rowId = this.dataset.rowId;
        if (self.state.expandedRows.has(rowId)) {
          self.state.expandedRows.delete(rowId);
        } else {
          self.state.expandedRows.add(rowId);
        }
        console.log('[TABLE] Hierarchy toggle clicked, re-rendering...');
        // Direct call to updateAsync
        self.updateAsync(self.state.data, self.container.parentElement, self.config, self.queryResponse, {}, () => {
          console.log('[TABLE] Hierarchy update complete');
        });
      });
    });
  },

  escapeHtml: function(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  },

  escapeRegex: function(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  },

  trigger: function(event) {
    // Legacy function - no longer used
    // All interactions now call updateAsync directly
    console.log('[TABLE] Legacy trigger called (should not happen):', event);
  }
};

looker.plugins.visualizations.add(visObject);

/**
 * Advanced Table Visualization for Looker
 * Production-grade table with extensive customization capabilities
 * Version: 2.0.0
 */

const visObject = {
  id: "advanced_table_visual",
  label: "Advanced Table",
  options: {
    // ══════════════════════════════════════════════════════════════
    // TAB: PLOT
    // ══════════════════════════════════════════════════════════════

    plot_divider_theme: {
      type: "string",
      label: "─────────────────────────────── Theme ───────────────────────────────",
      display: "divider",
      section: "Plot",
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
        { "Striped": "striped" }
      ],
      default: "modern",
      section: "Plot",
      order: 1
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

    plot_divider_display: {
      type: "string",
      label: "─────────────────────────────── Display Options ───────────────────────────────",
      display: "divider",
      section: "Plot",
      order: 20
    },

    show_row_numbers: {
      type: "boolean",
      label: "Show Row Numbers",
      default: false,
      section: "Plot",
      order: 21
    },

    show_headers: {
      type: "boolean",
      label: "Show Headers",
      default: true,
      section: "Plot",
      order: 22
    },

    plot_divider_freezing: {
      type: "string",
      label: "─────────────────────────────── Freezing ───────────────────────────────",
      display: "divider",
      section: "Plot",
      order: 30
    },

    freeze_columns: {
      type: "number",
      label: "Freeze Left Columns",
      default: 0,
      display: "number",
      min: 0,
      max: 10,
      section: "Plot",
      order: 31
    },

    freeze_header_row: {
      type: "boolean",
      label: "Freeze Header Row",
      default: true,
      section: "Plot",
      order: 32
    },

    plot_divider_filtering: {
      type: "string",
      label: "─────────────────────────────── Filtering ───────────────────────────────",
      display: "divider",
      section: "Plot",
      order: 40
    },

    enable_table_filter: {
      type: "boolean",
      label: "Enable Table-wide Filter",
      default: false,
      section: "Plot",
      order: 41
    },

    enable_column_filters: {
      type: "boolean",
      label: "Enable Column Filters",
      default: false,
      section: "Plot",
      order: 42
    },

    filter_highlight_color: {
      type: "string",
      label: "Filter Highlight Color",
      display: "color",
      default: "#fef08a",
      section: "Plot",
      order: 43
    },

    // ══════════════════════════════════════════════════════════════
    // TAB: SERIES
    // ══════════════════════════════════════════════════════════════

    series_divider_grouping: {
      type: "string",
      label: "─────────────────────────────── Column Grouping ───────────────────────────────",
      display: "divider",
      section: "Series",
      order: 0
    },

    enable_column_groups: {
      type: "boolean",
      label: "Enable Column Grouping",
      default: false,
      section: "Series",
      order: 1
    },

    column_group_1_name: {
      type: "string",
      label: "Group 1 Name",
      default: "",
      section: "Series",
      order: 2
    },

    column_group_1_fields: {
      type: "string",
      label: "Group 1 Fields (comma-separated)",
      display: "text",
      default: "",
      placeholder: "field1,field2,field3",
      section: "Series",
      order: 3
    },

    column_group_2_name: {
      type: "string",
      label: "Group 2 Name",
      default: "",
      section: "Series",
      order: 4
    },

    column_group_2_fields: {
      type: "string",
      label: "Group 2 Fields (comma-separated)",
      display: "text",
      default: "",
      placeholder: "field1,field2,field3",
      section: "Series",
      order: 5
    },

    column_group_3_name: {
      type: "string",
      label: "Group 3 Name",
      default: "",
      section: "Series",
      order: 6
    },

    column_group_3_fields: {
      type: "string",
      label: "Group 3 Fields (comma-separated)",
      display: "text",
      default: "",
      placeholder: "field1,field2,field3",
      section: "Series",
      order: 7
    },

    group_header_bg_color: {
      type: "string",
      label: "Group Header Background Color",
      display: "color",
      default: "#e0e7ff",
      section: "Series",
      order: 8
    },

    series_divider_hierarchy: {
      type: "string",
      label: "─────────────────────────────── Hierarchical Data ───────────────────────────────",
      display: "divider",
      section: "Series",
      order: 10
    },

    enable_hierarchy: {
      type: "boolean",
      label: "Enable Hierarchical Display",
      default: false,
      section: "Series",
      order: 11
    },

    hierarchy_field: {
      type: "string",
      label: "Hierarchy Field",
      display: "text",
      default: "",
      placeholder: "dimension_name",
      section: "Series",
      order: 12
    },

    hierarchy_indent: {
      type: "number",
      label: "Hierarchy Indent (px)",
      default: 20,
      display: "number",
      min: 0,
      max: 100,
      section: "Series",
      order: 13
    },

    show_hierarchy_icons: {
      type: "boolean",
      label: "Show Hierarchy Expand/Collapse Icons",
      default: true,
      section: "Series",
      order: 14
    },

    detect_date_hierarchy: {
      type: "boolean",
      label: "Auto-detect Date Hierarchy",
      default: true,
      section: "Series",
      order: 15
    },

    series_divider_sparklines: {
      type: "string",
      label: "─────────────────────────────── Sparklines ───────────────────────────────",
      display: "divider",
      section: "Series",
      order: 20
    },

    enable_sparklines: {
      type: "boolean",
      label: "Enable Sparklines",
      default: false,
      section: "Series",
      order: 21
    },

    sparkline_field: {
      type: "string",
      label: "Sparkline Field",
      display: "text",
      default: "",
      placeholder: "measure_name",
      section: "Series",
      order: 22
    },

    sparkline_type: {
      type: "string",
      label: "Sparkline Type",
      display: "select",
      values: [
        { "Line": "line" },
        { "Bar": "bar" },
        { "Area": "area" }
      ],
      default: "line",
      section: "Series",
      order: 23
    },

    sparkline_color: {
      type: "string",
      label: "Sparkline Color",
      display: "color",
      default: "#3b82f6",
      section: "Series",
      order: 24
    },

    sparkline_height: {
      type: "number",
      label: "Sparkline Height (px)",
      default: 30,
      display: "number",
      min: 20,
      max: 100,
      section: "Series",
      order: 25
    },

    series_divider_comparison: {
      type: "string",
      label: "─────────────────────────────── Comparison ───────────────────────────────",
      display: "divider",
      section: "Series",
      order: 30
    },

    enable_comparison: {
      type: "boolean",
      label: "Enable Comparison Display",
      default: false,
      section: "Series",
      order: 31
    },

    comparison_primary_field: {
      type: "string",
      label: "Primary Measure",
      display: "text",
      default: "",
      placeholder: "measure_name",
      section: "Series",
      order: 32
    },

    comparison_secondary_field: {
      type: "string",
      label: "Secondary Measure (to compare against)",
      display: "text",
      default: "",
      placeholder: "measure_name",
      section: "Series",
      order: 33
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
      order: 34
    },

    show_comparison_arrows: {
      type: "boolean",
      label: "Show Comparison Arrows",
      default: true,
      section: "Series",
      order: 35
    },

    positive_comparison_color: {
      type: "string",
      label: "Positive Comparison Color",
      display: "color",
      default: "#10b981",
      section: "Series",
      order: 36
    },

    negative_comparison_color: {
      type: "string",
      label: "Negative Comparison Color",
      display: "color",
      default: "#ef4444",
      section: "Series",
      order: 37
    },

    series_divider_datachips: {
      type: "string",
      label: "─────────────────────────────── Data Chips ───────────────────────────────",
      display: "divider",
      section: "Series",
      order: 40
    },

    enable_datachips: {
      type: "boolean",
      label: "Enable Data Chips",
      default: false,
      section: "Series",
      order: 41
    },

    datachip_field: {
      type: "string",
      label: "Data Chip Field",
      display: "text",
      default: "",
      placeholder: "status",
      section: "Series",
      order: 42
    },

    datachip_config: {
      type: "string",
      label: "Data Chip Configuration (JSON)",
      display: "textarea",
      default: '{"Active": "#10b981", "Inactive": "#ef4444", "Pending": "#f59e0b"}',
      placeholder: '{"value": "color"}',
      section: "Series",
      order: 43
    },

    series_divider_emojis: {
      type: "string",
      label: "─────────────────────────────── Emojis ───────────────────────────────",
      display: "divider",
      section: "Series",
      order: 50
    },

    enable_emojis: {
      type: "boolean",
      label: "Enable Emoji Rendering",
      default: false,
      section: "Series",
      order: 51
    },

    emoji_mapping: {
      type: "string",
      label: "Emoji Mapping (JSON)",
      display: "textarea",
      default: '{"positive": "✅", "negative": "❌", "warning": "⚠️", "star": "⭐"}',
      placeholder: '{"keyword": "emoji"}',
      section: "Series",
      order: 52
    },

    // ══════════════════════════════════════════════════════════════
    // TAB: FORMATTING
    // ══════════════════════════════════════════════════════════════

    formatting_divider_headers: {
      type: "string",
      label: "─────────────────────────────── Headers ───────────────────────────────",
      display: "divider",
      section: "Formatting",
      order: 0
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
      order: 1
    },

    header_font_size: {
      type: "number",
      label: "Header Font Size (px)",
      default: 12,
      display: "number",
      min: 8,
      max: 32,
      section: "Formatting",
      order: 2
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
      order: 3
    },

    header_text_color: {
      type: "string",
      label: "Header Text Color",
      display: "color",
      default: "#1f2937",
      section: "Formatting",
      order: 4
    },

    header_bg_color: {
      type: "string",
      label: "Header Background Color",
      display: "color",
      default: "#f9fafb",
      section: "Formatting",
      order: 5
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
      order: 6
    },

    formatting_divider_cells: {
      type: "string",
      label: "─────────────────────────────── Cells ───────────────────────────────",
      display: "divider",
      section: "Formatting",
      order: 10
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
      order: 11
    },

    cell_font_size: {
      type: "number",
      label: "Cell Font Size (px)",
      default: 11,
      display: "number",
      min: 8,
      max: 32,
      section: "Formatting",
      order: 12
    },

    cell_text_color: {
      type: "string",
      label: "Cell Text Color",
      display: "color",
      default: "#374151",
      section: "Formatting",
      order: 13
    },

    cell_bg_color: {
      type: "string",
      label: "Cell Background Color",
      display: "color",
      default: "#ffffff",
      section: "Formatting",
      order: 14
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
      order: 15
    },

    wrap_text: {
      type: "boolean",
      label: "Wrap Text in Cells",
      default: false,
      section: "Formatting",
      order: 16
    },

    row_height: {
      type: "number",
      label: "Row Height (px)",
      default: 36,
      display: "number",
      min: 24,
      max: 200,
      section: "Formatting",
      order: 17
    },

    formatting_divider_borders: {
      type: "string",
      label: "─────────────────────────────── Borders & Spacing ───────────────────────────────",
      display: "divider",
      section: "Formatting",
      order: 20
    },

    show_borders: {
      type: "boolean",
      label: "Show Borders",
      default: true,
      section: "Formatting",
      order: 21
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
      order: 22
    },

    border_width: {
      type: "number",
      label: "Border Width (px)",
      default: 1,
      display: "number",
      min: 0,
      max: 5,
      section: "Formatting",
      order: 23
    },

    border_color: {
      type: "string",
      label: "Border Color",
      display: "color",
      default: "#e5e7eb",
      section: "Formatting",
      order: 24
    },

    show_gridlines: {
      type: "boolean",
      label: "Show Gridlines",
      default: true,
      section: "Formatting",
      order: 25
    },

    column_spacing: {
      type: "number",
      label: "Column Spacing (px)",
      default: 12,
      display: "number",
      min: 0,
      max: 50,
      section: "Formatting",
      order: 26
    },

    row_spacing: {
      type: "number",
      label: "Row Spacing (px)",
      default: 0,
      display: "number",
      min: 0,
      max: 20,
      section: "Formatting",
      order: 27
    },

    formatting_divider_hover: {
      type: "string",
      label: "─────────────────────────────── Hover & Interaction ───────────────────────────────",
      display: "divider",
      section: "Formatting",
      order: 30
    },

    enable_hover: {
      type: "boolean",
      label: "Enable Hover Effects",
      default: true,
      section: "Formatting",
      order: 31
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
      order: 32
    },

    hover_bg_color: {
      type: "string",
      label: "Hover Background Color",
      display: "color",
      default: "#f3f4f6",
      section: "Formatting",
      order: 33
    },

    enable_tooltips: {
      type: "boolean",
      label: "Enable Tooltips",
      default: true,
      section: "Formatting",
      order: 34
    },

    tooltip_show_label: {
      type: "boolean",
      label: "Show Field Label in Tooltip",
      default: true,
      section: "Formatting",
      order: 35
    },

    formatting_divider_conditional: {
      type: "string",
      label: "─────────────────────────────── Conditional Formatting ───────────────────────────────",
      display: "divider",
      section: "Formatting",
      order: 40
    },

    enable_row_conditional: {
      type: "boolean",
      label: "Enable Row Conditional Formatting",
      default: false,
      section: "Formatting",
      order: 41
    },

    row_condition_field: {
      type: "string",
      label: "Row Condition Field",
      display: "text",
      default: "",
      placeholder: "field_name",
      section: "Formatting",
      order: 42
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
      order: 43
    },

    row_condition_value: {
      type: "string",
      label: "Row Condition Value",
      display: "text",
      default: "",
      section: "Formatting",
      order: 44
    },

    row_condition_bg_color: {
      type: "string",
      label: "Row Condition Background Color",
      display: "color",
      default: "#fef3c7",
      section: "Formatting",
      order: 45
    },

    row_condition_text_color: {
      type: "string",
      label: "Row Condition Text Color",
      display: "color",
      default: "#92400e",
      section: "Formatting",
      order: 46
    },

    enable_column_conditional: {
      type: "boolean",
      label: "Enable Column Conditional Formatting",
      default: false,
      section: "Formatting",
      order: 47
    },

    column_condition_field: {
      type: "string",
      label: "Column Condition Field",
      display: "text",
      default: "",
      placeholder: "field_name",
      section: "Formatting",
      order: 48
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
      order: 49
    },

    column_condition_value: {
      type: "string",
      label: "Column Condition Value",
      display: "text",
      default: "",
      section: "Formatting",
      order: 50
    },

    column_condition_bg_color: {
      type: "string",
      label: "Column Condition Background Color",
      display: "color",
      default: "#dbeafe",
      section: "Formatting",
      order: 51
    },

    column_condition_text_color: {
      type: "string",
      label: "Column Condition Text Color",
      display: "color",
      default: "#1e40af",
      section: "Formatting",
      order: 52
    }
  },

  create: function(element, config) {
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
        }

        table.advanced-table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          background: #ffffff;
        }

        table.advanced-table.striped tbody tr:nth-child(even) {
          background: #f9fafb;
        }

        table.advanced-table.minimal {
          border: none;
        }

        table.advanced-table.minimal th,
        table.advanced-table.minimal td {
          border: none;
          border-bottom: 1px solid #f3f4f6;
        }

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

        .frozen-header {
          position: sticky;
          top: 0;
          z-index: 3;
          background: inherit;
        }

        .frozen-column.frozen-header {
          z-index: 4;
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

        .sparkline-container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
        }

        .sparkline-svg {
          width: 100%;
          height: 100%;
        }

        .data-chip {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 500;
          color: white;
          white-space: nowrap;
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
    this.clearErrors();

    // Validate data
    if (!queryResponse || !data || data.length === 0) {
      this.addError({ title: "No Data", message: "No data available to display" });
      done();
      return;
    }

    // Store data and config
    this.state.data = data;
    this.config = config;
    this.queryResponse = queryResponse;

    // Parse configuration
    const parsedConfig = this.parseConfig(config);

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
    this.renderTable(pageData, filteredData.length, totalPages, parsedConfig, queryResponse);

    done();
  },

  parseConfig: function(config) {
    const parsed = { ...config };

    // Parse JSON configurations
    try {
      if (config.datachip_config) {
        parsed.datachips = JSON.parse(config.datachip_config);
      }
    } catch (e) {
      parsed.datachips = {};
    }

    try {
      if (config.emoji_mapping) {
        parsed.emojis = JSON.parse(config.emoji_mapping);
      }
    } catch (e) {
      parsed.emojis = {};
    }

    // Parse column groups
    parsed.column_groups = [];
    if (config.column_group_1_name && config.column_group_1_fields) {
      parsed.column_groups.push({
        name: config.column_group_1_name,
        fields: config.column_group_1_fields.split(',').map(f => f.trim()).filter(f => f)
      });
    }
    if (config.column_group_2_name && config.column_group_2_fields) {
      parsed.column_groups.push({
        name: config.column_group_2_name,
        fields: config.column_group_2_fields.split(',').map(f => f.trim()).filter(f => f)
      });
    }
    if (config.column_group_3_name && config.column_group_3_fields) {
      parsed.column_groups.push({
        name: config.column_group_3_name,
        fields: config.column_group_3_fields.split(',').map(f => f.trim()).filter(f => f)
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
    const hierarchyLevels = {};

    data.forEach((row, idx) => {
      const value = row[hierarchyField];
      const strValue = value && value.value !== undefined ? String(value.value) : String(value);

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
          } else if (month) {
            row._hierarchy_level = 1;
            row._hierarchy_parent = year;
          } else {
            row._hierarchy_level = 0;
            row._hierarchy_parent = null;
          }
        }
      }
    });

    return data;
  },

  renderTable: function(data, totalRows, totalPages, config, queryResponse) {
    let html = '';

    // Top pagination
    if (config.enable_pagination && (config.pagination_position === 'top' || config.pagination_position === 'both')) {
      html += this.renderPagination(totalRows, totalPages, config, 'top');
    }

    // Table-wide filter
    if (config.enable_table_filter) {
      html += `
        <div class="filter-container">
          <input
            type="text"
            class="filter-input"
            placeholder="Search across all columns..."
            value="${this.escapeHtml(this.state.tableFilter)}"
            id="table-filter-input"
          />
        </div>
      `;
    }

    // Table
    html += '<div class="table-wrapper">';
    html += `<table class="advanced-table ${config.table_theme}" style="${this.getTableStyles(config)}">`;

    // Column groups
    if (config.enable_column_groups && config.column_groups.length > 0) {
      html += this.renderColumnGroups(config, queryResponse);
    }

    // Headers
    if (config.show_headers) {
      html += this.renderHeaders(config, queryResponse);
    }

    // Body
    html += this.renderBody(data, config, queryResponse);

    html += '</table></div>';

    // Bottom pagination
    if (config.enable_pagination && (config.pagination_position === 'bottom' || config.pagination_position === 'both')) {
      html += this.renderPagination(totalRows, totalPages, config, 'bottom');
    }

    this.container.innerHTML = html;

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
    const frozenClass = config.freeze_header_row ? 'frozen-header' : '';

    let html = `<thead><tr class="${frozenClass}" style="${styles}">`;

    if (config.show_row_numbers) {
      html += `<th class="row-number-cell ${frozenClass}">#</th>`;
    }

    let leftOffset = 0;
    fields.forEach((field, idx) => {
      const isFrozen = idx < config.freeze_columns;
      const frozenColClass = isFrozen ? 'frozen-column' : '';
      const combinedClass = `${frozenClass} ${frozenColClass}`.trim();
      const sortIndicator = this.state.sortField === field.name ?
        (this.state.sortDirection === 'asc' ? '▲' : '▼') : '';

      html += `
        <th
          class="sortable ${combinedClass}"
          data-field="${field.name}"
          style="${isFrozen ? `left: ${leftOffset}px;` : ''}"
        >
          ${this.escapeHtml(field.label_short || field.label)}
          ${sortIndicator ? `<span class="sort-indicator">${sortIndicator}</span>` : ''}
          ${config.enable_column_filters ? `
            <input
              type="text"
              class="column-filter"
              data-field="${field.name}"
              placeholder="Filter..."
              value="${this.escapeHtml(this.state.columnFilters[field.name] || '')}"
              onclick="event.stopPropagation();"
            />
          ` : ''}
        </th>
      `;

      if (isFrozen) {
        // Approximate column width for frozen positioning
        leftOffset += 150;
      }
    });

    html += '</tr></thead>';
    return html;
  },

  renderBody: function(data, config, queryResponse) {
    const fields = queryResponse.fields.dimension_like.concat(queryResponse.fields.measure_like);
    const styles = this.getCellStyles(config);

    let html = '<tbody>';

    data.forEach((row, rowIdx) => {
      const rowStyles = this.getRowConditionalStyles(row, config, styles);
      const hierarchyLevel = row._hierarchy_level || 0;

      html += `<tr
        style="${rowStyles}"
        data-row="${rowIdx}"
        data-hierarchy-level="${hierarchyLevel}"
      >`;

      if (config.show_row_numbers) {
        const globalRowNum = (this.state.currentPage - 1) * config.page_size + rowIdx + 1;
        html += `<td class="row-number-cell">${globalRowNum}</td>`;
      }

      let leftOffset = 0;
      fields.forEach((field, colIdx) => {
        const cellValue = row[field.name];
        const isFrozen = colIdx < config.freeze_columns;
        const frozenClass = isFrozen ? 'frozen-column' : '';

        const cellStyles = this.getColumnConditionalStyles(row, field.name, config, styles);

        // Check if this is the hierarchy field
        const isHierarchyField = config.enable_hierarchy && field.name === config.hierarchy_field;

        html += `
          <td
            class="${frozenClass}"
            data-field="${field.name}"
            data-row="${rowIdx}"
            data-col="${colIdx}"
            style="${cellStyles}; ${isFrozen ? `left: ${leftOffset}px;` : ''}"
          >
            ${isHierarchyField ?
              this.renderHierarchyCell(cellValue, field, config, row, hierarchyLevel) :
              this.renderCellContent(cellValue, field, config, row)}
          </td>
        `;

        if (isFrozen) {
          leftOffset += 150;
        }
      });

      html += '</tr>';
    });

    html += '</tbody>';
    return html;
  },

  renderHierarchyCell: function(cellValue, field, config, row, level) {
    const indent = level * config.hierarchy_indent;
    const hasChildren = row._has_children;
    const isExpanded = this.state.expandedRows.has(row);

    let content = '';
    if (config.show_hierarchy_icons && hasChildren) {
      const icon = isExpanded ? '▼' : '▶';
      content = `
        <div class="hierarchy-cell" style="padding-left: ${indent}px;">
          <span class="hierarchy-toggle" data-row-id="${row.id}">${icon}</span>
          <span class="hierarchy-content">${this.renderCellContent(cellValue, field, config, row)}</span>
        </div>
      `;
    } else {
      content = `
        <div class="hierarchy-cell" style="padding-left: ${indent + (config.show_hierarchy_icons ? 22 : 0)}px;">
          <span class="hierarchy-content">${this.renderCellContent(cellValue, field, config, row)}</span>
        </div>
      `;
    }

    return content;
  },

  renderCellContent: function(cellValue, field, config, row) {
    // Extract actual value
    let value = cellValue;
    let rendered = cellValue;
    let links = null;

    if (cellValue && cellValue.value !== undefined) {
      value = cellValue.value;
      rendered = cellValue.rendered || cellValue.value;
      links = cellValue.links;
    }

    // Check for sparklines
    if (config.enable_sparklines && config.sparkline_field === field.name) {
      return this.renderSparkline(row, config, field);
    }

    // Check for data chips
    if (config.enable_datachips && config.datachip_field === field.name) {
      return this.renderDataChip(value, config);
    }

    // Check for emojis
    if (config.enable_emojis && config.emojis[value]) {
      rendered = `${config.emojis[value]} ${rendered}`;
    }

    // Check for comparison
    if (config.enable_comparison && config.comparison_primary_field === field.name) {
      return this.renderComparison(row, config);
    }

    // Wrap with drill links if available
    if (links && links.length > 0) {
      const drillLink = links[0];
      rendered = `<a href="${drillLink.url}" target="_blank" style="color: inherit; text-decoration: underline;">${rendered}</a>`;
    }

    // Highlight filter matches
    if (this.state.tableFilter && config.enable_table_filter) {
      const regex = new RegExp(`(${this.escapeRegex(this.state.tableFilter)})`, 'gi');
      rendered = String(rendered).replace(regex, '<span class="highlight-match">$1</span>');
    }

    return rendered;
  },

  renderSparkline: function(row, config, field) {
    // Get all numeric fields for this row to create sparkline
    const numericFields = this.queryResponse.fields.measure_like;
    const values = numericFields.map(f => {
      const cell = row[f.name];
      const val = cell && cell.value !== undefined ? cell.value : cell;
      return parseFloat(val) || 0;
    }).filter(v => !isNaN(v));

    if (values.length === 0) return '';

    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min || 1;

    const points = values.map((v, i) => {
      const x = (i / Math.max(values.length - 1, 1)) * 100;
      const y = ((max - v) / range) * 100;
      return `${x},${y}`;
    }).join(' ');

    let svgContent = '';
    if (config.sparkline_type === 'line') {
      svgContent = `<polyline points="${points}" fill="none" stroke="${config.sparkline_color}" stroke-width="2" vector-effect="non-scaling-stroke"/>`;
    } else if (config.sparkline_type === 'area') {
      svgContent = `
        <polyline points="0,100 ${points} 100,100" fill="${config.sparkline_color}" opacity="0.3"/>
        <polyline points="${points}" fill="none" stroke="${config.sparkline_color}" stroke-width="2" vector-effect="non-scaling-stroke"/>
      `;
    } else if (config.sparkline_type === 'bar') {
      const barWidth = 100 / values.length * 0.8;
      svgContent = values.map((v, i) => {
        const x = (i / values.length) * 100;
        const height = ((v - min) / range) * 100;
        return `<rect x="${x}" y="${100 - height}" width="${barWidth}" height="${height}" fill="${config.sparkline_color}"/>`;
      }).join('');
    }

    return `
      <div class="sparkline-container" style="height: ${config.sparkline_height}px;">
        <svg class="sparkline-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          ${svgContent}
        </svg>
      </div>
    `;
  },

  renderDataChip: function(value, config) {
    const color = config.datachips[value] || '#6b7280';
    return `<span class="data-chip" style="background-color: ${color};">${this.escapeHtml(String(value))}</span>`;
  },

  renderComparison: function(row, config) {
    // Get primary and secondary values
    const primaryCell = row[config.comparison_primary_field];
    const secondaryCell = row[config.comparison_secondary_field];

    if (!primaryCell || !secondaryCell) {
      const primaryVal = primaryCell && primaryCell.value !== undefined ? primaryCell.value : primaryCell;
      return primaryVal !== undefined ? String(primaryVal) : '';
    }

    const primaryValue = primaryCell.value !== undefined ? primaryCell.value : primaryCell;
    const secondaryValue = secondaryCell.value !== undefined ? secondaryCell.value : secondaryCell;

    const primary = parseFloat(primaryValue);
    const secondary = parseFloat(secondaryValue);

    if (isNaN(primary) || isNaN(secondary) || secondary === 0) {
      return String(primaryValue);
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

    let html = `
      <div class="comparison-container">
        <span>${primaryValue}</span>
        <span class="comparison-value" style="color: ${color};">
          ${arrow} ${comparisonText}
        </span>
    `;

    if (config.comparison_type === 'bar' || config.comparison_type === 'both') {
      const maxVal = Math.max(Math.abs(primary), Math.abs(secondary));
      const barWidth = Math.abs(percentDiff);
      html += `
        <div style="width: 100%; max-width: 60px;">
          <div class="comparison-bar" style="width: ${Math.min(barWidth, 100)}%; background-color: ${color};"></div>
        </div>
      `;
    }

    html += '</div>';
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
    // Convert to numbers if possible
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

    // String comparison
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

        self.trigger('updateAsync');
      });
    });

    // Table filter
    const tableFilterInput = this.container.querySelector('#table-filter-input');
    if (tableFilterInput) {
      tableFilterInput.addEventListener('input', function() {
        self.state.tableFilter = this.value;
        self.state.currentPage = 1;
        self.trigger('updateAsync');
      });
    }

    // Column filters
    this.container.querySelectorAll('.column-filter').forEach(input => {
      input.addEventListener('input', function() {
        const field = this.dataset.field;
        self.state.columnFilters[field] = this.value;
        self.state.currentPage = 1;
        self.trigger('updateAsync');
      });
    });

    // Sortable headers
    this.container.querySelectorAll('th.sortable').forEach(th => {
      th.addEventListener('click', function(e) {
        // Don't sort if clicking on filter input
        if (e.target.classList.contains('column-filter')) return;

        const field = this.dataset.field;

        if (self.state.sortField === field) {
          self.state.sortDirection = self.state.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
          self.state.sortField = field;
          self.state.sortDirection = 'asc';
        }

        self.trigger('updateAsync');
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
          // Reset all cells to original background
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
        // Toggle expanded state and re-render
        if (self.state.expandedRows.has(rowId)) {
          self.state.expandedRows.delete(rowId);
        } else {
          self.state.expandedRows.add(rowId);
        }
        self.trigger('updateAsync');
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
    if (event === 'updateAsync') {
      this.updateAsync(this.state.data, this.container.parentElement, this.config, this.queryResponse, {}, () => {});
    }
  }
};

looker.plugins.visualizations.add(visObject);

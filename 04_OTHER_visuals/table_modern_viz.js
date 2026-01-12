/**
 * Advanced Table Visualization for Looker
 * Production-grade table with extensive customization capabilities
 * Version: 1.0.0
 */

const visObject = {
  id: "advanced_table_visual",
  label: "Advanced Table",
  options: {
    // ──────────────── PLOT ────────────────
    plot_section: {
      type: "string",
      label: "─────────────────────────────── PLOT ───────────────────────────────",
      display: "text",
      default: ""
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
      order: 1
    },

    show_row_numbers: {
      type: "boolean",
      label: "Show Row Numbers",
      default: false,
      order: 2
    },

    enable_pagination: {
      type: "boolean",
      label: "Enable Pagination",
      default: true,
      order: 3
    },

    page_size: {
      type: "number",
      label: "Page Size",
      default: 25,
      display: "number",
      min: 5,
      max: 1000,
      order: 4
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
      order: 5
    },

    show_page_info: {
      type: "boolean",
      label: "Show Page Info",
      default: true,
      order: 6
    },

    // ──────────────── HEADERS ────────────────
    headers_section: {
      type: "string",
      label: "─────────────────────────────── HEADERS ───────────────────────────────",
      display: "text",
      default: ""
    },

    show_headers: {
      type: "boolean",
      label: "Show Headers",
      default: true,
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
      order: 11
    },

    header_font_size: {
      type: "number",
      label: "Header Font Size (px)",
      default: 12,
      display: "number",
      min: 8,
      max: 32,
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
      order: 13
    },

    header_text_color: {
      type: "string",
      label: "Header Text Color",
      display: "color",
      default: "#1f2937",
      order: 14
    },

    header_bg_color: {
      type: "string",
      label: "Header Background Color",
      display: "color",
      default: "#f9fafb",
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
      order: 16
    },

    // ──────────────── CELLS ────────────────
    cells_section: {
      type: "string",
      label: "─────────────────────────────── CELLS ───────────────────────────────",
      display: "text",
      default: ""
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
      order: 20
    },

    cell_font_size: {
      type: "number",
      label: "Cell Font Size (px)",
      default: 11,
      display: "number",
      min: 8,
      max: 32,
      order: 21
    },

    cell_text_color: {
      type: "string",
      label: "Cell Text Color",
      display: "color",
      default: "#374151",
      order: 22
    },

    cell_bg_color: {
      type: "string",
      label: "Cell Background Color",
      display: "color",
      default: "#ffffff",
      order: 23
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
      order: 24
    },

    wrap_text: {
      type: "boolean",
      label: "Wrap Text in Cells",
      default: false,
      order: 25
    },

    row_height: {
      type: "number",
      label: "Row Height (px)",
      default: 36,
      display: "number",
      min: 24,
      max: 200,
      order: 26
    },

    // ──────────────── BORDERS & SPACING ────────────────
    borders_section: {
      type: "string",
      label: "─────────────────────────────── BORDERS & SPACING ───────────────────────────────",
      display: "text",
      default: ""
    },

    show_borders: {
      type: "boolean",
      label: "Show Borders",
      default: true,
      order: 30
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
      order: 31
    },

    border_width: {
      type: "number",
      label: "Border Width (px)",
      default: 1,
      display: "number",
      min: 0,
      max: 5,
      order: 32
    },

    border_color: {
      type: "string",
      label: "Border Color",
      display: "color",
      default: "#e5e7eb",
      order: 33
    },

    show_gridlines: {
      type: "boolean",
      label: "Show Gridlines",
      default: true,
      order: 34
    },

    column_spacing: {
      type: "number",
      label: "Column Spacing (px)",
      default: 12,
      display: "number",
      min: 0,
      max: 50,
      order: 35
    },

    row_spacing: {
      type: "number",
      label: "Row Spacing (px)",
      default: 0,
      display: "number",
      min: 0,
      max: 20,
      order: 36
    },

    // ──────────────── FREEZING ────────────────
    freezing_section: {
      type: "string",
      label: "─────────────────────────────── FREEZING ───────────────────────────────",
      display: "text",
      default: ""
    },

    freeze_columns: {
      type: "number",
      label: "Freeze Left Columns",
      default: 0,
      display: "number",
      min: 0,
      max: 10,
      order: 40
    },

    freeze_rows: {
      type: "number",
      label: "Freeze Top Rows",
      default: 0,
      display: "number",
      min: 0,
      max: 10,
      order: 41
    },

    // ──────────────── HOVER & INTERACTION ────────────────
    hover_section: {
      type: "string",
      label: "─────────────────────────────── HOVER & INTERACTION ───────────────────────────────",
      display: "text",
      default: ""
    },

    enable_hover: {
      type: "boolean",
      label: "Enable Hover Effects",
      default: true,
      order: 50
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
      order: 51
    },

    hover_bg_color: {
      type: "string",
      label: "Hover Background Color",
      display: "color",
      default: "#f3f4f6",
      order: 52
    },

    enable_tooltips: {
      type: "boolean",
      label: "Enable Tooltips",
      default: true,
      order: 53
    },

    tooltip_show_label: {
      type: "boolean",
      label: "Show Field Label in Tooltip",
      default: true,
      order: 54
    },

    // ──────────────── CONDITIONAL FORMATTING ────────────────
    conditional_section: {
      type: "string",
      label: "─────────────────────────────── CONDITIONAL FORMATTING ───────────────────────────────",
      display: "text",
      default: ""
    },

    enable_row_conditional: {
      type: "boolean",
      label: "Enable Row Conditional Formatting",
      default: false,
      order: 60
    },

    row_condition_field: {
      type: "string",
      label: "Row Condition Field",
      display: "text",
      default: "",
      placeholder: "field_name",
      order: 61
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
      order: 62
    },

    row_condition_value: {
      type: "string",
      label: "Row Condition Value",
      display: "text",
      default: "",
      order: 63
    },

    row_condition_bg_color: {
      type: "string",
      label: "Row Condition Background Color",
      display: "color",
      default: "#fef3c7",
      order: 64
    },

    row_condition_text_color: {
      type: "string",
      label: "Row Condition Text Color",
      display: "color",
      default: "#92400e",
      order: 65
    },

    enable_column_conditional: {
      type: "boolean",
      label: "Enable Column Conditional Formatting",
      default: false,
      order: 66
    },

    column_condition_field: {
      type: "string",
      label: "Column Condition Field",
      display: "text",
      default: "",
      placeholder: "field_name",
      order: 67
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
      order: 68
    },

    column_condition_value: {
      type: "string",
      label: "Column Condition Value",
      display: "text",
      default: "",
      order: 69
    },

    column_condition_bg_color: {
      type: "string",
      label: "Column Condition Background Color",
      display: "color",
      default: "#dbeafe",
      order: 70
    },

    column_condition_text_color: {
      type: "string",
      label: "Column Condition Text Color",
      display: "color",
      default: "#1e40af",
      order: 71
    },

    // ──────────────── FILTERING ────────────────
    filtering_section: {
      type: "string",
      label: "─────────────────────────────── FILTERING ───────────────────────────────",
      display: "text",
      default: ""
    },

    enable_table_filter: {
      type: "boolean",
      label: "Enable Table-wide Filter",
      default: false,
      order: 80
    },

    enable_column_filters: {
      type: "boolean",
      label: "Enable Column Filters",
      default: false,
      order: 81
    },

    filter_highlight_color: {
      type: "string",
      label: "Filter Highlight Color",
      display: "color",
      default: "#fef08a",
      order: 82
    },

    // ──────────────── HIERARCHICAL DATA ────────────────
    hierarchy_section: {
      type: "string",
      label: "─────────────────────────────── HIERARCHICAL DATA ───────────────────────────────",
      display: "text",
      default: ""
    },

    enable_hierarchy: {
      type: "boolean",
      label: "Enable Hierarchical Display",
      default: false,
      order: 90
    },

    hierarchy_field: {
      type: "string",
      label: "Hierarchy Field",
      display: "text",
      default: "",
      placeholder: "dimension_name",
      order: 91
    },

    hierarchy_indent: {
      type: "number",
      label: "Hierarchy Indent (px)",
      default: 20,
      display: "number",
      min: 0,
      max: 100,
      order: 92
    },

    show_hierarchy_icons: {
      type: "boolean",
      label: "Show Hierarchy Expand/Collapse Icons",
      default: true,
      order: 93
    },

    detect_date_hierarchy: {
      type: "boolean",
      label: "Auto-detect Date Hierarchy",
      default: true,
      order: 94
    },

    // ──────────────── COLUMN GROUPING ────────────────
    grouping_section: {
      type: "string",
      label: "─────────────────────────────── COLUMN GROUPING ───────────────────────────────",
      display: "text",
      default: ""
    },

    enable_column_groups: {
      type: "boolean",
      label: "Enable Column Grouping",
      default: false,
      order: 100
    },

    column_groups_config: {
      type: "string",
      label: "Column Groups Configuration (JSON)",
      display: "textarea",
      default: '{"Sales": ["orders.count", "orders.total"], "Customer": ["users.count", "users.name"]}',
      placeholder: '{"Group1": ["field1", "field2"]}',
      order: 101
    },

    group_header_bg_color: {
      type: "string",
      label: "Group Header Background Color",
      display: "color",
      default: "#e0e7ff",
      order: 102
    },

    // ──────────────── ROW GROUPING ────────────────
    row_grouping_section: {
      type: "string",
      label: "─────────────────────────────── ROW GROUPING ───────────────────────────────",
      display: "text",
      default: ""
    },

    enable_row_groups: {
      type: "boolean",
      label: "Enable Row Grouping",
      default: false,
      order: 110
    },

    row_group_fields: {
      type: "string",
      label: "Row Group Fields (comma-separated)",
      display: "text",
      default: "",
      placeholder: "field1,field2",
      order: 111
    },

    show_group_totals: {
      type: "boolean",
      label: "Show Group Totals",
      default: false,
      order: 112
    },

    group_total_label: {
      type: "string",
      label: "Group Total Label",
      display: "text",
      default: "Total",
      order: 113
    },

    // ──────────────── SPARKLINES ────────────────
    sparklines_section: {
      type: "string",
      label: "─────────────────────────────── SPARKLINES ───────────────────────────────",
      display: "text",
      default: ""
    },

    enable_sparklines: {
      type: "boolean",
      label: "Enable Sparklines",
      default: false,
      order: 120
    },

    sparkline_fields: {
      type: "string",
      label: "Sparkline Fields (comma-separated)",
      display: "text",
      default: "",
      placeholder: "measure1,measure2",
      order: 121
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
      order: 122
    },

    sparkline_color: {
      type: "string",
      label: "Sparkline Color",
      display: "color",
      default: "#3b82f6",
      order: 123
    },

    sparkline_height: {
      type: "number",
      label: "Sparkline Height (px)",
      default: 30,
      display: "number",
      min: 20,
      max: 100,
      order: 124
    },

    // ──────────────── DATA CHIPS ────────────────
    datachips_section: {
      type: "string",
      label: "─────────────────────────────── DATA CHIPS ───────────────────────────────",
      display: "text",
      default: ""
    },

    enable_datachips: {
      type: "boolean",
      label: "Enable Data Chips",
      default: false,
      order: 130
    },

    datachip_fields: {
      type: "string",
      label: "Data Chip Fields (comma-separated)",
      display: "text",
      default: "",
      placeholder: "status,priority",
      order: 131
    },

    datachip_config: {
      type: "string",
      label: "Data Chip Configuration (JSON)",
      display: "textarea",
      default: '{"Active": "#10b981", "Inactive": "#ef4444", "Pending": "#f59e0b"}',
      placeholder: '{"value": "color"}',
      order: 132
    },

    // ──────────────── EMOJIS ────────────────
    emojis_section: {
      type: "string",
      label: "─────────────────────────────── EMOJIS ───────────────────────────────",
      display: "text",
      default: ""
    },

    enable_emojis: {
      type: "boolean",
      label: "Enable Emoji Rendering",
      default: false,
      order: 140
    },

    emoji_mapping: {
      type: "string",
      label: "Emoji Mapping (JSON)",
      display: "textarea",
      default: '{"positive": "✅", "negative": "❌", "warning": "⚠️", "star": "⭐"}',
      placeholder: '{"keyword": "emoji"}',
      order: 141
    },

    // ──────────────── COMPARISON ────────────────
    comparison_section: {
      type: "string",
      label: "─────────────────────────────── COMPARISON ───────────────────────────────",
      display: "text",
      default: ""
    },

    enable_comparison: {
      type: "boolean",
      label: "Enable Comparison Display",
      default: false,
      order: 150
    },

    comparison_field: {
      type: "string",
      label: "Comparison Field (secondary measure)",
      display: "text",
      default: "",
      placeholder: "measure_name",
      order: 151
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
      order: 152
    },

    show_comparison_arrows: {
      type: "boolean",
      label: "Show Comparison Arrows",
      default: true,
      order: 153
    },

    positive_comparison_color: {
      type: "string",
      label: "Positive Comparison Color",
      display: "color",
      default: "#10b981",
      order: 154
    },

    negative_comparison_color: {
      type: "string",
      label: "Negative Comparison Color",
      display: "color",
      default: "#ef4444",
      order: 155
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

        .column-group-header {
          text-align: center;
          font-weight: 600;
          padding: 8px;
        }

        .frozen-column {
          position: sticky;
          left: 0;
          z-index: 2;
          background: inherit;
        }

        .frozen-row {
          position: sticky;
          top: 0;
          z-index: 3;
          background: inherit;
        }

        .frozen-column.frozen-row {
          z-index: 4;
        }

        thead th {
          position: sticky;
          top: 0;
          z-index: 3;
          background: inherit;
        }

        .frozen-column thead th {
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
        }

        .hierarchy-toggle:hover {
          color: #374151;
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
          gap: 6px;
        }

        .comparison-value {
          font-size: 0.85em;
          font-weight: 500;
        }

        .comparison-arrow {
          font-size: 0.9em;
        }

        .comparison-bar {
          height: 6px;
          border-radius: 3px;
          margin-top: 4px;
          transition: width 0.3s ease;
        }

        .group-total-row {
          font-weight: 600;
          background: #f3f4f6 !important;
        }

        .highlight-match {
          background-color: #fef08a;
          font-weight: 500;
        }

        .tooltip {
          position: absolute;
          background: rgba(0, 0, 0, 0.9);
          color: white;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 12px;
          pointer-events: none;
          z-index: 1000;
          max-width: 300px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
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
    `;

    this.container = element.querySelector("#advanced-table-container");
    this.state = {
      currentPage: 1,
      sortField: null,
      sortDirection: 'asc',
      tableFilter: '',
      columnFilters: {},
      expandedGroups: new Set(),
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
    if (parsedConfig.enable_hierarchy) {
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
      if (config.column_groups_config) {
        parsed.column_groups = JSON.parse(config.column_groups_config);
      }
    } catch (e) {
      parsed.column_groups = {};
    }

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

    // Parse field lists
    parsed.sparkline_fields_list = config.sparkline_fields ?
      config.sparkline_fields.split(',').map(f => f.trim()) : [];

    parsed.datachip_fields_list = config.datachip_fields ?
      config.datachip_fields.split(',').map(f => f.trim()) : [];

    parsed.row_group_fields_list = config.row_group_fields ?
      config.row_group_fields.split(',').map(f => f.trim()) : [];

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
    // This is a simplified hierarchy implementation
    // In production, you'd want more sophisticated logic
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
            value="${this.state.tableFilter}"
            id="table-filter-input"
          />
        </div>
      `;
    }

    // Table
    html += '<div class="table-wrapper">';
    html += `<table class="advanced-table ${config.table_theme === 'striped' ? 'striped' : ''}" style="${this.getTableStyles(config)}">`;

    // Column groups
    if (config.enable_column_groups && config.column_groups) {
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
      html += '<th rowspan="2" class="row-number-cell"></th>';
    }

    const groupedFields = new Set();
    Object.keys(groups).forEach(groupName => {
      const groupFields = groups[groupName];
      html += `<th colspan="${groupFields.length}" class="column-group-header" style="background: ${config.group_header_bg_color};">${groupName}</th>`;
      groupFields.forEach(f => groupedFields.add(f));
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

    let html = '<thead><tr style="' + styles + '">';

    if (config.show_row_numbers) {
      html += '<th class="row-number-cell">#</th>';
    }

    fields.forEach((field, idx) => {
      const isFrozen = idx < config.freeze_columns;
      const frozenClass = isFrozen ? 'frozen-column' : '';
      const sortIndicator = this.state.sortField === field.name ?
        (this.state.sortDirection === 'asc' ? '▲' : '▼') : '';

      html += `
        <th
          class="sortable ${frozenClass}"
          data-field="${field.name}"
          style="left: ${isFrozen ? idx * 150 : 'auto'}px;"
        >
          ${field.label_short || field.label}
          ${sortIndicator ? `<span class="sort-indicator">${sortIndicator}</span>` : ''}
          ${config.enable_column_filters ? `
            <input
              type="text"
              class="column-filter"
              data-field="${field.name}"
              placeholder="Filter..."
              onclick="event.stopPropagation();"
            />
          ` : ''}
        </th>
      `;
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

      html += `<tr
        style="${rowStyles}"
        data-row="${rowIdx}"
        onmouseenter="this.dataset.hover='true'"
        onmouseleave="this.dataset.hover='false'"
      >`;

      if (config.show_row_numbers) {
        const globalRowNum = (this.state.currentPage - 1) * config.page_size + rowIdx + 1;
        html += `<td class="row-number-cell">${globalRowNum}</td>`;
      }

      fields.forEach((field, colIdx) => {
        const cellValue = row[field.name];
        const isFrozen = colIdx < config.freeze_columns;
        const frozenClass = isFrozen ? 'frozen-column' : '';

        const cellStyles = this.getColumnConditionalStyles(row, field.name, config, styles);

        html += `
          <td
            class="${frozenClass}"
            data-field="${field.name}"
            data-row="${rowIdx}"
            data-col="${colIdx}"
            style="${cellStyles}; left: ${isFrozen ? colIdx * 150 : 'auto'}px;"
          >
            ${this.renderCellContent(cellValue, field, config, row)}
          </td>
        `;
      });

      html += '</tr>';
    });

    html += '</tbody>';
    return html;
  },

  renderCellContent: function(cellValue, field, config, row) {
    // Extract actual value
    let value = cellValue;
    let rendered = cellValue;

    if (cellValue && cellValue.value !== undefined) {
      value = cellValue.value;
      rendered = cellValue.rendered || cellValue.value;
    }

    // Check for sparklines
    if (config.enable_sparklines && config.sparkline_fields_list.includes(field.name)) {
      return this.renderSparkline(value, config);
    }

    // Check for data chips
    if (config.enable_datachips && config.datachip_fields_list.includes(field.name)) {
      return this.renderDataChip(value, config);
    }

    // Check for emojis
    if (config.enable_emojis && config.emojis[value]) {
      return `${config.emojis[value]} ${rendered}`;
    }

    // Check for comparison
    if (config.enable_comparison && field.name === config.comparison_field) {
      return this.renderComparison(value, config);
    }

    // Highlight filter matches
    if (this.state.tableFilter && config.enable_table_filter) {
      const regex = new RegExp(`(${this.escapeRegex(this.state.tableFilter)})`, 'gi');
      rendered = String(rendered).replace(regex, '<span class="highlight-match">$1</span>');
    }

    return rendered;
  },

  renderSparkline: function(data, config) {
    // Simplified sparkline - in production use proper charting
    if (!Array.isArray(data)) {
      data = String(data).split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
    }

    if (data.length === 0) return '';

    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    const points = data.map((v, i) => {
      const x = (i / (data.length - 1)) * 100;
      const y = ((max - v) / range) * 100;
      return `${x},${y}`;
    }).join(' ');

    return `
      <div class="sparkline-container" style="height: ${config.sparkline_height}px;">
        <svg class="sparkline-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
          ${config.sparkline_type === 'line' ?
            `<polyline points="${points}" fill="none" stroke="${config.sparkline_color}" stroke-width="2"/>` :
            config.sparkline_type === 'area' ?
            `<polyline points="0,100 ${points} 100,100" fill="${config.sparkline_color}" opacity="0.3"/>
             <polyline points="${points}" fill="none" stroke="${config.sparkline_color}" stroke-width="2"/>` :
            data.map((v, i) => {
              const x = (i / data.length) * 100;
              const height = ((v - min) / range) * 100;
              const width = (100 / data.length) * 0.8;
              return `<rect x="${x}" y="${100 - height}" width="${width}" height="${height}" fill="${config.sparkline_color}"/>`;
            }).join('')
          }
        </svg>
      </div>
    `;
  },

  renderDataChip: function(value, config) {
    const color = config.datachips[value] || '#6b7280';
    return `<span class="data-chip" style="background-color: ${color};">${value}</span>`;
  },

  renderComparison: function(value, config) {
    // Simplified comparison - assumes percentage or absolute difference
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return value;

    const isPositive = numValue >= 0;
    const color = isPositive ? config.positive_comparison_color : config.negative_comparison_color;
    const arrow = config.show_comparison_arrows ? (isPositive ? '↑' : '↓') : '';

    let display = '';
    if (config.comparison_type === 'percentage' || config.comparison_type === 'both') {
      display = `${numValue > 0 ? '+' : ''}${numValue.toFixed(1)}%`;
    }

    return `
      <div class="comparison-container">
        <span class="comparison-arrow" style="color: ${color};">${arrow}</span>
        <span class="comparison-value" style="color: ${color};">${display}</span>
      </div>
    `;
  },

  getTableStyles: function(config) {
    let styles = '';

    if (config.show_borders) {
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

    if (config.show_borders) {
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

    if (config.show_gridlines && config.show_borders) {
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

        self.trigger('updateAsync', [self.state.data, self.container.parentElement, config, self.queryResponse, {}, () => {}]);
      });
    });

    // Table filter
    const tableFilterInput = this.container.querySelector('#table-filter-input');
    if (tableFilterInput) {
      tableFilterInput.addEventListener('input', function() {
        self.state.tableFilter = this.value;
        self.state.currentPage = 1;
        self.trigger('updateAsync', [self.state.data, self.container.parentElement, config, self.queryResponse, {}, () => {}]);
      });
    }

    // Column filters
    this.container.querySelectorAll('.column-filter').forEach(input => {
      input.addEventListener('input', function() {
        const field = this.dataset.field;
        self.state.columnFilters[field] = this.value;
        self.state.currentPage = 1;
        self.trigger('updateAsync', [self.state.data, self.container.parentElement, config, self.queryResponse, {}, () => {}]);
      });
    });

    // Sortable headers
    this.container.querySelectorAll('th.sortable').forEach(th => {
      th.addEventListener('click', function() {
        const field = this.dataset.field;

        if (self.state.sortField === field) {
          self.state.sortDirection = self.state.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
          self.state.sortField = field;
          self.state.sortDirection = 'asc';
        }

        self.trigger('updateAsync', [self.state.data, self.container.parentElement, config, self.queryResponse, {}, () => {}]);
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
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.innerHTML = `
              <div class="tooltip-label">${fieldObj.label_short || fieldObj.label}</div>
              <div>${this.textContent}</div>
            `;
            document.body.appendChild(tooltip);

            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + 'px';
            tooltip.style.top = (rect.bottom + 5) + 'px';

            this.tooltipElement = tooltip;
          }
        });

        td.addEventListener('mouseleave', function() {
          if (this.tooltipElement) {
            this.tooltipElement.remove();
            this.tooltipElement = null;
          }
        });
      });
    }
  },

  escapeRegex: function(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  },

  trigger: function(event, args) {
    if (event === 'updateAsync') {
      this.updateAsync.apply(this, args);
    }
  }
};

looker.plugins.visualizations.add(visObject);

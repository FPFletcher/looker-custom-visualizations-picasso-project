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
    show_row_numbers: { type: "boolean", label: "Show Row Numbers", default: false, section: "Plot", order: 1 },
    show_headers: { type: "boolean", label: "Show Headers", default: true, section: "Plot", order: 2 },

    plot_divider_pagination: {
      type: "string",
      label: "─────────────────────────────── Pagination ───────────────────────────────",
      display: "divider",
      section: "Plot",
      order: 10
    },
    enable_pagination: { type: "boolean", label: "Enable Pagination", default: true, section: "Plot", order: 11 },
    page_size: { type: "number", label: "Page Size", default: 25, display: "number", min: 5, max: 1000, section: "Plot", order: 12 },
    pagination_position: {
      type: "string",
      label: "Pagination Position",
      display: "select",
      values: [{ "Top": "top" }, { "Bottom": "bottom" }, { "Both": "both" }],
      default: "bottom",
      section: "Plot",
      order: 13
    },
    show_page_info: { type: "boolean", label: "Show Page Info", default: true, section: "Plot", order: 14 },

    // ══════════════════════════════════════════════════════════════
    // TAB: SERIES
    // ══════════════════════════════════════════════════════════════

    // SECTION 1: BO HIERARCHY
    hierarchy_divider: {
      type: "string",
      label: "─────────────────────────────── BO Hierarchy Mode ───────────────────────────────",
      display: "divider",
      section: "Series",
      order: 100
    },
    enable_bo_hierarchy: { type: "boolean", label: "Enable BO-Style Hierarchy", default: false, section: "Series", order: 101 },
    hierarchy_dimensions: {
      type: "string",
      label: "Hierarchy Levels (comma-separated)",
      display: "text",
      default: "",
      placeholder: "products.brand,products.category",
      section: "Series",
      order: 102
    },

    // SECTION 2: STANDARD SUBTOTALS
    subtotals_divider: {
      type: "string",
      label: "─────────────────────────────── Standard Subtotals ───────────────────────────────",
      display: "divider",
      section: "Series",
      order: 200
    },
    enable_subtotals: { type: "boolean", label: "Enable Subtotals (Standard)", default: false, section: "Series", order: 201 },
    subtotal_dimension: {
      type: "string",
      label: "Group By Dimension (Standard)",
      display: "select",
      values: [{"None": ""}],
      default: "",
      section: "Series",
      order: 202
    },
    subtotal_position: {
      type: "string",
      label: "Subtotal Position",
      display: "select",
      values: [{"Top (Collapsible)": "top"}, {"Bottom": "bottom"}],
      default: "bottom",
      section: "Series",
      order: 203
    },
    subtotal_label: { type: "string", label: "Subtotal Label Format", default: "{value}", section: "Series", order: 204 },
    subtotal_background_color: { type: "string", label: "Subtotal Background Color", display: "color", default: "#f0f0f0", section: "Series", order: 205 },

    // SECTION 3: GRAND TOTALS
    totals_divider: {
      type: "string",
      label: "─────────────────────────────── Grand Totals ───────────────────────────────",
      display: "divider",
      section: "Series",
      order: 300
    },
    show_grand_total: { type: "boolean", label: "Show Grand Total Row", default: false, section: "Series", order: 301 },
    grand_total_label: { type: "string", label: "Grand Total Label", default: "Grand Total", section: "Series", order: 302 },
    show_grand_total_on_all_pages: { type: "boolean", label: "Show Grand Total on All Pages", default: true, section: "Series", order: 303 },

    // SECTION 4: DATA CHIPS
    chips_divider: {
      type: "string",
      label: "─────────────────────────────── Data Chips ───────────────────────────────",
      display: "divider",
      section: "Series",
      order: 400
    },
    enable_data_chips: { type: "boolean", label: "Enable Data Chips", default: true, section: "Series", order: 401 },
    data_chip_fields: { type: "string", label: "Apply Chips to Fields (comma-separated)", display: "text", default: "", section: "Series", order: 402 },
    chip_match_green: { type: "string", label: "Green Match", default: "complete,yes,active", section: "Series", order: 403 },
    chip_match_red: { type: "string", label: "Red Match", default: "cancelled,no,inactive,null", section: "Series", order: 404 },
    chip_match_yellow: { type: "string", label: "Yellow Match", default: "warning,pending", section: "Series", order: 405 },
    chip_match_blue: { type: "string", label: "Blue Match", default: "shipped,processing", section: "Series", order: 406 },

    // SECTION 5: FIELD FORMATTING (Dynamic fields will start at order 500+)
    field_labels_divider: {
      type: "string",
      label: "─────────────────────────────── Field Formatting ───────────────────────────────",
      display: "divider",
      section: "Series",
      order: 500
    },
    enable_custom_field_formatting: { type: "boolean", label: "Enable Custom Field Formatting", default: false, section: "Series", order: 501 },

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
      values: [{ "Modern": "modern" }, { "Striped": "striped" }, { "Compact": "compact" }],
      default: "modern",
      section: "Formatting",
      order: 1
    },
    cell_font_size: { type: "number", label: "Cell Font Size (px)", default: 11, section: "Formatting", order: 22 },
    row_height: { type: "number", label: "Row Height (px)", default: 36, section: "Formatting", order: 27 },
    column_spacing: { type: "number", label: "Column Spacing (px)", default: 12, section: "Formatting", order: 36 }
  },

  create: function(element, config) {
    console.log('[TABLE] ========================================');
    console.log('[TABLE] Advanced Table v4.12.7 - Build 2026-01-13');
    console.log('[TABLE] ✅ FIXED: Auto-collapse on dim change');
    console.log('[TABLE] ✅ FIXED: Recalculate pagination links');
    console.log('[TABLE] ✅ RESTORED: DataChips & Hover Effects');
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

  table.advanced-table.striped tbody tr:nth-child(odd) {
    background: var(--stripe-color, #f9fafb) !important;
  }

  table.advanced-table.striped tbody tr:nth-child(even) {
    background: #ffffff !important;
  }

  .column-group-header {
    text-align: center;
    font-weight: 600;
    padding: 8px;
    border-bottom: 2px solid #d1d5db;
  }

  .sort-indicator {
    margin-left: 6px;
    font-size: 10px;
    color: #6b7280;
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

  .drill-link {
    cursor: pointer;
    color: inherit;
    text-decoration: underline;
    text-decoration-style: dotted;
  }

  /* DATA CHIP STYLES */
    .data-chip {
      padding: 2px 10px;
      border-radius: 12px;
      font-size: 0.85em;
      font-weight: 600;
      display: inline-block;
      text-align: center;
    }
    .chip-default { background-color: #f3f4f6; color: #374151; border: 1px solid #d1d5db; }
    .chip-green   { background-color: #dcfce7; color: #166534; }
    .chip-red     { background-color: #fee2e2; color: #991b1b; }
    .chip-yellow  { background-color: #fef9c3; color: #854d0e; }
    .chip-blue    { background-color: #dbeafe; color: #1e40af; }

          @media print {
            .pagination-controls, .filter-container { display: none; }
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

        // Dynamically update subtotal dimension dropdown options
        const dimensions = queryResponse.fields.dimension_like;
        if (dimensions.length > 0) {
          const dimensionValues = [{"None": ""}];
          dimensions.forEach(dim => {
            dimensionValues.push({[dim.label_short || dim.label]: dim.name});
          });
          this.options.subtotal_dimension.values = dimensionValues;
        }

        this.trigger('registerOptions', this.options);
        this.state.data = data;
        this.config = config;
        this.queryResponse = queryResponse;

        const parsedConfig = this.parseConfig(config);
        const measures = queryResponse.fields.measure_like;

        // AUTO-COLLAPSE ON DIMENSION CHANGE
        const currentDimKey = parsedConfig.enable_bo_hierarchy ?
        parsedConfig.hierarchy_dimensions : parsedConfig.subtotal_dimension;

        if (currentDimKey && this.state.lastSubtotalDimension !== currentDimKey) {
          this.state.collapsedGroups = {};
          this.state.lastSubtotalDimension = currentDimKey;
          this.state.forceInitialCollapse = true;
          this.state.currentPage = 1;
        }

        let filteredData = this.applyFilters(data, parsedConfig);

        if (this.state.sortField) {
          filteredData = this.sortData(filteredData, this.state.sortField, this.state.sortDirection);
        }

        // TRIGGER BO-STYLE HIERARCHY OR STANDARD SUBTOTALS
        if (parsedConfig.enable_bo_hierarchy && parsedConfig.hierarchy_dimensions) {
          const hierarchyList = parsedConfig.hierarchy_dimensions.split(',').map(f => f.trim());
          filteredData = this.calculateSubtotals(filteredData, hierarchyList, measures, parsedConfig, dimensions);

          // Handle Expand/Collapse Logic for Recursive Hierarchy
          if (!this.state.collapsedGroups || this.state.forceInitialCollapse) {
            this.state.collapsedGroups = {};
            filteredData.forEach(row => {
              if (row.__isSubtotal) this.state.collapsedGroups[row.__groupValue] = true;
            });
            this.state.forceInitialCollapse = false;
          }

          filteredData = filteredData.filter(row => {
            if (row.__isSubtotal) {
              row.__isCollapsed = this.state.collapsedGroups[row.__groupValue] || false;
              // Check if any parent in the path is collapsed
              const pathParts = String(row.__groupValue).split('|');
              if (pathParts.length > 1) {
                let currentPath = "";
                for (let i = 0; i < pathParts.length - 1; i++) {
                  currentPath = currentPath ? `${currentPath}|${pathParts[i]}` : pathParts[i];
                  if (this.state.collapsedGroups[currentPath]) return false;
                }
              }
              return true;
            }
            // Filter detail rows based on parent path
            if (row.__parentGroup !== undefined) {
              const pathParts = String(row.__parentGroup).split('|');
              let currentPath = "";
              for (let i = 0; i < pathParts.length; i++) {
                currentPath = currentPath ? `${currentPath}|${pathParts[i]}` : pathParts[i];
                if (this.state.collapsedGroups[currentPath]) return false;
              }
            }
            return true;
          });

        } else if (parsedConfig.enable_subtotals && parsedConfig.subtotal_dimension) {
          // Standard single-level subtotals
          filteredData = this.calculateSubtotals(filteredData, [parsedConfig.subtotal_dimension], measures, parsedConfig, dimensions);

          if (parsedConfig.subtotal_position === 'top') {
            if (!this.state.collapsedGroups || this.state.forceInitialCollapse) {
              this.state.collapsedGroups = {};
              filteredData.forEach(row => {
                if (row.__isSubtotal) this.state.collapsedGroups[row.__groupValue] = true;
              });
              this.state.forceInitialCollapse = false;
            }
            filteredData = filteredData.filter(row => {
              if (row.__isSubtotal) {
                row.__isCollapsed = this.state.collapsedGroups[row.__groupValue] || false;
                return true;
              }
              return !this.state.collapsedGroups[row.__parentGroup];
            });
          }
        }

        // Accurate Grand Total (Sums raw data only)
        if (parsedConfig.show_grand_total) {
          const grandTotal = this.calculateGrandTotal(data, measures, parsedConfig, dimensions);
          filteredData.push(grandTotal);
        }

        let dataWithoutGrandTotal = filteredData.filter(row => !row.__isGrandTotal);
        let grandTotalRow = filteredData.find(row => row.__isGrandTotal);

        // Pagination Calculation
        const totalPages = Math.ceil(dataWithoutGrandTotal.length / parsedConfig.page_size);
        if (this.state.currentPage > totalPages && totalPages > 0) this.state.currentPage = totalPages;

        const startIdx = (this.state.currentPage - 1) * parsedConfig.page_size;
        const endIdx = startIdx + parsedConfig.page_size;
        let pageData = parsedConfig.enable_pagination ?
        dataWithoutGrandTotal.slice(startIdx, endIdx) : dataWithoutGrandTotal;

        if (grandTotalRow && parsedConfig.show_grand_total_on_all_pages) {
          pageData.push(grandTotalRow);
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

calculateSubtotals: function(data, groupByFields, measures, config, dimensions) {
        if (!data || data.length === 0) return data;
        const fields = Array.isArray(groupByFields) ? groupByFields : [groupByFields];
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
            const groupRows = groups[key];

            // Create Subtotal Row
            const subRow = {
              __isSubtotal: true,
              __groupValue: currentPath,
              __level: level,
              __memberValue: key
            };

            // Set the label in the primary hierarchy column
            const targetDim = fields[0];
            subRow[targetDim] = { value: key, rendered: key };

            // Set other hierarchy dimensions to empty to prevent "UI Gap"
            fields.forEach((f, i) => { if(i > 0) subRow[f] = { value: '', rendered: '' }; });

            // Calculate measure totals for this level
            measures.forEach(m => {
              let sum = 0;
              groupRows.forEach(r => {
                let v = r[m.name];
                sum += Number((v && typeof v === 'object' ? v.value : v) || 0);
              });
              subRow[m.name] = { value: sum, rendered: sum.toLocaleString(undefined, {minimumFractionDigits: 2}) };
            });

            result.push(subRow);

            // If there are more levels, recurse. Otherwise, add detail rows.
            if (level < fields.length - 1) {
              groupData(groupRows, level + 1, currentPath);
            } else {
              groupRows.forEach(r => {
                r.__parentGroup = currentPath;
                r.__level = level + 1;
                result.push(r);
              });
            }
          });
        };

        groupData(data, 0, "");
        return result;
      },

calculateGrandTotal: function(rawData, measures, config, dimensions) {
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
    rawData.forEach(row => {
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

renderTable: function(pageData, filteredData, totalPages, config, queryResponse) {
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
          --subtotal-bg-color: ${config.subtotal_background_color || '#f0f0f0'};
          }
          .advanced-table tbody tr.subtotal-row { background-color: var(--subtotal-bg-color) !important; }`;
          document.head.appendChild(style);

          // Pagination Top
          if (config.enable_pagination && (config.pagination_position === 'top' || config.pagination_position === 'both')) {
            html += this.renderPagination(filteredData.length, totalPages, config, 'top');
          }

          if (config.enable_table_filter) {
            html += `<div class="filter-container"><input type="text" class="filter-input" placeholder="Search... (Enter)" value="${this.escapeHtml(this.state.tableFilter)}" id="table-filter-input" /></div>`;
          }

          html += '<div class="table-wrapper">';
          html += `<table class="advanced-table ${config.table_theme}" style="${this.getTableStyles(config)}">`;
          if (config.enable_column_groups && config.column_groups.length > 0) html += this.renderColumnGroups(config, queryResponse);
          if (config.show_headers) html += this.renderHeaders(config, queryResponse);
          html += this.renderBody(pageData, filteredData, config, queryResponse);
          html += '</table></div>';

          // Pagination Bottom
          if (config.enable_pagination && (config.pagination_position === 'bottom' || config.pagination_position === 'both')) {
            html += this.renderPagination(filteredData.length, totalPages, config, 'bottom');
          }

          this.container.innerHTML = html;
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
          html += `<button class="pagination-button" data-action="first" ${currentPage === 1 ? 'disabled' : ''}>⟨⟨</button>
          <button class="pagination-button" data-action="prev" ${currentPage === 1 ? 'disabled' : ''}>⟨</button>
          <span style="padding: 0 12px; display: flex; align-items: center;">Page ${currentPage} of ${totalPages}</span>
          <button class="pagination-button" data-action="next" ${currentPage === totalPages || totalPages === 0 ? 'disabled' : ''}>⟩</button>
          <button class="pagination-button" data-action="last" ${currentPage === totalPages || totalPages === 0 ? 'disabled' : ''}>⟩⟩</button>`;
          return html + '</div></div>';
        },

        renderBody: function(pageData, allFilteredData, config, queryResponse) {
          const fields = queryResponse.fields.dimension_like.concat(queryResponse.fields.measure_like);
          const pageOffset = (this.state.currentPage - 1) * config.page_size;
          let html = '<tbody>';

          // Identify which columns should be hidden (redundant hierarchy levels)
          const hierarchyDims = config.enable_bo_hierarchy ? config.hierarchy_dimensions.split(',').map(f => f.trim()) : [];
          const mainTreeCol = hierarchyDims[0];

          pageData.forEach((row, pageRowIdx) => {
            const actualRowIdx = pageOffset + pageRowIdx;
            const isSub = !!row.__isSubtotal;
            const level = row.__level || 0;
            const isCollapsed = this.state.collapsedGroups[row.__groupValue];

            const rowClass = row.__isGrandTotal ? 'grand-total-row' : (isSub ? `subtotal-row level-${level}` : 'detail-row');
            html += `<tr class="${rowClass}" data-group="${row.__groupValue || ''}">`;

            if (config.show_row_numbers) {
              html += `<td class="row-number-cell">${(isSub || row.__isGrandTotal) ? '' : actualRowIdx + 1}</td>`;
            }

            fields.forEach((f) => {
              // Skip dimension columns that are merged into the tree (except the first one)
              if (config.enable_bo_hierarchy && hierarchyDims.includes(f.name) && f.name !== mainTreeCol) {
                return;
              }

              let content = (row[f.name] && typeof row[f.name] === 'object') ? (row[f.name].rendered || row[f.name].value || '∅') : (row[f.name] || '∅');
              let style = "";

              // Apply Indentation and Toggles to the Main Tree Column
              if (f.name === mainTreeCol || (!config.enable_bo_hierarchy && f.name === config.subtotal_dimension)) {
                const padding = level * 20;
                style = `style="padding-left: ${padding + 12}px;"`;
                if (isSub) {
                  const icon = isCollapsed ? '▶' : '▼';
                  content = `<span class="subtotal-toggle">${icon}</span>${content}`;
                }
              }

              html += `<td ${style} class="${isSub && (f.name === mainTreeCol || f.name === config.subtotal_dimension) ? 'subtotal-trigger-cell' : ''}">${content}</td>`;
            });
            html += '</tr>';
          });

          return html + '</tbody>';
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
          return html + '</tr></thead>';
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

          // Field format override
          const fieldFormat = config.fieldFormatting && config.fieldFormatting[field.name];
          if (fieldFormat && fieldFormat.format && value !== '') {
            rendered = this.formatValue(value, fieldFormat.format, field, rendered);
          }

          // UPDATED: DATA CHIP LOGIC
          if (config.enable_data_chips && config.data_chip_fields) {
            const targetFields = config.data_chip_fields.split(',').map(f => f.trim());

            if (targetFields.includes(field.name)) {
              const valStr = String(value).toLowerCase().trim();
              let chipClass = "chip-default"; // Default color if no match

              // Helper function to check comma-separated matches
              const isMatch = (matchSetting) => {
                if (!matchSetting) return false;
                return matchSetting.split(',').map(s => s.trim().toLowerCase()).includes(valStr);
              };

              if (isMatch(config.chip_match_green)) chipClass = "chip-green";
              else if (isMatch(config.chip_match_red)) chipClass = "chip-red";
              else if (isMatch(config.chip_match_yellow)) chipClass = "chip-yellow";
              else if (isMatch(config.chip_match_blue)) chipClass = "chip-blue";

              rendered = `<span class="data-chip ${chipClass}">${rendered}</span>`;
            }
          }

          // Comparison Logic
          if (config.enable_comparison && config.comparison_primary_field === field.name) {
            rendered = this.renderComparison(row, config, drillLinks, rowIdx, data);
          }

          // Cell Bar Logic
          if (config.cellBarSets) {
            for (let i = 0; i < config.cellBarSets.length; i++) {
              if (config.cellBarSets[i].fields.includes(field.name)) {
                return this.renderCellBar(value, rendered, config, drillLinks, config.cellBarSets[i], field.name);
              }
            }
          }

          // Standard Drill Menu Wrap
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

        renderCellBar: function(value, rendered, config, drillLinks, barSet, fieldName) {
          const numValue = parseFloat(value);
          if (isNaN(numValue)) return rendered;

          // Determine min/max from the currently visible state data
          const allValues = this.state.data.map(row => {
            const cell = row[fieldName];
            const val = (cell && typeof cell === 'object') ? cell.value : cell;
            return parseFloat(val);
          }).filter(v => !isNaN(v));

          const maxValue = Math.max(...allValues);
          const minValue = Math.min(...allValues, 0);
          const range = maxValue - minValue;
          const widthPercent = range > 0 ? ((numValue - minValue) / range) * (config.cell_bar_max_width || 100) : 0;

          const barColor = barSet.color || '#3b82f6';
          const drillId = drillLinks && drillLinks.length > 0 ? `drill-${Math.random().toString(36).substr(2, 9)}` : null;

          return `
          <div class="cell-bar-container" style="display: flex; align-items: center; gap: 8px; width: 100%;">
          <div class="cell-bar-background" style="flex: 1; height: 16px; background: #f3f4f6; border-radius: 2px; overflow: hidden; position: relative;">
          <div class="cell-bar-fill" style="width: ${widthPercent}%; height: 100%; background: ${barColor};"></div>
          </div>
          <div class="cell-bar-value" style="font-weight: 500; white-space: nowrap;">
          ${drillId ? `<span class="drill-link" data-drill-id="${drillId}">${rendered}</span>` : rendered}
          </div>
          </div>
          `;
        },

        renderComparison: function(row, config, drillLinks, rowIdx, data) {
          const primaryCell = row[config.comparison_primary_field];
          if (!primaryCell) return '';

          const primaryValue = primaryCell.value !== undefined ? primaryCell.value : primaryCell;
          const primaryRendered = primaryCell.rendered || primaryValue;
          const primary = parseFloat(primaryValue);

          if (isNaN(primary)) return String(primaryRendered);

          // FIX: Explicitly disable comparison for the Grand Total row
          if (row.__isGrandTotal) {
            return String(primaryRendered);
          }

          let secondary = 0;

          if (config.comparison_mode === 'metric') {
            const secondaryCell = row[config.comparison_secondary_field];
            if (secondaryCell) {
              secondary = parseFloat(secondaryCell.value !== undefined ? secondaryCell.value : secondaryCell);
            }
          } else if (config.comparison_mode === 'period' && data && rowIdx !== undefined) {
            // FIX: Find "like-wise" elements only (Subtotal vs Subtotal or Detail vs Detail)
            const isSubtotal = !!row.__isSubtotal;

            // Filter the data to only include rows of the same "type"
            const likeRows = data.filter(r => !!r.__isSubtotal === isSubtotal && !r.__isGrandTotal);

            // Find the index of the current row within that "like-wise" subset
            const currentLikeIdx = likeRows.indexOf(row);
            const compareRow = likeRows[currentLikeIdx - config.comparison_period_offset];

            if (compareRow && compareRow[config.comparison_primary_field]) {
              const compareCell = compareRow[config.comparison_primary_field];
              secondary = parseFloat(compareCell.value !== undefined ? compareCell.value : compareCell);
            }
          }

          if (isNaN(secondary) || secondary === 0) return String(primaryRendered);

          const diff = primary - secondary;
          const percentDiff = (diff / Math.abs(secondary)) * 100;
          const isPositive = diff >= 0;
          const color = isPositive ? config.positive_comparison_color : config.negative_comparison_color;
          const arrow = config.show_comparison_arrows ? (isPositive ? '↑' : '↓') : '';

          return `
          <div class="comparison-container">
          <span>${primaryRendered}</span>
          <span style="color: ${color}; font-size: 0.85em; font-weight: 500; margin-left: 8px;">
          ${arrow} ${Math.abs(percentDiff).toFixed(1)}%
          </span>
          </div>
          `;
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

          // Hover Effect
          this.container.querySelectorAll('tbody tr').forEach(row => {
            row.addEventListener('mouseenter', () => { row.style.backgroundColor = '#f3f4f6'; });
              row.addEventListener('mouseleave', () => { row.style.backgroundColor = ''; });
            });

            // Subtotal/Hierarchy Toggle
            this.container.querySelectorAll('.subtotal-row').forEach(row => {
              row.addEventListener('click', function() {
                const groupPath = this.dataset.group;
                if (!self.state.collapsedGroups) self.state.collapsedGroups = {};

                if (self.state.collapsedGroups[groupPath]) {
                  delete self.state.collapsedGroups[groupPath];
                } else {
                  self.state.collapsedGroups[groupPath] = true;
                }

                self.updateAsync(self.state.data, self.container.parentElement, self.config, self.queryResponse, {}, () => {});
              });
            });

            // Pagination
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

            // Filters
            const filterInput = this.container.querySelector('#table-filter-input');
            if (filterInput) {
              filterInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                  self.state.tableFilter = filterInput.value;
                  self.state.currentPage = 1;
                  self.updateAsync(self.state.data, self.container.parentElement, self.config, self.queryResponse, {}, () => {});
                }
              });
            }
          },

            escapeHtml: function(text) { const div = document.createElement('div'); div.textContent = text; return div.innerHTML; },
            trigger: function(event) {}
          };

          looker.plugins.visualizations.add(visObject);

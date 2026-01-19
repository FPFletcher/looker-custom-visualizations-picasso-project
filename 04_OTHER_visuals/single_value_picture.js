/**
 * Water Picture Visualization for Looker - IMPROVED VERSION
 * Combined JavaScript file with embedded HTML and CSS
 * Displays two values in water Picture images with a percentage indicator
 *
 * IMPROVEMENTS:
 * 1. PDF Export Support - Primary picture displays correctly in PDF exports
 * 2. LookML Value Formatting - Respects value_format from LookML
 * 3. Dashboard Drill Support - Drill menus work from both Explore and Dashboard
 */

looker.plugins.visualizations.add({
  id: "single_value_picture_background",
  label: "Single Value (Picture)",
  options: {
    // ========== PLOT SECTION ==========
    background_color: {
      type: "string",
      label: "Background Color",
      default: "#5C6BC0",
      display: "color",
      section: "Plot",
      order: 1
    },
    background_image_url: {
      type: "string",
      label: "Background Image URL (optional)",
      placeholder: "https://example.com/background.jpg",
      section: "Plot",
      order: 2
    },
    background_image_opacity: {
      type: "number",
      label: "Background Image Opacity",
      default: 1.0,
      display: "range",
      min: 0,
      max: 1,
      step: 0.1,
      section: "Plot",
      order: 3
    },


    // Primary Image subsection (under Plot)

    primary_image_url_00_divider: {
      type: "string",
      label: "─────────────────────────────",
      display: "divider",
      section: "Plot",
      default: "",
      order: 11
    },

    primary_image_url: {
      type: "string",
      label: "Primary Picture Image URL",
      default: "https://static.vecteezy.com/system/resources/thumbnails/044/570/540/small_2x/single-water-Picture-on-transparent-background-free-png.png",
      section: "Plot",
      order: 12
    },

    primary_image_opacity: {
      type: "number",
      label: "Primary Picture Image Opacity",
      default: 1.0,
      display: "range",
      min: 0,
      max: 1,
      step: 0.1,
      section: "Plot",
      order: 13
    },

    primary_x_position: {
      type: "number",
      label: "Primary Picture X Position",
      default: 280,
      section: "Plot",
      order: 14
    },
    primary_y_position: {
      type: "number",
      label: "Primary Picture Y Position",
      default: 350,
      section: "Plot",
      order: 15
    },

    // Secondary Image subsection (under Plot)

    secondary_image_url_00_divider: {
      type: "string",
      label: "─────────────────────────────",
      display: "divider",
      section: "Plot",
      default: "",
      order:21
    },

    secondary_image_url: {
      type: "string",
      label: "Secondary Picture Image URL",
      default: "https://static.vecteezy.com/system/resources/thumbnails/044/570/540/small_2x/single-water-Picture-on-transparent-background-free-png.png",
      section: "Plot",
      order:22
    },
    secondary_image_opacity: {
      type: "number",
      label: "Secondary Picture Image Opacity",
      default: 0.9,
      display: "range",
      min: 0,
      max: 1,
      step: 0.1,
      section: "Plot",
      order:23
    },
    secondary_x_position: {
      type: "number",
      label: "Secondary Picture X Position",
      default: 520,
      section: "Plot",
      order:24
    },
    secondary_y_position: {
      type: "number",
      label: "Secondary Picture Y Position",
      default: 250,
      section: "Plot",
      order:25
    },

    // ========== FONT SECTION ==========
    font_size_primary_value: {
      type: "number",
      label: "Primary Value Font Size",
      default: 52,
      section: "Font",
      order: 1
    },
    font_size_primary_label: {
      type: "number",
      label: "Primary Label Font Size",
      default: 18,
      section: "Font",
      order: 2
    },
    font_size_secondary_value: {
      type: "number",
      label: "Secondary Value Font Size",
      default: 44,
      section: "Font",
      order: 3
    },
    font_size_secondary_label: {
      type: "number",
      label: "Secondary Label Font Size",
      default: 16,
      section: "Font",
      order: 4
    },
    font_size_percentage: {
      type: "number",
      label: "Percentage Font Size",
      default: 28,
      section: "Font",
      order: 5
    },

    // ========== PRIMARY SECTION ==========
    primary_label: {
      type: "string",
      label: "Primary Picture Label",
      default: "",
      section: "Primary"
    },
    primary_text_color: {
      type: "string",
      label: "Primary Text Color",
      default: "#FFFFFF",
      display: "color",
      section: "Primary"
    },
    primary_Picture_size: {
      type: "number",
      label: "Primary Picture Size",
      default: 240,
      section: "Primary"
    },

    // ========== SECONDARY SECTION ==========
    secondary_label: {
      type: "string",
      label: "Secondary Picture Label",
      default: "",
      section: "Secondary",
      order:1
    },
    secondary_Picture_size: {
      type: "number",
      label: "Secondary Picture Size",
      default: 190,
      section: "Secondary",
      order:2
    },
    secondary_text_color: {
      type: "string",
      label: "Secondary Text Color",
      default: "#E53935",
      display: "color",
      section: "Secondary",
      order:3
    },

    // Percentage settings (now under Secondary)
    show_percentage: {
      type: "boolean",
      label: "Show Percentage",
      default: true,
      section: "Secondary",
      order:11
    },
    percentage_calculation: {
      type: "string",
      label: "Percentage Calculation",
      display: "select",
      values: [
        {"Secondary / Primary": "secondary_over_primary"},
        {"Use 3rd Measure": "use_third_measure"}
      ],
      default: "secondary_over_primary",
      section: "Secondary",
      order:12
    },
    percentage_color: {
      type: "string",
      label: "Percentage Color",
      default: "#E53935",
      display: "color",
      section: "Secondary",
      order:13
    },
    percentage_decimals: {
      type: "number",
      label: "Percentage Decimals",
      default: 1,
      display: "number",
      section: "Secondary",
      order:14
    }
  },

  /**
   * Create the visualization container with embedded styles
   */
  create: function(element, config) {
    // Inject CSS styles
    const style = document.createElement('style');
    style.innerHTML = `
      .water-Picture-container {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Open Sans', 'Noto Sans JP', 'Noto Sans', 'Noto Sans CJK KR', Helvetica, Arial, sans-serif;
        position: relative;
        overflow: hidden;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      }

      .water-Picture-svg {
        width: 100%;
        height: 100%;
        max-width: 800px;
        max-height: 600px;
        position: relative;
        z-index: 1;
      }

      .background-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 0;
      }

      .Picture-value {
        font-weight: 700;
        text-anchor: middle;
        dominant-baseline: middle;
        user-select: none;
        text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
      }

      .Picture-label {
        font-weight: 400;
        text-anchor: middle;
        dominant-baseline: middle;
        user-select: none;
        text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
      }

      .percentage-indicator {
        font-weight: 700;
        text-anchor: middle;
        dominant-baseline: middle;
        user-select: none;
        text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
      }

      .water-Picture-image {
        filter: Picture-shadow(0px 4px 12px rgba(0, 0, 0, 0.25));
        transition: all 0.3s ease;
      }

      .water-Picture-image:hover {
        filter: Picture-shadow(0px 6px 16px rgba(0, 0, 0, 0.35));
      }

      .error-message {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        color: #666;
        font-size: 14px;
        font-family: 'Open Sans', Arial, sans-serif;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: scale(0.95);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      .water-Picture-image {
        animation: fadeIn 0.5s ease-out;
      }
    `;

    // Append style to document head
    if (!document.getElementById('water-Picture-viz-styles')) {
      style.id = 'water-Picture-viz-styles';
      document.head.appendChild(style);
    }

    // Create HTML structure
    element.innerHTML = `
      <div class="water-Picture-container" id="water-Picture-container-${Date.now()}">
        <svg class="water-Picture-svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid meet">
        </svg>
      </div>
    `;

    // Store references
    this._container = element.querySelector('.water-Picture-container');
    this._svg = element.querySelector('.water-Picture-svg');
  },

  /**
   * Update the visualization with new data
   */
  updateAsync: function(data, element, config, queryResponse, details, done) {
    // Clear any errors
    this.clearErrors();

    if (!this._svg || !this._container) {
      this.addError({title: "Initialization Error", message: "Visualization not properly initialized"});
      done();
      return;
    }

    // Clear previous content
    this._svg.innerHTML = '';

    // Set background color
    this._container.style.backgroundColor = config.background_color || '#5C6BC0';

    // Set background image if provided
    if (config.background_image_url && config.background_image_url.trim() !== '') {
      const bgOpacity = config.background_image_opacity !== undefined ? config.background_image_opacity : 1.0;
      this._container.style.backgroundImage = `linear-gradient(rgba(255, 255, 255, ${1 - bgOpacity}), rgba(255, 255, 255, ${1 - bgOpacity})), url('${config.background_image_url}')`;
    } else {
      this._container.style.backgroundImage = 'none';
    }

    // Validate data
    if (!queryResponse || !data || data.length === 0) {
      this.showError('No data available');
      done();
      return;
    }

    // Get measures from query
    const measures = queryResponse.fields.measure_like;
    if (measures.length < 2) {
      this.showError('At least 2 measures required (Primary Value, Secondary Value, Optional: Percentage)');
      done();
      return;
    }

    // Extract values
    const row = data[0];
    const primaryField = measures[0];
    const secondaryField = measures[1];
    const percentageField = measures.length > 2 ? measures[2] : null;

    let primaryValue = row[primaryField.name].value;
    let secondaryValue = row[secondaryField.name].value;
    let percentageValue;

    // Get percentage calculation method
    const percentageCalc = config.percentage_calculation || "secondary_over_primary";

    // Calculate or get percentage based on configuration
    if (percentageCalc === "use_third_measure" && percentageField) {
      // Use the third measure directly
      percentageValue = row[percentageField.name].value;
    } else {
      // Default: secondary / primary (will be multiplied by 100 in formatting)
      percentageValue = primaryValue !== 0 ? (secondaryValue / primaryValue) : 0;
    }

    // IMPROVEMENT 2: Format values using LookML value_format
    const primaryFormatted = this.formatValueWithLookML(primaryValue, primaryField, row[primaryField.name].rendered);
    const secondaryFormatted = this.formatValueWithLookML(secondaryValue, secondaryField, row[secondaryField.name].rendered);
    const percentageFormatted = this.formatPercentage(percentageValue, config.percentage_decimals || 1, percentageCalc);

    // Get labels
    const primaryLabel = config.primary_label || measures[0].label_short || measures[0].label || "Primary Value";
    const secondaryLabel = config.secondary_label || measures[1].label_short || measures[1].label || "Secondary Value";

    // Debug logging (will appear in browser console)
    console.log('Water Picture Debug Info:');
    console.log('Primary Value:', primaryValue, '→', primaryFormatted);
    console.log('Secondary Value:', secondaryValue, '→', secondaryFormatted);
    console.log('Percentage Value:', percentageValue, '→', percentageFormatted);
    console.log('Calculation Method:', percentageCalc);
    console.log('Primary Field:', primaryField);
    console.log('Secondary Field:', secondaryField);

    // Draw visualization
    this.drawWaterPictures(
      primaryFormatted,
      secondaryFormatted,
      percentageFormatted,
      primaryLabel,
      secondaryLabel,
      config,
      data,
      row,
      primaryField.name,
      secondaryField.name
    );

    done();
  },

  /**
   * Show error message in the visualization
   */
  showError: function(message) {
    this._svg.innerHTML = `
      <g>
        <text x="400" y="280" text-anchor="middle" fill="#666" font-size="16" font-family="Arial, sans-serif">
          ${message}
        </text>
        <text x="400" y="310" text-anchor="middle" fill="#999" font-size="12" font-family="Arial, sans-serif">
          Please check your query configuration
        </text>
      </g>
    `;
  },

  /**
   * IMPROVEMENT 2: Format numeric values using LookML value_format
   * This respects the value_format defined in LookML
   */
  formatValueWithLookML: function(value, field, renderedValue) {
    if (value === null || value === undefined) return '';

    // Priority 1: Use Looker's rendered value if available (most accurate)
    if (renderedValue !== null && renderedValue !== undefined && renderedValue !== '') {
      return renderedValue;
    }

    // Priority 2: Parse LookML value_format if available
    if (field && field.value_format) {
      const fmt = field.value_format;
      const num = Number(value);

      // Pattern: "$0.0,\" k\"" or similar -> thousands with k suffix
      if (fmt.includes('," k"') || fmt.includes(",'k'")) {
        const decimals = (fmt.match(/0\.([0#]+)/) || [])[1]?.length || 0;
        const sign = (num < 0) ? '-' : '';
        const baseVal = Math.abs(num) / 1000;
        const formattedNum = baseVal.toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
          useGrouping: true
        });
        return `${sign}$${formattedNum} k`;
      }

      // Pattern: "$0.0,\" M\"" or similar -> millions with M suffix
      if (fmt.includes('," M"') || fmt.includes(",'M'")) {
        const decimals = (fmt.match(/0\.([0#]+)/) || [])[1]?.length || 0;
        const sign = (num < 0) ? '-' : '';
        const baseVal = Math.abs(num) / 1000000;
        const formattedNum = baseVal.toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
          useGrouping: true
        });
        return `${sign}$${formattedNum} M`;
      }

      // Pattern: standard currency format (e.g. $#,##0.00)
      if (fmt.startsWith('$') || fmt.includes('$#')) {
        const decimals = (fmt.match(/0\.([0#]+)/) || [])[1]?.length || 0;
        const sign = (num < 0) ? '-' : '';
        return `${sign}$${Math.abs(num).toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals
        })}`;
      }

      // Pattern: Euro currency
      if (fmt.startsWith('€') || fmt.includes('€#')) {
        const decimals = (fmt.match(/0\.([0#]+)/) || [])[1]?.length || 0;
        return `€${num.toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals
        })}`;
      }

      // Pattern: standard number format (e.g. #,##0.0)
      if (fmt.includes('#,##0') || fmt.includes('#,###')) {
        const decimals = (fmt.match(/0\.([0#]+)/) || [])[1]?.length || 0;
        return num.toLocaleString('en-US', {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals
        });
      }

      // Pattern: percentage format
      if (fmt.includes('%')) {
        const decimals = (fmt.match(/0\.([0#]+)/) || [])[1]?.length || 1;
        return (num * 100).toFixed(decimals) + '%';
      }

      // Pattern: simple decimal format
      if (fmt.match(/^0\.([0#]+)$/)) {
        const decimals = (fmt.match(/0\.([0#]+)/) || [])[1]?.length || 0;
        return num.toFixed(decimals);
      }
    }

    // Priority 3: Fallback to smart formatting
    return this.formatValue(value);
  },

  /**
   * Format numeric values with M/K suffixes (fallback)
   */
  formatValue: function(value) {
    const absValue = Math.abs(value);
    const sign = value < 0 ? '-' : '';

    if (absValue >= 1000000) {
      return sign + (absValue / 1000000).toFixed(2) + 'M';
    } else if (absValue >= 1000) {
      return sign + (absValue / 1000).toFixed(2) + 'K';
    }
    return sign + absValue.toFixed(2);
  },

  /**
   * Format percentage values
   * Handles both decimal (0.4693) and percentage (46.93) formats
   */
  formatPercentage: function(value, decimals, calculationMethod) {
    let percentage;

    // Determine if value is already in percentage format or decimal format
    if (calculationMethod === "use_third_measure") {
      // Value is already a percentage number (e.g., 46.93 or -46.93)
      percentage = value;
    } else {
      // Value is a decimal (e.g., 0.4693 or -0.4693), convert to percentage
      percentage = value * 100;
    }

    // Format without sign prefix
    return percentage.toFixed(decimals) + '%';
  },

  /**
   * Draw the water Picture images and text
   * IMPROVEMENT 1 & 3: PDF support and Dashboard drill support
   */
  drawWaterPictures: function(primaryValue, secondaryValue, percentage, primaryLabel, secondaryLabel, config, data, row, primaryFieldName, secondaryFieldName) {
    const svg = this._svg;
    const svgNS = "http://www.w3.org/2000/svg";

    // Get configuration values
    const primaryX = config.primary_x_position || 280;
    const primaryY = config.primary_y_position || 350;
    const secondaryX = config.secondary_x_position || 520;
    const secondaryY = config.secondary_y_position || 250;

    const primarySize = config.primary_Picture_size || 240;
    const secondarySize = config.secondary_Picture_size || 190;

    const primaryImageUrl = config.primary_image_url || "https://static.vecteezy.com/system/resources/thumbnails/044/570/540/small_2x/single-water-Picture-on-transparent-background-free-png.png";
    const secondaryImageUrl = config.secondary_image_url || "https://static.vecteezy.com/system/resources/thumbnails/044/570/540/small_2x/single-water-Picture-on-transparent-background-free-png.png";

    const primaryOpacity = config.primary_image_opacity !== undefined ? config.primary_image_opacity : 1.0;
    const secondaryOpacity = config.secondary_image_opacity !== undefined ? config.secondary_image_opacity : 0.9;

    // Create defs for filters if needed
    const defs = document.createElementNS(svgNS, 'defs');
    svg.appendChild(defs);

    // IMPROVEMENT 1: PRIMARY Picture IMAGE - Enhanced for PDF export
    // Use a group to contain image and ensure proper rendering in PDF
    const primaryGroup = document.createElementNS(svgNS, 'g');
    primaryGroup.setAttribute('class', 'primary-picture-group');

    const primaryImage = document.createElementNS(svgNS, 'image');
    primaryImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', primaryImageUrl);
    primaryImage.setAttribute('x', primaryX - primarySize / 2);
    primaryImage.setAttribute('y', primaryY - primarySize / 2);
    primaryImage.setAttribute('width', primarySize);
    primaryImage.setAttribute('height', primarySize);
    primaryImage.setAttribute('class', 'water-Picture-image');
    primaryImage.setAttribute('opacity', primaryOpacity);
    primaryImage.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    // CRITICAL for PDF: Ensure image is not set to pointer-events: none on the element itself
    primaryImage.style.pointerEvents = 'all';
    // Add explicit crossOrigin attribute for better PDF rendering
    primaryImage.setAttribute('crossorigin', 'anonymous');

    primaryGroup.appendChild(primaryImage);
    svg.appendChild(primaryGroup);

    // IMPROVEMENT 3: Primary value text with ENHANCED drill functionality
    const primaryValueText = document.createElementNS(svgNS, 'text');
    primaryValueText.setAttribute('x', primaryX);
    primaryValueText.setAttribute('y', primaryY - 10);
    primaryValueText.setAttribute('class', 'Picture-value');
    primaryValueText.setAttribute('fill', config.primary_text_color || '#FFFFFF');
    primaryValueText.setAttribute('font-size', config.font_size_primary_value || '52');
    primaryValueText.setAttribute('cursor', 'pointer');
    primaryValueText.textContent = primaryValue;

    // Get drill links from the row data
    const primaryCell = row[primaryFieldName];
    const primaryMeasureLinks = primaryCell && primaryCell.links ? primaryCell.links : [];

    console.log('Primary field:', primaryFieldName);
    console.log('Primary cell data:', primaryCell);
    console.log('Primary measure links:', primaryMeasureLinks);

    // IMPROVEMENT 3: Enhanced drill menu that works in both Explore and Dashboard
    if (primaryMeasureLinks.length > 0) {
      primaryValueText.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();

        console.log('Primary value clicked - opening drill menu');
        console.log('Event details:', e);

        // Try multiple methods to ensure drill menu opens
        if (typeof LookerCharts !== 'undefined' && LookerCharts.Utils && LookerCharts.Utils.openDrillMenu) {
          try {
            // Method 1: Standard LookerCharts.Utils.openDrillMenu
            LookerCharts.Utils.openDrillMenu({
              links: primaryMeasureLinks,
              event: e
            });
            console.log('✓ Drill menu opened via LookerCharts.Utils.openDrillMenu');
          } catch (error) {
            console.error('✗ Error opening drill menu via LookerCharts.Utils:', error);

            // Method 2: Fallback - try direct openDrillMenu if available
            try {
              if (typeof openDrillMenu === 'function') {
                openDrillMenu({
                  links: primaryMeasureLinks,
                  event: e
                });
                console.log('✓ Drill menu opened via direct openDrillMenu function');
              }
            } catch (fallbackError) {
              console.error('✗ Fallback drill menu also failed:', fallbackError);
            }
          }
        } else {
          console.warn('⚠ LookerCharts.Utils.openDrillMenu not available');

          // Method 3: Try to trigger via element dispatch if LookerCharts not available
          try {
            const drillEvent = new CustomEvent('looker-drill-menu', {
              detail: { links: primaryMeasureLinks, event: e },
              bubbles: true,
              cancelable: true
            });
            primaryValueText.dispatchEvent(drillEvent);
            console.log('✓ Dispatched custom looker-drill-menu event');
          } catch (customEventError) {
            console.error('✗ Custom event dispatch failed:', customEventError);
          }
        }
      });

      // Add visual feedback for clickable element
      //primaryValueText.style.textDecoration = 'underline';
      //primaryValueText.style.textDecorationStyle = 'dotted';
    } else {
      console.log('✗ No drill links available for primary value');
    }

    svg.appendChild(primaryValueText);

    // Primary label text
    const primaryLabelText = document.createElementNS(svgNS, 'text');
    primaryLabelText.setAttribute('x', primaryX);
    primaryLabelText.setAttribute('y', primaryY + 50);
    primaryLabelText.setAttribute('class', 'Picture-label');
    primaryLabelText.setAttribute('fill', config.primary_text_color || '#FFFFFF');
    primaryLabelText.setAttribute('font-size', config.font_size_primary_label || '18');
    primaryLabelText.setAttribute('opacity', '0.95');
    primaryLabelText.textContent = primaryLabel;
    svg.appendChild(primaryLabelText);

    // SECONDARY Picture IMAGE (smaller, top-right)
    const secondaryImage = document.createElementNS(svgNS, 'image');
    secondaryImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', secondaryImageUrl);
    secondaryImage.setAttribute('x', secondaryX - secondarySize / 2);
    secondaryImage.setAttribute('y', secondaryY - secondarySize / 2);
    secondaryImage.setAttribute('width', secondarySize);
    secondaryImage.setAttribute('height', secondarySize);
    secondaryImage.setAttribute('class', 'water-Picture-image');
    secondaryImage.setAttribute('opacity', secondaryOpacity);
    secondaryImage.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    secondaryImage.style.pointerEvents = 'all';
    secondaryImage.setAttribute('crossorigin', 'anonymous');
    svg.appendChild(secondaryImage);

    // Percentage indicator (at top of secondary Picture)
    if (config.show_percentage !== false) {
      const percentageText = document.createElementNS(svgNS, 'text');
      percentageText.setAttribute('x', secondaryX);
      percentageText.setAttribute('y', secondaryY - 65);
      percentageText.setAttribute('class', 'percentage-indicator');
      percentageText.setAttribute('fill', config.percentage_color || '#E53935');
      percentageText.setAttribute('font-size', config.font_size_percentage || '28');
      percentageText.textContent = percentage;
      svg.appendChild(percentageText);
    }

    // IMPROVEMENT 3: Secondary value text with ENHANCED drill functionality
    const secondaryValueText = document.createElementNS(svgNS, 'text');
    secondaryValueText.setAttribute('x', secondaryX);
    secondaryValueText.setAttribute('y', secondaryY - 5);
    secondaryValueText.setAttribute('class', 'Picture-value');
    secondaryValueText.setAttribute('fill', config.secondary_text_color || '#E53935');
    secondaryValueText.setAttribute('font-size', config.font_size_secondary_value || '44');
    secondaryValueText.setAttribute('cursor', 'pointer');
    secondaryValueText.textContent = secondaryValue;

    const secondaryCell = row[secondaryFieldName];
    const secondaryMeasureLinks = secondaryCell && secondaryCell.links ? secondaryCell.links : [];

    console.log('Secondary field:', secondaryFieldName);
    console.log('Secondary cell data:', secondaryCell);
    console.log('Secondary measure links:', secondaryMeasureLinks);

    // Enhanced drill menu for secondary value
    if (secondaryMeasureLinks.length > 0) {
      secondaryValueText.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();

        console.log('Secondary value clicked - opening drill menu');

        if (typeof LookerCharts !== 'undefined' && LookerCharts.Utils && LookerCharts.Utils.openDrillMenu) {
          try {
            LookerCharts.Utils.openDrillMenu({
              links: secondaryMeasureLinks,
              event: e
            });
            console.log('✓ Drill menu opened via LookerCharts.Utils.openDrillMenu');
          } catch (error) {
            console.error('✗ Error opening drill menu via LookerCharts.Utils:', error);

            try {
              if (typeof openDrillMenu === 'function') {
                openDrillMenu({
                  links: secondaryMeasureLinks,
                  event: e
                });
                console.log('✓ Drill menu opened via direct openDrillMenu function');
              }
            } catch (fallbackError) {
              console.error('✗ Fallback drill menu also failed:', fallbackError);
            }
          }
        } else {
          console.warn('⚠ LookerCharts.Utils.openDrillMenu not available');

          try {
            const drillEvent = new CustomEvent('looker-drill-menu', {
              detail: { links: secondaryMeasureLinks, event: e },
              bubbles: true,
              cancelable: true
            });
            secondaryValueText.dispatchEvent(drillEvent);
            console.log('✓ Dispatched custom looker-drill-menu event');
          } catch (customEventError) {
            console.error('✗ Custom event dispatch failed:', customEventError);
          }
        }
      });

      // Add visual feedback for clickable element
      //secondaryValueText.style.textDecoration = 'underline';
      //secondaryValueText.style.textDecorationStyle = 'dotted';
    } else {
      console.log('✗ No drill links available for secondary value');
    }

    svg.appendChild(secondaryValueText);

    // Secondary label text
    const secondaryLabelText = document.createElementNS(svgNS, 'text');
    secondaryLabelText.setAttribute('x', secondaryX);
    secondaryLabelText.setAttribute('y', secondaryY + 45);
    secondaryLabelText.setAttribute('class', 'Picture-label');
    secondaryLabelText.setAttribute('fill', config.secondary_text_color || '#666666');
    secondaryLabelText.setAttribute('font-size', config.font_size_secondary_label || '16');
    secondaryLabelText.setAttribute('opacity', '0.9');
    secondaryLabelText.textContent = secondaryLabel;
    svg.appendChild(secondaryLabelText);
  }
});

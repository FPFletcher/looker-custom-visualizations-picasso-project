/**
 * Water Picture Visualization for Looker
 * Combined JavaScript file with embedded HTML and CSS
 *
 * FEATURES:
 * 1. PDF Export Support (Image Preloading)
 * 2. LookML Value Formatting
 * 3. Dashboard & Explore Drill Support
 * 4. Organized Menu Structure (Plot & Formatting tabs)
 */

looker.plugins.visualizations.add({
  id: "single_value_picture_background",
  label: "Single Value (Picture)",
  options: {
    // ==================================================================
    // TAB 1: PLOT (Layout, Backgrounds, Images)
    // ==================================================================

    // --- SECTION: Background ---
    plot_section_divider: {
      type: "string",
      label: "━━━ Background Settings ━━━",
      display: "divider",
      section: "Plot",
      order: 10
    },
    background_color: {
      type: "string",
      label: "Background Color",
      default: "#5C6BC0",
      display: "color",
      section: "Plot",
      order: 11
    },
    background_image_url: {
      type: "string",
      label: "Background Image URL (Optional)",
      placeholder: "https://example.com/background.jpg",
      section: "Plot",
      order: 12
    },
    background_image_opacity: {
      type: "number",
      label: "Background Opacity",
      default: 1.0,
      display: "range",
      min: 0,
      max: 1,
      step: 0.1,
      section: "Plot",
      order: 13
    },

    // --- SECTION: Primary Image ---
    primary_image_section_divider: {
      type: "string",
      label: "━━━ Primary Image Settings ━━━",
      display: "divider",
      section: "Plot",
      order: 20
    },
    primary_image_url: {
      type: "string",
      label: "Primary Image URL (CDN preferred)",
      default: "https://static.vecteezy.com/system/resources/thumbnails/044/570/540/small_2x/single-water-drop-on-transparent-background-free-png.png",
      section: "Plot",
      order: 21
    },
    primary_Picture_size: {
      type: "number",
      label: "Primary Image Size",
      default: 240,
      section: "Plot",
      order: 22
    },
    primary_image_opacity: {
      type: "number",
      label: "Primary Image Opacity",
      default: 1.0,
      display: "range",
      min: 0,
      max: 1,
      step: 0.1,
      section: "Plot",
      order: 23
    },
    primary_x_position: {
      type: "number",
      label: "Primary X Position",
      default: 280,
      section: "Plot",
      order: 24
    },
    primary_y_position: {
      type: "number",
      label: "Primary Y Position",
      default: 350,
      section: "Plot",
      order: 25
    },

    // --- SECTION: Secondary Image ---
    secondary_image_section_divider: {
      type: "string",
      label: "━━━ Secondary Image Settings ━━━",
      display: "divider",
      section: "Plot",
      order: 30
    },
    secondary_image_url: {
      type: "string",
      label: "Secondary Image URL (CDN preferred)",
      default: "https://static.vecteezy.com/system/resources/thumbnails/044/570/540/small_2x/single-water-drop-on-transparent-background-free-png.png",
      section: "Plot",
      order: 31
    },
    secondary_Picture_size: {
      type: "number",
      label: "Secondary Image Size",
      default: 190,
      section: "Plot",
      order: 32
    },
    secondary_image_opacity: {
      type: "number",
      label: "Secondary Image Opacity",
      default: 0.9,
      display: "range",
      min: 0,
      max: 1,
      step: 0.1,
      section: "Plot",
      order: 33
    },
    secondary_x_position: {
      type: "number",
      label: "Secondary X Position",
      default: 520,
      section: "Plot",
      order: 34
    },
    secondary_y_position: {
      type: "number",
      label: "Secondary Y Position",
      default: 250,
      section: "Plot",
      order: 35
    },

    // ==================================================================
    // TAB 2: FORMATTING (Text, Colors, Percentages)
    // ==================================================================

    // --- SECTION: Primary Text ---
    primary_text_divider: {
      type: "string",
      label: "━━━ Primary Value Styling ━━━",
      display: "divider",
      section: "Formatting",
      order: 10
    },
    primary_label: {
      type: "string",
      label: "Primary Label (Override)",
      default: "",
      section: "Formatting",
      order: 11
    },
    primary_text_color: {
      type: "string",
      label: "Primary Text Color",
      default: "#FFFFFF",
      display: "color",
      section: "Formatting",
      order: 12
    },
    font_size_primary_value: {
      type: "number",
      label: "Primary Value Font Size",
      default: 52,
      section: "Formatting",
      order: 13
    },
    font_size_primary_label: {
      type: "number",
      label: "Primary Label Font Size",
      default: 18,
      section: "Formatting",
      order: 14
    },

    // --- SECTION: Secondary Text ---
    secondary_text_divider: {
      type: "string",
      label: "━━━ Secondary Value Styling ━━━",
      display: "divider",
      section: "Formatting",
      order: 20
    },
    secondary_label: {
      type: "string",
      label: "Secondary Label (Override)",
      default: "",
      section: "Formatting",
      order: 21
    },
    secondary_text_color: {
      type: "string",
      label: "Secondary Text Color",
      default: "#E53935",
      display: "color",
      section: "Formatting",
      order: 22
    },
    font_size_secondary_value: {
      type: "number",
      label: "Secondary Value Font Size",
      default: 44,
      section: "Formatting",
      order: 23
    },
    font_size_secondary_label: {
      type: "number",
      label: "Secondary Label Font Size",
      default: 16,
      section: "Formatting",
      order: 24
    },

    // --- SECTION: Percentage ---
    percentage_divider: {
      type: "string",
      label: "━━━ Percentage Indicator ━━━",
      display: "divider",
      section: "Formatting",
      order: 30
    },
    show_percentage: {
      type: "boolean",
      label: "Show Percentage",
      default: true,
      section: "Formatting",
      order: 31
    },
    percentage_calculation: {
      type: "string",
      label: "Percentage Calculation",
      display: "select",
      values: [{
          "Secondary / Primary": "secondary_over_primary"
        },
        {
          "Use 3rd Measure": "use_third_measure"
        }
      ],
      default: "secondary_over_primary",
      section: "Formatting",
      order: 32
    },
    percentage_color: {
      type: "string",
      label: "Percentage Color",
      default: "#E53935",
      display: "color",
      section: "Formatting",
      order: 33
    },
    font_size_percentage: {
      type: "number",
      label: "Percentage Font Size",
      default: 28,
      section: "Formatting",
      order: 34
    },
    percentage_decimals: {
      type: "number",
      label: "Percentage Decimals",
      default: 1,
      display: "number",
      section: "Formatting",
      order: 35
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
        filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.25));
        transition: all 0.3s ease;
      }

      .water-Picture-image:hover {
        filter: drop-shadow(0px 6px 16px rgba(0, 0, 0, 0.35));
      }

      @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
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
      <div class="water-Picture-container">
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
    this.clearErrors();

    if (!this._svg || !this._container) {
      this.addError({
        title: "Initialization Error",
        message: "Visualization not properly initialized"
      });
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

    // Get measures
    const measures = queryResponse.fields.measure_like;
    if (measures.length < 2) {
      this.showError('At least 2 measures required');
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

    const percentageCalc = config.percentage_calculation || "secondary_over_primary";

    if (percentageCalc === "use_third_measure" && percentageField) {
      percentageValue = row[percentageField.name].value;
    } else {
      percentageValue = primaryValue !== 0 ? (secondaryValue / primaryValue) : 0;
    }

    // Format values
    const primaryFormatted = this.formatValueWithLookML(primaryValue, primaryField, row[primaryField.name].rendered);
    const secondaryFormatted = this.formatValueWithLookML(secondaryValue, secondaryField, row[secondaryField.name].rendered);
    const percentageFormatted = this.formatPercentage(percentageValue, config.percentage_decimals || 1, percentageCalc);

    // Get labels
    const primaryLabel = config.primary_label || measures[0].label_short || measures[0].label || "Primary Value";
    const secondaryLabel = config.secondary_label || measures[1].label_short || measures[1].label || "Secondary Value";

    // Draw
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
   * Helper: Show error message
   */
  showError: function(message) {
    this._svg.innerHTML = `
      <g>
        <text x="400" y="280" text-anchor="middle" fill="#666" font-size="16" font-family="Arial, sans-serif">
          ${message}
        </text>
      </g>
    `;
  },

  /**
   * Helper: Format values respecting LookML
   */
  formatValueWithLookML: function(value, field, renderedValue) {
    if (value === null || value === undefined) return '';
    if (renderedValue) return renderedValue;

    if (field && field.value_format) {
      const fmt = field.value_format;
      const num = Number(value);

      if (fmt.includes('," k"') || fmt.includes(",'k'")) {
        return (num / 1000).toLocaleString() + 'k';
      }
      if (fmt.includes('," M"') || fmt.includes(",'M'")) {
        return (num / 1000000).toLocaleString() + 'M';
      }
      if (fmt.includes('%')) {
        return (num * 100).toFixed(1) + '%';
      }
    }
    return this.formatValue(value);
  },

  /**
   * Helper: Fallback formatting
   */
  formatValue: function(value) {
    const absValue = Math.abs(value);
    const sign = value < 0 ? '-' : '';
    if (absValue >= 1000000) return sign + (absValue / 1000000).toFixed(2) + 'M';
    if (absValue >= 1000) return sign + (absValue / 1000).toFixed(2) + 'K';
    return sign + absValue.toFixed(2);
  },

  /**
   * Helper: Format Percentage
   */
  formatPercentage: function(value, decimals, calculationMethod) {
    let percentage = (calculationMethod === "use_third_measure") ? value : value * 100;
    return percentage.toFixed(decimals) + '%';
  },

  /**
   * MAIN DRAWING FUNCTION
   * Includes fix for PDF Export and Syntax Errors
   */
  drawWaterPictures: function(primaryValue, secondaryValue, percentage, primaryLabel, secondaryLabel, config, data, row, primaryFieldName, secondaryFieldName) {
    const svg = this._svg;
    const svgNS = "http://www.w3.org/2000/svg";

    // Config extraction
    const primaryX = config.primary_x_position || 280;
    const primaryY = config.primary_y_position || 350;
    const secondaryX = config.secondary_x_position || 520;
    const secondaryY = config.secondary_y_position || 250;
    const primarySize = config.primary_Picture_size || 240;
    const secondarySize = config.secondary_Picture_size || 190;

    // Image URLs (Defaults to the water drop image provided)
    const primaryImageUrl = config.primary_image_url || "https://static.vecteezy.com/system/resources/thumbnails/044/570/540/small_2x/single-water-drop-on-transparent-background-free-png.png";
    const secondaryImageUrl = config.secondary_image_url || "https://static.vecteezy.com/system/resources/thumbnails/044/570/540/small_2x/single-water-drop-on-transparent-background-free-png.png";

    const primaryOpacity = config.primary_image_opacity !== undefined ? config.primary_image_opacity : 1.0;
    const secondaryOpacity = config.secondary_image_opacity !== undefined ? config.secondary_image_opacity : 0.9;

    // Filters
    const defs = document.createElementNS(svgNS, 'defs');
    svg.appendChild(defs);

    // ---------------------------------------------------------
    // PDF EXPORT FIX: Preload Primary Image
    // ---------------------------------------------------------
    const primaryImg = new Image();
    primaryImg.crossOrigin = "anonymous";
    primaryImg.onload = () => { console.log('✓ Primary image loaded'); };
    primaryImg.src = primaryImageUrl;
    // ---------------------------------------------------------

    // 1. Draw Primary Image
    const primaryImage = document.createElementNS(svgNS, 'image');
    primaryImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', primaryImageUrl);
    primaryImage.setAttribute('x', primaryX - primarySize / 2);
    primaryImage.setAttribute('y', primaryY - primarySize / 2);
    primaryImage.setAttribute('width', primarySize);
    primaryImage.setAttribute('height', primarySize);
    primaryImage.setAttribute('class', 'water-Picture-image');
    primaryImage.setAttribute('opacity', primaryOpacity);
    primaryImage.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.appendChild(primaryImage);

    // 2. Draw Primary Text (Value)
    const primaryValueText = document.createElementNS(svgNS, 'text');
    primaryValueText.setAttribute('x', primaryX);
    primaryValueText.setAttribute('y', primaryY - 10);
    primaryValueText.setAttribute('class', 'Picture-value');
    primaryValueText.setAttribute('fill', config.primary_text_color || '#FFFFFF');
    primaryValueText.setAttribute('font-size', config.font_size_primary_value || '52');
    primaryValueText.setAttribute('cursor', 'pointer');
    primaryValueText.textContent = primaryValue;

    // Drill Logic Primary
    const primaryCell = row[primaryFieldName];
    const primaryLinks = primaryCell && primaryCell.links ? primaryCell.links : [];
    if (primaryLinks.length > 0) {
      primaryValueText.addEventListener('click', (e) => {
        LookerCharts.Utils.openDrillMenu({ links: primaryLinks, event: e });
      });
    }
    svg.appendChild(primaryValueText);

    // 3. Draw Primary Label
    const primaryLabelText = document.createElementNS(svgNS, 'text');
    primaryLabelText.setAttribute('x', primaryX);
    primaryLabelText.setAttribute('y', primaryY + 50);
    primaryLabelText.setAttribute('class', 'Picture-label');
    primaryLabelText.setAttribute('fill', config.primary_text_color || '#FFFFFF');
    primaryLabelText.setAttribute('font-size', config.font_size_primary_label || '18');
    primaryLabelText.setAttribute('opacity', '0.95');
    primaryLabelText.textContent = primaryLabel;
    svg.appendChild(primaryLabelText);

    // 4. Draw Secondary Image
    const secondaryImage = document.createElementNS(svgNS, 'image');
    secondaryImage.setAttributeNS('http://www.w3.org/1999/xlink', 'href', secondaryImageUrl);
    secondaryImage.setAttribute('x', secondaryX - secondarySize / 2);
    secondaryImage.setAttribute('y', secondaryY - secondarySize / 2);
    secondaryImage.setAttribute('width', secondarySize);
    secondaryImage.setAttribute('height', secondarySize);
    secondaryImage.setAttribute('class', 'water-Picture-image');
    secondaryImage.setAttribute('opacity', secondaryOpacity);
    secondaryImage.setAttribute('preserveAspectRatio', 'xMidYMid meet');
    svg.appendChild(secondaryImage);

    // 5. Draw Percentage
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

    // 6. Draw Secondary Text (Value)
    const secondaryValueText = document.createElementNS(svgNS, 'text');
    secondaryValueText.setAttribute('x', secondaryX);
    secondaryValueText.setAttribute('y', secondaryY - 5);
    secondaryValueText.setAttribute('class', 'Picture-value');
    secondaryValueText.setAttribute('fill', config.secondary_text_color || '#E53935');
    secondaryValueText.setAttribute('font-size', config.font_size_secondary_value || '44');
    secondaryValueText.setAttribute('cursor', 'pointer');
    secondaryValueText.textContent = secondaryValue;

    // Drill Logic Secondary
    const secondaryCell = row[secondaryFieldName];
    const secondaryLinks = secondaryCell && secondaryCell.links ? secondaryCell.links : [];
    if (secondaryLinks.length > 0) {
      secondaryValueText.addEventListener('click', (e) => {
        LookerCharts.Utils.openDrillMenu({ links: secondaryLinks, event: e });
      });
    }
    svg.appendChild(secondaryValueText);

    // 7. Draw Secondary Label
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

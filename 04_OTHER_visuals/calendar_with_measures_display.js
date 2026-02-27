/**
 * Custom Calendar Visualization - v2.0 (Jan 30 Standards)
 *
 * Features:
 * - Monthly Calendar View with Event & Measure support
 * - Multi-language support (JA, EN, FR, DE, ES, IT)
 * - Conditional Formatting (Heatmap) & Micro-Charts (Bars)
 * - PDF/Print optimized (Hides navigation, forces layout)
 * - Vanilla JS (Lightweight, no heavy dependencies)
 */

looker.plugins.visualizations.add({
  id: "custom_calendar_viz_v2",
  label: "Custom Calendar (Jan 30)",

  // ============================================================
  // 1. Options Configuration (Translated to English)
  // ============================================================
  options: {
    // --- General Settings ---
    calendar_section: {
      type: 'string',
      label: '── General Settings ──',
      display: 'divider',
      section: 'Calendar',
      order: 0
    },
    weekendColoring: {
      type: 'boolean',
      label: 'Highlight Weekends',
      default: true,
      section: 'Calendar',
      order: 1
    },
    weekdayLanguage: {
      type: 'string',
      label: 'Weekday Language',
      display: 'select',
      values: [
        {'Japanese': 'ja'},
        {'English': 'en'},
        {'French': 'fr'},
        {'German': 'de'},
        {'Spanish': 'es'},
        {'Italian': 'it'}
      ],
      default: 'ja',
      section: 'Calendar',
      order: 2
    },

    // --- Event Styling ---
    event_section: {
      type: 'string',
      label: '── Events ──',
      display: 'divider',
      section: 'Calendar',
      order: 2.5
    },
    eventFontColor: {
      type: 'string',
      label: 'Event Text Color',
      display: 'color',
      default: '#333333',
      section: 'Calendar',
      order: 3
    },
    eventFontSize: {
      type: 'number',
      label: 'Event Font Size (px)',
      default: 11,
      section: 'Calendar',
      order: 4
    },
    eventFontBold: {
      type: 'boolean',
      label: 'Bold Events',
      default: false,
      section: 'Calendar',
      order: 5
    },

    // --- Measures (1-3) ---
    // Measure 1
    legendSection1: { type: 'string', label: '▼ Measure 1', display: 'heading', order: 9, section: 'Measures' },
    showMeasureValue1: { type: 'boolean', label: 'Show', default: true, section: 'Measures', order: 10, display_size: 'third' },
    measureFontSize1: { type: 'number', label: 'Size (px)', default: 12, section: 'Measures', order: 11, display_size: 'third' },
    measureFontColor1: { type: 'string', label: 'Color', display: 'color', default: '#333333', section: 'Measures', order: 12, display_size: 'third' },

    // Measure 2
    legendSection2: { type: 'string', label: '▼ Measure 2', display: 'heading', order: 19, section: 'Measures' },
    showMeasureValue2: { type: 'boolean', label: 'Show', default: true, section: 'Measures', order: 20, display_size: 'third' },
    measureFontSize2: { type: 'number', label: 'Size (px)', default: 12, section: 'Measures', order: 21, display_size: 'third' },
    measureFontColor2: { type: 'string', label: 'Color', display: 'color', default: '#333333', section: 'Measures', order: 22, display_size: 'third' },

    // Measure 3
    legendSection3: { type: 'string', label: '▼ Measure 3', display: 'heading', order: 29, section: 'Measures' },
    showMeasureValue3: { type: 'boolean', label: 'Show', default: true, section: 'Measures', order: 30, display_size: 'third' },
    measureFontSize3: { type: 'number', label: 'Size (px)', default: 12, section: 'Measures', order: 31, display_size: 'third' },
    measureFontColor3: { type: 'string', label: 'Color', display: 'color', default: '#333333', section: 'Measures', order: 32, display_size: 'third' },

    // --- Bar Charts ---
    showBarChart: {
      type: 'boolean',
      label: 'Show Bar Chart',
      default: false,
      section: 'Bar Chart',
      order: 1
    },
    barWidth: { type: 'number', label: 'Bar Width (px)', default: 5, section: 'Bar Chart', order: 2 },
    barColor1: { type: 'string', label: 'Meas 1 Color', display: 'color', default: '#3498db', section: 'Bar Chart', order: 3 },
    barColor2: { type: 'string', label: 'Meas 2 Color', display: 'color', default: '#e74c3c', section: 'Bar Chart', order: 4 },
    barColor3: { type: 'string', label: 'Meas 3 Color', display: 'color', default: '#2ecc71', section: 'Bar Chart', order: 5 },

    // --- Heatmap (Background Scale) ---
    showBackgroundColorScale: {
      type: 'boolean',
      label: 'Enable Heatmap Background',
      default: false,
      section: 'Heatmap',
      order: 1
    },
    backgroundColorMeasure: {
      type: 'string',
      label: 'Target Measure',
      display: 'select',
      values: [], // Populated dynamically
      default: '',
      section: 'Heatmap',
      order: 2
    },
    minColor: { type: 'string', label: 'Min Color', display: 'color', default: '#e6f7ff', section: 'Heatmap', order: 3 },
    midColor: { type: 'string', label: 'Mid Color', display: 'color', default: '#74c0fc', section: 'Heatmap', order: 4 },
    maxColor: { type: 'string', label: 'Max Color', display: 'color', default: '#1864ab', section: 'Heatmap', order: 5 }
  },

  // ============================================================
  // 2. Initialization
  // ============================================================
  create: function(element, config) {
    this._container = element.appendChild(document.createElement("div"));
    this._container.className = "calendar-viz-container";

    // Default to current date
    this._currentDate = new Date();

    // Internal State
    this._lastArgs = null;

    // Resize Observer for responsive updates
    this._resizeObserver = new ResizeObserver(() => {
      if (this._lastArgs) {
        // Debounce slightly to prevent thrashing
        // requestAnimationFrame(() => this.updateAsync(...this._lastArgs));
        // For simple CSS-based flex layouts, strict redraw might not be needed,
        // but beneficial if calculating heights.
      }
    });
    this._resizeObserver.observe(element);

    // Inject Styles once
    if (!document.getElementById('calendar-viz-styles')) {
      const style = document.createElement('style');
      style.id = 'calendar-viz-styles';
      style.innerHTML = `
        .calendar-viz-container { font-family: 'Open Sans', 'Noto Sans JP', sans-serif; height: 100%; display: flex; flex-direction: column; overflow: hidden; background: #fff; }
        .calendar-header { display: flex; justify-content: space-between; align-items: center; padding: 10px; border-bottom: 1px solid #eee; background: #fafafa; flex-shrink: 0; }
        .calendar-header h2 { margin: 0; font-size: 18px; color: #444; }
        .calendar-nav-btn { border: 1px solid #ddd; background-color: #fff; border-radius: 4px; cursor: pointer; padding: 4px 12px; font-weight: bold; color: #555; transition: background 0.2s; }
        .calendar-nav-btn:hover { background-color: #f0f0f0; }
        .calendar-nav-btn.hidden { visibility: hidden; } /* For print mode */

        .calendar-grid { flex-grow: 1; display: grid; grid-template-columns: repeat(7, 1fr); grid-template-rows: 30px repeat(auto-fit, minmax(0, 1fr)); gap: 1px; background-color: #e0e0e0; overflow: auto; }

        .weekday-header { text-align: center; padding: 6px; background-color: #fff; font-weight: bold; font-size: 12px; color: #666; display: flex; align-items: center; justify-content: center; }

        .date-cell { background-color: white; padding: 6px; position: relative; display: flex; flex-direction: column; overflow: hidden; min-height: 80px; transition: background-color 0.3s; }
        .date-cell:hover { box-shadow: inset 0 0 0 2px #4a90e2; z-index: 1; }

        .day-number { font-size: 13px; font-weight: bold; margin-bottom: 4px; color: #444; }

        .event-name { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 2px; }

        .measure-values-container { display: flex; flex-direction: column; gap: 1px; margin-top: auto; }
        .measure-value { font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

        .bar-container { position: absolute; right: 4px; bottom: 4px; width: 40%; height: 40%; display: flex; align-items: flex-end; justify-content: flex-end; gap: 2px; opacity: 0.8; pointer-events: none; }
        .bar-chart { min-height: 2px; border-radius: 2px 2px 0 0; }

        /* Weekend Colors */
        .weekend-sat { color: #2980b9; }
        .weekend-sun { color: #c0392b; }
      `;
      document.head.appendChild(style);
    }
  },

  // ============================================================
  // 3. Render (Update)
  // ============================================================
  updateAsync: function(data, element, config, queryResponse, details, done) {
    this._lastArgs = [data, element, config, queryResponse, details, done];
    this.clearErrors();

    // --- 1. Validation ---
    if (queryResponse.fields.dimensions.length < 1) {
      this.addError({ title: "Configuration Error", message: "At least 1 Date Dimension is required." });
      return;
    }

    // --- 2. Print Detection ---
    const isPrint = details && details.print;
    if (isPrint && element.clientHeight === 0) {
        element.style.height = '600px'; // Force height for PDF
    }

    // --- 3. Dynamic Options Update ---
    const measures = queryResponse.fields.measures.slice(0, 3);
    const measureOptions = measures.map(m => ({ [m.label_short || m.label]: m.name }));

    // Only update if options have changed to avoid loops
    if (JSON.stringify(this.options.backgroundColorMeasure.values) !== JSON.stringify(measureOptions)) {
        const newOptions = { ...this.options };
        newOptions.backgroundColorMeasure.values = measureOptions;
        if (measures.length > 0 && !config.backgroundColorMeasure) {
            newOptions.backgroundColorMeasure.default = measures[0].name;
        }
        this.trigger('registerOptions', newOptions);
    }

    // --- 4. Data Processing ---
    const dateDim = queryResponse.fields.dimensions[0].name;
    const eventDim = queryResponse.fields.dimensions.length > 1 ? queryResponse.fields.dimensions[1].name : null;

    // Calculate Min/Max for Scaling
    let measureStats = { all: { min: Infinity, max: -Infinity } };
    measures.forEach(m => measureStats[m.name] = { min: Infinity, max: -Infinity });

    const dataByDate = {};
    data.forEach(row => {
        if (!row[dateDim].value) return;

        // Handle Date (Split T to handle ISO strings safely)
        const dateStr = String(row[dateDim].value).split('T')[0];

        const measureValues = measures.map(m => {
            const val = row[m.name].value;
            return typeof val === 'number' ? val : null;
        });

        dataByDate[dateStr] = {
            event: eventDim ? LookerCharts.Utils.textForCell(row[eventDim]) : '',
            measures: measureValues,
            rendered: measures.map(m => row[m.name].rendered) // Keep formatted values
        };

        // Update Stats
        measureValues.forEach((val, i) => {
            if (val !== null) {
                measureStats.all.min = Math.min(measureStats.all.min, val);
                measureStats.all.max = Math.max(measureStats.all.max, val);
                const mName = measures[i].name;
                measureStats[mName].min = Math.min(measureStats[mName].min, val);
                measureStats[mName].max = Math.max(measureStats[mName].max, val);
            }
        });
    });

    // --- 5. Render Layout ---
    this._container.innerHTML = '';

    // -- Header --
    const header = this._container.appendChild(document.createElement('div'));
    header.className = 'calendar-header';

    // Prev Button
    const prevBtn = header.appendChild(document.createElement('button'));
    prevBtn.className = `calendar-nav-btn ${isPrint ? 'hidden' : ''}`;
    prevBtn.innerHTML = '&#9664;'; // Left Arrow
    prevBtn.onclick = () => {
        this._currentDate.setMonth(this._currentDate.getMonth() - 1);
        this.updateAsync(data, element, config, queryResponse, details, done);
    };

    // Title
    const monthDisplay = header.appendChild(document.createElement('h2'));
    const monthNames = this._currentDate.toLocaleString(config.weekdayLanguage || 'ja', { month: 'long', year: 'numeric' });
    monthDisplay.textContent = monthNames;

    // Next Button
    const nextBtn = header.appendChild(document.createElement('button'));
    nextBtn.className = `calendar-nav-btn ${isPrint ? 'hidden' : ''}`;
    nextBtn.innerHTML = '&#9654;'; // Right Arrow
    nextBtn.onclick = () => {
        this._currentDate.setMonth(this._currentDate.getMonth() + 1);
        this.updateAsync(data, element, config, queryResponse, details, done);
    };

    // -- Grid --
    const grid = this._container.appendChild(document.createElement('div'));
    grid.className = 'calendar-grid';

    // Weekday Headers
    const weekDayLabels = {
        ja: ['日', '月', '火', '水', '木', '金', '土'],
        en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        fr: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
        de: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
        es: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
        it: ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab']
    };
    const labels = weekDayLabels[config.weekdayLanguage] || weekDayLabels['ja'];

    labels.forEach((day, i) => {
        const cell = grid.appendChild(document.createElement('div'));
        cell.className = 'weekday-header';
        cell.textContent = day;
        if (config.weekendColoring) {
            if (i === 0) cell.classList.add('weekend-sun');
            if (i === 6) cell.classList.add('weekend-sat');
        }
    });

    // Calendar Logic
    const year = this._currentDate.getFullYear();
    const month = this._currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDayIndex = firstDay.getDay(); // 0 = Sunday

    // Padding Days (Empty)
    for (let i = 0; i < startDayIndex; i++) {
        const empty = grid.appendChild(document.createElement('div'));
        empty.style.backgroundColor = '#f9f9f9'; // Slightly differ from active days
    }

    // Active Days
    for (let day = 1; day <= lastDay.getDate(); day++) {
        const cell = grid.appendChild(document.createElement('div'));
        cell.className = 'date-cell';

        const currentLoopDate = new Date(year, month, day);
        const dayOfWeek = currentLoopDate.getDay();

        // Key: YYYY-MM-DD
        const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        // Day Number
        const dayNumDiv = cell.appendChild(document.createElement('div'));
        dayNumDiv.className = 'day-number';
        dayNumDiv.textContent = day;
        if (config.weekendColoring) {
            if (dayOfWeek === 0) dayNumDiv.classList.add('weekend-sun');
            if (dayOfWeek === 6) dayNumDiv.classList.add('weekend-sat');
        }

        // --- Cell Content ---
        if (dataByDate[dateKey]) {
            const cellData = dataByDate[dateKey];

            // 1. Heatmap Background
            if (config.showBackgroundColorScale && config.backgroundColorMeasure) {
                const mIdx = measures.findIndex(m => m.name === config.backgroundColorMeasure);
                if (mIdx !== -1 && cellData.measures[mIdx] !== null) {
                    const val = cellData.measures[mIdx];
                    const stats = measureStats[config.backgroundColorMeasure];
                    const bgColor = this._getHeatmapColor(val, stats.min, stats.max, config.minColor, config.midColor, config.maxColor);
                    cell.style.backgroundColor = bgColor;
                }
            }

            // 2. Event Text
            if (cellData.event) {
                const evt = cell.appendChild(document.createElement('div'));
                evt.className = 'event-name';
                evt.textContent = cellData.event;
                evt.style.color = config.eventFontColor;
                evt.style.fontSize = `${config.eventFontSize}px`;
                if (config.eventFontBold) evt.style.fontWeight = 'bold';
                evt.title = cellData.event; // Tooltip on hover
            }

            // 3. Measure Values
            const valuesContainer = cell.appendChild(document.createElement('div'));
            valuesContainer.className = 'measure-values-container';

            cellData.measures.forEach((val, i) => {
                if (val !== null && config[`showMeasureValue${i+1}`]) {
                    const txt = valuesContainer.appendChild(document.createElement('span'));
                    txt.className = 'measure-value';
                    const label = measures[i].label_short || measures[i].label;
                    const displayVal = cellData.rendered[i] || val.toLocaleString();
                    txt.textContent = `${label}: ${displayVal}`;
                    txt.style.fontSize = `${config[`measureFontSize${i+1}`]}px`;
                    txt.style.color = config[`measureFontColor${i+1}`];
                }
            });

            // 4. Bar Chart
            if (config.showBarChart) {
                const barCont = cell.appendChild(document.createElement('div'));
                barCont.className = 'bar-container';

                cellData.measures.forEach((val, i) => {
                    if (val !== null) {
                        const bar = barCont.appendChild(document.createElement('div'));
                        bar.className = 'bar-chart';
                        const range = measureStats.all.max - measureStats.all.min;
                        const pct = range > 0 ? ((val - measureStats.all.min) / range) * 100 : 0;
                        bar.style.height = `${Math.max(5, pct)}%`; // Min 5% height for visibility
                        bar.style.width = `${config.barWidth}px`;
                        bar.style.backgroundColor = config[`barColor${i+1}`];
                    }
                });
            }
        }
    }

    done();
  },

  // ============================================================
  // 4. Helper Functions
  // ============================================================

  _hexToRgb: function(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
  },

  _interpolateColor: function(color1, color2, factor) {
    if (factor === undefined) factor = 0.5;
    const c1 = this._hexToRgb(color1);
    const c2 = this._hexToRgb(color2);
    if (!c1 || !c2) return '#ffffff';

    const r = Math.round(c1[0] + factor * (c2[0] - c1[0]));
    const g = Math.round(c1[1] + factor * (c2[1] - c1[1]));
    const b = Math.round(c1[2] + factor * (c2[2] - c1[2]));
    return `rgb(${r}, ${g}, ${b})`;
  },

  _getHeatmapColor: function(value, min, max, minC, midC, maxC) {
    const range = max - min;
    if (range === 0) return midC;
    const pct = (value - min) / range;

    if (pct < 0.5) {
      return this._interpolateColor(minC, midC, pct * 2);
    } else {
      return this._interpolateColor(midC, maxC, (pct - 0.5) * 2);
    }
  }
});

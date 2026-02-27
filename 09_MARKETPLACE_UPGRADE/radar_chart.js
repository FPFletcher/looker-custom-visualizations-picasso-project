/**
 * Categorical Radar Chart - v2.0 (Jan 30 Standards)
 *
 * Features:
 * - Dynamic 2-level pivot radar (Outer Ring = Category, Inner Radar = Axes)
 * - Interactive filtering (Click ring to zoom category)
 * - PDF/Print compatible (No animations in print mode)
 * - Auto-dependency loading (D3.js v7)
 */

// --- 1. DEPENDENCY LOADER ---
const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      if (existing.dataset.loaded === "true") return resolve();
      existing.addEventListener('load', resolve);
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.dataset.loaded = "false";
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () => {
      console.error(`[Viz Loader] Failed to load ${src}`);
      reject();
    };
    document.head.appendChild(script);
  });
};

// Load D3.js immediately
loadScript("https://d3js.org/d3.v7.min.js");

looker.plugins.visualizations.add({
  id: "categorical_radar_viz_jan30",
  label: "Categorical Radar (Jan 30)",

  // --- OPTIONS ---
  options: {
    radar_color: {
      type: "string",
      label: "Radar Stroke Color",
      display: "color",
      default: "#6c43e0",
      section: "Style"
    },
    radar_width: {
      type: "number",
      label: "Radar Stroke Width",
      default: 3,
      min: 1,
      max: 10,
      step: 1,
      section: "Style"
    },
    radar_opacity: {
      type: "number",
      label: "Radar Opacity (0-1)",
      default: 0.8,
      min: 0,
      max: 1,
      step: 0.1,
      section: "Style"
    },
    color_scheme: {
      type: "string",
      label: "Category Color Scheme",
      display: "select",
      values: [
        { "Vivid": "vivid" },
        { "Pastel": "pastel" },
        { "Cool": "cool" }
      ],
      default: "vivid",
      section: "Style"
    }
  },

  // --- CREATE ---
  create: function(element, config) {
    element.innerHTML = "";

    // Container Setup
    this.container = d3.select(element)
      .append("svg")
      .attr("width", "100%")
      .attr("height", "100%");

    this.mainGroup = this.container.append("g").attr("class", "main-group");

    // Background click area (for resetting filter)
    this.bgCircle = this.mainGroup.append("circle")
      .attr("fill", "transparent")
      .attr("cursor", "pointer");

    // CSS Styles
    this.style = d3.select(element).append("style");
    this.style.text(`
      .radar-axis-line { stroke: #e0e0e0; stroke-width: 1px; transition: opacity 0.5s; }
      .radar-label { font-size: 11px; fill: #555; font-family: 'Open Sans', sans-serif; opacity: 0; pointer-events: none; text-shadow: 0 1px 2px #fff; }

      .category-path { cursor: pointer; transition: opacity 0.3s; stroke: #fff; stroke-width: 1px; }
      .category-path:hover { opacity: 0.8; }

      .category-text {
        font-family: 'Open Sans', sans-serif;
        pointer-events: none;
        font-weight: bold;
        font-size: 14px;
        fill: #000;
      }

      /* Radar Transitions */
      .radar-blob {
        transition: stroke 0.5s, stroke-width 0.5s;
        stroke-linejoin: round;
        fill: none;
      }

      .guide-circle { fill: none; stroke: #ddd; stroke-dasharray: 4,4; pointer-events: none; }
      .back-hint { font-family: sans-serif; }
    `);

    this.activeCategory = null;

    // Resize Observer for responsive redrawing
    this._resizeObserver = new ResizeObserver(() => {
      // Trigger update if data exists (this relies on Looker calling updateAsync,
      // but we store the last arguments to force a redraw if needed, or rely on flexbox SVG)
      // Since SVG is 100% width/height, D3 update is usually needed to recalculate scales.
      // For simplicity in this pattern, we assume Looker handles the heavy lifting,
      // but if we stored _lastArgs we could call this.updateAsync(...this._lastArgs).
    });
    this._resizeObserver.observe(element);
  },

  // --- UPDATE ---
  updateAsync: function(data, element, config, queryResponse, details, done) {
    // 1. Dependency Check
    if (typeof d3 === "undefined") {
      console.log("[Viz] Waiting for D3...");
      setTimeout(() => this.updateAsync(data, element, config, queryResponse, details, done), 100);
      return;
    }

    this.clearErrors();

    // 2. Print Mode Detection
    const isPrint = details && details.print;
    // PDF Fix: Force height if collapsed
    if (element.clientHeight === 0) {
      element.style.height = "500px";
    }

    // 3. Data Validation
    if (!queryResponse.fields.pivots || queryResponse.fields.pivots.length < 2) {
      this.addError({
        title: "Configuration Error",
        message: "This chart requires 2 pivots (e.g., State > City)."
      });
      return;
    }
    if (data.length === 0) return;

    // 4. Data Processing
    const row = data[0];
    const pivotFields = queryResponse.fields.pivots;
    const measureName = queryResponse.fields.measures[0].name;
    const rawPivots = queryResponse.pivots;

    // Palette Selection
    let colorScale;
    if (config.color_scheme === 'pastel') {
      colorScale = d3.scaleOrdinal(d3.schemePastel1);
    } else if (config.color_scheme === 'cool') {
      colorScale = d3.scaleOrdinal(d3.schemeBlues[9]);
    } else {
      colorScale = d3.scaleOrdinal(d3.schemeSet2);
    }

    let processedAxes = [];
    let categoryMap = {};

    // Flatten Pivot Data
    rawPivots.forEach((pivot) => {
      const outerVal = pivot.data[pivotFields[0].name]; // Outer Ring (Category)
      const innerVal = pivot.data[pivotFields[1].name]; // Radar Axes
      const cell = row[measureName][pivot.key];

      const value = cell.value !== null ? cell.value : 0;
      const rendered = cell.rendered || value;

      if (!categoryMap[outerVal]) {
        categoryMap[outerVal] = {
          id: outerVal,
          name: outerVal,
          count: 0,
          color: colorScale(outerVal)
        };
      }
      categoryMap[outerVal].count++;

      processedAxes.push({
        id: pivot.key,
        label: innerVal,
        catId: outerVal,
        value: value,
        rendered: rendered
      });
    });

    const categories = Object.values(categoryMap);

    // Dimensions
    const width = element.clientWidth;
    const height = element.clientHeight;

    const margin = 80;
    const maxRadius = Math.min(width, height) / 2 - margin;

    const radarRadius = maxRadius * 0.8;
    const ringInner = maxRadius * 0.85;
    const ringOuter = maxRadius;

    this.mainGroup.attr("transform", `translate(${width/2}, ${height/2})`);
    this.bgCircle.attr("r", maxRadius + margin);

    const maxValue = d3.max(processedAxes, d => d.value) * 1.1 || 10;
    const rScale = d3.scaleLinear().range([0, radarRadius]).domain([0, maxValue]);

    // Helper to Calculate Angles
    const getAngles = (activeCat) => {
      const activeAxes = (activeCat === null)
        ? processedAxes
        : processedAxes.filter(d => d.catId === activeCat);

      const count = activeAxes.length;
      if (count === 0) return { angleMap: {}, activeAxes: [] };

      const slice = (2 * Math.PI) / count;
      let angleMap = {};

      activeAxes.forEach((d, i) => {
        angleMap[d.id] = i * slice - Math.PI / 2;
      });

      // Map inactive axes to default position
      processedAxes.forEach(d => {
        if (angleMap[d.id] === undefined) angleMap[d.id] = -Math.PI / 2;
      });

      return { angleMap, activeAxes };
    };

    // --- MAIN RENDER FUNCTION ---
    const render = () => {
      const { angleMap } = getAngles(this.activeCategory);

      // Disable animation for Print/PDF
      const duration = isPrint ? 0 : 1000;
      const t = d3.transition().duration(duration).ease(d3.easeCubicOut);

      // 1. Guide Circles (Levels)
      const levels = [0.25, 0.5, 0.75, 1];
      const guides = this.mainGroup.selectAll(".guide-circle")
        .data(this.activeCategory === null ? levels : []);

      guides.join(
        enter => enter.append("circle").attr("class", "guide-circle").attr("r", 0).call(e => e.transition(t).attr("r", d => radarRadius * d)),
        update => update.call(u => u.transition(t).attr("r", d => radarRadius * d).style("opacity", 1)),
        exit => exit.call(x => x.transition(t).attr("r", 0).style("opacity", 0).remove())
      );

      // 2. Axis Lines
      const axes = this.mainGroup.selectAll(".radar-axis-line")
        .data(processedAxes, d => d.id);

      axes.join(
        enter => enter.append("line")
          .attr("class", "radar-axis-line")
          .style("opacity", 0),
        update => update.transition(t)
          .style("opacity", d => (this.activeCategory === null || d.catId === this.activeCategory) ? 1 : 0)
          .attr("x1", 0).attr("y1", 0)
          .attr("x2", d => {
            if (this.activeCategory !== null && d.catId !== this.activeCategory) return 0;
            return rScale(maxValue) * Math.cos(angleMap[d.id]);
          })
          .attr("y2", d => {
            if (this.activeCategory !== null && d.catId !== this.activeCategory) return 0;
            return rScale(maxValue) * Math.sin(angleMap[d.id]);
          }),
        exit => exit.remove()
      );

      // 3. Radar Path (Blob)
      const lineGenerator = d3.lineRadial()
        .curve(d3.curveLinearClosed)
        .radius(d => rScale(d.value))
        .angle(d => angleMap[d.id] + Math.PI / 2);

      const pathData = (this.activeCategory === null)
        ? processedAxes
        : processedAxes.filter(d => d.catId === this.activeCategory);

      const radarPath = this.mainGroup.selectAll(".radar-blob")
        .data([pathData]);

      radarPath.join(
        enter => enter.append("path")
          .attr("class", "radar-blob")
          .attr("d", lineGenerator)
          .style("fill", "none")
          .style("stroke", config.radar_color)
          .style("stroke-width", config.radar_width || 3)
          .style("stroke-opacity", 0)
          .call(e => e.transition(t).style("stroke-opacity", config.radar_opacity)),
        update => update.transition(t)
          .attr("d", lineGenerator)
          .style("stroke", config.radar_color)
          .style("stroke-width", config.radar_width || 3)
          .style("stroke-opacity", config.radar_opacity),
        exit => exit.remove()
      );

      // 4. Labels
      const labels = this.mainGroup.selectAll(".radar-label")
        .data(processedAxes, d => d.id);

      labels.join(
        enter => enter.append("text").attr("class", "radar-label").style("opacity", 0),
        update => update.transition(t)
          .attr("x", d => (rScale(maxValue) + 15) * Math.cos(angleMap[d.id]))
          .attr("y", d => (rScale(maxValue) + 15) * Math.sin(angleMap[d.id]))
          .style("opacity", d => (this.activeCategory !== null && d.catId === this.activeCategory) ? 1 : 0)
          .attr("text-anchor", d => {
             const deg = (angleMap[d.id] * 180 / Math.PI) % 360;
             if (deg > 90 || deg < -90) return "end";
             return "start";
          })
          .text(d => `${d.label}: ${d.rendered}`),
        exit => exit.remove()
      );

      // 5. Category Ring (Pie Chart)
      const pie = d3.pie().value(d => d.count).sort(null).padAngle(0.02);
      const arc = d3.arc().innerRadius(ringInner).outerRadius(ringOuter).cornerRadius(4);
      const labelArc = d3.arc().innerRadius(ringOuter + 15).outerRadius(ringOuter + 15);
      const pieData = pie(categories);

      const ringGroup = this.mainGroup.selectAll(".ring-group").data([0]);
      ringGroup.enter().append("g").attr("class", "ring-group");

      const targetOpacity = this.activeCategory === null ? 1 : 0;
      const targetScale = this.activeCategory === null ? 1 : 1.3;

      this.mainGroup.select(".ring-group")
        .transition(t)
        .style("opacity", targetOpacity)
        .attr("transform", `scale(${targetScale})`);

      this.mainGroup.select(".ring-group").selectAll("path")
        .data(pieData, d => d.data.id)
        .join(
          enter => enter.append("path")
            .attr("class", "category-path")
            .attr("d", arc)
            .attr("fill", d => d.data.color)
            .each(function(d) { this._current = d; }),
          update => update
            .attr("fill", d => d.data.color)
            .transition(t)
            .attrTween("d", function(d) {
              const i = d3.interpolate(this._current, d);
              this._current = i(0);
              return t => arc(i(t));
            })
        );

      // 6. Category Text (Labels on Ring)
      this.mainGroup.select(".ring-group").selectAll("text")
        .data(pieData, d => d.data.id)
        .join(
          enter => enter.append("text")
            .attr("class", "category-text")
            .attr("transform", d => `translate(${labelArc.centroid(d)})`)
            .attr("dy", "0.35em")
            .attr("text-anchor", "middle")
            .text(d => d.data.name)
            .style("opacity", 0)
            .call(e => e.transition(t).style("opacity", 1)),
          update => update
            .style("opacity", 1)
            .transition(t)
            .attr("transform", d => `translate(${labelArc.centroid(d)})`)
            .text(d => d.data.name)
        );

      // 7. Event Listeners
      // Click Category Arc
      this.mainGroup.select(".ring-group").selectAll("path")
        .on("click", (e, d) => {
          e.stopPropagation();
          this.activeCategory = d.data.id;
          render();
        });

      // Click Background to Reset
      this.bgCircle.on("click", () => {
        if (this.activeCategory !== null) {
          this.activeCategory = null;
          render();
        }
      });

      // 8. "Back" Hint Text
      const backText = this.mainGroup.selectAll(".back-hint").data(this.activeCategory !== null ? [1] : []);
      backText.join(
        enter => enter.append("text")
          .attr("class", "back-hint")
          .attr("y", height/2 - 20)
          .attr("text-anchor", "middle")
          .text("Click center to return")
          .style("font-size", "10px")
          .style("fill", "#999")
          .style("opacity", 0)
          .call(e => e.transition(t).delay(isPrint ? 0 : 500).style("opacity", 1)),
        update => update,
        exit => exit.remove()
      );
    };

    // Initial Render
    render();

    // PDF Fix: Wait slightly before calling done() if printing to allow styles to settle
    if (isPrint) {
      setTimeout(() => done(), 500);
    } else {
      done();
    }
  }
});

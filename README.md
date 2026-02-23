![Project_Picasso_banner](./99_ASSETS/Project_Picasso_Edited_banner.png)

# Introduction

**The objective of this repository is to provide the combined Javascript code of custom visualizations** to improve Looker's 40-visual native portfolio/ marketplace.

For context, the end goal is to enable any Looker customers to benefit from most of **the visual capabilities of Studio/ PowerBI/ Tableau or any other BI providers directly within Looker** by leveraging its extensive API endpoints (more info [here](https://github.com/looker-open-source/custom_visualizations_v2/blob/master/docs/api_reference.md)) with a list of production ready visualizations which can be imported within a few clicks!! 💎  

In terms of process used, a detailed guide can be found in our community platform [here](https://discuss.google.dev/t/create-a-custom-visualization-without-development-skills-using-generative-ai/163652).  
Note: A known limitation of the Custom Visualization API is that cross-filtering and drill fields cannot be enabled simultaneously; you must choose a single primary click interaction mode.  

**You have a visualization request?**  
[Fill this form](https://forms.gle/5XfUnQsxpyVnBbBo8) to let the Google team know if you have a **true need for a visual you can't find** in this repository or in our Looker native portfolio/marketplace.

---

# Set Up
**5min required** to import 20+ production grade custom visualizations 🎁    

**One-line step by step:** Copy paste CDN Link in your Admin/ Visualization page OR Fork this repo → Connect to Looker via Git → Disable some visuals as needed on `manifest.lkml` → Deploy  

**Detailed step by step:**  
**_ To get a specific visual quickly**, simply **copy paste the CDN Links** of your chosen visuals (list [here](#01-studio-visuals)) to your Looker's "Admin"/ "Visualization" page.  

**_ To import and fully own the visualization set up,** 
1. **Fork or Clone the Repository**
   - Fork [this repository](https://github.com/FPFletcher/looker-custom-visualizations-picasso-project) to your GitHub account, OR clone it directly:
```bash
     git clone https://github.com/FPFletcher/looker-custom-visualizations-picasso-project.git
```

2. **Configure Git in Looker**
   - Click path in Looker: **Develop** → **Projects** → **New Model** → create a **BLANK Project** → **Configure Git** → Import this Git repo using one of the methods below

   > <details>
   > <summary>🔐 Using SSH <i>(Recommended)</i></summary>
   > <br>
   > 
   > - Generate SSH key in Looker: **Admin** → **Git** → **Configure Git** → Copy public key
   > - Add to GitHub: Your repo → **Settings** → **Deploy keys** → **Add deploy key** → Paste key
   > - Import in Looker using SSH URL:
   > 
   > ```
   > git@github.com:YOUR-USERNAME/looker-custom-visualizations-picasso-project.git
   > ```
   > 
   > </details>
   
   > <details>
   > <summary>🔗 Using HTTPS</summary>
   > <br>
   > 
   > - Use HTTPS URL when importing:
   > 
   > ```
   > https://github.com/YOUR-USERNAME/looker-custom-visualizations-picasso-project.git
   > ```
   > 
   > - For private repos, configure a GitHub Personal Access Token.
   > 
   > </details>

3. **Configure `manifest.lkml`**
   - Edit the manifest to **disable visualizations as needed** by commenting them out using `#` (shortcut: `Ctrl + /`)

4. **Network Requirements** *(Optional)*
   > <details>
   > <summary>⚠️ Only a few visualizations have external dependencies which may require <b>external libraries to be whitelisted</b> <i>(private IP, self-hosted, and restricted environments)</i></summary>
   > <br>
   > 
   > | Visualization | Domain to Whitelist |
   > |--------------|---------------------|
   > | Bar Chart (Conditional) | `code.highcharts.com` |
   > 
   > - If needed, contact your network team to whitelist these domains before deploying.
   > 
   > </details>

5. **Deploy and Use**
   - Commit changes in Looker's IDE and deploy to production
   - Access visualizations via the visualization picker (chart icon) in any Explore or Dashboard
   
---

# 01. STUDIO Visuals

## Treemap
![STUDIO Treemap visualization](./99_ASSETS/STUDIO_treemap.gif)

**🔗 CDN Link -** https://viz.mentoree.eu/treemap.js  

**📊 What it does**  
Hierarchical visualization that displays nested data as proportionally-sized rectangles. Supports multi-level drill-down navigation through dimension hierarchies with automatic grouping of small values into an "Others" category.

<details>
<summary><b>✨ Unique value</b></summary>
<br>
<ul>
<li><b>Native LookML drill fields integration</b> - seamlessly opens Looker's drill menu at the last hierarchy level (works independently from drill-down navigation)</li>
<li><b>Intelligent "Others" grouping</b> with configurable threshold to reduce clutter</li>
<li><b>Multi-level drill-down</b> through dimension hierarchies with breadcrumb navigation</li>
<li><b>Gap-free layout algorithm</b> ensures no wasted space in the visualization</li>
<li><b>Flexible color schemes</b> with gradient or categorical coloring options</li>
<li><b>Smart label positioning</b> with automatic text wrapping and truncation</li>
<li><b>No external dependencies</b> - works on all Looker deployments</li>
</ul>
</details>

<details>
<summary>ℹ️ <b>How to use</b></summary>
<br>
<ul>
<li><b>Data Requirement:</b> Select exactly <b>1 Dimension</b> and <b>1 Measure</b> for a standard flat treemap.</li>
<li><b>Nested Layout:</b> To activate the "Nested" (Header) layout, you must select <b>2 Dimensions</b> (Parent and Child) and enable the "Nested Layout" toggle in the Plot tab.</li>
<li><b>Drill Down:</b> By default, clicking a square drills down into the hierarchy. To see LookML drill menus instead, disable "Enable Drill Down" in the Plot tab.</li>
<li><b>Others Grouping:</b> Use the "Others Threshold %" setting to automatically group small values (e.g., < 0.5%) into a single grey box to clean up the visual.</li>
</ul>
<br>
<a href="https://www.youtube.com/watch?v=8r_i01BnbcI&list=PLIivdWyY5sqJGSfzlhevENIvtK0DJpzzn" target="_blank"><img src="http://img.youtube.com/vi/8r_i01BnbcI/0.jpg" alt="Watch the demo" width="480" height="360" border="10" /></a>
</details>

---

## Bar Chart (Conditional Formatting)
![STUDIO Bar Chart _Conditional_visualization](./99_ASSETS/STUDIO_bar_chart_conditional.gif)

**🔗 CDN Link -** https://viz.mentoree.eu/bar_chart_conditional.js  

**📊 What it does**  
Enhanced column/bar chart with advanced conditional formatting capabilities. Supports multiple chart types (column, bar, area, line) with comprehensive formatting rules and reference/trend lines.

<details>
<summary><b>✨ Unique value</b></summary>
<br>
<ul>
<li><b>3 levels of conditional formatting rules</b> (Rule 1, 2, 3) with priority-based application</li>
<li><b>7 rule types available:</b> Greater Than, Less Than, Equal To, Between, Top N, Bottom N, and Color Gradient</li>
<li><b>Stacked measures support</b> for conditional formatting and trend calculations</li>
<li><b>Native LookML drill fields</b> on all data points</li>
<li><b>Dual reference systems:</b> Reference lines (custom/average/median/min/max) and trend lines (linear/moving average)</li>
<li><b>Customizable trend line titles</b> with smart positioning that adapts to chart orientation</li>
<li><b>Advanced stacking modes:</b> Grouped, Stacked, and Stacked Percentage</li>
<li><b>Total labels for stacked charts</b> with customizable styling</li>
<li><b>Professional color palettes</b> including Google, Looker Classic, Viridis, and custom options</li>
<li><b>⚠️ External dependency:</b> Requires <code>code.highcharts.com</code> domain access</li>
</ul>
</details>

<details>
<summary>ℹ️ <b>How to use</b></summary>
<br>
<ul>
<li><b>Specific Column Targeting:</b> When configuring "Cell Bars", "Data Chips", or "Comparison Fields", you must use the full <code>view_name.field_name</code> syntax (e.g., <code>orders.count</code>) or the column header name if renamed.</li>
<li><b>Hierarchies:</b> Enable "BO-Style Hierarchy" in the "Plot" tab. Enter your dimensions in the "Hierarchy Levels" input (comma-separated, e.g., <code>brand, category</code>) to create expandable tree rows.</li>
<li><b>Subtotals:</b> For subtotals to appear, you must have the "Subtotals" checkbox enabled in the native Looker Data bar <b>AND</b> enable "Standard Subtotals" in the viz options.</li>
<li><b>Comparison Mode:</b> To enable Period-over-Period (PoP) arrows, select "Comparison Mode" in the Series tab and define the "Period Offset" (usually -1 for the previous column).</li>
</ul>
<br>
<a href="https://www.youtube.com/watch?v=gNAgwwcTfhE" target="_blank">
 <img src="https://img.youtube.com/vi/gNAgwwcTfhE/maxresdefault.jpg" alt="Watch the demo video" width="480" height="360" border="10" />
</a>
</details>

---

## Scorecard with Sparkline
![STUDIO Scorecard visualization](./99_ASSETS/STUDIO_scorecard.gif)

**🔗 CDN Link -** coming soon

**📊 What it does**  
Displays a primary metric with a secondary comparison value, percentage variance, and an inline sparkline trend chart. Perfect for executive dashboards and KPI monitoring.

<details>
<summary><b>✨ Unique value</b></summary>
<br>
<ul>
<li><b>Accurate sparkline rendering</b> with proper time-series visualization</li>
<li><b>Customizable metric positioning</b> for flexible dashboard layouts</li>
<li><b>Dual-measure comparison</b> with automatic percentage calculation</li>
<li><b>Visual variance indicators</b> with color-coded positive/negative changes</li>
<li><b>Compact design</b> that fits more KPIs per dashboard tile</li>
<li><b>No external dependencies</b> - works on all Looker deployments</li>
</ul>
</details>

<details>
<summary>ℹ️ <b>How to use</b></summary>
<br>
<ul>
<li><b>Data Requirement:</b> Requires 1 Dimension (Time) and at least 2 Measures (Current Period, Previous Period).</li>
<li><b>Calculation:</b> The variance percentage is automatically calculated as <code>(Measure 1 - Measure 2) / Measure 2</code>.</li>
<li><b>Sparkline:</b> The sparkline automatically renders using the time dimension on the X-axis. Ensure your results are sorted chronologically.</li>
<li><b>Layout:</b> Use the "Plot" tab to align the KPI left, center, or right depending on your dashboard tile structure.</li>
</ul>
<br>
<a href="https://www.youtube.com/watch?v=8r_i01BnbcI&list=PLIivdWyY5sqJGSfzlhevENIvtK0DJpzzn" target="_blank"><img src="http://img.youtube.com/vi/8r_i01BnbcI/0.jpg" alt="Watch the demo" width="480" height="360" border="10" /></a>
</details>

---

# 04. OTHER Visuals

## Advanced Modern Table
![Advanced Table visualization](./99_ASSETS/OTHER_table_modern_viz.gif)

**🔗 CDN Link -** https://viz.mentoree.eu/table_modern_viz.js

**📊 What it does**
Enterprise-grade data grid designed for advanced reporting within Looker, supporting complex row hierarchies, nested subtotals, and in-cell visual analytics to make dense datasets readable at a glance.

<details>
<summary><b>✨ Unique value</b></summary>
<br>
<ul>
<li><b>Multi-Level Row Hierarchy</b> - Supports a tree-grouping similar to SAP BO with expandable and collapsible sections for deep navigation and ANY subtotal aggregations</li>
<li><b>In-Cell Visual Analytics</b> - Embed customizable bar charts or heatmaps directly within cells to highlight performance distribution instantly</li>
<li><b>Smart Period-over-Period</b> - Built-in comparison logic with automatic color-coded trend arrows and percentage delta calculations</li>
<li><b>Advanced Frozen Column Logic</b> - Sticky first-column and header-row support that maintains background colors and striping during horizontal scrolls</li>
<li><b>Column Grouping</b> - Define custom "Master Headers" to group multiple measures or dimensions under a shared category title</li>
<li><b>Semantic Data Chips</b> - Transform status text into colorful "pills" based on custom match rules like "Success", "Warning", or "Failed"</li>
<li><b>Dynamic Pagination</b> - High-speed client-side pagination that intelligently respects subtotal groupings and hierarchies to prevent data fragmentation</li>
<li><b>Pro Theme Library</b> - Includes pre-built themes for Google, Looker, and Dark Mode for instant brand alignment without manual CSS</li>
<li><b>Native Integration</b> - Full support for Looker drill menus, custom field formatting, and pivot row or grand totals</li>
<li><b>No external dependencies</b> - works on all Looker deployments</li>
</ul>
</details>

<details>
<summary>ℹ️ <b>How to use</b></summary>
<br>
<ul>
<li><b>Specific Column Targeting:</b> When configuring "Cell Bars", "Data Chips", or "Comparison Fields", you must use the full <code>view_name.field_name</code> syntax (e.g., <code>orders.count</code>) or the column header name if renamed.</li>
<li><b>Hierarchies:</b> Enable "BO-Style Hierarchy" in the "Plot" tab. Enter your dimensions in the "Hierarchy Levels" input (comma-separated, e.g., <code>brand, category</code>) to create expandable tree rows.</li>
<li><b>Subtotals:</b> For subtotals to appear, you must have the "Subtotals" checkbox enabled in the native Looker Data bar <b>AND</b> enable "Standard Subtotals" in the viz options.</li>
<li><b>Comparison Mode:</b> To enable Period-over-Period (PoP) arrows, select "Comparison Mode" in the Series tab and define the "Period Offset" (usually -1 for the previous column).</li>
</ul>
<br>
<a href="https://www.youtube.com/watch?v=8r_i01BnbcI&list=PLIivdWyY5sqJGSfzlhevENIvtK0DJpzzn" target="_blank"><img src="http://img.youtube.com/vi/8r_i01BnbcI/0.jpg" alt="Watch the demo" width="480" height="360" border="10" /></a>
</details>

---

## 3D Combo Map
![3D Combo Map visualization](./99_ASSETS/OTHER_map_combo_3d_mapbox.gif)

**🔗 CDN Link -** https://viz.mentoree.eu/map_combo_3d_mapbox.js

**📊 What it does**
High-performance geospatial visualization that enables multi-layered 3D storytelling by allowing users to overlay up to four independent data layers—such as 3D columns, choropleths, and heatmaps—on a single interactive map. 

<details>
<summary><b>✨ Unique value</b></summary>
<br>
<ul>
<li><b>Dynamic Layer Configuration</b> - Access multiple prebuilt region maps (US, EU, UK) or input a custom GeoJSON URL directly in the UI settings without needing LookML updates</li>
<li><b>4-Layer Compositing</b> - Mix and match different visualization types, such as a Heatmap under 3D Columns, within a single view</li>
<li><b>Intelligent 3D Extrusion</b> - Automatically scales column or region height based on measure values for instant density analysis</li>
<li><b>Hybrid Printing Logic</b> - Features a static map fallback to capture high-resolution imagery for PDF reports while remaining interactive in-browser</li>
<li><b>Preloaded GeoJSON Library</b> - Built-in support for US States, World Countries, and major European regions with custom URL support</li>
<li><b>Professional Icon Suite</b> - Over 20 built-in presets (factories, trucks, oil rigs) with support for custom image URLs and billboard controls</li>
<li><b>Pivot-Aware Tooltips</b> - Dynamically generates detailed breakdowns of pivoted data and "total" summaries directly in the hover-state</li>
<li><b>Interactive Drill Menus</b> - Full support for native Looker drill links across all layer types and pivot values</li>
<li><b>⚠️ External dependency:</b> Requires <code>api.mapbox.com</code> and <code>unpkg.com</code> domain access</li>
</ul>
</details>

<details>
<summary>ℹ️ <b>How to use</b></summary>
<br>
<ul>
<li><b>Mapbox Token:</b> This visual <b>requires</b> a valid Mapbox public token entered in the "Plot" tab to render the base map tiles.</li>
<li><b>Layer Configuration:</b> You can configure up to 4 layers. Use "Layer 1 Type", "Layer 2 Type", etc., to define if data should appear as 3D Columns, Choropleths (Regions), or Icons.</li>
<li><b>Data Mapping:</b> In the "Layer N Dimension Indices" field, enter the <b>index number</b> of the dimension you want to use (e.g., <code>0</code> for the first dimension, <code>1</code> for the second). Do not use field names here.</li>
<li><b>Custom Regions:</b> To use a custom map, set "Region Map Source" to "Custom URL" and paste a direct link to a GeoJSON/TopoJSON file (e.g., hosted on GitHub raw or a public bucket).</li>
</ul>
<br>
<a href="https://www.youtube.com/watch?v=8r_i01BnbcI&list=PLIivdWyY5sqJGSfzlhevENIvtK0DJpzzn" target="_blank"><img src="http://img.youtube.com/vi/8r_i01BnbcI/0.jpg" alt="Watch the demo" width="480" height="360" border="10" /></a>
</details>

---

## Single Value with Picture
![OTHER Value with Picture visualization](./99_ASSETS/OTHER_single_value_picture.gif)

**🔗 CDN Link -** https://viz.mentoree.eu/single_value_picture.js  

**📊 What it does** Displays two key metrics overlaid on almost ANY customizable images you have access to and compare their variance.

<details>
<summary><b>✨ Unique value</b></summary>
<br>
<ul>
<li><b>Native LookML drill fields</b> on both primary and secondary values</li>
<li><b>Customizable background and drop images</b> via URL for complete brand alignment</li>
<li><b>Dual-metric display</b> with automatic or manual percentage calculation</li>
<li><b>Flexible positioning controls</b> for both drops with independent sizing</li>
<li><b>Image opacity controls</b> for layered visual effects</li>
<li><b>Non-clickable images</b> to prevent accidental navigation - only metrics are interactive</li>
<li><b>Responsive design</b> that scales beautifully across dashboard sizes</li>
<li><b>Multiple calculation modes:</b> Secondary/Primary ratio or use a third measure for percentages</li>
<li><b>No external dependencies</b> - works on all Looker deployments</li>
</ul>
</details>

<details>
<summary>ℹ️ <b>How to use</b></summary>
<br>
<ul>
<li><b>Measure Order:</b> This visual reads the <b>first measure</b> as the Primary Value (Big) and the <b>second measure</b> as the Secondary Value (Small).</li>
<li><b>Custom Images:</b> You can replace the default water drop images by pasting any public image URL into the "Primary/Secondary Image URL" fields in the Plot tab.</li>
<li><b>Percentage Logic:</b> By default, the percentage is calculated as <code>Secondary / Primary</code>. You can change this to "Use 3rd Measure" in the Formatting tab if you want to provide a pre-calculated LookML variance.</li>
<li><b>Positioning:</b> Use the X/Y coordinate sliders in the Plot tab to move the numbers and images to fit your specific background image layout.</li>
</ul>
<br>
<a href="https://www.youtube.com/watch?v=8r_i01BnbcI&list=PLIivdWyY5sqJGSfzlhevENIvtK0DJpzzn" target="_blank"><img src="http://img.youtube.com/vi/8r_i01BnbcI/0.jpg" alt="Watch the demo" width="480" height="360" border="10" /></a>
</details>

---

# Contributing

We welcome contributions! If you've built a custom visualization that could benefit the Looker community, please submit a pull request with:
- The `.js` file in the appropriate category folder
- A GIF demonstrating the visualization (add to `99_ASSETS/`)
- Documentation of unique features and configuration options
- Update to this README with your visualization details

**Have a visualization request?** [Fill this form](https://forms.gle/5XfUnQsxpyVnBbBo8) to let the Google team know if you have a **true need for a visual you can't find** in this repository or in our Looker native portfolio/marketplace.

---

# Support

**For questions, issues, or feature requests:**
- 🐛 [Open an issue](https://github.com/FPFletcher/looker-custom-visualizations-picasso-project/issues) on this GitHub repository
- 💬 Visit the [Looker Community](https://community.looker.com/)
- 📚 Check the [Custom Visualizations API documentation](https://github.com/looker-open-source/custom_visualizations_v2/blob/master/docs/api_reference.md)
- 📝 Review the [step-by-step guide](https://discuss.google.dev/t/create-a-custom-visualization-without-development-skills-using-generative-ai/163652) for creating custom visualizations

**Finding this project useful?** [Fill this form](https://forms.gle/RNjQvsHpTsp9pUn38) to let the Google team know **this project is particularly useful to you and your team** so we can gather more internal resources to work on it.

---

**Happy visualizing! 🎨**

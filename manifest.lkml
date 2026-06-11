project_name: "custom_viz_artefact_demo"


########################################################################################
# 01. STUDIO visuals
########################################################################################

visualization: {
  id: "scorecard_sparkline_viz"
  label: "Scorecard"
  file: "01_STUDIO_visuals/scorecard_sparkline.js"
}

visualization: {
  id: "treemap_studio_viz"
  label: "Treemap (Studio)"
  file: "01_STUDIO_visuals/treemap.js"
}

visualization: {
  id: "bar_chart_conditional_formatting_viz"
  label: "Bar Chart (Conditional formatting)"
  file: "01_STUDIO_visuals/bar_chart_conditional.js"
  # dependencies: [
  #"https://code.highcharts.com/highcharts.js"
  # ]
}


########################################################################################
# 04. OTHER visuals
########################################################################################

visualization: {
  id: "single_value_picture_background"
  label: "Single Value (Picture lookML version)"
  file: "04_OTHER_visuals/single_value_picture.js"
}

visualization: {
  id: "combo_map_3d"
  label: "Combo Map 3D (Mapbox)"
  file: "04_OTHER_visuals/map_combo_3d_mapbox.js"
  # dependencies: [
  #"https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.css",
  # "https://unpkg.com/deck.gl@latest/dist.min.js",
  # "https://api.mapbox.com/mapbox-gl-js/v2.15.0/mapbox-gl.js",
  # "https://unpkg.com/topojson-client@3"
  # ]
}

visualization: {
  id: "combo_map_3d_arcgis"
  label: "Combo Map 3D (ArcGIS)"
  file: "04_OTHER_visuals/map_combo_3d_arcgis.js"
}

# visualization: {
#   id: "url-embed-visual"
#   label: "URL embed"
#   file: "04_OTHER_visuals/url_embed.js"
# }

visualization: {
  id: "custom-advanced-cross-filter"
  label: "Advanced Cross Filtering"
  file: "04_OTHER_visuals/advanced_cross_filtering.js"
}

visualization: {
  id: "table_modern_viz"
  label: "Table Modern"
  file: "04_OTHER_visuals/table_modern_viz.js"
}

visualization: {
  id: "table_vis"
  label: "Test"
  file: "table-viz.js"
  # Define the visualization parameters
}

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


########################################################################################
# 10. APPLICATIONS Dashboard or AI focus
########################################################################################

application: dashboard_tabs {
  label: "Dashboard Tabs"
  url: "https://cdn.lkr.dev/apps/dashboard-tabs/latest/bundle.js"
  entitlements: {
    core_api_methods: [
      "me",
      "dashboard",
      "search_dashboards",
      "folder_dashboards",
      "board",
      "search_boards",
      "folder",
      "search_folders",
      "create_board",
      "create_board_section",
      "create_board_item",
      "create_content_favorite"
    ]
    navigation: yes
    use_embeds: yes
    use_iframes: yes
    new_window: yes
    use_form_submit: yes
  }
}

application: looker-extension-selo {
  label: "Selo Agentic App"

  # Use the deployed Cloud Run URL for testing
  url: "https://selo-extension-web-734857282249.europe-west1.run.app/bundle.js"

  entitlements: {
    local_storage: yes
    navigation: yes
    new_window: yes
    use_form_submit: yes
    use_embeds: yes
    new_window_external_urls: ["https://selo-extension-backend-pr4xpixpuq-ew.a.run.app/*"]
    # These are the methods the frontend can call on behalf of the user
    core_api_methods: [
      "me",
      "session",
      "all_lookml_models",
      "query",
      "lookml_model_explore",
      "run_query",
      "create_query",
      "create_sql_query",
      "run_sql_query",
      "query_for_slug",
      "search_dashboards",
      "create_dashboard_element",
      "connection",
      "dashboard",
      "all_connections",
      "artifact",
      "update_artifacts"
    ]

    # CRITICAL: Add your backend URL here so the extension can talk to it
    external_api_urls: [
      # 1. Backend API URL (Hash style)
      # Used by the frontend to send chat requests and fetch data.
      "https://selo-extension-backend-pr4xpixpuq-ew.a.run.app",

      # 2. Frontend Web URL
      # Where the extension assets (bundle.js) and static files (logos) are hosted.
      "https://selo-extension-web-734857282249.europe-west1.run.app",

      # 3. Backend API URL (New Project Number style)
      # Alternative URL for the same backend service. The app attempted to use this to reach /api/chat.
      "https://selo-extension-backend-734857282249.europe-west1.run.app"
    ]
  }
}

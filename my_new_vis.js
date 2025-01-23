looker.plugins.visualizations.add({
  // Required: Called once when the visualization is initialized
  create: function (element, config) {
    // Add a container for the visualization
    this.container = element.appendChild(document.createElement("div"));
    this.container.className = "custom-vis";
  },

  // Required: Called whenever the visualization is updated (data or settings change)
  updateAsync: function (data, element, config, queryResponse, details, doneRendering) {
    // Clear any errors from previous render
    this.clearErrors();

    // Validate that the visualization has the required data structure
    if (queryResponse.fields.dimensions.length === 0) {
      this.addError({
        title: "No Dimensions Found",
        message: "This visualization requires at least one dimension.",
      });
      doneRendering();
      return;
    }

    // Retrieve the first dimension's name
    const dimension = queryResponse.fields.dimensions[0].name;

    // Generate HTML content from the data
    let html = `<table>`;
    data.forEach((row) => {
      const cell = row[dimension];
      html += `<tr><td>${LookerCharts.Utils.htmlForCell(cell)}</td></tr>`;
    });
    html += `</table>`;

    // Update the container with the new content
    this.container.innerHTML = html;

    // Notify Looker that rendering is complete
    doneRendering();
  },

  // Optional: Configuration options exposed in the UI
  options: {
    color: {
      type: "string",
      label: "Text Color",
      display: "color",
      default: "#000000",
    },
    font_size: {
      type: "number",
      label: "Font Size",
      default: 12,
      display: "range",
      min: 8,
      max: 48,
    },
  },

  // Optional: Dynamically register additional options (Looker 5.24+)
  registerOptions: function (queryResponse) {
    const options = {};
    queryResponse.fields.measure_like.forEach((field) => {
      options[`color_${field.name}`] = {
        label: `${field.label_short} Color`,
        default: "#FF0000",
        section: "Style",
        type: "string",
        display: "color",
      };
    });
    this.trigger("registerOptions", options);
  },
});

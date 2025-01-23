looker.plugins.visualizations.add({
  id: "single-value-with-trend",
  label: "Single Value with Trend",
  options: {
    primary_color: {
      type: "string",
      label: "Primary Color",
      default: "#007bff",
    },
    trend_color: {
      type: "string",
      label: "Trend Line Color",
      default: "#d3d3d3",
    },
  },
  create: function (element, config) {
    element.innerHTML = `
      <div id="chart-container" style="display: flex; flex-direction: column; align-items: center; width: 100%; height: 100%;">
        <div id="single-value" style="font-size: 48px; font-weight: bold; margin-bottom: 10px;"></div>
        <canvas id="trend-chart" style="width: 100%; height: 70%;"></canvas>
      </div>
    `;
  },
  updateAsync: function (data, element, config, queryResponse, details, done) {
    if (!queryResponse.fields.dimensions.length || !queryResponse.fields.measures.length) {
      this.addError({ title: "Missing Data", message: "This visualization requires a dimension and a measure." });
      return;
    }

    const dimension = queryResponse.fields.dimensions[0];
    const measure = queryResponse.fields.measures[0];

    // Extract data
    const labels = data.map((row) => row[dimension.name].value);
    const values = data.map((row) => row[measure.name].value);

    // Set single value
    const singleValueElement = element.querySelector("#single-value");
    const latestValue = values[values.length - 1] || 0;
    singleValueElement.innerText = `${latestValue}`;

    // Render trend chart
    const ctx = element.querySelector("#trend-chart").getContext("2d");
    if (this.chart) this.chart.destroy(); // Cleanup previous chart instance

    this.chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: measure.label_short || measure.label,
            data: values,
            fill: true,
            backgroundColor: config.trend_color + "33", // Slight transparency
            borderColor: config.primary_color,
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: {
            display: false, // Hide X-axis labels
          },
          y: {
            display: false, // Hide Y-axis labels
          },
        },
      },
    });

    done();
  },
});

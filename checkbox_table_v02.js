looker.plugins.visualizations.add({
    id: "custom_dynamic_table",
    label: "Custom Dynamic Table",
    options: {},
    create: function(element, config) {
      // Create a container for the table
      var container = element.appendChild(document.createElement("div"));
      container.className = "table-container";
      container.style.position = "relative";

      // Add basic styles
      var style = document.createElement("style");
      style.innerHTML = `
        .table-container table {
          width: 100%;
          border-collapse: collapse;
          font-family: Arial, sans-serif;
        }
        .table-container th {
          font-weight: bold;
          background-color: #f2f2f2;
          border-bottom: 2px solid #ddd;
          padding: 8px;
          text-align: left;
        }
        .table-container td {
          padding: 8px;
          border-bottom: 1px solid #ddd;
          vertical-align: top;
        }
        .table-container tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        .table-container tr:hover {
          background-color: #f1f1f1;
        }
        .table-container th, .table-container td {
          border-right: 1px solid #ddd;
        }
        .table-container th:last-child, .table-container td:last-child {
          border-right: none;
        }
        .table-button {
          position: absolute;
          top: 6px; /* Reduced padding */
          right: 10px;
          padding: 5px 10px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .table-button:hover {
          background-color: #0056b3;
        }
      `;
      document.head.appendChild(style);

      // Create and add the button
      var button = document.createElement("button");
      button.className = "table-button";
      button.innerText = "Button";
      container.appendChild(button);

      // Add button click event
      button.addEventListener("click", function() {
        alert("Button clicked!");
      });
    },
    update: function(data, element, config, queryResponse, details) {
      // Clear the container
      var container = element.querySelector(".table-container");
      container.innerHTML = "";

      // Re-add the button
      var button = document.createElement("button");
      button.className = "table-button";
      button.innerText = "Button";
      container.appendChild(button);

      // Add event listener to the button
      button.addEventListener("click", function() {
        var selectedValues = [];
        var checkboxes = container.querySelectorAll("tbody input[type='checkbox']");
        checkboxes.forEach(function(checkbox, index) {
          if (checkbox.checked) {
            var dim1Value = data[index][queryResponse.fields.dimension_like[0].name].value;
            selectedValues.push(dim1Value);
          }
        });
        console.log("Selected dim1 values:", selectedValues);

        var payload = JSON.stringify({ selected_dim1_values: selectedValues });
        console.log("Payload to be sent:", payload);

        // Replace 'YOUR_ENDPOINT_URL' with the actual endpoint URL
        fetch('YOUR_ENDPOINT_URL', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: payload
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      });

      // Get dimensions and measures
      var dimensions = queryResponse.fields.dimension_like;
      var measures = queryResponse.fields.measure_like;

      // Create table element
      var table = document.createElement("table");

      // Create table header
      var thead = document.createElement("thead");
      var headerRow = document.createElement("tr");

      // Add "Select All" checkbox column header
      var checkboxHeader = document.createElement("th");
      var selectAllCheckbox = document.createElement("input");
      selectAllCheckbox.type = "checkbox";
      checkboxHeader.appendChild(selectAllCheckbox);
      headerRow.appendChild(checkboxHeader);

      // Add dimension and measure headers
      dimensions.forEach(function(dim) {
        var th = document.createElement("th");
        th.innerText = dim.label_short || dim.label || dim.name;
        headerRow.appendChild(th);
      });

      measures.forEach(function(measure) {
        var th = document.createElement("th");
        th.innerText = measure.label_short || measure.label || measure.name;
        headerRow.appendChild(th);
      });

      thead.appendChild(headerRow);
      table.appendChild(thead);

      // Create table body
      var tbody = document.createElement("tbody");

      // Add data rows
      data.forEach(function(row) {
        var tr = document.createElement("tr");

        // Add checkbox cell
        var checkboxCell = document.createElement("td");
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkboxCell.appendChild(checkbox);
        tr.appendChild(checkboxCell);

        // Add dimension cells
        dimensions.forEach(function(dim) {
          var td = document.createElement("td");
          td.innerHTML = LookerCharts.Utils.htmlForCell(row[dim.name]);
          tr.appendChild(td);
        });

        // Add measure cells
        measures.forEach(function(measure) {
          var td = document.createElement("td");
          td.innerHTML = LookerCharts.Utils.htmlForCell(row[measure.name]);
          tr.appendChild(td);
        });

        tbody.appendChild(tr);
      });

      table.appendChild(tbody);
      container.appendChild(table);

      // Add event listener to "Select All" checkbox
      selectAllCheckbox.addEventListener("change", function() {
        var checkboxes = tbody.querySelectorAll("input[type='checkbox']");
        checkboxes.forEach(function(cb) {
          cb.checked = selectAllCheckbox.checked;
        });
      });
    }
  });

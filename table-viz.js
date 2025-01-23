looker.plugins.visualizations.add({
  id: "table_vis",
  label: "Table",
  options: {
  table_title: {
    type: “string”,
    label: “Table Title”,
    default: “My Table”
  }
}

  Create: function(element, config) {
  // Create a text element and append it to the element
  Var text = document.createElement(“p”);
  Text.textContent = “Hello, world!”;
  Element.appendChild(text);
}

updateAsync: function(data, element, config, queryResponse, details, done) {
  // Clear the element of any previous content
  Element.innerHTML = “”;

  // Create a table element and append it to the element
  Var table = document.createElement(“table”);
  Element.appendChild(table);

  // Create a table header and append it to the table element
  Var tableHeader = document.createElement(“thead”);
  Table.appendChild(tableHeader);

  // Loop through the queryResponse fields and create table header cells for each field
  queryResponse.fields.forEach(function(field) {
    // Create a table header cell and append it to the table header
    Var headerCell = document.createElement(“th”);
    tableHeader.appendChild(headerCell);

    // Set the text content of the header cell to the field label
    headerCell.textContent = field.label;
  });

  // Create a table body and append it to the table element
  Var tableBody = document.createElement(“tbody”);
  Table.appendChild(tableBody);

  // Loop through the data array and create table rows for each record
  Data.forEach(function(record) {
    // Create a table row and append it to the table body
    Var tableRow = document.createElement(“tr”);
    tableBody.appendChild(tableRow);

    // Loop through the queryResponse fields and create table cells for each field
    queryResponse.fields.forEach(function(field) {
      // Create a table cell and append it to the table row
      Var tableCell = document.createElement(“td”);
      tableRow.appendChild(tableCell);

      // Set the text content of the table cell to the corresponding value from the record
      tableCell.textContent = record[field.name].value;
    });
  });

  // Call the done function to indicate that the update is complete
  done();
}

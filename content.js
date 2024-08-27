// Function to parse the table and extract the data
function parseTable(table) {
  // Get the table by ID
  if (!table) {

      console.error("Table not found!");
      return;
  }

  // Initialize an array to store the extracted data
  const tableData = [];

  // Iterate over each row in the table body
  const rows = table.querySelectorAll("tbody tr");
  rows.forEach((row) => {
      // Extract data-id and other attributes from the row
      const rowData = {
        name: row.childNodes[0].innerText.trim(),
        department: row.childNodes[1].innerText.trim(),
        course_num: row.childNodes[2].innerText.trim(),
        crn: row.childNodes[5].innerText.trim(),
        term: row.childNodes[6].innerText.trim(),
        professor: row.childNodes[7].innerText.trim(),
        availability: row.childNodes[10].innerText.trim(),
    };

      // Push the extracted row data to the tableData array
      tableData.push(rowData);
  });

  // Log the extracted data
  console.log(tableData);

  // Return the table data array
  return tableData;
}

// Execute the function when the page has loaded
const sendDataToBackend = (data) => {
  fetch('https://availability-tracker-d2375f8d0b7f.herokuapp.com/store_data', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(responseData => console.log(responseData.message))
  .catch(error => console.error('Error:', error));
};


// Function to scrape the table data
function scrapeData() {
  // Adjust the selector to match the table on the page
  const tableElement = document.querySelector('#table1'); // Modify this selector as needed

  if (tableElement) {
      console.log("Table found!");
      // Use parseTable to get the table data
      const tableData = parseTable(tableElement);
      sendDataToBackend(tableData);
      // Observe changes in the table's child nodes
      const observer = new MutationObserver(() => {
        console.log("Table content changed, scraping again...");
        const updatedTableData = parseTable(tableElement);
        sendDataToBackend(updatedTableData);
      });

// Start observing the table for changes
observer.observe(tableElement, { childList: true, subtree: true });


      }

  else {
      console.log("Table not found, trying again in 30 seconds...");
      setTimeout(scrapeData, 15000); // Retry after 30 seconds
  }
}

// Wait for 45 seconds after the page has loaded before running the scrape function
window.addEventListener('load', () => {
  setTimeout(scrapeData, 30000);
});

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(scrapeData, 30000);
});

//run again after content in the page changes

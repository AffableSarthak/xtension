// // const TABLE_X_PATH =
// //   '//*[@id="app"]/div[2]/div[2]/div/div[2]/section[1]/div/div/table';

// const TABLE_X_PATH =
//   '//*[@id="app"]/div[2]/div[2]/div/div/section[1]/div/div/table';

// function getElementByXpath(path) {
//   return document.evaluate(
//     path,
//     document,
//     null,
//     XPathResult.FIRST_ORDERED_NODE_TYPE,
//     null
//   ).singleNodeValue;
// }

// // Function to extract table data
// function getTableData() {
//   console.log("CONTENT SCRIPT");
//   let table = getElementByXpath(TABLE_X_PATH);
//   console.log({ table });
//   if (table) {
//     // Sending table innerHTML; you might want to send a more structured data depending on your needs
//     // Initialize an empty array to hold the parsed data
//     const parsedData = [];

//     // Get the rows of the table body
//     console.log(table.getElementsByTagName("tbody"));
//     const rows = table
//       .getElementsByTagName("tbody")[0]
//       .getElementsByTagName("tr");

//     // Iterate over each row
//     for (let row of rows) {
//       // Initialize an object to hold the data of the current row
//       const rowData = {};

//       // Get all cells in the current row
//       const cells = row.getElementsByTagName("td");

//       // Assuming the structure of the table does not change and knowing the columns,
//       // map each cell to a property in the rowData object
//       rowData.product = cells[1].textContent.trim();
//       rowData.instrument = cells[2].textContent.trim();
//       rowData.quantity = cells[3].textContent.trim();
//       rowData.averagePrice = cells[4].textContent.trim();
//       rowData.lastPrice = cells[5].textContent.trim();
//       rowData.pnl = cells[6].textContent.trim();
//       rowData.changePercent = cells[7].textContent.trim();

//       // Add the current row's data to the parsedData array
//       parsedData.push(rowData);
//     }

//     console.log({ parsedData });
//     chrome.runtime.sendMessage({ data: parsedData });
//   }
// }

// // Set interval to execute every 1 second
// setInterval(getTableData, 1000);

// content.js
const addButton = () => {
  const titleElement = document.querySelector('h1[slot="title"]');
  const titleText = titleElement.textContent.trim();
  const srName = document.getElementsByClassName("subreddit-name")[0].innerText
  const permalink = window.location.href;
  
  const button = document.createElement('button');
  button.textContent = 'Bookmark Post';
  button.onclick = () => {
    chrome.runtime.sendMessage({
      type: 'bookmark',
      data: {
        title: titleText,
        subRedditName: srName,
        permalink: permalink
      }
    });
  };

  const container = document.querySelector('div[slot="credit-bar"]');
  container.appendChild(button);
};

addButton();
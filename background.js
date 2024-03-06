// chrome.runtime.onMessage.addListener(async function (
//     request,
//     sender,
//     sendResponse
//   ) {
//     // Here you would send the data to your server/database
//     fetch("https://straddle.abstractly.in/positions", {
//       // fetch("http://localhost:6969/positions", {
//       // Replace 'YOUR_API_ENDPOINT' with your actual API endpoint
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(request.data),
//       credentials: "include",
//     })
//       .then((response) => response.json())
//       .then((data) => console.log("Data sent successfully:", data))
//       .catch((error) => console.error("Error sending data:", error));
//   });

  chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
    chrome.storage.sync.set({ bookmarks: [] });
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'bookmark') {
      chrome.storage.sync.get(['bookmarks'], (result) => {
        const bookmarks = result.bookmarks || [];
        console.log(bookmarks)
        bookmarks.push(message.data);
        chrome.storage.sync.set({ bookmarks: bookmarks }, () => {
          console.log('Bookmark added');
        });
      });
    }
  });

document.addEventListener('DOMContentLoaded', () => {

  // Check if user is logged in
  const username = localStorage.getItem("username")

 // If username is set then keep the login form hidden, otherwise show the login form
  if (username === null) {
    console.log("no username is set")
    const loginFormEle = document.getElementById("loginForm")
    loginFormEle.style.display = "block"
  } else {
    const loginFormEle = document.getElementById("loginForm")
    loginFormEle.style.display = "none"
  }

  // Get the message from the content about the bookmarks
  chrome.storage.sync.get(['bookmarks'], (result) => {
    const bookmarks = result.bookmarks || [];
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))

    for (const bookmark of bookmarks) {
      const listContainer = document.getElementById("list-container")
      listContainer.classList.add("list-container")

      const list = document.createElement('ul')
      list.classList.add("ul-container")

      const listItem1 = document.createElement('li')
      const listItem2 = document.createElement('li')
      const listeItem3 = document.createElement('li')

      listItem1.textContent = bookmark.title
      listItem2.textContent = bookmark.permalink
      listeItem3.textContent = bookmark.subRedditName

      addClassName([listItem1, listItem2, listeItem3])
      list.append(listItem1, listItem2, listeItem3)
      listContainer.appendChild(list)
    }

  });

  document.getElementById("loginForm").addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(this);

    fetch("http://localhost:6969/xtension/login", {
      method: "POST",
      body: formData
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then(data => {
        // Handle response data here
        console.log(data);

        // Save the username  
        localStorage.setItem("username", data)


        // Login successful, hide the display form
        const loginFormEle = document.getElementById("loginForm")
        loginFormEle.style.display = "none"

      })
      .catch(error => {
        console.error("There was a problem with the fetch operation:", error);
        const messageElement = document.getElementById("message");
        messageElement.textContent = "An error occurred while processing your request.";
      });
  });
});

function addClassName(htmlEleArray) {
  htmlEleArray.map(item => {
    item.classList.add("bookmark-item")
  })
}
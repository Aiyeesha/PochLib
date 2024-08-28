// Import necessary functions from other files
import { bookList, displayBookList, saveToStorage } from "./application.js";
import { truncateText } from "./util.js";

// Function to add a book (click event listener on "Ajouter un livre" button)
export function addBook() {
  document.querySelector('.js-add-button').addEventListener('click', () => {
    displaySearchSection();
  });
}

// Function to display the search section with form and buttons
function displaySearchSection() {
  document.querySelector('.js-search-container').innerHTML = `
    <form>
      <label for="title" class="input-label">Titre du livre</label>
      <input type="text" id="title" name="title" class="js-title-input" placeholder="Renseignez le titre du livre">
      <label for="author" class="input-label">Auteur</label>
      <input type="text" id="author" name="author" class="js-author-input" placeholder="Renseignez l'auteur">
    </form>
    <div class="buttons-box">
      <button class="button--green js-search-button">Rechercher</button>
      <button class="button--red js-cancel-button">Annuler</button>
    </div>
    <span id="error-message"></span>`;

  // Call functions to handle search button and input keyup events
  cancelSearch();
  launchSearch();
}

// Function to handle functionalities related to the search button
function launchSearch() {
  document.querySelector('.js-search-button').addEventListener('click', () => {
    const titleInput = document.querySelector('.js-title-input').value;
    const authorInput = document.querySelector('.js-author-input').value;
    const errorMessage = document.getElementById('error-message');

    // Check if title and author are filled, display error message otherwise
    if (!titleInput || !authorInput) {
      errorMessage.textContent = "Merci de renseigner un titre et un auteur";
    } else {
      errorMessage.textContent = "";
      searchAPI();
    }
  });

  // Add event listener to all input fields to handle "Enter" key press
  document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keyup', (event) => {
      const titleInput = document.querySelector('.js-title-input').value;
      const authorInput = document.querySelector('.js-author-input').value;
      const errorMessage = document.getElementById('error-message');

      // Check if "Enter" key is pressed and handle search and error message
      if (event.key === 'Enter') {
        if (!titleInput || !authorInput) {
          errorMessage.textContent = "Merci de renseigner un titre et un auteur";
        } else {
          errorMessage.textContent = "";
          searchAPI();
        }
      }
    });
  });
}

// Function to handle functionalities related to the cancel button
function cancelSearch() {
  document.querySelector('.js-cancel-button').addEventListener('click', () => {
    hideSearchSection();
    addBook(); // Call addBook function to display the "Ajouter un livre" button again
    document.querySelector('.js-result-section').innerHTML = ''; // Clear search results
  });
}

// Function to hide the search section and display only the "Ajouter un livre" button
function hideSearchSection() {
  document.querySelector('.js-search-container').innerHTML = `
    <div class="buttons-box">
      <button class="button--green js-add-button">Ajouter un livre</button>
    </div>`;
}

// Async function to fetch book data from API based on search input
async function searchAPI() {
  document.querySelector('.js-result-section').innerHTML = `
  <h2 class="sub-title">Résultats de la recherche</h2>
  <div class="result-box-grid js-result-box-grid">
  </div>
  <hr>`;

  const title = document.querySelector('.js-title-input').value;
  const author = document.querySelector('.js-author-input').value;
  const url = 'https://www.googleapis.com/books/v1/volumes?q=' + title + author;

  const response = await fetch(url);
  const books = await response.json();

  displaySearch(books);
  checkExistingOrNewBook();
}

// Function to display search results
function displaySearch(books) {
  // Clear the previous search results container
  document.querySelector('.js-result-section').innerHTML = `
    <h2 class="sub-title">Résultats de la recherche</h2>
    <div class="result-box-grid js-result-box-grid">
    </div>
    <hr>`;

  // Check if books array exists and has items
  if (books.items && books.items.length > 0) {
    // Loop through each book in the search results
    books.items.forEach((book) => {
      // Set default values for description and image
      let bookDescription = 'Information manquante';
      let bookImage = 'images/unavailable.png';

      // Check if book description exists and truncate it if necessary
      if (book.volumeInfo.description) {
        bookDescription = truncateText(book.volumeInfo.description, 200);
      }

      // Check if book image exists and use the small thumbnail if available
      if (book.volumeInfo.imageLinks) {
        bookImage = book.volumeInfo.imageLinks.smallThumbnail;
      }

      // Extract book title, ID, and author
      let bookTitle = truncateText(book.volumeInfo.title, 100);
      let bookId = book.id;
      let bookAuthor = book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Auteur inconnu';

      // Check if book already exists in the book list
      const matchingBook = bookList.find(book => book.bookId === bookId);

      // Set bookmark type based on whether book exists in the list
      let bookmarkType = '';
      if (matchingBook) {
        bookmarkType = 'solid'; // Solid bookmark for existing books
      } else {
        bookmarkType = 'regular'; // Regular bookmark for new books
      }

      // Construct the HTML for each search result
      const newResult = `
        <div class="result-box js-result-box">
          <div id="${bookId}" class="js-bookmark"
              data-book-title="${bookTitle}"
              data-book-id="${bookId}"
              data-book-author="${bookAuthor}"
              data-book-description="${bookDescription}"
              data-book-image="${bookImage}">
            <i class="fa-${bookmarkType} fa-bookmark"></i>
          </div>
          <p class="box-title">Titre : ${bookTitle}</p>
          <p class="box-id">Id : ${bookId}</p>
          <p class="box-author">Auteur : ${bookAuthor}</p>
          <p class="box-description">Description : ${bookDescription}</p>
          <div class="cover">
            <img src="${bookImage}">
          </div>
        </div>`;

      // Add the new search result to the container
      document.querySelector('.js-result-box-grid').insertAdjacentHTML('beforeend', newResult);
    });
  } else {
    // Display message if no books were found
    document.querySelector('.js-result-section').innerHTML += `
      <p class="no-results-message">Aucun livre n’a été trouvé</p>`;
  }
}


// Function to handle adding new books or existing books to the book list
function checkExistingOrNewBook() {
  // Add event listener to all bookmark elements (representing books)
  document.querySelectorAll('.js-bookmark').forEach(item => {
    item.addEventListener('click', event => {
      // Find the matching book in the book list based on its ID from the dataset
      const matchingBook = bookList.find(book => book.bookId === item.dataset.bookId);

      // If book already exists, display an alert message
      if (matchingBook) {
        alert('Vous ne pouvez ajouter deux fois le même livre');
      } else {
        // If book is new, add it to the book list
        bookList.push({
          bookTitle: item.dataset.bookTitle,
          bookId: item.dataset.bookId,
          bookAuthor: item.dataset.bookAuthor,
          bookDescription: item.dataset.bookDescription,
          bookImage: item.dataset.bookImage
        });

        // Update the bookmark icon to solid (solid for existing books)
        item.innerHTML = `<i class="fa-solid fa-bookmark"></i>`;

        // Call function(s) to update the displayed book list and potentially save to storage
        displayBookList();
        console.log(bookList);
        saveToStorage();
      }
    });
  });
}

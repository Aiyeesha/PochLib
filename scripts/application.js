import { addBook } from "./search.js";
// Call the function to add a book
addBook();

// Initialize the book list and load books from storage
export let bookList = [];
loadFromStorage();

// Display the book list
export function displayBookList() {
  document.querySelector('.js-myBooklist-box').innerHTML = '';
  
  for (let i = 0; i < bookList.length; i++) {
    let myBookList = `
    <div class="result-box js-result-box">
      <div id="${bookList[i].bookId}" class="js-trash" data-book-id="${bookList[i].bookId}">
        <i class="fa-solid fa-trash"></i>
      </div>
      <p class="box-title">Title: ${bookList[i].bookTitle}</p>
      <p class="box-id">Id: ${bookList[i].bookId}</p>
      <p class="box-author">Author: ${bookList[i].bookAuthor}</p>
      <p class="box-description">Description: ${bookList[i].bookDescription}</p>
      <div class="cover">
        <img src="${bookList[i].bookImage}">
      </div>
    </div>`;
    document.querySelector('.js-myBooklist-box').insertAdjacentHTML('beforeend', myBookList);
  }

  deleteBook();
}

// Delete a book from the list
function deleteBook() {
  document.querySelectorAll('.js-trash').forEach(item => {
    item.addEventListener('click', event => {
      findBookToRemove(item.dataset.bookId);
      document.getElementById(item.dataset.bookId).innerHTML = '<i class="fa-regular fa-bookmark"></i>';
      displayBookList();
      saveToStorage();
    });
  });
}

// Find and remove a book by its ID
function findBookToRemove(bookId) {
  bookList = bookList.filter(object => object.bookId !== bookId);
}
console.log(bookList);

// Save the book list to session storage
export function saveToStorage() {
  sessionStorage.setItem('bookList', JSON.stringify(bookList));
  bookList.forEach(book => {
    sessionStorage.setItem(book.bookId, JSON.stringify(book));
  });
}

// Load the book list from session storage
export function loadFromStorage() {
  const storage = JSON.parse(sessionStorage.getItem('bookList'));
  if (storage) {
    bookList = storage;
    displayBookList();
  }
}

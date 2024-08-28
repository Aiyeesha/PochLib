import { addBook } from "./search.js";

// Crée un élément div pour le container des livres
const myBooksElement = document.getElementById('myBooks');
const titleContainerElement = document.createElement('div');
titleContainerElement.classList.add('title-container');
const logoImage = document.createElement('img');
logoImage.src = "images/logo.png";
const mainTitle = document.querySelector('.title');
// Ajoute le logo et le titre principal dans le container des livres
myBooksElement.prepend(titleContainerElement);
titleContainerElement.prepend(logoImage);
titleContainerElement.append(mainTitle);

// Ajoute la classe 'sub-title' à tous les sous-titres h2
const subTitles = document.querySelectorAll('h2');
for (const subTitle of subTitles) {
  subTitle.classList.add('sub-title');
}

// Crée un container pour la barre de recherche
const searchContainerElement = document.createElement('div');
searchContainerElement.classList.add('js-search-container');
const buttonsBoxElement = document.createElement('div');
buttonsBoxElement.classList.add('buttons-box');
const addButton = document.createElement('button');
addButton.classList.add('button--green', 'js-add-button');
addButton.textContent = 'Ajouter un livre';
// Insère le container de recherche et le bouton d'ajout avant la barre de séparation hr
myBooksElement.insertBefore(searchContainerElement, document.querySelector('hr'));
searchContainerElement.append(buttonsBoxElement);
buttonsBoxElement.append(addButton);

// Crée une section pour les résultats
const contentElement = document.getElementById('content');
const resultSectionElement = document.createElement('div');
resultSectionElement.classList.add('js-result-section');
myBooksElement.insertBefore(resultSectionElement, contentElement);

const resultBoxGridElement = document.createElement('div');
resultBoxGridElement.classList.add('result-box-grid', 'js-myBooklist-box');
contentElement.append(resultBoxGridElement);

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

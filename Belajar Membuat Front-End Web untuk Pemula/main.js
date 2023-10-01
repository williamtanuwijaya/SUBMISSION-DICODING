const inputBookTitle = document.getElementById('inputBookTitle');
const inputBookAuthor = document.getElementById('inputBookAuthor');
const inputBookYear = document.getElementById('inputBookYear');
const inputBookIsComplete = document.getElementById('inputBookIsComplete');
const inputForm = document.getElementById('inputBook');
const incompleteBookshelfList = document.getElementById('incompleteBookshelfList');
const completeBookshelfList = document.getElementById('completeBookshelfList');

function createBook(id, title, author, year, isComplete) {
  const bookItem = document.createElement('article');
  bookItem.classList.add('book_item');

  const titleElement = document.createElement('h3');
  titleElement.innerText = title;

  const authorElement = document.createElement('p');
  authorElement.innerText = `Penulis: ${author}`;

  const yearElement = document.createElement('p');
  yearElement.innerText = `Tahun: ${year}`;

  const actionContainer = document.createElement('div');
  actionContainer.classList.add('action');

  const actionButton = document.createElement('button');
  actionButton.classList.add(isComplete ? 'green' : 'red');
  actionButton.innerText = isComplete ? 'Belum selesai di Baca' : 'Selesai dibaca';
  actionButton.addEventListener('click', toggleBookStatus);

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('red');
  deleteButton.innerText = 'Hapus buku';
  deleteButton.addEventListener('click', removeBook);

  actionContainer.appendChild(actionButton);
  actionContainer.appendChild(deleteButton);

  bookItem.appendChild(titleElement);
  bookItem.appendChild(authorElement);
  bookItem.appendChild(yearElement);
  bookItem.appendChild(actionContainer);

  return bookItem;
}

function generateId() {
  return +new Date();
}

function addBookToShelf(id, title, author, year, isComplete) {
  const bookItem = createBook(id, title, author, year, isComplete);
  const bookshelfList = isComplete ? completeBookshelfList : incompleteBookshelfList;
  bookshelfList.appendChild(bookItem);

  saveBookToStorage(id, title, author, year, isComplete);
}

function removeBook(event) {
  const bookItem = event.target.parentElement.parentElement;
  bookItem.remove();

  removeBookFromStorage(bookItem.querySelector('h3').innerText);
}

function toggleBookStatus(event) {
  const bookItem = event.target.parentElement.parentElement;
  const actionButton = bookItem.querySelector('button');
  const isComplete = actionButton.classList.contains('green');

  actionButton.innerText = isComplete ? 'Selesai dibaca' : 'Belum selesai di Baca';
  actionButton.classList.toggle('green');
  actionButton.classList.toggle('red');

  const bookshelfList = isComplete ? incompleteBookshelfList : completeBookshelfList;
  bookshelfList.appendChild(bookItem);

  updateBookStatusInStorage(bookItem.querySelector('h3').innerText, isComplete);
}

function saveBookToStorage(id, title, author, year, isComplete) {
  const book = {
    id: id,
    title: title,
    author: author,
    year: year,
    isComplete: isComplete,
  };

  let books = getBooksFromStorage();
  books.push(book);
  localStorage.setItem('books', JSON.stringify(books));
}

function getBooksFromStorage() {
  const books = localStorage.getItem('books');
  return books ? JSON.parse(books) : [];
}

function renderBooks() {
  const books = getBooksFromStorage();

  for (const book of books) {
    const { id, title, author, year, isComplete } = book;
    addBookToShelf(id, title, author, year, isComplete);
  }
}

function removeBookFromStorage(title) {
  let books = getBooksFromStorage();
  books = books.filter((book) => book.title !== title);
  localStorage.setItem('books', JSON.stringify(books));
}

function updateBookStatusInStorage(title, isComplete) {
  let books = getBooksFromStorage();
  const bookIndex = books.findIndex((book) => book.title === title);
  if (bookIndex !== -1) {
    books[bookIndex].isComplete = isComplete;
    localStorage.setItem('books', JSON.stringify(books));
  }
}

function searchBooks() {
  const searchBookTitle = document.getElementById('searchBookTitle').value.toLowerCase();
  const bookItems = document.querySelectorAll('.book_item');

  bookItems.forEach((bookItem) => {
    const titleElement = bookItem.querySelector('h3');
    const title = titleElement.innerText.toLowerCase();

    if (title.includes(searchBookTitle)) {
      bookItem.style.display = 'block';
    } else {
      bookItem.style.display = 'none';
    }
  });
}

const searchForm = document.getElementById('searchBook');
searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  searchBooks();
});

const searchInput = document.getElementById('searchBookTitle');
searchInput.addEventListener('input', searchBooks);

renderBooks();

inputForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const id = generateId();
  const title = inputBookTitle.value;
  const author = inputBookAuthor.value;
  const year = parseInt(inputBookYear.value);
  const isComplete = inputBookIsComplete.checked;

  addBookToShelf(id, title, author, year, isComplete);

  inputBookTitle.value = '';
  inputBookAuthor.value = '';
  inputBookYear.value = '';
  inputBookIsComplete.checked = false;
});

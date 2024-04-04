
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
  import { getDatabase, ref, onValue} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";


  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDcyRBTe9VfBn1GhN2LlElNcBE_YqaaCGU",
    authDomain: "good-flower-e1b9c.firebaseapp.com",
    projectId: "good-flower-e1b9c",
    storageBucket: "good-flower-e1b9c.appspot.com",
    messagingSenderId: "769775312922",
    appId: "1:769775312922:web:b5fb340f4af21ed7e4b1a3",
    measurementId: "G-BSV8MK70ZT"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const database = getDatabase(app);
let product = [];
let selectedProduct = [];
let itemsPerPage = 4;
let currentPage = 1;

async function dataTable() {
  console.log(selectedProduct);
  const page = [];
  for (let i = 0; i <= Math.ceil(selectedProduct.length / itemsPerPage); i++) {
    page.push(i)      
  }

  const indexOfLastpage = currentPage * itemsPerPage;
  const indexOfFirstPage = indexOfLastpage - itemsPerPage;
  const currentItems = selectedProduct.slice(indexOfFirstPage, indexOfLastpage);
  console.log(currentItems);
  
  document.getElementById("product_container").innerHTML = currentItems.map(products =>
    `<div class="product" >
        <h2>${products.name}</h2>
        <img class="image" src="${products.imageSrc}" alt="${products.name}">
        <h3>Description</h3>
        <p class="discription">${products.description}</p>
        <h3>Notes de tête</h3>
        <div class="notes">
        ${Object.keys(products.tete).length === 0 ? '<p>vide</p>' :
          Object.values(products.tete).map(note => `
            <div class="note" >
              <img src="${note.imgSrc}" alt="${note.name}">
              <p>${note.one}</p>
            </div>
          `).join('')
        }
      </div>
      <h3>Notes de coeur</h3>
      <div class="notes">
        ${Object.keys(products.coeur).length === 0 ? '<p>vide</p>' :
          Object.values(products.coeur).map(note => `
            <div class="note">
              <img src="${note.imgSrc}" alt="${note.cone}">
              <p>${note.cone}</p>
            </div>
          `).join('')
        }
      </div>
      <h3>Notes de fond</h3>
      <div class="notes">
        ${Object.keys(products.fond).length === 0 ? '<p>vide</p>' :
          Object.values(products.fond).map(note => `
            <div class="note">
              <img src="${note.imgSrc}" alt="${note.fone}">
              <p>${note.fone}</p>
            </div>
          `).join('')
        }
      </div>
      
    </div>`
  ).join('');
}

const prevBtn = () => {
  if (currentPage > 1) {
    currentPage--;
    dataTable();
  }
}

const nextBtn = () => {
  if (currentPage < Math.ceil(product.length / itemsPerPage)) {
    currentPage++;
    dataTable();
  }
}

document.getElementById("prevBtn").addEventListener("click", prevBtn, false)
document.getElementById("nextBtn").addEventListener("click", nextBtn, false)

document.addEventListener('DOMContentLoaded', function(event) {
  const productRef = ref(database, 'products');
  onValue(productRef, (snaps) => {
    const data = snaps.val()
    product = Object.values(data);
    selectedProduct = Object.values(data);
    dataTable();
  })
})

// Reference to the HTML form and input field
// Reference to the HTML form and input field
const searchForm = document.getElementById('searchform');
const searchInput = document.getElementById('s');

// Function to handle form submission
searchForm.addEventListener('submit', handleFormSubmit);

// Add 'input' event listener to the search input
searchInput.addEventListener('input', debounce(handleInput, 300)); // Adjust debounce delay as needed

// Initialize Firebase and set up Firebase listeners
// Your Firebase initialization code here...

// Function to handle form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent default form submission
  performSearch();
}

// Function to handle input events
function handleInput(event) {
  performSearch();
}

// Function to perform search
function performSearch() {
  const searchTerm = searchInput.value.trim().toLowerCase(); // Get the search term
  console.log(searchTerm);
  selectedProduct = product.filter(item => item.name.toLowerCase().startsWith(searchTerm));
  dataTable();
}

// Function to debounce input events
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

// Pagination logic (if any) goes here...
// Ensure that pagination does not interfere with the search functionality

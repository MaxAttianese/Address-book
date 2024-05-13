// CLEAR FORM
import {
  tableContainer,
  cardContainer
} from "./message.js";


export const firstnameInputAddForm = document.getElementById("firstname");
const firstnameInputClean = document.getElementById("firstname-clean");

export const lastnameInputAddForm = document.getElementById("lastname");
const lastnameInputClean = document.getElementById("lastname-clean");

export const searchInput = document.getElementById("search");
const searchInputClean = document.getElementById("search-clean");

// Clear firstname input
firstnameInputClean.addEventListener("click", (event) => {
  event.preventDefault();
  firstnameInputAddForm.value = "";
});

// Clear lastname input
lastnameInputClean.addEventListener("click", (event) => {
  event.preventDefault();
  lastnameInputAddForm.value = "";
});

// Clear search input
searchInputClean.addEventListener("click", (event) => {
  event.preventDefault();
  searchInput.value = "";
});

export function clearDom() {
  while (tableContainer.hasChildNodes() && cardContainer.hasChildNodes()) {
    tableContainer.removeChild(tableContainer.firstChild);
    cardContainer.removeChild(cardContainer.firstChild);
  }
}

// CLEAR FORM
const firstnameInputAddForm = document.getElementById("firstname");
const firstnameInputClean = document.getElementById("firstname-clean");

const lastnameInputAddForm = document.getElementById("lastname");
const lastnameInputClean = document.getElementById("lastname-clean");

const searchInput = document.getElementById("search");
const searchInputClean = document.getElementById("search-clean");

firstnameInputClean.addEventListener("click", (event) => {
  event.preventDefault();
  firstnameInputAddForm.value = "";
});

lastnameInputClean.addEventListener("click", (event) => {
  event.preventDefault();
  lastnameInputAddForm.value = "";
});

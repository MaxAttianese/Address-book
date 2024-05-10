import {
  firstnameInputAddForm,
  lastnameInputAddForm,
  searchInput,
} from "./clear.js";

import { User } from "../models/Person.js";

const errorMessageFirstnameContainer = document.querySelector(
  `[data-input="not-validate-firstname"]`
);
const errorMessageLastnameContainer = document.querySelector(
  `[data-input="not-validate-lastname"]`
);

const errorMessageSearchContainer = document.querySelector(
  `[data-input="not-validate-search"]`
);

export function addFormValidation(event) {
  if (!event.target.firstname.value && !event.target.lastname.value) {
    alert("Compila i campi");
    errorMessageFirstnameContainer.classList.add("error");
    errorMessageFirstnameContainer.textContent = "Compila qui";
    firstnameInputAddForm.classList.add("error-input-border");
    errorMessageFirstnameContainer.classList.remove("hidden");

    errorMessageLastnameContainer.classList.add("error");
    errorMessageLastnameContainer.textContent = "Compila qui";
    lastnameInputAddForm.classList.add("error-input-border");
    errorMessageLastnameContainer.classList.remove("hidden");

    firstnameInputAddForm.addEventListener("keypress", () => {
      if (firstnameInputAddForm.value.length >= 2) {
        firstnameInputAddForm.classList.remove("error-input-border");
      }
    });

    lastnameInputAddForm.addEventListener("keypress", () => {
      if (lastnameInputAddForm.value.length >= 2) {
        lastnameInputAddForm.classList.remove("error-input-border");
      }
    });
  } else {
    const firstname = firstnameValidate(event.target.firstname.value);
    const lastname = lastnameValidate(event.target.lastname.value);

    if (firstname && lastname) {
      const user = new User(firstname, lastname);
      return user;
    }
  }
}

function firstnameValidate(firstnameInputValue) {
  if (!firstnameInputValue) {
    alert("Compila il campo nome");
    errorMessageFirstnameContainer.classList.add("error");
    errorMessageFirstnameContainer.textContent = "Compila qui";
    firstnameInputAddForm.classList.add("error-input-border");
    errorMessageFirstnameContainer.classList.remove("hidden");

    firstnameInputAddForm.addEventListener("keypress", () => {
      if (firstnameInputAddForm.value.length >= 2) {
        firstnameInputAddForm.classList.remove("error-input-border");
      }
    });
  } else if (firstnameInputValue.length < 3) {
    alert("Minimo 3 Caratteri nel campo nome");
    errorMessageFirstnameContainer.classList.add("error");
    errorMessageFirstnameContainer.textContent = "Min. 3";
    firstnameInputAddForm.classList.add("error-input-border");
    errorMessageFirstnameContainer.classList.remove("hidden");

    firstnameInputAddForm.addEventListener("keypress", () => {
      if (firstnameInputAddForm.value.length >= 2) {
        firstnameInputAddForm.classList.remove("error-input-border");
      }
    });
  } else {
    const firstname = firstnameInputValue.replace(
      firstnameInputValue[0],
      firstnameInputValue[0].toUpperCase()
    );
    if (errorMessageFirstnameContainer.classList.contains("error")) {
      errorMessageFirstnameContainer.classList.remove("error");
      errorMessageFirstnameContainer.classList.add("hidden");
    }

    if (firstname) {
      return firstname;
    }
  }
}

function lastnameValidate(lastnameInputValue) {
  if (!lastnameInputValue) {
    alert("Compila il campo cognome");
    errorMessageLastnameContainer.classList.add("error");
    errorMessageLastnameContainer.textContent = "Compila qui";
    lastnameInputAddForm.classList.add("error-input-border");
    errorMessageLastnameContainer.classList.remove("hidden");

    lastnameInputAddForm.addEventListener("keypress", () => {
      if (lastnameInputAddForm.value.length >= 2) {
        lastnameInputAddForm.classList.remove("error-input-border");
      }
    });
  } else if (lastnameInputValue.length < 3) {
    alert("Minimo 3 Caratteri nel campo cognome");
    errorMessageLastnameContainer.classList.add("error");
    errorMessageLastnameContainer.textContent = "Min. 3";
    lastnameInputAddForm.classList.add("error-input-border");
    errorMessageLastnameContainer.classList.remove("hidden");

    lastnameInputAddForm.addEventListener("keypress", () => {
      if (lastnameInputAddForm.value.length >= 2) {
        lastnameInputAddForm.classList.remove("error-input-border");
      }
    });
  } else {
    const lastname = lastnameInputValue.replace(
      lastnameInputValue[0],
      lastnameInputValue[0].toUpperCase()
    );
    if (errorMessageLastnameContainer.classList.contains("error")) {
      errorMessageLastnameContainer.classList.remove("error");
      errorMessageLastnameContainer.classList.add("hidden");
    }
    if (lastname) {
      return lastname;
    }
  }
}

export function searchFormValidation(event) {
  if (!event.target.search.value) {
    alert("Compila il campo");
    errorMessageSearchContainer.classList.add("error");
    errorMessageSearchContainer.textContent = "Compila qui";
    searchInput.classList.add("error-input-border");
    errorMessageSearchContainer.classList.remove("hidden");

    searchInput.addEventListener("keypress", function removeBorder() {
      if (searchInput.value.length >= 2) {
        searchInput.classList.remove("error-input-border");
      }
    });
  } else if (event.target.search.value.length < 3) {
    alert("Minimo 3 Caratteri");
    errorMessageSearchContainer.classList.add("error");
    errorMessageSearchContainer.textContent = "Min 3";
    searchInput.classList.add("error-input-border");
    errorMessageSearchContainer.classList.remove("hidden");

    searchInput.addEventListener("keypress", () => {
      if (searchInput.value.length >= 2) {
        searchInput.classList.remove("error-input-border");
      }
    });
  } else {
    const key = event.target.search.value.replace(
      event.target.search.value[0],
      event.target.search.value[0].toUpperCase()
    );
    if (errorMessageSearchContainer.classList.contains("error")) {
      errorMessageSearchContainer.classList.remove("error");
      errorMessageSearchContainer.classList.add("hidden");
    }

    if (key) {
      return key;
    }
  }
}

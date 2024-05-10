import "./theme.js";
import "./view.js";
import { searchInput } from "./clear.js";
import {
  tableContainer,
  cardContainer,
  showNoneUserMessage,
  createAndShowMessage,
} from "./message.js";
import { addFormValidation, searchFormValidation } from "./validate.js";
import { generateId, resetCountId } from "../models/Person.js";

const addForm = document.getElementById("add-form");
const searchForm = document.getElementById("search-form");
const refreshButton = document.getElementById("reload");

// GET DATA FROM SERVER
async function getData() {
  try {
    const response = await fetch("http://localhost:8000/");
    if (!response.ok) {
      createAndShowMessage(
        "error",
        "Si è Verificato un Errore... Siamo Spiacenti, Riprovare più Tardi"
      );
      throw new Error(response.statusText);
    }
    const data = await response.json();

    let lastId = 0;
    if (data.length > 0) {
      lastId = +data[data.length - 1].id;
    } else {
      lastId = 0;
    }
    generateId(lastId);

    for (let i = 0; i < data.length; i++) {
      constructTableDom(data[i]);
      constructCardsDom(data[i]);
    }
    showNoneUserMessage("Non ci sono utenti nella tua rubrica, aggiungine qualcuno!");
  } catch (error) {
    createAndShowMessage(
      "error",
      "Si è Verificato un Errore... Siamo Spiacenti, Riprovare più Tardi"
    );
    throw new Error("Ops.. It was wrong!");
  }
}
getData();

// CREATE RECORD
addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const user = addFormValidation(event);
  if (user) {
    createRecord(user);
    addForm.reset();
  }
});

// SEND NEW RECORD TO SERVER
async function createRecord(people) {
  try {
    const res = await fetch("http://localhost:8000/add-user", {
      method: "POST",
      body: JSON.stringify(people),
    });
    if (!res.ok) {
      createAndShowMessage(
        "error",
        "Si è Verificato un Errore... Siamo Spiacenti, Riprovare più Tardi"
      );
      throw new Error(response.statusText);
    }
    const data = await res.json();
    constructTableDom(data);
    constructCardsDom(data);
    createAndShowMessage("successo", "Utente Inserito con Successo");
  } catch (error) {
    createAndShowMessage(
      "error",
      "Si è Verificato un Errore... Siamo Spiacenti, Riprovare più Tardi"
    );
    throw new Error("Ops.. Qualcosa è andato storto");
  }
}

// DOM
function constructCardsDom(user) {
  const article = document.createElement("article");
  article.setAttribute("data-person", user.id);

  const imgLinkContainer = document.createElement("div");
  article.appendChild(imgLinkContainer);

  const overlay = document.createElement("div");
  overlay.classList.add("overlay");
  imgLinkContainer.appendChild(overlay);

  const idLink = document.createElement("a");
  idLink.setAttribute("href", `/people`);
  idLink.setAttribute("title", "Apri la pagina del dettaglio");
  idLink.textContent = user.id;
  overlay.appendChild(idLink);

  const img = document.createElement("img");
  img.setAttribute(
    "src",
    "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
  );
  img.setAttribute("alt", `Foto ${user.firstname}`);
  imgLinkContainer.appendChild(img);

  const address = document.createElement("address");

  const firstname = document.createElement("h3");
  firstname.classList.add("card-firstname");
  firstname.textContent = user.firstname;
  address.appendChild(firstname);

  const lastname = document.createElement("h3");
  lastname.classList.add("card-lastname");
  lastname.textContent = user.lastname;
  address.appendChild(lastname);

  article.appendChild(address);

  const buttonDelete = document.createElement("button");
  buttonDelete.setAttribute("type", "button");
  buttonDelete.classList.add("button-icon");
  buttonDelete.addEventListener("click", () => {
    const response = confirm("Sei sicuro di volere eliminare questo utente?");
    const idUser = user.id;
    if (response) {
      removeUserFromDOM(user.id);
      deleteRecord(idUser);
      showNoneUserMessage(
        "Non ci sono utenti nella tua rubrica, aggiungine qualcuno!"
      );
    }
  });
  const iconTrash = document.createElement("i");
  iconTrash.classList.add("fa-solid", "fa-trash-can");
  buttonDelete.appendChild(iconTrash);

  article.appendChild(buttonDelete);

  cardContainer.appendChild(article);

  showNoneUserMessage(
    "Non ci sono utenti nella tua rubrica, aggiungine qualcuno!"
  );
}

function constructTableDom(user) {
  let tr = document.createElement("tr");
  tr.setAttribute("data-person", user.id);

  let tdId = document.createElement("td");

  let spanId = document.createElement("span");
  tdId.appendChild(spanId);

  let idLink = document.createElement("a");
  idLink.setAttribute("href", "#");
  idLink.setAttribute("title", "Apri la pagina del dettaglio");
  idLink.textContent = user.id;
  spanId.appendChild(idLink);

  tr.appendChild(tdId);

  let tdFirstname = document.createElement("td");
  let divFirstname = document.createElement("div");
  divFirstname.textContent = user.firstname;
  tdFirstname.appendChild(divFirstname);
  tr.appendChild(tdFirstname);

  let tdLastname = document.createElement("td");
  let divLastname = document.createElement("div");
  divLastname.textContent = user.lastname;
  tdLastname.appendChild(divLastname);
  tr.appendChild(tdLastname);

  let tdButton = document.createElement("td");
  let buttonDelete = document.createElement("button");
  buttonDelete.setAttribute("type", "button");
  buttonDelete.classList.add("button-icon");
  buttonDelete.addEventListener("click", (event) => {
    event.preventDefault();
    const idUser = user.id;
    const response = confirm("Sei sicuro di volere eliminare questo utente?");
    if (response) {
      removeUserFromDOM(user.id);
      deleteRecord(idUser);
      showNoneUserMessage(
        "Non ci sono utenti nella tua rubrica, aggiungine qualcuno!"
      );
    }
  });

  tdButton.appendChild(buttonDelete);
  let iconTrash = document.createElement("i");
  iconTrash.classList.add("fa-solid", "fa-trash-can");
  buttonDelete.appendChild(iconTrash);
  tr.appendChild(tdButton);

  tableContainer.appendChild(tr);

  showNoneUserMessage(
    "Non ci sono utenti nella tua rubrica, aggiungine qualcuno!"
  );
}

// SEND ID RECORD FOR DELETE IT
async function deleteRecord(id) {
  try {
    const response = await fetch(`http://localhost:8000/delete-user/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      createAndShowMessage(
        "error",
        "Si è Verificato un Errore... Siamo Spiacenti, Riprovare più Tardi"
      );
      throw new Error(response.statusText);
    }
  } catch (error) {
    createAndShowMessage(
      "error",
      "Si è Verificato un Errore... Siamo Spiacenti, Riprovare più Tardi"
    );
  }
}

// DELETE USER FROM DOM
function removeUserFromDOM(id) {
  let userContainers = document.querySelectorAll(`[data-person="${id}"]`);
  userContainers.forEach((el) => {
    if (el.tagName.toLocaleLowerCase() == "tr") {
      tableContainer.removeChild(el);
    } else if (el.tagName.toLocaleLowerCase() == "article") {
      cardContainer.removeChild(el);
    }
  });
  resetCountId();
  createAndShowMessage("success", "Utente Eliminato con Successo");
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const key = searchFormValidation(event);
  if (key) {
    sendKeyForSearchRecord(key);
  }
});



// SEND RECORD TO SERVER FOR SEARCH
async function sendKeyForSearchRecord(key) {
  const searchParams = { firstname: key };
  const query = new URLSearchParams(searchParams);
  try {
    const res = await fetch(`http://localhost:3000/users?${query.toString()}`);
    if (!res.ok) {
      createAndShowMessage(
        "error",
        "Si è Verificato un Errore... Siamo Spiacenti, Riprovare più Tardi"
      );
      throw new Error(response.statusText);
    }
    const data = await res.json();
    filteredDom(data);
  } catch (error) {
    createAndShowMessage(
      "error",
      "Si è Verificato un Errore... Siamo Spiacenti, Riprovare più Tardi"
    );
    throw new Error("Ops.. Qualcosa è andato storto");
  }
}

function filteredDom(data) {
  refreshButton.classList.remove("hidden");
  clearDom();
  for (let i = 0; i < data.length; i++) {
    constructTableDom(data[i]);
    constructCardsDom(data[i]);
  }
  showNoneUserMessage(
    "Non ci sono utenti nella tua rubrica che corrispondono alla tua ricerca!"
  );

}

refreshButton.addEventListener("click", () => {
  clearDom();
  getData();
  searchInput.value = "";
  refreshButton.classList.add("hidden");
});

function clearDom() {
  while (tableContainer.hasChildNodes() && cardContainer.hasChildNodes()) {
    tableContainer.removeChild(tableContainer.firstChild);
    cardContainer.removeChild(cardContainer.firstChild);
  }
}

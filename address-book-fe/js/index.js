// CHANGE THEME
const button = document.getElementById("change-theme");

if (sessionStorage.getItem("theme") == "light") {
  document.body.classList.add("light");
} else if (sessionStorage.getItem("theme") == "dark") {
  document.body.classList.add("dark");
} else if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: light)").matches
) {
  document.body.classList.add("light");
} else if (
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches
) {
  document.body.classList.add("dark");
} else {
  document.body.classList.add("light");
}

button.addEventListener("click", () => {
  if (document.body.classList.contains("light")) {
    document.body.classList.replace("light", "dark");
    sessionStorage.setItem("theme", "dark");
  } else {
    document.body.classList.replace("dark", "light");
    sessionStorage.setItem("theme", "light");
  }
});

// CHANGE VIEW

const buttonView = document.getElementById("change-view");
const iconView = document.getElementById("icon-view");

const table = document.querySelector(".table-container");
const card = document.querySelector(".card-container");

if (
  sessionStorage.getItem("view") == "table" &&
  !table.classList.contains("visible") &&
  !card.classList.contains("hidden") &&
  !table.classList.contains("hidden") &&
  !card.classList.contains("visible")
) {
  table.classList.add("visible");
  card.classList.add("hidden");
  iconView.classList.add("fa-list");
} else if (
  sessionStorage.getItem("view") == "card" &&
  !table.classList.contains("visible") &&
  !card.classList.contains("hidden") &&
  !table.classList.contains("hidden") &&
  !card.classList.contains("visible")
) {
  table.classList.add("hidden");
  card.classList.add("visible");
  iconView.classList.add("fa-table");
} else if (sessionStorage.getItem("theme") == "table") {
  table.classList.replace("hidden", "visible");
  card.classList.replace("visible", "hidden");
  iconView.classList.replace("fa-list", "fa-table");
} else if (sessionStorage.getItem("theme") == "card") {
  card.classList.replace("hidden", "visible");
  table.classList.replace("visible", "hidden");
  iconView.classList.replace("fa-list", "fa-table");
} else {
  table.classList.add("visible");
  card.classList.add("hidden");
  iconView.classList.add("fa-list");
}

buttonView.addEventListener("click", () => {
  if (
    table.classList.contains("visible") &&
    card.classList.contains("hidden")
  ) {
    card.classList.replace("hidden", "visible");
    table.classList.replace("visible", "hidden");
    iconView.classList.replace("fa-list", "fa-table");
    sessionStorage.setItem("view", "card");
  } else if (
    table.classList.contains("hidden") &&
    card.classList.contains("visible")
  ) {
    table.classList.replace("hidden", "visible");
    card.classList.replace("visible", "hidden");
    iconView.classList.replace("fa-table", "fa-list");
    sessionStorage.setItem("view", "table");
  }
});

// GET DATA FROM SERVER

async function getData() {
  try {
    const response = await fetch("http://localhost:8000/");
    const data = await response.json();
    generateId(data);
    showMessage(data);

    domContstructTable(data);
    domContstructCard(data); //Condizione con card
  } catch (error) {
    throw new Error("Ops.. It was wrong!");
  }
}

getData();

// GENERATE ID
let id = 0;
function generateId(users) {
  if (users.length > 0) {
    id = `${+users[users.length - 1].id + 1}`;
  } else {
    id = "1";
  }
}

// MESSAGE FOR NONE USER

const messageContainer = document.getElementById("none-user");

function showMessage(users) {
  if (users.length > 0) {
    messageContainer.classList.add("hidden");
  } else {
    messageContainer.classList.remove("hidden");
  }
}

// DOM

const tableAppend = document.getElementById("table-append");
const cardAppend = document.getElementById("card-append");

function domContstructTable(users) {
  for (let i = 0; i < users.length; i++) {
    let tr = document.createElement("tr");

    let tdId = document.createElement("td");

    let spanId = document.createElement("span");
    tdId.appendChild(spanId);

    let idLink = document.createElement("a");
    idLink.setAttribute("href", `/people/:${users[id]}`);
    idLink.setAttribute("title", "Apri la pagina del dettaglio");
    idLink.textContent = users[i].id;
    spanId.appendChild(idLink);

    tr.appendChild(tdId);

    let tdFirstname = document.createElement("td");
    let divFirstname = document.createElement("div");
    divFirstname.textContent = users[i].firstname;
    tdFirstname.appendChild(divFirstname);
    tr.appendChild(tdFirstname);

    let tdLastname = document.createElement("td");
    let divLastname = document.createElement("div");
    divLastname.textContent = users[i].lastname;
    tdLastname.appendChild(divLastname);
    tr.appendChild(tdLastname);

    let tdButton = document.createElement("td");
    let buttonDelete = document.createElement("button");
    buttonDelete.setAttribute("type", "click");
    buttonDelete.classList.add("button-icon");
    tdButton.appendChild(buttonDelete);
    buttonDelete.addEventListener("click", () => {
      alert("Sei sicuro di volere eliminare questo utente?");
      sendDataForDelete(users[i].id);
    });
    let iconTrash = document.createElement("i");
    iconTrash.classList.add("fa-solid", "fa-trash-can");
    buttonDelete.appendChild(iconTrash);
    tr.appendChild(tdButton);

    tableAppend.appendChild(tr);
  }
}

console.log(cardAppend);

function domContstructCard(users) {
  for (let i = 0; i < users.length; i++) {
    let article = document.createElement("article");

    let imgLinkContainer = document.createElement("div");
    article.appendChild(imgLinkContainer);

    let overlay = document.createElement("div");
    overlay.classList.add("overlay");
    imgLinkContainer.appendChild(overlay);

    let idLink = document.createElement("a");
    idLink.setAttribute("href", `/people`);
    idLink.setAttribute("title", "Apri la pagina del dettaglio");
    idLink.textContent = users[i].id;
    overlay.appendChild(idLink);

    let img = document.createElement("img");
    img.setAttribute(
      "src",
      "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
    );
    img.setAttribute("alt", `Foto ${users[i].firstname}`);
    imgLinkContainer.appendChild(img);

    let address = document.createElement("address");

    let firstname = document.createElement("h3");
    firstname.classList.add("card-firstname");
    firstname.textContent = users[i].firstname;
    address.appendChild(firstname);

    let lastname = document.createElement("h3");
    lastname.classList.add("card-lastname");
    lastname.textContent = users[i].lastname;
    address.appendChild(lastname);

    article.appendChild(address);

    let buttonDelete = document.createElement("button");
    buttonDelete.setAttribute("type", "click");
    buttonDelete.classList.add("button-icon");
    buttonDelete.addEventListener("click", () => {
      alert("Sei sicuro di volere eliminare questo utente?");
      sendDataForDelete(users[i].id);
    });
    let iconTrash = document.createElement("i");
    iconTrash.classList.add("fa-solid", "fa-trash-can");
    buttonDelete.appendChild(iconTrash);

    article.appendChild(buttonDelete);

    cardAppend.appendChild(article);
  }
}

const addForm = document.getElementById("add-form");
const addButton = document.getElementById("submit-add-form");
const firstnameInputAddForm = document.getElementById("firstname");
const firstnameInputClean = document.getElementById("firstname-clean");
const lastnameInputAddForm = document.getElementById("lastname");
const lastnameInputClean = document.getElementById("lastname-clean");

const searchForm = document.getElementById("search-form");
const searchButton = document.getElementById("submit-search-form");
const searchInput = document.getElementById("search");
const searchInputClean = document.getElementById("search-clean");

addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!event.target.firstname.value || !event.target.lastname.value) {
    alert("Compila i campi");
    return;
  }
  const user = {
    id: id,
    firstname: event.target.firstname.value.replace(
      event.target.firstname.value[0],
      event.target.firstname.value[0].toUpperCase()
    ),
    lastname: event.target.lastname.value.replace(
      event.target.lastname.value[0],
      event.target.lastname.value[0].toUpperCase()
    ),
  };
  sendDataForCreate(user);
  addForm.reset();
});

function sendDataForCreate(user) {
  try {
    fetch("http://localhost:8000/add-user", {
      method: "POST",
      body: JSON.stringify(user),
    }).then((res) => res);
  } catch (error) {
    console.log(error);
  }
}

function sendDataForDelete(id) {
  try {
    fetch(`http://localhost:8000/delete-user/${id}`, {
      method: "DELETE",
    }).then((res) => {
      console.log(res);
    });
  } catch (error) {
    console.log(error);
  }
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(event.target.search.value);
});

// CLEAR FORM

firstnameInputClean.addEventListener("click", (event) => {
  event.preventDefault();
  firstnameInputAddForm.value = "";
});

lastnameInputClean.addEventListener("click", (event) => {
  event.preventDefault();
  lastnameInputAddForm.value = "";
});

searchInputClean.addEventListener("click", (event) => {
  event.preventDefault();
  searchInput.value = "";
});

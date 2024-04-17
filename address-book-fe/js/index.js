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
    domContstruct(data);
  } catch (error) {
    throw new Error("Ops.. It was wrong!");
  }
}

getData();

// GENERATE ID
let id = 0;
function generateId(users) {
  id = `${+users[users.length - 1].id + 1}`;
}

// DOM

const tableAppend = document.getElementById("table-append");
const cardAppend = document.getElementById("card-append");
let buttonsDelete = [];

function domContstruct(users) {
  console.log(users);
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
    buttonDelete.addEventListener("click", ()=>{
      sendDataForDelete(users[i].id)
    })
    let iconTrash = document.createElement("i");
    iconTrash.classList.add("fa-solid", "fa-trash-can");
    buttonDelete.appendChild(iconTrash);
    tr.appendChild(tdButton);

    tableAppend.appendChild(tr);
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
      event.target.firstname.value[0].toUpperCase()),
    lastname: event.target.lastname.value.replace(
      event.target.lastname.value[0],
      event.target.lastname.value[0].toUpperCase()),
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
  console.log(id);
  try {
    fetch(`http://localhost:8000/delete-user/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then((res) => console.log(res));
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

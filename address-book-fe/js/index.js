import "./theme.js";
import "./view.js";
import "./clear.js";

const addForm = document.getElementById("add-form");
const tableContainer = document.getElementById("table-append");
const cardContainer = document.getElementById("card-append");
const messageContainer = document.getElementById("none-user");
const tableSection = document.querySelector(".table-container");


async function getData() {
  try {
    const response = await fetch("http://localhost:8000/");
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
  } catch (error) {
    throw new Error("Ops.. It was wrong!");
  }
}
getData();

let count = 0;
function generateId(lastId) {
  count = lastId++;
}

addForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!event.target.firstname.value || !event.target.lastname.value) {
    alert("Compila i campi");
  } else {
    const user = {
      id: `${++count}`,
      firstname: event.target.firstname.value.replace(
        event.target.firstname.value[0],
        event.target.firstname.value[0].toUpperCase()
      ),
      lastname: event.target.lastname.value.replace(
        event.target.lastname.value[0],
        event.target.lastname.value[0].toUpperCase()
      ),
    };
    createRecord(user);
    addForm.reset();
  }
});

async function createRecord(people) {
  try {
    const res = await fetch("http://localhost:8000/add-user", {
      method: "POST",
      body: JSON.stringify(people),
    });
    const data = await res.json();
    constructTableDom(data);
    constructCardsDom(data);
  } catch (error) {
    throw new Error("Ops.. Qualcosa è andato storto");
  }
}

function constructCardsDom(user) {
  const article = document.createElement("article");

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
      cardContainer.removeChild(article);
      deleteRecord(idUser);
      showMessage();
    }
  });
  const iconTrash = document.createElement("i");
  iconTrash.classList.add("fa-solid", "fa-trash-can");
  buttonDelete.appendChild(iconTrash);

  article.appendChild(buttonDelete);

  cardContainer.appendChild(article);

  showMessage();
}

function constructTableDom(user) {
  let tr = document.createElement("tr");

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
      tableContainer.removeChild(tr);
      deleteRecord(idUser);
      showMessage();
    }
  });

  tdButton.appendChild(buttonDelete);
  let iconTrash = document.createElement("i");
  iconTrash.classList.add("fa-solid", "fa-trash-can");
  buttonDelete.appendChild(iconTrash);
  tr.appendChild(tdButton);

  tableContainer.appendChild(tr);

  showMessage();
}

async function deleteRecord(id) {
  console.log(id);
  try {
    const response = await fetch(`http://localhost:8000/delete-user/${id}`, {
      method: "DELETE",
    });
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

function showMessage() {
  if (!cardContainer.hasChildNodes() || !tableContainer.hasChildNodes()) {
    messageContainer.classList.remove("hidden");
    tableSection.classList.add("hidden");
  } else {
    messageContainer.classList.add("hidden");
    tableSection.classList.remove("hidden");
  }
}

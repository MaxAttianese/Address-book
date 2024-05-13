import "../js/theme.js";

const userAppend = document.querySelector(".person-container");
const form = document.querySelector(".form-section");
const overlay = document.querySelector(".overlay");

// SEND RECORD TO SERVER FOR GET SINGLE PEOPLE
async function getSingleData() {
  const key = window.location.search.split("")[1];
  try {
    const res = await fetch(`http://localhost:8000/${key}`);
    if (!res.ok) {
      throw new Error(response.statusText);
    }
    const data = await res.json();
    constructDom(data[0]);
  } catch (error) {
    throw new Error("Ops.. Qualcosa è andato storto");
  }
}
getSingleData();

function constructDom(user) {
    document.title = `Rubrica | ${user.firstname} ${user.lastname}`;
  let imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");

  let img = document.createElement("img");
  img.classList.add("person-img");
  img.setAttribute("alt", `${user.firstname} ${user.lastname} Foto`);
  if (user.img) {
    img.setAttribute("src", `${user.img}`);
  } else {
    img.setAttribute(
      "src",
      "https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg"
    );
  }
  imgContainer.appendChild(img);
  userAppend.appendChild(imgContainer);

  let infoContainer = document.createElement("div");
  infoContainer.classList.add("info-container");

  let headerContainer = document.createElement("div");
  headerContainer.classList.add("header-card");

  let title = document.createElement("h2");
  title.textContent = `${user.firstname} ${user.lastname}`;
  headerContainer.appendChild(title);

  let customBotton = document.createElement("button");
  customBotton.classList.add("button-secondary");
  customBotton.setAttribute("type", "button");
  customBotton.addEventListener("click",(event)=>{
    form.classList.remove("hidden")
  })

  let iconButton = document.createElement("i");
  iconButton.classList.add("fa-solid");
  iconButton.classList.add("fa-pencil");
  customBotton.appendChild(iconButton);

  let buttonText = document.createElement("span");
  buttonText.textContent = "Modifica";
  customBotton.appendChild(buttonText);

  headerContainer.appendChild(customBotton);
  infoContainer.appendChild(headerContainer);

  let address = document.createElement("address");
  address.classList.add("person-info-container");

  let contactsContainer = document.createElement("div");

  let contactsContainerTitle = document.createElement("h3");
  contactsContainerTitle.textContent = "Contatti";
  contactsContainer.appendChild(contactsContainerTitle);

  let contactsList = document.createElement("ul");
  contactsList.classList.add("contacts-section");

  for (let i = 0; i < 3; i++) {
    let contact = document.createElement("li");
    let contactName = document.createElement("span");
    contactName.textContent = "Example";
    contact.appendChild(contactName);
    let contactLink = document.createElement("a");
    contactLink.textContent = "Example@example.it";
    contactLink.setAttribute("title", "Apri Example");
    contactLink.setAttribute("href", "Example");
    contact.appendChild(contactLink);
    contactsList.appendChild(contact);
  }

  contactsContainer.appendChild(contactsList);
  address.appendChild(contactsContainer);

  let hobbiesContainer = document.createElement("div");

  let hobbiesContainerTitle = document.createElement("h3");
  hobbiesContainerTitle.textContent = "Hobbies";
  hobbiesContainer.appendChild(hobbiesContainerTitle);

  let hobbiesList = document.createElement("ul");
  hobbiesList.classList.add("hobbies-section");

  for (let i = 0; i < 3; i++) {
    let hobby = document.createElement("li");
    let hobbyIcon = document.createElement("i");
    hobbyIcon.classList.add("fa-solid");
    hobbyIcon.classList.add("fa-gamepad");
    hobby.appendChild(hobbyIcon);
    let hobbyName = document.createElement("span");
    hobbyName.textContent = "Example";
    hobby.appendChild(hobbyName);
    hobbiesList.appendChild(hobby);
  }
  hobbiesContainer.appendChild(hobbiesList);
  address.appendChild(hobbiesContainer);
  infoContainer.appendChild(address);

  let bioContainer = document.createElement("div");
  bioContainer.classList.add("bio-section");
  let bioContainerTitle = document.createElement("h3");
  bioContainerTitle.textContent = "Bio";
  bioContainer.appendChild(bioContainerTitle);

  let bioDescription = document.createElement("p");
  bioDescription.textContent = `              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatem eum tempore, in quidem hic illum quasi laborum neque
              officiis obcaecati odit, expedita consequuntur? Asperiores, dicta
              fuga repellat praesentium vel expedita.`;
  bioContainer.appendChild(bioDescription);

  infoContainer.appendChild(bioContainer);
  userAppend.appendChild(infoContainer);
}

overlay.addEventListener("click", ()=>{
  form.classList.add("hidden")
})
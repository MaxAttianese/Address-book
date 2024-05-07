const tableSection = document.getElementById("table");
const cardContainer = document.getElementById("card-append");
const buttonView = document.getElementById("change-view");
const iconView = document.getElementById("icon-view");

if (sessionStorage.getItem("view") === "card") {
  tableSection.classList.add("hidden");
  cardContainer.classList.remove("hidden");
  iconView.classList.add("fa-table");
  iconView.classList.remove("fa-address-card");
} else if (sessionStorage.getItem("view") === "table") {
  tableSection.classList.remove("hidden");
  cardContainer.classList.add("hidden");
  iconView.classList.remove("fa-table");
  iconView.classList.add("fa-address-card");
} else {
  iconView.classList.add("fa-table");
}

buttonView.addEventListener("click", () => {
  if (iconView.classList.contains("fa-table")) {
    tableSection.classList.remove("hidden");
    cardContainer.classList.add("hidden");
    iconView.classList.remove("fa-table");
    iconView.classList.add("fa-address-card");
    sessionStorage.setItem("view", "table");
  } else if (iconView.classList.contains("fa-address-card")) {
    tableSection.classList.add("hidden");
    cardContainer.classList.remove("hidden");
    iconView.classList.add("fa-table");
    iconView.classList.remove("fa-address-card");
    sessionStorage.setItem("view", "card");
  }
});

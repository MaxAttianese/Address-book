// MESSAGE
const messageNoneContainer = document.getElementById("none-users");
const messageContainer = document.querySelector(".message-container");
const table = document.querySelector("#table");

export const cardContainer = document.getElementById("card-append");
export const tableContainer = document.getElementById("table-append");

export const noneMessage = document.getElementById("table-append");


// Show a message when there aren't people
export function showNoneUserMessage(message) {
  if (!cardContainer.hasChildNodes() || !tableContainer.hasChildNodes()) {
    messageNoneContainer.classList.remove("hidden");
    messageNoneContainer.textContent = message;
    table.classList.add("hidden");
  } else {
    messageNoneContainer.classList.add("hidden");
    messageNoneContainer.textContent = "";
    table.classList.remove("hidden");
  }
}

// Create a Success or Error message for fetch and create/delete user
export function createAndShowMessage(type, message) {
  while (messageContainer.hasChildNodes()) {
    messageContainer.removeChild(messageContainer.firstChild);
  }
  let samp = document.createElement("samp");
  if (type === "error") {
    samp.textContent = message;
    samp.classList.add("error");
  } else {
    samp.textContent = message;
    samp.classList.add("success");
  }
  messageContainer.appendChild(samp);

  setTimeout(() => {
    samp.classList.add("hidden");
  }, 3000);
}
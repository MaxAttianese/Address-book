import {
  tableContainer,
  cardContainer
} from "../js/message.js";

export class User {
  id = `${++count}`;
  firstname;
  lastname;

  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }
}

// GENERATE ID
let count = 0;
export function generateId(lastId) {
  count = lastId++;
}

// Reset count id
export function resetCountId() {
  if (!cardContainer.hasChildNodes() || !tableContainer.hasChildNodes()) {
    count = 0;
  }
}

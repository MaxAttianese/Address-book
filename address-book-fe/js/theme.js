// CHANGE THEME
const buttonTheme = document.getElementById("change-theme");

// Check on sessionStorAge for the choise of the user, else set light theme default
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

// Change theme on click
buttonTheme.addEventListener("click", () => {
  if (document.body.classList.contains("light")) {
    document.body.classList.replace("light", "dark");
    sessionStorage.setItem("theme", "dark");
  } else {
    document.body.classList.replace("dark", "light");
    sessionStorage.setItem("theme", "light");
  }
});

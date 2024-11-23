const menuBurger = document.getElementById("menu-burger");
const menu = document.querySelector("#menu ul");

menuBurger.addEventListener("click", () => {
  menu.classList.toggle("visible");
});

menuBurger.addEventListener("mouseenter", () => {
  menu.classList.toggle("visible");
});

menu.addEventListener("mouseleave", () => {
  menu.classList.toggle("visible");
});

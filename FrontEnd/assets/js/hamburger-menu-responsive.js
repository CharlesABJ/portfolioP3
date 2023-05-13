// Variables navigation
let header = document.querySelector("header");
let headerNav = document.querySelector(".header-nav");
let h1Responsive = document.querySelector(".h1-responsive");
let bubbleNav = document.querySelector(".bubble-nav");
let navElements = document.querySelectorAll("header nav ul li a");
const main = document.querySelector("main");
const footer = document.querySelector("footer");

//=======================================================================

// Menu de navigation responsive
bubbleNav.addEventListener("click", function () {
  header.classList.toggle("background-responsive");
  if (header.classList.contains("background-responsive")) {
    main.style.display = "none";
    footer.style.display = "none";
  } else {
    main.style.display = "block";
    footer.style.display = "block";
  }
});

for (let element of navElements) {
  element.addEventListener("click", function () {
    header.classList.remove("background-responsive");
    main.style.display = "block";
    footer.style.display = "block";
  });
}

// Variables navigation
let header = document.querySelector("header");
let headerNav = document.querySelector(".header-nav");
let h1Responsive = document.querySelector(".h1-responsive");
let bubbleNav = document.querySelector(".bubble-nav");
let navElements = document.querySelectorAll("header nav ul li a");

//=======================================================================


// Menu de navigation responsive
bubbleNav.addEventListener("click", function () {
  header.classList.toggle("background-responsive");
});

for (let element of navElements) {
  element.addEventListener("click", function () {
    header.classList.remove("background-responsive");
  });
}
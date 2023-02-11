// Variables navigation
let header = document.querySelector("header");
let headerNav = document.querySelector(".header-nav");
let h1Responsive = document.querySelector(".h1-responsive");
let bubbleNav = document.querySelector(".bubble-nav");
let backgroundResponsive = document.querySelector("background-responsive");
let navElements = document.querySelectorAll("header nav ul li a");


// Menu de navigation responsive
function responsiveNav() {
    bubbleNav.addEventListener("click", function () {
      if (!header.classList.contains("background-responsive")) {
        header.classList.add("background-responsive");
        headerNav.style.display = "flex";
        h1Responsive.style.color = "white";
      } else {
        header.classList.remove("background-responsive");
        headerNav.style.display = "none";
        h1Responsive.style.color = "#B1663C";
      }
    });
  
    if (window.matchMedia("(max-width: 605px)").matches) {
      navElements.forEach((element) => {
        element.addEventListener("click", function () {
          header.classList.remove("background-responsive");
          headerNav.style.display = "none";
          h1Responsive.style.color = "#B1663C";
        });
      });
    }
  }
  responsiveNav();
// Variables navigation
let header = document.querySelector("header");
let headerNav = document.querySelector(".header-nav");
let h1Responsive = document.querySelector(".h1-responsive");
let bubbleNav = document.querySelector(".bubble-nav");
let backgroundResponsive = document.querySelector("background-responsive");
let navElements = document.querySelectorAll("header nav ul li a");

// Menu de navigation responsive

function toggleNav() {
  header.classList.toggle("background-responsive");
  headerNav.style.display = header.classList.contains("background-responsive") ? "flex" : "none";
  h1Responsive.style.color = header.classList.contains("background-responsive") ? "white" : "#B1663C";
}

bubbleNav.addEventListener("click", toggleNav);
 
// window.addEventListener("resize", function(){
// if (window.innerWidth > 605 && window.innerWidth < 655) {
 
//   location.reload()} 
//   console.log("yess");
// })

if (window.innerWidth < 605) {
  navElements.forEach((element) => {
    element.addEventListener("click", function () {
      header.classList.remove("background-responsive");
      headerNav.style.display = "none";
      h1Responsive.style.color = "#B1663C";
    });
  });
}

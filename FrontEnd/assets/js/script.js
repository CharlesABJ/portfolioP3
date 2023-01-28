// Variables navigation
let header = document.querySelector("header");
let headerNav = document.querySelector(".header-nav");
let h1Responsive = document.querySelector(".h1-responsive");
let bubbleNav = document.querySelector(".bubble-nav");
let backgroundResponsive = document.querySelector("background-responsive");
let navElements = document.querySelectorAll("header nav ul li a");

// Variables travaux
let galleryGrid = document.querySelector(".gallery-grid");
let figures = [];

// Variables filtres
let elementsFilter = document.querySelectorAll(".elements-filter");
let all = document.querySelector(".all");
let objects = document.querySelector(".objects-button");
let appartments = document.querySelector(".appartments-button");
let restaurants = document.querySelector(".restaurants-button");

//=======================================================================

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

// Appel de l'API en GET
const worksApi = "http://localhost:5678/api/works";

async function getWorks() {
  try {
    const response = await fetch(worksApi);
    const data = await response.json();

    for (let i in data) {
      let figure = document.createElement("figure");
      let img = document.createElement("img");
      let figcaption = document.createElement("figcaption");

      figure.setAttribute("data-category-id", data[i].category.id);
      img.setAttribute("src", data[i].imageUrl);
      img.setAttribute("alt", data[i].title);
      img.setAttribute("crossorigin", "anonymous");
      figcaption.innerHTML = data[i].title;

      figures.push(figure);

      galleryGrid.append(figure);
      figure.append(img, figcaption);
    }
  } catch (error) {
    console.error("Warning : " + error);
  }
}

getWorks();

// Filtres

for (let element of elementsFilter) {
  element.addEventListener("click", function () {
    for (let e of elementsFilter) {
      e.classList.remove("active");
    }
    this.classList.add("active");
    for (let figure of figures) {
      if (
        figure.getAttribute("data-category-id") ===
        element.getAttribute("data-category-id")
      ) {
        figure.style.display = "block";
      } else if (element === all) {
        figure.style.display = "block";
      } else {
        figure.style.display = "none";
      }
    }
  });
}

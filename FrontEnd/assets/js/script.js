// Variables travaux
let galleryGrid = document.querySelector(".galleryGrid");
let figures = [];
// Variables filtres
let filterElements = document.querySelectorAll(".filterElements");
let all = document.querySelector(".all");
let objects = document.querySelector(".objects-button");
let appartments = document.querySelector(".appartments-button");
let restaurants = document.querySelector(".restaurants-button");

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

for (let element of filterElements) {
  element.addEventListener("click", function () {
    for (let e of filterElements) {
      e.classList.remove("active");
    }
    this.classList.add("active");
    for (let figure of figures) {
      objects.setAttribute("data-category-id", 1);
      appartments.setAttribute("data-category-id", 2);
      restaurants.setAttribute("data-category-id", 3);
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

// Menu de navigation responsive
function responsiveNav() {
  

let header = document.querySelector("header");
let headerNav = document.querySelector(".headerNav");
let h1Responsive = document.querySelector(".h1Responsive");
let bubbleNav = document.querySelector(".bubbleNav");
let backgroundResponsive = document.querySelector("backgroundResponsive");

bubbleNav.addEventListener("click", function () {
  header.classList.add("backgroundResponsive")
  headerNav.style.display="flex"
  h1Responsive.style.color = "white";
});
}
responsiveNav()
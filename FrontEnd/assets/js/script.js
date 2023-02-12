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

// Appel des travaux via l'API en GET
let worksApi = "http://localhost:5678/api/works";

async function getWorks() {
  try {
    const response = await fetch(worksApi);
    dataWorks = await response.json();
    // localStorage.setItem("dataWorks", JSON.stringify(dataWorks)) //Création d'un item dataWorks permettant d'eviter de relancer l'appel fetch pour l'affichage des travaux en GET

    for (let i in dataWorks) {
      let figure = document.createElement("figure");
      let img = document.createElement("img");
      let figcaption = document.createElement("figcaption");

      figure.setAttribute("data-category-id", dataWorks[i].category.id);
      figure.setAttribute("data-id", dataWorks[i].id);
      img.setAttribute("src", dataWorks[i].imageUrl);
      img.setAttribute("alt", dataWorks[i].title);
      img.setAttribute("crossorigin", "anonymous");
      figcaption.innerHTML = dataWorks[i].title;

      figure.append(img, figcaption);
      galleryGrid.append(figure);

      figures.push(figure); //On push chaque figure dans le tableau figures de manière à pouvoir utiliser chaque figure à l'exterieur de la boucle
    }
  } catch (error) {
    console.error("Warning : " + error);
  }
}

getWorks();

// Filtrer les travaux
for (let element of elementsFilter) {
  element.addEventListener("click", function () {
    for (let e of elementsFilter) {
      e.classList.remove("active");
    }
    element.classList.add("active");
    for (let figure of figures) {
      figure.style.display = figure.getAttribute("data-category-id") === element.getAttribute("data-category-id") ? "block" : element === all ? "block" : "none";
    }
  });
}

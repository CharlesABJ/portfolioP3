// Variables travaux
let galleryGrid = document.querySelector(".gallery-grid");
let figures = [];

// Variables filtres
let elementsFilter = document.querySelectorAll(".elements-filter");
let all = document.querySelector(".all");

//=======================================================================

// Appel des travaux via l'API en GET
let worksApi = "http://localhost:5678/api/works";

async function getWorks() {
  try {
    const response = await fetch(worksApi);
    data = await response.json();
    // localStorage.setItem("data", JSON.stringify(data)) //Création d'un item data permettant d'eviter de relancer l'appel fetch pour l'affichage des travaux en GET

    for (let i in data) {
      let figure = document.createElement("figure");
      let img = document.createElement("img");
      let figcaption = document.createElement("figcaption");

      figure.setAttribute("data-category-id", data[i].category.id);
      figure.setAttribute("data-id", data[i].id);
      img.setAttribute("src", data[i].imageUrl);
      img.setAttribute("alt", data[i].title);
      img.setAttribute("crossorigin", "anonymous");
      figcaption.innerHTML = data[i].title;

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

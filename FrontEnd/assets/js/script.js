// Variables travaux
const galleryGrid = document.querySelector(".gallery-grid");
const figures = [];

// Variables filtres
const elementsFilter = document.querySelectorAll(".elements-filter");
const all = document.querySelector(".all");

//=======================================================================

// Appel des travaux via l'API en GET
const worksApi = "https://sophie-bluel.herokuapp.com/api/works";

async function getWorks() {
  try {
    const response = await fetch(worksApi);
    const data = await response.json();

    for (let i in data) {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const figcaption = document.createElement("figcaption");

      figure.setAttribute("data-category-id", data[i].category.id);
      figure.setAttribute("data-id", data[i].id);
      figure.setAttribute("class", "works");
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
      figure.style.display =
        figure.getAttribute("data-category-id") ===
          element.getAttribute("data-category-id") || element === all
          ? "block"
          : "none";
    }
  });
}

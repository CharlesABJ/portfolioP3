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

// Appel de l'API en GET
let worksApi = "http://localhost:5678/api/works";
let dataWorks = []

async function getWorks() {
  try {
    const response = await fetch(worksApi);
    dataWorks = await response.json();
    localStorage.setItem("dataWorks", JSON.stringify(dataWorks))

    for (let i in dataWorks) {
      let figure = document.createElement("figure");
      let img = document.createElement("img");
      let figcaption = document.createElement("figcaption");

      figure.setAttribute("data-category-id", dataWorks[i].category.id);
      img.setAttribute("src", dataWorks[i].imageUrl);
      img.setAttribute("alt", dataWorks[i].title);
      img.setAttribute("crossorigin", "anonymous");
      figcaption.innerHTML = dataWorks[i].title;

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

// Variables travaux
let galleryGrid = document.querySelector(".galleryGrid");

// Variables filtres
let filterElements = document.querySelectorAll(".filterElements");
let all = document.querySelector(".all");
let objects = document.querySelector(".objects-button");
let appartments = document.querySelector(".appartments-button");
let restaurants = document.querySelector(".restaurants-button");

// Appel de l'API en GET
const worksApi = "http://localhost:5678/api/works";

async function getWorks() {
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

    galleryGrid.append(figure);
    figure.append(img, figcaption);
  }
}

getWorks();


// Filtres

filterElements.forEach((element) =>{
    element.addEventListener("click", () => {
            filterElements.forEach((e)=> {
                e.classList.remove("active")
            });
            
        }
        element.classList.add("active")
    });
})


let works = [];
// function
const showAllWorks = (works) => {
  // ici works est seulement un argument

  // tableau works qui regroupe tout les .work prennent la class show-test

  works = document.getElementsByClassName("work");
  for (let i of works) {
    works[i].classList.add("show-test");
  }
};
// Appel des function
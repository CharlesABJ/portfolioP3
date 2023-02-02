// Variables identifiant login
let userToken = sessionStorage.getItem("token");
let login = document.querySelector(".login");
let logout = document.querySelector(".logout");
let hiddenElements = document.querySelectorAll(".hidden");

// Variables modales
let modalContainer = document.querySelectorAll(".modal-container");
let triggerButtons = document.querySelectorAll(".modal-trigger");
let publishChanges = document.querySelector(".edition-mode button");

let editGalleryGrid = document.querySelector(".edit-gallery-grid")

//=======================================================================

// identification du token
if (userToken) {
  for (let element of hiddenElements) {
    element.classList.remove("hidden");
  }
  login.style.display = "none";
}

logout.addEventListener("click", function () {
  logout.style.display = "none";
  login.style.display = "block";
  sessionStorage.removeItem("token");
  for (let element of hiddenElements) {
    element.classList.add("hidden");
  }
  location.href = "index.html";
});


// Appel de l'API en GET
const worksApii = "http://localhost:5678/api/works";

async function getWorks() {
  try {
    const response = await fetch(worksApii);
    const data = await response.json();

    for (let i in data) {
      let figure = document.createElement("figure");
      let img = document.createElement("img");
      let figcaption = document.createElement("figcaption");

      figure.setAttribute("data-category-id", data[i].category.id);
      img.setAttribute("src", data[i].imageUrl);
      img.setAttribute("alt", data[i].title);
      img.setAttribute("crossorigin", "anonymous");
      figcaption.innerHTML = "éditer";

      figures.push(figure);

      editGalleryGrid.append(figure);
      figure.append(img, figcaption);

    }
  } catch (error) {
    console.error("Warning : " + error);
  }
}

getWorks();



// Modales

for (let button of triggerButtons) {
  button.addEventListener("click", function () {
    for (let container of modalContainer) {
      container.classList.remove("active-modal");
      if (
        container.getAttribute("data-modal") ===
        button.getAttribute("data-modal")
      ) {
        container.classList.add("active-modal");
      }
    }
  });
}

publishChanges.addEventListener("click", function () {
  console.log("youhouu");
});

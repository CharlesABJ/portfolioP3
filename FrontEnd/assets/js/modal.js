// Variables identifiant login
let userToken = localStorage.getItem("token");
let login = document.querySelector(".login");
let logout = document.querySelector(".logout");
let hiddenElements = document.querySelectorAll(".hidden");

// Variables modales
let modalContainer = document.querySelectorAll(".modal-container");
let triggerButtons = document.querySelectorAll(".modal-trigger");
let publishChanges = document.querySelector(".edition-mode button");

// modale Présentation

let presentation = document.getElementById("presentation")
let paragraphArticle = document.querySelectorAll("article p")
let textareaValue = document.querySelector(".textarea-value")
let submitTextarea = document.querySelector(".submit-textarea")


let editGalleryGrid = document.querySelector(".edit-gallery-grid")
let figuress = [];

//=======================================================================

// identification du token
if (userToken) {
  for (let element of hiddenElements) {
    element.classList.remove("hidden");
  }
  login.style.display = "none";
}


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
      let trashZone = document.createElement("div")
      let trashIcon = document.createElement("img");

      figure.setAttribute("data-category-id", data[i].category.id);
      img.setAttribute("src", data[i].imageUrl);
      img.setAttribute("alt", data[i].title);
      img.setAttribute("crossorigin", "anonymous");
      figcaption.innerHTML = "éditer";
      trashZone.classList.add("trash-zone")
      trashIcon.classList.add("trash-icon")
      trashIcon.setAttribute("src", "/./FrontEnd/assets/icons/trash.svg");

      figuress.push(figure);

      editGalleryGrid.append(figure);
      figure.append(img, figcaption, trashZone);
      trashZone.append(trashIcon)
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


logout.addEventListener("click", function () {
  logout.style.display = "none";
  login.style.display = "block";
  localStorage.removeItem("token");
  for (let element of hiddenElements) {
    element.classList.add("hidden");
  }
  location.href = "index.html";
});


//  modale présentation

submitTextarea.addEventListener("click", function(){
  for(let p of paragraphArticle){
    if (!p.classList.contains("modal-trigger")&& !p.classList.contains("textarea-value"))  {
      p.style.display="none"
    }
    
  }
  textareaValue.innerHTML = presentation.value.replace(/\n/g, "<br/>")

})
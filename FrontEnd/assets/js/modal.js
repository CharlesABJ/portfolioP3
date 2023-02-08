// Variables identifiant login
let userToken = localStorage.getItem("token");
let login = document.querySelector(".login");
let logout = document.querySelector(".logout");
let hiddenElements = document.querySelectorAll(".hidden");

// Variables modales
let modalContainer = document.querySelectorAll(".modal-container");
let triggerButtons = document.querySelectorAll(".modal-trigger");
let publishChanges = document.querySelector(".edition-mode button");

// portrait
let inputPortrait = document.getElementById("portrait");
let imgPortrait = document.querySelector(".portrait");
let submitPortrait = document.querySelector(".submit-portrait");

// présentation
let inputPresentation = document.getElementById("presentation");
let paragraphArticle = document.querySelectorAll("article p");
let textareaValue = document.querySelector(".textarea-value");
let submitTextarea = document.querySelector(".submit-textarea");

// travaux
let editGalleryGrid = document.querySelector(".edit-gallery-grid");
let figureArray = [];
let trashIcons = [];
let mainModal = document.querySelector(".main-modal");
let deletAllWorksButton = document.querySelector(".delete-all-works");
let select = document.querySelector("select")
let addWorkButton = document.querySelector(".add-work");
let addWorkModal = document.querySelector(".add-work-modal");

//=======================================================================

// identification du token
if (userToken) {
  for (let element of hiddenElements) {
    element.classList.remove("hidden");
  }
  login.style.display = "none";
}

// Appel de l'API
let data = JSON.parse(localStorage.getItem("dataWorks"));
for (let i in data) {
  let figure = document.createElement("figure");
  let img = document.createElement("img");
  let figcaption = document.createElement("figcaption");
  let trashZone = document.createElement("div");
  let trashIcon = document.createElement("img");

  figure.setAttribute("data-category-id", data[i].category.id);
  figure.setAttribute("data-works-id", data[i].id);
  img.setAttribute("src", data[i].imageUrl);
  img.setAttribute("alt", data[i].title);
  img.setAttribute("crossorigin", "anonymous");
  figcaption.innerHTML = "éditer";
  trashZone.classList.add("trash-zone");
  trashIcon.classList.add("trash-icon");
  trashIcon.setAttribute("src", "/./FrontEnd/assets/icons/trash.svg");
  trashIcon.setAttribute("data-works-id", data[i].id);

  figureArray.push(figure);
  trashIcons.push(trashIcon);

  editGalleryGrid.append(figure);
  figure.append(img, figcaption, trashZone);
  trashZone.append(trashIcon);
}

// MODALES

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

//  Modale publication
publishChanges.addEventListener("click", function () {
  alert("youhouu");
});

//  Modale déconnexion
logout.addEventListener("click", function () {
  logout.style.display = "none";
  login.style.display = "block";
  localStorage.removeItem("token");
  for (let element of hiddenElements) {
    element.classList.add("hidden");
  }
  location.href = "index.html";
});

//  Modale portrait
// inputPortrait.addEventListener("change", function(){
//   let file = inputPortrait.files[0];
// })
// let reader = new FileReader()
// reader.addEventListener("load", function(){
//   imgPortrait.src = reader.result
// })

// reader.readAsDataURL(file)

//  Modale présentation
submitTextarea.addEventListener("click", function () {
  if (inputPresentation.value.trim() !== "") {
    for (let p of paragraphArticle) {
      if (
        !p.classList.contains("modal-trigger") &&
        !p.classList.contains("textarea-value")
      ) {
        p.style.display = "none";
      }
    }

    textareaValue.innerHTML = inputPresentation.value.replace(/\n/g, "<br/>");
  }
});

// modales works

// Ajouter un travail
addWorkButton.addEventListener("click", async function () {
  try {
    let response = await fetch("http://localhost:5678/api/categories");
    let data = await response.json();

    for (let i in data) {
      let option = document.createElement("option");

      option.setAttribute("value", data[i].id);
      option.innerHTML = data[i].name;

      select.append(option)
    }
  } catch (error) {
    console.error(error);
  }
  addWorkModal.style.display = "block";
});

document.querySelector(".back").addEventListener("click", function () {
  addWorkModal.style.display = "none";
  mainModal.classList.add("active-modal");
});

// Supprimer un travail
for (let trash of trashIcons) {
  trash.addEventListener("click", async function () {
    let workId = trash.getAttribute("data-works-id");
    try {
      let response = await fetch(`http://localhost:5678/api/works/${workId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'élément");
      }
      console.log("L'élément a été supprimé avec succès");
    } catch (error) {
      console.error(error);
    }
  });
}

// Supprimer tous les travaux
deletAllWorksButton.addEventListener("click", async function () {
  try {
    let workId = 0;
    for (let i in data) {
      workId++;
      let response = await fetch(`http://localhost:5678/api/works/${workId}`, {
        method: "DELETE",
      });
    }
    if (!response.ok) {
      throw new Error("Erreur lors de la suppression des éléments");
    }
    console.log("Les éléments ont été supprimé avec succès");
  } catch (error) {
    console.error(error);
  }
});

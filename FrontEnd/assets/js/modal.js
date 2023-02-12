// Variables login, logout & mode edition
const userToken = sessionStorage.getItem("token");
const login = document.querySelector(".login");
const logout = document.querySelector(".logout");
const hiddenElements = document.querySelectorAll(".hidden");
const publishChanges = document.querySelector(".edition-mode button");

// Variables pour les modales :
const modalContainer = document.querySelectorAll(".modal-container");
const triggerButtons = document.querySelectorAll(".modal-trigger");

// modale portrait
const inputPortrait = document.getElementById("portrait");
const imgPortrait = document.querySelector(".portrait");
const submitPortrait = document.querySelector(".submit-portrait");

// modale présentation
let inputModalPresentation = document.getElementById("presentation");
let oldTextPresentation = document.querySelector(".old-text-presentation");
let newTextPresentation = document.querySelector(".new-text-presentation");
let submitTextPresentation = document.querySelector(".submit-textarea");

// modale gestion de travaux
let editGalleryGrid = document.querySelector(".edit-gallery-grid");
let trashIcons = [];
let mainModal = document.querySelector(".main-modal");
let deletAllWorksButton = document.querySelector(".delete-all-works-button");
let imgInput = document.querySelector("#file-input");
let titleInput = document.querySelector("#title-input");
let select = document.querySelector("select");
let option = document.querySelectorAll("option");
let addWorkButton = document.querySelector(".add-work-button");
let confirmAddWorkButton = document.querySelector(".confirm-add-work-button");
let inputImages = document.querySelectorAll(".image-input");
let previewImages = document.querySelectorAll(".preview-image");

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
  figure.setAttribute("data-id", data[i].id);
  img.setAttribute("src", data[i].imageUrl);
  img.setAttribute("alt", data[i].title);
  img.setAttribute("crossorigin", "anonymous");
  figcaption.innerHTML = "éditer";
  trashZone.classList.add("trash-zone");
  trashIcon.classList.add("trash-icon");
  trashIcon.setAttribute("src", "./assets/icons/trash.svg");
  trashIcon.setAttribute("data-works-id", data[i].id);

  trashIcons.push(trashIcon);

  trashZone.append(trashIcon);
  figure.append(img, figcaption, trashZone);
  editGalleryGrid.append(figure);
}

// MODALES

// for (let button of triggerButtons) {
//   button.addEventListener("click", function () {
//     if (header.classList.contains("background-responsive")) {
//       header.classList.remove("background-responsive");
//       headerNav.style.display = "none";
//       h1Responsive.style.color = "#B1663C";
//     }
//     for (let container of modalContainer) {
//       container.classList.remove("active-modal");
//       if (
//         container.getAttribute("data-modal") ===
//         button.getAttribute("data-modal")
//       ) {
//         container.classList.add("active-modal");
//       }
//     }
//   });
// }

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

// Affichage des images
for (let inputImage of inputImages) {
  inputImage.addEventListener("change", function () {
    let reader = new FileReader();
    reader.onload = function () {
      for (let image of previewImages) {
        image.src = reader.result;
      }
    };
    document.querySelectorAll(".hidden-to-preview").forEach((e) => {
      e.style.opacity = "0";
    });

    reader.readAsDataURL(inputImage.files[0]);
    for (let image of previewImages) {
      image.style.display = "block";
    }
  });
}

//  Modale portrait
submitPortrait.addEventListener("click", function () {
  console.log("yes");
  document.querySelector(".portrait").style.display = "none";
  let img = document.querySelector(".image-input-value");
  img.setAttribute("src", inputPortrait.value);
  console.log(inputPortrait.value);
  img.style.display = "block";
});

//  Modale présentation
submitTextPresentation.addEventListener("click", function () {
  if (inputModalPresentation.value.trim() !== "") {
    oldTextPresentation.style.display = "none";
  }
  newTextPresentation.innerHTML = inputModalPresentation.value.replace(
    /\n/g,
    "<br/>"
  );
});

// Modales gestion de travaux
let modalTrigger = document.querySelectorAll(".modal-trigger")

for (let trigger of modalTrigger){
trigger.addEventListener("click", function(){
  if ( document.querySelector(".edit-works-modal").classList.contains("active-modal")) {
      document.querySelector(".edit-works-modal").classList.remove("active-modal");
  } else{
    document.querySelector(".edit-works-modal").classList.add("active-modal");
  }
 
})
}

addWorkButton.addEventListener("click", function(){
  console.log("yessss");
  document.querySelector(".delete-works-modal").classList.add("modal-hidden")
  document.querySelector(".add-works-modal").classList.remove("modal-hidden")
})

document.querySelector(".back").addEventListener("click", function () {
  document.querySelector(".add-works-modal").classList.add("modal-hidden")
  document.querySelector(".delete-works-modal").classList.remove("modal-hidden")
});

// modale ajouter un travail
addWorkButton.addEventListener("click", async function () {
  try {
    let response = await fetch("http://localhost:5678/api/categories");
    let data = await response.json();
    for (let i in data) {
      let option = document.createElement("option");

      option.setAttribute("value", data[i].id);
      option.innerHTML = data[i].name;

      select.append(option);
    }
  } catch (error) {
    console.error(error);
  }

  addWorkButton.style.display = "block";
});

let modalInputs = document.querySelectorAll(".add-modal input");
let modalSelects = document.querySelectorAll(".add-modal select");

// Changer le boutton de confirmation lorsque les champs sont remplis
function updateConfirmButton() {
  if (
    titleInput.value.trim() !== "" &&
    select.value !== "no-value" &&
    imgInput.value !== ""
  ) {
    confirmAddWorkButton.classList.add("completed");
  } else {
    confirmAddWorkButton.classList.remove("completed");
  }
}

for (let input of modalInputs) {
  input.addEventListener("input", updateConfirmButton);
}

for (let option of modalSelects) {
  option.addEventListener("change", updateConfirmButton);
}

// Création d'un projet lorsqu'on clique sur le bouton de validation
confirmAddWorkButton.addEventListener("click", async function () {
  if (confirmAddWorkButton.classList.contains("completed")) {
    let postApi = "http://localhost:5678/api/works";
    let fetchInit = {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${userToken}`,
        "Content-Type": "multipart/form-data",
      },
      body: JSON.stringify({
        image: imgInput.value,
        title: titleInput.value,
        category: option.value,
      }),
    };
    try {
      let response = await fetch(postApi, fetchInit);
      if (response.ok) {
        let data = await response.json();
        let figure = document.createElement("figure");
        let img = document.createElement("img");
        let figcaption = document.createElement("figcaption");

        figure.setAttribute("data-category-id", option.value);
        img.setAttribute("src", imgInput.value);
        img.setAttribute("alt", titleInput.value);

        figcaption.innerHTML = titleInput.value;

        galleryGrid.append(figure);
        figure.append(figcaption);

        addWorkButton.style.display = "none";
        mainModal.classList.add("active-modal");
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log("Veuillez remplir tous les champs");
  }
});


// Supprimer un travail
async function deleteWork(workId) {
  try {
    let fetchInit = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    let response = await fetch(
      `http://localhost:5678/api/works/${workId}`,
      fetchInit
    );
    if (!response.ok) {
      throw new Error("Erreur lors de la suppression de l'élément");
    }
    console.log("L'élément a été supprimé avec succès");
  } catch (error) {
    console.error(error);
  }
}

// Pour un travail
for (let trash of trashIcons) {
  trash.addEventListener("click", function () {
    let workId = trash.getAttribute("data-works-id");
    deleteWork(workId);
  });
}

// Pour tous les travaux
deletAllWorksButton.addEventListener("click", async function () {
  try {
    for (let i in data) {
      let workId = data[i].id;
      deleteWork(workId);
    }
    if (!response.ok) {
      throw new Error("Erreur lors de la suppression des éléments");
    }
    console.log("Les éléments ont été supprimé avec succès");
  } catch (error) {
    console.error(error);
  }
});

// Variables login, logout & mode edition
const userToken = sessionStorage.getItem("token");
const login = document.querySelector(".login");
const logout = document.querySelector(".logout");
const hiddenElements = document.querySelectorAll(".hidden");
const publishChanges = document.querySelector(".edition-mode button");

// Variables pour les modales :
let modalContainer = document.querySelectorAll(".modal-container");
let triggerButtons = document.querySelectorAll(".modal-trigger");
let deleteWorksModal = document.querySelector(".delete-works-modal");
let addWorksModal = document.querySelector(".add-works-modal");
let overlayModal = document.querySelectorAll(".overlay");
let MAX_FILE_SIZE = 4 * 1024 * 1024;
// modale portrait
const inputPortrait = document.getElementById("portrait");
const imgPortrait = document.querySelector(".portrait");
let newPortrait = document.querySelector(".new-portrait");
const submitPortrait = document.querySelector(".submit-portrait");

// modale présentation
let inputModalPresentation = document.getElementById("presentation");
let oldTextPresentation = document.querySelector(".old-text-presentation");
let newTextPresentation = document.querySelector(".new-text-presentation");
let submitTextPresentation = document.querySelector(".submit-textarea");

// modale gestion de travaux
let editGalleryGrid = document.querySelector(".edit-gallery-grid");
let trashIcons = [];
let backButton = document.querySelector(".back-button");
let deletAllWorksButton = document.querySelector(".delete-all-works-button");
let modalInputs = document.querySelectorAll(".add-works-modal input");
let modalSelects = document.querySelectorAll(".add-works-modal select");
let imgInput = document.getElementById("file-input");
let titleInput = document.getElementById("title-input");
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

// MODALES

for (let button of triggerButtons) {
  button.addEventListener("click", function () {
    if (header.classList.contains("background-responsive")) {
      header.classList.remove("background-responsive");
      headerNav.style.display = "none";
      h1Responsive.style.color = "#B1663C";
    }
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
  if (confirm("Voulez vous mettre à jour les changements")) {
    console.log("Les changements ont été mis à jour");
  }
});

//  Modale déconnexion
logout.addEventListener("click", function () {
  logout.style.display = "none";
  login.style.display = "block";
  sessionStorage.removeItem("token");
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
        if (image.size >= MAX_FILE_SIZE) {
          image.src = reader.result;
        } else {
          console.log("nooo");
        }
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
if (inputPortrait.value !== "") {
  submitPortrait.classList.add("modal-trigger");
}
submitPortrait.addEventListener("click", function () {
  let reader = new FileReader();
  reader.onload = function () {
    newPortrait.src = reader.result;
  };

  reader.readAsDataURL(inputPortrait.files[0]);
  imgPortrait.style.display = "none";
  newPortrait.style.display = "block";
  document.querySelectorAll(".hidden-to-preview").forEach((e) => {
    e.style.opacity = "1";
  });
  for (let image of previewImages) {
    image.src = "";
    image.style.display = "none";
  }
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

// MODALES GESTION DE TRAVAUX

// modale pour ajouter un travail
addWorkButton.addEventListener("click", async function () {
  deleteWorksModal.classList.add("modal-hidden");
  addWorksModal.classList.remove("modal-hidden");
  for (let overlay of overlayModal) {
    overlay.classList.remove("modal-trigger");
  }
});

async function getCategoryOnSelect() {
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
}

getCategoryOnSelect();

// Retourner sur l'ancienne modale
backButton.addEventListener("click", function () {
  addWorksModal.classList.add("modal-hidden");
  deleteWorksModal.classList.remove("modal-hidden");
  for (let overlay of overlayModal) {
    overlay.classList.add("modal-trigger");
  }
});

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

    let formData = new FormData();
    formData.append("title", titleInput.value);
    formData.append("image", imgInput.files[0]);
    formData.append("category", select.value);

    let fetchInit = {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${userToken}`,
        // "Content-Type": "multipart/form-data",
      },
      body: formData,
    };
    try {
      let response = await fetch(postApi, fetchInit);
      if (response.ok) {
        let figure = document.createElement("figure");
        let img = document.createElement("img");
        let figcaption = document.createElement("figcaption");

        figure.setAttribute("data-category-id", select.value);
        img.setAttribute("src", imgInput.value);
        img.setAttribute("alt", titleInput.value);

        figcaption.innerHTML = titleInput.value;

        galleryGrid.append(figure);
        figure.append(figcaption);
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
function initDeleteWorks() {
  // pour un travail
  for (let trash of trashIcons) {
    trash.addEventListener("click", function () {
      let workId = trash.getAttribute("data-id");
      deleteWork(workId);
    });
  }

  // pour tous les travaux
  deletAllWorksButton.addEventListener("click", async function () {
    if (confirm("Êtes-vous sûr de vouloir supprimer tout les travaux ?")) {
      try {
        for (let i in data) {
          let workId = data[i].id;

          deleteWork(workId);
        }
        if (!response.ok) {
          throw new Error("Erreur lors de la suppression des éléments");
        }
      } catch (error) {
        console.error(error);
      }
    }
  });
}

// Appel de l'API
const worksModalApi = "http://localhost:5678/api/works";
async function getWorksInModal() {
  try {
    response = await fetch(worksModalApi);
    data = await response.json();

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
      trashIcon.setAttribute("data-id", data[i].id);

      trashZone.append(trashIcon);
      figure.append(img, figcaption, trashZone);
      editGalleryGrid.append(figure);

      trashIcons.push(trashIcon); //On push chaque trashIcone dans le tableau trashIcons de manière à pouvoir utiliser chaque icone à l'exterieur de la boucle
    }
    initDeleteWorks();
  } catch (error) {
    console.error("Warning : " + error);
  }
}
getWorksInModal();
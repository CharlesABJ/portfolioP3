const figuresWorks = document.querySelectorAll("figure.works");

// Variables login, logout & mode edition
const userToken = sessionStorage.getItem("token");
const login = document.querySelector(".login");
const logout = document.querySelector(".logout");
const hiddenElements = document.querySelectorAll(".hidden");

// Variables pour les modales :
const modalContainer = document.querySelectorAll(".modal-container");
const triggerButtons = document.querySelectorAll(".modal-trigger");
const deleteWorksModal = document.querySelector(".delete-works-modal");
const addWorksModal = document.querySelector(".add-works-modal");
const allowedExtensions = ["jpg", ".jpeg", ".png"];
const maxFileSize = 4 * 1024 * 1024; //4Mo
// modale portrait
const inputPortrait = document.getElementById("portrait");
const imgPortrait = document.querySelector(".portrait");
const newPortrait = document.querySelector(".new-portrait");
const submitPortrait = document.querySelector(".submit-portrait");

// modale présentation
const inputModalPresentation = document.getElementById("presentation");
const oldTextPresentation = document.querySelector(".old-text-presentation");
const newTextPresentation = document.querySelector(".new-text-presentation");
const submitTextPresentation = document.querySelector(".submit-textarea");

// modale gestion de travaux
// const galleryGrid = document.querySelector(".gallery-grid");
const editGalleryGrid = document.querySelector(".edit-gallery-grid");
const trashIcons = [];
const backButton = document.querySelector(".back-button");
const deletAllWorksButton = document.querySelector(".delete-all-works-button");
const modalInputs = document.querySelectorAll(".add-works-modal input");
const modalSelects = document.querySelectorAll(".add-works-modal select");
const formAddWorks = document.querySelector(".upload-edit-gallery");
const imgInput = document.getElementById("file-input");
const titleInput = document.getElementById("title-input");
const select = document.querySelector("select");
const addWorkButton = document.querySelector(".add-work-button");
const confirmAddWorkButton = document.querySelector(".confirm-add-work-button");
const inputImages = document.querySelectorAll(".image-input");
const previewImages = document.querySelectorAll(".preview-image");

//=======================================================================

// identification du token pour afficher le mode édition
if (userToken) {
  for (let element of hiddenElements) {
    element.classList.remove("hidden");
  }
  login.style.display = "none";
}

// MODALES
// Faire apparaître et disparaître les modales grâce aux boutons déclencheurs
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

//  Modale de déconnexion
logout.addEventListener("click", function () {
  logout.style.display = "none";
  login.style.display = "block";
  sessionStorage.removeItem("token");
  for (let element of hiddenElements) {
    element.classList.add("hidden");
  }
  location.href = "index.html";
});

// Prévisualiser l'image uploadée dans la modale
for (let inputImage of inputImages) {
  inputImage.addEventListener("change", function () {
    const file = inputImage.files[0];

    if (!allowedExtensions.some((e) => file.name.toLowerCase().endsWith(e))) {
      alert(`Veuillez mettre une image "jpg" ou "png"`);
      return;
    }

    if (file.size > maxFileSize) {
      alert("Image trop volumineuse !");
      return;
    }

    let reader = new FileReader();
    reader.readAsDataURL(inputImage.files[0]);

    reader.onload = function () {
      for (let image of previewImages) {
        image.src = reader.result;
      }
    };

    document.querySelectorAll(".hidden-to-preview").forEach((e) => {
      e.style.opacity = "0";
    });

    for (let image of previewImages) {
      image.style.display = "block";
    }
  });
}

//  Retirer l'image uploadée dans la modale
function removePreviewImage() {
  document.querySelectorAll(".hidden-to-preview").forEach((e) => {
    e.style.opacity = "1";
  });
  for (let image of previewImages) {
    image.src = "";
    image.style.display = "none";
  }
}

//  Remplacer le portrait par l'image uploadée
submitPortrait.addEventListener("click", function () {
  removePreviewImage();
  const reader = new FileReader();
  reader.readAsDataURL(inputPortrait.files[0]);
  reader.onload = function () {
    newPortrait.src = reader.result;
  };

  imgPortrait.remove();
  newPortrait.style.display = "block";
});

//  Modale présentation
submitTextPresentation.addEventListener("click", function () {
  if (inputModalPresentation.value.trim() == "") {
    return;
  } else {
    oldTextPresentation.remove();
  }
  newTextPresentation.innerHTML = inputModalPresentation.value.replace(
    /\n/g,
    "<br/>"
  );
});

// MODALES GESTION DE TRAVAUX
// Appel de l'API
// let data;
// let response;
const worksModalApi = "https://sophie-bluel.herokuapp.com/api/works";
async function getWorksInModal() {
  response = await fetch(worksModalApi);
  data = await response.json();
  try {
    for (let i in data) {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const figcaption = document.createElement("figcaption");
      const trashZone = document.createElement("div");
      const trashIcon = document.createElement("img");

      figure.setAttribute("data-category-id", data[i].category.id);
      figure.setAttribute("data-id", data[i].id);
      figure.setAttribute("class", "works");
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

// Supprimer des travaux
async function deleteWork(workId) {
  try {
    const fetchInit = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    const response = await fetch(
      `https://sophie-bluel.herokuapp.com/api/works/${workId}`,
      fetchInit
    );
    if (response.ok) {
      const figures = document.querySelectorAll("figure");
      for (let figure of figures) {
        if (figure.getAttribute("data-id") === workId) {
          figure.remove();
          console.log(
            `${figure.querySelector("img").alt} a été supprimé avec succès`
          );
        }
      }
    } else throw new Error("Erreur lors de la suppression de l'élément");
  } catch (error) {
    console.error(error);
  }
}

function initDeleteWorks() {
  // pour un travail
  for (let trash of trashIcons) {
    trash.addEventListener("click", function () {
      const workId = trash.getAttribute("data-id");
      deleteWork(workId);
    });
  }

  // pour tous les travaux
  deletAllWorksButton.addEventListener("click", async function () {
    if (confirm("Êtes-vous sûr de vouloir supprimer tous les travaux ?")) {
      try {
        for (let i in data) {
          const workId = data[i].id;
          deleteWork(workId);
        }
        galleryGrid.innerHTML = "";
        editGalleryGrid.innerHTML = "";
        console.log("Tous les travaux ont été supprimés");
        if (!response.ok) {
          throw new Error("Erreur lors de la suppression des éléments");
        }
      } catch (error) {
        console.error(error);
      }
    }
  });
}

// Accéder à la modale servant à ajouter un travail
addWorkButton.addEventListener("click", async function () {
  deleteWorksModal.classList.add("modal-hidden");
  addWorksModal.classList.remove("modal-hidden");
});

// Retourner sur la modale modale servant à supprimer des travaux
function backToDeleteWorksModal() {
  addWorksModal.classList.add("modal-hidden");
  deleteWorksModal.classList.remove("modal-hidden");
}
backButton.addEventListener("click", backToDeleteWorksModal);

// Ajouter dynamiquement les catégories dans les options de select
async function getCategoryOnSelect() {
  try {
    const response = await fetch(
      "https://sophie-bluel.herokuapp.com/api/categories"
    );
    const data = await response.json();
    for (let i in data) {
      const option = document.createElement("option");

      option.setAttribute("value", data[i].id);
      option.innerHTML = data[i].name;

      select.append(option);
    }
  } catch (error) {
    console.error(error);
  }
}
getCategoryOnSelect();

// Changer la couleur du boutton de confirmation lorsque les champs sont remplis
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
formAddWorks.addEventListener("submit", async function (event) {
  event.preventDefault();
  if (confirmAddWorkButton.classList.contains("completed")) {
    const postApi = "https://sophie-bluel.herokuapp.com/api/works";

    const formData = new FormData();
    formData.append("title", titleInput.value);
    formData.append("image", imgInput.files[0]);
    formData.append("category", select.value);

    const fetchInit = {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${userToken}`,
      },
      body: formData,
    };
    try {
      const response = await fetch(postApi, fetchInit);
      if (response.ok) {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");

        const reader = new FileReader();
        reader.readAsDataURL(imgInput.files[0]);
        reader.onload = function () {
          img.src = reader.result;
        };

        figure.setAttribute("data-category-id", select.value);
        figure.setAttribute("class", "works");
        img.setAttribute("alt", titleInput.value);
        figcaption.innerHTML = titleInput.value;

        galleryGrid.append(figure);
        figure.append(img, figcaption);

        for (let work of figuresWorks) {
          work.remove();
        }
        removePreviewImage();
        backToDeleteWorksModal();
        console.log(`${titleInput.value} a bien été ajouté aux travaux`);
        titleInput.value = "";
        select.value = "no-value";
        editGalleryGrid.innerHTML = "";
        getWorksInModal();
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    alert("Veuillez remplir tous les champs");
  }
});

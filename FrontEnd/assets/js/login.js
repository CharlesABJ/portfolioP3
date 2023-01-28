// Variables navigation
let header = document.querySelector("header");
let headerNav = document.querySelector(".header-nav");
let h1Responsive = document.querySelector(".h1-responsive");
let bubbleNav = document.querySelector(".bubble-nav");
let backgroundResponsive = document.querySelector("background-responsive");
let navElements = document.querySelectorAll("header nav ul li a");

// Variables formulaire login
let form = document.querySelector("form");
let eyeClosed = document.querySelector(".eye-closed");
let eyeOpen = document.querySelector(".eye-open");
let eyes = document.querySelectorAll(".eyes");

let errorConnect = document.querySelector(".error-connect");

// Menu de navigation responsive

function responsiveNav() {
  bubbleNav.addEventListener("click", function () {
    if (!header.classList.contains("background-responsive")) {
      header.classList.add("background-responsive");
      headerNav.style.display = "flex";
      h1Responsive.style.color = "white";
    } else {
      header.classList.remove("background-responsive");
      headerNav.style.display = "none";
      h1Responsive.style.color = "#B1663C";
    }
  });

  if (window.matchMedia("(max-width: 605px)").matches) {
    navElements.forEach((element) => {
      element.addEventListener("click", function () {
        header.classList.remove("background-responsive");
        headerNav.style.display = "none";
        h1Responsive.style.color = "#B1663C";
      });
    });
  }
}
responsiveNav();

// Appel de l'API
const loginApi = "http://localhost:5678/api/users/login";
async function postLogin(email, password) {
  let fetchInit = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  };
  try {
    const response = await fetch(loginApi, fetchInit);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Warning : " + error);
  }
}

form.addEventListener("submit", (input) => {
  let emailInput = document.getElementById("mail");
  let passwordInput = document.getElementById("password");
  input.preventDefault();
  postLogin(emailInput.value, passwordInput.value);
  if (postLogin == false) {
    location.href = "index.html";
  } else {
    errorConnect.classList.remove("hidden");
    errorConnect.innerHTML = "Erreur dans l’identifiant ou le mot de passe";
    passwordInput.style.outlineColor = "red";
    emailInput.style.outlineColor = "red";
  }
});

// Afficher/Masquer le mot de passe
eyes.forEach((eye) => {
  eye.addEventListener("click", () => {
    eyeClosed.classList.toggle("hidden");
    eyeOpen.classList.toggle("hidden");
    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
  });
});

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

// Appel de l'API en POST

const loginApi = "http://localhost:5678/api/users/login";

form.addEventListener("submit", async (submitButton) => {
  submitButton.preventDefault();
  let emailInput = document.getElementById("mail");
  let passwordInput = document.getElementById("password");

  let fetchInit = {
    method: "POST",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailInput.value,
      password: passwordInput.value,
    }),
  };
  try {
    const response = await fetch(loginApi, fetchInit);
    if (response.ok) {
      const data = await response.json();
      passwordInput.style.outlineColor = "green";
      emailInput.style.outlineColor = "green";
      sessionStorage.setItem("token", data.token);
      location.href = "index.html";
    } else {
      errorConnect.classList.remove("hidden");
      passwordInput.style.outlineColor = "red";
      emailInput.style.outlineColor = "red";
      if (response.status === 401) {
        errorConnect.innerHTML = "Mot de passe incorret";
      } else if (response.status === 404) {
        errorConnect.innerHTML = "Erreur dans l’identifiant ou le mot de passe";
      }
    }
  } catch (error) {
    console.error("Warning : " + error);
    //
  }
});

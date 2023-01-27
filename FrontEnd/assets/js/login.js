let form = document.querySelector("form");
let eyeClosed = document.querySelector(".eye-closed");
let eyeOpen = document.querySelector(".eye-open");
let eyes = document.querySelectorAll(".eyes");

let errorConnect = document.querySelector(".errorConnect");

// Appel de l'API
const loginApi = "http://localhost:5678/api/users/login";
async function postLogin() {
  let fetchInit = {
    method: "POST",
   headers: {
    "accept": "application/json",
   "Content-Type": "application/json"
   },
    body: JSON.stringify(user)
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
  postLogin(emailInput.value, passwordInput.value)
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


// // Menu de navigation responsive
// import {responsiveNav}
// from "./script"
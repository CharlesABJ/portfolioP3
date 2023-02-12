// Variables formulaire login
const form = document.querySelector("form");
const eyeClosed = document.querySelector(".eye-closed");
const eyeOpen = document.querySelector(".eye-open");
const eyes = document.querySelectorAll(".eyes");
const errorConnect = document.querySelector(".error-connect");

let emailInput = document.getElementById("mail");
let passwordInput = document.getElementById("password");

// Afficher & Masquer le mot de passe
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
let loginApi = "http://localhost:5678/api/users/login";

form.addEventListener("submit", async (submitButton) => {
  submitButton.preventDefault();

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
      emailInput.classList.add("input-success");
      passwordInput.classList.add("input-success");
      localStorage.setItem("token", data.token);
      location.href = "index.html";
    } else {
      errorConnect.classList.remove("hidden");
      emailInput.classList.add("input-error");
      passwordInput.classList.add("input-error");
      if (response.status === 401) {
        errorConnect.innerHTML = "Mot de passe incorret";
      } else if (response.status === 404) {
        errorConnect.innerHTML = "Erreur dans l’identifiant ou le mot de passe";
      }
    }
  } catch (error) {
    console.error("Warning : " + error);
  }
});

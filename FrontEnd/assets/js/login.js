let form = document.querySelector("form");
let emailInput = document.getElementById("mail");
let passwordInput = document.getElementById("password");
let eyeClosed = document.querySelector(".eye-closed");
let eyeOpen = document.querySelector(".eye-open");
let eyes = document.querySelectorAll(".eyes");

let errorConnect = document.querySelector(".errorConnect");

// Appel de l'API

const loginApi = "http://localhost:5678/api/users/login";

let fetchInit = {
  method: "POST"
}
async function postLogin() {
  const response = await fetch(loginApi,fetchInit);
  const data = await response.json();
  for (let i in data) {
    console.log(data[i].userId);
  }
  // l'APi ne renvoi rien => hypothèse : fetch() renvoit une methode Get de base ? trouver comment changer la méthode
}

postLogin();

form.addEventListener("submit", (input) => {
  input.preventDefault();
  if (
    emailInput.value === "sophie.bluel@test.tld" &&
    passwordInput.value === "S0phie"
  ) {
    location.href = "index.html";
  } else {
    errorConnect.classList.remove("hidden");
    errorConnect.innerHTML = "Erreur dans l’identifiant ou le mot de passe";
    passwordInput.style.outlineColor = "red";
    emailInput.style.outlineColor = "red";
  }
});

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

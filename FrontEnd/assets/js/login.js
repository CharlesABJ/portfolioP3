let form = document.querySelector("form");
let emailInput = document.getElementById("mail");
let passwordInput = document.getElementById("password");
let eyeClosed = document.querySelector(".eye-closed");
let eyeOpen = document.querySelector(".eye-open");
let eyes = document.querySelectorAll(".eyes");

let errorConnect = document.querySelector(".errorConnect");

// Appel de l'API

const loginApi = "http://localhost:5678/api/users/login";
async function postLogin() {
  let formData = new FormData();
  formData.append("email", emailInput.value);
  formData.append("password", passwordInput.value);

  let fetchInit = {
    method: "POST",
    body: formData,
  };
  try {
    const response = await fetch(loginApi, fetchInit);
    const data = await response.json();
    console.log(data);

    
  } catch (error) {
    console.error("oups " + error);
  }
  // l'APi ne renvoi rien => hypothèse : fetch() renvoit une methode Get de base ? trouver comment changer la méthode
}




form.addEventListener("submit", (input) => {
  input.preventDefault();
  postLogin();
//  if (formData === data.token) {
//   location.href = "index.html";
// } else {
//   errorConnect.classList.remove("hidden");
//   errorConnect.innerHTML = "Erreur dans l’identifiant ou le mot de passe";
//   passwordInput.style.outlineColor = "red";
//   emailInput.style.outlineColor = "red";
// }

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

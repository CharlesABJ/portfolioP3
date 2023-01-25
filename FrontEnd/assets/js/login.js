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
  const response = await fetch(loginApi);
  const data = await response.json();
  for (let i in data) {
    console.log(data[i].userId); 
  }
// l'APi ne renvoi rien => hypothèse : fetch() renvoit une methode Get de base ? trouver comment changer la méthode

}

postLogin()



form.addEventListener("submit", (input) => {
    input.preventDefault();
  if (
    emailInput.value === "sophie.bluel@test.tld" &&
    passwordInput.value === "S0phie"
  ) {
    console.log("Tout est bon");
    errorConnect.classList.add("hidden");
    passwordInput.style.outlineColor = "green";
    emailInput.style.outlineColor = "green";
    
  } else {
    errorConnect.classList.remove("hidden");
    errorConnect.innerHTML = "Mot de passe ou identifiant incorrect";
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


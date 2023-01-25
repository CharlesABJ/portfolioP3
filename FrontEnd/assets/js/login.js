// associer ce fichier à la page login.html
// log("login-chargé")
console.log("login-chargé");
let form = document.querySelector("form");
let email = document.getElementById("mail");
let password = document.getElementById("password");
let eyeClosed = document.querySelector(".eye-closed");
let eyeOpen = document.querySelector(".eye-open");
let eyes = document.querySelectorAll("i");
// Détecter quand le formulaire est soumis/submit
form.addEventListener("submit", () => {
  if (email.value === "sophie.bluel@test.tld" && password.value === "S0phie") {
    console.log("Tout est bon");
  } else {
    console.log("Mot de passe ou identifiant incorrect");
  }
});

// à ce moment là récuperer les valeur des input dans 2 console.log

// Modification

eyeClosed.addEventListener("click", () => {
  eyeClosed.classList.toggle("hidden");
  eyeOpen.classList.toggle("hidden");
  password.type = "text";
});

eyeOpen.addEventListener("click", () => {
  eyeClosed.classList.toggle("hidden");
  eyeOpen.classList.toggle("hidden");
  password.type = "password";
});
// Chercher un moyen de raccourcir ce code

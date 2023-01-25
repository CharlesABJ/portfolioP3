let form = document.querySelector("form");
let emailInput = document.getElementById("mail");
let passwordInput = document.getElementById("password");
let eyeClosed = document.querySelector(".eye-closed");
let eyeOpen = document.querySelector(".eye-open");
let eyes = document.querySelectorAll(".eyes");

let errorConnect = document.querySelector(".errorConnect");

form.addEventListener("submit", (e) => {
  if (
    emailInput.value === "sophie.bluel@test.tld" &&
    passwordInput.value === "S0phie"
  ) {
    console.log("Tout est bon");
    errorConnect.classList.add("hidden");
  } else {
    e.preventDefault()
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

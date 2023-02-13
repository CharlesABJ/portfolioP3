// Variables formulaire login
let form = document.querySelector("form");
let emailInput = document.getElementById("mail");
let passwordInput = document.getElementById("password");
let errorConnect = document.querySelector(".error-connect");
let eyeClosed = document.querySelector(".eye-closed");
let eyeOpen = document.querySelector(".eye-open");
let eyes = document.querySelectorAll(".eyes");

//=======================================================================

// Afficher & Masquer le mot de passe
for (let eye of eyes) {
  eye.addEventListener("click", () => {
    eyeClosed.classList.toggle("hidden");
    eyeOpen.classList.toggle("hidden");
    password.type = password.type === "password" ? "text" : "password";
  });
}

// Appel de l'API en POST lors de la validation du formulaire pour assurer la connection de l'utilisateur

form.addEventListener("submit", async (submitButton) => {
  submitButton.preventDefault();

  let loginApi = "http://localhost:5678/api/users/login";
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
      sessionStorage.setItem("token", data.token);
      location.href = "index.html";
    } else {
      errorConnect.classList.remove("hidden");
      emailInput.classList.add("input-error");
      passwordInput.classList.add("input-error");
      if (response.status === 401) {
        errorConnect.innerHTML = "Mot de passe incorrect";
      } else if (response.status === 404) {
        errorConnect.innerHTML = "Erreur dans l’identifiant ou le mot de passe";
      }
    }
  } catch (error) {
    console.error("Warning : " + error);
  }
});

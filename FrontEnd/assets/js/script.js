// Récupération des données de l'API

fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            let galleryGrid = document.querySelector(".galleryGrid");
            let figure = document.createElement("figure");
            let img = document.createElement("img");
            let figcaption = document.createElement("figcaption")

            galleryGrid.append(figure);
            figure.append(img, figcaption);

            img.setAttribute("src", data[i].imageUrl)
            img.setAttribute("alt", data[i].title)
            img.setAttribute("crossorigin", "anonymous")
            figcaption.innerHTML = data[i].title;

            // add more code here
        }
    })
    .catch(error => console.log(error, "Error mon ami"));


// Mise en place des filtres

let all = document.querySelector(".all")
let objects = document.querySelector(".objects")
let appartments = document.querySelector(".appartments")
let restaurants = document.querySelector(".restaurants")

all.addEventListener("click", () => {

})


objects.addEventListener("click", () => {

})

appartments.addEventListener("click", () => {

})

restaurants.addEventListener("click", () => {

})
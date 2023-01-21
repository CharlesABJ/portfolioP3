// Récupération des données de l'API


let all = document.querySelector(".all")
let objects = document.querySelector(".objects")
let appartments = document.querySelector(".appartments")
let restaurants = document.querySelector(".restaurants")
let filterElement = document.querySelectorAll(".filterElement")

let galleryGrid = document.querySelector(".galleryGrid");

fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {

            let figure = document.createElement("figure");
            let img = document.createElement("img");
            let figcaption = document.createElement("figcaption")

            galleryGrid.append(figure);
            figure.append(img, figcaption);

            figure.setAttribute("data-category-id", data[i].category.id)
            img.setAttribute("src", data[i].imageUrl)
            img.setAttribute("alt", data[i].title)
            img.setAttribute("crossorigin", "anonymous")
            figcaption.innerHTML = data[i].title;

            function filterClick() {
                filterElement.forEach(a => {
                    a.removeAttribute("id", "active");
                    figure.style.display = "block"
                });
            }

            all.addEventListener("click", () => {
                filterClick();
                all.setAttribute("id", "active")
            })

            objects.addEventListener("click", () => {
                filterClick();
                objects.setAttribute("id", "active")
                if (figure.getAttribute("data-category-id") !== "1") {
                    figure.style.display = "none";
                }

            })

            appartments.addEventListener("click", () => {
                filterClick();
                appartments.setAttribute("id", "active");
                if (figure.getAttribute("data-category-id") !== "2") {
                    figure.style.display = "none";

                }
            })

            restaurants.addEventListener("click", () => {
                filterClick();
                restaurants.setAttribute("id", "active")
                if (figure.getAttribute("data-category-id") !== "3") {
                    figure.style.display = "none";
                }
            })
            // add more code here
        }
    })
    .catch(error => console.log(error, "Error mon ami"));





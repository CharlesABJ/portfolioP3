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

            function setNotActive() {
                filterElement.forEach(a => {
                    a.removeAttribute("id", "active");
                });
            }

            all.addEventListener("click", () => {
                setNotActive();
                all.setAttribute("id", "active")
                figure.style.display = "block"
            })

            objects.addEventListener("click", () => {
                setNotActive();
                objects.setAttribute("id", "active")
                figure.style.display = "block";
                if (figure.getAttribute("data-category-id") !== "1") {
                    figure.style.display = "none";
                }

            })

            appartments.addEventListener("click", () => {
                setNotActive();
                appartments.setAttribute("id", "active");
                figure.style.display = "block";
                if (figure.getAttribute("data-category-id") !== "2") {
                    figure.style.display = "none";

                }
            })

            restaurants.addEventListener("click", () => {
                setNotActive();
                restaurants.setAttribute("id", "active")
                figure.style.display = "block";
                if (figure.getAttribute("data-category-id") !== "3") {
                    figure.style.display = "none";
                }
            })
            // add more code here
        }
    })
    .catch(error => console.log(error, "Error mon ami"));





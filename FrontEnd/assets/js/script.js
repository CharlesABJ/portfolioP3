let all = document.querySelector(".all")
let objects = document.querySelector(".objects")
let appartments = document.querySelector(".appartments")
let restaurants = document.querySelector(".restaurants")
let filterElement = document.querySelectorAll(".filterElement")

let galleryGrid = document.querySelector(".galleryGrid");

let works = [];
// function 
const showAllWorks = (works) => {
    // ici works est seulement un argument
    
    // tableau works qui regroupe tout les .work prennent la class show-test

    works = document.getElementsByClassName("work");
    for (let i of works) {
        works[i].classList.add("show-test");
    }

}
// Appel des function

const myApi = "http://localhost:5678/api/works";
async function getWorks() {

    fetch(myApi)
        .then(response => response.json())
        .then(data => {
            for (let i in data) {

                let figure = document.createElement("figure");
                let img = document.createElement("img");
                let figcaption = document.createElement("figcaption")


                figure.setAttribute("data-category-id", data[i].category.id)
                img.setAttribute("src", data[i].imageUrl)
                img.setAttribute("alt", data[i].title)
                img.setAttribute("crossorigin", "anonymous")
                figcaption.innerHTML = data[i].title;
                // Ajouter à chaque figure, les class css .work et .show
                figure.classList.add("work", "show")
                // En css les .work qui ne sont pas .show = display none

                for (let work in works) {
                    if (!work.classList.contain("show")) {
                        work.style.display="none"
                    }
                    
                }



                figure.append(img, figcaption);
                galleryGrid.append(figure);

                // add more code here

            }

        })
        .then(
            // Mettre dans works tout les élements .work
            works = Array.from(document.getElementsByClassName('.work'))

                // works =  ...




                // Faire addEventListnner sur .all qui au click execute showAllWorks()

                all.addEventListener("click", () => {
                    showAllWorks();
                })
        )
        .catch(error => console.log(error, "Error mon ami"));

}

    // function filterClick() {
    //     filterElement.forEach(a => {
    //         a.removeAttribute("id", "active");
    //         figure.style.display = "block"
    //     });
    // }

    // all.addEventListener("click", () => {
    //     filterClick();
    //     all.setAttribute("id", "active")
    // })

    // objects.addEventListener("click", () => {
    //     filterClick();
    //     objects.setAttribute("id", "active")
    //     if (figure.getAttribute("data-category-id") !== "1") {
    //         figure.style.display = "none";
    //     }

    // })

    // appartments.addEventListener("click", () => {
    //     filterClick();
    //     appartments.setAttribute("id", "active");
    //     if (figure.getAttribute("data-category-id") !== "2") {
    //         figure.style.display = "none";

    //     }
    // })

    // restaurants.addEventListener("click", () => {
    //     filterClick();
    //     restaurants.setAttribute("id", "active")
    //     if (figure.getAttribute("data-category-id") !== "3") {
    //         figure.style.display = "none";
    //     }
    // })

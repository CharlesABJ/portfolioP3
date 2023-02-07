//Recupération de la div gallery dans le document grâce au sélecteur
let gallery = document.querySelector(".gallery");
let figures = []; //Création d'un tableau figures

//Récupération de l'api et des données
fetch("http://localhost:5678/api/works")
  .then((res) => res.json())
  .then((data) => {
    for (let i in data) {
      let figure = document.createElement("figure"); // On créé la figure
      let img = document.createElement("img"); // On créé l'img
      let figcaption = document.createElement("figcaption");

      figure.setAttribute("categories-id", data[i].category.id); //On donne à figure l'attribut data-category-id ayant comme valeur data[i].category.id
      img.setAttribute("src", data[i].imageUrl); //On donne à img l'attribut src ayant comme valeur data[i].imageUrl
      img.setAttribute("alt", data[i].title); //On donne à figure l'attribut alt ayant comme valeur data[i].title
      img.setAttribute("crossorigin", "anonymous");
      figcaption.innerHTML = data[i].title; //On écrit dans figcaption la valeur data[i].title
      gallery.append(figure); //gallery prend figure comme enfant
      figure.append(img, figcaption); //figure prend img et figcaption comme enfant
    }
  })
  .catch((error) => {
    console.log("dans le catch");
    console.log(error);
  });

// WARNING C'est utile de le faire en javascrit uniquement si tu les crée à grâce à l'Api, quitte à le faire manuelement tu devrais le faire en html css histoire de rendre ton javascript + propre et - lourd.

// Création des catégories
const filters = ["Tous", "Objets", "Appartements", "Hôtels & restaurants"];

//Recupération de l'élément dans le document grâce au sélecteur
const filterContainer = document.querySelector("#filters");

//Crétation des filtres
for (let filter of filters) {
  const btn = document.createElement("button");
  filterContainer.append(btn);

  filters[1].setAttribute("categories-id", 1);
  filters[2].setAttribute("categories-id", 2);
  filters[3].setAttribute("categories-id", 3);

  btn.textContent = filter;
  btn.style.backgroundColor = "white";
  btn.style.color = "#1D6154";
  btn.style.fontWeight = "600";
  btn.style.fontFamily = "syne";
  btn.style.borderRadius = "20px";
  btn.style.border = "1px solid #1D6154";
  btn.style.padding = "5px 15px";
  btn.style.margin = "5px";
  btn.style.cursor = "pointer";

  // Par exemple en css crée une class .btn tu pourras lui mettre tout tes effets de style (mon mentor m'a dit d'éviter de mettre du style css en javascript quand c'est possible)

  btn.addEventListener("click", function () {
    const activeBtn = document.querySelector(".active-filter"); //Il faut créer cette class .active-filter en css, je fais la suite comme si c'était le cas

    //     if (activeBtn) {
    //       activeBtn.style.backgroundColor = 'white';
    //       activeBtn.style.color = '#1D6154';
    //       activeBtn.classList.remove('active-filter');
    //     }
    //     this.style.backgroundColor = '#1D6154';
    //     this.style.color = 'white';
    //     this.classList.add('active-filter');
    //   });

    // });
    for (let e of elementsFilter) {
      e.classList.remove("active");
    }
    this.classList.add("active");
    for (let figure of figures) {
      if (
        figure.getAttribute("data-category-id") ===
        element.getAttribute("data-category-id")
      ) {
        figure.style.display = "block";
      } else if (element === all) {
        figure.style.display = "block";
      } else {
        figure.style.display = "none";
      }
    }
  });
}

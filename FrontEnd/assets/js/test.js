// ETAPE 0 Je déclare mes variables tout en haut

// Variables travaux
const gallery = document.querySelector(".gallery"); //Je veux dans mon document html l'élement qui à la classe "gallery" (donc ta div gallery)

//=======================================================================

// ETAPE 1 Appel des travaux via l'API avec la methode GET
let tonApi = "http://localhost:5678/api/works";

async function getWorks() {
  //Je crée une fonction asynch (ça permet que ta fonction ne bloque pas toute ta page, elle sera lu uniquement quand elle aura fini de se charger)

  try {
    //Dans try je dis ce qu'il se passe si je reçois mon API
    response = await fetch(tonApi); // Je crée une variable response quand fetch a terminé de recuperer l'api, response est égale aux données de l'api
    works = await response.json(); //  Je crée une variable works quand response a fini de se transformer en objet json, works est égale à response, donc aux données de l'api, mais cette fois-ci sous forme "d'objet manipulable"

    for (let i in works) {
      //"For i in works" "Pour i dans works" => Pour chaque éléments DANS works je fais :
      const figure = document.createElement("figure"); // Je crée une balise html figure, et je l'appel figure
      const img = document.createElement("img");
      const figcaption = document.createElement("figcaption");

      img.setAttribute("src", works[i].imageUrl); //Je donne l'attribut "src" à figure, sa valeur est works[i].imageUrl
      img.setAttribute("alt", works[i].title);
      img.setAttribute("cross-origin", "anonymous");

      figcaption.innerHTML = works[i].title;

      figure.append(img, figcaption); //J'ajoute img PUIS figcaption dans figure
      gallery.append(figure);
    }
  } catch (error) {
    console.error(" Attention il y a une erreur");
  }
}

getWorks(); // Je lance ma fonction, important sinon il se passe rien

//YESS TOUT S'AFFICHE
let userToken = sessionStorage.getItem("token"); 
let login = document.querySelector(".login")
let logout = document.querySelector(".logout")
let hiddenElements = document.querySelectorAll(".hidden")
let editPortrait = document.querySelector(".edit-portrait")
let editPresentation = document.querySelector(".edit-presentation")
let editWorks = document.querySelector(".edit-works")
let publishChanges = document.querySelector(".edition-mode button")


if (userToken) {
    for( let element of hiddenElements){
        element.classList.remove("hidden")
    }
    login.style.display="none";
}

logout.addEventListener("click", function(){
    logout.style.display="none";
    login.style.display="block";
    sessionStorage.removeItem("token")
    for( let element of hiddenElements){
        element.classList.add("hidden")
    }
    location.href= "index.html"
})

editPortrait.addEventListener("click", function(){
    console.log("portrait");
})

editPresentation.addEventListener("click", function(){
    console.log("presentation");
})

editWorks.addEventListener("click", function(){
    console.log("works");
})

publishChanges.addEventListener("click", function(){
    console.log("youhouu");
})
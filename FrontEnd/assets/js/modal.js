let userToken = sessionStorage.getItem("token"); 
let hiddenElements = document.querySelectorAll(".hidden")
let login = document.querySelector(".login")
if (userToken) {
    console.log("yesss");
    for( let element of hiddenElements){
        element.classList.remove("hidden")
    }
    login.style.display="none";
} else{
    console.log("nooo");
}
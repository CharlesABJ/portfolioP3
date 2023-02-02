let userToken = sessionStorage.getItem("token"); 
let hiddenElements = document.querySelectorAll(".hidden")
let login = document.querySelector(".login")
let logout = document.querySelector(".logout")
if (userToken) {
    console.log("yesss");
    for( let element of hiddenElements){
        element.classList.remove("hidden")
    }
    login.style.display="none";
} else{
    console.log("nooo");
}

logout.addEventListener("click", function(){
    logout.style.display="none";
    login.style.display="block";
    for( let element of hiddenElements){
        element.classList.add("hidden")
    }
})

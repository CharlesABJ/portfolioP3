let userToken = sessionStorage.getItem("token"); 
let hiddenElements = document.querySelectorAll(".hidden")
let login = document.querySelector(".login")
let logout = document.querySelector(".logout")
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

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


fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            console.log(data[i].title);

            // add more code here
        }
    })
    .catch(error => console.log(error, "Error"));



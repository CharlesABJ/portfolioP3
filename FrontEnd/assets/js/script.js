fetch("http://localhost:5678/api/works")
.then(response => response.json)
.then(data => console.log(data, 'test'))
.catch(error => console.log(error, "Error"));
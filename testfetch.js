fetch("https://api-rest-todolist-4b99865c33b9.herokuapp.com/")
  .then((response) => response.json())
  .then((response) => console.log(response));
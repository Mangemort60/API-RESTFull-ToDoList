import "./styles.css";

fetch("https://api-rest-todolist-4b99865c33b9.herokuapp.com/")
  .then((res) => res.json())
  .then((res) => console.log(res));

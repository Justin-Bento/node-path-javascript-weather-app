// index.js
import "./style.css";
import { greeting } from "./greeting.js";
const myData = document.querySelector(".fetchData");

console.log(greeting);

fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
  });

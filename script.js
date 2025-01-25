const myData = document.querySelector(".fetchData");

fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => response.json())
  .then((json) => {
    console.log(json);
    let node = document.createElement("h2");
    node.setAttribute("class", "heading");
    node.textContent = json.title;
    myData.appendChild(node);
  });

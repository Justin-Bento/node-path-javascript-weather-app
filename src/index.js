import "./style.css";
import { greeting } from "./greeting.js";

const node = document.querySelector(".content");
const heading = document.createElement("h1");
heading.textContent = greeting;
node.appendChild(heading); // Append the heading to the node

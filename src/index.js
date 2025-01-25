import "./style.css";
import { greeting } from "./greeting.js";

const node = document.querySelector(".content");
const section = document.createElement("section");
node.appendChild(section); // Append the heading to the node

const heading = document.createElement("h1");
heading.textContent = greeting;
section.appendChild(heading);

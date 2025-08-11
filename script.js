const CONTAINER_WIDTH = 800;
const MAX_NUM_OF_SQUARES = 100;
let numberOfSquaresPerSide = 16;
const squareArr = [];
const container = document.querySelector(".container");
container.style.width = `${CONTAINER_WIDTH}px`;
let squareWidth = CONTAINER_WIDTH / numberOfSquaresPerSide;

for (let i = 1; i <= numberOfSquaresPerSide**2; i++) {
  const square = document.createElement("div");
  square.classList.add("square");
  square.style.width = `${squareWidth}px`;
  square.style.height = `${squareWidth}px`;
  square.addEventListener("mouseenter", () => console.log("mouseenter: " + i));
  squareArr.push(square);
  container.appendChild(square);
}
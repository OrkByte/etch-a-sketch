const CONTAINER_WIDTH = 800;
const MAX_NUM_OF_SQUARES = 100;
const SHOW_PROMPT_AT_START = false;
const SHOW_PROMPT_ON_BTN_CLICK = true;
const mouseEnterHandlerMap = new Map();
const squareArr = [];
let initialOpacity = 1;
let numberOfSquaresPerSide = 16;

const container = document.querySelector(".container");
container.style.width = `${CONTAINER_WIDTH}px`;

const btnReset = document.querySelector("#btnReset");
btnReset.textContent = "Reset";
btnReset.addEventListener("click", () => startSketch(SHOW_PROMPT_ON_BTN_CLICK));

function startSketch(showPrompt) {
  if (showPrompt) {
    let input = prompt("Enter numbers of squares per side:");

    while (input === null || input.trim() === "" || input > MAX_NUM_OF_SQUARES) {
      input = prompt("Must be smaller or equal 100:");
    }

    numberOfSquaresPerSide = input;
  }

  removeSquares()
  drawSquares();
}

function colorSquare(square) {
  square.style.backgroundColor = getRandomColor(square);
}

function getRandomColor(square) {
  const opacity = getAndIncreaseOpacity(square);
  const red = getRandomNumber();
  const green = getRandomNumber();
  const blue = getRandomNumber();
  return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
}

function getAndIncreaseOpacity(square) {
  const squareData = mouseEnterHandlerMap.get(square);
  const handler = squareData[0];
  const opacity = squareData[1];
  mouseEnterHandlerMap.set(square, [handler, opacity - 0.1]);

  return opacity;
}

function getRandomNumber() {
  return Math.floor(Math.random() * 256);
}

function removeSquares() {
  for (const square of squareArr) {
    const mouseEnterHandler = mouseEnterHandlerMap.get(square)[0];
    square.removeEventListener("mouseenter", mouseEnterHandler);
    square.remove();
  }
}

function drawSquares() {
  let squareWidth = CONTAINER_WIDTH / numberOfSquaresPerSide;
  
  for (let i = 1; i <= numberOfSquaresPerSide**2; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.width = `${squareWidth}px`;
    square.style.height = `${squareWidth}px`;
    const mouseEnterHandler = () => colorSquare(square);
    const squareData = [mouseEnterHandler, initialOpacity];
    mouseEnterHandlerMap.set(square, squareData); // store in a Map to have access when eventListener is removed
    square.addEventListener("mouseenter", mouseEnterHandler);
    squareArr.push(square);
    container.appendChild(square);
  }
}

startSketch(SHOW_PROMPT_AT_START);


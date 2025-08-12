const mouseEnterHandlerMap = new Map();
const squareArr = [];
let numberOfSquaresPerSide = 16;

const container = document.querySelector(".container");
const CONTAINER_WIDTH = 800;
container.style.width = `${CONTAINER_WIDTH}px`;

const btnReset = document.querySelector("#btnReset");
btnReset.addEventListener("click", () => {
  showPrompt();
  removeSquares()
  drawSquares();
});

function showPrompt() {  
  const MAX_NUM_OF_SQUARES = 100;
  let input = prompt("Enter numbers of squares per side:");

  while (input === null || isNaN(input) || input < 1 || input.trim() === "" || input > MAX_NUM_OF_SQUARES) {
    input = prompt(`Must be between 1 and ${MAX_NUM_OF_SQUARES}`);
  }

  numberOfSquaresPerSide = input;
}

function removeSquares() {
  for (const square of squareArr) {
    const mouseEnterHandler = mouseEnterHandlerMap.get(square)[0]; // reference the same eventListener / handler as during creation
    square.removeEventListener("mouseenter", mouseEnterHandler);
    square.remove();
  }
}

function drawSquares() {
  let squareWidth = CONTAINER_WIDTH / numberOfSquaresPerSide;
  let INITIAL_OPACITY = 1;
  
  for (let i = 1; i <= numberOfSquaresPerSide**2; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.width = `${squareWidth}px`;
    square.style.height = `${squareWidth}px`;
    const mouseEnterHandler = () => colorSquare(square);
    const squareData = [mouseEnterHandler, INITIAL_OPACITY];
    mouseEnterHandlerMap.set(square, squareData); // store in a Map to have access when eventListener is removed
    square.addEventListener("mouseenter", mouseEnterHandler);
    squareArr.push(square);
    container.appendChild(square);
  }
}

function colorSquare(square) {
  const alpha = getAndIncreaseOpacity(square);
  const red = getRandomNumber();
  const green = getRandomNumber();
  const blue = getRandomNumber();
  square.style.backgroundColor =`rgba(${red}, ${green}, ${blue}, ${alpha})`;
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

drawSquares();
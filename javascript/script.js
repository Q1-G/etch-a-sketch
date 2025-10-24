const container = document.getElementById("container");
const newGridBtn = document.getElementById("newGridBtn");
const clearBtn = document.getElementById("clearBtn");

let gridSize = 16;

function createGrid(size) {
  container.innerHTML = "";
  const squareSize = container.clientWidth / size;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;

    square.dataset.darkness = "0";
    square.addEventListener("mouseover", () => applyColor(square));

    container.appendChild(square);
  }
}

function applyColor(square) {
  let darkness = parseFloat(square.dataset.darkness);

  if (darkness === 0) {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    square.dataset.baseColor = `${r},${g},${b}`;
  }

  const [r, g, b] = square.dataset.baseColor.split(",");
  darkness = Math.min(darkness + 0.1, 1); 
  square.dataset.darkness = darkness.toString();

  square.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${darkness})`;
}

function newGrid() {
  const input = prompt("Enter number of squares per side (1–100):");
  const size = parseInt(input);

  if (isNaN(size) || size < 1 || size > 100) {
    alert("Please enter a number between 1 and 100.");
    return;
  }
  gridSize = size;
  createGrid(size);
}

function clearGrid() {
  const squares = document.querySelectorAll(".square");
  squares.forEach((sq) => {
    sq.style.backgroundColor = "white";
    sq.dataset.darkness = "0";
    sq.dataset.baseColor = "";
  });
}

newGridBtn.addEventListener("click", newGrid);
clearBtn.addEventListener("click", clearGrid);

createGrid(gridSize);















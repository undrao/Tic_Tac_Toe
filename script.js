const cells = document.querySelectorAll(".cell");
const header = document.querySelector(".header");
const resetBtn = document.querySelector(".btn");

const playerO = "<span class='playerO'>O</span>";
const playerX = "<span class='playerX'>X</span>";
let currentPlayer = playerX;
let flag = true;

const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const playerAudio = new Audio("sounds/player.mp3");
const winnerAudio = new Audio("sounds/won.mp3");
const drawAudio = new Audio("sounds/draw.mp3");
const resetAudio = new Audio("sounds/reset.mp3");

for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", cellClicked);
}

function cellClicked(e) {
  if (flag) {
    if (e.target.innerHTML === "") {
      e.target.innerHTML = currentPlayer;
      checkWinner();
      checkDraw();
      if (currentPlayer === playerX) {
        currentPlayer = playerO;
      } else {
        currentPlayer = playerX;
      }
    }
  }
  playerAudio.play();
}

function checkDraw() {
  if ([...cells].every((cell) => cell.innerHTML !== "")) {
    if (!checkWinner()) {
      header.innerHTML = `it's a draw!`;
      drawAudio.play();
    }
  }
}

function checkWinner() {
  for (let i = 0; i < winCombos.length; i++) {
    const winCombo = winCombos[i];
    const cell1 = cells[winCombo[0]];
    const cell2 = cells[winCombo[1]];
    const cell3 = cells[winCombo[2]];
    if (
      cell1.innerHTML !== "" &&
      cell1.innerHTML === cell2.innerHTML &&
      cell1.innerHTML === cell3.innerHTML
    ) {
      header.innerHTML = `${currentPlayer} has won!`;
      winnerAudio.play();
      flag = false;
      return true;
    }
  }
}

function reset() {
  cells.forEach((cell) => {
    cell.innerHTML = "";
  });
  flag = true;
}

resetBtn.addEventListener("click", () => {
  flag = false;
  reset();

  header.innerHTML = `Tic Tac Toe`;
  resetAudio.play();
});

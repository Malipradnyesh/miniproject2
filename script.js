const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        if (board[index] !== "" || !gameActive) return;
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        checkWinner();
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
    });
});

function checkWinner() {
    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            statusText.textContent = `Player ${board[a]} Wins!`;
            gameActive = false;
            return;
        }
    }
    if (!board.includes("")) {
        statusText.textContent = "It's a Draw!";
        gameActive = false;
    }
}

resetBtn.addEventListener("click", () => {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = "Player X's turn";
    cells.forEach(cell => cell.textContent = "");
});

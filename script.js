const cells = document.querySelectorAll('.cell');
const status = document.getElementById('status');
const restartBtn = document.getElementById('restart');
const resetScoresBtn = document.getElementById('reset-scores');
const scoreX = document.getElementById('score-x');
const scoreO = document.getElementById('score-o');
const scoreDraw = document.getElementById('score-draw');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
let gameActive = true;
let scores = { X: 0, O: 0, draw: 0 };

const winPatterns = [
    // Rows
    [0, 1, 2, 3],
    [4, 5, 6, 7],
    [8, 9, 10, 11],
    [12, 13, 14, 15],
    // Columns
    [0, 4, 8, 12],
    [1, 5, 9, 13],
    [2, 6, 10, 14],
    [3, 7, 11, 15],
    // Diagonals
    [0, 5, 10, 15],
    [3, 6, 9, 12]
];

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.dataset.index;

    if (board[index] !== '' || !gameActive) {
        return;
    }

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    if (checkWin()) {
        status.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        highlightWinningCells();
        scores[currentPlayer]++;
        updateScoreboard();
        return;
    }

    if (checkDraw()) {
        status.textContent = "It's a draw!";
        gameActive = false;
        scores.draw++;
        updateScoreboard();
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === currentPlayer);
    });
}

function checkDraw() {
    return board.every(cell => cell !== '');
}

function highlightWinningCells() {
    winPatterns.forEach(pattern => {
        if (pattern.every(index => board[index] === currentPlayer)) {
            pattern.forEach(index => {
                cells[index].classList.add('winner');
            });
        }
    });
}

function updateScoreboard() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
    scoreDraw.textContent = scores.draw;
}

function restartGame() {
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
    gameActive = true;
    status.textContent = `Player X's turn`;

    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'winner');
    });
}

function resetScores() {
    scores = { X: 0, O: 0, draw: 0 };
    updateScoreboard();
    restartGame();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
resetScoresBtn.addEventListener('click', resetScores);

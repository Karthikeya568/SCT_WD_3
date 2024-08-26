const cells = document.querySelectorAll('.cell');
const statusDiv = document.getElementById('status');
const resetBtn = document.getElementById('reset-btn');
const celebrationDiv = document.getElementById('celebration');

// Load the sound effects
const clickSound = new Audio('assets/click-sound.mp3');
const restartSound = new Audio('assets/restart.mp3');
const xWonSound = new Audio('assets/x-won.mp3');
const oWonSound = new Audio('assets/o-won.mp3');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkWinner = () => {
    for (let [a, b, c] of winningCombinations) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            celebrationDiv.innerText = `${currentPlayer} Wins!`;
            celebrationDiv.style.display = 'block';
            
            // Play the winner sound
            if (currentPlayer === 'X') {
                xWonSound.play();
            } else {
                oWonSound.play();
            }
            return;
        }
    }
    if (!board.includes('')) {
        gameActive = false;
        statusDiv.innerText = 'It\'s a Tie!';
    }
};

const handleClick = (event) => {
    const index = event.target.getAttribute('data-index');
    if (board[index] || !gameActive) return;
    
    // Play click sound
    clickSound.play();

    board[index] = currentPlayer;
    event.target.classList.add(currentPlayer.toLowerCase());
    event.target.innerText = currentPlayer;
    
    checkWinner();
    
    if (gameActive) {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDiv.innerText = `Player ${currentPlayer}'s Turn`;
    }
};

const resetGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    statusDiv.innerText = `Player ${currentPlayer}'s Turn`;
    celebrationDiv.style.display = 'none';
    
    // Play restart sound
    restartSound.play();
    
    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('x', 'o');
    });
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetBtn.addEventListener('click', resetGame);

// Initialize game status
statusDiv.innerText = `Player ${currentPlayer}'s Turn`;

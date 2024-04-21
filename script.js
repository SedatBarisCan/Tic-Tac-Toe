const cells = document.querySelectorAll('.child-display');
const restartBtn = document.querySelector('.restart-btn')
const statusText = document.querySelector('.status');

const gameBoard = () => {
    let board = ["", "", "", "", "", "", "", "", "", ];
    let currentPlayer = "X";
    let running = false;
    const getBoard = () => board;



    const initializeGame = () => {
    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    restartBtn.addEventListener('click', restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
    };

    const cellClicked = (event) => {
        const cellIndex = event.target.getAttribute('cellIndex');
        
        if (board[cellIndex] != "" || !running) {
            return;
        };
        
        updateCell(event.target, cellIndex);
        checkWinner();
    };

    const updateCell = (cell, index) => {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
    };

   const restartGame = () => {
    currentPlayer = "X";
    board = ["", "", "", "", "", "", "", "", "", ];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => cell.textContent = "");
    };

   const checkWinner = () => {
    let roundWon = false;

    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winConditions.length;i++) {
        const condition = winConditions[i];
        const cellA = board[condition[0]];
        const cellB = board[condition[1]];
        const cellC = board[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        };

        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        };
    };

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
    } else if (!board.includes("")) {
        statusText.textContent = `!Draw`
    } else {
        changePlayer();
    }

    };

    const changePlayer = () => {
        currentPlayer = (currentPlayer == "X") ? "O" : "X";
        statusText.textContent = `${currentPlayer}'s turn`;
    };
   

    return {getBoard, initializeGame, cellClicked, updateCell, restartGame, changePlayer, checkWinner, changePlayer};
};

const game = gameBoard(); 

game.initializeGame();
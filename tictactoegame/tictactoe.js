
const gameBoard = () => {
  let board = [];
  const createBoard = (str) => {
    for (let i = 0; i < 3; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        //  fill each cell with an empty string
        row.push(str);
      }
      board.push(row); // add the row into the board
    }
  };

  createBoard("");
  const printBoard = () => {
    for (let i = 0; i < board.length; i++) {
      console.log(board[i].join("|"));
    }
  };
  const getBoard = () => {
    return board;
  };
  const placeMarker = (row, col, symbol) => {
    board[row][col] === ""
      ? (board[row][col] = symbol)
      : console.log(`Spot already taken!.`);
  };
  const isBoardFull = () => board.flat().every((cell) => cell !== "");
  return {
    getBoard,
    placeMarker,
    printBoard,
    isBoardFull,
  };
};

const game = gameBoard();
//game.placeMarker(0, 1, "O");
// game.placeMarker(0, 1, "X");
// game.placeMarker(0, 2, "O");
// game.placeMarker(1, 0, "X");
// game.placeMarker(1, 1, "O");
// game.placeMarker(1, 2, "X");
// game.placeMarker(2, 0, "O");
// game.placeMarker(2, 1, "X");
// game.placeMarker(2, 2, "O");

//game.printBoard();
game.isBoardFull();

const playerFactory = (name, symbol) => {
  const currentPlayer = () => {
    console.log(`It's ${name}'s turn `);
  };
  sayHello = () => {
    console.log(`${name} plays as ${symbol}`);
  };
  return {
    name,
    symbol,
    sayHello,
    currentPlayer,
  };
};
const alice = playerFactory("Alice", "X");
const bob = playerFactory("Bob", "O");
console.log(alice, bob);
alice.sayHello();
alice.currentPlayer();

const scoreModule = (() => {
  let scoreBoard = { alice: 0, bob: 0, draws: 0 };

  const updateScore = (winner) => {
    if (winner) scoreBoard[winner.toLowerCase()]++;
    else scoreBoard.draws++;
  };

  const printScore = () => console.log(scoreBoard);

  return { updateScore, printScore };
})();

const playRoundFactory = () => {
  let currentPlayer = alice; // starting player
  let gameOver = false;

  const switchPlayer = () => {
    currentPlayer = currentPlayer === alice ? bob : alice;
    console.log(`Now it's ${currentPlayer.name}'s turn!`);
  };
  const winningCombos = [
    // rows
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],

    // cols
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],

    // diagonals
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];
  const checkWinner = () => {
    const board = game.getBoard(); // use getter from game
    for (let combo of winningCombos) {
      if (combo.every(([r, c]) => board[r][c] === currentPlayer.symbol)) {
        console.log(`${currentPlayer.name} wins!`);
        return true;
      }
    }
    return false;
  };
  let winner = null; // store winner
  const playRound = (row, col) => {
    if (gameOver) {
      console.log("Game already finished!");
      return;
    }
    const board = game.getBoard();
    game.getBoard();
    // Check if move is valid
    if (board[row][col] === "") {
      game.placeMarker(row, col, currentPlayer.symbol);

      if (checkWinner()) {
        gameOver = true;
        winner = currentPlayer.name; // store winner
        console.log(`${winner} wins the game!`);
      } else if (game.isBoardFull()) {
        gameOver = true;
        winner = null; // draw
        console.log("It's a draw!");
      } else if (!checkWinner() && !game.isBoardFull()) {
        switchPlayer();
      }
    } else {
      console.log("Invalid move! Try again.");
      return;
    }
  };
  const getStatus = () => {
    if (gameOver) {
      return {
        status: winner ? "winner" : "draw",
        winner: winner,
        nextPlayer: null,
      };
    } else {
      return {
        status: "running",
        winner: null,
        nextPlayer: currentPlayer.name,
      };
    }
  };

  const resetGame = () => {
    const board = game.getBoard();
    // Board ke har cell empty ho jaye.
    for (let r = 0; r < board.length; r++) {
      for (let c = 0; c < board[r].length; c++) {
        board[r][c] = "";
      }
    }
    gameOver = false;

    currentPlayer = alice;

    console.log("Game reset! New round started.");
    game.printBoard();
    return board;
  };
  return {
    playRound,
    switchPlayer,
    getStatus,
    resetGame,
  };
};

const round = playRoundFactory();

// round.playRound(0, 0); // Alice
// round.playRound(1, 0); // Bob
// round.playRound(0, 1); // Alice
// round.playRound(1, 1); // Bob
// round.playRound(0, 2); // Alice should win now
// game.printBoard();

// round.playRound(0, 0); // Alice
// round.playRound(0, 1); // Bob
// round.playRound(0, 2); // Alice
// round.playRound(1, 1); // Bob
// round.playRound(1, 0); // Alice
// round.playRound(1, 2); // Bob
// round.playRound(2, 1); // Alice
// round.playRound(2, 0); // Bob
// round.playRound(2, 2); // Alice
// game.printBoard();

//1. Running state test
//     round.playRound(0, 0); // Alice
// console.log(round.getStatus());
//2. Draw state test
// round.playRound(0, 0); // Alice
// round.playRound(0, 1); // Bob
// round.playRound(0, 2); // Alice
// round.playRound(1, 1); // Bob
// round.playRound(1, 0); // Alice
// round.playRound(1, 2); // Bob
// round.playRound(2, 1); // Alice
// round.playRound(2, 0); // Bob
// round.playRound(2, 2); // Alice
// console.log(round.getStatus());
// scoreModule.updateScore()
// scoreModule.printScore()
// console.log(round.resetGame())
//3. Winner state test

round.playRound(0, 0); // Alice
round.playRound(0, 0); // Bob
round.playRound(1, 0); // Bob
round.playRound(0, 1); // Alice
round.playRound(1, 1); // Bob
round.playRound(0, 2); // Alice wins
const status = round.getStatus();
console.log("Status before updating score:", status);

scoreModule.updateScore(status.winner);
scoreModule.printScore();
round.resetGame();

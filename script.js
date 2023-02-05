// build the gameBoard as module
const gameBoard = (() => {
  let tics = new Array(9).fill(null); // this is the initial array
  const container = document.querySelector(".container");
  const draw = () => {
    for (let i = 0; i < 9; i++) {
      const cube = document.createElement("div");
      cube.classList.add("cube");
      container.appendChild(cube);
    }
  };
  return { draw, tics };
})();
// draw the board
gameBoard.draw();

// build the player factory function
const Player = (name, side, nextStep) => {
  const getStep = () => nextStep;
  const getName = () => name;
  const getSide = () => side;
  const changeStep = () => (nextStep = !nextStep);
  const playerTic = [];

  return { getName, getStep, getSide, changeStep, playerTic };
};

const player1 = Player("Jing", "😈", true);
const player2 = Player("Saumya", "🥰", false);

// build the winner determination algorithm
const winnerAlgo = (() => {
  const combination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 7],
  ];

  const ifWin = (ticArray) => {
    let foundWinner = false;
    // not the most elegant way of achieving the algorithm :/ but the timm and space complexity are not bad
    for (const comb of combination) {
      // console.log(comb);
      let i = 0;
      while (i < 3) {
        if (!ticArray.includes(comb[i])) break;
        else i++;
      }
      if (i == 3) {
        foundWinner = true;
        return foundWinner;
      }
      i = 0;
    }
    return foundWinner;
  };

  return { ifWin };
})();

// build the module for display control
const displayControl = (() => {
  // const container = document.querySelector(".container");

  const _whoPlay = (player1, player2) => {
    const displayPlayer = document.querySelector(".display-player");
    const curPlayer = player1.getStep() === true ? player1 : player2;
    displayPlayer.textContent = `Current player: ${curPlayer.getName()}`;
    return player1.getStep() === true ? player1 : player2;
  };

  const _change = (player1, player2) => {
    player1.changeStep();
    // console.log(player1.getStep());
    player2.changeStep();
    // console.log(player2.getStep());
  };

  const _nextPlay = (player1, player2) => {
    // change the player
    _change(player1, player2);
  };

  const addTic = (player1, player2) => {
    // get the current player
    const player = _whoPlay(player1, player2);
    console.log(player.getName());
    // make the choice
    const side = player.getSide();
    const container = document.querySelector(".container");
    container.addEventListener(
      "click",
      (event) => {
        const clickedDiv = event.target;
        const childIndex = Array.prototype.indexOf.call(
          clickedDiv.parentNode.children,
          clickedDiv
        );
        const cube = container.querySelector(
          `.cube:nth-child(${childIndex + 1})`
        );
        // add the array index to the player tic array
        player.playerTic.push(childIndex);
        cube.textContent = side;
        // determine if a player has won or not
        if (winnerAlgo.ifWin(player.playerTic)) {
          displayWinner.showWinner(player);
        }
      },
      { once: true }
    );
    // change the player and display the next player
    _nextPlay(player1, player2);

    // console.log('test');
  };

  return { addTic };
})();

displayControl.addTic(player1, player2);

const displayWinner = (() => {
  const showWinner = (player) => {
    const winnerBlock = document.querySelector(".display-winner");
    winnerBlock.textContent = `The winner is ${player.getName()}`;
  };

  return { showWinner };
})();

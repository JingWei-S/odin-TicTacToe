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
    [2, 4, 6],
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
  const container = document.querySelector(".container");
  const displayPlayer = document.querySelector(".display-player");
  //   const player1 = Player("Jing", "😈", true);
  //   const player2 = Player("Saumya", "🥰", false);

  let count = 0;
  let hasWinner = false;
  const _whoPlay = (player1, player2) => {
    const curPlayer = player1.getStep() === true ? player2 : player1;
    displayPlayer.textContent = `Current player: ${curPlayer.getName()} ${curPlayer.getSide()}`;
    return player1.getStep() === true ? player1 : player2;
  };

  const _change = () => {
    player1.changeStep();
    // console.log(player1.getStep());
    player2.changeStep();
    // console.log(player2.getStep());
  };

  const _nextPlay = (player1, player2) => {
    // change the player
    _change(player1, player2);
  };

  const _restart = () => {
    const restart = document.createElement("button");
    restart.setAttribute("id", "restart");
    restart.textContent = "Restart";
    displayPlayer.appendChild(restart);
    restart.addEventListener("click", () => {
      window.location.reload();
    });
  };

  const addTic = (player1, player2) => {
    displayPlayer.textContent = `Current player: ${player1.getName()} ${player1.getSide()}`;
    container.addEventListener("click", (event) => {
      for (let i = 0; i < 9; i++) {
        if (count === i) {
          // get the current player
          const player = _whoPlay(player1, player2);
          // make the choice
          const side = player.getSide();
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
            hasWinner = true;
            _restart();
            break;
          } else {
            _nextPlay(player1, player2, count);
            // console.log(count);
            count++;
            break;
          }
        }
        if (hasWinner) break; // fix the loop bug
      }
      // console.log(count === 9);
      if (count === 9) {
        console.log("test");
        displayPlayer.textContent = "Hahah, everyone sucks";
        _restart();
        // break;
      }
    });
  };

  return { addTic };
})();

const displayWinner = (() => {
  const showWinner = (player) => {
    const winnerBlock = document.querySelector(".display-player");
    winnerBlock.textContent = `The winner is ${player.getName()} ${player.getSide()}`;
  };

  return { showWinner };
})();

// start the game
const startGame = (() => {
  const _sideChoice = () => {
    let sides = [];
    const sideChoices = document.querySelectorAll(".button-group");
    sideChoices.forEach((group) => {
      group.addEventListener("click", (e) => {
        // console.log(e.target);
        // console.log(e.target.parentNode.children); // any other way to get it?
        // console.log(e.target.tagName);
        if (e.target.tagName === "INPUT") {
          for (const choice of e.target.parentNode.children) {
            choice.disabled = true;
            if (choice === e.target) {
              console.log(choice);
              choice.classList.add("chosen");
              sides.push(choice.value);
            }
          }
        }
      });
    });
    console.log(sides);
    return sides;
  };

  const _getPlayers = (form) => {
    const player1_name = form.elements.name1.value;
    const player1_side = form.querySelector(".icon1 .chosen").value;
    const player2_name = form.elements.name2.value;
    const player2_side = form.querySelector(".icon2 .chosen").value;
    console.log(form.querySelector(".chosen"));
    const player1 = Player(player1_name, player1_side, true);
    const player2 = Player(player2_name, player2_side, false);

    return [player1, player2];
  };

  const start = () => {
    console.log("test");
    _sideChoice();
    const formInfo = document.querySelector("form");
    formInfo.addEventListener("submit", (e) => {
      e.preventDefault(formInfo.elements.name1.value);
      [player1, player2] = _getPlayers(formInfo);
      //   console.log(formInfo.elements.icon1);
      document.querySelector(".player-init").style.display = "none";
      document.querySelector(".tictactoe").style.display = "flex";
      displayControl.addTic(player1, player2);
    });
  };

  return { start };
})();

startGame.start();

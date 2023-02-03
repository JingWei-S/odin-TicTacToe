// build the gameBoard as module
const gameBoard = (() => {
    let tics = new Array(9).fill(null); // this is the initial array
    const container = document.querySelector(".container");
    const draw = () => {
        for (let i = 0; i < 9; i++) {
            const cube = document.createElement('div');
            cube.classList.add("cube");
            container.appendChild(cube);
        }
    }
    return {draw, tics}
})();
// draw the board
gameBoard.draw();

// build the player factory function 
const Player = (name, side, nextStep) => {
    const getStep = () => nextStep;
    const getName = () => name;
    const getSide = () => side;
    const changeStep = () => nextStep = !nextStep;

    return {getName, getStep, getSide, changeStep}
};

const player1 = Player('Jing', '😈', true);
const player2 = Player('Saumya', '🥰', false);



// build the module for display control
const displayControl = (() => {
    // const container = document.querySelector(".container");
    
    const _whoPlay = (player1, player2) => player1.getStep() === true ? player1 : player2;

    const _change = (player1, player2) => {
        player1.changeStep();
        console.log(player1.getStep());
        player2.changeStep();
        console.log(player2.getStep());
    }

    const _nextPlay = (player1, player2) => {
        // change the player
        _change(player1, player2);
        const displayPlayer = document.querySelector('.display-player');
        displayPlayer.textContent = player1.getStep() === true ? player1.getName() : player2.getName();
    }



    const addTic = (player1, player2) => {
        // get the current player
        const player = _whoPlay(player1, player2);
        console.log(player.getName());
        // make the choice
        const side = player.getSide();
        const container = document.querySelector('.container');
        container.addEventListener('click', (event) => {
        const clickedDiv = event.target;
        const childIndex = Array.prototype.indexOf.call(clickedDiv.parentNode.children, clickedDiv);
        const cube = container.querySelector(`.cube:nth-child(${childIndex+1})`);
        cube.textContent = side;

        // change the player and display the next player
        _nextPlay(player1, player2);
        console.log('test');
        });
    }

    return {addTic}
})();

displayControl.addTic(player1, player2);


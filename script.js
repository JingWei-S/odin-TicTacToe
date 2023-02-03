// build the gameBoard as module
const gameBoard = (() => {
    let tics = ['X', 'X', 'X', 'O', 'O', 'X', 'O', 'O', 'O'];   // this is to store the tic tocs
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

// build the module for display control
const displayControl = (() => {
    const container = document.querySelector(".container");
    const add = (tics) => {
        // const cubes = container.querySelector(".cube:nth-child(2)");
        // console.log(tics[2]);
        // cubes.textContent = tics[2];
        // add all the dummy tics to the game board
        for (let i = 0; i < 9; i++) {
            const cube = container.querySelector(`.cube:nth-child(${i+1})`);
            // console.log(tics[i]);
            cube.textContent = tics[i];
        }
    }
    return {add}
})();

displayControl.add(gameBoard.tics);
// build the player factory function 
const Player = (name, side) => {
    const getName = () => name;
    // addTic - add tic to the board and update the board
    const addTic = () => {
        const cubes = document.querySelectorAll(".cube");
        cubes.forEach(cube => cube.addEventListener("click", (e) => {
            console.log(side)
            e.target.textContent = side;
        }));
    };
    return {getName, addTic}
};

const player1 = Player('Jing', '😈');
const player2 = Player('Saumya', '🥰');

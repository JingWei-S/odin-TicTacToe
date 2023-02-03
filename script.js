// build the gameBoard as module
const gameBoard = (() => {
    let tics = ['X', 'X', 'X', 'O', 'O', 'X', 'O', 'O', 'O'];   // this is to store the tic tocs
    const container = document.querySelector(".container");
    const draw = () => {
        // for (let i = 0; i < 3; i++) {
        //     const row = document.createElement('div');
        //     row.classList.add('row');
        //     for (let j = 0; j < 3; j++) {
        //         const cube = document.createElement('div');
        //         cube.classList.add('cube');
        //         cube.style.width = LEN / 3 + 1 + "px";
        //         cube.style.height = LEN / 3 + 1 +"px";
        //         row.appendChild(cube);
        //     }
        //     container.append(row);
        // }
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
    const add = (tics) => {

    }
})();

// build the player factory function 
const Player = (name, side) => {
    return {name, side}
};

const player1 = Player('Jing', '😈');
const player2 = Player('Saumya', '🥰');

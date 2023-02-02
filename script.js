// build the gameBoard as module
const gameBoard = (() => {
    const container = document.querySelector(".container");
    const LEN = 480;
    const draw = () => {
        for (let i = 0; i < 3; i++) {
            const row = document.createElement('div');
            row.classList.add('row');
            for (let j = 0; j < 3; j++) {
                const cube = document.createElement('div');
                cube.classList.add('cube');
                cube.style.width = LEN / 3 + 1 + "px";
                cube.style.height = LEN / 3 + 1 +"px";
                row.appendChild(cube);
            }
            container.append(row);
        }
    }
    return {draw}
})();
// draw the board
gameBoard.draw();


// build the player factory function 
const Player = (name, side) => {
    return {name, side}
};

const player1 = Player('Jing', '😈');
const player2 = Player('Saumya', '🥰');

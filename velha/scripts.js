const cellElements = document.querySelectorAll('[data-cell]');
const board = document.querySelector('[data-board]');
const winningMenssageTextElement = document.querySelector('[data-winning-menssage-text]');
const winningMenssage = document.querySelector("[data-winning-menssage]");
const restartButton = document.querySelector('[data-restart-button]')

let isCircleTurn;

const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const startGame = () => {
    for (const cell of cellElements){
        cell.classList.remove('circle');
        cell.classList.remove('x');
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });

        isCircleTurn = false;

        board.classList.add('x');
        winningMenssage.classList.remove("show-winning-menssage");
    }
}

const endGame = (isDraw) => {
    if(isDraw){
        winningMenssageTextElement.innerText = "Empate!"
    } else {
        winningMenssageTextElement.innerText = isCircleTurn ? "Circulo venceu!" : "X venceu!";
    }

    winningMenssage.classList.add("show-winning-menssage")
}

const checkForWin = (currentPlayer) => {
    return winningCombination.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentPlayer);
        })
    })
}

const placeMark = (cell, classToAdd) => {
    cell.classList.add(classToAdd);
}

const swapTurns = () => {
    isCircleTurn = !isCircleTurn;

    board.classList.remove('circle')
    board.classList.remove('x')

    if(isCircleTurn){
        board.classList.add('circle')
    }else{
        board.classList.add('x')
    }
};

const handleClick = (e) => {
    // colocar marca
    const cell = e.target;
    const classToAdd = isCircleTurn ? "circle" : "x";

    placeMark(cell, classToAdd);

    //checar por vitohria
    const isWin = checkForWin(classToAdd);
    if(isWin){
        endGame(false);
    }
    //verificar empate
    //mudar simbolo
    swapTurns();
};

startGame();

restartButton.addEventListener('click', startGame);
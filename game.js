const boxElem = document.querySelectorAll(".btn");
const resetBtn = document.querySelector(".resets-game");
const changeTitle = document.querySelector("#title");
const newGame = document.querySelector(".resets-game");
const hideElem = document.querySelector('.hide');

//Starting with player X everytime and declaring a 2D array for all possible winning patterns
let playerX = true;
const winPatterns =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8],
];

//Function to Reset the game to initial condition, whenever the New Game Button or Reset button is clicked 
const resetGame = () => {
    playerX = true;
    enableBoxElem();
    hideElem.classList.add('hide');
    resetBtn.innerText = "Reset";
    resetBtn.style.backgroundColor = "Red";
    changeTitle.innerHTML = `<h1 id="title" class="jersey-25-regular">❌<span>Tic-Tac-Toe</span>⭕</h1>`;
}

//Functions for Enabling or Disabling each box of the game so that the rules of the game are intact.
const disableBoxELem = () => {
    for(let elem of boxElem){
        elem.disabled = true;
    }
}
const enableBoxElem = () =>{
    for(let elem of boxElem){
        elem.disabled = false;
        elem.innerText= "";
    }
}

//Loop to check for the current player and is there any pattern matched from our array.
boxElem.forEach((box) => {
    box.addEventListener("click", () => {
        if(playerX){
            box.innerText = "X";
            playerX = false;
        }else{
            box.innerText = "O";
            playerX = true;
        }
        box.disabled = true;
        checkWinner();
    })
});

//Function to check who's the winner if any. 
const checkWinner = () => {
    const winnerFound = false;
    for(let pattern of winPatterns){
        let val1 = boxElem[pattern[0]].innerText;
        let val2 = boxElem[pattern[1]].innerText;
        let val3 = boxElem[pattern[2]].innerText;
        if(val1 != "" && val2 != "" && val3 != ""){
         if(val1 === val2 && val2 === val3){
            showWinner(val1);
            disableBoxELem();
            winnerFound = true;
        }   
        }
    }
    if(!winnerFound){
        checkForDraw();
    }
}

//Function which check's for the possibility of game becoming Draw. Also, changes some styling.
const checkForDraw = () => {
    let isDraw = true;

    for (let box of boxElem) {
        if (box.innerText === "") {
            isDraw = false;
            break;
        }
    }

    if (isDraw) {
        changeTitle.innerText = "It's a Draw...🤝";
        newGame.innerText = "New Game";
        newGame.style.backgroundColor = "Green";
        hideElem.classList.remove('hide');
    }
}

//Function to display winner and change some styling
const showWinner = (winner) => {
    changeTitle.innerText = `Player '${winner}' Won 🎊`;
    newGame.innerText = "New Game";
    newGame.style.backgroundColor = "Green";
    hideElem.classList.remove('hide');
    
}

//Listens for the button click and resets the game, when button is clicked.
resetBtn.addEventListener("click",resetGame);

const gameCells = document.querySelectorAll('.cell');
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');
const restartBtn = document.querySelector('.restartBtn');
const alertBox = document.querySelector('.alertBox');

//making variables
let currentplayer = 'X';
let nextplayer = 'O';
let playerTurn = currentplayer;

player1.textContent = `player 1: ${currentplayer}`;
player2.textContent = `player 2: ${nextplayer}`;

//function to start your game
const startGame = () => {
    gameCells.forEach(cell => {
        cell.addEventListener('click',handleClick);
                  
    });
}

const handleClick = (e) => {
    if(e.target.textContent === ''){
        e.target.textContent = playerTurn;
         if(checkWIN()){
            //console.log(`${playerTurn} is a winner!`); 
            showAlert(`${playerTurn} is a winner!`);
            disableCells();
         }
         else if (checkTie()){
            //console.log(`It's a Tie!`);
            showAlert(`It's a Tie!`);
            disableCells();
         }
         else{   
            changePlayerTurn();
            showAlert(`Turn for player:${playerTurn}`);
        
       }
    }   

}
//function tochange players turn
const changePlayerTurn = () => {
    playerTurn = playerTurn === currentplayer ? nextplayer : currentplayer;
};

//function to check win
const checkWIN = () => {
    const winningConditions = [
    
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];
    for (let i = 0; i < winningConditions.length; i++) {
        const[pos1,pos2,pos3] = winningConditions[i];
        if(gameCells[pos1].textContent !== '' &&
          gameCells[pos1].textContent === gameCells[pos2] .textContent &&
          gameCells[pos2].textContent === gameCells[pos3].textContent
        ) {
       
           return true;
        }
    }
    return false;
}   
const checkTie = () => {
    let emptyCellsCount = 0;
    gameCells.forEach(cell => {
        if (cell.textContent === ''){
            emptyCellsCount++;
        }
    });
   return emptyCellsCount === 0 && !checkWIN();

}  
// function to disable game-board cells after a win or tie
const disableCells = () => {
    gameCells.forEach(cell => {
        cell.removeEventListener('click',handleClick);
        cell.classList.add('disabled');
    });
}
//function to restart game
const restartGame = () => {
    gameCells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('disabled');

    });
    startGame(); 
}
//function to show alert
const showAlert = (msg) => {
    alertBox.style.display ="block";
    alertBox.textContent = msg;
    setTimeout(()=>{
        alertBox.style.display ="none";

    },3000);

}
//Adding event listner to restart button
restartBtn.addEventListener('click', restartGame);
//Calling start game function
startGame();

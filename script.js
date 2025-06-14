const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('#status-text');
const restartBtn = document.querySelector('#restartBtn')

const winConditions = [
    [0, 1, 2],

    [3, 4, 5],

    [6, 7, 8],

    [0, 3, 6],

    [1, 4, 7],

    [2, 5, 8],

    [0, 4, 8],

    [2, 4, 6]
];

let options = ['', '','','','','','','','',];
let currentPlayer = 'X';
let running = false;

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener('click', cellClicked)) , 
    restartBtn.addEventListener('click', restartGame);
    statusText.textContent = `It is currently ${currentPlayer} 's turn`;
    running = true;
}

function cellClicked(){
    const indexValue = this.getAttribute('cellIndex');
    if (options[indexValue] != '' || running == false){
        return;
    }
    updateCell(this, indexValue);
    checkWinner();
}

function updateCell(cell, index){
    options[index] = currentPlayer; 
    cell.textContent = currentPlayer;

}

function changePlayer(){
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `It is currently ${currentPlayer} 's turn`;
}

function checkWinner(){
    let wonStatus = false;
    for(let i = 0; i<winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB= options[condition[1]];
        const cellC= options[condition[2]];
            if(cellA === '' || cellB === '' || cellC === ''){
                continue;
            }
            if(cellA === cellB && cellB === cellC){
                wonStatus = true;
                break;
            }
      }
      if(wonStatus){
        statusText.textContent = `The ${currentPlayer} won`;
        running = false;
      } else if (!options.includes('')){
        statusText.textContent = "It's a draw"
      } else {
        changePlayer();
      }


}
function restartGame(){
    currentPlayer = "X"
    options = ['', '','','','','','','','',];
    statusText.textContent = `It is currently ${currentPlayer} 's turn`;
    cells.forEach(cell => cell.textContent = '')
    running = true;
}
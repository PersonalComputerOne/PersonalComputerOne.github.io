//ScoreBoard
const playerOneScore = document.querySelector('#playerOneScore');
const playerTwoScore = document.querySelector('#playerTwoScore');

//buttons
const playerOneButton = document.querySelector('#playerOneButton');
const playerTwoButton = document.querySelector('#playerTwoButton');
const resetButton = document.querySelector('#resetButton');

//range selector
const range = document.querySelector('#range');

//initial values
let one = 0;
let two = 0;
let winningScore = 3;
let isGameOver = false;

//W and L
// function color() {
//     if (one === winningScore && two !== winningScore) {
//         playerTwoScore.style.color = 'red';
//     }
//     if (one !== winningScore && two === winningScore) {
//         playerOneScore.style.color = 'red';
//     }
// }

//player1 function
playerOneButton.addEventListener('click', function () {
    if (!isGameOver) {
        one += 1;
        if (one === winningScore) {
            isGameOver = true;
            playerOneScore.classList.add('winner');
            playerTwoScore.classList.add('loser');
            playerOneButton.disabled = true;
            playerTwoButton.disabled = true;
            // playerOneScore.style.color = 'green';
        }
        playerOneScore.textContent = one;
        // color();
    }
})

//player2 function
playerTwoButton.addEventListener('click', function () {
    if (!isGameOver) {
        two += 1;
        if (two === winningScore) {
            isGameOver = true;
            playerOneScore.classList.add('loser');
            playerTwoScore.classList.add('winner');
            playerOneButton.disabled = true;
            playerTwoButton.disabled = true;
            // playerTwoScore.style.color = 'green';
        }
        playerTwoScore.textContent = two;
        // color();
    }
})

//range from 3 to 10
range.addEventListener('change', function () {
    winningScore = parseInt(this.value);
    reset();
})

//reset function
resetButton.addEventListener('click', reset)

function reset() {
    isGameOver = false;
    one = 0;
    two = 0;
    playerOneScore.textContent = 0;
    playerTwoScore.textContent = 0;
    playerOneScore.classList.remove('winner', 'loser');
    playerTwoScore.classList.remove('winner', 'loser');
    playerOneButton.disabled = false;
    playerTwoButton.disabled = false;
}

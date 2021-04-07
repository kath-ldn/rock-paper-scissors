/* global variables to hold rounds played and scores */
let roundsPlayed = 0;
let userScore;
let computerScore;

const playGameButton = document.getElementById("play-game-button");
playGameButton.addEventListener('click', playGame);

const userScoreDisplay = document.getElementById('user-score');
const computerScoreDisplay = document.getElementById('computer-score');

const rock = document.getElementById('rock-icon');
const paper = document.getElementById('paper-icon');
const scissors = document.getElementById('scissors-icon');
let options = [rock, paper, scissors];

const messageBoard = document.getElementById("message-board")

function controlEvents(status){
    if(status === "play"){
        for(let i = 0; i < options.length; i++){
            options[i].addEventListener('click', playRound);
        }
    } else if(status === "end"){
        for(let i = 0; i < options.length; i++){
            options[i].removeEventListener('click', playRound);
        }
    }
}

function updateScore(){
    userScoreDisplay.textContent = userScore;
    computerScoreDisplay.textContent = computerScore;
}

function togglePlayButton(action){
    playGameButton.classList.toggle('selected');
    if(action === 'remove'){
        playGameButton.removeEventListener('click', playGame);
        playGameButton.classList.remove('hover');
    } else if(action === 'add'){
        playGameButton.addEventListener('click', playGame);
        playGameButton.classList.add('hover');
    }
}

function playGame(){
    userScore = 0;
    computerScore = 0;
    roundsPlayed = 0;
    togglePlayButton('remove');
    updateScore();
    controlEvents("play");
    messageBoard.textContent = "Select the rock, paper or scissors";
}

function endGame(){
    let finalResult = "You scored " + userScore + " and I scored " + computerScore + ".";
    if(userScore === computerScore){
        messageBoard.textContent = "It was a draw! " + finalResult + " Play again?"
    } else if(userScore > computerScore){
        messageBoard.textContent = "You won the game! " + finalResult + " Play again?"
    } else if(computerScore > userScore){
        messageBoard.textContent = "I won! " + finalResult + " Better luck next time... Challenge me again?"
    }
    userScore = 0;
    computerScore = 0;
    controlEvents("end");
    togglePlayButton('add');
}

function checkRounds(){
    if(roundsPlayed === 5){
        endGame()
    }
}

function displayResult(result, userSelection, computerSelection){
    if(result === 'draw'){
        messageBoard.textContent = ("We both chose " + userSelection + ". It's a tie! *yawn*")
    } else if(result === 'computerWin'){
        messageBoard.textContent = ("Ha! I chose " + computerSelection + " which beats your " + userSelection + ". You lose!")
    } else if(result === 'userWin'){
        messageBoard.textContent = ("Argh! Your " + userSelection + " beats my " + computerSelection + ". You win this round.")
    } else if(result === 'error') {
        messageBoard.textContent = "Oops! Error..."
    }
}

function computerSelects() {
    let computerChoices = ["rock", "paper", "scissors"];
    return computerChoices[Math.floor(Math.random() * computerChoices.length)];
}

function showRoundResult(result, userSelection, computerSelection){
    if (userSelection === computerSelection) {
        result = 'draw';
    } else if (userSelection === "rock" && computerSelection === "paper" || userSelection === "paper" && computerSelection === "scissors" || userSelection === "scissors" && computerSelection === "rock") {
        computerScore += 1;
        result = 'computerWin';
    } else if (userSelection === "rock" && computerSelection === "scissors" || userSelection === "paper" && computerSelection === "rock" || userSelection === "scissors" && computerSelection === "paper") {
        userScore += 1;
        result = 'userWin';
    } else {
        result = 'error'
    };
    
    displayResult(result, userSelection, computerSelection);
    updateScore();
    roundsPlayed += 1;
    checkRounds();
}

function playRound(e) {
    let userSelection = e.target.id.split("-")[0];
    let computerSelection = computerSelects();
    let result;
    messageBoard.textContent = "*Computer selects " + computerSelection + "* . . .";
    setTimeout(() => showRoundResult(result, userSelection, computerSelection), 1000);
}

















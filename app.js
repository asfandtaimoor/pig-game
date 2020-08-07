/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/


// Declaration


let scores, roundScore, activePlayer, dice, gamePlaying;

init();

// Trigger after click the roll dice button

function rollDice() {

    if (gamePlaying) {

        // Generation random values of dice
        dice = Math.floor(Math.random() * 6) + 1;

        // Change teh dice image
        let diceImg = document.querySelector('.dice');

        diceImg.src = `dice-${dice}.png`;

        // Update the round score if the rolled number was not equal to 1

        if (dice !== 1) {

            // Remove dice
            document.querySelector('.dice').style.display = 'block';

            roundScore += dice;
            document.querySelector(`#current-${activePlayer}`).textContent = roundScore;

        } else {
            nextPlayer();
        }
    }

}



// Holding Score

function holdScore() {

    if (gamePlaying) {

        // update the score

        scores[activePlayer] += roundScore;


        // Update the UI

        document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];

        // Check if Player won

        if (scores[activePlayer] >= 15) {
            document.getElementById(`name-${activePlayer}`).textContent = 'Winner';
            document.querySelector('.dice').style.display = 'none'; // Removing dice
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
            gamePlaying = false;
        } else {

            // Next Player
            nextPlayer();
        }
    }
}


// Next Player 

function nextPlayer() {

    // Next Player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    // round score 0
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    // Toggle Active class
    document.querySelector('.player-0-panel').classList.toggle('active')
    document.querySelector('.player-1-panel').classList.toggle('active')

    // Remove dice
    document.querySelector('.dice').style.display = 'none';


}


// Start  New game

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 1;

    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none'; // Removing dice

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';


    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    // Remove winner class
    document.querySelector(`.player-0-panel`).classList.remove('winner');
    document.querySelector(`.player-1-panel`).classList.remove('winner');

    // Remove active class
    document.querySelector(`.player-0-panel`).classList.remove('active');
    document.querySelector(`.player-1-panel`).classList.remove('active');

    // Add active class to player 0
    document.querySelector(`.player-0-panel`).classList.add('active');
}
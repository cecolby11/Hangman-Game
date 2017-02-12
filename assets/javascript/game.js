// setup

// object with properties/functions for on-screen things
var browser = {
  
  updateWinsOnScreen: function(){
    var element = document.getElementById("winsDisplay");
    element.textContent = winCounter;
  },

  updateWordOnScreen: function(){
    var element = document.getElementById("wordBeingGuessed");
    element.textContent = wordProgressDisplay.join(" ");
  }, 

  updateGuessesRemOnScreen: function() {
    var element = document.getElementById("guessesRemaining");
    element.textContent = guessesRemaining;
  },

  updateLettersGuessedOnScreen: function() {
    var element = document.getElementById("lettersGuessed");
    element.textContent = lettersGuessed;
  }

};

// array to hold letters guessed 
var lettersGuessed = [];
// array to hold blank spaces or letters for the word in question
var wordProgressDisplay = [];
// var for number of guesses remaining. starts at 12. 
var guessesRemaining = 12;
//var to hold number of wins! starts at 0. 
var winCounter = 0; 
// array of words that fit the theme
var wordOptions = ["Buddy", "Ella", "Duke", "Miles"];
// computer randomly selects word from wordOptions, store in var
var computerChoice = wordOptions[Math.floor(Math.random() * wordOptions.length)];
// guesses will be lowercase, make word match
computerChoice = computerChoice.toLowerCase();
console.log("computer choice: " + computerChoice);
// add enough blanks for the word to wordProgressDisplay array for display 
for(var i = 0; i < computerChoice.length; i++) {
  wordProgressDisplay.push("__");
}
// display blanks to screen. use join to separate with spaces and without commas in display
alert("ok here's your word: " + wordProgressDisplay.join(" "));

// gameplay - User guesses letter; tell game to pay attention to keyup event

document.onkeyup = function(e) {
  // save key pressed as variable
  var playerGuess = e.key;
  console.log("player guess: " + playerGuess);
  // check that it's allowable. if so, returns true 
  if(validateInput(playerGuess)){
    // process guess
    checkGuess(playerGuess);
    winLoseWatcher();
  }
}

// helper functions 

function validateInput(key) {
  var aToZ = /^[a-z]+$/;
  // 1. if special key like meta, then ignore completely 

  // 2. guess must be a-z
  if(!(key.match(aToZ))){
    alert("Invalid key. Guess must be a letter a-z.");
    return false;
  }
  // 3. wasn't guessed before or in the word
  else if(lettersGuessed.includes(key) || wordProgressDisplay.includes(key)) {
    alert(key + " was already guessed; try another letter.")
    return false;
  }
  else {
    return true;
  }
}

function checkGuess(letter) {
  if(computerChoice.includes(letter)){
    findIndexInWord(letter);
  } 
  // if no, then add it to the "letters guessed array" 
  else {
    updateLettersGuessed(letter);
    updateGuessesRemaining();
  }
}

function findIndexInWord(letter) {
  for(var i = 0; i < computerChoice.length; i++) {
    if(letter === computerChoice.charAt(i)) {
      // insert @ index in wordProgressDisplay. 
      // don't update letters guessed or guesses remaining.
      updateWordProgressDisplay(letter, i);
    }
    // NOTE: don't break from for-loop even if we've found the letter, bc could be in the word multiple times
  }
}

function updateWordProgressDisplay(letter, index) {
  // use: splice(index, how many to be removed, items to add)
  wordProgressDisplay.splice(index, 1, letter);
  browser.updateWordOnScreen();
  // letters guessed shouldn't be updated: 
}

function updateLettersGuessed(letter) {
  lettersGuessed.push(letter);
  browser.updateLettersGuessedOnScreen();
}

function updateGuessesRemaining() {
  guessesRemaining--;
  browser.updateGuessesRemOnScreen();
}

function winLoseWatcher(){
  // check if WIN (word is totally guessed (no blanks left))
  if(!(wordProgressDisplay.includes("__"))){
    winCounter++;
    browser.updateWinsOnScreen();
  } 
  // check if LOSS (they haven't won and guesses remaining reaches 0)
  else if(guessesRemaining === 0) {
    console.log("YOU LOSE :(");
  }
}


// TODO: 

// new game after win or loss declared

// DO THESE LATER: 

//need to not track keyup when we refresh the page. how to ignore special keys??

// pick a theme - update array with new words if necessary 

// initial display of things on the screen

// css styling

// if they've already guessed a letter, alert them or don't let them keep guessing it! (shouldn't make number of guesses keep decreasing)

// setup

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
//use join to separate with spaces and without commas in display
alert("ok here's your word: " + wordProgressDisplay.join(" "));

//gameplay - User guesses letter; tell game to pay attention to keyup event

document.onkeyup = function(e) {
  // save key pressed as variable
  var playerGuess = e.key;
  console.log("player guess: " + playerGuess);
  //call helper functions 
  checkGuess(playerGuess);
  winLoseWatcher();
}

//helper functions 

checkGuess = function(playerGuess) {
  if(computerChoice.includes(playerGuess)){
    findIndexInWord(playerGuess);
  } 
  //if no, then add it to the "letters guessed array" 
  else {
    console.log("nope not in this word");
    updateLettersGuessed(playerGuess);
    updateGuessesRemaining();
  }
}

findIndexInWord = function(letter) {
  for(var i = 0; i < computerChoice.length; i++) {
    if(letter === computerChoice.charAt(i)) {
      // insert @ index in wordProgressDisplay. 
      // don't update letters guessed or guesses remaining.
      updateWordProgressDisplay(letter, i);
    }
    // even if we've found the letter, don't break from for-loop because it could be in the word multiple times!! 
  }
}

updateWordProgressDisplay = function(letter, index) {
  //use: splice(index, how many to be removed, items to add)
  wordProgressDisplay.splice(index, 1, letter);
  alert("here's what you've got now: " + wordProgressDisplay.join(" "));
  //letters guessed shouldn't be updated: 
}

updateLettersGuessed = function(letter) {
  lettersGuessed.push(letter);
  console.log("letters guessed: " + lettersGuessed);
}

updateGuessesRemaining = function() {
  guessesRemaining--;
  console.log("guesses remaining: " + guessesRemaining);
}

winLoseWatcher = function() {
  //check if WIN (word is totally guessed (no blanks left))
  if(!(wordProgressDisplay.includes("__"))){
    winCounter++;
    console.log("YOU WIN! number of wins: " + winCounter);
  } 
  //check if LOSS (they haven't won and guesses remaining reaches 0)
  else if(guessesRemaining === 0) {
    console.log("YOU LOSE!");
  }
}


// TODO: 

// new game after win or loss declared

// DO THESE LATER: 

// array of possible letter guesses, make sure they picked an acceptable key or else tell them to guess a-z 

//need to not track keyup when we refresh the page. how to do that? only track for a-z? 

// pick a theme - update array with new words if necessary 

// display word progress, lettersGuessed, and guessesRemaining on the screen, update what's displayed for these 3 after each guess

// display winCounter on thes creen and update what's displayed for this after each win 

// if they've already guessed a letter, alert them or don't let them keep guessing it! (shouldn't make number of guesses keep decreasing)

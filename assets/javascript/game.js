// setup

// object with properties/functions for on-screen things
var browser = {
  
  updateWinsOnScreen: function(){
    var element = document.getElementById("winsDisplay");
    element.textContent = setup.winCounter;
  },

  updateWordOnScreen: function(){
    var element = document.getElementById("wordBeingGuessed");
    element.textContent = setup.wordProgressDisplay.join(" ");
  }, 

  updateGuessesRemOnScreen: function() {
    var element = document.getElementById("guessesRemaining");
    element.textContent = setup.guessesRemaining;
  },

  updateLettersGuessedOnScreen: function() {
    var element = document.getElementById("lettersGuessed");
    element.textContent = setup.lettersGuessed;
  }

};

//new game object (properties/functions for resetting)
var setup = {
  // array to hold letters guessed
  "lettersGuessed": [],
  // array to hold blank spaces or letters for the word in question
  "wordProgressDisplay": [],
  // var for number of guesses remaining. starts at 12. 
  "guessesRemaining": 12,
  //var to hold number of wins! starts at 0. 
  "winCounter": 0,
  // array of words that fit the theme
  "wordOptions": ["Buddy", "Ella", "Duke", "Miles"],
  //vars to store current computerChoice and index for removal later
  "computerChoice":"",
  "computerChoiceIndex":0,

  selectNewWord: function() {
    // computer randomly selects word from wordOptions, 
    // guesses will be lowercase, make computerChoice lower
    this.computerChoice = this.wordOptions[Math.floor(Math.random() * this.wordOptions.length)].toLowerCase();
    this.computerChoiceIndex = this.wordOptions.indexOf(this.computerChoice);
    console.log("computer choice: " + this.computerChoice);
  },

  fillWithBlanks: function() {
    // add enough blanks for the word to wordProgressDisplay array for display 
    for(var i = 0; i < this.computerChoice.length; i++) {
      this.wordProgressDisplay.push("__");
    }
    // display blanks to screen.
    // use join to separate with spaces and without commas
    alert("ok here's your word: " + this.wordProgressDisplay.join(" "));
  }
};

setup.selectNewWord();
setup.fillWithBlanks();



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
  else if(setup.lettersGuessed.includes(key) || setup.wordProgressDisplay.includes(key)) {
    alert(key + " was already guessed; try another letter.")
    return false;
  }
  else {
    return true;
  }
}

function checkGuess(letter) {
  if(setup.computerChoice.includes(letter)){
    findIndexInWord(letter);
  } 
  // if no, then add it to the "letters guessed array" 
  else {
    updateLettersGuessed(letter);
    updateGuessesRemaining();
  }
}

function findIndexInWord(letter) {
  for(var i = 0; i < setup.computerChoice.length; i++) {
    if(letter === setup.computerChoice.charAt(i)) {
      // insert @ index in wordProgressDisplay. 
      // don't update letters guessed or guesses remaining.
      updateWordProgressDisplay(letter, i);
    }
    // NOTE: don't break from for-loop even if we've found the letter, bc could be in the word multiple times
  }
}

function updateWordProgressDisplay(letter, index) {
  // use: splice(index, how many to be removed, items to add)
  setup.wordProgressDisplay.splice(index, 1, letter);
  browser.updateWordOnScreen();
  // letters guessed shouldn't be updated: 
}

function updateLettersGuessed(letter) {
  setup.lettersGuessed.push(letter);
  browser.updateLettersGuessedOnScreen();
}

function updateGuessesRemaining() {
  setup.guessesRemaining--;
  browser.updateGuessesRemOnScreen();
}

function winLoseWatcher(){
  // check if WIN (word is totally guessed (no blanks left))
  if(!(setup.wordProgressDisplay.includes("__"))){
    setup.winCounter++;
    browser.updateWinsOnScreen();
    //start new game
    newGameReset();
  } 
  // check if LOSS (they haven't won and guesses remaining reaches 0)
  else if(setup.guessesRemaining === 0) {
    console.log("YOU LOSE :(");
    //start new game
    newGameReset();
  }
}

function newGameReset() {
  //reset game variables EXCEPT winCounter
  setup.lettersGuessed = [];
  setup.wordProgressDisplay = [];
  setup.guessesRemaining = 12;

  //if we've gone through all words, reset array
  if(setup.wordOptions.length === 0){
    setup.wordOptions = ["Buddy", "Ella", "Duke", "Miles"];
  } else {
    //else remove the word from the options array using computerChoiceIndex so it isn't used again until all words used
    setup.wordOptions.splice(setup.computerChoiceIndex,1);
  }

  setup.selectNewWord();
  setup.fillWithBlanks();
}


// TODO: 

// new game after win or loss declared

// DO THESE LATER: 

//need to not track keyup when we refresh the page. how to ignore special keys??

// pick a theme - update array with new words if necessary 

// initial display of things on the screen

// css styling

// if they've already guessed a letter, alert them or don't let them keep guessing it! (shouldn't make number of guesses keep decreasing)

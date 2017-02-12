// ==== game objects ====

// object with properties/functions for on-screen things
var browser = {

  "instructionHidden": false,
  
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
  },

  showHideInstruction: function() {
    var element = document.getElementById("welcomeInstruction"); 
    if(this.instructionHidden){
      element.style.visibility = "hidden";
    } else {
      element.style.visibility = "visible";
    }
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
  // array of words that fit the theme. words will be removed after use
  "wordOptions": ["Dave Brubeck", "the Duke"],
  // static version for replacing options after all used
  "staticWordOptions": ["Dave Brubeck", "the Duke"],
  //vars to store current computerChoice and index for removal later
  "computerChoice":"",
  "computerChoiceIndex":0,

  selectNewWord: function() {
    // computer randomly selects word from wordOptions, 
    this.computerChoice = this.wordOptions[Math.floor(Math.random() * this.wordOptions.length)];
    this.computerChoiceIndex = this.wordOptions.indexOf(this.computerChoice);
    // guesses will be lowercase, make computer choice lower after storing index. 
    this.computerChoice = this.computerChoice.toLowerCase();
    console.log("computer choice: " + this.computerChoice);
  },

  fillWithBlanks: function() {
    // add enough blanks for the word to wordProgressDisplay array for display 
    for(var i = 0; i < this.computerChoice.length; i++) {
      if(this.computerChoice.charAt(i) === " ") {
        //preserve spaces! 
        // !!! spaces work in console log but ignored on display via textContent; to preserve, use \u00a0 no break spaces 
        this.wordProgressDisplay.push("\u00a0\u00a0");
      } else {
        this.wordProgressDisplay.push("__");
      }
    }
    // display blanks to screen.
    // use join to separate with spaces and without commas
    browser.updateWordOnScreen();
  },

  newGameReset: function() {
    // first remove the word from the options array using computerChoiceIndex so it isn't used again until all words used
    this.wordOptions.splice(this.computerChoiceIndex,1);

    // if we've gone through all words, then reset array
    if(this.wordOptions.length === 0){
      // clone a copy of array by using slice, else it syncs them up and will start removing from static too.
      this.wordOptions = this.staticWordOptions.slice();
    } 

    //reset game variables and update on screen EXCEPT winCounter
    browser.instructionHidden = false;
    browser.showHideInstruction();

    this.lettersGuessed = [];
    browser.updateLettersGuessedOnScreen();

    this.guessesRemaining = 12;
    browser.updateGuessesRemOnScreen();

    this.wordProgressDisplay = [];
    this.selectNewWord();
    this.fillWithBlanks();
    browser.updateWordOnScreen();
  }
};

var gameplay = {
  validateInput: function(event) {
    // 1. ignore special keys; special function keys have keycodes 0-48, meta = multiple keys pressed
    if(event.keyCode < 48 || event.key === "Meta"){
      return false;
    }
    // 2. a-z guesses only; a=65, z=90
    else if(event.keyCode < 65 || event.keyCode > 90){
      alert("Invalid key. Guess must be a letter a-z.");
      return false;
    }
    // 3. wasn't guessed before or in the word
    else if(setup.lettersGuessed.includes(event.key) || setup.wordProgressDisplay.includes(event.key)) {
      alert(event.key + " was already guessed; try another letter.");
      return false;
    }
    else {
      return true;
    }
  },

  updateWordProgressDisplay: function(letter, index) {
    // use: splice(index, how many to be removed, items to add)
    setup.wordProgressDisplay.splice(index, 1, letter);
    browser.updateWordOnScreen();
    // letters guessed shouldn't be updated: 
  },

  findIndexInWord: function(letter) {
    for(var i = 0; i < setup.computerChoice.length; i++) {
      if(letter === setup.computerChoice.charAt(i)) {
        // insert @ index in wordProgressDisplay. 
        // don't update letters guessed or guesses remaining.
        this.updateWordProgressDisplay(letter, i);
      }
      // NOTE: don't break from for-loop even if we've found the letter, bc could be in the word multiple times
    }
  },

  updateLettersGuessed: function(letter) {
    setup.lettersGuessed.push(letter);
    browser.updateLettersGuessedOnScreen();
  },

  updateGuessesRemaining: function() {
    setup.guessesRemaining--;
    browser.updateGuessesRemOnScreen();
  },

  checkGuess: function(letter) {
    if(setup.computerChoice.includes(letter)){
      this.findIndexInWord(letter);
    } 
    // if no, then add it to the "letters guessed array" 
    else {
      this.updateLettersGuessed(letter);
      this.updateGuessesRemaining();
    }
  },

  winLoseWatcher: function(){
    // check if WIN (word is totally guessed (no blanks left))
    if(!(setup.wordProgressDisplay.includes("__"))){
      setup.winCounter++;
      browser.updateWinsOnScreen();
      //start new game
      setup.newGameReset();
    } 
    // check if LOSS (they haven't won and guesses remaining reaches 0)
    else if(setup.guessesRemaining === 0) {
      console.log("YOU LOSE :(");
      //start new game
      setup.newGameReset();
    }
  }

};

// ==== actual user play ====

setup.selectNewWord();
setup.fillWithBlanks();

// tell game to pay attention to keyup event (user guesses letter)
document.onkeyup = function(e) {
  browser.instructionHidden = true;
  browser.showHideInstruction();

  // save key pressed as variable
  var playerGuess = e.key;
  // just in case they capitalized guess
  var playerGuess = playerGuess.toLowerCase();
  console.log("player input: " + playerGuess);

  // check that key code is allowable. if so, returns true 
  if(gameplay.validateInput(e)){
    // process guess
    gameplay.checkGuess(playerGuess);
    gameplay.winLoseWatcher();
  }
}



// //====== For All Inner HTML instead of getElement/textContent: ======
// var html = "<h2>Press any key to get started</h2>" + 
//           "<p>Wins: " + setup.winCounter + "</p>" + 
//           "<p> Ok here's your word: " + setup.wordProgressDisplay.join(" ") + "</p>" + 
//           "<p>Guesses Remaining: " + setup.guessesRemaining + "</p>" +
//           "<p>Letters Guessed: " + setup.lettersGuessed+ "<p>";

// document.querySelector("#game").innerHTML = html;




// DO THESE LATER: 
// pick a theme - update array with new words if necessary 
// css styling
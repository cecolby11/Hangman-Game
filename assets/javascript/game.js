// ==== game objects ====

// on-screen things
var browser = {

  "instructionHidden": false,
  "welcomeText": "Press a key to make your first guess!",
  "loseText": "You're out of guesses! Press any key to begin a new game.",
  "winText": "Great job! Press any key to begin a new game.",
  "audioMuted": false,
  
  updateScoreOnScreen: function(){
    var element1 = document.getElementById("winsDisplay");
    element1.textContent = setup.winCounter;
    var element2 = document.getElementById("lossesDisplay");
    element2.textContent = setup.lossCounter;
  },

  updateWordOnScreen: function(){
    var element = document.getElementById("wordBeingGuessed");
    element.textContent = setup.wordProgressDisplay.join(" ");
    element.style.color = ""; //reset from red to the css instructions
  }, 

  updateGuessesRemOnScreen: function() {
    var element = document.getElementById("guessesRemaining");
    element.textContent = setup.guessesRemaining;
  },

  updateLettersGuessedOnScreen: function() {
    var element = document.getElementById("lettersGuessed");
    element.textContent = setup.lettersGuessed.join(" ");
  },

  showHideInstruction: function(text) {
    var element1 = document.getElementById("instruction");
    element1.textContent = text;
    var element2 = document.getElementById("instructionContainer");

    if(this.instructionHidden){
      element2.style.display = "none";
    } else {
      element2.style.display = "";
    }
  },

  revealAnswer: function() {
    var element = document.getElementById("wordBeingGuessed");
    element.textContent = setup.computerChoice;
    element.style.color = "red";
  },

  updateAudio: function() {
    var element1 = document.getElementById("audio_source");
    var element2 = document.getElementById("audio");
    if(this.audioMuted){
      element2.volume = 0.0;
    } else {
      element2.volume = 0.1;
    }

    if(setup.computerChoice.toLowerCase()==="ella fitzgerald"){
      element1.src = "assets/audio/The_Lady_Is_a_Tramp.m4a";
      element2.load();
      element2.play();
    }
    if(setup.computerChoice.toLowerCase()==="louis armstrong"){
      element1.src = "assets/audio/Wonderful_World.m4a";
      element2.load();
      element2.play();
    }
  },

  muteAudio: function() {
    browser.audioMuted = !browser.audioMuted;
    var element2 = document.getElementById("audio");
    if(this.audioMuted){
      element2.volume = 0.0;
    } else {
      element2.volume = 0.1;
    }
  }

};

var setup = {
  // array to hold letters guessed
  "lettersGuessed": [],
  // array to hold blank spaces or letters for the word in question
  "wordProgressDisplay": [],
  // var for number of guesses remaining. starts at 10. 
  "guessesRemaining": 10,
  //vars for score; start at 0. 
  "winCounter": 0,
  "lossCounter": 0,
  "gameOver":false,
  // array of words that fit the theme. words will be removed after use
  "wordOptions": ["Dave Brubeck", "Duke Ellington", "Ella Fitzgerald", "Miles Davis", "John Coltrane", "Louis Armstrong", "Dizzy Gillespie", "Improvisation", "Rhythm", "Syncopation", "Take Five", "Satin Doll", "Autumn Leaves", "saxophone", "Freddie Freeloader"],
  // static version for replacing options after all used
  "staticWordOptions": ["Dave Brubeck", "Duke Ellington", "Ella Fitzgerald", "Miles Davis", "John Coltrane", "Louis Armstrong", "Dizzy Gillespie", "Improvisation", "Rhythm", "Syncopation", "Take Five", "Satin Doll", "Autumn Leaves", "saxophone", "Freddie Freeloader"],
  //vars to store current computerChoice and index for removal later
  "computerChoice":"",
  "computerChoiceIndex":0,

  selectNewWord: function() {
    // computer randomly selects word from wordOptions, 
    this.computerChoice = this.wordOptions[Math.floor(Math.random() * this.wordOptions.length)];
    this.computerChoiceIndex = this.wordOptions.indexOf(this.computerChoice);
    // guesses will be lowercase, make computer choice lower after storing index. 
    this.computerChoice = this.computerChoice.toLowerCase();
  },

  fillWithBlanks: function() {
    // add enough blanks for the word to wordProgressDisplay array for display 
    for(var i = 0; i < this.computerChoice.length; i++) {
      if(this.computerChoice.charAt(i) === " ") {
        //preserve spaces! 
        // !!! spaces work in console log but ignored on display via textContent; to preserve, use \u00a0 no break spaces 
        this.wordProgressDisplay.push("\u00a0\u00a0\u00a0");
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
    browser.instructionHidden = false; //show
    browser.showHideInstruction(browser.welcomeText);

    this.lettersGuessed = [];
    browser.updateLettersGuessedOnScreen();

    this.guessesRemaining = 10;
    browser.updateGuessesRemOnScreen();

    this.wordProgressDisplay = [];
    this.selectNewWord();
    this.fillWithBlanks();
    browser.updateWordOnScreen();

    setup.gameOver = false;
  }
};

var gameplay = {
  // returns a Bool
  validateInput: function(event) { 
    // 1. ignore special keys except space (32)
    // special keys have keycodes 0-48 
    // meta = multiple keys pressed
    if(event.keyCode != 32 && (event.keyCode < 48 || event.key === "Meta")) {
      return false;
    }
    // 2. a-z guesses only
    // a=65, z=90 
    else if(event.keyCode < 65 || event.keyCode > 90){
      alert("Invalid key. Guess must be a letter a-z.");
      return false;
    }
    // 3. check wasn't guessed before 
    else if(setup.lettersGuessed.includes(event.key) || setup.wordProgressDisplay.includes(event.key)) {
      alert(event.key + " was already guessed; try another letter.");
      return false;
    }
    else {
      return true;
    }
  },

  updateWordProgressDisplay: function(letter, index) {
    // splice(index, how many to remove, items to add)
    setup.wordProgressDisplay.splice(index, 1, letter);
    browser.updateWordOnScreen();
  },

  findIndexInWord: function(letter) {
    for(var i = 0; i < setup.computerChoice.length; i++) {
      if(letter === setup.computerChoice.charAt(i)) {
        // insert at index in wordProgressDisplay. 
        this.updateWordProgressDisplay(letter, i);
      }
      // !! NOTE: don't break from for-loop even if we've found the letter, bc could be in the word multiple times
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
      // if in word (this fxn will call others)
      this.findIndexInWord(letter);
    } 
    // if no, add to the letters guessed array 
    else {
      this.updateLettersGuessed(letter);
      this.updateGuessesRemaining();
    }
  },

  winLoseWatcher: function(){
    // check if win: no blanks left
    if(!(setup.wordProgressDisplay.includes("__"))){
      // switch Bool
      browser.instructionHidden = false; 
      // show instruction
      browser.showHideInstruction(browser.winText); 
      // Play audio if applicable
      browser.updateAudio();

      // Update score 
      setup.winCounter++;
      browser.updateScoreOnScreen();
      // Update bool (for starting new game on keypress in document.keyup)
      setup.gameOver = true;
    } 
    // check if loss: 
    // they haven't won and guesses remaining reaches 0
    else if(setup.guessesRemaining === 0) {
      // switch bool
      browser.instructionHidden = false; 
      // show instruction 
      browser.showHideInstruction(browser.loseText); 
      // play audio if applicable 
      browser.updateAudio();

      // show correct answer
      browser.revealAnswer();
      //update score
      setup.lossCounter++;
      browser.updateScoreOnScreen();

      //switch bools (for starting new game on keypress in document.onkeyup) 
      setup.gameOver = true;
    }
  }

};

// ==== actual user play ====

setup.selectNewWord();
setup.fillWithBlanks();
browser.updateGuessesRemOnScreen();

// tell game to pay attention to keyup event
// user guesses letter
document.onkeyup = function(e) { 
  if(setup.gameOver) {
    // Bool true means special win/lose instruction is displayed and we want a new game on the next keypress, rather than treating it as a guess
    
    setup.newGameReset();
  }
  else { 
    // Bool false means it's a letter guess, not time for a new game

    // save key pressed as var
    var playerGuess = e.key;
    var playerGuess = playerGuess.toLowerCase();

    // validate input checks key code is allowable. 
    // if so, returns true, else false
    if(gameplay.validateInput(e)){
      // set var 
      browser.instructionHidden = true; 
      // hide instruction alert 
      browser.showHideInstruction(browser.welcomeText);
      // process guess, gameplay
      gameplay.checkGuess(playerGuess);
      gameplay.winLoseWatcher();
    }
  }
}
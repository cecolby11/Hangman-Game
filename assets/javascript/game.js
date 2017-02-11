// setup

// array to hold letters guessed 
var lettersGuessed = [];
// array to hold blank spaces or letters for the word in question
var wordProgressDisplay = [];
// array of words that fit the theme
var wordOptions = ["Buddy", "Ella", "Duke", "Miles"];

//gameplay - Computer

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

//gameplay - User

// user guesses letter; tell game to pay attention to the keyup event
document.onkeyup= function(e) {
  // save key pressed as variable
  var playerGuess = e.key;
  console.log("player guess: " + playerGuess);

  // check if letter in word
  // if yes, then...
  if(computerChoice.includes(playerGuess)){
    // 1. find its index in the word
    for(var i = 0; i < computerChoice.length; i++) {
      if(playerGuess === computerChoice.charAt(i)) {
        console.log("letter at index: " + i);
        //2. insert the letter guessed at that index in the wordProgressDisplay 
          //use: splice(index, how many to be removed, items to add)
        wordProgressDisplay.splice(i, 1, playerGuess);
        alert("here's what you've got now: " + wordProgressDisplay.join(" "));
        //letters guessed shouldn't be updated: 
        console.log("letters guessed: " + lettersGuessed);
        //if we've found the letter and updated, don't break from the for loop because it could be in the word multiple times!! 
      }
    }
  } 
  //if no, then add it to the "letters guessed array" 
  else {
    console.log("nope not in this word");
      lettersGuessed.push(playerGuess);
      console.log("letters guessed: " + lettersGuessed);
    }

}


// display progress on the word, update after each guess
  // if they got it right, add their letter to this array 
  // update what's displayed on the screen

// display number of guesses remaining, update after each guess
  // counter starts at 12? 
  // decrease by 1 after each guess
  // update what's displayed on the screen

// display # wins! if word is guessed in time, this goes up
  


//DO THESE LATER: 

// array of possible letter guesses, make sure they picked an acceptable key or else tell them to guess a-z 

//need to not track keyup when we refresh the page. how to do that? only track for a-z? 

// pick a theme - update array with new words if necessary 

// display lettersGuessed on screen, update what's displayed after each guess. 

//if they've already guessed a letter, alert them or don't let them keep guessing it! 

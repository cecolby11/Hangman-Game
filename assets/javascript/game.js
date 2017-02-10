// computer picks word randomly
  // pick a theme - can always DO THIS LATER and put in new words!
  // make an array of words that fit the theme
  var wordOptions = ["Buddy", "Ella", "Duke", "Miles"];
  // computer randomly selects a word from the array
  var computerChoice = wordOptions[Math.floor(Math.random() * wordOptions.length)];
  // guesses will be lowercase 
  computerChoice = computerChoice.toLowerCase(); 
  console.log("computer choice: " + computerChoice);

// user guesses a letter
  // array of possible letter guesses, make sure they picked an acceptable key or else tell them to guess a-z - DO THIS LATER

   // tell game to pay attention to the keyup
   // save the key pressed as a variable
   document.onkeyup = function(e) {
    var playerGuess = e.key;
    console.log("player guess: " + playerGuess);

    // check if letter in word. yay! or boo.
      // can we check if a char is in a string? or break the string into an array and check if it's matching element in array?
      //will be useful to have the index so we can display the correct letter in the word _ _ _s 
    for(var i = 0; i < computerChoice.length; i++) {
      if(playerGuess === computerChoice.charAt(i)) {
        console.log("letter at index: " + i);
      }
    }


   }



// display letters guessed, update after each guess
  // if they got it wrong, add their letter to this array 
  // update what's displayed on the screen

// display progress on the word, update after each guess
  // if they got it right, add their letter to this array 
  // update what's displayed on the screen

// display number of guesses remaining, update after each guess
  // counter starts at 12? 
  // decrease by 1 after each guess
  // update what's displayed on the screen

// display # wins! if word is guessed in time, this goes up
    

//need to not track keyup when we refresh the page. how to do that? only track for a-z? 
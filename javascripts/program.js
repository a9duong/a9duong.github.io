(function() {
	//Game Variables
		var mysteryNumber = Math.floor(Math.random() * 100);
		console.log(mysteryNumber);
		var playersGuess = 0;
		var guessesRemaining = 10;
		var guessesMade = 0;
		var gameState = "";
		var gameWon = false;
		
		//The input and output fields
		var input = document.querySelector("#input");
		var output = document.querySelector("#output");
		
		//The Button
		var button = document.querySelector("button");
		button.addEventListener("click", clickHandler, false);
		button.style.cursor="pointer";
		var button2 = document.querySelector("#button2");
		button2.hidden = true;
		button2.addEventListener("click", b2clickHandler, false);
		button.style.cursor="pointer";
		
		//The arrow
		var arrow = document.querySelector("#arrow");
		
		function render() {
		//Position the arrow
		//Multiply the players guess by 3 to get the correct pixel position on the scale
		arrow.style.left = playersGuess * 3 - 7 + "px";
		} 
		
		window.addEventListener("keydown", keydownHandler, false);
		
		function keydownHandler(event){
			if(event.keyCode === 13){
				validateInput();
			}
		}
		
		function clickHandler() {
			validateInput();
		}
		
		function b2clickHandler() {
			input.value="";
			mysteryNumber = Math.floor(Math.random() * 100);
			console.log(mysteryNumber);
			playersGuess = 0;
			guessesRemaining = 10;
			guessesMade = 0;
			output.innerHTML = "I am thinking of a number between 0 and 99.";
			gameWon = false;
			button2.hidden = true;
			button.hidden =false;
			button.addEventListener("click", clickHandler, false);
			button.disabled = false;
			input.disabled = false;
			window.addEventListener("keydown", keydownHandler, false);
			arrow.style.left = -7 + "px";
		}
		
		function validateInput(){
			playersGuess = parseInt(input.value);
			
			if(isNaN(playersGuess)) {
				output.innerHTML = "Please enter a number.";
			} else if (playersGuess < 0 || playersGuess > 99) {
				output.innerHTML = "That's not a number between 0 and 99!" + "<br>" + "Please enter a number between 0 and 99.";
			} else {
				playGame();
			}
		}
		
		function playGame() {
			guessesRemaining--;
			guessesMade++;
			gameState = " Guess: " + guessesMade + ", Remaining: " + guessesRemaining;
			
			if (playersGuess > mysteryNumber) {
				output.innerHTML = "That's too high." + gameState;
				if (guessesRemaining < 1) {
					endGame();
				}
			} else if(playersGuess < mysteryNumber){
				output.innerHTML = "That's too low." + gameState;
				if (guessesRemaining < 1) {
					endGame();
				}
			} else if (playersGuess === mysteryNumber) {
				gameWon = true;
				endGame();
			}
			
			//Update the graphic display
			render();
		}
		
		function endGame(){
			if (gameWon){
				if (guessesMade > 1){
				output.innerHTML = "Yes, it's " + mysteryNumber + "!" + "<br>" + "It only took you " + guessesMade + " guesses.";
				} else {
					output.innerHTML = "Yes, it's " + mysteryNumber + "!" + "<br>" + "It only took you " + guessesMade + " guess.";
				}
			} else {
				output.innerHTML = "No more guesses left!" + "<br>" + "The number was: " + mysteryNumber + ".";
			}
			
			//Disable the button
			button.removeEventListener("click", clickHandler, false);
			button.disabled = true;
			button.hidden = true;
			button2.hidden = false;
			
			//Disable the enter keyCode
			window.removeEventListener("keydown", keydownHandler, false);
			
			//Disable the input field
			input.disabled = true;
		}
		
} ());
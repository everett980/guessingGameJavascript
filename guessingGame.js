$(document).ready(function() {
	var number = Math.ceil(Math.random()*100);
	var lost = false;
	var won = false;
	var guessList = [];
	var proximityTracker = [];
	console.log(number);
	function blinker() {
		if(won) {
			$('.responseToGuess').fadeOut(500).fadeIn(500);
		}
	}
	setInterval(blinker, 1000);

	function calculateGuess() {
		var guess=$('.playerGuess').val();
		if(isNaN(guess)) {
			alert("You need to enter a number here!");
			return;
		}
		if(guess < 1 || guess > 100) {
			alert("You need to provide a number between 1 and 100, inclusive.");
			return;
		}
		var updateFunction = function() {
			$('h3').removeClass('hidden');
			var update = $('<p class="tracking">'+guessList[guessList.length-1]+' was '+proximityTracker[proximityTracker.length-1]+'</p>');
			$('.log').append(update);
		}
		var message = "";
		var proximity = "";
		if((+$('.playerGuess').val()) === number && !won && !lost) {
			message="You won! The number was: "+number;
			$('.responseToGuess').text(message);
			won = true;
			proximity="the correct guess!";
			proximityTracker.push(proximity);
			guessList.push(guess);
			updateFunction();
		}
		if(!lost && !won) {
			var guessCounter = +$(".guessesLeft").text();
			guessCounter--;
			message = "You are ";
			$(".guessesLeft").text(guessCounter);
			guessList.push(guess);
			console.log(guessList);
			if(guessList.length === 1) {
				//if this is first guess, message is detailed
				var guessDif = Math.abs(guess-number);
				if(guessDif >= 25) {
					proximity="extremely cold.";
					message+=proximity;
				}
				if(guessDif >=15 && guessDif < 25) {
					proximity="cold.";
					message+=proximity;
				}
				if(guessDif >=10 && guessDif < 15) {
					proximity="luke-warm.";
					message+=proximity;
				}
				if(guessDif >= 5 && guessDif <10) {
					proximity="very hot!";
					message+=proximity;
				}
				if(guessDif > 0 && guessDif < 5) {
					proximity="on fire!";
					message+=proximity;
				}
			} else {
				var currentDif=Math.abs(guess-number);
				var lastGuess=(guessList[guessList.length-2]);
				var lastDif=Math.abs(lastGuess-number);
				console.log("currentDif: "+currentDif+" lastDif: "+lastDif)
				if(currentDif<lastDif) {
					var proximity = "warmer.";
					var message = "Warmer.";
				} else {
					var proximity = "colder.";
					var message = "Colder.";
				}
			}
			if(guess<number) {
					proximity+=" Lower than correct number.";
					message+=" Guess higher."
				} else {
					proximity+=" Higher than correct number.";
					message+=" Guess lower."
				}
			$('.responseToGuess').text(message);
		} 
		if(+$('.guessesLeft').text() <= 0 && !won) {
			if(!lost) {
				var youLose = $('<p class="loseMessage">You ran out of guesses! The number was: '+number+'</p>');
				$(".submitButton").after(youLose);
				proximityTracker.push(proximity);
				updateFunction();
			}
			lost = true;
		}
		if(!won && !lost) {
			proximityTracker.push(proximity);
			updateFunction();
		}
		console.log(proximityTracker);
	};

	$('.playerGuess').on('keyup', function(event) {
		if(event.keyCode === 13) {
			calculateGuess();
		}
	});

	$('.submitButton').on('click', calculateGuess);

	$('.playAgain').on('click', function() {
		$('.guessesLeft').text("10");
		number = Math.ceil(Math.random()*100);
		$('.loseMessage').remove();
		$('h3').addClass('hidden');
		$('.tracking').remove();
		$('.responseToGuess').text("");
		lost = false;
		won = false;
		proximityTracker = [];
		guessList = [];
		console.log(number);
	});

	$('.hint').on('click', function() {
		alert("The number is: "+number);
	})

	$('.info').on('mouseenter', function() {
		$('.help').removeClass('hidden');
	});
	$('.info').on('mouseleave',function() {
		$('.help').addClass('hidden');
	})
})






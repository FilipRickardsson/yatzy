class Lobby extends Base {

	constructor(propertyValues) {
		super(propertyValues);
	}

	// Creates a number of inputfields based on chosen number of players
	createInputFields() {
		var nbrOfPlayers = $('#selectPlayer').find(":selected").text();
		$(".inputFields").empty();
		for (let i = 0; i < nbrOfPlayers; i++) {
			$(".inputFields").append(`
			     <div>
			         <input type="text" class="form-control" placeholder="Player">
			     </div>`);
		}
		$('.error').addClass('hidden');
	}

	// Starts the game if the player input is valid
	startGame() {
		var validPlayerNames = this.checkInputFields();
		if (validPlayerNames) {
			var players = [];

			$("input").each(function () {
				players.push($(this).val());
			});

			$('body').empty();
			var gameBoard = new GameBoard({
				players: players
			});
			gameBoard.display('body');
			gameBoard.createDice();
			gameBoard.createProtocol();
		} else {
			$('.error').removeClass('hidden');
		}
	}

	// Shows the statistics of earlier played games
	showStatistics() {
		$('body').empty();
		var statistics = new Statistics();
		statistics.display('body');
	}

	// Validates all the players name that they only contain letters, 1-10 letters
	// and if all the names are unique
	checkInputFields() {
		var players = [];
		var valid = true;
		var validCharacters = /^[A-Za-z]+$/;
		$('input').each(function () {
			let txt = $(this).val();
			let onlyLetters = txt.match(validCharacters);
			
			for(let i = 0; i < players.length; i++) {
				if(txt === players[i]) {
					valid = false;
				}
			}
			
			if(valid) {
				players.push(txt);
			}
			
			if ($(this).val().length === 0 || $(this).val().length > 10 || onlyLetters === null) {
				valid = false;
			}
		});
		return valid;
	}
}

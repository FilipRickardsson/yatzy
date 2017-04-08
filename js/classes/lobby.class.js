class Lobby extends Base {

	constructor(propertyValues) {
		super(propertyValues);
	}

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

	showStatistics() {
		$('body').empty();
		var statistics = new Statistics();
		statistics.display('body');
	}

	checkInputFields() {
		var valid = true;
		var validCharacters = /^[A-Za-z]+$/;
		$('input').each(function () {
			let txt = $(this).val();
			let onlyLetters = txt.match(validCharacters);
			if ($(this).val().length === 0 || $(this).val().length > 10 || onlyLetters === null) {
				valid = false;
			}
		});
		return valid;
	}
}

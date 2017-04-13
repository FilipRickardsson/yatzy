class EndResult extends Base {

	constructor(propertyValues) {
		super(propertyValues);
	}
	
	// Displays the game result with players and points
	showResult(players, points) {
		for (let i = 0; i < players.length; i++) {
			$('#result').append('<p>Player: ' + players[i] + ' Points: ' + points[i] + '</p>');
		}
	}

	// Empties the body and displays a new lobby
	backToLobby() {
		$('body').empty();
		var lobby = new Lobby();
		lobby.display('body');
		lobby.createInputFields();
	}

}
